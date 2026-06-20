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
    date: "Apr 2026",
    excerpt:
      "Una guia pràctica per a inversors sobre les regles d'adquisició d'Andorra posteriors al 2025, què poden comprar encara els estrangers i on hi ha oportunitats reals.",
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Sí, però el mercat ja no és tan obert",
        paragraphs: [
          "Els estrangers poden comprar propietats a Andorra el 2026, però el mercat ja no és tan obert, flexible ni senzill com molts llocs d'internet encara suggereixen. Des del cicle de reformes del 2025, Andorra ha entrat en una fase més selectiva en què el capital estranger continua sent benvingut, però ara opera dins d'un marc jurídic i estratègic més rigorós.",
          "Per als inversors, això canvia la pregunta real. Ja no és simplement si es pot comprar. És què es pot comprar, com es pot estructurar l'operació i si l'oportunitat encara té sentit sota les noves regles.",
          "Per a nosaltres, aquest és el canvi clau: Andorra ja no s'hauria de veure com un mercat immobiliari d'accés fàcil i fiscalment eficient. Ara és una jurisdicció amb barreres d'entrada altes, on l'accés local, el compliment normatiu i la qualitat d'execució importen molt més que abans.",
        ],
      },
      {
        heading: "Què ha canviat després del reajustament regulatori del 2025",
        paragraphs: [
          "El punt d'inflexió principal va ser la Llei 5/2025, aprovada el 6 de març de 2025 i aplicada des de l'abril de 2025. La reforma es va dissenyar per reduir la pressió especulativa, protegir l'accés local a l'habitatge i endurir el funcionament pràctic de la inversió immobiliària estrangera.",
          "Això és important perquè molts articles internacionals sobre el mercat immobiliari andorrà es van escriure abans d'aquests canvis. Un comprador que es basi en guies obsoletes pot malinterpretar fàcilment la seva posició real.",
          "Aquesta és una de les bretxes més grans del mercat. Una gran part del contingut en anglès sobre la compra de propietats a Andorra es va escriure abans de les reformes del 2025 o continua repetint una versió anterior de la història del mercat: impostos baixos, cap fricció important, demanda creixent, una jurisdicció de muntanya atractiva i compres immobiliàries senzilles.",
          "Aquesta narrativa, en el millor dels casos, ara és incompleta.",
        ],
      },
      {
        heading: "Què poden comprar encara els inversors estrangers",
        paragraphs: [
          "Els compradors estrangers encara poden adquirir propietats a Andorra, però amb límits més estrets que abans. En termes generals, el marc ara se centra en un únic habitatge unifamiliar o un terreny per construir-ne un, fins a dues unitats residencials en certs casos i actius auxiliars limitats, com ara places d'aparcament.",
          "Això encara pot funcionar bé per a inversors seleccionats, però allunya clarament el mercat de l'acumulació residencial àmplia i repetida.",
          "Per als inversors acostumats a més flexibilitat, això pot semblar inicialment restrictiu. En realitat, canvia el joc: de l'acumulació a la precisió.",
          "Els millors resultats ara provindran probablement d'actius escollits amb cura, de tinences a llarg termini i d'adquisicions estructurades amb una execució local disciplinada des del primer dia.",
        ],
      },
      {
        heading: "Per què les millors oportunitats pertanyen ara al capital disciplinat",
        paragraphs: [
          "L'error més gran que un inversor estranger pot cometre a Andorra avui és assumir que «encara possible» significa «encara senzill». L'estatus d'inversor, el tractament fiscal, els límits d'adquisició i el cas d'ús ara importen molt més que abans. Algunes estratègies encara funcionen molt bé. D'altres són molt menys atractives, o ja no són viables de la manera que molts compradors estrangers esperen.",
          "Per això l'estructuració local s'ha convertit en part del rendiment de la inversió. A Andorra, avui, la qualitat d'execució no és només operativa. És estratègica.",
          "L'oportunitat a Andorra no ha desaparegut. S'ha tornat més selectiva. Això significa que els millors resultats ara provindran probablement d'actius d'alta qualitat escollits amb cura, de tinences a llarg termini en lloc de l'especulació, de relacions locals sòlides i d'una planificació jurídica i d'execució disciplinada des del primer dia.",
          "En altres paraules, Andorra ara recompensa la precisió més que l'escala.",
        ],
      },
      {
        heading: "Per què els consells antics d'internet són ara perillosos",
        paragraphs: [
          "Un comprador que es basi en material obsolet pot malinterpretar si es considera inversor estranger, quantes unitats pot adquirir legalment, si una estratègia de promoció immobiliària encara està permesa, com s'apliquen ara els impostos sobre la inversió estrangera o si una estratègia vinculada a la residència encara funciona com ho feia abans.",
          "Aquesta és exactament la raó per la qual l'assessorament local i actualitzat sobre execució ha esdevingut més valuós que el contingut internacional genèric. El mercat andorrà ja no és un mercat on n'hi hagi prou amb una orientació general sobre estil de vida. Els detalls jurídics i estratègics ara canvien els resultats.",
        ],
      },
      {
        heading: "Què ens diu el mercat",
        paragraphs: [
          "Les dades recents del mercat del 2025, publicades a principis del 2026, van mostrar que la majoria de les transaccions les van fer residents. Això és important. Confirma que Andorra no és només una història de demanda estrangera. La participació domèstica continua sent central al mercat, i això dona suport a la direcció política més restrictiva del Govern.",
          "Per als inversors, això fa que Andorra sigui més interessant, no menys. Un mercat selectiu amb una profunditat local real sovint és més resilient que un mercat impulsat només per la dinàmica internacional.",
        ],
      },
      {
        heading: "Què significa això per als compradors estrangers",
        paragraphs: [
          "Llavors, poden els estrangers comprar propietats a Andorra el 2026? Sí.",
          "Però Andorra ja no és un mercat per a suposicions passives o estratègies obsoletes. L'oportunitat continua sent sòlida per als inversors que entenen el nou marc i aborden el mercat amb la guia local adequada.",
          "Aquí és on rau ara el veritable avantatge: no a perseguir un accés fàcil, sinó a entrar al mercat correctament.",
        ],
      },
    ],
    sources: [
      {
        label: "Carlota Pastora sobre la Llei 5/2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "Advantia sobre els canvis en la inversió immobiliària estrangera",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Advantia sobre els canvis de residència i fiscalitat del 2025",
        href: "https://www.advantia.ad/en/economy/tax-changes-residence-andorra",
      },
      {
        label: "SER Andorra sobre les dades oficials de transaccions del 2025",
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
      "Una guia actualitzada per a inversors sobre el mercat immobiliari d'Andorra el 2026: regulació, preus, restriccions a la inversió estrangera i on el capital disciplinat encara pot trobar oportunitats.",
    image:
      "https://images.unsplash.com/photo-1482192505345-5655af888cc4?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min de lectura",
    sections: [
      {
        heading: "Un mercat més selectiu reforça la tesi d'inversió",
        paragraphs: [
          "La història immobiliària andorrana el 2026 ja no es defineix per l'obertura. Es defineix per l'escassetat, la selectivitat i el valor creixent de l'execució local.",
          "Precisament per això el mercat continua mereixent l'atenció seriosa dels inversors. Durant molt de temps, Andorra es va descriure en termes massa simples: eficiència fiscal, estabilitat política, estil de vida de muntanya i demanda internacional creixent. Aquests elements encara importen, però ja no expliquen la tesi d'inversió completa.",
          "Avui, Andorra s'entén millor com un mercat immobiliari europeu amb barreres d'entrada altes. L'accés és més estret. La regulació és més estricta. La coordinació local té més pes. I els inversors més ben posicionats per obtenir bons resultats ja no són els que busquen una àmplia flexibilitat, sinó els que entren amb una estructuració més acurada, una alineació local més forta i una visió del valor a més llarg termini.",
          "Aquest canvi no ha debilitat el mercat. En molts aspectes, l'ha fet més invertible per al capital disciplinat.",
        ],
      },
      {
        heading: "Què ha canviat per als inversors",
        paragraphs: [
          "La narrativa d'inversió antiga es centrava en l'entrada simple al mercat. L'actual tracta de l'accés qualificat.",
          "Avui, els inversors seriosos necessiten entendre tres canvis estructurals. Primer, la inversió immobiliària estrangera està més restringida. El mercat ja no està obert al tipus d'acumulació residencial àmplia que molts compradors internacionals abans assumien que era possible. Les adquisicions ara estan subjectes a límits més clars, i certes estratègies especulatives o vinculades al turisme s'han restringit de manera material.",
          "Segon, l'estructura fiscal i regulatòria importa més per als rendiments. En mercats amb més flexibilitat, una estructuració deficient pot ser ineficient però viable. A Andorra, avui, una estructuració deficient pot alterar tota l'economia d'una transacció.",
          "Tercer, l'execució local s'ha convertit en part de la tesi d'inversió. En una jurisdicció més petita, on les aprovacions, les contraparts i l'accés al mercat depenen de les relacions, la qualitat de la coordinació local pot tenir més impacte que l'optimització de fulls de càlcul.",
          "Per això les millors oportunitats d'Andorra el 2026 no són necessàriament les més visibles. Sovint són les que combinen un producte escàs, una estructura conforme a la normativa i un lliurament local creïble.",
        ],
      },
      {
        heading: "Què diuen les dades sobre el mercat ara",
        paragraphs: [
          "Les xifres recents confirmen que Andorra continua sent un mercat actiu, però també mostren un mercat modelat pels residents, l'escassetat i la normalització posterior a la reforma, més que no pas purament per la demanda estrangera.",
          "L'informe sobre les dades oficials del mercat del 2025, publicat el 9 de febrer de 2026, va indicar que el 75,1% de les transaccions immobiliàries del 2025 les van fer residents, que el valor total de les transaccions va arribar aproximadament als 1.398 milions d'euros, que el preu mitjà dels apartaments va pujar fins a uns 4.479 euros per metre quadrat, i que les compres estrangeres van augmentar amb força, però en part a partir de la base distorsionada creada pel període de moratòria anterior.",
          "Informes addicionals del 6 de novembre de 2025 van indicar que els preus dels apartaments ja s'acostaven als 4.500 euros per metre quadrat el tercer trimestre, fet que reforça la perspectiva que la pressió sobre els preus continua sent estructuralment real i no pas anecdòtica.",
          "Més recentment, les dades publicades el 16 de març de 2026 van mostrar que les hipoteques residencials el 2025 havien augmentat aproximadament un 40% interanual, amb més de 385 milions d'euros en volum d'hipoteques residencials. Això és important perquè suggereix que l'activitat dels compradors locals continua sent forta fins i tot mentre el mercat es torna més car i més regulat.",
          "Per als inversors, això és important. Andorra no és simplement una història de capital estranger. La demanda domèstica encara compta. I això tendeix a afavorir la resiliència.",
        ],
      },
      {
        heading: "Per què els inversors continuen interessats",
        paragraphs: [
          "Malgrat unes regles més estrictes, Andorra conserva atractius clars per al capital sofisticat. L'escassetat sosté el valor a llarg termini en una jurisdicció amb una oferta limitada, on el sòl és escàs, la planificació és sensible i la qualitat del producte importa.",
          "La base de compradors també és més profunda del que sovint assumeixen els observadors externs. El mercat no només se sosté en l'interès estranger, sinó també en els residents, els negocis locals i el capital familiar establert. Això és important per a la liquiditat i la resiliència.",
          "L'enduriment regulatori pot enfortir el mercat amb el temps, en desincentivar el capital de menys convicció i preservar una millor alineació entre oferta, preus i tolerància social.",
          "L'accés és més difícil, cosa que augmenta el valor de l'avantatge local. Quan un mercat es torna més selectiu, l'asimetria d'informació creix. Això beneficia els inversors que treballen a través de xarxes locals reals en lloc d'anuncis genèrics i narratives de mercat generalitzades.",
        ],
      },
      {
        heading: "On es troba encara l'oportunitat",
        paragraphs: [
          "L'oportunitat real a Andorra el 2026 no està a perseguir l'exposició més àmplia possible. Està a identificar on la selectivitat crea valor.",
          "Al nostre parer, les millors oportunitats continuen concentrades en quatre àrees: residencial de primer nivell amb una escassetat real, promocions llestes per executar, estratègies de tinença a llarg termini i oportunitats originades localment, on la qualitat de l'accés importa més que la visibilitat del mercat públic.",
          "Els actius residencials ben posicionats en microubicacions amb oferta restringida continuen sent atractius per als inversors, especialment on la qualitat i la disciplina de l'oferta són evidents. Els projectes amb itineraris de planificació realistes, una alineació de socis creïble i una lògica de promoció clara són cada cop més preferits que les posicions conceptuals o especulatives.",
          "A mesura que la fricció de les transaccions augmenta, la lògica d'inversió de llarga durada esdevé més convincent. Els inversors que entren a Andorra haurien de pensar cada cop més en termes de valor durador, no només d'arbitratge de cicle curt.",
        ],
      },
      {
        heading: "Què haurien d'evitar els inversors seriosos",
        paragraphs: [
          "Andorra continua sent atractiva, però és menys indulgent. Els errors més grans el 2026 solen ser estratègics més que no pas legals.",
          "Els inversors malinterpreten el mercat quan assumeixen que les velles guies per a compradors estrangers encara s'apliquen, sobreestimen fins a quin punt l'adquisició residencial és escalable, analitzen operacions sense prou consideració per l'estructura fiscal i el compliment normatiu, tracten l'execució local com un detall operatiu en lloc d'una variable d'inversió central, o confonen disponibilitat amb qualitat.",
          "Aquest últim punt és important. En una jurisdicció selectiva, l'inventari visible no sempre és el millor inventari. Les millors oportunitats sovint sorgeixen allà on la confiança, el moment oportú i la credibilitat local s'entrecreuen.",
        ],
      },
      {
        heading: "Per què la perspectiva local importa més que mai",
        paragraphs: [
          "En un mercat més flexible, el capital per si sol pot fer més part de la feina. A Andorra, avui, això ja no és cert. Els inversors necessiten una millor intel·ligència de mercat, una connectivitat local més forta, una estructuració disciplinada i una supervisió del lliurament creïble.",
          "Aquest és el buit que Equity Partners està concebuda per cobrir. El nostre valor no és simplement que coneixem el mercat. És que ajudem els inversors a entrar-hi correctament: amb perspectiva local, una coordinació més forta amb les contraparts i una línia més clara entre la intenció estratègica i l'execució sobre el terreny.",
        ],
      },
      {
        heading: "Per què Andorra encara mereix l'atenció dels inversors",
        paragraphs: [
          "Andorra continua sent un dels mercats immobiliaris de nínxol més convincents d'Europa per al capital seriós. Però ja no és un mercat per a suposicions passives, per a l'optimisme generalitzat dels compradors estrangers ni per a narratives reciclades de paradís fiscal.",
          "La història d'inversió d'Andorra el 2026 és més forta que això. És una història d'accés selectiu, d'oferta restringida, de participació domèstica resilient, de sofisticació regulatòria creixent i del valor cada cop més gran de l'execució local disciplinada.",
          "Per als inversors que entenen aquest canvi, Andorra encara ofereix oportunitats reals. Però l'avantatge ara pertany als qui tracten el mercat tal com és avui, no tal com es descrivia ahir.",
        ],
      },
    ],
    sources: [
      {
        label: "Advantia sobre els canvis en la inversió immobiliària estrangera",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Carlota Pastora sobre la Llei Òmnibus del 6 de març de 2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "SER Andorra sobre les transaccions immobiliàries del 2025, 9 de febrer de 2026",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre el preu per metre quadrat dels apartaments, 6 de novembre de 2025",
        href: "https://cadenaser.com/andorra/2025/11/06/el-preu-mitja-del-metre-quadrat-en-un-pis-de-venda-frega-els-4500-euros-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre l'actualització de l'impost a la inversió immobiliària estrangera, 26 de febrer de 2026",
        href: "https://cadenaser.com/andorra/2026/02/26/el-govern-actualitza-fins-al-6-la-taxa-sobre-la-inversio-estrangera-immobiliaria-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre les hipoteques residencials, 16 de març de 2026",
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
      "Què cal per accedir-hi el 2026, per què el marc està canviant i per què Andorra continua sent un lloc tan atractiu per viure-hi i invertir-hi.",
    image:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Una via més selectiva cap a una de les jurisdiccions més atractives d'Europa",
        paragraphs: [
          "Andorra continua destacant com una de les jurisdiccions més atractives d'Europa per als inversors, les famílies i els emprenedors internacionals que busquen estabilitat, qualitat de vida i una base més sòlida a llarg termini a Europa.",
          "El 2026, la residència passiva a Andorra continua sent plenament accessible. Però el marc està evolucionant. El país està apujant el llistó, no per fer la residència menys atractiva, sinó per fer-la més selectiva, més sostenible i més clarament alineada amb les persones que volen una connexió genuïna amb el Principat.",
          "Això és el que fa que la via de la residència passiva d'Andorra sigui tan interessant avui. Ja no es tracta simplement de complir un llindar. Es tracta de demostrar compromís amb un país que ofereix una qualitat de vida excepcional, estabilitat política i un mercat immobiliari cada vegada més valuós.",
        ],
      },
      {
        heading: "Què és la residència passiva d'Andorra",
        paragraphs: [
          "La residència passiva, o residència sense activitat lucrativa, està pensada per a les persones que volen viure a Andorra sense ocupar un lloc de treball local en el sentit tradicional.",
          "És especialment rellevant per als inversors, els emprenedors amb ingressos internacionals, els titulars de patrimoni privat, les famílies que busquen una base europea segura i d'alta qualitat, i les persones que combinen objectius d'estil de vida amb una planificació fiscal i patrimonial a llarg termini.",
          "En termes pràctics, permet esdevenir resident d'Andorra i construir-hi la vida al voltant del país, sempre que es compleixin els requisits financers i d'inversió.",
        ],
      },
      {
        heading: "Què cal per accedir-hi el 2026",
        paragraphs: [
          "El marc del 2026 és més exigent que el d'anys anteriors. És important entendre-ho des del principi.",
          "D'acord amb resums legals recents del 2026, la residència passiva ara requereix, en general, una inversió qualificada mínima en actius andorrans d'1.000.000 d'euros, mentre que si la inversió es fa en béns immobles, cada unitat ha de superar els 800.000 euros.",
          "El pagament a l'AFA del sol·licitant principal és de 50.000 euros, amb 12.000 euros addicionals per cada persona a càrrec. També hi ha una expectativa de residència efectiva a Andorra durant l'any.",
        ],
      },
      {
        heading: "Com estan canviant els requisits",
        paragraphs: [
          "Aquí és on molts lectors queden atrapats per informació obsoleta en línia. El marc de residència d'Andorra no va canviar només una vegada. Va canviar per etapes.",
          "El 2025, el llindar mínim per a béns immobles ja havia augmentat, les inversions elegibles es van restringir i el requisit de l'AFA va créixer. El 2026, el llindar general d'inversió qualificada sembla haver augmentat fins a 1.000.000 d'euros, mentre que si la inversió es fa a través de la propietat immobiliària, cada unitat ha de superar els 800.000 euros.",
          "Això reflecteix una tendència més àmplia: Andorra avança cap a un model de residència construït al voltant de la qualitat, el compromís i la substància econòmica. Això no s'ha de veure negativament. En molts sentits, reforça l'atractiu a llarg termini del país.",
        ],
      },
      {
        heading: "Per què Andorra continua sent tan atractiva",
        paragraphs: [
          "Fins i tot amb llindars més alts, la proposta continua sent convincent. Andorra ofereix una combinació poc habitual d'estabilitat política, seguretat personal, gran qualitat de vida, bellesa natural, un perfil internacional de negocis i patrimoni, i un entorn europeu compacte i d'alt rendiment.",
          "Per a moltes persones, l'atractiu va més enllà de la planificació fiscal. Es tracta de viure en un lloc que se senti segur, net, eficient i cada vegada més exclusiu.",
          "Aquesta exclusivitat també és important en l'àmbit immobiliari. Andorra és una jurisdicció petita, amb una oferta restringida i un fort valor lligat a la ubicació. Això significa que la residència i la propietat immobiliària poden funcionar juntes d'una manera molt atractiva quan s'estructuren bé.",
        ],
      },
      {
        heading: "Quin paper hi tenen els béns immobles",
        paragraphs: [
          "Per a molts sol·licitants, els béns immobles continuen sent una de les maneres més atractives de crear una connexió real amb Andorra. La propietat pot servir per a dos propòsits alhora: donar suport a una estratègia de residència i crear valor personal o d'inversió a llarg termini al Principat.",
          "Això pot significar adquirir una casa per viure-hi, assegurar una base familiar d'alta qualitat, invertir en una propietat andorrana de primer nivell amb convicció a llarg termini, o entrar al mercat a través d'un actiu que realment es vulgui posseir.",
          "Aquí és on l'estratègia importa. Una estructura de residència passiva no s'hauria de construir al voltant de l'actiu qualificador més barat possible. L'enfocament més sòlid és triar béns immobles que tinguin sentit tant per a la residència com per al valor a llarg termini.",
        ],
      },
      {
        heading: "Per què l'assessorament local importa més ara",
        paragraphs: [
          "A mesura que les regles es tornen més selectives, la qualitat de l'assessorament local esdevé més important.",
          "Les preguntes correctes ja no són simplement si es compleixen els requisits, quin és el llindar o quina documentació cal. Les millors preguntes són quin tipus d'actiu andorrà té sentit per a vostè, si convé comprar per a ús personal, per a inversió o per a totes dues coses, com s'han d'alinear les decisions de residència, fiscalitat i béns immobles, i quines oportunitats realment val la pena perseguir.",
          "En un mercat com el d'Andorra, on la regulació, l'accés i la qualitat de les propietats són profundament locals, aquesta diferència és important.",
        ],
      },
      {
        heading: "Per què aquesta encara és una història positiva",
        paragraphs: [
          "Seria fàcil veure els llindars creixents i concloure que el procés es torna menys atractiu. Al nostre parer, aquesta seria una lectura equivocada.",
          "El que està fent Andorra és refinar el seu model. El país deixa clar que la residència passiva és per a persones que volen una relació significativa amb el Principat. Això crea un entorn més sòlid a llarg termini per als residents, els inversors, els propietaris i el mercat en general.",
          "Per al sol·licitant adequat, això fa que l'oportunitat sigui més convincent, no menys.",
        ],
      },
      {
        heading: "Com ajuda Equity Partners els compradors de residència",
        paragraphs: [
          "Equity Partners ajuda els inversors a accedir a les oportunitats immobiliàries més atractives d'Andorra a través de relacions locals de confiança, coneixement regulatori i una execució disciplinada.",
          "Per a un lector que estigui considerant la residència passiva, això significa que podem ajudar a connectar l'objectiu de residència amb l'estratègia immobiliària adequada, ja sigui adquirir una casa a Andorra, construir una base familiar a llarg termini o assegurar una inversió immobiliària d'alta qualitat en un dels mercats més atractius del Principat.",
          "La residència passiva no és només una decisió d'immigració. També és una decisió d'assignació de capital. I a Andorra, totes dues s'han d'abordar conjuntament.",
        ],
      },
      {
        heading: "Per què la residència passiva continua sent atractiva",
        paragraphs: [
          "La residència passiva d'Andorra el 2026 és més selectiva que abans, però continua sent una via excepcional per a l'inversor o la família adequats.",
          "Els requisits són més alts. El marc és més seriós. Però els beneficis continuen sent molt reals: accés a una de les jurisdiccions més atractives d'Europa, una base de residència més sòlida a llarg termini i la possibilitat de combinar l'estil de vida amb una propietat immobiliària andorrana significativa.",
          "Per a les persones que estan genuïnament il·lusionades amb la idea de viure a Andorra o d'invertir en el seu mercat immobiliari d'alta qualitat, aquesta continua sent una oportunitat molt convincent. I si aquesta és la direcció que vostè està explorant, a Equity Partners estarem encantats d'ajudar-lo a trobar la propietat adequada i a estructurar el pas següent amb confiança.",
        ],
      },
    ],
    sources: [
      {
        label: "Resum dels canvis de la Llei 2/2026",
        href: "https://carlotapastora.com/en/law-2-2026-andorra-changes-immigration-investment-taxation/",
      },
      {
        label: "Resum de la Llei 5/2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
      {
        label: "Advantia sobre les noves condicions de residència",
        href: "https://www.advantia.ad/en/living-in-andorra/new-conditions-residence-andorra",
      },
      {
        label: "Antecedents de la residència passiva segons Advantia",
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
    title: "Impostos sobre la propietat a Andorra per a inversors estrangers",
    category: "Impostos",
    date: "Feb 2026",
    excerpt:
      "Què signifiquen les regles el 2026, on han canviat els costos i com una estructuració més sòlida pot protegir el valor a llarg termini.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "La fiscalitat ara és part de l'estratègia d'inversió",
        paragraphs: [
          "Andorra continua sent un dels mercats immobiliaris més atractius d'Europa per als inversors amb orientació internacional. Però el 2026, els impostos sobre la propietat ja no es poden tractar com un detall secundari.",
          "No és perquè el mercat hagi esdevingut menys atractiu. És perquè Andorra s'està tornant més selectiva en la manera com el capital estranger entra al sector immobiliari. Per als inversors, això significa que la fiscalitat ara té un paper més directe en l'estratègia d'adquisició, la selecció d'actius i els rendiments a llarg termini.",
        ],
      },
      {
        heading: "El canvi fiscal clau que els inversors estrangers han d'entendre",
        paragraphs: [
          "L'impost més important per als compradors estrangers és l'impost sobre la inversió estrangera en béns immobles.",
          "Informes recents del febrer de 2026 van indicar que el tipus va augmentar fins al 6% en una primera propietat i fins al 10% en una segona propietat.",
          "Es tracta d'un augment significatiu respecte del marc anterior i confirma la direcció de la política: Andorra encara acull la inversió, però vol un capital de més qualitat, més ben alineat i menys especulatiu.",
        ],
      },
      {
        heading: "Per què això importa en la pràctica",
        paragraphs: [
          "Un cost d'entrada del 6% en una primera adquisició ja no és simplement una fricció de fons. Es converteix en part de l'economia central de la inversió.",
          "Això té diverses implicacions directes: la qualitat dels actius importa més, la compra repetitiva és menys atractiva, una estructuració deficient esdevé més costosa, i la convicció a llarg termini importa més que la flexibilitat a curt termini.",
          "Per als inversors, això significa que Andorra recompensa cada vegada més la precisió per sobre de l'escala.",
        ],
      },
      {
        heading: "Qui és tractat com a inversor estranger",
        paragraphs: [
          "Aquesta és una de les preguntes pràctiques més importants.",
          "L'impost no s'aplica només als no residents evidents. Sota el marc ampliat, certs residents també poden ser tractats com a inversors estrangers si no poden demostrar l'historial de residència requerit a Andorra.",
          "Això significa que la classificació de l'inversor s'ha de revisar abans que una transacció s'estructuri, no després.",
        ],
      },
      {
        heading: "Per què el Govern està fent això",
        paragraphs: [
          "Els canvis fiscals formen part d'un reajustament més ampli de la política d'habitatge i de mercat.",
          "Andorra utilitza la regulació i la fiscalitat per reduir la pressió especulativa, protegir l'accés a l'habitatge i fomentar un comportament inversor més durador i alineat amb l'entorn local.",
          "Això no s'ha de llegir només com una barrera. També es pot llegir com un senyal que el mercat esdevé més disciplinat i més resilient amb el temps.",
        ],
      },
      {
        heading: "Encara hi ha oportunitats atractives?",
        paragraphs: [
          "Sí.",
          "Andorra continua sent atractiva perquè combina una oferta restringida, estabilitat política, un fort atractiu d'estil de vida i un mercat on l'accés local encara crea un avantatge real.",
          "Per a l'inversor adequat, un impost d'entrada més alt no elimina l'oportunitat. Simplement fa més important triar l'actiu correcte i entrar al mercat de la manera adequada.",
        ],
      },
      {
        heading: "Per què importa una execució conscient de la fiscalitat",
        paragraphs: [
          "Aquí és on l'assessorament local esdevé especialment valuós.",
          "El mercat andorrà ja no és un mercat on els inversors internacionals hagin de confiar en suposicions genèriques o en resums amplis en línia. En un entorn sensible a la fiscalitat, l'avantatge real prové d'entendre com el marc fiscal afecta l'adquisició, quines oportunitats encara justifiquen el cost d'entrada i com l'accés local pot millorar la qualitat general de la inversió.",
          "Equity Partners ajuda els inversors a abordar el mercat andorrà a través de la intel·ligència local, la comprensió regulatòria i una execució disciplinada. El 2026, això és, cada vegada més, el que separa una oportunitat visible d'una de sòlida.",
        ],
      },
      {
        heading: "Què n'haurien d'extreure els inversors",
        paragraphs: [
          "Els impostos sobre la propietat a Andorra per als inversors estrangers importen més el 2026 que fa tan sols un any.",
          "El mercat és més selectiu, però també més estructurat. Per als inversors ben assessorats, centrats en la qualitat i seriosos pel que fa al valor a llarg termini, Andorra encara ofereix oportunitats molt atractives.",
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
        label: "Advantia sobre els canvis en la inversió immobiliària estrangera",
        href: "https://www.advantia.ad/en/invest-in-andorra/foreign-investment-property",
      },
      {
        label: "Advantia sobre l'impost a la inversió estrangera en béns immobles",
        href: "https://www.advantia.ad/en/taxation/real-estate-foreign-investment-tax",
      },
      {
        label: "Carlota Pastora sobre la Llei Òmnibus del 6 de març de 2025",
        href: "https://carlotapastora.com/en/news/main-measures-omnibus-law-6-mar-2025-foreign-investment-real-estate-immigration/",
      },
    ],
  },
  {
    slug: "andorra-real-estate-market-2026",
    title: "Mercat immobiliari d'Andorra: Preus, demanda i estadístiques",
    category: "Actualització del mercat",
    date: "Feb 2026",
    excerpt:
      "Una lectura pràctica sobre els preus, l'activitat de transaccions i la demanda dels residents en el mercat immobiliari en evolució d'Andorra.",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1400&q=80",
    readTime: "6 min de lectura",
    sections: [
      {
        heading: "Un mercat que es torna més selectiu, no més feble",
        paragraphs: [
          "El mercat immobiliari andorrà el 2026 s'entén millor a través d'una sola idea: la selectivitat.",
          "Des de fora, l'augment dels preus i unes regles més estrictes poden fer que el mercat sembli menys accessible. Això és cert. Però no significa que el mercat s'estigui debilitant. En molts aspectes, significa el contrari. Andorra s'està convertint en un entorn immobiliari més estructurat, més disciplinat i més orientat a la qualitat.",
          "Per als inversors, això és important. El mercat ja no és només una qüestió de creixement. Es tracta d'entendre on s'està mantenint el valor, qui està comprant realment i què diuen les dades darrere dels titulars.",
        ],
      },
      {
        heading: "Els preus encara continuen pujant",
        paragraphs: [
          "Els informes oficials i locals recents suggereixen que els preus es mantenen ferms.",
          "Les dades publicades el febrer de 2026 van mostrar que el preu mitjà dels apartaments el 2025 va pujar un 10,5%, fins a uns 4.479 euros per metre quadrat. Informes anteriors del novembre de 2025 ja havien mostrat preus mitjans dels apartaments a prop dels 4.440 euros per metre quadrat el tercer trimestre.",
          "Això ens diu una cosa important: el creixement dels preus no és només un repunt a curt termini. Reflecteix un mercat on l'oferta continua sent restringida i on l'estoc d'alta qualitat continua atraient atenció.",
        ],
      },
      {
        heading: "Els residents encara dominen el mercat",
        paragraphs: [
          "Un dels senyals més importants de les dades del 2025 és que el 75,1% de les adquisicions immobiliàries les van fer residents.",
          "És una xifra molt rellevant. Significa que Andorra no està sent impulsada simplement pel capital estranger. La demanda dels residents continua sent estructuralment central al mercat, cosa que afavoreix la resiliència a llarg termini.",
          "Per als inversors, això és encoratjador. Mostra que Andorra encara té una demanda interna forta fins i tot mentre l'atenció internacional continua creixent.",
        ],
      },
      {
        heading: "L'activitat de transaccions ha estat forta",
        paragraphs: [
          "El mercat va ser molt actiu el 2025.",
          "Els informes recents van indicar que el nombre de transaccions va augmentar més d'un 35%, que el valor total de les transaccions va créixer aproximadament un 34% i que el valor total del mercat va arribar aproximadament als 1.398 milions d'euros.",
          "Al mateix temps, les adquisicions estrangeres també van augmentar amb força. Però aquest augment s'ha d'interpretar amb cura. En part reflecteix el rebot posterior al període de moratòria anterior, que havia distorsionat temporalment la línia de base.",
        ],
      },
      {
        heading: "El creixement de les hipoteques confirma una demanda subjacent real",
        paragraphs: [
          "Un altre senyal útil va venir del mercat hipotecari.",
          "Les dades publicades el març de 2026 van mostrar que les hipoteques residencials el 2025 van augmentar aproximadament un 40% interanual, amb un volum total d'hipoteques que va superar els 385 milions d'euros.",
          "Això és important perquè l'activitat hipotecària és un dels indicadors més clars de la participació real dels compradors. Suggereix que la demanda no és només teòrica ni purament especulativa.",
        ],
      },
      {
        heading: "Què significa això per als inversors",
        paragraphs: [
          "Per als inversors, la conclusió real és que Andorra continua sent atractiva, però ja no és un mercat per a aproximacions improvisades.",
          "Les oportunitats més fortes probablement es trobaran allà on conflueixen diversos factors: oferta restringida, demanda local real, producte d'alta qualitat, un encaix regulatori clar i una execució local sòlida.",
          "Aquest no és un mercat on l'exposició àmplia sigui necessàriament la jugada més intel·ligent. És un mercat on l'exposició més ben seleccionada probablement tindrà millors resultats.",
        ],
      },
      {
        heading: "Per què aquesta encara és una història positiva",
        paragraphs: [
          "La història del mercat d'Andorra el 2026 no va d'accés fàcil. Va de durabilitat.",
          "Els preus es mantenen forts. Els residents continuen actius. El volum d'hipoteques ha augmentat. La participació estrangera existeix, però ja no és l'única història. I l'entorn de polítiques empeny el mercat cap a una disciplina més gran, no cap a una especulació més laxa.",
          "Per als inversors seriosos, això pot ser una combinació molt positiva.",
        ],
      },
      {
        heading: "Per què la lectura local del mercat crea un avantatge",
        paragraphs: [
          "Aquí és on el coneixement local es converteix en un avantatge real.",
          "Equity Partners ajuda els inversors a interpretar el mercat andorrà a través de l'accés local, la consciència regulatòria i relacions de confiança sobre el terreny. En un mercat on la qualitat i l'escassetat importen tant com el creixement dels titulars, aquesta perspectiva és cada vegada més important.",
          "Per als inversors que miren Andorra el 2026, l'objectiu no hauria de ser només seguir la inèrcia del mercat. Ha de ser entendre on el mercat és més fort i on el valor a llarg termini té més probabilitats de mantenir-se.",
        ],
      },
      {
        heading: "Com haurien de llegir el mercat els inversors ara",
        paragraphs: [
          "El mercat immobiliari d'Andorra el 2026 és actiu, car, amb una oferta restringida i encara altament convincent.",
          "Però l'oportunitat ja no resideix només en l'optimisme generalitzat. Resideix a llegir el mercat correctament: els preus pugen, els residents continuen sent dominants, l'activitat és forta i la qualitat importa més que mai.",
          "Per als inversors que entenen aquest canvi, Andorra continua oferint una de les històries immobiliàries més interessants d'Europa.",
        ],
      },
    ],
    sources: [
      {
        label: "Govern d'Andorra sobre les transaccions del 2025, 9 de febrer de 2026",
        href: "https://www.govern.ad/ca/w/la-compra-d-habitatges-al-2025-va-ser-realitzada-majoritariament-per-residents-al-pais",
      },
      {
        label: "SER Andorra sobre les dades de transaccions del 2025, 9 de febrer de 2026",
        href: "https://cadenaser.com/andorra/2026/02/09/el-70-de-les-transaccions-immobiliaries-les-fan-residents-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre el preu per metre quadrat dels apartaments, 6 de novembre de 2025",
        href: "https://cadenaser.com/andorra/2025/11/06/el-preu-mitja-del-metre-quadrat-en-un-pis-de-venda-frega-els-4500-euros-radio-ser-principat-d-andorra/",
      },
      {
        label: "SER Andorra sobre les hipoteques residencials, 16 de març de 2026",
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
    title: "Millors àrees per invertir en propietats a Andorra",
    category: "Guia d'ubicació",
    date: "Jan 2026",
    excerpt:
      "Una guia pràctica sobre on el valor, l'escassetat i el posicionament a llarg termini són més forts a les principals parròquies d'Andorra.",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80",
    readTime: "5 min de lectura",
    sections: [
      {
        heading: "Un mercat petit on la ubicació importa encara més",
        paragraphs: [
          "A Andorra, la ubicació no és només un filtre de cerca. És un dels factors que més impulsen el valor a llarg termini.",
          "Això es deu en part al fet que el país és petit, l'oferta és restringida i cada parròquia es comporta de manera diferent. Un comprador que mira Ordino no entra al mateix mercat que algú centrat en Encamp o Andorra la Vella. Els preus, el perfil del comprador, l'escassetat i el cas d'ús a llarg termini poden canviar significativament d'una zona a una altra.",
          "Per als inversors, això són bones notícies. Significa que Andorra no és un mercat unidimensional. L'oportunitat resideix a entendre quines ubicacions s'alineen millor amb l'objectiu que hi ha darrere del capital.",
        ],
      },
      {
        heading: "Ordino: Prestigi, escassetat i qualitat a llarg termini",
        paragraphs: [
          "Ordino continua destacant com una de les ubicacions residencials més exclusives del país.",
          "Informes recents del mercat del 2025 van mostrar preus de venda mitjans a Ordino que superaven 1,5 milions d'euros, i dades posteriors van situar aquesta mitjana per sobre d'1,6 milions d'euros. Això el converteix en un dels mercats d'alta gamma més clars d'Andorra.",
          "Ordino sovint té menys a veure amb el volum a curt termini i més amb la qualitat residencial duradora. Per als compradors que busquen una base andorrana de primer nivell o un actiu de tinença llarga en un dels entorns més desitjables del país, continua sent una de les ubicacions més fortes del mercat.",
        ],
      },
      {
        heading: "Escaldes-Engordany: Demanda premium amb profunditat urbana real",
        paragraphs: [
          "Escaldes continua sent un dels mercats immobiliaris més importants d'Andorra, especialment per als compradors que volen centralitat, comoditat i un posicionament premium.",
          "Informes recents mostraven valors de venda mitjans a Escaldes per sobre d'1 milió d'euros, amb nivells de lloguer també entre els més alts del país. L'activitat hipotecària el 2025 també va créixer amb força a la parròquia, cosa que suggereix una demanda subjacent real, no només una inflació d'anuncis.",
          "Escaldes és un dels exemples més clars d'una parròquia on la liquiditat i el prestigi poden coexistir. Ofereix una forma d'escassetat més urbana que la d'Ordino, però no és menys rellevant.",
        ],
      },
      {
        heading: "Andorra la Vella: Central, establerta i altament pràctica",
        paragraphs: [
          "La capital continua sent un dels punts de referència més importants del mercat.",
          "Els nivells mitjans de preu demanat el 2025 es van situar al voltant dels 650.000 euros a principis d'any, i informes posteriors del mercat situaven els valors de venda mitjans més a prop dels 850.000 euros. Els valors de lloguer també es troben entre els més alts del país.",
          "Andorra la Vella potser no té la mateixa aura de luxe que les zones més exclusives d'Ordino o Escaldes, però té una altra cosa: practicitat. Per a molts inversors, això la converteix en un dels mercats més fiables del Principat.",
        ],
      },
      {
        heading: "Encamp: Entrada més accessible, perfil de valor diferent",
        paragraphs: [
          "Encamp continua sent una de les maneres més assequibles d'entrar al mercat andorrà.",
          "Informes recents situaven els valors de venda mitjans per sota de la major part del país, amb xifres inferiors als 390.000 euros a principis del 2025 i al voltant dels 473.000 euros en informes posteriors del 2025. Els preus de lloguer també es mantenen molt més baixos que a la vall central.",
          "Encamp no és el mateix tipus de joc que Ordino o Escaldes. Però aquest és exactament el punt. Per a alguns inversors, una parròquia més accessible amb marge per a una revaloració selectiva pot ser més atractiva que perseguir el codi postal més car.",
        ],
      },
      {
        heading: "Canillo: Proximitat al turisme i senyals de preu per metre",
        paragraphs: [
          "Canillo és interessant perquè sovint es comporta de manera diferent de la resta del mercat.",
          "Tot i que no sempre lidera el preu mitjà de compra dels titulars, ha mostrat mètriques molt fortes de preu per metre quadrat i de lloguer en informes locals recents. Això suggereix escassetat a escala d'unitat i una demanda forta en bosses específiques, especialment on l'accés a l'esquí i a la muntanya hi té un paper.",
          "Canillo és un mercat més especialitzat. Té menys a veure amb la profunditat residencial àmplia i més amb el producte adequat al lloc adequat.",
        ],
      },
      {
        heading: "Què diuen les dades sobre el mercat més ampli",
        paragraphs: [
          "El context general del mercat dona suport a la idea que Andorra continua sent activa i selectiva alhora.",
          "Informes recents van indicar que els preus mitjans dels apartaments el 2025 van pujar fins a uns 4.479 euros per metre quadrat, que el 75,1% de les transaccions immobiliàries del 2025 les van fer residents, que l'activitat hipotecària residencial el 2025 va augmentar aproximadament un 40% i que el valor total de les transaccions va arribar aproximadament als 1.398 milions d'euros.",
          "Aquests són senyals importants. Mostren un mercat que és car, amb una oferta restringida i encara sostingut per una activitat compradora real significativa.",
        ],
      },
      {
        heading: "Llavors, on haurien de centrar-se els inversors?",
        paragraphs: [
          "Això depèn de l'objectiu.",
          "Per això la selecció de parròquia a Andorra no hauria de ser mai genèrica. El mateix mercat nacional pot oferir històries d'inversió molt diferents segons per on s'hi entri.",
        ],
        table: {
          headers: ["Objectiu de l'inversor", "Àrees més adients", "Perfil d'inversió"],
          rows: [
            ["Base d'estil de vida premium", "Ordino, Escaldes", "Enfocament de prestigi"],
            ["Tinença central i pràctica a llarg termini", "Andorra la Vella, Escaldes", "Tinença de base"],
            ["Posició de valor emergent", "Encamp", "Popularitat creixent"],
            ["Posicionament de muntanya/segona residència", "Canillo, Ordino", "Accés a l'estil de vida"],
          ],
        },
      },
      {
        heading: "Per què la lectura local del mercat crea un avantatge",
        paragraphs: [
          "Andorra ja no és un mercat on l'exposició àmplia sigui suficient.",
          "Els resultats més sòlids estan cada vegada més lligats a la qualitat de la microubicació, la dinàmica de l'oferta, el perfil del comprador i la capacitat de distingir l'estoc visible de l'oportunitat real. És aquí on la lectura local crea un avantatge.",
          "Equity Partners ajuda els inversors a interpretar el mercat andorrà a través de l'accés local, la consciència regulatòria i relacions de confiança sobre el terreny. En un mercat petit i amb barreres d'entrada altes, entendre on invertir sovint és tan important com decidir si invertir.",
        ],
      },
      {
        heading: "Quines àrees mereixen ara més atenció",
        paragraphs: [
          "Andorra continua oferint oportunitats immobiliàries convincents, però la selecció de parròquia és ara una de les decisions estratègiques més importants que un inversor pot prendre.",
          "Per als inversors que busquen prestigi i escassetat, Ordino i Escaldes continuen sent especialment fortes. Per als qui busquen practicitat i resiliència urbana, Andorra la Vella mereix atenció. Per als compradors que prioritzen punts d'entrada més baixos o un posicionament més especialitzat, Encamp i Canillo poden ser altament rellevants.",
          "L'oportunitat a Andorra és real. Però a mesura que el mercat es torna més selectiu, la qualitat de la ubicació importa més que mai.",
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
        label: "SER Andorra sobre les hipoteques residencials, 16 de març de 2026",
        href: "https://cadenaser.com/andorra/2026/03/16/les-hipoteques-per-a-us-residencial-es-van-disparar-un-40-per-cent-lany-passat-radio-ser-principat-d-andorra/",
      },
    ],
  },
];
