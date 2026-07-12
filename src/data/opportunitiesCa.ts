import type { Opportunity } from "./opportunities";

// Catalan (ca) localisation of src/data/opportunities.ts.
// Keep slugs, numbers, image paths, company names, and the machine-keyed
// fields (status, structure, riskProfile) identical to the English source —
// pages translate those enums at render time via locale dictionaries.

export const opportunities: Opportunity[] = [
  // ──────────────────────────────────────────────────────────
  //  1. Andorra la Vella Commercial Plaza — Debt — €2M
  // ──────────────────────────────────────────────────────────
  {
    slug: "project-andorra-la-vella",
    name: "Project Andorra la Vella",
    tagline:
      "Plaça comercial d'ús mixt al districte financer de la capital, amb ingressos previsibles procedents de lloguers de llarga durada amb inquilins consolidats.",
    status: "Open for Investment",
    location: "Andorra la Vella, Andorra",
    parish: "Andorra la Vella",
    sector: "Comercial",

    structure: "Debt",
    headlineReturn: "Cupó anual",

    totalProjectValue: "€9M",
    equityRaise: "€2M",
    minInvestment: "€500k",
    maxInvestment: "€1M",
    holdPeriod: "24–36 mesos",

    fundingProgress: 65,
    amountCommitted: "€1.3M de €2M",
    fundingDeadline: "30 de setembre de 2026",
    riskProfile: "Core",

    units: "Retail mixt + 4 plantes d'oficines",
    sqm: "2,800 m²",
    floors: "5 plantes",
    completionDate: "Completat el 2018",

    image: "/Andorra-la-Vella.webp",
    gallery: [
      "/Andorra-la-Vella.webp",
      "/hero-andorra-r2ptlkd.webp",
      "/04c-copy.webp",
    ],

    description:
      "Aquest projecte a Andorra la Vella és un edifici comercial d'ús mixt plenament operatiu al cor del districte financer de la capital. Els inquilins amb contractes de llarga durada, en locals comercials a peu de carrer i quatre plantes d'oficines professionals, generen ingressos mensuals de lloguer previsibles. L'estructura de deute ofereix exposició sènior garantida a un actiu estabilitzat i generador de rendes, sense risc de desenvolupament ni de comercialització.",
    investmentThesis:
      "El nucli comercial d'Andorra la Vella és un mercat amb una escassetat crònica d'oferta. El sector bancari de la capital, els serveis professionals i les funcions governamentals es concentren a pocs centenars de metres d'aquest emplaçament, ancorant una demanda sostinguda d'espai d'oficines i retail de qualitat. Amb els arrendaments ja en vigor i l'actiu ja generant rendes, els titulars de deute queden aïllats dels riscos de desenvolupament, comercialització i inquilins que assumeixen els projectes en fases més primerenques.",
    highlights: [
      "Actiu plenament operatiu i llogat, amb ingressos des del primer dia",
      "Capital garantit per un edifici comercial prime al districte financer de la capital",
      "Inquilins amb contractes de llarga durada a les plantes de retail i oficines",
      "Sense risc de desenvolupament ni de comercialització",
      "Tinença típica més curta que la dels projectes alpins o hotelers",
    ],
    useOfFunds: [
      { label: "Préstec a l'SPV del projecte", percentage: 92 },
      { label: "Despeses d'estructuració i legals", percentage: 4 },
      { label: "Compte de reserva d'interessos", percentage: 4 },
    ],
    capitalStack: [
      { label: "Deute d'inversors (aquesta captació)", percentage: 22 },
      { label: "Deute bancari sènior", percentage: 55, note: "Andbank — term sheet signat" },
      { label: "Equity del promotor", percentage: 18, note: "Compromís directe d'Equity Partners" },
      { label: "Mezzanine", percentage: 5 },
    ],
    exitStrategy:
      "El capital es retorna mitjançant el refinançament programat de l'immoble subjacent dins de la finestra de tinença, o abans si es produeix una venda. Els titulars de deute reben la totalitat del principal més el cupó meritat a la sortida.",
    keyRisks: [
      "L'impagament d'un inquilí podria comprimir la cobertura d'ingressos, mitigat en part pel compte de reserva d'interessos",
      "Risc de refinançament si s'endureixen les condicions de crèdit de l'immobiliari comercial",
      "Fluctuacions de divisa per a inversors fora de l'euro",
    ],
    milestones: [
      { label: "Due diligence d'arquitectura completada", date: "Q1 2026", done: true },
      { label: "Finançament d'inversors obert", date: "Q2 2026", done: true },
      { label: "Finançament tancat i capital desplegat", date: "Q4 2026", done: false },
      { label: "Execució del projecte", date: "Des de Q1 2027", done: false },
      { label: "Finalització / estabilització del projecte", date: "Q3 2028", done: false },
      { label: "Sortida de l'inversor i retorn del capital", date: "Q1 2029", done: false },
    ],

    planningStatus: "Actiu operatiu",
    regulatoryNote:
      "La inversió es realitza a través d'una SPV andorrana amb Equity Partners com a gestor de l'actiu. Totes les aprovacions d'inversió estrangera i les verificacions de KYC, AML i origen de fons les gestiona Equity Partners abans de la crida de capital.",
    dueDiligenceDocs: [
      "Memoràndum d'informació confidencial",
      "Resum dels contractes d'arrendament",
      "Informe de valoració independent",
      "Dossier de due diligence legal",
      "Contracte de préstec i paquet de garanties",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  2. Ordino Lodge Resort — Debt + Equity — €8M
  // ──────────────────────────────────────────────────────────
  {
    slug: "project-ordino",
    name: "Project Ordino",
    tagline:
      "Lodge de muntanya boutique de 30 habitacions a les portes de l'única reserva de la biosfera UNESCO d'Andorra, que combina renda contractual amb plusvàlua d'equity.",
    status: "Open for Investment",
    location: "Ordino, Andorra",
    parish: "Ordino",
    sector: "Hoteler",

    structure: "Debt + Equity",
    headlineReturn: "Cupó anual + Plusvàlua d'equity",

    totalProjectValue: "€26M",
    equityRaise: "€8M",
    minInvestment: "€2M",
    maxInvestment: "€4M",
    holdPeriod: "42–54 mesos",

    fundingProgress: 25,
    amountCommitted: "€2M de €8M",
    fundingDeadline: "31 de desembre de 2026",
    riskProfile: "Value-Add",

    units: "30 habitacions + restaurant + bar biblioteca",
    sqm: "4,200 m²",
    floors: "4 plantes",
    completionDate: "Q4 2028",

    image: "/Ordino%20AND%20IMG%20day%20snow.webp",
    gallery: [
      "/Ordino%20AND%20IMG%20day%20snow.webp",
      "/ordino%20heights.jpg",
      "/ordino%20heights%202.webp",
    ],

    description:
      "Aquest projecte a Ordino és un lodge de muntanya boutique de 30 habitacions situat a les portes del domini esquiable d'Ordino-Arcalís i de l'única reserva de la biosfera UNESCO d'Andorra. El concepte combina l'arquitectura pirinenca tradicional amb un programa hoteler refinat: restaurant de destinació, bar biblioteca, suite de tractaments i accés ski-in / ski-out. L'estructura de tinença genera renda contractual durant la fase de construcció i plusvàlua d'equity a la sortida, ja sigui mitjançant venda institucional o refinançament a la rendibilitat operativa estabilitzada.",
    investmentThesis:
      "Ordino és la parròquia més tranquil·la i exclusiva d'Andorra, preferida pels residents internacionals que busquen discreció i entorn natural davant de les estacions del sud, més concorregudes. L'oferta hotelera en el segment boutique continua sent escassa, i la designació UNESCO imposa un límit natural al desenvolupament que protegeix els operadors existents davant de l'excés d'oferta. La combinació de renda per cupó durant la construcció i una sortida clara a rendibilitat estabilitzada converteix aquesta operació en una atractiva estructura mixta.",
    highlights: [
      "Ubicació a les portes de la biosfera UNESCO, amb límit natural d'oferta",
      "Llicència urbanística en fase avançada",
      "Carta marc signada amb un operador boutique consolidat",
      "Accés ski-in / ski-out a Ordino-Arcalís",
      "Distribució de cupons durant la fase de construcció",
      "Plusvàlua d'equity en la venda o en el refinançament a l'estabilització",
    ],
    useOfFunds: [
      { label: "Construcció i acabats", percentage: 64 },
      { label: "Sòl", percentage: 16 },
      { label: "FF&E i cànons de marca", percentage: 9 },
      { label: "Honoraris professionals i de disseny", percentage: 6 },
      { label: "Finançament i contingències", percentage: 5 },
    ],
    capitalStack: [
      { label: "Deute bancari sènior", percentage: 58, note: "Term sheet indicatiu rebut" },
      { label: "Capital d'inversors (aquesta captació)", percentage: 30 },
      { label: "Coinversió del promotor", percentage: 10, note: "Compromís directe d'Equity Partners" },
      { label: "Key money de l'operador", percentage: 2 },
    ],
    exitStrategy:
      "La sortida principal és una venda a un inversor hoteler institucional els anys 4–5, després de 12 mesos d'estabilització. El refinançament a rendibilitat estabilitzada es manté com a via alternativa per retornar el capital als inversors conservant l'equity residual.",
    keyRisks: [
      "Els retards d'obra podrien desplaçar les finestres d'estabilització i sortida",
      "El ramp-up d'ADR i ocupació podria ser més lent del modelitzat si la demanda global de viatges s'afebleix",
      "Dependència de l'operador: un canvi de soci operador podria afectar el posicionament de marca",
      "Liquiditat: el capital de l'inversor queda immobilitzat durant tot el període de tinença",
    ],
    milestones: [
      { label: "Due diligence d'arquitectura completada", date: "Q1 2026", done: true },
      { label: "Finançament d'inversors obert", date: "Q2 2026", done: true },
      { label: "Finançament tancat i capital desplegat", date: "Q1 2027", done: false },
      { label: "Execució del projecte", date: "Q1 2027 – Q3 2028", done: false },
      { label: "Finalització / estabilització del projecte", date: "Q4 2028", done: false },
      { label: "Sortida de l'inversor i retorn del capital", date: "Q2 2030", done: false },
    ],

    planningStatus: "Sol·licitud de llicència en fase avançada",
    regulatoryNote:
      "La inversió es realitza a través d'una SPV andorrana amb Equity Partners com a gestor de l'actiu. Totes les aprovacions d'inversió estrangera i les verificacions de KYC, AML i origen de fons les gestiona Equity Partners abans de la crida de capital.",
    dueDiligenceDocs: [
      "Memoràndum d'informació confidencial",
      "Model financer i anàlisi de sensibilitat",
      "Carta marc de l'operador",
      "Informe de valoració independent",
      "Dossier de due diligence legal",
      "Correspondència urbanística i plànols de l'emplaçament",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  3. Escaldes Penthouse Collection — Equity — €80M
  // ──────────────────────────────────────────────────────────
  {
    slug: "project-escaldes",
    name: "Project Escaldes",
    tagline:
      "Col·lecció d'àtics de marca al centre d'Escaldes-Engordany: equity pur amb tot el potencial del projecte a la sortida. Tiquet de gran mida institucional.",
    status: "Waitlist",
    location: "Escaldes-Engordany, Andorra",
    parish: "Escaldes-Engordany",
    sector: "Residencial de luxe",

    structure: "Equity",
    headlineReturn: "Participació en beneficis d'equity",

    totalProjectValue: "€140M",
    equityRaise: "€80M",
    minInvestment: "€20M",
    maxInvestment: "€40M",
    holdPeriod: "36–48 mesos",

    fundingProgress: 28,
    amountCommitted: "€22M de €80M",
    fundingDeadline: "31 de març de 2027",
    riskProfile: "Opportunistic",

    units: "24 àtics + 6 sky-villas",
    sqm: "12,800 m²",
    floors: "14 plantes (dues torres)",
    completionDate: "Q4 2029",

    image: "/and-img-night-snow-lights.webp",
    gallery: [
      "/and-img-night-snow-lights.webp",
      "/hero-andorra-r2ptlkd.webp",
      "/04c-copy.webp",
    ],

    description:
      "Aquest projecte a Escaldes-Engordany és un desenvolupament residencial de luxe emblemàtic al cor de la parròquia. El projecte comprèn 24 àtics i 6 sky-villas en dues torres connectades; cada unitat disposa d'envidrament de terra a sostre, terrasses privades i vistes sobre el riu cap als Pirineus. Entre els serveis de l'edifici hi ha consergeria, gimnàs privat, piscina interior, sales de tractaments i un saló per a residents. L'estructura d'equity pur ofereix als inversors un potencial sense límit sobre els beneficis del projecte a la sortida.",
    investmentThesis:
      "El segment alt del mercat residencial andorrà —prime per sobre dels 15.000 € per metre quadrat— té una oferta estructuralment limitada i una demanda internacional creixent. Els permisos de residència activa i el marc fiscal del país continuen atraient el trasllat de grans patrimonis (ultra-HNW) de tot Europa. Un projecte de marca emblemàtic d'aquesta escala i qualitat no té competidor comparable al pipeline actual. L'estructura d'equity pur està dissenyada per a inversors institucionals i family offices que busquen una exposició concentrada a la part més alta del mercat.",
    highlights: [
      "Escala i posicionament emblemàtics, sense competidor comparable al pipeline",
      "Centre d'Escaldes-Engordany, el districte residencial prime d'Andorra",
      "24 àtics + 6 sky-villas amb programa complet de serveis",
      "Participació d'equity pura: potencial sense límit sobre els beneficis del projecte",
      "Adreçat al trasllat de patrimonis ultra-HNW impulsat pel marc fiscal i de residència activa",
      "L'oferta de serveis de marca sosté els valors de revenda i lloguer a llarg termini",
    ],
    useOfFunds: [
      { label: "Construcció i acabats", percentage: 58 },
      { label: "Sòl i agregació de parcel·les", percentage: 22 },
      { label: "Honoraris professionals i de disseny", percentage: 7 },
      { label: "Marca, màrqueting i vendes", percentage: 7 },
      { label: "Finançament i contingències", percentage: 6 },
    ],
    capitalStack: [
      { label: "Deute bancari sènior", percentage: 38, note: "Term sheet en negociació" },
      { label: "Equity d'inversors (aquesta captació)", percentage: 50 },
      { label: "Coinversió del promotor", percentage: 8, note: "Compromís directe d'Equity Partners" },
      { label: "Soci estratègic de sòl", percentage: 4 },
    ],
    exitStrategy:
      "La sortida principal és la venda individual d'unitats durant els últims 18 mesos de construcció i els 24 mesos posteriors a la finalització. Com a alternativa es contempla la venda en bloc de l'inventari restant a un family office o a un comprador institucional. El promotor distribueix els beneficis als titulars d'equity a prorrata després del repagament del deute sènior.",
    keyRisks: [
      "Tinença més llarga i major exposició absoluta que les altres estructures",
      "Risc de concentració en el segment més alt del mercat residencial",
      "Risc de construcció en un esquema complex de dues torres",
      "La sindicació del deute sènior podria trigar més del modelitzat",
      "Liquiditat: l'equity queda immobilitzat durant tot el període de desenvolupament i comercialització",
    ],
    milestones: [
      { label: "Due diligence d'arquitectura completada", date: "Q2 2026", done: true },
      { label: "Finançament d'inversors obert", date: "Q1 2027 (previst)", done: false },
      { label: "Finançament tancat i capital desplegat", date: "Q3 2027", done: false },
      { label: "Execució del projecte", date: "Q3 2027 – Q4 2029", done: false },
      { label: "Finalització / estabilització del projecte", date: "Q4 2029 – Q4 2031", done: false },
      { label: "Sortida de l'inversor i retorn del capital", date: "Q2 2032", done: false },
    ],

    planningStatus: "Sol·licitud de llicència en preparació",
    regulatoryNote:
      "La inversió es realitza a través d'una SPV andorrana amb Equity Partners com a gestor de l'actiu. Atesa la mida dels tiquets, tots els inversors es processen sota el marc d'inversor professional / qualificat, amb verificacions completes de KYC, AML i origen de fons gestionades per Equity Partners abans de la crida de capital.",
    dueDiligenceDocs: [
      "Memoràndum d'informació confidencial",
      "Model financer i anàlisi de sensibilitat",
      "Dossier de concepte arquitectònic",
      "Informe de valoració independent",
      "Dossier de due diligence legal",
      "Correspondència urbanística i plànols de l'emplaçament",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  4. Canillo Wellness Retreat — Debt + Equity — €15M — CLOSED at 100%
  // ──────────────────────────────────────────────────────────
  {
    slug: "project-canillo",
    name: "Project Canillo",
    tagline:
      "Hotel wellness boutique de 48 habitacions a la porta d'entrada de Soldeu–El Tarter, amb spa, restaurant i plusvàlua immobiliària en plena propietat. Totalment finançat: exemple tancat.",
    status: "Closed",
    location: "Canillo, Andorra",
    parish: "Canillo",
    sector: "Hoteler",

    structure: "Debt + Equity",
    headlineReturn: "Cupó anual + Plusvàlua d'equity",

    totalProjectValue: "€42M",
    equityRaise: "€15M",
    minInvestment: "€3.5M",
    maxInvestment: "€7.5M",
    holdPeriod: "48–60 mesos",

    fundingProgress: 100,
    amountCommitted: "€15M de €15M (totalment finançat)",
    fundingDeadline: "Tancat",
    riskProfile: "Value-Add",

    units: "48 habitacions + spa + restaurant",
    sqm: "5,800 m²",
    floors: "6 plantes",
    completionDate: "Q3 2027",

    image: "/andorra-canillo.webp",
    gallery: [
      "/andorra-canillo.webp",
      "/funicamp%20ski.jpg",
      "/04c-copy.webp",
    ],

    description:
      "Aquest projecte a Canillo és un hotel boutique de marca de 48 habitacions situat a la porta d'entrada del domini esquiable de Soldeu–El Tarter. L'actiu combina un spa de destinació, un restaurant d'autor i immoble en plena propietat, estructurat per capturar tant el flux de caixa operatiu com l'apreciació del capital a la sortida. Aquesta oportunitat ja està totalment finançada i es mostra aquí com a exemple tancat: el grup d'inversors que hi va participar es troba ara en la fase de construcció de la tinença.",
    investmentThesis:
      "La posició de Canillo a l'entrada del domini esquiable andorrà més gran genera una demanda estructural d'habitacions hoteleres en el segment boutique. El posicionament wellness cobreix un buit al mercat local: viatgers internacionals sofisticats que busquen una alternativa refinada als grans hotels comercials. L'oferta en aquest segment està naturalment limitada, i l'actiu es beneficia tant de la plusvàlua del desenvolupament com de la rendibilitat operativa estabilitzada després de l'obertura.",
    highlights: [
      "Totalment finançat: exemple tancat de com es completen les nostres captacions",
      "Contracte signat amb un operador de marca",
      "A poca distància a peu del remuntador de Soldeu–El Tarter",
      "L'spa i el restaurant d'autor ancoren el posicionament wellness",
      "Distribució de cupons durant les fases de construcció i estabilització",
      "Plusvàlua d'equity capturada a l'estabilització",
    ],
    useOfFunds: [
      { label: "Construcció i acabats", percentage: 62 },
      { label: "Sòl", percentage: 14 },
      { label: "FF&E i cànons de marca", percentage: 11 },
      { label: "Honoraris professionals i de disseny", percentage: 7 },
      { label: "Finançament i contingències", percentage: 6 },
    ],
    capitalStack: [
      { label: "Deute bancari sènior", percentage: 60, note: "Andbank — tancat" },
      { label: "Capital d'inversors", percentage: 28, note: "Totalment subscrit" },
      { label: "Coinversió del promotor", percentage: 10, note: "Compromís directe d'Equity Partners" },
      { label: "Key money de l'operador", percentage: 2 },
    ],
    exitStrategy:
      "La sortida principal és una venda a un inversor hoteler institucional 12–18 mesos després de l'obertura. El refinançament a rendibilitat estabilitzada és la via alternativa, que retorna el capital als inversors conservant l'equity residual per a la seva distribució.",
    keyRisks: [
      "Els retards d'obra podrien estendre la tinença més enllà de l'objectiu",
      "El ramp-up operatiu podria quedar per sota del model si el turisme d'oci s'afebleix",
      "Risc de concentració de l'operador en un únic soci de marca",
      "Liquiditat: el capital de l'inversor queda immobilitzat durant tot el període de tinença",
    ],
    milestones: [
      { label: "Due diligence d'arquitectura completada", date: "Q4 2024", done: true },
      { label: "Finançament d'inversors obert", date: "Q1 2025", done: true },
      { label: "Finançament tancat i capital desplegat", date: "Q3 2025", done: true },
      { label: "Execució del projecte", date: "Q1 2026 – Q3 2027", done: false },
      { label: "Finalització / estabilització del projecte", date: "Q4 2027", done: false },
      { label: "Sortida de l'inversor i retorn del capital", date: "Q2 2029", done: false },
    ],

    planningStatus: "Llicència urbanística plena concedida",
    regulatoryNote:
      "Aquesta oportunitat es mostra com a exemple tancat. Les noves captacions segueixen la mateixa estructura, amb Equity Partners com a gestor de l'actiu, un vehicle SPV andorrà i el processament complet de KYC/AML i origen de fons abans de la crida de capital.",
    dueDiligenceDocs: [
      "Memoràndum d'informació confidencial (emès en la captació)",
      "Model financer i anàlisi de sensibilitat",
      "Contracte d'operador i dossier de marca",
      "Informe de valoració independent",
      "Dossier de due diligence legal",
      "Contracte de construcció i programa d'obra",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  5. La Massana Alpine Residences — Debt + Equity — €4M
  // ──────────────────────────────────────────────────────────
  {
    slug: "project-la-massana",
    name: "Project La Massana",
    tagline:
      "Promoció residencial alpina boutique de 16 unitats al costat del telecabina de Vallnord–Pal Arinsal, estructurada per a renda contractual més plusvàlua d'equity a la sortida.",
    status: "Open for Investment",
    location: "La Massana, Andorra",
    parish: "La Massana",
    sector: "Residencial de luxe",

    structure: "Debt + Equity",
    headlineReturn: "Cupó anual + Plusvàlua d'equity",

    totalProjectValue: "€16M",
    equityRaise: "€4M",
    minInvestment: "€1M",
    maxInvestment: "€2M",
    holdPeriod: "30–36 mesos",

    fundingProgress: 60,
    amountCommitted: "€2.4M de €4M",
    fundingDeadline: "31 de juliol de 2026",
    riskProfile: "Core-Plus",

    units: "16 apartaments",
    sqm: "3,450 m²",
    floors: "5 plantes",
    completionDate: "Q2 2028",

    image: "/01-stone-copy.webp",
    gallery: [
      "/01-stone-copy.webp",
      "/01-stone-copy-2.webp",
      "/and-img-night-snow-lights.webp",
    ],

    description:
      "Aquest projecte a la Massana és una promoció boutique de 16 apartaments d'altes especificacions situada a poca distància a peu del telecabina de Pal Arinsal. El disseny combina les façanes tradicionals andorranes de pedra i fusta amb un programa interior contemporani: grans envidraments, espais de dia amb doble orientació i una zona wellness compartida amb spa, sauna i gimnàs. Els apartaments van de dos a quatre dormitoris i estan concebuts per al creixent segment de residents internacionals que es traslladen a Andorra amb permisos de residència activa.",
    investmentThesis:
      "La Massana ha registrat un creixement sostingut dels valors residencials prime, amb una demanda de residents internacionals que continua superant la nova oferta. Amb només un 4% del sòl andorrà edificable, parcel·les al costat de pistes d'aquesta escala rarament surten al mercat. El sòl ja està adquirit a una base atractiva, la llicència urbanística està concedida i l'interès en prevenda és sòlid, fet que redueix el risc del projecte molt abans de l'inici de l'obra. Els inversors es beneficien d'un cupó contractual durant la fase de construcció i participen en la plusvàlua a la sortida a través de la venda d'unitats.",
    highlights: [
      "Llicència urbanística plena concedida",
      "Sòl assegurat per sota del valor de mercat",
      "A poca distància a peu del telecabina de Pal Arinsal",
      "Sòlida cartera de reserves en prevenda",
      "Contractista local experimentat amb contracte d'obra a preu tancat",
      "Distribució trimestral de cupons durant el període de tinença",
    ],
    useOfFunds: [
      { label: "Construcció i acabats", percentage: 68 },
      { label: "Sòl", percentage: 18 },
      { label: "Honoraris professionals i de disseny", percentage: 6 },
      { label: "Finançament i contingències", percentage: 5 },
      { label: "Màrqueting i vendes", percentage: 3 },
    ],
    capitalStack: [
      { label: "Deute bancari sènior", percentage: 55, note: "Andbank — term sheet signat" },
      { label: "Equity d'inversors (aquesta captació)", percentage: 25 },
      { label: "Coinversió del promotor", percentage: 14, note: "Compromís directe d'Equity Partners" },
      { label: "Mezzanine / sòl diferit", percentage: 6 },
    ],
    exitStrategy:
      "La sortida principal és la venda individual d'unitats durant els últims 12 mesos de construcció i els 6 mesos posteriors a la finalització. Com a sortida alternativa es contempla la venda de la cartera en bloc a un family office o a un comprador institucional si el ritme de prevendes ho justifica.",
    keyRisks: [
      "Els retards d'obra podrien estendre el període de tinença més enllà de l'objectiu",
      "Un refredament dels preus residencials a Andorra podria comprimir els marges de sortida",
      "Fluctuacions de divisa per a inversors fora de l'euro",
      "Liquiditat: l'equity de l'inversor queda immobilitzat durant tot el període de tinença",
    ],
    milestones: [
      { label: "Due diligence d'arquitectura completada", date: "Q1 2026", done: true },
      { label: "Finançament d'inversors obert", date: "Q2 2026", done: true },
      { label: "Finançament tancat i capital desplegat", date: "Q1 2027", done: false },
      { label: "Execució del projecte", date: "Q1 2027 – Q1 2028", done: false },
      { label: "Finalització / estabilització del projecte", date: "Q2 2028", done: false },
      { label: "Sortida de l'inversor i retorn del capital", date: "Q4 2028", done: false },
    ],

    planningStatus: "Llicència urbanística plena concedida",
    regulatoryNote:
      "La inversió es realitza a través d'una SPV andorrana amb Equity Partners com a gestor de l'actiu. Totes les aprovacions d'inversió estrangera i les verificacions de KYC, AML i origen de fons les gestiona Equity Partners abans de la crida de capital.",
    dueDiligenceDocs: [
      "Memoràndum d'informació confidencial",
      "Model financer i anàlisi de sensibilitat",
      "Informe de valoració independent",
      "Dossier de due diligence legal",
      "Contracte de construcció i programa d'obra",
      "Llicència urbanística i plànols de l'emplaçament",
    ],
  },
];

export function getOpportunityBySlug(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}
