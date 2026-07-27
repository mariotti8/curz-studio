"use client";

import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { Variant } from "../components/AddToCart";
import { SiteHeader } from "../components/SiteShell";
import { useLanguage } from "../components/LanguageProvider";
import { formatEuro, TRIADE_PRICE } from "../lib/product";

const fallback: Variant = { cable: "Rosso ossido", temperature: "2700 K", size: "Standard", price: TRIADE_PRICE };

export default function CartPage() {
  const { language, t } = useLanguage();
  const [qty, setQty] = useState(0); const [variant, setVariant] = useState(fallback);
  useEffect(() => {
    setQty(Number(localStorage.getItem("triade-cart") || 0));
    try {
      const saved = JSON.parse(localStorage.getItem("triade-variant") || JSON.stringify(fallback));
      setVariant({ ...saved, price: TRIADE_PRICE });
    } catch {}
  }, []);
  const update = (n:number) => { const q=Math.max(0,n); setQty(q); localStorage.setItem("triade-cart",String(q)); window.dispatchEvent(new Event("cart-update")); };
  const cableLabel = t(variant.cable === "Rosso ossido" ? "oxideRed" : variant.cable === "Nero grafite" ? "graphiteBlack" : "ivory");
  return <main className="inner-page commerce-page"><SiteHeader dark={false} /><section className="cart-wrap"><p className="section-label">{t("yourOrder")}</p><h1>{t("cart")}</h1>
    {qty===0 ? <div className="empty-cart"><p>{t("emptyCart")}</p><Link href="/product" className="button button-light">{t("discoverTriade")}</Link></div> :
    <><article className="cart-item"><img src="/images/triade-catalog-off-v3.png" alt="Triade" /><div><h2>Triade</h2><p>{t("cable")} {cableLabel} · {variant.temperature}</p><button onClick={()=>update(0)}><Trash2 size={14}/> {t("remove")}</button></div><div className="quantity"><button onClick={()=>update(qty-1)}><Minus size={15}/></button><span>{qty}</span><button onClick={()=>update(qty+1)}><Plus size={15}/></button></div><strong>{formatEuro(variant.price*qty, language)}</strong></article>
    <div className="cart-summary"><div><span>{t("subtotal")}</span><strong>{formatEuro(variant.price*qty, language)}</strong></div><div><span>{t("insuredShipping")}</span><strong>{t("included")}</strong></div><div className="total"><span>{t("total")}</span><strong>{formatEuro(variant.price*qty, language)}</strong></div><Link href="/checkout" className="checkout-button">{t("proceedCheckout")}</Link><small>{t("secureDemo")}</small></div></>}
  </section></main>;
}
