import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { logger } from "@/lib/logger";

// --- Schema validation ---
const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(255),
  phone: z.string().max(20).optional().default(""),
  message: z.string().min(1).max(1000),
  // Honeypot antispam
  website: z.string().max(0).optional().default(""),
});

// --- Rate limiting (in-memory, 3 req/min par IP) ---
const rateMap = new Map<string, number[]>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 60_000; // 1 min

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (rateMap.get(ip) || []).filter((t) => now - t < RATE_WINDOW);
  if (timestamps.length >= RATE_LIMIT) return true;
  timestamps.push(now);
  rateMap.set(ip, timestamps);
  return false;
}

// --- POST handler ---
export async function POST(request: Request) {
  // Rate limiting
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  // Parse + validate body
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "validation", details: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { name, email, phone, message, website } = parsed.data;

  // Honeypot check — bots fill hidden fields, humans don't
  if (website) {
    return NextResponse.json({ success: true });
  }

  // Send email via Resend
  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_EMAIL_TO;
  if (!resendKey || !to) {
    logger.error("Missing RESEND_API_KEY or CONTACT_EMAIL_TO", "contact-api");
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }

  const resend = new Resend(resendKey);

  try {
    await resend.emails.send({
      from: "Formulaire bateau-a-paris.fr <onboarding@resend.dev>",
      to: [to],
      replyTo: email,
      subject: `[Contact] ${name} — bateau-a-paris.fr`,
      html: `
        <h2>Nouveau message depuis le site</h2>
        <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
        <p><strong>Email :</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Téléphone :</strong> ${escapeHtml(phone)}</p>` : ""}
        <hr />
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
        <hr />
        <p style="color: #999; font-size: 12px;">
          Envoyé depuis le formulaire de contact de bateau-a-paris.fr
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error("Resend email send failed", "contact-api", error);
    return NextResponse.json({ error: "send_failed" }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
