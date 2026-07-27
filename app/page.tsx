"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import { AddToCart, type Variant } from "./components/AddToCart";
import { CookieBanner, Footer, SiteHeader } from "./components/SiteShell";
import { Multiline, useLanguage } from "./components/LanguageProvider";
import { formatEuro, TRIADE_PRICE } from "./lib/product";

const specs = [
  ["type", "wallLamp"], ["material", "turnedSteel"], ["source", "integratedLed"],
  ["temperature", "2700 K / 3000 K*"], ["dimming", "prepared"], ["CRI", ">90*"],
  ["power", "220–240 V*"], ["cable", "customCable"], ["warranty", "twoYears"],
  ["certifications", "defining"],
];

export default function Home() {
  const { language, t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageScale = useTransform(scrollYProgress, [0, 0.18], [1, reduceMotion ? 1 : 1.08]);
  const heroCopyY = useTransform(scrollYProgress, [0, 0.16], [0, reduceMotion ? 0 : -70]);
  const heroCopyOpacity = useTransform(scrollYProgress, [0, 0.13], [1, reduceMotion ? 1 : 0]);
  const materialRef = useRef<HTMLElement>(null);
  const ambienceRef = useRef<HTMLElement>(null);
  const closingRef = useRef<HTMLElement>(null);
  const { scrollYProgress: materialProgress } = useScroll({ target: materialRef, offset: ["start end", "end start"] });
  const { scrollYProgress: ambienceProgress } = useScroll({ target: ambienceRef, offset: ["start end", "end start"] });
  const { scrollYProgress: closingProgress } = useScroll({ target: closingRef, offset: ["start end", "end start"] });
  const materialY = useTransform(materialProgress, [0, 1], [reduceMotion ? "0%" : "-5%", reduceMotion ? "0%" : "5%"]);
  const ambienceScale = useTransform(ambienceProgress, [0, 1], [reduceMotion ? 1 : 1.08, 1]);
  const closingScale = useTransform(closingProgress, [0, 1], [reduceMotion ? 1 : 1.1, 1]);
  const [before, setBefore] = useState(false);
  const [variant, setVariant] = useState<Variant>({ cable: "Rosso ossido", temperature: "2700 K", size: "Standard", price: TRIADE_PRICE });

  return (
    <main>
      <SiteHeader />
      <section className="hero" id="prodotto">
        <motion.div className="hero-photo" initial={reduceMotion ? false : { opacity: 0, filter: "brightness(0)" }} animate={{ opacity: 1, filter: "brightness(1)" }} transition={{ duration: 2.3, ease: [0.22, 1, 0.36, 1] }} style={{ scale: imageScale }}>
          <img src="/images/triade-hero-cinematic.png" alt="Lampada da parete Triade accesa su una parete antracite, con tre riflettori in acciaio e cavo rosso" />
        </motion.div>
        <div className="hero-shade" />
        <motion.div className="hero-copy" initial={reduceMotion ? false : { opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 1.15, duration: 1 }} style={{ y: heroCopyY, opacity: heroCopyOpacity }}>
          <p className="eyebrow">{t("wallLampSteel")}</p>
          <h1>Triade</h1><p className="payoff">{t("heroPayoff")}</p>
          <p className="hero-description">{t("heroDescription")}</p>
          <div className="hero-actions"><a href="#design" className="button button-light">{t("discoverLamp")}</a><Link href="/product" className="button button-line">{t("buy")} · {formatEuro(TRIADE_PRICE, language)}</Link></div>
        </motion.div>
        <div className="hero-index" aria-hidden="true">01 / 07</div>
        <a href="#design" className="scroll-cue" aria-label={t("discoverDesign")}><ArrowDown size={18} /><span>{t("explore")}</span></a>
      </section>

      <section className="manifesto" id="design">
        <p className="section-label">{t("manifesto")}</p>
        <motion.h2 initial={reduceMotion ? false : { opacity: 0.18, y: 80 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.45 }} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}>{t("manifestoText")}</motion.h2>
      </section>

      <section className="product-story">
        <motion.div className="sticky-copy" initial={reduceMotion ? false : { opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: 0.4 }} transition={{ duration: .9, ease: [0.22, 1, 0.36, 1] }}>
          <p className="section-label">{t("gesture")}</p><h2><Multiline value={t("threeCircles")} /></h2>
          <p>{t("gestureText")}</p>
          <Link href="/design">{t("discoverDesign")} <ArrowUpRight size={15} /></Link>
        </motion.div>
        <div className="story-images">
          <motion.figure initial={reduceMotion ? false : { opacity: 0, y: 90 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .2 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}><img src="/images/triade-story-coherent-v1.png" alt="Triade" /><figcaption>01 · {t("sculpturalPresence")}</figcaption></motion.figure>
          <motion.figure initial={reduceMotion ? false : { opacity: 0, y: 90 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .2 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}><img src="/images/triade-macro-editorial.png" alt="Triade detail" /><figcaption>02 · {t("reflectedLight")}</figcaption></motion.figure>
        </div>
      </section>

      <section className="materials" id="materiali" ref={materialRef}>
        <div className="material-image"><motion.img style={{ y: materialY, scale: 1.08 }} src="/images/triade-macro-editorial.png" alt="Macro della superficie lavorata in acciaio di Triade illuminata" /></div>
        <motion.div className="material-copy" initial={reduceMotion ? false : { opacity: 0, x: 65 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ amount: .35 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}><p className="section-label">{t("material01")}</p><h2><Multiline value={t("steelAlive")} /></h2><p>{t("materialText")}</p><dl><div><dt>{t("finish")}</dt><dd>{t("naturalSteel")}</dd></div><div><dt>{t("detail")}</dt><dd>{t("concaveReflector")}</dd></div><div><dt>{t("sign")}</dt><dd>{t("contrastCable")}</dd></div></dl></motion.div>
      </section>

      <section className="light-experience">
        <motion.div className="light-heading" initial={reduceMotion ? false : { opacity: 0, y: 55 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .4 }} transition={{ duration: .9 }}><p className="section-label">{t("lightExperience")}</p><h2><Multiline value={t("oneRoom")} /></h2></motion.div>
        <motion.button initial={reduceMotion ? false : { opacity: 0, scale: .965 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: .25 }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }} className={`light-compare ${before ? "is-off" : ""}`} onClick={() => setBefore(!before)} aria-pressed={before}>
          <img src={before ? "/images/triade-hero-cinematic.png" : "/images/triade-living-premium.png"} alt={before ? "Triade in un ambiente scuro e minimale" : "Soggiorno contemporaneo con Triade accesa"} />
          <span>{before ? t("turnOn") : t("turnOff")}</span>
        </motion.button>
        <motion.div className="light-facts" initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ amount: .5 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .12 } } }}>{[["2700 K",t("warmWhite")],[">90","CRI*"],["Dimmer",t("dimmable")]].map(([value,label]) => <motion.div key={value} variants={{ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0 } }}><strong>{value}</strong><span>{label}</span></motion.div>)}</motion.div>
      </section>

      <section className="ambience" id="ambientazioni" ref={ambienceRef}>
        <div className="ambience-image"><motion.img style={{ scale: ambienceScale }} src="/images/triade-living-premium.png" alt="Triade installata in un soggiorno contemporaneo milanese" /></div>
        <motion.div className="ambience-copy" initial={reduceMotion ? false : { opacity: 0, y: 70 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .4 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}><p className="section-label">{t("settings")}</p><h2><Multiline value={t("settingsTitle")} /></h2><p>{t("roomList")}</p></motion.div>
      </section>

      <section className="configurator">
        <motion.div className="config-visual" initial={reduceMotion ? false : { opacity: 0, clipPath: "inset(0 100% 0 0)" }} whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }} viewport={{ amount: .18 }} transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}><img src="/images/triade-catalog-off-v3.png" alt="Triade spenta con cavo rosso che parte sotto il primo riflettore" /></motion.div>
        <motion.div className="config-copy" initial={reduceMotion ? false : { opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .35 }} transition={{ duration: .95 }}><p className="section-label">{t("configure")}</p><h2><Multiline value={t("personalDetail")} /></h2>
          <fieldset><legend>{t("cableColor")}</legend>{[["Rosso ossido","oxideRed"],["Nero grafite","graphiteBlack"],["Avorio","ivory"]].map(([value,key]) => <button key={value} className={variant.cable === value ? "selected" : ""} onClick={() => setVariant({...variant, cable:value})}>{t(key)}</button>)}</fieldset>
          <fieldset><legend>{t("lightTemperature")}</legend>{["2700 K","3000 K"].map(v => <button key={v} className={variant.temperature === v ? "selected" : ""} onClick={() => setVariant({...variant, temperature:v})}>{v}</button>)}</fieldset>
          <div className="config-price"><div><small>Triade · {t(variant.cable === "Rosso ossido" ? "oxideRed" : variant.cable === "Nero grafite" ? "graphiteBlack" : "ivory")}</small><strong>{formatEuro(variant.price, language)}</strong></div><AddToCart compact variant={variant} /></div>
        </motion.div>
      </section>

      <section className="specifications" id="specifiche">
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 45 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .4 }}><p className="section-label">{t("technicalData")}</p><h2><Multiline value={t("essentialDetail")} /></h2><p className="draft-note">{t("draftNote")}</p></motion.div>
        <motion.div className="tech-drawing" aria-label="Disegno tecnico indicativo di Triade" initial={reduceMotion ? false : { opacity: 0, scale: .94 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ amount: .25 }} transition={{ duration: 1 }}><div className="tech-line" /><i /><i /><i /><span>3 × Ø indicativo</span></motion.div>
        <motion.dl initial={reduceMotion ? false : "hidden"} whileInView="visible" viewport={{ amount: .2 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: .07 } } }}>{specs.map(([a,b]) => <motion.div key={a} variants={{ hidden: { opacity: 0, x: 24 }, visible: { opacity: 1, x: 0 } }}><dt>{t(a)}</dt><dd>{b.includes(" ") || b.includes(">") || b.includes("*") ? b : t(b)}</dd></motion.div>)}</motion.dl>
      </section>

      <section className="closing" ref={closingRef}>
        <motion.img style={{ scale: closingScale }} src="/images/triade-hero-cinematic.png" alt="Triade accesa su parete antracite, luce calda sui tre riflettori" />
        <motion.div initial={reduceMotion ? false : { opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ amount: .45 }} transition={{ duration: 1 }}><p className="section-label">Triade · Curz Studio</p><h2><Multiline value={t("closingTitle")} /></h2><Link href="/product" className="button button-light">{t("buyTriade")}</Link></motion.div>
      </section>

      <div className="sticky-buy"><span>Triade <small>{formatEuro(TRIADE_PRICE, language)}</small></span><Link href="/product">{t("buy")}</Link></div>
      <Footer /><CookieBanner />
    </main>
  );
}
