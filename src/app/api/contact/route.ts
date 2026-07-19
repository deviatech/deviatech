import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/content/site";

export async function POST(req: NextRequest) {
  const { name, contact, message } = await req.json();

  if (!name || !contact || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;

  if (!RESEND_API_KEY) {
    console.error("Contact form submission (RESEND_API_KEY not configured):", { name, contact, message });
    return NextResponse.json({ error: "Mail not configured" }, { status: 500 });
  }

  const resend = new Resend(RESEND_API_KEY);

  const { error } = await resend.emails.send({
    from: CONTACT_FROM_EMAIL || "DeviaTech <onboarding@resend.dev>",
    to: CONTACT_TO_EMAIL || site.email,
    replyTo: contact,
    subject: `New project inquiry from ${name}`,
    text: `Name: ${name}\nContact: ${contact}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
