"use client";

import Link from "next/link";
import { useState } from "react";
import { AddToCart, type Variant } from "../components/AddToCart";
import { CookieBanner, Footer, SiteHeader } from "../components/SiteShell";
import { useLanguage } from "../components/LanguageProvider";
import { formatEuro, TRIADE_PRICE } from "../lib/product";

export default function ProductPage() {
  const { language, t } = useLanguage();
  const [variant, setVariant] = useState<Variant>({ cable: "Rosso ossido", temperature: "2700 K", size: "Standard", price: TRIADE_PRICE });
  const [image, setImage] = useState("/images/triade-catalog-off-v3.png");
  return <main className="inner-page product-page">
    <SiteHeader dark={false} />
    <section className="product-layout">
      <div className="product-gallery">
        <div className="product-main"><img src={image} alt="Lampada da parete Triade" /></div>
        <div className="thumbs" aria-label="Galleria prodotto">
          {["/images/triade-catalog-off-v3.png","/images/triade-catalog-on.png","/images/triade-macro-editorial.png","/images/triade-living-premium.png"].map((src, i) => <button key={src} onClick={() => setImage(src)} className={image === src ? "active" : ""} aria-label={`Mostra immagine ${i+1}`}><img src={src} alt="" /></button>)}
        </div>
      </div>
      <aside className="product-info">
        <p className="section-label">{t("wallLampLabel")}</p><h1>Triade</h1><p className="product-price">{formatEuro(TRIADE_PRICE, language)} <small>{t("vatIncluded")}</small></p>
        <p className="product-intro">{t("productIntro")}</p>
        <fieldset><legend>{t("cableColorLong")}</legend>{[["Rosso ossido","oxideRed"],["Nero grafite","graphiteBlack"],["Avorio","ivory"]].map(([value,key]) => <button key={value} className={variant.cable===value?"selected":""} onClick={() => setVariant({...variant,cable:value})}>{t(key)}</button>)}</fieldset>
        <fieldset><legend>{t("temperature")}*</legend>{["2700 K","3000 K"].map(v => <button key={v} className={variant.temperature===v?"selected":""} onClick={() => setVariant({...variant,temperature:v})}>{v}</button>)}</fieldset>
        <AddToCart variant={variant} />
        <div className="delivery"><p><strong>{t("availableToOrder")}</strong><span>{t("deliveryEstimate")}</span></p><p><strong>{t("insuredShipping")}</strong><span>{t("freeItaly")}</span></p><p><strong>{t("curzWarranty")}</strong><span>{t("twoYears")}</span></p></div>
        <details><summary>{t("productDetails")}</summary><p>{t("productDetailsText")}</p></details>
        <details><summary>{t("shippingReturns")}</summary><p>{t("shippingReturnsText")}</p></details>
        <p className="technical-warning">{t("provisionalInfo")}</p>
      </aside>
    </section>
    <section className="product-callout"><p>{t("individuallyChecked")}</p><Link href="/design">{t("discoverHow")}</Link></section>
    <Footer /><CookieBanner />
  </main>;
}
