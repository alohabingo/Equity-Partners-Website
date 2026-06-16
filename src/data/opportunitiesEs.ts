import type { Opportunity } from "./opportunities";

// Spanish (es) localisation of src/data/opportunities.ts.
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
      "Plaza comercial de uso mixto en el distrito financiero de la capital, con ingresos predecibles procedentes de arrendamientos de larga duración con inquilinos consolidados.",
    status: "Open for Investment",
    location: "Andorra la Vella, Andorra",
    parish: "Andorra la Vella",
    sector: "Comercial",

    structure: "Debt",
    headlineReturn: "Cupón anual",

    totalProjectValue: "€9M",
    equityRaise: "€2M",
    minInvestment: "€500k",
    maxInvestment: "€1M",
    holdPeriod: "24–36 meses",

    fundingProgress: 65,
    amountCommitted: "€1.3M de €2M",
    fundingDeadline: "30 de septiembre de 2026",
    riskProfile: "Core",

    units: "Retail mixto + 4 plantas de oficinas",
    sqm: "2,800 m²",
    floors: "5 plantas",
    completionDate: "Completado en 2018",

    image: "/Andorra-la-Vella.webp",
    gallery: [
      "/Andorra-la-Vella.webp",
      "/hero-andorra-R2PtlkD-.jpg",
      "/04c%20copy.jpg",
    ],

    description:
      "Este proyecto en Andorra la Vella es un edificio comercial de uso mixto plenamente operativo en el corazón del distrito financiero de la capital. Los inquilinos con contratos de larga duración, en locales comerciales a pie de calle y cuatro plantas de oficinas profesionales, generan ingresos mensuales por alquiler predecibles. La estructura de deuda ofrece exposición senior garantizada a un activo estabilizado y generador de rentas, sin riesgo de desarrollo ni de comercialización.",
    investmentThesis:
      "El núcleo comercial de Andorra la Vella es un mercado con una escasez crónica de oferta. El sector bancario de la capital, los servicios profesionales y las funciones gubernamentales se concentran a pocos cientos de metros de este emplazamiento, anclando una demanda sostenida de espacio de oficinas y retail de calidad. Con los arrendamientos ya en vigor y el activo ya generando rentas, los titulares de deuda quedan aislados de los riesgos de desarrollo, comercialización e inquilinos que asumen los proyectos en fases más tempranas.",
    highlights: [
      "Activo plenamente operativo y arrendado, con ingresos desde el primer día",
      "Capital garantizado por un edificio comercial prime en el distrito financiero de la capital",
      "Inquilinos con contratos de larga duración en las plantas de retail y oficinas",
      "Sin riesgo de desarrollo ni de comercialización",
      "Tenencia típica más corta que la de los proyectos alpinos u hoteleros",
    ],
    useOfFunds: [
      { label: "Préstamo a la SPV del proyecto", percentage: 92 },
      { label: "Gastos de estructuración y legales", percentage: 4 },
      { label: "Cuenta de reserva de intereses", percentage: 4 },
    ],
    capitalStack: [
      { label: "Deuda de inversores (esta captación)", percentage: 22 },
      { label: "Deuda bancaria senior", percentage: 55, note: "Andbank — term sheet firmado" },
      { label: "Equity del promotor", percentage: 18, note: "Compromiso directo de Equity Partners" },
      { label: "Mezzanine", percentage: 5 },
    ],
    exitStrategy:
      "El capital se devuelve mediante la refinanciación programada del inmueble subyacente dentro de la ventana de tenencia, o antes si se produce una venta. Los titulares de deuda reciben la totalidad del principal más el cupón devengado en la salida.",
    keyRisks: [
      "El impago de un inquilino podría comprimir la cobertura de ingresos, mitigado en parte por la cuenta de reserva de intereses",
      "Riesgo de refinanciación si se endurecen las condiciones de crédito del inmobiliario comercial",
      "Fluctuaciones de divisa para inversores fuera del euro",
    ],
    milestones: [
      { label: "Due diligence de arquitectura completada", date: "Q1 2026", done: true },
      { label: "Financiación de inversores abierta", date: "Q2 2026", done: true },
      { label: "Financiación cerrada y capital desplegado", date: "Q4 2026", done: false },
      { label: "Ejecución del proyecto", date: "Desde Q1 2027", done: false },
      { label: "Finalización / estabilización del proyecto", date: "Q3 2028", done: false },
      { label: "Salida del inversor y retorno del capital", date: "Q1 2029", done: false },
    ],

    planningStatus: "Activo operativo",
    regulatoryNote:
      "La inversión se realiza a través de una SPV andorrana con Equity Partners como gestor del activo. Todas las aprobaciones de inversión extranjera y las verificaciones de KYC, AML y origen de fondos las gestiona Equity Partners antes de la llamada de capital.",
    dueDiligenceDocs: [
      "Memorando de información confidencial",
      "Resumen de los contratos de arrendamiento",
      "Informe de valoración independiente",
      "Dosier de due diligence legal",
      "Contrato de préstamo y paquete de garantías",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  2. Ordino Lodge Resort — Debt + Equity — €8M
  // ──────────────────────────────────────────────────────────
  {
    slug: "project-ordino",
    name: "Project Ordino",
    tagline:
      "Lodge de montaña boutique de 30 habitaciones a las puertas de la única reserva de la biosfera UNESCO de Andorra, que combina renta contractual con plusvalía de equity.",
    status: "Open for Investment",
    location: "Ordino, Andorra",
    parish: "Ordino",
    sector: "Hotelero",

    structure: "Debt + Equity",
    headlineReturn: "Cupón anual + Plusvalía de equity",

    totalProjectValue: "€26M",
    equityRaise: "€8M",
    minInvestment: "€2M",
    maxInvestment: "€4M",
    holdPeriod: "42–54 meses",

    fundingProgress: 25,
    amountCommitted: "€2M de €8M",
    fundingDeadline: "31 de diciembre de 2026",
    riskProfile: "Value-Add",

    units: "30 habitaciones + restaurante + bar biblioteca",
    sqm: "4,200 m²",
    floors: "4 plantas",
    completionDate: "Q4 2028",

    image: "/Ordino%20AND%20IMG%20day%20snow.webp",
    gallery: [
      "/Ordino%20AND%20IMG%20day%20snow.webp",
      "/ordino%20heights.jpg",
      "/ordino%20heights%202.webp",
    ],

    description:
      "Este proyecto en Ordino es un lodge de montaña boutique de 30 habitaciones situado a las puertas del dominio esquiable de Ordino-Arcalís y de la única reserva de la biosfera UNESCO de Andorra. El concepto combina la arquitectura pirenaica tradicional con un programa hotelero refinado: restaurante de destino, bar biblioteca, suite de tratamientos y acceso ski-in / ski-out. La estructura de tenencia genera renta contractual durante la fase de construcción y plusvalía de equity en la salida, ya sea mediante venta institucional o refinanciación a la rentabilidad operativa estabilizada.",
    investmentThesis:
      "Ordino es la parroquia más tranquila y exclusiva de Andorra, preferida por los residentes internacionales que buscan discreción y entorno natural frente a las estaciones del sur, más concurridas. La oferta hotelera en el segmento boutique sigue siendo escasa, y la designación UNESCO impone un límite natural al desarrollo que protege a los operadores existentes frente al exceso de oferta. La combinación de renta por cupón durante la construcción y una salida clara a rentabilidad estabilizada convierte esta operación en una atractiva estructura mixta.",
    highlights: [
      "Ubicación a las puertas de la biosfera UNESCO, con límite natural de oferta",
      "Licencia urbanística en fase avanzada",
      "Carta marco firmada con un operador boutique consolidado",
      "Acceso ski-in / ski-out a Ordino-Arcalís",
      "Distribución de cupones durante la fase de construcción",
      "Plusvalía de equity en la venta o en la refinanciación a la estabilización",
    ],
    useOfFunds: [
      { label: "Construcción y acabados", percentage: 64 },
      { label: "Suelo", percentage: 16 },
      { label: "FF&E y cánones de marca", percentage: 9 },
      { label: "Honorarios profesionales y de diseño", percentage: 6 },
      { label: "Financiación y contingencias", percentage: 5 },
    ],
    capitalStack: [
      { label: "Deuda bancaria senior", percentage: 58, note: "Term sheet indicativo recibido" },
      { label: "Capital de inversores (esta captación)", percentage: 30 },
      { label: "Coinversión del promotor", percentage: 10, note: "Compromiso directo de Equity Partners" },
      { label: "Key money del operador", percentage: 2 },
    ],
    exitStrategy:
      "La salida principal es una venta a un inversor hotelero institucional en los años 4–5, tras 12 meses de estabilización. La refinanciación a rentabilidad estabilizada se mantiene como vía alternativa para devolver el capital a los inversores conservando el equity residual.",
    keyRisks: [
      "Los retrasos de obra podrían desplazar las ventanas de estabilización y salida",
      "El ramp-up de ADR y ocupación podría ser más lento de lo modelizado si la demanda global de viajes se debilita",
      "Dependencia del operador: un cambio de socio operador podría afectar al posicionamiento de marca",
      "Liquidez: el capital del inversor queda inmovilizado durante todo el periodo de tenencia",
    ],
    milestones: [
      { label: "Due diligence de arquitectura completada", date: "Q1 2026", done: true },
      { label: "Financiación de inversores abierta", date: "Q2 2026", done: true },
      { label: "Financiación cerrada y capital desplegado", date: "Q1 2027", done: false },
      { label: "Ejecución del proyecto", date: "Q1 2027 – Q3 2028", done: false },
      { label: "Finalización / estabilización del proyecto", date: "Q4 2028", done: false },
      { label: "Salida del inversor y retorno del capital", date: "Q2 2030", done: false },
    ],

    planningStatus: "Solicitud de licencia en fase avanzada",
    regulatoryNote:
      "La inversión se realiza a través de una SPV andorrana con Equity Partners como gestor del activo. Todas las aprobaciones de inversión extranjera y las verificaciones de KYC, AML y origen de fondos las gestiona Equity Partners antes de la llamada de capital.",
    dueDiligenceDocs: [
      "Memorando de información confidencial",
      "Modelo financiero y análisis de sensibilidad",
      "Carta marco del operador",
      "Informe de valoración independiente",
      "Dosier de due diligence legal",
      "Correspondencia urbanística y planos del emplazamiento",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  3. Escaldes Penthouse Collection — Equity — €80M
  // ──────────────────────────────────────────────────────────
  {
    slug: "project-escaldes",
    name: "Project Escaldes",
    tagline:
      "Colección de áticos de marca en el centro de Escaldes-Engordany: equity puro con todo el potencial del proyecto en la salida. Ticket de gran tamaño institucional.",
    status: "Waitlist",
    location: "Escaldes-Engordany, Andorra",
    parish: "Escaldes-Engordany",
    sector: "Residencial de lujo",

    structure: "Equity",
    headlineReturn: "Participación en beneficios de equity",

    totalProjectValue: "€140M",
    equityRaise: "€80M",
    minInvestment: "€20M",
    maxInvestment: "€40M",
    holdPeriod: "36–48 meses",

    fundingProgress: 28,
    amountCommitted: "€22M de €80M",
    fundingDeadline: "31 de marzo de 2027",
    riskProfile: "Opportunistic",

    units: "24 áticos + 6 sky-villas",
    sqm: "12,800 m²",
    floors: "14 plantas (dos torres)",
    completionDate: "Q4 2029",

    image: "/AND%20IMG%20night%20snow%20lights.jpeg",
    gallery: [
      "/AND%20IMG%20night%20snow%20lights.jpeg",
      "/hero-andorra-R2PtlkD-.jpg",
      "/04c%20copy.jpg",
    ],

    description:
      "Este proyecto en Escaldes-Engordany es un desarrollo residencial de lujo emblemático en el corazón de la parroquia. El proyecto comprende 24 áticos y 6 sky-villas en dos torres conectadas; cada unidad cuenta con acristalamiento de suelo a techo, terrazas privadas y vistas sobre el río hacia los Pirineos. Entre los servicios del edificio figuran conserjería, gimnasio privado, piscina interior, salas de tratamientos y un salón para residentes. La estructura de equity puro ofrece a los inversores un potencial sin límite sobre los beneficios del proyecto en la salida.",
    investmentThesis:
      "El segmento alto del mercado residencial andorrano —prime por encima de los 15.000 € por metro cuadrado— tiene una oferta estructuralmente limitada y una demanda internacional creciente. Los permisos de residencia activa y el marco fiscal del país siguen atrayendo el traslado de grandes patrimonios (ultra-HNW) de toda Europa. Un proyecto de marca emblemático de esta escala y calidad no tiene competidor comparable en el pipeline actual. La estructura de equity puro está diseñada para inversores institucionales y family offices que buscan una exposición concentrada a la parte más alta del mercado.",
    highlights: [
      "Escala y posicionamiento emblemáticos, sin competidor comparable en el pipeline",
      "Centro de Escaldes-Engordany, el distrito residencial prime de Andorra",
      "24 áticos + 6 sky-villas con programa completo de servicios",
      "Participación de equity pura: potencial sin límite sobre los beneficios del proyecto",
      "Dirigido al traslado de patrimonios ultra-HNW impulsado por el marco fiscal y de residencia activa",
      "La oferta de servicios de marca sostiene los valores de reventa y alquiler a largo plazo",
    ],
    useOfFunds: [
      { label: "Construcción y acabados", percentage: 58 },
      { label: "Suelo y agregación de parcelas", percentage: 22 },
      { label: "Honorarios profesionales y de diseño", percentage: 7 },
      { label: "Marca, marketing y ventas", percentage: 7 },
      { label: "Financiación y contingencias", percentage: 6 },
    ],
    capitalStack: [
      { label: "Deuda bancaria senior", percentage: 38, note: "Term sheet en negociación" },
      { label: "Equity de inversores (esta captación)", percentage: 50 },
      { label: "Coinversión del promotor", percentage: 8, note: "Compromiso directo de Equity Partners" },
      { label: "Socio estratégico de suelo", percentage: 4 },
    ],
    exitStrategy:
      "La salida principal es la venta individual de unidades durante los últimos 18 meses de construcción y los 24 meses posteriores a la finalización. Como alternativa se contempla la venta en bloque del inventario restante a un family office o a un comprador institucional. El promotor distribuye los beneficios a los titulares de equity a prorrata tras el repago de la deuda senior.",
    keyRisks: [
      "Tenencia más larga y mayor exposición absoluta que las otras estructuras",
      "Riesgo de concentración en el segmento más alto del mercado residencial",
      "Riesgo de construcción en un esquema complejo de dos torres",
      "La sindicación de la deuda senior podría tardar más de lo modelizado",
      "Liquidez: el equity queda inmovilizado durante todo el periodo de desarrollo y comercialización",
    ],
    milestones: [
      { label: "Due diligence de arquitectura completada", date: "Q2 2026", done: true },
      { label: "Financiación de inversores abierta", date: "Q1 2027 (previsto)", done: false },
      { label: "Financiación cerrada y capital desplegado", date: "Q3 2027", done: false },
      { label: "Ejecución del proyecto", date: "Q3 2027 – Q4 2029", done: false },
      { label: "Finalización / estabilización del proyecto", date: "Q4 2029 – Q4 2031", done: false },
      { label: "Salida del inversor y retorno del capital", date: "Q2 2032", done: false },
    ],

    planningStatus: "Solicitud de licencia en preparación",
    regulatoryNote:
      "La inversión se realiza a través de una SPV andorrana con Equity Partners como gestor del activo. Dado el tamaño de los tickets, todos los inversores se procesan bajo el marco de inversor profesional / cualificado, con verificaciones completas de KYC, AML y origen de fondos gestionadas por Equity Partners antes de la llamada de capital.",
    dueDiligenceDocs: [
      "Memorando de información confidencial",
      "Modelo financiero y análisis de sensibilidad",
      "Dosier de concepto arquitectónico",
      "Informe de valoración independiente",
      "Dosier de due diligence legal",
      "Correspondencia urbanística y planos del emplazamiento",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  4. Canillo Wellness Retreat — Debt + Equity — €15M — CLOSED at 100%
  // ──────────────────────────────────────────────────────────
  {
    slug: "project-canillo",
    name: "Project Canillo",
    tagline:
      "Hotel wellness boutique de 48 habitaciones en la puerta de entrada de Soldeu–El Tarter, con spa, restaurante y plusvalía inmobiliaria en plena propiedad. Totalmente financiado: ejemplo cerrado.",
    status: "Closed",
    location: "Canillo, Andorra",
    parish: "Canillo",
    sector: "Hotelero",

    structure: "Debt + Equity",
    headlineReturn: "Cupón anual + Plusvalía de equity",

    totalProjectValue: "€42M",
    equityRaise: "€15M",
    minInvestment: "€3.5M",
    maxInvestment: "€7.5M",
    holdPeriod: "48–60 meses",

    fundingProgress: 100,
    amountCommitted: "€15M de €15M (totalmente financiado)",
    fundingDeadline: "Cerrado",
    riskProfile: "Value-Add",

    units: "48 habitaciones + spa + restaurante",
    sqm: "5,800 m²",
    floors: "6 plantas",
    completionDate: "Q3 2027",

    image: "/Andorra%20Canillo.jpg",
    gallery: [
      "/Andorra%20Canillo.jpg",
      "/funicamp%20ski.jpg",
      "/04c%20copy.jpg",
    ],

    description:
      "Este proyecto en Canillo es un hotel boutique de marca de 48 habitaciones situado en la puerta de entrada del dominio esquiable de Soldeu–El Tarter. El activo combina un spa de destino, un restaurante de autor e inmueble en plena propiedad, estructurado para capturar tanto el flujo de caja operativo como la apreciación del capital en la salida. Esta oportunidad ya está totalmente financiada y se muestra aquí como ejemplo cerrado: el grupo de inversores que participó se encuentra ahora en la fase de construcción de la tenencia.",
    investmentThesis:
      "La posición de Canillo en la entrada del mayor dominio esquiable andorrano genera una demanda estructural de habitaciones hoteleras en el segmento boutique. El posicionamiento wellness cubre un hueco en el mercado local: viajeros internacionales sofisticados que buscan una alternativa refinada a los grandes hoteles comerciales. La oferta en este segmento está naturalmente limitada, y el activo se beneficia tanto de la plusvalía del desarrollo como de la rentabilidad operativa estabilizada tras la apertura.",
    highlights: [
      "Totalmente financiado: ejemplo cerrado de cómo se completan nuestras captaciones",
      "Contrato firmado con un operador de marca",
      "A poca distancia a pie del remonte de Soldeu–El Tarter",
      "El spa y el restaurante de autor anclan el posicionamiento wellness",
      "Distribución de cupones durante las fases de construcción y estabilización",
      "Plusvalía de equity capturada en la estabilización",
    ],
    useOfFunds: [
      { label: "Construcción y acabados", percentage: 62 },
      { label: "Suelo", percentage: 14 },
      { label: "FF&E y cánones de marca", percentage: 11 },
      { label: "Honorarios profesionales y de diseño", percentage: 7 },
      { label: "Financiación y contingencias", percentage: 6 },
    ],
    capitalStack: [
      { label: "Deuda bancaria senior", percentage: 60, note: "Andbank — cerrado" },
      { label: "Capital de inversores", percentage: 28, note: "Totalmente suscrito" },
      { label: "Coinversión del promotor", percentage: 10, note: "Compromiso directo de Equity Partners" },
      { label: "Key money del operador", percentage: 2 },
    ],
    exitStrategy:
      "La salida principal es una venta a un inversor hotelero institucional 12–18 meses después de la apertura. La refinanciación a rentabilidad estabilizada es la vía alternativa, que devuelve el capital a los inversores conservando el equity residual para su distribución.",
    keyRisks: [
      "Los retrasos de obra podrían extender la tenencia más allá del objetivo",
      "El ramp-up operativo podría quedar por debajo del modelo si el turismo de ocio se debilita",
      "Riesgo de concentración del operador en un único socio de marca",
      "Liquidez: el capital del inversor queda inmovilizado durante todo el periodo de tenencia",
    ],
    milestones: [
      { label: "Due diligence de arquitectura completada", date: "Q4 2024", done: true },
      { label: "Financiación de inversores abierta", date: "Q1 2025", done: true },
      { label: "Financiación cerrada y capital desplegado", date: "Q3 2025", done: true },
      { label: "Ejecución del proyecto", date: "Q1 2026 – Q3 2027", done: false },
      { label: "Finalización / estabilización del proyecto", date: "Q4 2027", done: false },
      { label: "Salida del inversor y retorno del capital", date: "Q2 2029", done: false },
    ],

    planningStatus: "Licencia urbanística plena concedida",
    regulatoryNote:
      "Esta oportunidad se muestra como ejemplo cerrado. Las nuevas captaciones siguen la misma estructura, con Equity Partners como gestor del activo, un vehículo SPV andorrano y el procesamiento completo de KYC/AML y origen de fondos antes de la llamada de capital.",
    dueDiligenceDocs: [
      "Memorando de información confidencial (emitido en la captación)",
      "Modelo financiero y análisis de sensibilidad",
      "Contrato de operador y dosier de marca",
      "Informe de valoración independiente",
      "Dosier de due diligence legal",
      "Contrato de construcción y programa de obra",
    ],
  },

  // ──────────────────────────────────────────────────────────
  //  5. La Massana Alpine Residences — Debt + Equity — €4M
  // ──────────────────────────────────────────────────────────
  {
    slug: "project-la-massana",
    name: "Project La Massana",
    tagline:
      "Promoción residencial alpina boutique de 16 unidades junto al telecabina de Vallnord–Pal Arinsal, estructurada para renta contractual más plusvalía de equity en la salida.",
    status: "Open for Investment",
    location: "La Massana, Andorra",
    parish: "La Massana",
    sector: "Residencial de lujo",

    structure: "Debt + Equity",
    headlineReturn: "Cupón anual + Plusvalía de equity",

    totalProjectValue: "€16M",
    equityRaise: "€4M",
    minInvestment: "€1M",
    maxInvestment: "€2M",
    holdPeriod: "30–36 meses",

    fundingProgress: 60,
    amountCommitted: "€2.4M de €4M",
    fundingDeadline: "31 de julio de 2026",
    riskProfile: "Core-Plus",

    units: "16 apartamentos",
    sqm: "3,450 m²",
    floors: "5 plantas",
    completionDate: "Q2 2028",

    image: "/01_stone%20copy.jpg",
    gallery: [
      "/01_stone%20copy.jpg",
      "/01_stone%20copy%202.jpg",
      "/AND%20IMG%20night%20snow%20lights.jpeg",
    ],

    description:
      "Este proyecto en La Massana es una promoción boutique de 16 apartamentos de altas especificaciones situada a poca distancia a pie del telecabina de Pal Arinsal. El diseño combina las fachadas tradicionales andorranas de piedra y madera con un programa interior contemporáneo: grandes acristalamientos, espacios de día con doble orientación y una zona wellness compartida con spa, sauna y gimnasio. Los apartamentos van de dos a cuatro dormitorios y están concebidos para el creciente segmento de residentes internacionales que se trasladan a Andorra con permisos de residencia activa.",
    investmentThesis:
      "La Massana ha registrado un crecimiento sostenido de los valores residenciales prime, con una demanda de residentes internacionales que sigue superando la nueva oferta. Con solo un 4% del suelo andorrano edificable, parcelas junto a pistas de esta escala rara vez salen al mercado. El suelo ya está adquirido a una base atractiva, la licencia urbanística está concedida y el interés en preventa es sólido, lo que reduce el riesgo del proyecto mucho antes del inicio de la obra. Los inversores se benefician de un cupón contractual durante la fase de construcción y participan en la plusvalía en la salida a través de la venta de unidades.",
    highlights: [
      "Licencia urbanística plena concedida",
      "Suelo asegurado por debajo del valor de mercado",
      "A poca distancia a pie del telecabina de Pal Arinsal",
      "Sólida cartera de reservas en preventa",
      "Contratista local experimentado con contrato de obra a precio cerrado",
      "Distribución trimestral de cupones durante el periodo de tenencia",
    ],
    useOfFunds: [
      { label: "Construcción y acabados", percentage: 68 },
      { label: "Suelo", percentage: 18 },
      { label: "Honorarios profesionales y de diseño", percentage: 6 },
      { label: "Financiación y contingencias", percentage: 5 },
      { label: "Marketing y ventas", percentage: 3 },
    ],
    capitalStack: [
      { label: "Deuda bancaria senior", percentage: 55, note: "Andbank — term sheet firmado" },
      { label: "Equity de inversores (esta captación)", percentage: 25 },
      { label: "Coinversión del promotor", percentage: 14, note: "Compromiso directo de Equity Partners" },
      { label: "Mezzanine / suelo diferido", percentage: 6 },
    ],
    exitStrategy:
      "La salida principal es la venta individual de unidades durante los últimos 12 meses de construcción y los 6 meses posteriores a la finalización. Como salida alternativa se contempla la venta de la cartera en bloque a un family office o a un comprador institucional si el ritmo de preventas lo justifica.",
    keyRisks: [
      "Los retrasos de obra podrían extender el periodo de tenencia más allá del objetivo",
      "Un enfriamiento de los precios residenciales en Andorra podría comprimir los márgenes de salida",
      "Fluctuaciones de divisa para inversores fuera del euro",
      "Liquidez: el equity del inversor queda inmovilizado durante todo el periodo de tenencia",
    ],
    milestones: [
      { label: "Due diligence de arquitectura completada", date: "Q1 2026", done: true },
      { label: "Financiación de inversores abierta", date: "Q2 2026", done: true },
      { label: "Financiación cerrada y capital desplegado", date: "Q1 2027", done: false },
      { label: "Ejecución del proyecto", date: "Q1 2027 – Q1 2028", done: false },
      { label: "Finalización / estabilización del proyecto", date: "Q2 2028", done: false },
      { label: "Salida del inversor y retorno del capital", date: "Q4 2028", done: false },
    ],

    planningStatus: "Licencia urbanística plena concedida",
    regulatoryNote:
      "La inversión se realiza a través de una SPV andorrana con Equity Partners como gestor del activo. Todas las aprobaciones de inversión extranjera y las verificaciones de KYC, AML y origen de fondos las gestiona Equity Partners antes de la llamada de capital.",
    dueDiligenceDocs: [
      "Memorando de información confidencial",
      "Modelo financiero y análisis de sensibilidad",
      "Informe de valoración independiente",
      "Dosier de due diligence legal",
      "Contrato de construcción y programa de obra",
      "Licencia urbanística y planos del emplazamiento",
    ],
  },
];

export function getOpportunityBySlug(slug: string): Opportunity | undefined {
  return opportunities.find((o) => o.slug === slug);
}
