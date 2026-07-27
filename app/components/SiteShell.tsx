"use client";

import Link from "next/link";
import { Menu, ShoppingBag, UserRound, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export function SiteHeader({ dark = true }: { dark?: boolean }) {
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const update = () => setCount(Number(localStorage.getItem("triade-cart") || 0));
    update();
    window.addEventListener("cart-update", update);
    return () => window.removeEventListener("cart-update", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <header className={`site-header ${dark ? "" : "header-solid"}`}>
        <Link href="/" className="brand" aria-label="Curz Studio, homepage">CURZ STUDIO</Link>
        <nav className="desktop-nav" aria-label={t("navigation")}>
          <Link href="/#prodotto">{t("product")}</Link>
          <Link href="/design">{t("design")}</Link>
          <Link href="/#materiali">{t("materials")}</Link>
          <Link href="/#ambientazioni">{t("settings")}</Link>
          <Link href="/#specifiche">{t("specs")}</Link>
          <Link href="/design#storia">{t("story")}</Link>
        </nav>
        <div className="nav-actions">
          <div className="language-switch" aria-label="Language">
            <button className={language === "it" ? "active" : ""} onClick={() => setLanguage("it")}>IT</button>
            <i aria-hidden="true">/</i>
            <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
          </div>
          <button aria-label={t("account")}><UserRound size={18} strokeWidth={1.5} /></button>
          <Link href="/cart" aria-label={`${t("cart")}, ${count}`} className="cart-icon">
            <ShoppingBag size={18} strokeWidth={1.5} />{count > 0 && <span>{count}</span>}
          </Link>
          <button
            className="menu-button"
            aria-label={t("openMenu")}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(true)}
          >
            <Menu size={22} />
          </button>
        </div>
      </header>
      {open && (
        <aside className="mobile-menu" id="mobile-navigation" aria-label={t("mobileNavigation")}>
          <div className="mobile-menu-head">
            <Link href="/" className="brand" onClick={() => setOpen(false)}>CURZ STUDIO</Link>
            <button autoFocus aria-label={t("closeMenu")} onClick={() => setOpen(false)}><X size={28} /></button>
          </div>
          <nav aria-label={t("mobileNavigation")}>
            <Link href="/#prodotto" onClick={() => setOpen(false)}><span>01</span>{t("product")}</Link>
            <Link href="/design" onClick={() => setOpen(false)}><span>02</span>{t("designStory")}</Link>
            <Link href="/#materiali" onClick={() => setOpen(false)}><span>03</span>{t("materials")}</Link>
            <Link href="/#ambientazioni" onClick={() => setOpen(false)}><span>04</span>{t("settings")}</Link>
            <Link href="/#specifiche" onClick={() => setOpen(false)}><span>05</span>{t("specs")}</Link>
          </nav>
          <div className="mobile-menu-foot">
            <div className="language-switch mobile-language" aria-label="Language">
              <button className={language === "it" ? "active" : ""} onClick={() => setLanguage("it")}>IT</button>
              <i aria-hidden="true">/</i>
              <button className={language === "en" ? "active" : ""} onClick={() => setLanguage("en")}>EN</button>
            </div>
            <Link href="/cart" onClick={() => setOpen(false)}>{t("cart")} ({count})</Link>
            <Link href="/product" className="mobile-buy" onClick={() => setOpen(false)}>{t("buyTriade")}</Link>
          </div>
        </aside>
      )}
    </>
  );
}

export function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="brand">CURZ STUDIO</div>
      <p>{t("footerClaim")}</p>
      <div><Link href="/product">Triade</Link><Link href="/design">Design</Link><a href="mailto:studio@curz.design">{t("contacts")}</a></div>
      <p className="footer-small">© 2026 Curz Studio · Privacy · Cookie</p>
    </footer>
  );
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const { t } = useLanguage();
  useEffect(() => setVisible(localStorage.getItem("triade-cookie") !== "ok"), []);
  if (!visible) return null;
  const accept = () => { localStorage.setItem("triade-cookie", "ok"); setVisible(false); };
  return (
    <aside className="cookie" aria-label={t("cookiePreferences")}>
      <p>{t("cookieText")}</p>
      <div><button onClick={accept}>{t("necessaryOnly")}</button><button className="cookie-accept" onClick={accept}>{t("accept")}</button></div>
    </aside>
  );
}
