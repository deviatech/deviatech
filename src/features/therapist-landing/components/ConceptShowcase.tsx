"use client";

import { useId, useState } from "react";
import { LuCalendarCheck } from "react-icons/lu";
import type { ConceptTabContent, TherapistLandingContent } from "../content/types";
import { therapistLandingConfig } from "../config";
import { TlLinkButton } from "./TlButton";
import styles from "../therapistLanding.module.css";

type Device = "desktop" | "mobile";

export default function ConceptShowcase({ content }: { content: TherapistLandingContent }) {
  const { concept } = content;
  const isRtl = content.dir === "rtl";
  const tabs = concept.tabs;
  const [activeId, setActiveId] = useState(tabs[0].id);
  const [device, setDevice] = useState<Device>("desktop");
  const baseId = useId();
  const { liveDemoUrl } = therapistLandingConfig;

  const activeIndex = tabs.findIndex((tab) => tab.id === activeId);

  function focusTabByIndex(index: number) {
    const nextIndex = (index + tabs.length) % tabs.length;
    const nextTab = tabs[nextIndex];
    setActiveId(nextTab.id);
    const el = document.getElementById(`${baseId}-tab-${nextTab.id}`);
    el?.focus();
  }

  function handleKeyDown(event: React.KeyboardEvent) {
    const isNext = isRtl ? event.key === "ArrowUp" || event.key === "ArrowLeft" : event.key === "ArrowDown" || event.key === "ArrowRight";
    const isPrev = isRtl ? event.key === "ArrowDown" || event.key === "ArrowRight" : event.key === "ArrowUp" || event.key === "ArrowLeft";

    if (isNext) {
      event.preventDefault();
      focusTabByIndex(activeIndex + 1);
    } else if (isPrev) {
      event.preventDefault();
      focusTabByIndex(activeIndex - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      focusTabByIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      focusTabByIndex(tabs.length - 1);
    }
  }

  return (
    <section className={styles.section} aria-labelledby={`${baseId}-heading`}>
      <div className={styles.container}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="inline-flex items-center rounded-full border border-[var(--tl-border-strong)] px-3 py-1 text-xs font-semibold text-[var(--tl-text-muted)] rtl:normal-case">
              {concept.disclosure}
            </span>
            <h2 id={`${baseId}-heading`} className={`${styles.balance} mt-4 text-[clamp(1.875rem,3vw,2.25rem)] font-medium leading-[1.15] text-[var(--tl-text)]`}>
              {concept.heading}
            </h2>
            <p className={`${styles.pretty} mt-3 text-base leading-[1.65] text-[var(--tl-text-body)]`}>{concept.body}</p>
          </div>
          {liveDemoUrl && (
            <TlLinkButton
              href={liveDemoUrl}
              variant="secondary"
              target="_blank"
              rel="noopener noreferrer"
              data-ga-event="concept_demo_click"
              data-ga-label="showcase"
              className="shrink-0"
            >
              {concept.liveDemoCta}
            </TlLinkButton>
          )}
        </div>

        <div className="mt-10 grid gap-7 lg:grid-cols-[240px_1fr]">
          <div
            role="tablist"
            aria-label={concept.heading}
            aria-orientation="vertical"
            className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
            style={{ scrollbarWidth: "thin" }}
          >
            {tabs.map((tab) => {
              const isActive = tab.id === activeId;
              return (
                <button
                  key={tab.id}
                  id={`${baseId}-tab-${tab.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`${baseId}-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(tab.id)}
                  onKeyDown={handleKeyDown}
                  className={`min-h-[44px] shrink-0 whitespace-nowrap rounded-[8px] px-4 py-2.5 text-start text-sm font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tl-focus)] lg:whitespace-normal ${
                    isActive
                      ? "bg-[var(--tl-primary)] text-white"
                      : "bg-transparent text-[var(--tl-text)] hover:bg-[var(--tl-primary-soft)]"
                  }`}
                >
                  {tab.navLabel}
                </button>
              );
            })}
          </div>

          <div>
            <div className="mb-4 flex justify-end">
              <div role="group" aria-label={concept.heading} className="inline-flex rounded-[8px] border border-[var(--tl-border)] p-1">
                {(["desktop", "mobile"] as Device[]).map((option) => (
                  <button
                    key={option}
                    type="button"
                    aria-pressed={device === option}
                    onClick={() => setDevice(option)}
                    className={`min-h-[36px] rounded-[6px] px-3 text-xs font-medium transition-colors duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--tl-focus)] ${
                      device === option
                        ? "bg-[var(--tl-primary-soft)] text-[var(--tl-primary)]"
                        : "text-[var(--tl-text-muted)] hover:text-[var(--tl-text)]"
                    }`}
                  >
                    {option === "desktop" ? content.concept.deviceToggle.desktop : content.concept.deviceToggle.mobile}
                  </button>
                ))}
              </div>
            </div>

            {tabs.map((tab) => (
              <div
                key={tab.id}
                id={`${baseId}-panel-${tab.id}`}
                role="tabpanel"
                aria-labelledby={`${baseId}-tab-${tab.id}`}
                hidden={tab.id !== activeId}
                tabIndex={0}
              >
                <ConceptPreview tab={tab} device={device} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ConceptPreview({ tab, device }: { tab: ConceptTabContent; device: Device }) {
  return (
    <div
      className="overflow-hidden rounded-[16px] border border-[var(--tl-border)] bg-[var(--tl-surface)]"
      style={{ boxShadow: "var(--tl-shadow-sm)" }}
    >
      <div className="flex h-11 items-center gap-1.5 border-b border-[var(--tl-border)] px-4">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--tl-border-strong)]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--tl-border-strong)]" />
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-[var(--tl-border-strong)]" />
        <span className="mx-auto text-xs text-[var(--tl-text-muted)]" dir="ltr">
          practice-website.com/{tab.id}
        </span>
      </div>
      <div className={`flex justify-center bg-[var(--tl-bg)] p-6 sm:p-10 ${device === "desktop" ? "aspect-[16/10]" : "min-h-[420px]"}`}>
        <div className={device === "desktop" ? "w-full max-w-lg" : "aspect-[9/16] w-full max-w-[220px] rounded-[20px] border border-[var(--tl-border)] bg-[var(--tl-surface)] p-4"}>
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--tl-primary)] rtl:normal-case rtl:tracking-normal">
            {tab.eyebrow}
          </p>
          <p className={`${device === "desktop" ? "text-2xl" : "text-base"} mt-2 font-medium leading-tight text-[var(--tl-text)]`}>
            {tab.heading}
          </p>
          <p className={`${device === "desktop" ? "text-sm" : "text-[11px]"} mt-3 leading-relaxed text-[var(--tl-text-body)]`}>
            {tab.body}
          </p>
          <span
            className={`mt-4 inline-flex items-center gap-1.5 rounded-[8px] bg-[var(--tl-primary)] font-semibold text-white ${
              device === "desktop" ? "px-4 py-2 text-xs" : "px-3 py-1.5 text-[10px]"
            }`}
          >
            <LuCalendarCheck aria-hidden="true" className={device === "desktop" ? "h-3.5 w-3.5" : "h-3 w-3"} />
            {tab.cta}
          </span>
        </div>
      </div>
    </div>
  );
}
