"use client";

import Link from "next/link";
import { Lock } from "lucide-react";
import { useState } from "react";
import { Multiline, useLanguage } from "../components/LanguageProvider";
import { formatEuro, TRIADE_PRICE } from "../lib/product";

export default function CheckoutPage() {
  const [done, setDone] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  if (done) return <main className="checkout-page checkout-done"><div><p className="brand">CURZ STUDIO</p><span>{t("demoOrder")}</span><h1><Multiline value={t("thankYou")} /></h1><p>{t("demoConfirmation")}</p><Link href="/">{t("backHome")}</Link></div></main>;
  return <main className="checkout-page"><header><Link href="/" className="brand">CURZ STUDIO</Link><div className="checkout-head-actions"><div className="language-switch light-switch"><button className={language==="it"?"active":""} onClick={()=>setLanguage("it")}>IT</button><i>/</i><button className={language==="en"?"active":""} onClick={()=>setLanguage("en")}>EN</button></div><span><Lock size={14}/> {t("protectedCheckout")}</span></div></header><div className="checkout-grid">
    <form onSubmit={e=>{e.preventDefault();setDone(true)}}><p className="section-label">{t("contactsStep")}</p><h1>{t("completeOrder")}</h1><label>Email<input required type="email" placeholder="name@email.com"/></label>
      <p className="section-label form-section">{t("deliveryStep")}</p><div className="form-row"><label>{t("firstName")}<input required /></label><label>{t("lastName")}<input required /></label></div><label>{t("address")}<input required /></label><div className="form-row"><label>CAP / ZIP<input required inputMode="numeric"/></label><label>{t("city")}<input required /></label></div><label>{t("country")}<select defaultValue="IT"><option value="IT">{t("italy")}</option><option value="CH">{t("switzerland")}</option></select></label>
      <p className="section-label form-section">{t("paymentStep")}</p><div className="payment-placeholder"><Lock size={18}/><p>{t("paymentArea")}</p><small>{t("paymentNote")}</small></div><button className="checkout-button" type="submit">{t("confirmDemo")} · {formatEuro(TRIADE_PRICE, language)}</button></form>
    <aside><img src="/images/triade-catalog-off-v3.png" alt="Triade"/><div><h2>Triade</h2><p>{t("cable")} {t("oxideRed")} · 2700 K</p></div><strong>{formatEuro(TRIADE_PRICE, language)}</strong><dl><div><dt>{t("subtotal")}</dt><dd>{formatEuro(TRIADE_PRICE, language)}</dd></div><div><dt>{t("insuredShipping")}</dt><dd>{t("included")}</dd></div><div><dt>{t("total")}</dt><dd>{formatEuro(TRIADE_PRICE, language)}</dd></div></dl></aside>
  </div></main>;
}
