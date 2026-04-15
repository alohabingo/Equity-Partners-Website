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
    title: "Poden els estrangers comprar propietats a Andorra avui?",
    category: "Regulació",
    date: "Mar 2026",
    excerpt:
      "Una guia pràctica per a inversors sobre les noves regles d'adquisició d'Andorra post-2025, què poden comprar ancora els estrangers i on hi ha oportunitats reals.",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Sí, però el mercat ja no és tan obert",
        paragraphs: [
          "Els estrangers pot comprar propietats a Andorra el 2026, però el mercat ja no és tan accessible, flexible o simple com molts llocs d'internet suggereixen. Des del cicle de reformes de 2025, Andorra ha entrat en una fase més selectiva on el capital estranger és benvingut, però ara opera dins un marc jurídic i estratègic més rigurós.",
          "Per als inversors, això canvia la pregunta real. Ja no és simplement si pots comprar. És quina pots comprar, com pots estructurar-la, i si l'oportunitat té sentit sota les noves regles.",
          "Per a nosaltres, aquest és el canvi clau: Andorra ja no hauria de veure's com un mercat de propietats d'accés fàcil i eficiència fiscal. Ara és una jurisdicció d'alt nivell de barrera on l'accés local, el cumpliment normatiu i la qualitat d'execució importa molt més que abans.",
        ],
      },
      {
        heading: "Què ha canviat després del restabliment regulatori de 2025",
        paragraphs: [
          "El punt d'inflexió principal va ser la Llei 5/2025, aprovada el 6 de març de 2025 i aplicada des d'abril de 2025. La reforma va ser dissenyada per reduir la pressió especulativa, protegir l'accés local a l'habitatge i endurir com funciona la inversió immobiliària estrangera en la pràctica.",
          "Això importa perquè molts articles internacionals sobre propietats a Andorra van ser escrits abans d'aquests canvis. Un comprador que confia en guies obsoletes pot malinterpretar fàcilment la seva posició real.",
          "Aquesta és una de les majors bretxes del mercat. Una gran part del contingut en anglès sobre comprar propietats a Andorra va ser escrit abans de les reformes de 2025 o segueix repetint una versió anterior de la història del mercat: impostos baixos, sense fricció important, demanda creixent, jurisdicció de muntanya atractiva, compra de propietat directa.",
          "Aquesta narrativa ara és incompleta, en el millor dels casos.",
        ],
      },
      {
        heading: "Què pot comprar ancora els inversors estrangers",
        paragraphs: [
          "Els compradors estrangers pot adquirir propietats a Andorra, però bajo límits més estrets que abans. En termes generals, el marc ara es centra en una única casa unifamiliar o terreny per a una, fins a dues unitats residencials en certs casos, i actius auxiliars limitats com aparcament.",
          "Això pot funcionar bé per a inversors seleccionats, però clarament allunyà el mercat de l'acumulació residencial ampla i repetida.",
          "Per als inversors acostumats a més flexibilitat, això pot semblar inicialment restrictiu. En realitat, canvia el joc de l'acumulació a la precisió.",
          "Els millors resultats ara són més probables que vinguin d'actius curosament elegits, tenències a llarg termini i adquisicions estructurades amb execució local disciplinada des del primer dia.",
        ],
      },
      {
        heading: "Per què les millors oportunitats pertanyen ara al capital disciplinat",
        paragraphs: [
          "El major error que un inversor estranger pot cometre a Andorra avui és assumir que encara possible significa ancora simple. L'estatus d'inversor, el tracte fiscal, els límits d'adquisició i el cas d'ús ara importa molt més que abans. Algunes estratègies encara funcionen molt bé. Altres són molt menys atractives, o ja no són viables de la forma que molts compradors estrangers esperen.",
          "Per això l'estructuració local s'ha convertit en part del rendiment de la inversió. A Andorra avui, la qualitat d'execució no és només operacional. És estratègica.",
          "L'oportunitat a Andorra no ha desaparegut. S'ha tornat més selectiva. Això significa que els millors resultats ara són més probables que vinguin d'actius curosament elegits, tenències a llarg termini en lloc d'especulació, relacions locals fortes i planificació jurídica i d'execució disciplinada des del primer dia.",
          "En altres paraules, Andorra ara recompensa la precisió més que l'escala.",
        ],
      },
      {
        heading: "Per què el consell antic d'internet és ara perillós",
        paragraphs: [
          "Un comprador que confía en material obsolet pot malinterpretar si qualifica com a inversor estranger, quantes unitats pot adquirir legalment, si una estratègia de desenvolupament és ancora permesa, com s'apliquen ara els impostos d'inversió estrangera, o si una estratègia vinculada a residència ancora funciona de la forma que una vegada ho va fer.",
          "Aquesta és exactament la raó per la qual el consell d'execució local i actual s'ha tornat més valuós que el contingut internacional general. El mercat andorrà ja no és un on una orientació general sobre estil de vida sigui suficient. Els detalls jurídics i estratègics ara canvien els resultats.",
        ],
      },
      {
        heading: "Què ens diu el mercat",
        paragraphs: [
          "Les dades recents del mercat de 2025 reportades a principis de 2026 van mostrar que la majoria de les transaccions van ser realitzades per residents. Això és important. Confirma que Andorra no és només una història de demanda estrangera. La participació domèstica segueix sent central al mercat, i això suporta la direcció política més restrictiva del govern.",
          "Per als inversors, això fa que Andorra sigui més interessant, no menys. Un mercat selectiu amb profunditat local real és sovint més resilient que un impulsat només per momentum internacional.",
        ],
      },
      {
        heading: "Què significa això per als compradors estrangers",
        paragraphs: [
          "Llavors, els estrangers poden comprar propietats a Andorra el 2026? Sí.",
          "Però Andorra ja no és un mercat per a suposicions passives o estratègies obsoletes. L'oportunitat segueix sent sòlida per als inversors que entenen el nou marc i abordan el mercat amb la guia local correcta.",
          "Aquí és on rau la veritable vantatge ara: no en perseguir accés fàcil, sinó en entrar al mercat correctament.",
        ],
      },
    ],
    sources: [
      {
        label: "Carlota Pastora sobre la Llei 5/2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "Advantia sobre canvis en inversió immobiliària estrangera",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Advantia sobre canvis de residència i impostos de 2025",
        href: "https://www.advantia.ad/en/economy/tax-changes-residence-andorra",
      },
      {
        label: "SER Andorra reportant dades oficials de transaccions de 2025",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
    ],
  },
  {
    slug: "andorra-real-estate-investment-2026-serious-investors",
    title: "Inversió immobiliària a Andorra el 2026: Guia per als inversors",
    category: "Actualització del mercat",
    date: "Mar 2026",
    excerpt:
      "Una guia actual per als inversors sobre béns immobles a Andorra el 2026: regulació, preus, restriccions d'inversió estrangera i on el capital disciplinat pot trobar ancora oportunitats.",
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min de lectura",
    sections: [
      {
        heading: "Un mercat més selectiu està enfortint el cas d'inversió",
        paragraphs: [
          "La història de béns immobles andorrana el 2026 ja no es defineix per obertura. Es defineix per escassetat, selectivitat i el valor creixent de l'execució local.",
          "Precisament per això el mercat segueix meritant l'atenció seriosa dels inversors. Durant molt temps, Andorra va ser descrita en termes massa simples: eficiència fiscal, estabilitat política, estil de vida de muntanya i demanda internacional creixent. Aquests elements encara importan, però ja no expliquen el cas d'inversió complet.",
          "Avui, Andorra s'entén millor com un mercat immobiliaris europeu d'alt nivell de barrera. L'accés és més estret. La regulació és més estricta. La coordinació local té més pes. I els inversors millor posicionats per a desempenhar-se bé ja no són aquells que busquen ampla flexibilitat, sinó aquells que entren amb estructuració més aguda, alineació local més forta i una visió més llarga del valor.",
          "Aquest canvi no ha debilitat el mercat. En molts aspectes, l'ha fet més invertible per al capital disciplinat.",
        ],
      },
      {
        heading: "Què ha canviat per als inversors",
        paragraphs: [
          "La narrativa d'inversió antiga es centrava en entrada simple al mercat. L'actual tracta de l'accés qualified.",
          "Avui, inversors serios necessiten entendre tres canvis estructurals. Primer, la inversió immobiliària estrangera és més restringida. El mercat ja no està obert al tipus d'acumulació residencial ampla que molts compradors internacionals una vegada van assumir que era possible. Les adquisicions ara estan subjectes a límits més clars, i certes estratègies especulatives o vinculades al turisme han estat materialment constreñides.",
          "Segon, l'estructura fiscal i regulatòria importa més per als retorns. En mercats amb més flexibilitat, l'estructuració deficient pot ser ineficient però viable. A Andorra avui, l'estructuració deficient pot alterar tota l'economia d'una transacció.",
          "Tercer, l'execució local s'ha convertit en part de la tesi d'inversió. En una jurisdicció més petita, on aprovacions, contraparts i accés al mercat són sensibles a relacions, la qualitat de la coordinació local pot tenir més impacte que l'optimització de fulls de càlcul.",
          "Per això les millors oportunitats d'Andorra el 2026 no són necessàriament les més visibles. A menys sovint són aquelles que combinen producte escàs, estructura cumplida i lliurament local creïble.",
        ],
      },
      {
        heading: "Què diuen les dades sobre el mercat ara",
        paragraphs: [
          "Els números recents confirmen que Andorra segueix sent activa, però també mostren un mercat format per residents, escassetat i normalització post-reforma més que purament per demanda estrangera.",
          "L'informe sobre dades oficials del mercat de 2025 publicat el 9 de febrer de 2026 va indicar que el 75,1% de les transaccions immobiliàries de 2025 van ser realitzades per residents, el valor total de transaccions va arribar aproximadament a 1.398 mil milions d'euros, el preu mitjà d'apartaments va pujar a al voltant de 4.479 euros per metre quadrat, i les compres estrangeres van augmentar fuertament, però en part des de la base distorsionada creada pel període de moratòria anterior.",
          "Informes addicionals del 6 de novembre de 2025 van indicar que els preus dels apartaments ja havien arribat aproximadament 4.500 euros per metre quadrat al tercer trimestre, reforçant la perspectiva que la pressió de preus segueix sent estructuralment real en lloc d'anecdòtica.",
          "Més recentment, dades reportades el 16 de març de 2026 van mostrar que les hipoteques residencials el 2025 s'havien incrementat aproximadament un 40% any a any, amb més de 385 milions d'euros en volum de hipoteques residencials. Això importa perquè suggereix que l'activitat de compradors locals segueix sent forta fins i tot mentre el mercat es torna més car i més regulat.",
          "Per als inversors, això és important. Andorra no és simplement una història de capital estranger. La demanda domèstica ancora importa. Això tendeix a suportar la resiliència.",
        ],
      },
      {
        heading: "Per què els inversors segueixen interessats",
        paragraphs: [
          "Malgrat regles més estrictes, Andorra manté atraccions clares per al capital sofisticat. L'escassetat suporta el valor a llarg termini en una jurisdicció de subministrament limitat on la terra és limitada, la planificació és sensible i la qualitat del producte importa.",
          "La base de compradors també és més profunda del que els forasters sovint assumeixen. El mercat està suportat no només per interès estranger, sinó per residents, negocis locals i capital familiar establert. Això importa per a la liquiditat i la resiliència.",
          "L'endureciment regulatori pot enfortir el mercat amb el temps desestimulant capital de menor convicció i preservant millor alineació entre oferta, preus i tolerància social.",
          "L'accés és més difícil, el que augmenta el valor de la vantatge local. Quan un mercat es torna més selectiu, la asimetria d'informació creix. Això beneficia els inversors que treballen a través de xarxes locals reals en lloc de listats genèrics i narratives de mercat generalitzades.",
        ],
      },
      {
        heading: "On persiseix ancora l'oportunitat",
        paragraphs: [
          "L'oportunitat real a Andorra el 2026 no està en perseguir l'exposició més ampla possible. Està en identificar on la selectivitat crea valor.",
          "En la nostra opinió, les millors oportunitats romanen concentrades en quatre àrees: residencial de primer ordre amb veritable escassetat, desenvolupament llest per a execució, estratègies de tenència a llarg termini i oportunitats originades localment on la qualitat d'accés importa més que la visibilitat del mercat públic.",
          "Els actius residencials ben posicionats en micro-ubicacions constreñides continuen tenint atractiu per als inversors, especialment on la qualitat i la disciplina de subministrament són òbvies. Els projectes amb rutes de planificació realistes, alineació de socis creïble i lògica de desenvolupament neta són cada vegada més favorits sobre posicions conceptuals o especulatives.",
          "A mesura que la fricció de transacció augmenta, la lògica d'inversió de llarga durada es torna més convincent. Els inversors que entren a Andorra haurien de pensar cada vegada més en termes de valor durador, no només en arbitratge de cicle curt.",
        ],
      },
      {
        heading: "Què haurien d'evitar els inversors serios",
        paragraphs: [
          "Andorra seguix sent atractiva, però és menys indulgent. Els majors errors el 2026 són generalment estratègics en lloc de legals.",
          "Els inversors malinterpreten el mercat quan assumeixen que la vella guia de comprador estranger ancora s'aplica, sobrestimen com és escalable l'adquisició residencial, subestimen les transaccions sense prou consideració d'estructura fiscal i cumpliment, tracten l'execució local com un detall operacional en lloc d'una variable d'inversió central, o confonen disponibilitat amb qualitat.",
          "Aquell últim punt importa. En una jurisdicció selectiva, l'inventari visible no sempre és el millor inventari. Les millors oportunitats sovint emergeixen on confiança, temps i credibilitat local s'interseccionen.",
        ],
      },
      {
        heading: "Per què la perspectiva local importa més que mai",
        paragraphs: [
          "En un mercat més flexible, el capital sol pot fer més de la feina. A Andorra avui, això ja no és veritat. Els inversors necessiten millor intel·ligència del mercat, conectivitat local més forta, estructuració disciplinada i supervisió de lliurament creïble.",
          "Aquell és el buit que Equity Partners està construït per a abordar. El nostre valor no és simplement que coneixem el mercat. És que ajudem els inversors a entrar correctament: amb perspectiva local, coordinació de contraparts més forta i una línia més clara entre intenció estratègica i execució en el terreny.",
        ],
      },
      {
        heading: "Per què Andorra ancora mereix l'atenció dels inversors",
        paragraphs: [
          "Andorra romàn com un dels mercats immobiliaris de nix més convincents a Europa per a capital seriós. Però ja no és un mercat per a suposicions passives, optimisme ampliat de compradors estrangers o narratives de paraís fiscal reciclades.",
          "La història d'inversió d'Andorra el 2026 és més forta que això. És una història sobre accés selectiu, oferta restringida, participació domèstica resilient, sofisticació regulatòria creixent i el valor creixent de l'execució local disciplinada.",
          "Per als inversors que entenen aquell canvi, Andorra ancora ofereix oportunitat real. Però la vantatge ara pertany a aquells que tracten el mercat tal com és avui, no tal com va ser descrit ahir.",
        ],
      },
    ],
    sources: [
      {
        label: "Advantia sobre canvis d'inversió de propietat estrangera",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Carlota Pastora sobre la Llei Omnibus del 6 de març de 2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "SER Andorra sobre transaccions immobiliàries de 2025, 9 de febrer de 2026",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre preu per metre quadrat d'apartaments, 6 de novembre de 2025",
        href: "https://cadenaser.com/andorra/2025/11/06/el-preu-mitja-del-metre-quadrat-en-un-pis-de-venda-frega-els-4500-euros-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre impost actualitzat d'inversió immobiliària estrangera, 26 de febrer de 2026",
        href: "https://cadenaser.com/andorra/2026/02/26/el-govern-actualitza-fins-al-6-la-taxa-sobre-la-inversio-estrangera-immobiliaria-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre hipoteques residencials, 16 de març de 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
    ],
  },
  {
    slug: "andorra-passive-residency",
    title: "Residència passiva a Andorra: una residència per inversió",
    category: "Regulació",
    date: "Mar 2026",
    excerpt:
      "Què es necessita per qualificar el 2026, per què el marc està canviant, i per què Andorra seguix sent un lloc tan atractiu per viure i invertir.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Una ruta més selectiva cap a una de les jurisdiccions més atractives d'Europa",
        paragraphs: [
          "Andorra continua destacant com una de les jurisdiccions més atractives d'Europa per als inversors, famílies i emprenedors internacionals que desitgen estabilitat, qualitat de vida i una base més forta a llarg termini a Europa.",
          "El 2026, la residència passiva a Andorra seguix sent molt disponible. Però el marc està evolucionant. El país està elevant l'estàndard, no per a fer la residència menys atractiva, sinó per a fer-la més selectiva, més sostenible i més clarament alineada amb persones que desitgen una connexió genuïna amb el Principat.",
          "Això és el que fa que la ruta de residència passiva d'Andorra sigui tan interessant avui. Ja no es tracta simplement de complir un umbral. Es tracta de demostrar compromís amb un país que ofereix excepcional qualitat de vida, estabilitat política i béns immobles cada vegada més valuosos.",
        ],
      },
      {
        heading: "Què és la residència passiva d'Andorra",
        paragraphs: [
          "La residència passiva, o residència sense activitat lucrativa, està dissenyada per a individus que desitgen viure a Andorra sense assumir ocupació local en el sentit tradicional.",
          "És particularment rellevant per als inversors, emprenedors amb ingressos internacionals, posseïdors de riquesa privada, famílies que buscan una base europea segura i d'alta qualitat, i individus que combinen objectius d'estil de vida amb planificació fiscal i d'actius a llarg termini.",
          "En termes pràctics, permet que et converteixis en resident d'Andorra mentre construeixes la teva vida al voltant del país, sempre que compleixes els requisits financers i d'inversió.",
        ],
      },
      {
        heading: "Què es requereix per qualificar el 2026",
        paragraphs: [
          "El marc de 2026 és més exigent que en anys anteriors. És important entendre-ho des del principi.",
          "D'acord amb resums legals recents de 2026, la residència passiva generalment ara requereix una inversió qualificadora mínima en actius andorrans de 1.000.000 d'euros, mentre que si la inversió es realitza en béns immobles, cada unitat ha d'excedir 800.000 euros.",
          "El pagament de l'AFA del sol·licitant principal és de 50.000 euros, amb 12.000 euros addicionals per cada dependent. También hay una expectativa de residència efectiva a Andorra durant l'any.",
        ],
      },
      {
        heading: "Com estan canviant els requisits",
        paragraphs: [
          "Aquí és on molts lectors queden atrapats per informació obsoleta en línia. El marc de residència d'Andorra no va canviar només una vegada. Va canviar en etapes.",
          "El 2025, l'umbral mínim de béns immobles ja havia augmentat, les inversions elegibles es van tornar més estretes i el requisit de l'AFA va augmentar. El 2026, l'umbral de inversió qualificadora més ample sembla haver augmentat més a 1.000.000 d'euros, mentre que si la inversió es realitza a través de propietat, cada unitat ha d'excedir 800.000 euros.",
          "Això reflecteix una tendència més gran: Andorra es mou cap a un model de residència construït al voltant de qualitat, compromís i substància econòmica. Això no ha de veure's negativament. De moltes maneres, reforça l'atractiu a llarg termini del país.",
        ],
      },
      {
        heading: "Per què Andorra seguix sent tan atractiva",
        paragraphs: [
          "Fins i tot amb umbral més alts, la proposició romàn convincent. Andorra ofereix una rara combinació d'estabilitat política, seguretat personal, qualitat de vida forta, bellesa natural, un perfil de negocis i riquesa internacional, i un ambient europeu compacte i d'alt funcionament.",
          "Per a moltes persones, l'atractiu va més allà de la planificació fiscal. Es tracta de viure en un lloc que sembli segur, net, eficient i cada vegada més exclusiu.",
          "Aquella exclusivitat importa también en béns immobles. Andorra és una pequeña jurisdicció amb subministrament restringit i fuert valor específic de ubicació. Això significa que la propietat de residència i béns immobles pot funcionar junts de una forma molt atractiva quan està ben estructurada.",
        ],
      },
      {
        heading: "Quin paper juguen els béns immobles",
        paragraphs: [
          "Per a molts sol·licitants, els béns immobles romanen una de les formes més atractives de crear una connexió real amb Andorra. La propietat pot servir dos propòsits alhora: suportar una estratègia de residència i crear valor personal o d'inversió a llarg termini al Principat.",
          "Això pot significar adquirir una casa per viure, assegurar una base familiar d'alta qualitat, invertir en una propietat andorrana de primer ordre amb convicció a llarg termini, o entrar al mercat a través d'un actiu que genuïnament voldries posseir.",
          "Aquí és on la estratègia importa. Una estructura de residència passiva no hauria de estar construïda al voltant de l'actiu calificador més barat possible. L'enfocament més forta és elegir béns immobles que tenguin sentit tant per a residència com per a valor a llarg termini.",
        ],
      },
      {
        heading: "Per què la guia local importa més ara",
        paragraphs: [
          "A mesura que les regles es tornen més selectivas, la qualitat del teu aconsellament local es torna més important.",
          "Les preguntes correctes ja no són simplement si califiques, quin és l'umbral o quina documentació necessites. Les millors preguntes són quin tipus d'actiu andorrà té sentit per a tu, si comprar per a ús personal o inversió o tots dos, com han d'alinear-se les decisions de residència, impost i béns immobles, i quines oportunitats realment mereixen ser perseguides.",
          "En un mercat com Andorra, on regulació, accés i qualitat de propietat són tots profundament locals, aquella diferència importa.",
        ],
      },
      {
        heading: "Per què aquesta és ancora una història positiva",
        paragraphs: [
          "Seria fàcil veure els umbral creixents i concloure que el procés es torna menys atractiu. En la nostra opinió, aquella seria la lectura incorrecta.",
          "El que Andorra està fent és refinar el seu model. El país està deixant clar que la residència passiva és per a persones que desitgen una relació significativa amb el Principat. Això crea un ambient més forta a llarg termini per a residents, inversors, propietaris i el mercat en general.",
          "Per al sol·licitant correcta, això fa l'oportunitat més convincent, no menys.",
        ],
      },
      {
        heading: "Com ajuda Equity Partners als compradors de residència",
        paragraphs: [
          "Equity Partners ajuda els inversors a accedir a les oportunitats de béns immobles més convincents d'Andorra a través de relacions locals confiables, perspectiva regulatòria i execució disciplinada.",
          "Per a un lector considerant residència passiva, això significa que podem ajudar a connectar l'objectiu de residència amb l'estratègia de béns immobles correcta, ja sigui que l'objectiu sigui adquirir una casa a Andorra, construir una base familiar a llarg termini o assegurar una inversió de propietat d'alta qualitat en un dels mercats més atractius del Principat.",
          "La residència passiva no és només una decisió d'immigració. También és una decisió d'assignació de capital. I a Andorra, aquestes dues han de ser abordades juntes.",
        ],
      },
      {
        heading: "Per què la residència passiva seguix sent atractiva",
        paragraphs: [
          "La residència passiva d'Andorra el 2026 és més selectiva que antes, però seguix sent una ruta excepcional per al inversor o família correcta.",
          "Els requisits són més alts. El marc és més seriós. Però els beneficis seguixen sent molt reals: accés a una de les jurisdiccions més atractives d'Europa, una base de residència més forta a llarg termini, i la possibilitat de combinar estil de vida amb possessió de béns immobles andorrana significativa.",
          "Per a persones que estan genuïnament emocionades amb l'idea de viure a Andorra o invertir en el seu mercat de propietats d'alta qualitat, aquesta seguix sent una oportunitat molt convincent. I si aquella és la direcció que estàs explorant, Equity Partners estaria encantada d'ajudar-te a trobar la propietat correcta i estructurar el següent pas amb confiança.",
        ],
      },
    ],
    sources: [
      {
        label: "Resumen de canvis de la Llei 2/2026",
        href: "https://carlotapastora.com/en/law-2-2026-andorra-changes-immigration-investment-taxation/",
      },
      {
        label: "Resumen de la Llei 5/2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "Advantia sobre noves condicions de residència",
        href: "https://www.advantia.ad/en/living-in-andorra/new-conditions-residence-andorra",
      },
      {
        label: "Antecedents de residència passiva d'Advantia",
        href: "https://www.advantia.ad/en/living-in-andorra/passive-resident-andorra",
      },
      {
        label: "Actualització de residència de WIT",
        href: "https://wit.ad/en/new-conditions-for-residing-in-andorra-in-2025/",
      },
    ],
  },
  {
    slug: "andorra-property-tax-for-foreign-investors",
    title: "Impostos sobre propietats d'Andorra per a inversors estrangers",
    category: "Impostos",
    date: "Mar 2026",
    excerpt:
      "Què significa les regles el 2026, on els costos han canviat, i com la estructuració més forta pot protegir el valor a llarg termini.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "L'impost ara és part de l'estratègia d'inversió",
        paragraphs: [
          "Andorra seguix sent un dels mercats immobiliaris més atractius d'Europa per als inversors orientats internacionalment. Però el 2026, l'impost sobre propietats ja no pot ser tractat com a detall secundari.",
          "No és perquè el mercat s'hagi tornat menys convincent. És perquè Andorra s'està tornant més selectiva en com el capital estranger entra en el sector de propietats. Per als inversors, això significa que l'impost ara juga un paper més directa en l'estratègia d'adquisició, selecció d'actius i retorns a llarg termini.",
        ],
      },
      {
        heading: "El canvi clau d'impost que els inversors estrangers necessiten entendre",
        paragraphs: [
          "L'impost més important per als compradors estrangers és l'impost sobre inversions immobiliàries estrangeres.",
          "Reportes recents de febrer de 2026 van indicar que la taxa va augmentar al 6% en una primera propietat i al 10% en una segona propietat.",
          "Aquell és un augment significativa del marc anterior i confirma la direcció de la política: Andorra ancora acull inversió, però vol capital de major qualitat, millor alineat i menys especulatiu.",
        ],
      },
      {
        heading: "Per què això importa en la pràctica",
        paragraphs: [
          "Un cost d'entrada del 6% en una primera adquisició ya no és simplement fricció de fons. Es converteix en part de l'economia central de la inversió.",
          "Això té vàries implicacions directes: la qualitat d'actius importa més, la compra d'estil repetit és menys atractiva, l'estructuració deficient es torna més costosa, i la convicció a llarg termini importa més que la flexibilitat a curt termini.",
          "Per als inversors, això significa que Andorra cada vegada més recompensa la precisió sobre l'escala.",
        ],
      },
      {
        heading: "Qui és tractat com a inversor estranger",
        paragraphs: [
          "Aquesta és una de les preguntes pràctiques més importants.",
          "L'impost no s'aplica només a no residents òbvies. Sota el marc expandit, certs residents pot ser tractats com a inversors estrangers si no pot demostrar l'historial de residència requerida a Andorra.",
          "Això significa que la classificació d'inversor ha de ser revisada antes de que una transacció sigui estructurada, no despres.",
        ],
      },
      {
        heading: "Per què el govern està fent això",
        paragraphs: [
          "Els canvis d'impost són part d'un restabliment més ample de política d'habitatge i mercat.",
          "Andorra està usant regulació i impostos per a reduir pressió especulativa, protegir accés a l'habitatge i fomentar comportament d'inversió més durador i localment alineat.",
          "Això no ha de llegir-se només com una barrera. También pot llegir-se com una senyala d'un mercat tornant-se més disciplinat i més resilient amb el temps.",
        ],
      },
      {
        heading: "Hí ha ancora oportunitats atractives?",
        paragraphs: [
          "Sí.",
          "Andorra seguix sent convincent perquè combina restricció de subministrament, estabilitat política, fuert atractiu d'estil de vida i un mercat on l'accés local ancora crea avantatge real.",
          "Per al inversor correcta, un impost d'entrada més alt no elimina oportunitat. Simplement eleva la importància d'elegir l'actiu correcta i entrar al mercat de la forma correcta.",
        ],
      },
      {
        heading: "Per què l'execució conscient d'impostos importa",
        paragraphs: [
          "Aquí és on la guia local es torna especialment valuosa.",
          "El mercat andorrà ya no és un on inversors internacionals hagin de confiar en suposicions genériques o resúmens amples en línia. En un ambient sensible a impostos, l'avantatge real ve d'entendre com el marc d'impostos afecta l'adquisició, quines oportunitats ancora justifiquen el cost d'entrada i com l'accés local pot mejorar la qualitat general d'inversió.",
          "Equity Partners ajuda els inversors a abordar el mercat andorrà a través d'intel·ligència local, enteniment regulatori i execució disciplinada. El 2026, aquell és cada vegada més el que separa una oportunitat visible d'una sòlida.",
        ],
      },
      {
        heading: "Què haurien de portar els inversors",
        paragraphs: [
          "Els impostos sobre propietats d'Andorra per als inversors estrangers importa més el 2026 que fa fins i tot un any.",
          "El mercat és més selectiu, però también més estructurat. Per als inversors que estan ben aconsellats, enfocats en qualitat i serios sobre valor a llarg termini, Andorra ancora ofereix oportunitats altament atractives.",
          "La diferència ara és simple: entrar bé importa més que entrar ràpid.",
        ],
      },
    ],
    sources: [
      {
        label: "SER Andorra sobre l'actualització fiscal del 26 de febrer de 2026",
        href: "https://cadenaser.com/andorra/2026/02/26/el-govern-actualitza-fins-al-6-la-taxa-sobre-la-inversio-estrangera-immobiliaria-radio-ser-principat-d-andorra/",
      },
      {
        label: "Advantia sobre canvis d'inversió immobiliària estrangera",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Advantia sobre l'impost a inversió estrangera en béns immobles",
        href: "https://www.advantia.ad/en/taxation/real-estate-foreign-investment-tax",
      },
      {
        label: "Carlota Pastora sobre la Llei Omnibus del 6 de març de 2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
    ],
  },
  {
    slug: "andorra-real-estate-market-2026",
    title: "Mercat immobiliaris d'Andorra: Preus, demanda i estadístiques",
    category: "Actualització del mercat",
    date: "Mar 2026",
    excerpt:
      "Una lectura pràctica sobre preus, activitat de transaccions i demanda de residents en el mercat immobiliaris en evolució d'Andorra.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min de lectura",
    sections: [
      {
        heading: "Un mercat que s'està tornant més selectiu, no més feble",
        paragraphs: [
          "El mercat immobiliaris andorrà el 2026 s'entén millor a través d'una idea: selectivitat.",
          "Des de l'exterior, preus creixents i regles més estrictes pot fer que el mercat sembli més difícil d'accedir. Això és veritat. Però no significa que el mercat s'està debilitant. En molts aspectes, significa el contrari. Andorra s'està tornant en un ambient immobiliaris més estructurat, més disciplinat i més orientat a qualitat.",
          "Per als inversors, això importa. El mercat ja no tracta només de creixement. Tracta d'entendre on el valor ainda s'està sostenint, qui realment està comprant, i què diuen les dades sota els titulars.",
        ],
      },
      {
        heading: "Els preus ainda s'estén movent cap amunt",
        paragraphs: [
          "Reportes oficial i locals recents suggereixen que els preus romanen ferms.",
          "Les dades reportades el febrer de 2026 van mostrar que el preu promedi d'apartaments el 2025 va pujar un 10,5% a al voltant de 4.479 euros per metre quadrat. Reportes anteriores de novembre de 2025 ja havien mostrat preus promedi d'apartaments a prop de 4.440 euros per metre quadrat en el tercer trimestre.",
          "Aquell ens diu quelcom important: el creixement de preus no és només un pujat a curt termini. Reflecteix un mercat on el subministrament romàn restringit i el stock d'alta qualitat continua atreient atenció.",
        ],
      },
      {
        heading: "Els residents ainda dominen el mercat",
        paragraphs: [
          "Una de les senyals més importants en les dades de 2025 és que el 75,1% de les adquisicions immobiliàries van ser realitzades per residents.",
          "Aquell és un número molt important. Significa que Andorra no està simplement sent impulsada per capital estranger. La demanda de residents romàn estructuralment central al mercat, el que suporta la resiliència a llarg termini.",
          "Per als inversors, aquell és alentador. Mostra que Andorra ainda té força de demanda interna fins i tot mentre l'atenció internacional continua augmentant.",
        ],
      },
      {
        heading: "L'activitat de transacció ha estat forta",
        paragraphs: [
          "El mercat va ser altament activa el 2025.",
          "Reportes recents van indicar que el recompte de transaccions es va elevar més del 35%, el valor total de transaccions es va elevar aproximadament un 34% i el valor total del mercat va arribar aproximadament 1.398 mil milions d'euros.",
          "Al mateix temps, les adquisicions estrangeres también es van elevar fortament. Però aquell augment ha de ser interpretat curosament. Parcialment reflecteix el rebote después del período de moratòria anterior, que había distorsionat temporalment la línia base.",
        ],
      },
      {
        heading: "El creixement de hipoteques confirma demanda subyacent real",
        paragraphs: [
          "Una altra senyala útil va venir del mercat de hipoteques.",
          "Les dades reportades el març de 2026 van mostrar que les hipoteques residencials el 2025 es van elevar aproximadament un 40% any a any, amb volum total de hipoteques excedint 385 milions d'euros.",
          "Això importa perquè l'activitat de hipoteques és una dels indicadors més clars de participació real de compradors. Suggereix que la demanda no és només teòrica i no és purament especulativa.",
        ],
      },
      {
        heading: "Què significa això per als inversors",
        paragraphs: [
          "Per als inversors, l'aprenentatge veritable és que Andorra romàn atractiva, però ya no és un mercat casual.",
          "Les oportunitats més fortes són probables que es trobin on vàries coses s'uneixen: subministrament restringit, demanda local real, producta d'alta qualitat, encaix regulatori clar i execució local forta.",
          "Aquell no és un mercat on l'exposició ampla és necessàriament la movida més intel·ligent. Aquell és un mercat on l'exposició millor seleccionada és probable que tengui millor rendiment.",
        ],
      },
      {
        heading: "Per què aquesta és ainda una història positiva",
        paragraphs: [
          "La història del mercat d'Andorra el 2026 no tracta de accés fàcil. Tracta de durabilitat.",
          "Els preus romanen fortes. Els residents romanen actives. El volum de hipoteques ha augmentat. La participació estrangera existeix, però ya no és l'única història. I l'ambient de política està empenyent el mercat cap a major disciplina més que especulació més flexible.",
          "Per als inversors serios, aquell pot ser una combinació molt positiva.",
        ],
      },
      {
        heading: "Per què la lectura local del mercat crea una avantatge",
        paragraphs: [
          "Aquí és on el coneixement local es converteix en una avantatge real.",
          "Equity Partners ajuda els inversors a interpretar el mercat andorrà a través de l'accés local, consciència regulatòria i relacions confiables en el terreny. En un mercat on qualitat i escassetat importan tant com el creixement de titular, aquella perspectiva és cada vegada més important.",
          "Per als inversors mirant Andorra el 2026, l'objectiu no hauria de ser només seguir momentum. Ha de ser entendre on el mercat és més forta i on el valor a llarg termini és més probable que es sustengui.",
        ],
      },
      {
        heading: "Com els inversors haurien de llegir el mercat ara",
        paragraphs: [
          "El mercat immobiliaris d'Andorra el 2026 és activa, cara, subministrament-restringida i ainda altament convincent.",
          "Però l'oportunitat ya no resideix solo en optimisme amplat. Resideix en llegir el mercat correctament: els preus estan pujant, els residents romanen dominants, l'activitat és forta i la qualitat importa més que mai.",
          "Per als inversors que entenen aquell canvi, Andorra continua oferint una de les històries immobiliàries més interessants a Europa.",
        ],
      },
    ],
    sources: [
      {
        label: "Govern d'Andorra sobre transaccions de 2025, 9 de febrer de 2026",
        href: "https://www.govern.ad/ca/w/la-compra-d-habitatges-al-2025-va-ser-realitzada-majoritariament-per-residents-al-pais",
      },
      {
        label: "SER Andorra sobre dades de transaccions de 2025, 9 de febrer de 2026",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre preu per metre quadrat d'apartaments, 6 de novembre de 2025",
        href: "https://cadenaser.com/andorra/2025/11/06/el-preu-mitja-del-metre-quadrat-en-un-pis-de-venda-frega-els-4500-euros-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre hipoteques residencials, 16 de març de 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre lloguers i preus de venda, 2 d'octubre de 2025",
        href: "https://cadenaser.com/andorra/2025/10/02/el-preu-del-lloguer-supera-els-3170-euros-i-arriba-al-maxim-historic-radio-ser-principat-d-andorra/",
      },
    ],
  },
  {
    slug: "best-areas-to-invest-in-andorra-property",
    title: "Millors àrees per invertir en propietats d'Andorra",
    category: "Guia de ubicació",
    date: "Mar 2026",
    excerpt:
      "Una guia pràctica sobre on el valor, l'escassetat i el posicionament a llarg termini són més fortes en les parroquies principals d'Andorra.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Un mercat petit on la ubicació importa ainda més",
        paragraphs: [
          "A Andorra, la ubicació no és només un filtre de búsqueda. Aquella és un dels majors impulsors del valor a llarg termini.",
          "Aquell és parcialment perquè el país és petit, el subministrament és restringit, i cada parroquia es comporta diferent. Un comprador mirant Ordino no entra al mateix mercat que algú enfocada en Encamp o Andorra la Vella. Els preus, el perfil de comprador, l'escassetat i el cas d'ús a llarg termini pot tots canviar significativament d'una àrea a l'altra.",
          "Per als inversors, aquell és bona notícia. Significa que Andorra no és un mercat unidimensional. L'oportunitat resideix en entendre quines ubicacions millor s'alineen amb l'objectiu darrere del capital.",
        ],
      },
      {
        heading: "Ordino: Prestigi, escassetat i qualitat a llarg termini",
        paragraphs: [
          "Ordino continua destacant com una de les ubicacions residencials més premium en el país.",
          "Reportes recents del mercat el 2025 van mostrar preus de venda promedi en Ordino excedint 1,5 milions d'euros, i dades posteriores van empenyar aquell promedi més allà de 1,6 milions d'euros. Aquella la converteix en un dels mercats d'extrema superior més clars a Andorra.",
          "Ordino a menys tracta menys de volum a curt termini i més sobre qualitat residencial duradera. Per a compradors que buscan una base andorrana de primer ordre o un activa de tenència llarga en un dels escenaris més desitjables del país, seguix sent una de les ubicacions més fortes en el mercat.",
        ],
      },
      {
        heading: "Escaldes-Engordany: Demanda premium amb profunditat urbana real",
        paragraphs: [
          "Escaldes romàn com un dels mercats de propietats més importants a Andorra, particularment per a compradors que desitgen centralitat, conveniència i posicionament premium.",
          "Reportes recents van mostrar valors de venda promedi en Escaldes per damunt de 1 milió d'euros, amb nivells de lloguer també entre els més alts en el país. L'activitat de hipoteques el 2025 também va elevar-se fortement en la parroquia, el que suggereix demanda subyacent real, no només inflació de listados.",
          "Escaldes és un dels exemples més clars d'una parroquia on liquiditat i prestigi pot coexistir. Ofereix una forma més urbana d'escassetat que Ordino, però no és menys rellevant.",
        ],
      },
      {
        heading: "Andorra la Vella: Central, establerta i altament pràctica",
        paragraphs: [
          "La capital romàn com un dels punts de referència més importants en el mercat.",
          "Els nivells de pregunta promedi el 2025 van ser reportats al voltant de 650.000 euros a principis d'any, amb reportes posteriores del mercat col·locant valors de venta promedi més a prop de 850.000 euros. Els valors de lloguer también son entre els més alts en el país.",
          "Andorra la Vella pot no portar el mateix aura de luxe que les parts més altes d'Ordino o Escaldes, però té alguna cosa més: practicitat. Per a molts inversors, aquella la converteix en un dels mercats més confiables en el Principat.",
        ],
      },
      {
        heading: "Encamp: Entrada més accessible, perfil de valor diferent",
        paragraphs: [
          "Encamp romàn com una de les formes més assequibles per entrar al mercat andorrà.",
          "Reportes recents van col·locar valors de venta promedi per damunt de la majoria del país, amb cifres per damunt de 390.000 euros a principis de 2025 i al voltant de 473.000 euros en reportes posteriores de 2025. Els preus de lloguer también romanen molt més baixos que en el vall central.",
          "Encamp no és el mateix tipus de joc que Ordino o Escaldes. Però aquell és exactament el punt. Per a alguns inversors, una parroquia més accessible amb espai per a alza selectiva pot ser més atractiva que perseguir el codi postal més cara.",
        ],
      },
      {
        heading: "Canillo: Adyacència de turisme i senyals de preu per metre",
        paragraphs: [
          "Canillo és interessant perquè sovint es comporta diferent de la resta del mercat.",
          "Malgrat no sempre és el líder en preu de compra de titular promedi, ha mostrat métrica molt fortes de preu per metre quadrat i lloguer en reportes locals recents. Aquell suggereix escassetat a nivel d'unitat i demanda forta en bólses específiques, especialment on accés a esquí i muntanya juguen un paper.",
          "Canillo és un mercat més especialitzat. Tracta menys de profunditat residencial ampla i més sobre el producta correcta en el lloc correcta.",
        ],
      },
      {
        heading: "Què diuen les dades sobre el mercat més ample",
        paragraphs: [
          "El teló de fons del mercat més ample suporta l'idea que Andorra romàn activa i selectiva al mateix temps.",
          "Reportes recents van indicar que els preus promedi d'apartaments el 2025 van pujar a al voltant de 4.479 euros per metre quadrat, el 75,1% de les transaccions immobiliàries de 2025 van ser realitzades per residents, l'activitat de hipoteques residencials el 2025 es va elevar aproximadament un 40%, i el valor total de transaccions va arribar aproximadament 1.398 mil milions d'euros.",
          "Aquestes son senyals importants. Mostren un mercat que és cara, subministrament-restringida i ancora suportada per activitat de comprador real significativa.",
        ],
      },
      {
        heading: "Llavors, on haurien d'enfocar-se els inversors?",
        paragraphs: [
          "Aquell depén de l'objectiu.",
          "Per això la selecció de parroquia a Andorra mai ha de ser genérica. El mateix mercat nacional pot oferir històries d'inversió molt diferents depenent de on entres.",
        ],
        table: {
          headers: ["Objectiu d'inversor", "Àrees de millor ajust", "Perfil d'inversió"],
          rows: [
            ["Base d'estil de vida premium", "Ordino, Escaldes", "Enfocament de prestigi"],
            ["Tenència a llarg termini central i pràctica", "Andorra la Vella, Escaldes", "Tenència central"],
            ["Posició de valor emergent", "Encamp", "Popularitat creixent"],
            ["Posicionament de muntanya/segona vivienda", "Canillo, Ordino", "Accés a estil de vida"],
          ],
        },
      },
      {
        heading: "Per què la lectura local del mercat crea una avantatge",
        paragraphs: [
          "Andorra ya no és un mercat on l'exposició ampla sigui suficient.",
          "Els resultats més fortes son cada vegada més ligats a qualitat de micro-ubicació, dinàmiques de subministrament, perfil de comprador i l'habilitat de distingir stock visible d'oportunitat real. Aquell és el lloc on la lectura local crea una avantatge.",
          "Equity Partners ajuda els inversors a interpretar el mercat andorrà a través de l'accés local, consciència regulatòria i relacions confiables en el terreny. En un mercat petit i d'alt nivell de barrera, entendre on invertir a menys és tan important com decidir si invertir.",
        ],
      },
      {
        heading: "Quines àrees mereixen l'atenció més propera ara",
        paragraphs: [
          "Andorra continua oferint oportunitats immobiliàries convincents, però la selecció de parroquia és ara una de les decisions estratègiques més importants que un inversor pot fer.",
          "Per als inversors que buscan prestigi i escassetat, Ordino i Escaldes romanen especialment fortes. Per als aquells que buscan practicitat i resiliència urbana, Andorra la Vella mereix atenció. Per als compradors que prioritzen punts d'entrada més baixos o posicionament més especialitzat, Encamp i Canillo pot ser altament rellevants.",
          "L'oportunitat a Andorra és real. Però a mesura que el mercat es torna més selectiu, la qualitat de ubicació importa més que mai.",
        ],
      },
    ],
    sources: [
      {
        label: "SER Andorra sobre lloguers i preus de venda, 2 d'octubre de 2025",
        href: "https://cadenaser.com/andorra/2025/10/02/el-preu-del-lloguer-supera-els-3170-euros-i-arriba-al-maxim-historic-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre lloguers i preus, 10 d'abril de 2025",
        href: "https://cadenaser.com/andorra/2025/04/10/el-preu-de-lhabitatge-de-lloguer-ha-crescut-un-35-durant-el-primer-trimestre-de-lany-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre hipoteques residencials, 16 de març de 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
    ],
  },
];
