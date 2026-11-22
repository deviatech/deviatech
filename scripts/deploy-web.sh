#!/usr/bin/env bash
# Executed on the deployment host. REPO_DIGEST comes from the build job.
set -euo pipefail
[[ $REPO_DIGEST =~ ^ghcr\.io/deviatech/deviatech@sha256:[0-9a-f]{64}$ ]]
exec 9>/opt/deviatech/.deploy.lock
flock -n 9 || { echo 'Another deployment holds the site lock.' >&2; exit 1; }
env_file=/opt/deviatech/.env
live=deviatech-web
old=$(docker inspect --format '{{.Id}}' "$live")
[[ $(docker inspect --format '{{.State.Running}}' "$old") == true ]]
private=$(mktemp -d /opt/deviatech/rollback.XXXXXXXX)
cp -p "$env_file" "$private/runtime.env"
printf '%s\n' "$old" > "$private/container-id"
prior="deviatech-web-prior-${old:0:12}"
candidate=$(docker create --name "deviatech-web-next-${private##*.}" \
  --restart unless-stopped -p 127.0.0.1:3011:3000 --env-file "$env_file" "$REPO_DIGEST")
# Do not publish an enabled configuration through an ordinary code release.
if docker inspect --format '{{range .Config.Env}}{{println .}}{{end}}' "$candidate" |
  grep -Ex 'GA4_(RELAY_READY|MANUAL_MEASUREMENT_READY)=true' >/dev/null; then
  docker rm "$candidate" >/dev/null
  echo 'Enabled GA4 runtime requires the separate reviewed release procedure.' >&2
  exit 1
fi
health() {
  curl -fsS --max-time 3 -H 'Host: deviatech.com' "http://127.0.0.1:3011$1"
}
restore() {
  docker rm -f "$candidate" >/dev/null || return 1
  if [[ $(docker inspect --format '{{.Name}}' "$old") != "/$live" ]]; then
    docker rename "$old" "$live" || return 1
  fi
  docker start "$old" >/dev/null || return 1
  for _ in {1..30}; do
    if health / >/dev/null && [[ $(health /api/analytics-readiness) == '{"enabled":false}' ]]; then return 0; fi
    sleep 1
  done
  return 1
}
on_exit() {
  local status=$?
  if ((status != 0)); then
    restore || echo "Rollback needs operator attention: $private" >&2
  fi
}
trap on_exit EXIT
trap 'exit 1' HUP INT TERM
docker stop "$old" >/dev/null
docker rename "$old" "$prior"
docker rename "$candidate" "$live"
docker start "$candidate" >/dev/null
for _ in {1..30}; do
  if health / >/dev/null && health /contact >/dev/null &&
     [[ $(health /api/analytics-readiness) == '{"enabled":false}' ]] &&
     [[ $(health /api/analytics/readiness) == '{"enabled":false}' ]]; then
    echo "Healthy. Preserved prior container and private runtime snapshot in $private"
    exit 0
  fi
  sleep 1
done
exit 1
