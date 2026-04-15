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
    date: "Mar 2026",
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
          "Para los inversores, eso cambia la pregunta real. Ya no es simplemente si puedes comprar. Es qué puedes comprar, cómo puedes estructurarlo, y si la oportunidad aún tiene sentido bajo las nuevas reglas.",
          "Para nosotros, este es el cambio clave: Andorra ya no debe verse como un mercado de propiedades de acceso fácil y eficiencia fiscal. Es ahora una jurisdicción de alto nivel de barrera donde el acceso local, el cumplimiento normativo y la calidad de ejecución importan mucho más que antes.",
        ],
      },
      {
        heading: "Qué cambió después del reinicio regulatorio de 2025",
        paragraphs: [
          "El punto de inflexión principal fue la Ley 5/2025, aprobada el 6 de marzo de 2025 y aplicada desde abril de 2025. La reforma fue diseñada para reducir la presión especulativa, proteger el acceso a la vivienda local y endurecer cómo funciona la inversión inmobiliaria extranjera en la práctica.",
          "Eso importa porque muchos artículos internacionales sobre propiedades en Andorra fueron escritos antes de estos cambios. Un comprador que se base en guías obsoletas puede malinterpretar fácilmente su posición real.",
          "Esta es una de las mayores lagunas del mercado. Una gran parte del contenido en idioma inglés sobre comprar propiedades en Andorra fue escrito antes de las reformas de 2025 o sigue repitiendo una versión anterior de la historia del mercado: impuestos bajos, sin fricción importante, demanda creciente, jurisdicción de montaña atractiva, compra de propiedad directa.",
          "Esa narrativa ahora es incompleta, en el mejor de los casos.",
        ],
      },
      {
        heading: "Qué pueden comprar aún los inversores extranjeros",
        paragraphs: [
          "Los compradores extranjeros aún pueden adquirir propiedades en Andorra, pero bajo límites más estrechos que antes. En términos generales, el marco ahora se centra en una única casa unifamiliar o terreno para una, hasta dos unidades residenciales en ciertos casos, y activos auxiliares limitados como aparcamiento.",
          "Eso aún puede funcionar bien para inversores seleccionados, pero claramente aleja el mercado de la acumulación residencial amplia y repetida.",
          "Para inversores acostumbrados a mayor flexibilidad, esto puede parecer inicialmente restrictivo. En realidad, cambia el juego de la acumulación a la precisión.",
          "Los mejores resultados ahora son más probables que provengan de activos cuidadosamente elegidos, tenencias a largo plazo y adquisiciones estructuradas con ejecución local disciplinada desde el primer día.",
        ],
      },
      {
        heading: "Por qué las mejores oportunidades pertenecen ahora al capital disciplinado",
        paragraphs: [
          "El mayor error que un inversor extranjero puede cometer en Andorra hoy es asumir que aún posible significa aún simple. El estado de inversor, el trato fiscal, los límites de adquisición y el caso de uso ahora importan mucho más que antes. Algunas estrategias aún funcionan muy bien. Otras son mucho menos atractivas o ya no son viables de la forma que muchos compradores extranjeros esperan.",
          "Por eso la estructuración local se ha convertido en parte del rendimiento de la inversión. En Andorra hoy, la calidad de ejecución no es solo operacional. Es estratégica.",
          "La oportunidad en Andorra no ha desaparecido. Se ha vuelto más selectiva. Eso significa que los mejores resultados ahora son más probables que provengan de activos cuidadosamente elegidos, tenencias a largo plazo en lugar de especulación, relaciones locales fuertes, y planificación jurídica y de ejecución disciplinada desde el primer día.",
          "En otras palabras, Andorra ahora recompensa la precisión más que la escala.",
        ],
      },
      {
        heading: "Por qué el consejo antiguo de internet es ahora peligroso",
        paragraphs: [
          "Un comprador que se base en material obsoleto puede malinterpretar si califica como inversor extranjero, cuántas unidades puede adquirir legalmente, si una estrategia de desarrollo aún está permitida, cómo se aplican ahora los impuestos de inversión extranjera, o si una estrategia vinculada a residencia aún funciona de la forma que una vez lo hizo.",
          "Esta es exactamente la razón por la que el consejo de ejecución local y actual se ha vuelto más valioso que el contenido internacional general. El mercado andorrano ya no es uno donde una orientación general sobre estilo de vida sea suficiente. Los detalles jurídicos y estratégicos ahora cambian los resultados.",
        ],
      },
      {
        heading: "Qué nos dice el mercado",
        paragraphs: [
          "Los datos recientes del mercado de 2025 reportados a principios de 2026 mostraron que la mayoría de las transacciones fueron realizadas aún por residentes. Eso es importante. Confirma que Andorra no es solo una historia de demanda extranjera. La participación doméstica sigue siendo central para el mercado, y eso apoya la dirección política más restrictiva del gobierno.",
          "Para inversores, eso hace que Andorra sea más interesante, no menos. Un mercado selectivo con profundidad local real es a menudo más resiliente que uno impulsado solo por impulso internacional.",
        ],
      },
      {
        heading: "Qué significa esto para los compradores extranjeros",
        paragraphs: [
          "Entonces, ¿pueden los extranjeros aún comprar propiedades en Andorra en 2026? Sí.",
          "Pero Andorra ya no es un mercado para suposiciones pasivas o estrategias obsoletas. La oportunidad sigue siendo sólida para inversores que entienden el nuevo marco y abordan el mercado con la guía local correcta.",
          "Ahí es donde reside el verdadero borde ahora: no en perseguir acceso fácil, sino en entrar al mercado correctamente.",
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
        label: "SER Andorra reportando datos oficiales de transacciones de 2025",
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
      "Una guía actual para inversores sobre bienes raíces en Andorra en 2026: regulación, precios, restricciones de inversión extranjera y dónde el capital disciplinado puede encontrar aún oportunidades.",
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min de lectura",
    sections: [
      {
        heading: "Un mercado más selectivo está fortaleciendo el caso de inversión",
        paragraphs: [
          "La historia de bienes raíces andorrana en 2026 ya no se define por apertura. Se define por escasez, selectividad y el valor creciente de la ejecución local.",
          "Precisamente por eso el mercado sigue mereciendo la atención seria de inversores. Durante mucho tiempo, Andorra fue descrita en términos demasiado simples: eficiencia fiscal, estabilidad política, estilo de vida de montaña y demanda internacional creciente. Estos elementos aún importan, pero ya no explican el caso de inversión completo.",
          "Hoy, Andorra se entiende mejor como un mercado inmobiliario europeo de alto nivel de barrera. El acceso es más estrecho. La regulación es más estricta. La coordinación local tiene más peso. Y los inversores mejor posicionados para desempeñarse bien ya no son aquellos que buscan amplia flexibilidad, sino aquellos que entran con estructuración más aguda, alineación local más fuerte y una visión más a largo plazo del valor.",
          "Ese cambio no ha debilitado el mercado. En muchos aspectos, lo ha hecho más invertible para capital disciplinado.",
        ],
      },
      {
        heading: "Qué ha cambiado para los inversores",
        paragraphs: [
          "La narrativa de inversión antigua se enfocaba en entrada simple al mercado. La actual se trata del acceso calificado.",
          "Hoy, inversores serios necesitan entender tres cambios estructurales. Primero, la inversión inmobiliaria extranjera es más restringida. El mercado ya no está abierto al tipo de acumulación residencial amplia que muchos compradores internacionales alguna vez asumieron que era posible. Las adquisiciones ahora están sujetas a límites más claros, y ciertas estrategias especulativas o vinculadas al turismo han sido materialmente constreñidas.",
          "Segundo, la estructura fiscal y regulatoria importa más para los retornos. En mercados con más flexibilidad, la estructuración deficiente puede ser ineficiente pero viable. En Andorra hoy, la estructuración deficiente puede alterar toda la economía de una transacción.",
          "Tercero, la ejecución local se ha convertido en parte de la tesis de inversión. En una jurisdicción más pequeña, donde aprobaciones, contrapartes y acceso al mercado son sensibles a relaciones, la calidad de la coordinación local puede tener más impacto que la optimización de hojas de cálculo.",
          "Por eso las mejores oportunidades de Andorra en 2026 no son necesariamente las más visibles. A menudo son aquellas que combinan producto escaso, estructura cumplida y entrega local creíble.",
        ],
      },
      {
        heading: "Qué dicen los datos sobre el mercado ahora",
        paragraphs: [
          "Los números recientes confirman que Andorra sigue siendo activa, pero también muestran un mercado formado por residentes, escasez y normalización post-reforma más que puramente por demanda extranjera.",
          "El informe sobre datos oficiales del mercado de 2025 publicado el 9 de febrero de 2026 indicó que el 75,1% de las transacciones inmobiliarias de 2025 fueron realizadas por residentes, el valor total de transacciones alcanzó aproximadamente 1.398 mil millones de euros, el precio medio de apartamentos subió a alrededor de 4.479 euros por metro cuadrado, y las compras extranjeras aumentaron fuertemente, pero en parte desde la base distorsionada creada por el período de moratoria anterior.",
          "Informes adicionales del 6 de noviembre de 2025 indicaron que los precios de apartamentos ya habían alcanzado aproximadamente 4.500 euros por metro cuadrado en el tercer trimestre, reforzando la opinión de que la presión de precios sigue siendo estructuralmente real en lugar de anecdótica.",
          "Más recientemente, datos reportados el 16 de marzo de 2026 mostraron que las hipotecas residenciales en 2025 se habían incrementado aproximadamente un 40% año tras año, con más de 385 millones de euros en volumen de hipotecas residenciales. Eso importa porque sugiere que la actividad de compradores locales sigue siendo fuerte incluso cuando el mercado se vuelve más caro y más regulado.",
          "Para inversores, esto es importante. Andorra no es simplemente una historia de capital extranjero. La demanda doméstica aún importa. Eso tiende a apoyar la resiliencia.",
        ],
      },
      {
        heading: "Por qué los inversores siguen interesados",
        paragraphs: [
          "A pesar de reglas más estrictas, Andorra mantiene atracciones claras para capital sofisticado. La escasez apoya el valor a largo plazo en una jurisdicción de suministro limitado donde la tierra es limitada, la planificación es sensible y la calidad del producto importa.",
          "La base de compradores también es más profunda de lo que los foráneos a menudo asumen. El mercado está apoyado no solo por interés extranjero, sino por residentes, negocios locales y capital familiar establecido. Eso importa para la liquidez y la resiliencia.",
          "El endurecimiento regulatorio puede fortalecer el mercado con el tiempo desalentando capital de menor convicción y preservando mejor alineación entre oferta, precios y tolerancia social.",
          "El acceso es más difícil, lo que aumenta el valor de la ventaja local. Cuando un mercado se vuelve más selectivo, la asimetría de información crece. Eso beneficia a inversores que trabajan a través de redes locales reales en lugar de listados genéricos y narrativas de mercado generalizadas.",
        ],
      },
      {
        heading: "Dónde persiste aún la oportunidad",
        paragraphs: [
          "La oportunidad real en Andorra en 2026 no está en perseguir la exposición más amplia posible. Está en identificar dónde la selectividad crea valor.",
          "En nuestra opinión, las mejores oportunidades permanecen concentradas en cuatro áreas: residencial de primera calidad con verdadera escasez, desarrollo listo para ejecución, estrategias de tenencia a largo plazo y oportunidades originadas localmente donde la calidad de acceso importa más que la visibilidad del mercado público.",
          "Los activos residenciales bien posicionados en micro-ubicaciones constreñidas continúan teniendo atractivo para inversores, especialmente donde la calidad y la disciplina de oferta son obvias. Los proyectos con rutas de planificación realistas, alineación de socios creíble y lógica de desarrollo limpia son cada vez más favorecidos sobre posiciones conceptuales o especulativas.",
          "A medida que la fricción de transacción aumenta, la lógica de inversión de larga duración se vuelve más convincente. Los inversores que entran en Andorra deberían pensar cada vez más en términos de valor duradero, no solo en arbitraje de ciclo corto.",
        ],
      },
      {
        heading: "Qué deben evitar los inversores serios",
        paragraphs: [
          "Andorra sigue siendo atractiva, pero es menos indulgente. Los mayores errores en 2026 suelen ser estratégicos en lugar de legales.",
          "Los inversores malinterpretan el mercado cuando asumen que la vieja guía de comprador extranjero aún aplica, sobreestiman cuán escalable es la adquisición residencial, subestiman las transacciones sin suficiente consideración de estructura fiscal y cumplimiento, tratan la ejecución local como un detalle operacional en lugar de una variable de inversión central, o confunden disponibilidad con calidad.",
          "Ese último punto importa. En una jurisdicción selectiva, el inventario visible no siempre es el mejor inventario. Las mejores oportunidades a menudo emergen donde confianza, tiempo y credibilidad local se interseccionan.",
        ],
      },
      {
        heading: "Por qué la perspectiva local importa más que nunca",
        paragraphs: [
          "En un mercado más flexible, el capital solo puede hacer más del trabajo. En Andorra hoy, eso ya no es verdad. Los inversores necesitan mejor inteligencia del mercado, conectividad local más fuerte, estructuración disciplinada y supervisión de entrega creíble.",
          "Ese es el vacío que Equity Partners está construido para abordar. Nuestro valor no es simplemente que conocemos el mercado. Es que ayudamos a los inversores a entrar correctamente: con perspectiva local, coordinación de contrapartes más fuerte y una línea más clara entre intención estratégica y ejecución en el terreno.",
        ],
      },
      {
        heading: "Por qué Andorra aún merece la atención de inversores",
        paragraphs: [
          "Andorra sigue siendo uno de los mercados inmobiliarios de nicho más convincentes en Europa para capital serio. Pero ya no es un mercado para suposiciones pasivas, optimismo amplio de compradores extranjeros o narrativas de paraíso fiscal recicladas.",
          "La historia de inversión de Andorra en 2026 es más fuerte que eso. Es una historia sobre acceso selectivo, oferta restringida, participación doméstica resiliente, sofisticación regulatoria creciente y el valor creciente de la ejecución local disciplinada.",
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
        label: "Carlota Pastora sobre la Ley Omnibus del 6 de marzo de 2025",
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
      "Qué se requiere para calificar en 2026, por qué el marco está cambiando, y por qué Andorra sigue siendo un lugar tan atractivo para vivir e invertir.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Una ruta más selectiva hacia una de las jurisdicciones más atractivas de Europa",
        paragraphs: [
          "Andorra continúa destacando como una de las jurisdicciones más atractivas de Europa para inversores, familias y emprendedores internacionales que desean estabilidad, calidad de vida y una base más fuerte a largo plazo en Europa.",
          "En 2026, la residencia pasiva en Andorra sigue siendo muy disponible. Pero el marco está evolucionando. El país está elevando el estándar, no para hacer la residencia menos atractiva, sino para hacerla más selectiva, más sostenible y más claramente alineada con personas que desean una conexión genuina con el Principado.",
          "Eso es lo que hace que la ruta de residencia pasiva de Andorra sea tan interesante hoy. Ya no se trata simplemente de cumplir con un umbral. Se trata de demostrar compromiso con un país que ofrece excepcional calidad de vida, estabilidad política y bienes raíces cada vez más valiosos.",
        ],
      },
      {
        heading: "Qué es la residencia pasiva de Andorra",
        paragraphs: [
          "La residencia pasiva, o residencia sin actividad lucrativa, está diseñada para individuos que desean vivir en Andorra sin asumir empleo local en el sentido tradicional.",
          "Es particularmente relevante para inversores, emprendedores con ingresos internacionales, poseedores de riqueza privada, familias que buscan una base europea segura y de alta calidad, e individuos que combinan objetivos de estilo de vida con planificación fiscal y de activos a largo plazo.",
          "En términos prácticos, permite que te conviertas en residente de Andorra mientras construyes tu vida alrededor del país, siempre que cumplas con los requisitos financieros e de inversión.",
        ],
      },
      {
        heading: "Qué se requiere para calificar en 2026",
        paragraphs: [
          "El marco de 2026 es más exigente que en años anteriores. Es importante entender esto desde el principio.",
          "De acuerdo con resúmenes legales recientes de 2026, la residencia pasiva generalmente ahora requiere una inversión calificadora mínima en activos andorranos de 1.000.000 de euros, mientras que si la inversión se realiza en bienes raíces, cada unidad debe exceder 800.000 euros.",
          "El pago de AFA del solicitante principal es de 50.000 euros, con 12.000 euros adicionales por cada dependiente. También hay una expectativa de residencia efectiva en Andorra durante el año.",
        ],
      },
      {
        heading: "Cómo están cambiando los requisitos",
        paragraphs: [
          "Este es el lugar donde muchos lectores son atrapados por información obsoleta en línea. El marco de residencia de Andorra no cambió solo una vez. Cambió en etapas.",
          "En 2025, el umbral mínimo de bienes raíces ya había aumentado, las inversiones elegibles se volvieron más estrechas y el requisito de AFA aumentó. En 2026, el umbral de inversión calificadora más amplio parece haber aumentado aún más a 1.000.000 de euros, mientras que si la inversión se realiza a través de propiedad, cada unidad debe exceder 800.000 euros.",
          "Esto refleja una tendencia más grande: Andorra se está moviendo hacia un modelo de residencia construido alrededor de calidad, compromiso y sustancia económica. Eso no debe verse negativamente. De muchas formas, fortalece el atractivo a largo plazo del país.",
        ],
      },
      {
        heading: "Por qué Andorra sigue siendo tan atractiva",
        paragraphs: [
          "Incluso con umbrales más altos, la proposición permanece convincente. Andorra ofrece una rara combinación de estabilidad política, seguridad personal, calidad de vida fuerte, belleza natural, un perfil de negocios y riqueza internacional, y un ambiente europeo compacto y de alto funcionamiento.",
          "Para muchas personas, el atractivo va más allá de la planificación fiscal. Se trata de vivir en un lugar que se sienta seguro, limpio, eficiente y cada vez más exclusivo.",
          "Esa exclusividad importa también en bienes raíces. Andorra es una pequeña jurisdicción con oferta restringida y fuerte valor específico de ubicación. Eso significa que la propiedad de residencia y bienes raíces puede funcionar juntas de una forma muy atractiva cuando está estructurada correctamente.",
        ],
      },
      {
        heading: "Qué papel juegan los bienes raíces",
        paragraphs: [
          "Para muchos solicitantes, los bienes raíces siguen siendo una de las formas más atractivas de crear una conexión real con Andorra. La propiedad puede servir dos propósitos a la vez: apoyar una estrategia de residencia y crear valor personal o de inversión a largo plazo en el Principado.",
          "Eso puede significar adquirir una casa para vivir, asegurar una base familiar de alta calidad, invertir en una propiedad andorrana de primera calidad con convicción a largo plazo, o entrar al mercado a través de un activo que genuinamente querrías poseer.",
          "Este es el lugar donde la estrategia importa. Una estructura de residencia pasiva no debe estar construida alrededor del activo calificador más barato posible. El enfoque más fuerte es elegir bienes raíces que tengan sentido tanto para residencia como para valor a largo plazo.",
        ],
      },
      {
        heading: "Por qué la guía local importa más ahora",
        paragraphs: [
          "A medida que las reglas se vuelven más selectivas, la calidad de tu asesoramiento local se vuelve más importante.",
          "Las preguntas correctas ya no son simplemente si calificas, cuál es el umbral o qué papeleo necesitas. Las mejores preguntas son qué tipo de activo andorrano tiene sentido para ti, si comprar para uso personal o inversión o ambos, cómo deben alinearse las decisiones de residencia, impuesto y bienes raíces, y qué oportunidades realmente merecen ser perseguidas.",
          "En un mercado como Andorra, donde regulación, acceso y calidad de propiedad son todos profundamente locales, esa diferencia importa.",
        ],
      },
      {
        heading: "Por qué esta es aún una historia positiva",
        paragraphs: [
          "Sería fácil ver los umbrales crecientes y concluir que el proceso se está volviendo menos atractivo. En nuestra opinión, esa sería la lectura incorrecta.",
          "Lo que Andorra está haciendo es refinar su modelo. El país está dejando claro que la residencia pasiva es para personas que desean una relación significativa con el Principado. Eso crea un ambiente más fuerte a largo plazo para residentes, inversores, propietarios y el mercado en general.",
          "Para el solicitante correcto, eso hace la oportunidad más convincente, no menos.",
        ],
      },
      {
        heading: "Cómo ayuda Equity Partners a los compradores de residencia",
        paragraphs: [
          "Equity Partners ayuda a los inversores a acceder a las oportunidades de bienes raíces más convincentes de Andorra a través de relaciones locales confiables, perspectiva regulatoria y ejecución disciplinada.",
          "Para un lector considerando residencia pasiva, eso significa que podemos ayudar a conectar el objetivo de residencia con la estrategia de bienes raíces correcta, ya sea que el objetivo sea adquirir una casa en Andorra, construir una base familiar a largo plazo o asegurar una inversión de propiedad de alta calidad en uno de los mercados más atractivos del Principado.",
          "La residencia pasiva no es solo una decisión de inmigración. También es una decisión de asignación de capital. Y en Andorra, esas dos deben abordarse juntas.",
        ],
      },
      {
        heading: "Por qué la residencia pasiva sigue siendo atractiva",
        paragraphs: [
          "La residencia pasiva de Andorra en 2026 es más selectiva que antes, pero sigue siendo una ruta excepcional para el inversor o familia correcto.",
          "Los requisitos son más altos. El marco es más serio. Pero los beneficios siguen siendo muy reales: acceso a una de las jurisdicciones más atractivas de Europa, una base de residencia más fuerte a largo plazo, y la posibilidad de combinar estilo de vida con propiedad de bienes raíces andorrana significativa.",
          "Para personas que están genuinamente emocionadas con la idea de vivir en Andorra o invertir en su mercado de propiedades de alta calidad, esta sigue siendo una oportunidad muy convincente. Y si esa es la dirección que estás explorando, Equity Partners estaría encantada de ayudarte a encontrar la propiedad correcta y estructurar el siguiente paso con confianza.",
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
    date: "Mar 2026",
    excerpt:
      "Qué significan las reglas en 2026, dónde han cambiado los costos y cómo la estructuración más fuerte puede proteger el valor a largo plazo.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "El impuesto ahora es parte de la estrategia de inversión",
        paragraphs: [
          "Andorra sigue siendo uno de los mercados inmobiliarios más atractivos de Europa para inversores internacionalmente orientados. Pero en 2026, el impuesto sobre propiedades ya no puede tratarse como un detalle secundario.",
          "No es porque el mercado se haya vuelto menos convincente. Es porque Andorra se está volviendo más selectiva en cómo el capital extranjero entra en el sector de propiedades. Para inversores, eso significa que el impuesto ahora juega un papel más directo en la estrategia de adquisición, selección de activos y rendimientos a largo plazo.",
        ],
      },
      {
        heading: "El cambio de impuesto clave que los inversores extranjeros necesitan entender",
        paragraphs: [
          "El impuesto más importante para compradores extranjeros es el impuesto sobre inversiones inmobiliarias extranjeras.",
          "Reportes recientes en febrero de 2026 indicaron que la tasa aumentó al 6% en una primera propiedad y al 10% en una segunda propiedad.",
          "Ese es un aumento significativo del marco anterior y confirma la dirección de la política: Andorra aún acoge inversión, pero quiere capital de mayor calidad, mejor alineado y menos especulativo.",
        ],
      },
      {
        heading: "Por qué esto importa en la práctica",
        paragraphs: [
          "Un costo de entrada del 6% en una primera adquisición ya no es solo fricción de fondo. Se convierte en parte de la economía central de la inversión.",
          "Esto tiene varias implicaciones directas: la calidad de activos importa más, la compra de estilo repetido es menos atractiva, la estructuración deficiente se vuelve más costosa, y la convicción a largo plazo importa más que la flexibilidad a corto plazo.",
          "Para inversores, esto significa que Andorra cada vez más recompensa la precisión sobre la escala.",
        ],
      },
      {
        heading: "Quién es tratado como inversor extranjero",
        paragraphs: [
          "Esta es una de las preguntas prácticas más importantes.",
          "El impuesto no se aplica solo a no residentes obvios. Bajo el marco expandido, ciertos residentes también pueden ser tratados como inversores extranjeros si no pueden demostrar el historial de residencia requerido en Andorra.",
          "Eso significa que la clasificación de inversor debe ser revisada antes de que una transacción sea estructurada, no después.",
        ],
      },
      {
        heading: "Por qué el gobierno está haciendo esto",
        paragraphs: [
          "Los cambios de impuesto son parte de un reinicio más amplio de política de vivienda y mercado.",
          "Andorra está usando regulación e impuestos para reducir presión especulativa, proteger acceso a la vivienda y fomentar comportamiento de inversión más duradero y localmente alineado.",
          "Eso no debe leerse solo como una barrera. También puede leerse como una señal de un mercado volviéndose más disciplinado y más resiliente con el tiempo.",
        ],
      },
      {
        heading: "¿Hay aún oportunidades atractivas?",
        paragraphs: [
          "Sí.",
          "Andorra sigue siendo convincente porque combina restricción de oferta, estabilidad política, fuerte atractivo de estilo de vida y un mercado donde el acceso local aún crea ventaja real.",
          "Para el inversor correcto, un impuesto de entrada más alto no elimina oportunidad. Simplemente eleva la importancia de elegir el activo correcto y entrar al mercado de la forma correcta.",
        ],
      },
      {
        heading: "Por qué la ejecución consciente de impuestos importa",
        paragraphs: [
          "Este es el lugar donde la guía local se vuelve especialmente valiosa.",
          "El mercado andorrano ya no es uno donde inversores internacionales deban confiar en suposiciones genéricas o resúmenes amplios en línea. En un ambiente sensible a impuestos, la ventaja real viene de entender cómo el marco de impuestos afecta la adquisición, qué oportunidades aún justifican el costo de entrada y cómo el acceso local puede mejorar la calidad general de inversión.",
          "Equity Partners ayuda a los inversores a abordar el mercado andorrano a través de inteligencia local, entendimiento regulatorio y ejecución disciplinada. En 2026, eso es cada vez más lo que separa una oportunidad visible de una sólida.",
        ],
      },
      {
        heading: "Qué deben llevar los inversores",
        paragraphs: [
          "Los impuestos sobre propiedades de Andorra para inversores extranjeros importan más en 2026 que hace incluso un año.",
          "El mercado es más selectivo, pero también más estructurado. Para inversores que están bien asesorados, enfocados en calidad y serios sobre valor a largo plazo, Andorra aún ofrece oportunidades altamente atractivas.",
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
        label: "Advantia sobre el impuesto a inversión extranjera en bienes raíces",
        href: "https://www.advantia.ad/en/taxation/real-estate-foreign-investment-tax",
      },
      {
        label: "Carlota Pastora sobre la Ley Omnibus del 6 de marzo de 2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
    ],
  },
  {
    slug: "andorra-real-estate-market-2026",
    title: "Mercado inmobiliario de Andorra: Precios, demanda y estadísticas",
    category: "Actualización del mercado",
    date: "Mar 2026",
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
          "Desde el exterior, precios crecientes y reglas más estrictas pueden hacer que el mercado parezca más difícil de acceder. Eso es verdad. Pero no significa que el mercado se esté debilitando. En muchos aspectos, significa lo opuesto. Andorra se está convirtiendo en un ambiente inmobiliario más estructurado, más disciplinado y más orientado a calidad.",
          "Para inversores, eso importa. El mercado ya no se trata solo de crecimiento. Se trata de entender dónde el valor aún se está sosteniendo, quién realmente está comprando, y qué dicen los datos bajo los titulares.",
        ],
      },
      {
        heading: "Los precios aún se están moviendo hacia arriba",
        paragraphs: [
          "Reportes oficiales y locales recientes sugieren que los precios permanecen firmes.",
          "Los datos reportados en febrero de 2026 mostraron que el precio promedio de apartamentos en 2025 subió un 10,5% a alrededor de 4.479 euros por metro cuadrado. Reportes anteriores de noviembre de 2025 ya habían mostrado precios promedio de apartamentos cerca de 4.440 euros por metro cuadrado en el tercer trimestre.",
          "Eso nos dice algo importante: el crecimiento de precios no es solo un pico a corto plazo. Refleja un mercado donde la oferta permanece restringida y el stock de alta calidad continúa atrayendo atención.",
        ],
      },
      {
        heading: "Los residentes aún dominan el mercado",
        paragraphs: [
          "Una de las señales más importantes en los datos de 2025 es que el 75,1% de las adquisiciones inmobiliarias fueron realizadas por residentes.",
          "Ese es un número muy importante. Significa que Andorra no está siendo simplemente impulsada por capital extranjero. La demanda de residentes permanece estructuralmente central para el mercado, lo que apoya la resiliencia a largo plazo.",
          "Para inversores, eso es alentador. Muestra que Andorra aún tiene fortaleza de demanda interna incluso mientras la atención internacional continúa aumentando.",
        ],
      },
      {
        heading: "La actividad de transacción ha sido fuerte",
        paragraphs: [
          "El mercado fue altamente activo en 2025.",
          "Reportes recientes indicaron que el conteo de transacciones se elevó más del 35%, el valor total de transacciones se elevó aproximadamente un 34% y el valor total del mercado alcanzó aproximadamente 1.398 mil millones de euros.",
          "Al mismo tiempo, las adquisiciones extranjeras también se elevaron fuertemente. Pero ese aumento debe ser interpretado cuidadosamente. Parcialmente refleja el rebote después del período de moratoria anterior, que había distorsionado temporalmente la línea base.",
        ],
      },
      {
        heading: "El crecimiento de hipotecas confirma demanda subyacente real",
        paragraphs: [
          "Otra señal útil vino del mercado de hipotecas.",
          "Los datos reportados en marzo de 2026 mostraron que las hipotecas residenciales en 2025 se elevaron aproximadamente un 40% año tras año, con volumen total de hipotecas excediendo 385 millones de euros.",
          "Eso importa porque la actividad de hipotecas es uno de los indicadores más claros de participación real de compradores. Sugiere que la demanda no es solo teórica y no es puramente especulativa.",
        ],
      },
      {
        heading: "Qué significa esto para los inversores",
        paragraphs: [
          "Para inversores, el verdadero aprendizaje es que Andorra permanece atractiva, pero ya no es un mercado casual.",
          "Las oportunidades más fuertes son probables que se encuentren donde varias cosas se unen: oferta restringida, demanda local real, producto de alta calidad, encaje regulatorio claro y ejecución local fuerte.",
          "Este no es un mercado donde la exposición amplia es necesariamente la movida más inteligente. Es un mercado donde la exposición mejor seleccionada es probable que tenga mejor rendimiento.",
        ],
      },
      {
        heading: "Por qué esta es aún una historia positiva",
        paragraphs: [
          "La historia del mercado de Andorra en 2026 no se trata de acceso fácil. Se trata de durabilidad.",
          "Los precios permanecen fuertes. Los residentes permanecen activos. El volumen de hipotecas ha aumentado. La participación extranjera existe, pero ya no es la única historia. Y el ambiente de política está empujando el mercado hacia mayor disciplina más que especulación más flexible.",
          "Para inversores serios, eso puede ser una combinación muy positiva.",
        ],
      },
      {
        heading: "Por qué la lectura local del mercado crea una ventaja",
        paragraphs: [
          "Este es el lugar donde el conocimiento local se convierte en una ventaja real.",
          "Equity Partners ayuda a los inversores a interpretar el mercado andorrano a través del acceso local, conciencia regulatoria y relaciones de confianza en el terreno. En un mercado donde calidad y escasez importan tanto como el crecimiento de titular, esa perspectiva es cada vez más importante.",
          "Para inversores mirando Andorra en 2026, el objetivo no debe ser solo seguir impulso. Debe ser entender dónde el mercado es más fuerte y dónde el valor a largo plazo es más probable que se sostenga.",
        ],
      },
      {
        heading: "Cómo los inversores deben leer el mercado ahora",
        paragraphs: [
          "El mercado inmobiliario de Andorra en 2026 es activo, caro, oferta-restringido y aún altamente convincente.",
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
    date: "Mar 2026",
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
          "Eso es parcialmente porque el país es pequeño, la oferta es restringida, y cada parroquia se comporta diferente. Un comprador mirando Ordino no está entrando al mismo mercado que alguien enfocado en Encamp o Andorra la Vella. Los precios, el perfil de comprador, la escasez y el caso de uso a largo plazo pueden todos cambiar significativamente de un área a otra.",
          "Para inversores, eso es buena noticia. Significa que Andorra no es un mercado unidimensional. La oportunidad reside en entender qué ubicaciones mejor se alinean con el objetivo detrás del capital.",
        ],
      },
      {
        heading: "Ordino: Prestigio, escasez y calidad a largo plazo",
        paragraphs: [
          "Ordino continúa destacando como una de las ubicaciones residenciales más premium en el país.",
          "Reportes recientes del mercado en 2025 mostraron precios de venta promedio en Ordino excediendo 1,5 millones de euros, y datos posteriores empujaron ese promedio más allá de 1,6 millones de euros. Eso la convierte en uno de los mercados de extremo superior más claros en Andorra.",
          "Ordino a menudo se trata menos de volumen a corto plazo y más sobre calidad residencial duradera. Para compradores que buscan una base andorrana de primer nivel o un activo de tenencia larga en uno de los escenarios más deseables del país, sigue siendo una de las ubicaciones más fuertes en el mercado.",
        ],
      },
      {
        heading: "Escaldes-Engordany: Demanda premium con profundidad urbana real",
        paragraphs: [
          "Escaldes permanece como uno de los mercados de propiedades más importantes en Andorra, particularmente para compradores que desean centralidad, conveniencia y posicionamiento premium.",
          "Reportes recientes mostraron valores de venta promedio en Escaldes por encima de 1 millón de euros, con niveles de alquiler también entre los más altos en el país. La actividad de hipotecas en 2025 también se elevó fuertemente en la parroquia, lo que sugiere demanda subyacente real, no solo inflación de listados.",
          "Escaldes es uno de los ejemplos más claros de una parroquia donde liquidez y prestigio pueden coexistir. Ofrece una forma más urbana de escasez que Ordino, pero no es menos relevante.",
        ],
      },
      {
        heading: "Andorra la Vella: Central, establecida y altamente práctica",
        paragraphs: [
          "La capital permanece como uno de los puntos de referencia más importantes en el mercado.",
          "Los niveles de pregunta promedio en 2025 fueron reportados alrededor de 650.000 euros a principios de año, con reportes posteriores del mercado colocando valores de venta promedio más cerca de 850.000 euros. Los valores de alquiler también están entre los más altos en el país.",
          "Andorra la Vella puede no llevar el mismo aura de lujo que las partes más altas de Ordino o Escaldes, pero tiene algo más: practicidad. Para muchos inversores, eso la convierte en uno de los mercados más confiables en el Principado.",
        ],
      },
      {
        heading: "Encamp: Entrada más accesible, perfil de valor diferente",
        paragraphs: [
          "Encamp permanece como una de las formas más asequibles para entrar al mercado andorrano.",
          "Reportes recientes colocaron valores de venta promedio por debajo de la mayoría del país, con cifras por debajo de 390.000 euros a principios de 2025 y alrededor de 473.000 euros en reportes posteriores de 2025. Los precios de alquiler también permanecen mucho más bajos que en el valle central.",
          "Encamp no es el mismo tipo de juego que Ordino o Escaldes. Pero ese es exactamente el punto. Para algunos inversores, una parroquia más accesible con espacio para alza selectiva puede ser más atractiva que perseguir el código postal más caro.",
        ],
      },
      {
        heading: "Canillo: Adyacencia de turismo y señales de precio por metro",
        paragraphs: [
          "Canillo es interesante porque a menudo se comporta diferente del resto del mercado.",
          "Aunque no siempre es el líder en precio de compra de titular promedio, ha mostrado métricas muy fuertes de precio por metro cuadrado y alquiler en reportes locales recientes. Eso sugiere escasez a nivel de unidad y demanda fuerte en bolsas específicas, especialmente donde acceso a esquí y montaña juegan un papel.",
          "Canillo es un mercado más especializado. Se trata menos de profundidad residencial amplia y más sobre el producto correcto en el lugar correcto.",
        ],
      },
      {
        heading: "Qué dicen los datos sobre el mercado más amplio",
        paragraphs: [
          "El telón de fondo del mercado más amplio apoya la idea de que Andorra permanece activa y selectiva al mismo tiempo.",
          "Reportes recientes indicaron que los precios promedio de apartamentos en 2025 subieron a alrededor de 4.479 euros por metro cuadrado, el 75,1% de las transacciones inmobiliarias de 2025 fueron realizadas por residentes, la actividad de hipotecas residenciales en 2025 se elevó aproximadamente un 40%, y el valor total de transacciones alcanzó aproximadamente 1.398 mil millones de euros.",
          "Estas son señales importantes. Muestran un mercado que es caro, oferta-restringido y aún apoyado por actividad de comprador real significativa.",
        ],
      },
      {
        heading: "Entonces, ¿dónde deben enfocarse los inversores?",
        paragraphs: [
          "Eso depende del objetivo.",
          "Por eso la selección de parroquia en Andorra nunca debe ser genérica. El mismo mercado nacional puede ofrecer historias de inversión muy diferentes dependiendo de dónde entres.",
        ],
        table: {
          headers: ["Objetivo de inversor", "Áreas de mejor ajuste", "Perfil de inversión"],
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
          "Los resultados más fuertes son cada vez más ligados a calidad de micro-ubicación, dinámicas de oferta, perfil de comprador y la capacidad de distinguir stock visible de oportunidad real. Ese es el lugar donde la lectura local crea una ventaja.",
          "Equity Partners ayuda a los inversores a interpretar el mercado andorrano a través del acceso local, conciencia regulatoria y relaciones confiables en el terreno. En un mercado pequeño y de alto nivel de barrera, entender dónde invertir a menudo es tan importante como decidir si invertir.",
        ],
      },
      {
        heading: "Qué áreas merecen la atención más cercana ahora",
        paragraphs: [
          "Andorra continúa ofreciendo oportunidades inmobiliarias convincentes, pero la selección de parroquia es ahora una de las decisiones estratégicas más importantes que un inversor puede hacer.",
          "Para inversores que buscan prestigio y escasez, Ordino y Escaldes permanecen especialmente fuertes. Para aquellos que buscan practicidad y resiliencia urbana, Andorra la Vella merece atención. Para compradores que priorizan puntos de entrada más bajos o posicionamiento más especializado, Encamp y Canillo pueden ser altamente relevantes.",
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
