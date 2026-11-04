(() => {
  "use strict";

  const copy = {
    en: {
      skip:"Skip to content",navHome:"Home",navLearn:"Learn Finnish",navWork:"Work",navStudy:"Study",navHomeLife:"Make a home",navExplore:"Explore Finland",siteLanguage:"Site language",
      heroKicker:"A COUNTRY, MANY STORIES",heroTitle:"Find your Finland.",heroText:"From Baltic islands to the Arctic north, explore the places, people, seasons and everyday ideas that shape Finland.",heroButton:"Explore the 19 regions",historyButton:"Start with the story",heroNote:"A clear guide to nature, culture and everyday life—made to explore one small step at a time.",mapKicker:"FINLAND AT A GLANCE",mapCaption:"One country · 19 regions",heroSticker:"YOUR NEXT STORY",firstFinnishWord:"A Finnish word",natureTranslation:"nature · luonto",
      populationLabel:"PEOPLE · YEAR-END 2025",populationCaption:"residents in Finland",regionsLabel:"REGIONS",regionsCaption:"official statistical regions",languagesLabel:"NATIONAL LANGUAGES",languagesCaption:"Finnish & Swedish; Sámi languages are part of Finland’s story",parksLabel:"NATIONAL PARKS · 2025",parksCaption:"protected places to experience nature",factSource:"Dated figures: Statistics Finland population at 31 December 2025; national park count at 31 December 2025. Open the official sources below for definitions and updates.",
      chapterRegions:"Regions",chapterHistory:"History",chapterNature:"Nature & seasons",chapterCulture:"Culture",chapterEveryday:"Everyday Finland",regionKicker:"MAP · PEOPLE · PLACES",regionsTitle:"Explore Finland, one region at a time.",regionsIntro:"Finland has regions, not states. Search a city, browse the map, or choose the kind of landscape you want to know.",searchLabel:"Search a region or city",filterAll:"All 19",filterCity:"City & campus",filterCoast:"Coast & islands",filterLake:"Lakes & forests",filterNorth:"Northern Finland",mapSectionKicker:"THE FINLAND ATLAS",mapInstruction:"Choose a region on the map",mapHelp:"Select a map shape or a region card to see more.",mapLoading:"Loading the Finland map…",mapLegend:"19 statistical regions",mapSource:"Source: Statistics Finland ↗",selectedKicker:"REGION SNAPSHOT",regionalPopulation:"POPULATION · 31 DEC 2025",cityExamples:"CITY EXAMPLES",regionLearnLink:"Explore a Finnish chapter ↗",showingRegions:"Showing all 19 regions",populationUnit:"Population · 2025",noRegions:"No regions match that search.",resetRegions:"Show all regions",mapAttribution:"Names and boundaries follow Statistics Finland’s 2026 classification. Population is the dated year-end 2025 snapshot. Map geometry: Statistics Finland open GeoJSON, CC BY 4.0.",
      historyKicker:"A SHORT TIMELINE",historyTitle:"Many chapters shaped one country.",historyIntro:"A starting point for Finland’s story—from earlier rule and autonomy to independence and modern partnerships.",historySwedenTitle:"Part of the Swedish realm",historySwedenText:"The region that is now Finland was governed as part of Sweden for centuries.",historyRussiaTitle:"Autonomous Grand Duchy",historyRussiaText:"Finland became a Grand Duchy of the Russian Empire, developing its own institutions.",historyIndependenceTitle:"Independence",historyIndependenceText:"Finland’s Parliament approved the declaration of independence.",historyRepublicTitle:"A republic",historyRepublicText:"The independent country became a republic under its new constitution.",historyNowTitle:"European & Nordic partnerships",historyNowText:"Finland joined the European Union in 1995 and NATO in 2023.",historySourceIntro:"Explore the sources:",
      natureKicker:"LAND · WATER · DAYLIGHT",natureTitle:"Notice the country change with the seasons.",natureIntro:"Travel from the southern coast to Lapland and the light, landscape and daily rhythm change with you.",seasonWinter:"Winter",seasonSpring:"Spring",seasonSummer:"Summer",seasonAutumn:"Autumn",seasonAtAGlance:"A SEASON AT A GLANCE",usefulFinnish:"A USEFUL FINNISH WORD",seasonNote:"Season timing and daylight vary by region and year. These are broad patterns, not a weather forecast.",forestTitle:"Forest paths",forestText:"Marked routes, peatlands and pine, spruce and birch landscapes invite a closer look.",forestLink:"Plan a responsible visit ↗",seaTitle:"Lakes, sea & islands",seaText:"From lake country to the Baltic and island routes, water is part of everyday and travel life.",seaLink:"Explore the coast & archipelago ↗",parksTitle:"Nature with care",parksText:"Everyman’s Rights allow many outdoor activities, with important limits. Protected parks have their own rules.",parksLink:"Read park guidance ↗",
      cultureKicker:"PEOPLE · CUSTOMS · EVERYDAY MOMENTS",cultureTitle:"Culture lives in small shared moments.",cultureIntro:"Finnish culture is diverse and always changing. These are useful starting points, not rules that describe everyone.",saunaTitle:"Sauna & taking time",saunaText:"A place to warm up, unwind and share an unhurried conversation—or a comfortable silence.",saunaLink:"Sauna basics ↗",foodTitle:"Food, coffee & the market",foodText:"Rye bread, berries, seasonal ingredients and coffee breaks meet regional and international food cultures.",foodLink:"Food and customs ↗",designTitle:"Design in daily life",designText:"Libraries, public spaces and useful objects show how design can fit into ordinary routines.",designLink:"Stories from Finland ↗",conversationTitle:"Conversation & quiet",conversationText:"Direct speech and pauses can feel natural in some situations. People and settings differ.",conversationLink:"Customs and manners ↗",celebrationsTitle:"The year’s celebrations",celebrationsText:"Vappu, Midsummer, Independence Day and local events each bring their own food, words and traditions.",celebrationsLink:"Finnish holidays ↗",languagesCultureTitle:"Languages & many voices",languagesCultureText:"Finnish and Swedish are national languages. Sámi languages and other mother tongues also belong to Finland.",languageLink:"Language in Finland ↗",
      everydayKicker:"MAKE THE COUNTRY USEFUL",everydayTitle:"Take your next step in Finland.",everydayIntro:"Go deeper into the parts of everyday life you want to learn about.",travelTitle:"Travel & transport",travelText:"Check current train times and plan a route.",travelLink:"VR timetables ↗",studyTitle:"Study in Finland",studyText:"Explore admissions, programmes and campus life.",studyLink:"Kielo study guide ↗",workTitle:"Work in Finland",workText:"Understand job-search routes and working life.",workLink:"Kielo work guide ↗",homeTitle:"Make a home here",homeText:"Compare renting, student homes, buying and building.",homeLink:"Kielo housing guide ↗",learnKicker:"LEARN THE WORDS IN CONTEXT",learnTitle:"Bring Finland into your Finnish.",learnText:"Explore culture, regions, nature and everyday Finnish with guided words, audio and practice.",learnButton:"Open the Finnish Explorer",
      sourceKicker:"TRUSTED STARTING POINTS",sourcesTitle:"Go straight to the official source.",sourcesIntro:"Dates, names and daily-service details can change. Follow the source for the latest information.",sourceStats:"Statistics Finland",sourceStatsText:"Population, regions and other statistics ↗",sourceHistory:"This is Finland",sourceHistoryText:"History, society and Finnish life ↗",sourceVisit:"Visit Finland",sourceVisitText:"Regions and destinations ↗",sourceNature:"Metsähallitus",sourceNatureText:"National parks and nature access ↗",sourceNote:"General introduction, not a live travel planner. Always check current local conditions, opening hours, routes and park guidance.",footerText:"Discover a place. Learn its words. Find your own way."
    },
    fi: {
      skip:"Siirry sisältöön",navHome:"Etusivu",navLearn:"Opiskele suomea",navWork:"Työ",navStudy:"Opiskelu",navHomeLife:"Löydä koti",navExplore:"Tutustu Suomeen",siteLanguage:"Sivuston kieli",
      heroKicker:"YKSI MAA, MONTA TARINAA",heroTitle:"Löydä oma Suomesi.",heroText:"Itämeren saarilta arktiseen pohjoiseen: tutustu Suomea muovaaviin paikkoihin, ihmisiin, vuodenaikoihin ja arkeen.",heroButton:"Tutustu 19 maakuntaan",historyButton:"Aloita historiasta",heroNote:"Selkeä opas luontoon, kulttuuriin ja arkeen – yksi pieni askel kerrallaan.",mapKicker:"SUOMI LYHYESTI",mapCaption:"Yksi maa · 19 maakuntaa",heroSticker:"SEURAAVA TARINA",firstFinnishWord:"Suomen sana",natureTranslation:"luonto · nature",
      populationLabel:"VÄESTÖ · VUODEN 2025 LOPPU",populationCaption:"asukasta Suomessa",regionsLabel:"MAAKUNTAA",regionsCaption:"viralliset tilastomaakunnat",languagesLabel:"KANSALLISKIELET",languagesCaption:"suomi ja ruotsi; saamen kielet ovat osa Suomen tarinaa",parksLabel:"KANSALLISPUISTOA · 2025",parksCaption:"suojeltuja luontokohteita",factSource:"Päivätyt luvut: Tilastokeskuksen väestö 31.12.2025 ja kansallispuistojen määrä 31.12.2025. Määritelmät ja päivitykset löytyvät virallisista lähteistä.",
      chapterRegions:"Maakunnat",chapterHistory:"Historia",chapterNature:"Luonto ja vuodenajat",chapterCulture:"Kulttuuri",chapterEveryday:"Arki Suomessa",regionKicker:"KARTTA · IHMISET · PAIKAT",regionsTitle:"Tutustu Suomeen maakunta kerrallaan.",regionsIntro:"Suomessa on maakuntia, ei osavaltioita. Etsi kaupunkia, selaa karttaa tai valitse sinua kiinnostava maisema.",searchLabel:"Hae maakuntaa tai kaupunkia",filterAll:"Kaikki 19",filterCity:"Kaupunki ja kampus",filterCoast:"Rannikko ja saaret",filterLake:"Järvet ja metsät",filterNorth:"Pohjoinen Suomi",mapSectionKicker:"SUOMEN KARTTA",mapInstruction:"Valitse maakunta kartalta",mapHelp:"Valitse kartan alue tai maakuntakortti saadaksesi lisätietoja.",mapLoading:"Ladataan Suomen karttaa…",mapLegend:"19 tilastomaakuntaa",mapSource:"Lähde: Tilastokeskus ↗",selectedKicker:"MAAKUNNAN TIEDOT",regionalPopulation:"VÄESTÖ · 31.12.2025",cityExamples:"ESIMERKKIKAUPUNKEJA",regionLearnLink:"Tutustu suomenkieliseen lukuun ↗",showingRegions:"Näytetään kaikki 19 maakuntaa",populationUnit:"Väestö · 2025",noRegions:"Hakua vastaavia maakuntia ei löytynyt.",resetRegions:"Näytä kaikki maakunnat",mapAttribution:"Nimet ja rajat noudattavat Tilastokeskuksen vuoden 2026 luokitusta. Väestö on vuoden 2025 lopun päivätty luku. Karttageometria: Tilastokeskuksen avoin GeoJSON, CC BY 4.0.",
      historyKicker:"LYHYT AIKAJANA",historyTitle:"Monta vaihetta muovasi yhtä maata.",historyIntro:"Alku Suomen historiaan: aiemmasta vallasta ja itsehallinnosta itsenäisyyteen ja nykyisiin kumppanuuksiin.",historySwedenTitle:"Osa Ruotsin valtakuntaa",historySwedenText:"Nykyisen Suomen aluetta hallittiin osana Ruotsia vuosisatojen ajan.",historyRussiaTitle:"Autonominen suuriruhtinaskunta",historyRussiaText:"Suomesta tuli Venäjän keisarikunnan suuriruhtinaskunta, joka kehitti omia instituutioitaan.",historyIndependenceTitle:"Itsenäisyys",historyIndependenceText:"Suomen eduskunta hyväksyi itsenäisyysjulistuksen.",historyRepublicTitle:"Tasavalta",historyRepublicText:"Itsenäisestä maasta tuli tasavalta uuden perustuslain myötä.",historyNowTitle:"Eurooppalaisia ja pohjoismaisia kumppanuuksia",historyNowText:"Suomi liittyi Euroopan unioniin vuonna 1995 ja Natoon vuonna 2023.",historySourceIntro:"Tutustu lähteisiin:",
      natureKicker:"MAA · VESI · VALO",natureTitle:"Vuodenajat muuttavat maan ilmettä.",natureIntro:"Etelärannikolta Lappiin kulkiessa valo, maisema ja arjen rytmi muuttuvat.",seasonWinter:"Talvi",seasonSpring:"Kevät",seasonSummer:"Kesä",seasonAutumn:"Syksy",seasonAtAGlance:"VUODENAIKA LYHYESTI",usefulFinnish:"HYÖDYLLINEN SUOMEN SANA",seasonNote:"Vuodenaikojen ajoitus ja päivänvalo vaihtelevat alueen ja vuoden mukaan. Nämä ovat yleisiä suuntaviivoja, eivät sääennuste.",forestTitle:"Metsäpolut",forestText:"Merkityt reitit, suot sekä mänty-, kuusi- ja koivumaisemat kutsuvat tutkimaan.",forestLink:"Suunnittele vastuullinen retki ↗",seaTitle:"Järvet, meri ja saaret",seaText:"Järvialueista Itämereen ja saaristoreitteihin: vesi kuuluu arkeen ja matkailuun.",seaLink:"Tutustu rannikkoon ja saaristoon ↗",parksTitle:"Luontoa kunnioittaen",parksText:"Jokaisenoikeudet sallivat monia ulkoiluaktiviteetteja, mutta niihin liittyy rajoituksia. Suojelualueilla on omat sääntönsä.",parksLink:"Lue ohjeet kansallispuistoista ↗",
      cultureKicker:"IHMISET · TAVAT · ARJEN HETKET",cultureTitle:"Kulttuuri näkyy yhteisissä pienissä hetkissä.",cultureIntro:"Suomalainen kulttuuri on monimuotoista ja muuttuu jatkuvasti. Nämä ovat lähtökohtia, eivät kaikkia ihmisiä koskevia sääntöjä.",saunaTitle:"Sauna ja rauhoittuminen",saunaText:"Paikka lämmitellä, rentoutua ja jutella kiireettä – tai nauttia mukavasta hiljaisuudesta.",saunaLink:"Saunan perusteet ↗",foodTitle:"Ruoka, kahvi ja tori",foodText:"Ruisleipä, marjat, sesongin raaka-aineet ja kahvitauot kohtaavat paikallisia ja kansainvälisiä ruokakulttuureja.",foodLink:"Ruoka ja tavat ↗",designTitle:"Muotoilu arjessa",designText:"Kirjastot, julkiset tilat ja käyttöesineet näyttävät, miten muotoilu sopii arjen rutiineihin.",designLink:"Tarinoita Suomesta ↗",conversationTitle:"Keskustelu ja hiljaisuus",conversationText:"Suora puhe ja tauot voivat tuntua luontevilta joissakin tilanteissa. Ihmiset ja tilanteet ovat erilaisia.",conversationLink:"Tavat ja käytöstavat ↗",celebrationsTitle:"Vuoden juhlat",celebrationsText:"Vappu, juhannus, itsenäisyyspäivä ja paikalliset tapahtumat tuovat omat ruokansa, sanansa ja perinteensä.",celebrationsLink:"Suomalaiset juhlapyhät ↗",languagesCultureTitle:"Kielet ja monet äänet",languagesCultureText:"Suomi ja ruotsi ovat kansalliskieliä. Saamen kielet ja muut äidinkielet kuuluvat myös Suomeen.",languageLink:"Kielet Suomessa ↗",
      everydayKicker:"TEE SUOMESTA KÄYTÄNNÖLLINEN",everydayTitle:"Ota seuraava askel Suomessa.",everydayIntro:"Tutustu tarkemmin arjen aiheisiin, joista haluat oppia.",travelTitle:"Matkustaminen ja liikenne",travelText:"Tarkista ajantasaiset junavuorot ja suunnittele reitti.",travelLink:"VR:n aikataulut ↗",studyTitle:"Opiskele Suomessa",studyText:"Tutustu hakemiseen, koulutusohjelmiin ja kampuselämään.",studyLink:"Kielon opinto-opas ↗",workTitle:"Työskentele Suomessa",workText:"Tutustu työnhaun reitteihin ja työelämään.",workLink:"Kielon työopas ↗",homeTitle:"Löydä koti täältä",homeText:"Vertaile vuokraamista, opiskelija-asuntoja, ostamista ja rakentamista.",homeLink:"Kielon asumisopas ↗",learnKicker:"OPI SANAT ASIAYHTEYDESSÄ",learnTitle:"Tuo Suomi osaksi suomen opiskelua.",learnText:"Tutustu kulttuuriin, maakuntiin, luontoon ja arjen suomeen sanojen, äänen ja harjoitusten avulla.",learnButton:"Avaa Suomen oppimispolku",
      sourceKicker:"LUOTETTAVAT LÄHTEET",sourcesTitle:"Siirry suoraan virallisiin lähteisiin.",sourcesIntro:"Päivät, nimet ja arjen palveluiden tiedot voivat muuttua. Tarkista ajantasaiset tiedot lähteestä.",sourceStats:"Tilastokeskus",sourceStatsText:"Väestö, maakunnat ja muut tilastot ↗",sourceHistory:"This is Finland",sourceHistoryText:"Historia, yhteiskunta ja suomalainen elämä ↗",sourceVisit:"Visit Finland",sourceVisitText:"Maakunnat ja matkakohteet ↗",sourceNature:"Metsähallitus",sourceNatureText:"Kansallispuistot ja luonnossa liikkuminen ↗",sourceNote:"Yleisesittely, ei reaaliaikainen matkaopas. Tarkista aina paikalliset olosuhteet, aukioloajat, reitit ja puistojen ohjeet.",footerText:"Löydä paikka. Opi sen sanat. Löydä oma tapasi."
    }
  };

  const regions = [
    {code:"MK01",en:"Uusimaa",fi:"Uusimaa",city:"Helsinki",cities:"Helsinki · Espoo · Vantaa",population:1799629,tags:["city","coast"],summary:{en:"Finland’s capital region brings together the country’s largest urban area, universities, public services and a busy southern coastline.",fi:"Suomen pääkaupunkiseudulla kohtaavat maan suurin kaupunkialue, yliopistot, julkiset palvelut ja vilkas etelärannikko."}},
    {code:"MK02",en:"Southwest Finland",fi:"Varsinais-Suomi",city:"Turku",cities:"Turku · Salo · Loimaa",population:497800,tags:["city","coast"],summary:{en:"A southwestern region shaped by the historic city of Turku, coastal communities and the island routes of the Archipelago Sea.",fi:"Lounais-Suomea muovaavat historiallinen Turku, rannikkoyhteisöt ja Saaristomeren saarten reitit."}},
    {code:"MK04",en:"Satakunta",fi:"Satakunta",city:"Pori",cities:"Pori · Rauma · Kankaanpää",population:210112,tags:["coast","lake"],summary:{en:"Western coastal towns, rivers and forested inland areas meet in this region around Pori and Rauma.",fi:"Länsirannikon kaupungit, joet ja metsäiset sisämaa-alueet kohtaavat Porin ja Rauman seudulla."}},
    {code:"MK05",en:"Kanta-Häme",fi:"Kanta-Häme",city:"Hämeenlinna",cities:"Hämeenlinna · Riihimäki · Forssa",population:168957,tags:["city","lake"],summary:{en:"A southern inland region of lake landscapes, historic sites and well-connected towns between larger urban centres.",fi:"Eteläisen sisämaan alue, jossa on järvimaisemia, historiallisia kohteita ja hyvien yhteyksien kaupunkeja."}},
    {code:"MK06",en:"Pirkanmaa",fi:"Pirkanmaa",city:"Tampere",cities:"Tampere · Nokia · Sastamala",population:548910,tags:["city","lake"],summary:{en:"Tampere anchors a growing urban region between lakes, with universities, culture and manufacturing across the wider area.",fi:"Tampere on kasvavan järvien välisen kaupunkiseudun keskus. Alueella on yliopistoja, kulttuuria ja teollisuutta."}},
    {code:"MK07",en:"Päijät-Häme",fi:"Päijät-Häme",city:"Lahti",cities:"Lahti · Heinola · Orimattila",population:204522,tags:["city","lake"],summary:{en:"Lake Päijänne, forests and the city of Lahti shape this southern lake district, with routes linking nearby regions.",fi:"Päijänne, metsät ja Lahden kaupunki muovaavat tätä eteläistä järvialuetta, josta on yhteyksiä lähialueille."}},
    {code:"MK08",en:"Kymenlaakso",fi:"Kymenlaakso",city:"Kotka",cities:"Kotka · Kouvola · Hamina",population:156198,tags:["coast"],summary:{en:"The Gulf of Finland coast, the Kymi River and forested inland towns give this southeastern region varied landscapes.",fi:"Suomenlahden rannikko, Kymijoki ja sisämaan metsäiset kaupungit tekevät kaakkoisesta alueesta monimuotoisen."}},
    {code:"MK09",en:"South Karelia",fi:"Etelä-Karjala",city:"Lappeenranta",cities:"Lappeenranta · Imatra · Savitaipale",population:124238,tags:["city","lake"],summary:{en:"The Saimaa lake system and the towns of Lappeenranta and Imatra are central to this southeastern region.",fi:"Saimaa ja Lappeenrannan sekä Imatran kaupungit ovat tämän kaakkoisen alueen keskeisiä piirteitä."}},
    {code:"MK10",en:"South Savo",fi:"Etelä-Savo",city:"Mikkeli",cities:"Mikkeli · Savonlinna · Pieksämäki",population:128144,tags:["lake"],summary:{en:"A lake-rich eastern region of islands, shorelines and smaller towns around Saimaa and its waterways.",fi:"Järvirikas itäinen alue, jossa on saaria, rantoja ja pienempiä kaupunkeja Saimaan ja vesireittien ympärillä."}},
    {code:"MK11",en:"North Savo",fi:"Pohjois-Savo",city:"Kuopio",cities:"Kuopio · Iisalmi · Varkaus",population:248512,tags:["city","lake"],summary:{en:"Kuopio is a regional hub surrounded by lakes, forests, food traditions and towns spread across North Savo.",fi:"Kuopio on alueellinen keskus, jota ympäröivät järvet, metsät, ruokaperinteet ja Pohjois-Savon kaupungit."}},
    {code:"MK12",en:"North Karelia",fi:"Pohjois-Karjala",city:"Joensuu",cities:"Joensuu · Kitee · Lieksa",population:161418,tags:["lake","north"],summary:{en:"Forests, lakes and the eastern borderland landscape frame Joensuu and communities across North Karelia.",fi:"Metsät, järvet ja itärajan maisemat ympäröivät Joensuuta ja Pohjois-Karjalan yhteisöjä."}},
    {code:"MK13",en:"Central Finland",fi:"Keski-Suomi",city:"Jyväskylä",cities:"Jyväskylä · Äänekoski · Jämsä",population:273731,tags:["city","lake"],summary:{en:"Jyväskylä’s university life, forested hills and the Lake Päijänne region meet in central Finland.",fi:"Jyväskylän yliopistoelämä, metsäiset harjut ja Päijänteen seutu kohtaavat Keski-Suomessa."}},
    {code:"MK14",en:"South Ostrobothnia",fi:"Etelä-Pohjanmaa",city:"Seinäjoki",cities:"Seinäjoki · Kauhava · Kurikka",population:189474,tags:["city"],summary:{en:"Open fields, rivers and lively town centres shape this western inland region around Seinäjoki.",fi:"Aukeat pellot, joet ja vilkkaat keskustat muovaavat Seinäjoen ympärillä olevaa läntistä sisämaa-aluetta."}},
    {code:"MK15",en:"Ostrobothnia",fi:"Pohjanmaa",city:"Vaasa",cities:"Vaasa · Pietarsaari · Närpiö",population:179555,tags:["city","coast"],summary:{en:"A bilingual coastal region with archipelago landscapes, Vaasa’s university and industry, and Swedish-speaking communities.",fi:"Kaksikielinen rannikkoalue, jossa on saaristomaisemia, Vaasan yliopisto ja teollisuutta sekä ruotsinkielisiä yhteisöjä."}},
    {code:"MK16",en:"Central Ostrobothnia",fi:"Keski-Pohjanmaa",city:"Kokkola",cities:"Kokkola · Kannus · Kaustinen",population:67498,tags:["coast"],summary:{en:"The coastal city of Kokkola and inland communities connect maritime history with music and local industry.",fi:"Rannikkokaupunki Kokkola ja sisämaan yhteisöt yhdistävät merenkulun historiaa, musiikkia ja paikallista teollisuutta."}},
    {code:"MK17",en:"North Ostrobothnia",fi:"Pohjois-Pohjanmaa",city:"Oulu",cities:"Oulu · Raahe · Kuusamo",population:417939,tags:["city","coast","north"],summary:{en:"Oulu is a major northern city; the region stretches from the Gulf of Bothnia coast toward forests, fells and Kuusamo.",fi:"Oulu on pohjoinen suurkaupunki. Maakunta ulottuu Pohjanlahden rannikolta kohti metsiä, tuntureita ja Kuusamoa."}},
    {code:"MK18",en:"Kainuu",fi:"Kainuu",city:"Kajaani",cities:"Kajaani · Kuhmo · Sotkamo",population:69193,tags:["lake","north"],summary:{en:"A sparsely settled inland region of forests, lakes, outdoor routes and towns such as Kajaani, Kuhmo and Sotkamo.",fi:"Harvaan asuttu sisämaa-alue, jossa on metsiä, järviä, ulkoilureittejä sekä Kajaanin, Kuhmon ja Sotkamon kaltaisia kaupunkeja."}},
    {code:"MK19",en:"Lapland",fi:"Lappi",city:"Rovaniemi",cities:"Rovaniemi · Inari · Kemi",population:176215,tags:["north"],summary:{en:"Finland’s northernmost region spans Arctic landscapes, Sámi homelands, fells and long distances between communities.",fi:"Suomen pohjoisin maakunta kattaa arktisia maisemia, saamelaisten kotiseutualueita, tuntureita ja pitkiä välimatkoja."}},
    {code:"MK21",en:"Åland",fi:"Ahvenanmaa",city:"Mariehamn",cities:"Mariehamn · Jomala · Eckerö",population:30836,tags:["coast"],summary:{en:"An autonomous, Swedish-speaking island region in the Baltic, where ferries, maritime life and local services shape daily routines.",fi:"Itsehallinnollinen ruotsinkielinen saaristoalue Itämerellä, jossa lautat, merenkulku ja paikalliset palvelut rytmittävät arkea."}}
  ];

  const seasons = {
    winter:{en:{title:"Winter · talvi",text:"Snow and short daylight hours are part of winter in many places. Conditions differ between the south and north, so check local travel information.",word:"lumi",meaning:"snow",phrase:"Talvella sataa lunta.",translation:"It snows in winter.",icon:"❄",background:"linear-gradient(180deg,#c8e0ed 0 58%,#e4ece9 58% 65%,#b9ccce 65%)"},fi:{title:"Talvi · winter",text:"Lumi ja lyhyet valoisat tunnit kuuluvat talveen monilla alueilla. Olosuhteet vaihtelevat etelän ja pohjoisen välillä, joten tarkista paikalliset matkustustiedot.",word:"lumi",meaning:"snow",phrase:"Talvella sataa lunta.",translation:"Talvella sataa lunta.",icon:"❄",background:"linear-gradient(180deg,#c8e0ed 0 58%,#e4ece9 58% 65%,#b9ccce 65%)"}},
    spring:{en:{title:"Spring · kevät",text:"Daylight returns, snow melts at different times and migratory birds come back. Spring can feel very different in coastal Helsinki and northern Lapland.",word:"kevät",meaning:"spring",phrase:"Kevät tulee pian.",translation:"Spring is coming soon.",icon:"✿",background:"linear-gradient(180deg,#b9dce8 0 58%,#dce9c9 58% 65%,#9bb98d 65%)"},fi:{title:"Kevät · spring",text:"Valoisa aika pitenee, lumi sulaa eri aikaan ja muuttolinnut palaavat. Kevät tuntuu erilaiselta Helsingin rannikolla ja pohjoisessa Lapissa.",word:"kevät",meaning:"spring",phrase:"Kevät tulee pian.",translation:"Kevät tulee pian.",icon:"✿",background:"linear-gradient(180deg,#b9dce8 0 58%,#dce9c9 58% 65%,#9bb98d 65%)"}},
    summer:{en:{title:"Summer · kesä",text:"Long evenings invite time outdoors. In the far north the sun stays above the horizon for a period around midsummer; exact daylight depends on place and date.",word:"kesä",meaning:"summer",phrase:"Kesällä aurinko paistaa.",translation:"The sun shines in summer.",icon:"☼",background:"linear-gradient(180deg,#9fcfe0 0 58%,#dce8be 58% 65%,#80a46f 65%)"},fi:{title:"Kesä · summer",text:"Pitkät illat houkuttelevat ulos. Pohjoisessa aurinko pysyy horisontin yläpuolella jonkin aikaa juhannuksen ympärillä; tarkka valoisa aika riippuu paikasta ja päivästä.",word:"kesä",meaning:"summer",phrase:"Kesällä aurinko paistaa.",translation:"Kesällä aurinko paistaa.",icon:"☼",background:"linear-gradient(180deg,#9fcfe0 0 58%,#dce8be 58% 65%,#80a46f 65%)"}},
    autumn:{en:{title:"Autumn · syksy",text:"The light changes, forests turn colourful and evenings grow darker. Local harvests and weather vary across Finland’s regions.",word:"syksy",meaning:"autumn",phrase:"Syksyllä lehdet putoavat.",translation:"Leaves fall in autumn.",icon:"◌",background:"linear-gradient(180deg,#b9ced4 0 58%,#e4d8b6 58% 65%,#a67854 65%)"},fi:{title:"Syksy · autumn",text:"Valo muuttuu, metsät saavat syysvärit ja illat pimenevät. Sadonkorjuu ja sää vaihtelevat Suomen eri maakunnissa.",word:"syksy",meaning:"autumn",phrase:"Syksyllä lehdet putoavat.",translation:"Syksyllä lehdet putoavat.",icon:"◌",background:"linear-gradient(180deg,#b9ced4 0 58%,#e4d8b6 58% 65%,#a67854 65%)"}}
  };

  let number = new Intl.NumberFormat("en-US");
  const assetBase = location.pathname.includes("/docs/") ? "../public/" : "./";
  let language = localStorage.getItem("kielo-site-language-v1") === "fi" ? "fi" : "en";
  let activeFilter = "all";
  let activeRegion = "MK01";
  let activeSeason = "winter";
  let mapFeatures = [];

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

  function translatePage() {
    const dict = copy[language];
    number = new Intl.NumberFormat(language === "fi" ? "fi-FI" : "en-US");
    document.documentElement.lang = language;
    document.title = language === "fi" ? "Tutustu Suomeen · Kielo" : "Explore Finland · Kielo";
    $$('[data-i18n]').forEach(node => {
      const value = dict[node.dataset.i18n];
      if (value) node.textContent = value;
    });
    const search = $("#region-search");
    if (search) search.placeholder = language === "fi" ? "Kokeile: Lappi, Uusimaa tai Tampere" : "Try Lapland, Lappi or Tampere";
    const searchLabel = language === "fi" ? "Hae maakuntaa tai kaupunkia" : "Search a region or city";
    search?.setAttribute("aria-label", searchLabel);
    $("#clear-search")?.setAttribute("aria-label", language === "fi" ? "Tyhjennä haku" : "Clear search");
    $("#region-filters")?.setAttribute("aria-label", language === "fi" ? "Suodata maakuntia" : "Filter regions");
    $("#region-map")?.setAttribute("aria-label", language === "fi" ? "Suomen 19 maakunnan kartta" : "Interactive map of Finland’s 19 regions");
    $("#season-tabs")?.setAttribute("aria-label", language === "fi" ? "Valitse vuodenaika" : "Choose a season");
    $("#mobile-nav")?.setAttribute("aria-label", language === "fi" ? "Päänavigaatio" : "Main navigation");
    const menuButton = $("#menu-toggle");
    menuButton?.setAttribute("aria-label", language === "fi" ? "Avaa valikko" : "Open menu");
    $("#site-language")?.setAttribute("aria-label", language === "fi" ? "Sivuston kieli" : "Site language");
    renderRegions();
    updateRegionDetail();
    updateSeason(activeSeason);
  }

  function regionName(region) { return language === "fi" ? region.fi : region.en; }
  function matchesRegion(region) {
    const query = $("#region-search")?.value.trim().toLocaleLowerCase(language) || "";
    const candidate = `${region.en} ${region.fi} ${region.city} ${region.cities}`.toLocaleLowerCase(language);
    return (!query || candidate.includes(query)) && (activeFilter === "all" || region.tags.includes(activeFilter));
  }

  function renderRegions() {
    const visible = regions.filter(matchesRegion);
    const grid = $("#region-grid");
    if (!grid) return;
    // Region codes are official identifiers (for example, Åland is MK21), not list positions.
    // Keep the visible labels as an easy-to-follow 01–19 sequence while retaining codes in data-code.
    grid.innerHTML = visible.map(region => {
      const serial = String(regions.indexOf(region) + 1).padStart(2, "0");
      return `<button class="region-card${region.code === activeRegion ? " is-selected" : ""}" type="button" data-code="${region.code}" aria-pressed="${region.code === activeRegion}" aria-label="${escapeHtml(regionName(region))}, ${escapeHtml(region.city)}, ${language === "fi" ? "väkiluku" : "population"} ${number.format(region.population)}"><span class="region-flag" aria-hidden="true">${serial}</span><span class="region-copy"><b>${escapeHtml(regionName(region))}</b><span>${escapeHtml(region.city)}</span><small>${number.format(region.population)} · 2025</small></span><span class="region-arrow" aria-hidden="true">↗</span></button>`;
    }).join("");
    $("#no-regions").hidden = visible.length > 0;
    $("#region-count").textContent = language === "fi" ? `Näytetään ${visible.length} / 19 maakuntaa` : visible.length === 19 ? "Showing all 19 regions" : `Showing ${visible.length} of 19 regions`;
    $$(".region-shape", $("#region-map") || document).forEach(path => {
      const region = regions.find(item => item.code === path.dataset.code);
      const shown = region && matchesRegion(region);
      path.classList.toggle("is-filtered-out", !shown);
      path.setAttribute("aria-hidden", String(!shown));
      path.setAttribute("tabindex", shown ? "0" : "-1");
    });
  }

  function updateRegionDetail() {
    const region = regions.find(item => item.code === activeRegion) || regions[0];
    $("#selected-name").textContent = regionName(region);
    $("#selected-fi").textContent = region.fi;
    $("#selected-summary").textContent = region.summary[language];
    $("#selected-population").textContent = number.format(region.population);
    $("#selected-cities").textContent = region.cities;
    $$(".region-card").forEach(card => {
      const selected = card.dataset.code === region.code;
      card.classList.toggle("is-selected", selected);
      card.setAttribute("aria-pressed", String(selected));
    });
    $$(".region-shape").forEach(path => {
      const selected = path.dataset.code === region.code;
      path.classList.toggle("is-selected", selected);
      path.setAttribute("aria-pressed", String(selected));
    });
    const link = $("#selected-explore");
    if (link) link.href = language === "fi" ? "./learn.html?open=culture" : "./learn.html?open=culture";
  }

  function selectRegion(code) {
    if (!regions.some(region => region.code === code)) return;
    activeRegion = code;
    renderRegions();
    updateRegionDetail();
  }

  function createMapPaths() {
    if (!mapFeatures.length) return;
    const projected = mapFeatures.map(feature => {
      const code = `MK${String(feature.properties.maakunta).padStart(2, "0")}`;
      const geometry = feature.geometry;
      const polygons = geometry.type === "MultiPolygon" ? geometry.coordinates : [geometry.coordinates];
      const rings = polygons.map(polygon => polygon[0]).filter(Boolean).map(ring => {
        const limit = 65;
        const step = Math.max(1, Math.ceil(ring.length / limit));
        const points = ring.filter((_, index) => index % step === 0);
        if (points[points.length - 1] !== ring[ring.length - 1]) points.push(ring[ring.length - 1]);
        return points.map(([lon, lat]) => [lon * Math.cos(64 * Math.PI / 180), -lat]);
      });
      return {code, rings};
    });
    const allPoints = projected.flatMap(item => item.rings.flat());
    const xs = allPoints.map(point => point[0]), ys = allPoints.map(point => point[1]);
    const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
    const width = 420, height = 460, pad = 20;
    const scale = Math.min((width - pad * 2) / (maxX - minX), (height - pad * 2) / (maxY - minY));
    const offX = (width - (maxX - minX) * scale) / 2;
    const offY = (height - (maxY - minY) * scale) / 2;
    const draw = ({rings}) => rings.map(ring => ring.map(([x, y], i) => `${i ? "L" : "M"}${(offX + (x - minX) * scale).toFixed(1)},${(offY + (y - minY) * scale).toFixed(1)}`).join(" ") + "Z").join(" ");
    const shapeHtml = projected.map(item => {
      const region = regions.find(entry => entry.code === item.code);
      if (!region) return "";
      const title = `${regionName(region)} · ${region.city}`;
      return `<path class="region-shape${item.code === activeRegion ? " is-selected" : ""}" data-code="${item.code}" d="${draw(item)}" role="button" tabindex="0" aria-label="${escapeHtml(title)}" aria-pressed="${item.code === activeRegion}"><title>${escapeHtml(title)}</title></path>`;
    }).join("");
    const svgMarkup = `<svg viewBox="0 0 ${width} ${height}" role="group" aria-label="Finland regions">${shapeHtml}</svg>`;
    const mainMap = $("#region-map");
    if (mainMap) mainMap.innerHTML = svgMarkup;
    const heroMap = $("#hero-map");
    if (heroMap) heroMap.innerHTML = shapeHtml.replaceAll('role="button" tabindex="0"', "").replaceAll('aria-pressed="true"', "").replaceAll('aria-pressed="false"', "");
    renderRegions();
    updateRegionDetail();
  }

  function updateSeason(season) {
    if (!seasons[season]) return;
    activeSeason = season;
    const data = seasons[season][language];
    $$("[data-season]").forEach(tab => tab.setAttribute("aria-selected", String(tab.dataset.season === season)));
    $("#season-title").textContent = data.title;
    $("#season-copy").textContent = data.text;
    $("#season-word").textContent = data.word;
    $("#season-meaning").textContent = data.meaning;
    $("#season-phrase").textContent = data.phrase;
    $(".season-icon").textContent = data.icon;
    $("#season-illustration").style.background = data.background;
    const phrase = $("#season-phrase");
    phrase?.setAttribute("aria-label", `${data.phrase} ${data.translation}`);
  }

  function bindInteractions() {
    $("#site-language")?.addEventListener("change", event => {
      language = event.target.value === "fi" ? "fi" : "en";
      localStorage.setItem("kielo-site-language-v1", language);
      translatePage();
      createMapPaths();
    });
    $("#region-search")?.addEventListener("input", event => {
      $("#clear-search").hidden = !event.target.value;
      renderRegions();
    });
    $("#clear-search")?.addEventListener("click", () => {
      $("#region-search").value = "";
      $("#clear-search").hidden = true;
      renderRegions();
      $("#region-search").focus();
    });
    $("#region-filters")?.addEventListener("click", event => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      activeFilter = button.dataset.filter;
      $$("[data-filter]", $("#region-filters")).forEach(chip => {
        const selected = chip === button;
        chip.classList.toggle("selected", selected);
        chip.setAttribute("aria-pressed", String(selected));
      });
      renderRegions();
    });
    $("#reset-regions")?.addEventListener("click", () => {
      activeFilter = "all";
      $("#region-search").value = "";
      $("#clear-search").hidden = true;
      $$("[data-filter]", $("#region-filters")).forEach(chip => {
        const selected = chip.dataset.filter === "all";
        chip.classList.toggle("selected", selected);
        chip.setAttribute("aria-pressed", String(selected));
      });
      renderRegions();
    });
    $("#region-grid")?.addEventListener("click", event => {
      const card = event.target.closest("[data-code]");
      if (card) selectRegion(card.dataset.code);
    });
    $("#region-map")?.addEventListener("click", event => {
      const path = event.target.closest(".region-shape");
      if (path) selectRegion(path.dataset.code);
    });
    $("#region-map")?.addEventListener("keydown", event => {
      const path = event.target.closest(".region-shape");
      if (path && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        selectRegion(path.dataset.code);
      }
    });
    $("#season-tabs")?.addEventListener("click", event => {
      const tab = event.target.closest("[data-season]");
      if (tab) updateSeason(tab.dataset.season);
    });
    const menuButton = $("#menu-toggle"), mobileNav = $("#mobile-nav");
    menuButton?.addEventListener("click", () => {
      const open = !mobileNav.classList.contains("open");
      mobileNav.classList.toggle("open", open);
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute("aria-label", language === "fi" ? (open ? "Sulje valikko" : "Avaa valikko") : (open ? "Close menu" : "Open menu"));
      menuButton.textContent = open ? "×" : "☰";
    });
    mobileNav?.addEventListener("click", event => {
      if (event.target.closest("a")) {
        mobileNav.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");
        if (menuButton) menuButton.textContent = "☰";
      }
    });
    document.addEventListener("keydown", event => {
      if (event.key === "Escape" && mobileNav?.classList.contains("open")) {
        mobileNav.classList.remove("open");
        menuButton?.setAttribute("aria-expanded", "false");
        menuButton?.focus();
      }
    });
  }

  async function init() {
    const picker = $("#site-language");
    if (picker) picker.value = language;
    bindInteractions();
    translatePage();
    try {
      const response = await fetch(`${assetBase}data/finland-regions-2026.geojson`);
      if (!response.ok) throw new Error(`Map data request returned ${response.status}`);
      const geojson = await response.json();
      mapFeatures = geojson.features || [];
      createMapPaths();
    } catch (error) {
      console.error("Could not load the Finland regions map", error);
      const map = $("#region-map");
      if (map) map.innerHTML = `<p class="map-loading">${language === "fi" ? "Kartta ei latautunut. Voit silti selata maakuntaluetteloa." : "The map could not load. You can still browse the region directory."}</p>`;
    }
  }

  init();
})();
