export interface BlogPostSection {
  heading: string;
  paragraphs: string[];
  table?: {
    headers: string[];
    rows: string[][];
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  readTime: string;
  sections: BlogPostSection[];
  sources?: { label: string; href: string }[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "can-foreigners-still-buy-property-in-andorra-2026",
    title: "¿Pueden los extranjeros comprar propiedades en Andorra hoy?",
    category: "Regulación",
    date: "Apr 2026",
    excerpt:
      "Una guía práctica para inversores sobre las nuevas reglas de adquisición de Andorra post-2025, qué pueden comprar aún los extranjeros y dónde persisten las verdaderas oportunidades.",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Sí, pero el mercado ya no es tan abierto",
        paragraphs: [
          "Los extranjeros siguen pudiendo comprar propiedades en Andorra en 2026, pero el mercado ya no es tan accesible, flexible o simple como muchos sitios de internet aún sugieren. Desde el ciclo de reformas de 2025, Andorra ha entrado en una fase más selectiva en la que el capital extranjero sigue siendo bienvenido, pero ahora opera dentro de un marco jurídico y estratégico más riguroso.",
          "Para los inversores, eso cambia la pregunta real. Ya no es simplemente si se puede comprar. Es qué se puede comprar, cómo estructurarlo y si la oportunidad sigue teniendo sentido bajo las nuevas normas.",
          "Para nosotros, este es el cambio clave: Andorra ya no debe verse como un mercado inmobiliario de fácil acceso y gran eficiencia fiscal. Ahora es una jurisdicción con altas barreras de entrada donde el acceso local, el cumplimiento normativo y la calidad de ejecución importan mucho más que antes.",
        ],
      },
      {
        heading: "Qué cambió tras el replanteamiento regulatorio de 2025",
        paragraphs: [
          "El punto de inflexión principal fue la Ley 5/2025, aprobada el 6 de marzo de 2025 y aplicada desde abril de 2025. La reforma fue diseñada para reducir la presión especulativa, proteger el acceso a la vivienda local y endurecer cómo funciona la inversión inmobiliaria extranjera en la práctica.",
          "Eso importa porque muchos artículos internacionales sobre propiedades en Andorra fueron escritos antes de estos cambios. Un comprador que se base en guías obsoletas puede malinterpretar fácilmente su posición real.",
          "Esta es una de las mayores lagunas del mercado. Una gran parte del contenido en inglés sobre la compra de propiedades en Andorra fue escrita antes de las reformas de 2025 o sigue repitiendo una versión anterior de la historia del mercado: impuestos bajos, sin fricciones importantes, demanda creciente, jurisdicción de montaña atractiva, compra de inmuebles sin complicaciones.",
          "Esa narrativa ahora es incompleta, en el mejor de los casos.",
        ],
      },
      {
        heading: "Qué pueden comprar aún los inversores extranjeros",
        paragraphs: [
          "Los compradores extranjeros aún pueden adquirir propiedades en Andorra, pero bajo límites más estrechos que antes. En términos generales, el marco ahora se centra en una única vivienda unifamiliar o un terreno para construirla, hasta dos unidades residenciales en ciertos casos y activos auxiliares limitados, como plazas de aparcamiento.",
          "Eso aún puede funcionar bien para determinados inversores, pero claramente aleja el mercado de la acumulación residencial amplia y repetida.",
          "Para inversores acostumbrados a mayor flexibilidad, esto puede parecer inicialmente restrictivo. En realidad, cambia el juego de la acumulación a la precisión.",
          "Ahora es más probable que los mejores resultados provengan de activos cuidadosamente elegidos, tenencias a largo plazo y adquisiciones estructuradas con una ejecución local disciplinada desde el primer día.",
        ],
      },
      {
        heading: "Por qué las mejores oportunidades pertenecen ahora al capital disciplinado",
        paragraphs: [
          "El mayor error que un inversor extranjero puede cometer en Andorra hoy es asumir que «todavía posible» significa «todavía sencillo». La condición de inversor, el tratamiento fiscal, los límites de adquisición y el caso de uso ahora importan mucho más que antes. Algunas estrategias aún funcionan muy bien. Otras son mucho menos atractivas o ya no son viables de la forma que muchos compradores extranjeros esperan.",
          "Por eso la estructuración local se ha convertido en parte del rendimiento de la inversión. En Andorra hoy, la calidad de ejecución no es solo operativa. Es estratégica.",
          "La oportunidad en Andorra no ha desaparecido. Se ha vuelto más selectiva. Eso significa que ahora es más probable que los mejores resultados provengan de activos cuidadosamente elegidos, tenencias a largo plazo en lugar de operaciones especulativas, relaciones locales sólidas y una planificación jurídica y de ejecución disciplinada desde el primer día.",
          "En otras palabras, Andorra ahora recompensa la precisión más que la escala.",
        ],
      },
      {
        heading: "Por qué los consejos antiguos de internet son ahora peligrosos",
        paragraphs: [
          "Un comprador que se base en material obsoleto puede malinterpretar si tiene la consideración de inversor extranjero, cuántas unidades puede adquirir legalmente, si una estrategia de promoción sigue estando permitida, cómo se aplican ahora los impuestos a la inversión extranjera o si una estrategia vinculada a la residencia sigue funcionando como antes.",
          "Esta es exactamente la razón por la que el asesoramiento local y actualizado sobre la ejecución se ha vuelto más valioso que el contenido internacional genérico. El mercado andorrano ya no es uno donde una orientación general sobre estilo de vida sea suficiente. Los detalles jurídicos y estratégicos ahora cambian los resultados.",
        ],
      },
      {
        heading: "Qué nos dice el mercado",
        paragraphs: [
          "Los datos recientes del mercado de 2025 publicados a principios de 2026 mostraron que la mayoría de las transacciones seguían siendo realizadas por residentes. Eso es importante. Confirma que Andorra no es solo una historia de demanda extranjera. La participación nacional sigue siendo central para el mercado, y eso respalda la orientación más restrictiva de la política del Gobierno.",
          "Para inversores, eso hace que Andorra sea más interesante, no menos. Un mercado selectivo con profundidad local real es a menudo más resiliente que uno impulsado únicamente por la dinámica internacional.",
        ],
      },
      {
        heading: "Qué significa esto para los compradores extranjeros",
        paragraphs: [
          "Entonces, ¿pueden los extranjeros aún comprar propiedades en Andorra en 2026? Sí.",
          "Pero Andorra ya no es un mercado para suposiciones pasivas o estrategias obsoletas. La oportunidad sigue siendo sólida para los inversores que entienden el nuevo marco y abordan el mercado con el asesoramiento local adecuado.",
          "Ahí es donde reside ahora la verdadera ventaja: no en perseguir un acceso fácil, sino en entrar en el mercado correctamente.",
        ],
      },
    ],
    sources: [
      {
        label: "Carlota Pastora sobre la Ley 5/2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "Advantia sobre cambios en inversión inmobiliaria extranjera",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Advantia sobre cambios de residencia e impuestos de 2025",
        href: "https://www.advantia.ad/en/economy/tax-changes-residence-andorra",
      },
      {
        label: "SER Andorra sobre los datos oficiales de transacciones de 2025",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
    ],
  },
  {
    slug: "andorra-real-estate-investment-2026-serious-investors",
    title: "Inversión inmobiliaria en Andorra en 2026: Guía para inversores",
    category: "Actualización del mercado",
    date: "Mar 2026",
    excerpt:
      "Una guía actual para inversores sobre el mercado inmobiliario de Andorra en 2026: regulación, precios, restricciones a la inversión extranjera y dónde el capital disciplinado puede encontrar aún oportunidades.",
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min de lectura",
    sections: [
      {
        heading: "Un mercado más selectivo está fortaleciendo el caso de inversión",
        paragraphs: [
          "La historia inmobiliaria andorrana en 2026 ya no se define por la apertura. Se define por escasez, selectividad y el valor creciente de la ejecución local.",
          "Precisamente por eso el mercado sigue mereciendo la atención seria de los inversores. Durante mucho tiempo, Andorra fue descrita en términos demasiado simples: eficiencia fiscal, estabilidad política, estilo de vida de montaña y demanda internacional creciente. Estos elementos aún importan, pero ya no explican el caso de inversión completo.",
          "Hoy, Andorra se entiende mejor como un mercado inmobiliario europeo con altas barreras de entrada. El acceso es más estrecho. La regulación es más estricta. La coordinación local tiene más peso. Y los inversores mejor posicionados para obtener buenos resultados ya no son aquellos que buscan una amplia flexibilidad, sino aquellos que entran con una estructuración más afinada, una alineación local más fuerte y una visión del valor más a largo plazo.",
          "Ese cambio no ha debilitado el mercado. En muchos aspectos, lo ha hecho más atractivo para la inversión de capital disciplinado.",
        ],
      },
      {
        heading: "Qué ha cambiado para los inversores",
        paragraphs: [
          "La antigua narrativa de inversión se centraba en la entrada simple al mercado. La actual gira en torno al acceso cualificado.",
          "Hoy, los inversores serios necesitan entender tres cambios estructurales. Primero, la inversión inmobiliaria extranjera es más restringida. El mercado ya no está abierto al tipo de acumulación residencial amplia que muchos compradores internacionales alguna vez asumieron que era posible. Las adquisiciones ahora están sujetas a límites más claros, y ciertas estrategias especulativas o vinculadas al turismo se han visto sustancialmente restringidas.",
          "Segundo, la estructura fiscal y regulatoria importa más para los retornos. En mercados con más flexibilidad, la estructuración deficiente puede ser ineficiente pero viable. En Andorra hoy, la estructuración deficiente puede alterar toda la economía de una transacción.",
          "Tercero, la ejecución local se ha convertido en parte de la tesis de inversión. En una jurisdicción más pequeña, donde las aprobaciones, las contrapartes y el acceso al mercado dependen de las relaciones, la calidad de la coordinación local puede tener más impacto que la optimización de hojas de cálculo.",
          "Por eso las mejores oportunidades de Andorra en 2026 no son necesariamente las más visibles. A menudo son aquellas que combinan un producto escaso, una estructura conforme a la normativa y una ejecución local creíble.",
        ],
      },
      {
        heading: "Qué dicen los datos sobre el mercado ahora",
        paragraphs: [
          "Las cifras recientes confirman que Andorra sigue siendo activa, pero también muestran un mercado moldeado por los residentes, la escasez y la normalización posterior a la reforma, más que puramente por la demanda extranjera.",
          "El informe sobre datos oficiales del mercado de 2025 publicado el 9 de febrero de 2026 indicó que el 75,1% de las transacciones inmobiliarias de 2025 fueron realizadas por residentes, el valor total de transacciones alcanzó aproximadamente 1.398 millones de euros, el precio medio de apartamentos subió a alrededor de 4.479 euros por metro cuadrado, y las compras extranjeras aumentaron fuertemente, pero en parte desde la base distorsionada creada por el período de moratoria anterior.",
          "Informes adicionales del 6 de noviembre de 2025 indicaron que los precios de apartamentos ya habían alcanzado aproximadamente 4.500 euros por metro cuadrado en el tercer trimestre, lo que refuerza la idea de que la presión sobre los precios sigue siendo estructuralmente real y no anecdótica.",
          "Más recientemente, los datos publicados el 16 de marzo de 2026 mostraron que las hipotecas residenciales en 2025 habían aumentado aproximadamente un 40% interanual, con más de 385 millones de euros en volumen de hipotecas residenciales. Eso importa porque sugiere que la actividad de compradores locales sigue siendo fuerte incluso cuando el mercado se vuelve más caro y más regulado.",
          "Para inversores, esto es importante. Andorra no es simplemente una historia de capital extranjero. La demanda interna aún importa. Eso tiende a apoyar la resiliencia.",
        ],
      },
      {
        heading: "Por qué los inversores siguen interesados",
        paragraphs: [
          "A pesar de reglas más estrictas, Andorra mantiene atractivos claros para el capital sofisticado. La escasez sostiene el valor a largo plazo en una jurisdicción con oferta limitada, donde el suelo es escaso, la planificación es delicada y la calidad del producto importa.",
          "La base de compradores también es más profunda de lo que a menudo se asume desde fuera. El mercado está apoyado no solo por el interés extranjero, sino por residentes, negocios locales y capital familiar establecido. Eso importa para la liquidez y la resiliencia.",
          "El endurecimiento regulatorio puede fortalecer el mercado con el tiempo, al desalentar el capital de menor convicción y preservar una mejor alineación entre oferta, precios y tolerancia social.",
          "El acceso es más difícil, lo que aumenta el valor de la ventaja local. Cuando un mercado se vuelve más selectivo, la asimetría de información crece. Eso beneficia a inversores que trabajan a través de redes locales reales en lugar de listados genéricos y narrativas de mercado generalizadas.",
        ],
      },
      {
        heading: "Dónde persiste aún la oportunidad",
        paragraphs: [
          "La oportunidad real en Andorra en 2026 no está en perseguir la exposición más amplia posible. Está en identificar dónde la selectividad crea valor.",
          "En nuestra opinión, las mejores oportunidades permanecen concentradas en cuatro áreas: residencial de primera calidad con verdadera escasez, desarrollo listo para ejecución, estrategias de tenencia a largo plazo y oportunidades originadas localmente donde la calidad del acceso importa más que la visibilidad en el mercado abierto.",
          "Los activos residenciales bien posicionados en microubicaciones con oferta restringida continúan resultando atractivos para los inversores, especialmente donde la calidad y la disciplina de oferta son evidentes. Los proyectos con rutas de planificación realistas, una alineación de socios creíble y una lógica de promoción limpia se ven cada vez más favorecidos frente a posiciones conceptuales o especulativas.",
          "A medida que aumenta la fricción de las transacciones, la lógica de inversión de larga duración se vuelve más convincente. Los inversores que entran en Andorra deberían pensar cada vez más en términos de valor duradero, no solo en arbitraje de ciclo corto.",
        ],
      },
      {
        heading: "Qué deben evitar los inversores serios",
        paragraphs: [
          "Andorra sigue siendo atractiva, pero es menos indulgente. Los mayores errores en 2026 suelen ser estratégicos en lugar de legales.",
          "Los inversores malinterpretan el mercado cuando asumen que las viejas guías para compradores extranjeros siguen siendo válidas, sobreestiman cuán escalable es la adquisición residencial, evalúan operaciones sin tener suficientemente en cuenta la estructura fiscal y el cumplimiento normativo, tratan la ejecución local como un detalle operativo en lugar de una variable de inversión central, o confunden disponibilidad con calidad.",
          "Ese último punto importa. En una jurisdicción selectiva, el inventario visible no siempre es el mejor inventario. Las mejores oportunidades a menudo surgen donde la confianza, los tiempos y la credibilidad local confluyen.",
        ],
      },
      {
        heading: "Por qué la perspectiva local importa más que nunca",
        paragraphs: [
          "En un mercado menos restrictivo, el capital por sí solo puede hacer una mayor parte del trabajo. En la Andorra de hoy, eso ya no es cierto. Los inversores necesitan una mejor inteligencia de mercado, una conectividad local más fuerte, una estructuración disciplinada y una supervisión creíble de la ejecución.",
          "Ese es el vacío que Equity Partners está concebida para cubrir. Nuestro valor no es simplemente que conocemos el mercado. Es que ayudamos a los inversores a entrar en él correctamente: con perspectiva local, una coordinación de contrapartes más fuerte y una línea más clara entre la intención estratégica y la ejecución sobre el terreno.",
        ],
      },
      {
        heading: "Por qué Andorra aún merece la atención de los inversores",
        paragraphs: [
          "Andorra sigue siendo uno de los mercados inmobiliarios de nicho más convincentes de Europa para el capital serio. Pero ya no es un mercado para suposiciones pasivas, optimismo amplio de compradores extranjeros o narrativas de paraíso fiscal recicladas.",
          "La historia de inversión de Andorra en 2026 es más fuerte que eso. Es una historia sobre acceso selectivo, oferta restringida, una participación nacional resiliente, una sofisticación regulatoria creciente y el valor cada vez mayor de la ejecución local disciplinada.",
          "Para inversores que entienden ese cambio, Andorra aún ofrece oportunidad real. Pero la ventaja ahora pertenece a aquellos que tratan el mercado tal como es hoy, no tal como fue descrito ayer.",
        ],
      },
    ],
    sources: [
      {
        label: "Advantia sobre cambios de inversión de propiedad extranjera",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Carlota Pastora sobre la Ley Ómnibus del 6 de marzo de 2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "SER Andorra sobre transacciones inmobiliarias de 2025, 9 de febrero de 2026",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre precio por metro cuadrado de apartamentos, 6 de noviembre de 2025",
        href: "https://cadenaser.com/andorra/2025/11/06/el-preu-mitja-del-metre-quadrat-en-un-pis-de-venda-frega-els-4500-euros-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre impuesto actualizado de inversión inmobiliaria extranjera, 26 de febrero de 2026",
        href: "https://cadenaser.com/andorra/2026/02/26/el-govern-actualitza-fins-al-6-la-taxa-sobre-la-inversio-estrangera-immobiliaria-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre hipotecas residenciales, 16 de marzo de 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
    ],
  },
  {
    slug: "andorra-passive-residency",
    title: "Residencia pasiva en Andorra: una residencia por inversión",
    category: "Regulación",
    date: "Mar 2026",
    excerpt:
      "Qué se exige para obtenerla en 2026, por qué el marco está cambiando y por qué Andorra sigue siendo un lugar tan atractivo para vivir e invertir.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Una ruta más selectiva hacia una de las jurisdicciones más atractivas de Europa",
        paragraphs: [
          "Andorra continúa destacando como una de las jurisdicciones más atractivas de Europa para inversores, familias y emprendedores internacionales que desean estabilidad, calidad de vida y una base más fuerte a largo plazo en Europa.",
          "En 2026, la residencia pasiva en Andorra sigue estando plenamente disponible. Pero el marco está evolucionando. El país está elevando el listón, no para hacer la residencia menos atractiva, sino para hacerla más selectiva, más sostenible y más claramente alineada con personas que desean una conexión genuina con el Principado.",
          "Eso es lo que hace que la ruta de residencia pasiva de Andorra sea tan interesante hoy. Ya no se trata simplemente de cumplir con un umbral. Se trata de demostrar compromiso con un país que ofrece una calidad de vida excepcional, estabilidad política y un mercado inmobiliario cada vez más valioso.",
        ],
      },
      {
        heading: "Qué es la residencia pasiva de Andorra",
        paragraphs: [
          "La residencia pasiva, o residencia sin actividad lucrativa, está diseñada para individuos que desean vivir en Andorra sin asumir empleo local en el sentido tradicional.",
          "Es particularmente relevante para inversores, emprendedores con ingresos internacionales, titulares de patrimonios privados, familias que buscan una base europea segura y de alta calidad, e individuos que combinan objetivos de estilo de vida con una planificación fiscal y patrimonial a largo plazo.",
          "En términos prácticos, le permite convertirse en residente de Andorra mientras construye su vida en torno al país, siempre que cumpla los requisitos financieros y de inversión.",
        ],
      },
      {
        heading: "Qué se exige para obtenerla en 2026",
        paragraphs: [
          "El marco de 2026 es más exigente que en años anteriores. Es importante entender esto desde el principio.",
          "De acuerdo con resúmenes legales recientes de 2026, la residencia pasiva ahora requiere por lo general una inversión mínima computable en activos andorranos de 1.000.000 de euros, mientras que, si la inversión se realiza en inmuebles, cada unidad debe superar los 800.000 euros.",
          "El pago a la AFA del solicitante principal es de 50.000 euros, con 12.000 euros adicionales por cada dependiente. También hay una expectativa de residencia efectiva en Andorra durante el año.",
        ],
      },
      {
        heading: "Cómo están cambiando los requisitos",
        paragraphs: [
          "Aquí es donde muchos lectores caen en la trampa de la información obsoleta de internet. El marco de residencia de Andorra no cambió solo una vez. Cambió por etapas.",
          "En 2025, el umbral mínimo para inmuebles ya había aumentado, las inversiones elegibles se volvieron más restringidas y el requisito de la AFA aumentó. En 2026, el umbral general de inversión computable parece haber aumentado aún más, hasta 1.000.000 de euros, mientras que, si la inversión se realiza a través de inmuebles, cada unidad debe superar los 800.000 euros.",
          "Esto refleja una tendencia más grande: Andorra se está moviendo hacia un modelo de residencia construido en torno a la calidad, el compromiso y la sustancia económica. Eso no debe interpretarse de forma negativa. En muchos sentidos, fortalece el atractivo a largo plazo del país.",
        ],
      },
      {
        heading: "Por qué Andorra sigue siendo tan atractiva",
        paragraphs: [
          "Incluso con umbrales más altos, la propuesta sigue siendo convincente. Andorra ofrece una rara combinación de estabilidad política, seguridad personal, una elevada calidad de vida, belleza natural, un perfil internacional de negocios y patrimonio, y un entorno europeo compacto y altamente eficiente.",
          "Para muchas personas, el atractivo va más allá de la planificación fiscal. Se trata de vivir en un lugar que resulte seguro, limpio, eficiente y cada vez más exclusivo.",
          "Esa exclusividad importa también en el sector inmobiliario. Andorra es una pequeña jurisdicción con una oferta restringida y un fuerte valor ligado a la ubicación. Eso significa que la residencia y la propiedad inmobiliaria pueden funcionar juntas de una forma muy atractiva cuando se estructuran correctamente.",
        ],
      },
      {
        heading: "Qué papel juega la inversión inmobiliaria",
        paragraphs: [
          "Para muchos solicitantes, la propiedad inmobiliaria sigue siendo una de las formas más atractivas de crear una conexión real con Andorra. La propiedad puede cumplir dos propósitos a la vez: apoyar una estrategia de residencia y crear valor personal o de inversión a largo plazo en el Principado.",
          "Eso puede significar adquirir una casa para vivir, asegurar una base familiar de alta calidad, invertir en una propiedad andorrana de primera calidad con convicción a largo plazo, o entrar en el mercado a través de un activo que usted realmente desearía poseer.",
          "Aquí es donde la estrategia importa. Una estructura de residencia pasiva no debe construirse en torno al activo elegible más barato posible. El enfoque más sólido es elegir un inmueble que tenga sentido tanto para la residencia como para el valor a largo plazo.",
        ],
      },
      {
        heading: "Por qué el asesoramiento local importa más ahora",
        paragraphs: [
          "A medida que las normas se vuelven más selectivas, la calidad de su asesoramiento local se vuelve más importante.",
          "Las preguntas correctas ya no son simplemente si cumple los requisitos, cuál es el umbral o qué documentación necesita. Las mejores preguntas son qué tipo de activo andorrano tiene sentido para usted, si comprar para uso personal, para inversión o para ambos, cómo deben alinearse las decisiones de residencia, fiscalidad e inversión inmobiliaria, y qué oportunidades merecen realmente la pena.",
          "En un mercado como Andorra, donde regulación, acceso y calidad de propiedad son todos profundamente locales, esa diferencia importa.",
        ],
      },
      {
        heading: "Por qué esta es aún una historia positiva",
        paragraphs: [
          "Sería fácil ver los umbrales crecientes y concluir que el proceso se está volviendo menos atractivo. En nuestra opinión, esa sería la lectura incorrecta.",
          "Lo que Andorra está haciendo es refinar su modelo. El país está dejando claro que la residencia pasiva es para personas que desean una relación significativa con el Principado. Eso crea un entorno más fuerte a largo plazo para residentes, inversores, propietarios y el mercado en general.",
          "Para el solicitante correcto, eso hace la oportunidad más convincente, no menos.",
        ],
      },
      {
        heading: "Cómo ayuda Equity Partners a los compradores de residencia",
        paragraphs: [
          "Equity Partners ayuda a los inversores a acceder a las oportunidades inmobiliarias más convincentes de Andorra a través de relaciones locales de confianza, conocimiento regulatorio y una ejecución disciplinada.",
          "Para un lector considerando residencia pasiva, eso significa que podemos ayudar a conectar el objetivo de residencia con la estrategia inmobiliaria adecuada, tanto si el objetivo es adquirir una vivienda en Andorra como construir una base familiar a largo plazo o asegurar una inversión inmobiliaria de alta calidad en uno de los mercados más atractivos del Principado.",
          "La residencia pasiva no es solo una decisión de inmigración. También es una decisión de asignación de capital. Y en Andorra, ambas decisiones deben abordarse juntas.",
        ],
      },
      {
        heading: "Por qué la residencia pasiva sigue siendo atractiva",
        paragraphs: [
          "La residencia pasiva de Andorra en 2026 es más selectiva que antes, pero sigue siendo una vía excepcional para el inversor o la familia adecuados.",
          "Los requisitos son más altos. El marco es más serio. Pero los beneficios siguen siendo muy reales: acceso a una de las jurisdicciones más atractivas de Europa, una base de residencia más fuerte a largo plazo y la posibilidad de combinar estilo de vida con una propiedad inmobiliaria andorrana significativa.",
          "Para quienes se sienten realmente ilusionados con la idea de vivir en Andorra o de invertir en su mercado inmobiliario de alta calidad, esta sigue siendo una oportunidad muy convincente. Y si esa es la dirección que usted está explorando, Equity Partners estará encantada de ayudarle a encontrar la propiedad adecuada y a estructurar el siguiente paso con confianza.",
        ],
      },
    ],
    sources: [
      {
        label: "Resumen de cambios de la Ley 2/2026",
        href: "https://carlotapastora.com/en/law-2-2026-andorra-changes-immigration-investment-taxation/",
      },
      {
        label: "Resumen de la Ley 5/2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "Advantia sobre nuevas condiciones de residencia",
        href: "https://www.advantia.ad/en/living-in-andorra/new-conditions-residence-andorra",
      },
      {
        label: "Antecedentes de residencia pasiva de Advantia",
        href: "https://www.advantia.ad/en/living-in-andorra/passive-resident-andorra",
      },
      {
        label: "Actualización de residencia de WIT",
        href: "https://wit.ad/en/new-conditions-for-residing-in-andorra-in-2025/",
      },
    ],
  },
  {
    slug: "andorra-property-tax-for-foreign-investors",
    title: "Impuestos sobre propiedades de Andorra para inversores extranjeros",
    category: "Impuestos",
    date: "Feb 2026",
    excerpt:
      "Qué significan las normas en 2026, dónde han cambiado los costes y cómo una estructuración más sólida puede proteger el valor a largo plazo.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "El impuesto ahora es parte de la estrategia de inversión",
        paragraphs: [
          "Andorra sigue siendo uno de los mercados inmobiliarios más atractivos de Europa para los inversores con vocación internacional. Pero en 2026, el impuesto sobre propiedades ya no puede tratarse como un detalle secundario.",
          "No es porque el mercado se haya vuelto menos convincente. Es porque Andorra se está volviendo más selectiva en cómo el capital extranjero entra en el sector de propiedades. Para inversores, eso significa que el impuesto ahora juega un papel más directo en la estrategia de adquisición, selección de activos y rendimientos a largo plazo.",
        ],
      },
      {
        heading: "El cambio fiscal clave que los inversores extranjeros deben entender",
        paragraphs: [
          "El impuesto más importante para compradores extranjeros es el impuesto sobre inversiones inmobiliarias extranjeras.",
          "Informes recientes de febrero de 2026 indicaron que el tipo aumentó al 6% sobre una primera propiedad y al 10% sobre una segunda propiedad.",
          "Ese es un aumento significativo respecto al marco anterior y confirma la dirección de la política: Andorra sigue acogiendo la inversión, pero quiere un capital de mayor calidad, mejor alineado y menos especulativo.",
        ],
      },
      {
        heading: "Por qué esto importa en la práctica",
        paragraphs: [
          "Un coste de entrada del 6% en una primera adquisición ya no es una simple fricción de fondo. Se convierte en parte de la economía central de la inversión.",
          "Esto tiene varias implicaciones directas: la calidad de los activos importa más, las compras repetidas son menos atractivas, la estructuración deficiente se vuelve más costosa y la convicción a largo plazo importa más que la flexibilidad a corto plazo.",
          "Para inversores, esto significa que Andorra cada vez más recompensa la precisión sobre la escala.",
        ],
      },
      {
        heading: "A quién se considera inversor extranjero",
        paragraphs: [
          "Esta es una de las preguntas prácticas más importantes.",
          "El impuesto no se aplica solo a no residentes obvios. Bajo el marco expandido, ciertos residentes también pueden ser considerados inversores extranjeros si no pueden demostrar el historial de residencia requerido en Andorra.",
          "Eso significa que la clasificación del inversor debe revisarse antes de estructurar una transacción, no después.",
        ],
      },
      {
        heading: "Por qué el gobierno está haciendo esto",
        paragraphs: [
          "Los cambios fiscales forman parte de un replanteamiento más amplio de la política de vivienda y de mercado.",
          "Andorra está usando la regulación y la fiscalidad para reducir la presión especulativa, proteger el acceso a la vivienda y fomentar un comportamiento inversor más duradero y alineado con el ámbito local.",
          "Eso no debe leerse solo como una barrera. También puede leerse como la señal de un mercado que se vuelve más disciplinado y más resiliente con el tiempo.",
        ],
      },
      {
        heading: "¿Sigue habiendo oportunidades atractivas?",
        paragraphs: [
          "Sí.",
          "Andorra sigue siendo convincente porque combina restricción de oferta, estabilidad política, un fuerte atractivo de estilo de vida y un mercado donde el acceso local aún crea una ventaja real.",
          "Para el inversor correcto, un impuesto de entrada más alto no elimina la oportunidad. Simplemente aumenta la importancia de elegir el activo adecuado y entrar en el mercado de la forma correcta.",
        ],
      },
      {
        heading: "Por qué la ejecución consciente de impuestos importa",
        paragraphs: [
          "Aquí es donde el asesoramiento local se vuelve especialmente valioso.",
          "El mercado andorrano ya no es uno donde inversores internacionales deban confiar en suposiciones genéricas o resúmenes amplios en línea. En un entorno fiscalmente sensible, la verdadera ventaja viene de entender cómo el marco fiscal afecta a la adquisición, qué oportunidades siguen justificando el coste de entrada y cómo el acceso local puede mejorar la calidad general de la inversión.",
          "Equity Partners ayuda a los inversores a abordar el mercado andorrano a través de inteligencia local, conocimiento regulatorio y una ejecución disciplinada. En 2026, eso es cada vez más lo que separa una oportunidad visible de una sólida.",
        ],
      },
      {
        heading: "Qué conclusiones deben extraer los inversores",
        paragraphs: [
          "Los impuestos sobre propiedades de Andorra para inversores extranjeros importan más en 2026 que hace apenas un año.",
          "El mercado es más selectivo, pero también más estructurado. Para los inversores bien asesorados, centrados en la calidad y comprometidos con el valor a largo plazo, Andorra aún ofrece oportunidades muy atractivas.",
          "La diferencia ahora es simple: entrar bien importa más que entrar rápido.",
        ],
      },
    ],
    sources: [
      {
        label: "SER Andorra sobre la actualización fiscal del 26 de febrero de 2026",
        href: "https://cadenaser.com/andorra/2026/02/26/el-govern-actualitza-fins-al-6-la-taxa-sobre-la-inversio-estrangera-immobiliaria-radio-ser-principat-d-andorra/",
      },
      {
        label: "Advantia sobre cambios de inversión inmobiliaria extranjera",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Advantia sobre el impuesto a la inversión extranjera en inmuebles",
        href: "https://www.advantia.ad/en/taxation/real-estate-foreign-investment-tax",
      },
      {
        label: "Carlota Pastora sobre la Ley Ómnibus del 6 de marzo de 2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
    ],
  },
  {
    slug: "andorra-real-estate-market-2026",
    title: "Mercado inmobiliario de Andorra: Precios, demanda y estadísticas",
    category: "Actualización del mercado",
    date: "Feb 2026",
    excerpt:
      "Una lectura práctica sobre precios, actividad de transacciones y demanda de residentes en el mercado inmobiliario en evolución de Andorra.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min de lectura",
    sections: [
      {
        heading: "Un mercado que se está volviendo más selectivo, no más débil",
        paragraphs: [
          "El mercado inmobiliario andorrano en 2026 se entiende mejor a través de una idea: selectividad.",
          "Desde fuera, la subida de los precios y unas normas más estrictas pueden hacer que el mercado parezca menos accesible. Eso es verdad. Pero no significa que el mercado se esté debilitando. En muchos aspectos, significa lo opuesto. Andorra se está convirtiendo en un entorno inmobiliario más estructurado, más disciplinado y más orientado a calidad.",
          "Para inversores, eso importa. El mercado ya no gira solo en torno al crecimiento. Se trata de entender dónde se mantiene aún el valor, quién está comprando realmente y qué dicen los datos más allá de los titulares.",
        ],
      },
      {
        heading: "Los precios siguen subiendo",
        paragraphs: [
          "Los informes oficiales y locales recientes sugieren que los precios se mantienen firmes.",
          "Los datos publicados en febrero de 2026 mostraron que el precio medio de los apartamentos en 2025 subió un 10,5%, hasta alrededor de 4.479 euros por metro cuadrado. Informes anteriores de noviembre de 2025 ya habían mostrado precios medios de apartamentos cercanos a 4.440 euros por metro cuadrado en el tercer trimestre.",
          "Eso nos dice algo importante: el crecimiento de los precios no es solo un repunte pasajero. Refleja un mercado donde la oferta sigue siendo restringida y el producto de alta calidad continúa atrayendo atención.",
        ],
      },
      {
        heading: "Los residentes aún dominan el mercado",
        paragraphs: [
          "Una de las señales más importantes en los datos de 2025 es que el 75,1% de las adquisiciones inmobiliarias fueron realizadas por residentes.",
          "Es un dato muy importante. Significa que Andorra no está siendo impulsada simplemente por el capital extranjero. La demanda de los residentes sigue siendo estructuralmente central para el mercado, lo que apoya la resiliencia a largo plazo.",
          "Para inversores, eso es alentador. Muestra que Andorra sigue teniendo una demanda interna sólida incluso mientras la atención internacional continúa aumentando.",
        ],
      },
      {
        heading: "La actividad de transacciones ha sido fuerte",
        paragraphs: [
          "El mercado estuvo muy activo en 2025.",
          "Informes recientes indicaron que el número de transacciones aumentó más de un 35%, el valor total de las transacciones aumentó aproximadamente un 34% y el valor total del mercado alcanzó aproximadamente 1.398 millones de euros.",
          "Al mismo tiempo, las adquisiciones extranjeras también aumentaron con fuerza. Pero ese aumento debe interpretarse con cautela. Refleja en parte el repunte posterior al período de moratoria anterior, que había distorsionado temporalmente la base de comparación.",
        ],
      },
      {
        heading: "El crecimiento de las hipotecas confirma una demanda subyacente real",
        paragraphs: [
          "Otra señal útil vino del mercado hipotecario.",
          "Los datos publicados en marzo de 2026 mostraron que las hipotecas residenciales en 2025 aumentaron aproximadamente un 40% interanual, con un volumen total de hipotecas superior a 385 millones de euros.",
          "Eso importa porque la actividad de hipotecas es uno de los indicadores más claros de participación real de compradores. Sugiere que la demanda no es solo teórica y no es puramente especulativa.",
        ],
      },
      {
        heading: "Qué significa esto para los inversores",
        paragraphs: [
          "Para los inversores, la verdadera conclusión es que Andorra sigue siendo atractiva, pero ya no es un mercado para aficionados.",
          "Es probable que las oportunidades más sólidas se encuentren donde confluyen varios factores: oferta restringida, demanda local real, producto de alta calidad, encaje regulatorio claro y una ejecución local sólida.",
          "Este no es un mercado donde la exposición amplia sea necesariamente la decisión más inteligente. Es un mercado donde es probable que la exposición mejor seleccionada obtenga mejores resultados.",
        ],
      },
      {
        heading: "Por qué esta es aún una historia positiva",
        paragraphs: [
          "La historia del mercado de Andorra en 2026 no se trata de acceso fácil. Se trata de durabilidad.",
          "Los precios se mantienen fuertes. Los residentes siguen activos. El volumen de hipotecas ha aumentado. La participación extranjera existe, pero ya no es la única historia. Y el entorno normativo está empujando el mercado hacia una mayor disciplina, más que hacia una especulación laxa.",
          "Para inversores serios, eso puede ser una combinación muy positiva.",
        ],
      },
      {
        heading: "Por qué la lectura local del mercado crea una ventaja",
        paragraphs: [
          "Aquí es donde el conocimiento local se convierte en una ventaja real.",
          "Equity Partners ayuda a los inversores a interpretar el mercado andorrano a través del acceso local, conocimiento regulatorio y relaciones de confianza sobre el terreno. En un mercado donde la calidad y la escasez importan tanto como las cifras de los titulares, esa perspectiva es cada vez más importante.",
          "Para los inversores que analizan Andorra en 2026, el objetivo no debe ser solo seguir el impulso del mercado. Debe ser entender dónde es más fuerte el mercado y dónde es más probable que el valor a largo plazo se mantenga.",
        ],
      },
      {
        heading: "Cómo los inversores deben leer el mercado ahora",
        paragraphs: [
          "El mercado inmobiliario de Andorra en 2026 es un mercado activo, caro, con una oferta restringida y todavía muy convincente.",
          "Pero la oportunidad ya no reside solo en optimismo amplio. Reside en leer el mercado correctamente: los precios están subiendo, los residentes permanecen dominantes, la actividad es fuerte y la calidad importa más que nunca.",
          "Para inversores que entienden ese cambio, Andorra continúa ofreciendo una de las historias inmobiliarias más interesantes en Europa.",
        ],
      },
    ],
    sources: [
      {
        label: "Govern d'Andorra sobre transacciones de 2025, 9 de febrero de 2026",
        href: "https://www.govern.ad/ca/w/la-compra-d-habitatges-al-2025-va-ser-realitzada-majoritariament-per-residents-al-pais",
      },
      {
        label: "SER Andorra sobre datos de transacciones de 2025, 9 de febrero de 2026",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre precio por metro cuadrado de apartamentos, 6 de noviembre de 2025",
        href: "https://cadenaser.com/andorra/2025/11/06/el-preu-mitja-del-metre-quadrat-en-un-pis-de-venda-frega-els-4500-euros-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre hipotecas residenciales, 16 de marzo de 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre alquileres y precios de venta, 2 de octubre de 2025",
        href: "https://cadenaser.com/andorra/2025/10/02/el-preu-del-lloguer-supera-els-3170-euros-i-arriba-al-maxim-historic-radio-ser-principat-d-andorra/",
      },
    ],
  },
  {
    slug: "best-areas-to-invest-in-andorra-property",
    title: "Mejores áreas para invertir en propiedades de Andorra",
    category: "Guía de ubicación",
    date: "Jan 2026",
    excerpt:
      "Una guía práctica sobre dónde el valor, la escasez y el posicionamiento a largo plazo son más fuertes en las principales parroquias de Andorra.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Un mercado pequeño donde la ubicación importa aún más",
        paragraphs: [
          "En Andorra, la ubicación no es solo un filtro de búsqueda. Es uno de los mayores impulsores del valor a largo plazo.",
          "Eso se debe en parte a que el país es pequeño, la oferta es limitada y cada parroquia se comporta de forma diferente. Un comprador que mira hacia Ordino no está entrando en el mismo mercado que alguien centrado en Encamp o Andorra la Vella. Los precios, el perfil del comprador, la escasez y el caso de uso a largo plazo pueden cambiar significativamente de una zona a otra.",
          "Para los inversores, eso es una buena noticia. Significa que Andorra no es un mercado unidimensional. La oportunidad reside en entender qué ubicaciones se alinean mejor con el objetivo que hay detrás del capital.",
        ],
      },
      {
        heading: "Ordino: Prestigio, escasez y calidad a largo plazo",
        paragraphs: [
          "Ordino continúa destacando como una de las ubicaciones residenciales más premium en el país.",
          "Los informes de mercado de 2025 mostraron precios medios de venta en Ordino superiores a 1,5 millones de euros, y datos posteriores situaron esa media por encima de 1,6 millones de euros. Eso sitúa a Ordino entre los mercados de alta gama más claros de Andorra.",
          "En Ordino, la clave suele estar menos en el volumen a corto plazo y más en la calidad residencial duradera. Para compradores que buscan una base andorrana de primer nivel o un activo de tenencia larga en uno de los entornos más deseables del país, sigue siendo una de las ubicaciones más fuertes del mercado.",
        ],
      },
      {
        heading: "Escaldes-Engordany: Demanda premium con profundidad urbana real",
        paragraphs: [
          "Escaldes sigue siendo uno de los mercados de propiedades más importantes en Andorra, particularmente para compradores que buscan centralidad, comodidad y un posicionamiento premium.",
          "Informes recientes mostraron valores medios de venta en Escaldes por encima de 1 millón de euros, con niveles de alquiler también entre los más altos del país. La actividad hipotecaria en 2025 también aumentó con fuerza en la parroquia, lo que sugiere una demanda subyacente real, y no una simple inflación de los precios anunciados.",
          "Escaldes es uno de los ejemplos más claros de una parroquia donde la liquidez y el prestigio pueden coexistir. Ofrece una forma más urbana de escasez que Ordino, pero no es menos relevante.",
        ],
      },
      {
        heading: "Andorra la Vella: Central, establecida y altamente práctica",
        paragraphs: [
          "La capital sigue siendo uno de los puntos de referencia más importantes en el mercado.",
          "Los precios medios de salida en 2025 se situaron en torno a los 650.000 euros a principios de año, y los informes de mercado posteriores situaron los valores medios de venta más cerca de los 850.000 euros. Los valores de alquiler también están entre los más altos del país.",
          "Puede que Andorra la Vella no tenga la misma aura de lujo que las zonas más exclusivas de Ordino o Escaldes, pero tiene algo más: practicidad. Para muchos inversores, eso la convierte en uno de los mercados más fiables del Principado.",
        ],
      },
      {
        heading: "Encamp: Entrada más accesible, perfil de valor diferente",
        paragraphs: [
          "Encamp sigue siendo una de las vías más asequibles para entrar en el mercado andorrano.",
          "Informes recientes situaron los valores medios de venta por debajo de los de la mayor parte del país, con cifras inferiores a 390.000 euros a principios de 2025 y en torno a 473.000 euros en informes posteriores de 2025. Los precios de alquiler también siguen siendo mucho más bajos que en el valle central.",
          "Encamp no es el mismo tipo de apuesta que Ordino o Escaldes. Pero esa es exactamente la cuestión. Para algunos inversores, una parroquia más accesible con margen para una revalorización selectiva puede ser más atractiva que perseguir el código postal más caro.",
        ],
      },
      {
        heading: "Canillo: Proximidad al turismo y señales de precio por metro cuadrado",
        paragraphs: [
          "Canillo es interesante porque a menudo se comporta de forma diferente al resto del mercado.",
          "Aunque no siempre lidera el precio medio de compra de los titulares, ha mostrado métricas muy sólidas de precio por metro cuadrado y de alquiler en informes locales recientes. Eso sugiere escasez a nivel de unidad y una demanda fuerte en enclaves específicos, especialmente donde el acceso al esquí y a la montaña juega un papel.",
          "Canillo es un mercado más especializado. Tiene menos que ver con una profundidad residencial amplia y más con el producto adecuado en el lugar adecuado.",
        ],
      },
      {
        heading: "Qué dicen los datos sobre el mercado más amplio",
        paragraphs: [
          "El contexto general del mercado respalda la idea de que Andorra sigue siendo activa y selectiva al mismo tiempo.",
          "Informes recientes indicaron que los precios medios de los apartamentos en 2025 subieron hasta alrededor de 4.479 euros por metro cuadrado, el 75,1% de las transacciones inmobiliarias de 2025 fueron realizadas por residentes, la actividad hipotecaria residencial en 2025 aumentó aproximadamente un 40% y el valor total de las transacciones alcanzó aproximadamente 1.398 millones de euros.",
          "Estas son señales importantes. Muestran un mercado caro, con una oferta restringida y todavía respaldado por una actividad compradora real significativa.",
        ],
      },
      {
        heading: "Entonces, ¿dónde deben enfocarse los inversores?",
        paragraphs: [
          "Eso depende del objetivo.",
          "Por eso la selección de parroquia en Andorra nunca debe ser genérica. El mismo mercado nacional puede ofrecer historias de inversión muy diferentes dependiendo de dónde se entre.",
        ],
        table: {
          headers: ["Objetivo del inversor", "Áreas más adecuadas", "Perfil de inversión"],
          rows: [
            ["Base de estilo de vida premium", "Ordino, Escaldes", "Enfoque de prestigio"],
            ["Tenencia a largo plazo central y práctica", "Andorra la Vella, Escaldes", "Tenencia central"],
            ["Posición de valor emergente", "Encamp", "Popularidad creciente"],
            ["Posicionamiento de montaña/segunda vivienda", "Canillo, Ordino", "Acceso a estilo de vida"],
          ],
        },
      },
      {
        heading: "Por qué la lectura local del mercado crea una ventaja",
        paragraphs: [
          "Andorra ya no es un mercado donde la exposición amplia sea suficiente.",
          "Los resultados más sólidos están cada vez más ligados a la calidad de la microubicación, las dinámicas de oferta, el perfil del comprador y la capacidad de distinguir el stock visible de la oportunidad real. Ahí es donde la lectura local crea una ventaja.",
          "Equity Partners ayuda a los inversores a interpretar el mercado andorrano a través del acceso local, conocimiento regulatorio y relaciones confiables sobre el terreno. En un mercado pequeño y con altas barreras de entrada, entender dónde invertir a menudo es tan importante como decidir si invertir.",
        ],
      },
      {
        heading: "Qué áreas merecen ahora la mayor atención",
        paragraphs: [
          "Andorra continúa ofreciendo oportunidades inmobiliarias convincentes, pero la selección de parroquia es ahora una de las decisiones estratégicas más importantes que un inversor puede tomar.",
          "Para inversores que buscan prestigio y escasez, Ordino y Escaldes siguen siendo especialmente fuertes. Para aquellos que buscan practicidad y resiliencia urbana, Andorra la Vella merece atención. Para compradores que priorizan puntos de entrada más bajos o posicionamiento más especializado, Encamp y Canillo pueden ser altamente relevantes.",
          "La oportunidad en Andorra es real. Pero a medida que el mercado se vuelve más selectivo, la calidad de ubicación importa más que nunca.",
        ],
      },
    ],
    sources: [
      {
        label: "SER Andorra sobre alquileres y precios de venta, 2 de octubre de 2025",
        href: "https://cadenaser.com/andorra/2025/10/02/el-preu-del-lloguer-supera-els-3170-euros-i-arriba-al-maxim-historic-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre alquileres y precios, 10 de abril de 2025",
        href: "https://cadenaser.com/andorra/2025/04/10/el-preu-de-lhabitatge-de-lloguer-ha-crescut-un-35-durant-el-primer-trimestre-de-lany-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre hipotecas residenciales, 16 de marzo de 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
    ],
  },
];
