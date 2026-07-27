import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { email, website } = await request.json() as { email?: string; website?: string };
    if (website) return NextResponse.json({ message: "Iscrizione completata." });
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ message: "Inserisci un indirizzo email valido." }, { status: 400 });
    const host = process.env.SMTP_HOST, user = process.env.SMTP_USER, pass = process.env.SMTP_PASSWORD, to = process.env.WAITLIST_TO_EMAIL ?? user;
    const port = Number(process.env.SMTP_PORT ?? 465);
    if (!host || !user || !pass || !to) throw new Error("SMTP not configured");
    await nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } }).sendMail({ from: `"Curz Studio" <${user}>`, to, replyTo: email, subject: "Nuova iscrizione — Triade", text: `Nuova richiesta di accesso anticipato: ${email}` });
    return NextResponse.json({ message: "Sei nella lista. Ti scriveremo presto." });
  } catch { return NextResponse.json({ message: "Non è stato possibile completare l’iscrizione." }, { status: 500 }); }
}
