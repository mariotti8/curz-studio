"use client";

import { ArrowUpRight } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("Niente rumore. Solo novità selezionate sul lancio.");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("loading"); setMessage("Invio in corso…");
    try {
      const website = new FormData(event.currentTarget).get("website");
      const response = await fetch("/api/waitlist", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, website }) });
      const data = await response.json() as { message?: string };
      if (!response.ok) throw new Error();
      setState("success"); setMessage(data.message ?? "Sei nella lista. Ti scriveremo presto."); setEmail("");
    } catch { setState("error"); setMessage("Non è stato possibile completare l’iscrizione. Riprova tra poco."); }
  }
  return <main className="coming-soon">
    <div className="coming-soon-image" aria-hidden="true" /><div className="coming-soon-vignette" aria-hidden="true" />
    <header className="coming-soon-header"><span>CURZ STUDIO</span></header>
    <section className="coming-soon-content"><h1>La luce<br />diventa materia.</h1>
      <p className="coming-soon-copy">Una nuova luce sta arrivando.</p>
      <form className="waitlist-form" onSubmit={submit}><label htmlFor="waitlist-email">Ricevi l’accesso anticipato</label><div className="waitlist-fields"><input id="waitlist-email" type="email" required autoComplete="email" placeholder="La tua email" value={email} onChange={(event) => setEmail(event.target.value)} /><button type="submit" disabled={state === "loading"}>Unisciti</button></div><input className="waitlist-honeypot" tabIndex={-1} autoComplete="off" aria-hidden="true" name="website" /><p className={`waitlist-message ${state}`} aria-live="polite">{message}</p></form>
    </section>
    <a className="coming-soon-instagram" href="https://www.instagram.com/curzstudio/" target="_blank" rel="noreferrer"><svg className="instagram-mark" aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none" /></svg><span>@curzstudio</span><ArrowUpRight size={15} /></a><p className="coming-soon-index">MILANO · ITALIA<br />2026</p>
  </main>;
}
