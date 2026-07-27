"use client";

import Link from "next/link";
import { CookieBanner, Footer, SiteHeader } from "../components/SiteShell";
import { Multiline, useLanguage } from "../components/LanguageProvider";

export default function DesignPage() {
  const { t } = useLanguage();
  return <main className="inner-page design-page">
    <SiteHeader />
    <section className="design-hero"><img src="/images/triade-macro-editorial.png" alt="Triade" /><div><p className="section-label">Design / 01</p><h1><Multiline value={t("designGeometry")} /></h1></div></section>
    <section className="design-intro"><p className="section-label">{t("elementaryForm")}</p><div><h2><Multiline value={t("circleLine")} /></h2><p>{t("designIntroText")}</p></div></section>
    <section className="process-grid" id="storia">
      <figure><img src="/images/triade-macro-editorial.png" alt="Triade steel detail" /><figcaption>{t("materialCaption")}</figcaption></figure>
      <div><p className="section-label">{t("process")}</p><h2><Multiline value={t("metalAtmosphere")} /></h2><p>{t("processText")}</p></div>
      <figure><img src="/images/triade-process-studio.png" alt="Triade prototype" /><figcaption>{t("prototypeCaption")}</figcaption></figure>
      <blockquote>{t("quote")}<cite>Curz Studio, designer</cite></blockquote>
    </section>
    <section className="designer"><div><p className="section-label">Designer / 03</p><h2>Curz Studio</h2></div><p>{t("designerText")}</p></section>
    <section className="design-cta"><img src="/images/triade-living-premium.png" alt="Triade interior" /><div><h2><Multiline value={t("changeAtmosphere")} /></h2><Link href="/product" className="button button-light">{t("discoverProduct")}</Link></div></section>
    <Footer /><CookieBanner />
  </main>;
}
