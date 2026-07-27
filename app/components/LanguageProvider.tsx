"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Language = "it" | "en";

const copy: Record<Language, Record<string, string>> = {
  it: {
    product: "Prodotto", design: "Design", materials: "Materiali", settings: "Ambientazioni",
    specs: "Specifiche", story: "Storia", designStory: "Design e storia", buyTriade: "Acquista Triade",
    cart: "Carrello", account: "Account", openMenu: "Apri menu", closeMenu: "Chiudi menu",
    navigation: "Navigazione principale", mobileNavigation: "Navigazione mobile",
    footerClaim: "Oggetti di luce. Disegnati a Milano.", contacts: "Contatti",
    cookieText: "Usiamo cookie tecnici per offrirti un’esperienza essenziale. Gli analytics restano disattivati finché non scegli di accettarli.",
    necessaryOnly: "Solo necessari", accept: "Accetta", cookiePreferences: "Preferenze cookie",
    addToCart: "Aggiungi al carrello", addedToCart: "Aggiunta al carrello", quantity: "Quantità",
    wallLampSteel: "Lampada da parete · Acciaio", heroPayoff: "La luce diventa materia.",
    heroDescription: "Tre corpi luminosi, un solo gesto verticale. Una presenza scultorea che disegna lo spazio anche quando è spenta.",
    discoverLamp: "Scopri la lampada", buy: "Acquista", explore: "Esplora", manifesto: "Manifesto",
    manifestoText: "Non abbiamo progettato soltanto una lampada. Abbiamo dato alla luce un ritmo, una materia, una presenza.",
    gesture: "Il gesto", threeCircles: "Tre cerchi.\nUna linea.",
    gestureText: "La forma concava raccoglie la luce e la restituisce alla parete in modo morbido. Il cavo attraversa i tre elementi e diventa un tratto di colore, volutamente visibile.",
    discoverDesign: "Scopri il design", sculpturalPresence: "Presenza scultorea", reflectedLight: "Luce riflessa",
    material01: "Materia 01", steelAlive: "Acciaio.\nVivo alla luce.",
    materialText: "La superficie conserva i segni sottili della lavorazione e cambia carattere con l’accensione: fredda e specchiante di giorno, calda e profonda nella sera.",
    finish: "Finitura", naturalSteel: "Acciaio naturale", detail: "Dettaglio", concaveReflector: "Riflettore concavo",
    sign: "Segno", contrastCable: "Cavo tessile a contrasto", lightExperience: "Esperienza della luce",
    oneRoom: "Un ambiente.\nDue atmosfere.", turnOn: "Accendi la luce", turnOff: "Spegni la luce",
    warmWhite: "Bianco caldo*", dimmable: "Intensità regolabile*", settingsTitle: "Una presenza,\nmolti spazi.",
    roomList: "Soggiorno · Camera · Studio · Hospitality · Contract", configure: "Configura la tua Triade",
    personalDetail: "Il dettaglio\ndiventa personale.", cableColor: "Colore cavo", lightTemperature: "Temperatura della luce*",
    oxideRed: "Rosso ossido", graphiteBlack: "Nero grafite", ivory: "Avorio",
    technicalData: "Dati tecnici", essentialDetail: "Essenziale,\nin ogni dettaglio.",
    draftNote: "* Valori tecnici provvisori da confermare prima del lancio.",
    type: "Tipologia", wallLamp: "Lampada da parete", material: "Materiale", turnedSteel: "Acciaio tornito",
    source: "Sorgente", integratedLed: "LED integrato*", temperature: "Temperatura", dimming: "Dimmerazione",
    prepared: "Predisposta*", power: "Alimentazione", cable: "Cavo", customCable: "Tessile personalizzabile",
    warranty: "Garanzia", twoYears: "2 anni", certifications: "Certificazioni", defining: "In definizione*",
    closingTitle: "Porta una nuova\nluce nel tuo spazio.",
    designGeometry: "La geometria\ndella luce.", elementaryForm: "Una forma elementare",
    circleLine: "Il cerchio raccoglie.\nLa linea connette.",
    designIntroText: "Triade nasce dall’incontro tra due segni primari. Tre superfici concave trattengono la luce, mentre il cavo le attraversa senza nascondersi. La funzione diventa composizione.",
    materialCaption: "Materia · la superficie riflette ogni variazione", process: "Processo / 02",
    metalAtmosphere: "Dal metallo\nall’atmosfera.",
    processText: "La concavità è il cuore del progetto. Controlla il riflesso, attenua l’abbagliamento e genera profondità. L’acciaio non viene nascosto: racconta la propria lavorazione e reagisce alla luce.",
    prototypeCaption: "Prototipo · proporzioni e ritmo verticale",
    quote: "“Una lampada che resta presente anche quando la luce si spegne.”",
    designerText: "Un approccio essenziale alla forma, con una particolare attenzione alla relazione tra materia, spazio e uso quotidiano. L’ispirazione completa e il racconto del progetto saranno definiti nella prossima fase editoriale.",
    changeAtmosphere: "Triade è pronta\na cambiare atmosfera.", discoverProduct: "Scopri il prodotto",
    wallLampLabel: "Curz Studio · Lampada da parete", vatIncluded: "IVA inclusa",
    productIntro: "Tre riflettori concavi in acciaio, uniti da una linea tessile personalizzabile. Triade trasforma la parete in una composizione di luce.",
    cableColorLong: "Colore del cavo", availableToOrder: "Disponibile su ordinazione",
    deliveryEstimate: "Consegna stimata: 4–6 settimane*", insuredShipping: "Spedizione assicurata",
    freeItaly: "Gratuita in Italia", curzWarranty: "Garanzia Curz Studio", productDetails: "Dettagli prodotto",
    productDetailsText: "Acciaio lavorato, tre moduli luminosi, cavo tessile a vista. Dati elettrici definitivi in fase di certificazione.",
    shippingReturns: "Spedizione e resi",
    shippingReturnsText: "Reso entro 14 giorni dalla consegna, salvo configurazioni personalizzate. Imballaggio protettivo dedicato.",
    provisionalInfo: "* Informazioni provvisorie da confermare prima della vendita.",
    individuallyChecked: "Ogni Triade è preparata e controllata individualmente.", discoverHow: "Scopri come nasce",
    yourOrder: "Il tuo ordine", emptyCart: "Il carrello è ancora vuoto.", discoverTriade: "Scopri Triade",
    remove: "Rimuovi", subtotal: "Subtotale", included: "Inclusa", total: "Totale",
    proceedCheckout: "Procedi al checkout", secureDemo: "IVA inclusa. Pagamento sicuro. Nessun addebito in questa demo.",
    demoOrder: "Ordine dimostrativo", thankYou: "Grazie.\nLa tua Triade è quasi realtà.",
    demoConfirmation: "Questa è una conferma demo: nessun ordine o pagamento è stato effettuato.",
    backHome: "Torna alla homepage", protectedCheckout: "Checkout protetto · Demo", contactsStep: "01 · Contatti",
    completeOrder: "Completa il tuo ordine", deliveryStep: "02 · Consegna", firstName: "Nome", lastName: "Cognome",
    address: "Indirizzo", city: "Città", country: "Paese", italy: "Italia", switzerland: "Svizzera",
    paymentStep: "03 · Pagamento", paymentArea: "Area predisposta per Stripe / Shopify Payments",
    paymentNote: "Il pagamento reale sarà attivato collegando il provider e-commerce.", confirmDemo: "Conferma ordine demo",
  },
  en: {
    product: "Product", design: "Design", materials: "Materials", settings: "Interiors",
    specs: "Specifications", story: "Story", designStory: "Design & story", buyTriade: "Buy Triade",
    cart: "Cart", account: "Account", openMenu: "Open menu", closeMenu: "Close menu",
    navigation: "Main navigation", mobileNavigation: "Mobile navigation",
    footerClaim: "Objects of light. Designed in Milan.", contacts: "Contact",
    cookieText: "We use essential cookies to provide a refined experience. Analytics remain disabled until you choose to accept them.",
    necessaryOnly: "Essential only", accept: "Accept", cookiePreferences: "Cookie preferences",
    addToCart: "Add to cart", addedToCart: "Added to cart", quantity: "Quantity",
    wallLampSteel: "Wall lamp · Steel", heroPayoff: "Light becomes matter.",
    heroDescription: "Three luminous bodies, one vertical gesture. A sculptural presence that shapes space even when switched off.",
    discoverLamp: "Discover the lamp", buy: "Buy", explore: "Explore", manifesto: "Manifesto",
    manifestoText: "We did not simply design a lamp. We gave light a rhythm, a material and a presence.",
    gesture: "The gesture", threeCircles: "Three circles.\nOne line.",
    gestureText: "The concave form gathers light and returns it softly to the wall. The cable connects the three elements and becomes a deliberate line of colour.",
    discoverDesign: "Discover the design", sculpturalPresence: "Sculptural presence", reflectedLight: "Reflected light",
    material01: "Material 01", steelAlive: "Steel.\nAlive in light.",
    materialText: "The surface retains subtle traces of its making and changes character when lit: cool and reflective by day, warm and deep at night.",
    finish: "Finish", naturalSteel: "Natural steel", detail: "Detail", concaveReflector: "Concave reflector",
    sign: "Signature", contrastCable: "Contrasting textile cable", lightExperience: "The light experience",
    oneRoom: "One room.\nTwo atmospheres.", turnOn: "Turn on the light", turnOff: "Turn off the light",
    warmWhite: "Warm white*", dimmable: "Dimmable intensity*", settingsTitle: "One presence,\nmany spaces.",
    roomList: "Living · Bedroom · Studio · Hospitality · Contract", configure: "Configure your Triade",
    personalDetail: "The detail\nbecomes personal.", cableColor: "Cable colour", lightTemperature: "Light temperature*",
    oxideRed: "Oxide red", graphiteBlack: "Graphite black", ivory: "Ivory",
    technicalData: "Technical data", essentialDetail: "Essential,\nin every detail.",
    draftNote: "* Preliminary technical values to be confirmed before launch.",
    type: "Type", wallLamp: "Wall lamp", material: "Material", turnedSteel: "Turned steel",
    source: "Light source", integratedLed: "Integrated LED*", temperature: "Temperature", dimming: "Dimming",
    prepared: "Ready*", power: "Power supply", cable: "Cable", customCable: "Customisable textile",
    warranty: "Warranty", twoYears: "2 years", certifications: "Certifications", defining: "To be confirmed*",
    closingTitle: "Bring a new light\ninto your space.",
    designGeometry: "The geometry\nof light.", elementaryForm: "An elemental form",
    circleLine: "The circle gathers.\nThe line connects.",
    designIntroText: "Triade is born from the meeting of two primary signs. Three concave surfaces hold the light while the cable connects them without hiding. Function becomes composition.",
    materialCaption: "Material · the surface reflects every variation", process: "Process / 02",
    metalAtmosphere: "From metal\nto atmosphere.",
    processText: "The concavity is the heart of the design. It controls reflection, softens glare and creates depth. Steel is left visible: it reveals its making and responds to light.",
    prototypeCaption: "Prototype · proportion and vertical rhythm",
    quote: "“A lamp that remains present even when the light goes out.”",
    designerText: "An essential approach to form, with particular attention to the relationship between material, space and everyday use. The complete inspiration and design story will be developed in the next editorial phase.",
    changeAtmosphere: "Triade is ready\nto change the atmosphere.", discoverProduct: "Discover the product",
    wallLampLabel: "Curz Studio · Wall lamp", vatIncluded: "VAT included",
    productIntro: "Three concave steel reflectors joined by a customisable textile line. Triade transforms the wall into a composition of light.",
    cableColorLong: "Cable colour", availableToOrder: "Made to order",
    deliveryEstimate: "Estimated delivery: 4–6 weeks*", insuredShipping: "Insured shipping",
    freeItaly: "Complimentary in Italy", curzWarranty: "Curz Studio warranty", productDetails: "Product details",
    productDetailsText: "Worked steel, three luminous modules and a visible textile cable. Final electrical data is pending certification.",
    shippingReturns: "Shipping & returns",
    shippingReturnsText: "Returns within 14 days of delivery, except for customised configurations. Dedicated protective packaging.",
    provisionalInfo: "* Preliminary information to be confirmed before sale.",
    individuallyChecked: "Every Triade is prepared and inspected individually.", discoverHow: "Discover how it is made",
    yourOrder: "Your order", emptyCart: "Your cart is empty.", discoverTriade: "Discover Triade",
    remove: "Remove", subtotal: "Subtotal", included: "Included", total: "Total",
    proceedCheckout: "Proceed to checkout", secureDemo: "VAT included. Secure payment. No charge will be made in this demo.",
    demoOrder: "Demo order", thankYou: "Thank you.\nYour Triade is almost a reality.",
    demoConfirmation: "This is a demo confirmation: no order or payment has been processed.",
    backHome: "Back to homepage", protectedCheckout: "Secure checkout · Demo", contactsStep: "01 · Contact",
    completeOrder: "Complete your order", deliveryStep: "02 · Delivery", firstName: "First name", lastName: "Last name",
    address: "Address", city: "City", country: "Country", italy: "Italy", switzerland: "Switzerland",
    paymentStep: "03 · Payment", paymentArea: "Ready for Stripe / Shopify Payments integration",
    paymentNote: "Live payments will be enabled once the e-commerce provider is connected.", confirmDemo: "Confirm demo order",
  },
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
} | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("it");

  useEffect(() => {
    const saved = localStorage.getItem("curz-language");
    if (saved === "en" || saved === "it") setLanguage(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("curz-language", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: (key) => copy[language][key] ?? key }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

export function Multiline({ value }: { value: string }) {
  const parts = value.split("\n");
  return <>{parts.map((part, index) => <span key={`${part}-${index}`}>{part}{index < parts.length - 1 && <br />}</span>)}</>;
}
