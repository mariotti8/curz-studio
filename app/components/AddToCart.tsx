"use client";

import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "./LanguageProvider";

export type Variant = { cable: string; temperature: string; size: string; price: number };

export function AddToCart({ compact = false, variant }: { compact?: boolean; variant: Variant }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const { t } = useLanguage();
  const add = () => {
    localStorage.setItem("triade-cart", String(Number(localStorage.getItem("triade-cart") || 0) + qty));
    localStorage.setItem("triade-variant", JSON.stringify(variant));
    window.dispatchEvent(new Event("cart-update"));
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className={compact ? "buy-compact" : "buy-actions"}>
      {!compact && <div className="quantity" aria-label={t("quantity")}>
        <button onClick={() => setQty(Math.max(1, qty - 1))} aria-label="Riduci quantità"><Minus size={16} /></button>
        <span>{qty}</span>
        <button onClick={() => setQty(qty + 1)} aria-label="Aumenta quantità"><Plus size={16} /></button>
      </div>}
      <button className={`add-button ${added ? "added" : ""}`} onClick={add}>
        {added ? <><Check size={17} /> {t("addedToCart")}</> : <><ShoppingBag size={17} /> {t("addToCart")}</>}
      </button>
    </div>
  );
}
