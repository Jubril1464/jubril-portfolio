import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "Portfolio Contact <onboarding@resend.dev>",
    to: "lukmanjubril2003@yahoo.com",
    replyTo: email,
    subject: `New message from ${name}`,
    html: `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#f9f9f9;border-radius:12px;">
        <h2 style="margin:0 0 24px;color:#0a0907;">New portfolio message</h2>
        <p style="margin:0 0 8px;"><strong>Name:</strong> ${name}</p>
        <p style="margin:0 0 8px;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p style="margin:16px 0 8px;"><strong>Message:</strong></p>
        <p style="margin:0;white-space:pre-wrap;background:#fff;padding:16px;border-radius:8px;border:1px solid #e5e5e5;">${message}</p>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
