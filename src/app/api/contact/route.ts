import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

const MAX_LENGTH = 2000;

function clean(value: unknown, maxLength = MAX_LENGTH): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function sendMail(subject: string, text: string, replyTo: string) {
  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY) {
    console.error("Contact form submission (RESEND_API_KEY not configured)");
    return { ok: false as const, status: 500 as const, error: "Mail not configured" };
  }

  const resend = new Resend(RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL || "DeviaTech <onboarding@resend.dev>",
    to: CONTACT_TO_EMAIL || site.email,
    replyTo,
    subject,
    text,
  });

  if (error) {
    console.error("Resend error:", error);
    return { ok: false as const, status: 500 as const, error: "Failed to send" };
  }

  return { ok: true as const };
}

const THERAPIST_SOURCES = new Set(["therapist-website-design-en", "therapist-website-design-fa"]);

async function handleTherapistLead(body: Record<string, unknown>) {
  // Honeypot: bots fill hidden fields; humans never see or fill this one.
  if (clean(body.companyWebsite, 200)) {
    return NextResponse.json({ ok: true });
  }

  const source = clean(body.source, 60);
  const locale = body.locale === "fa" ? "fa" : "en";
  const fullName = clean(body.fullName, 200);
  const role = clean(body.role, 200);
  const country = clean(body.country, 200);
  const website = clean(body.website, 300);
  const email = clean(body.email, 320);
  const whatsapp = clean(body.whatsapp, 60);
  const note = clean(body.note, MAX_LENGTH);

  if (!fullName || !role || !country || !email) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const result = await sendMail(
    `New therapist website preview request from ${fullName}`,
    [
      `Source: ${source}`,
      `Locale: ${locale}`,
      `Name: ${fullName}`,
      `Role: ${role}`,
      `Country: ${country}`,
      `Website/Instagram: ${website || "-"}`,
      `Email: ${email}`,
      `WhatsApp: ${whatsapp || "-"}`,
      "",
      note,
    ].join("\n"),
    email,
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const source = typeof body.source === "string" ? body.source : "";

  if (THERAPIST_SOURCES.has(source)) {
    return handleTherapistLead(body);
  }

  const { name, contact, projectType, budget, preferredContact, message } = body;

  if (!name || !contact || !projectType || !budget || !preferredContact || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const result = await sendMail(
    `New project inquiry from ${name}`,
    `Name: ${name}\nContact: ${contact}\nProject type: ${projectType}\nApproximate budget: ${budget}\nPreferred contact: ${preferredContact}\n\n${message}`,
    contact,
  );

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}
