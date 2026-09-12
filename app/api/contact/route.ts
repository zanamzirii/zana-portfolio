import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const schema = z.object({
  name:    z.string().min(2).max(100),
  email:   z.string().email(),
  subject: z.string().max(200).optional(),
  message: z.string().min(10).max(2000),
  website: z.string().max(0).optional(), // honeypot — must be empty
});

export async function POST(req: NextRequest) {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot check — bots fill this, humans don't see it
  if (typeof body === "object" && body !== null && "website" in body && (body as Record<string, unknown>).website) {
    // Silently succeed — don't let bots know they were blocked
    return NextResponse.json({ success: true });
  }

  const result = schema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const { name, email, subject, message } = result.data;

  try {
    await resend.emails.send({
      from:    "Portfolio Contact <onboarding@resend.dev>",
      to:      ["zanarajababdulrahman@gmail.com"],
      reply_to: email,
      subject: subject || `New message from ${name} — Portfolio`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject ?? "No subject"}

Message:
${message}
      `.trim(),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 },
    );
  }
}
