(function () {
  "use strict";

  const LANGUAGE_KEY = "kielo-site-language-v1";
  const routeMessages = {
    en: {
      university: "<strong>Typical fit:</strong> you enjoy research, theory or a future PhD. University Bachelor's degrees are commonly 3 years; Master's degrees commonly 2 years; doctoral studies commonly around 4 years.",
      uas: "<strong>Typical fit:</strong> you want applied projects and a career-oriented degree. UAS Bachelor's degrees commonly take 3.5–4.5 years; UAS Master's degrees commonly 1–1.5 years and require relevant work experience."
    },
    fi: {
      university: "<strong>Tyypillinen valinta:</strong> tutkimus, teoria tai tohtoriopinnot kiinnostavat sinua. Yliopiston kandidaatin tutkinto kestää tavallisesti 3 vuotta, maisterin tutkinto 2 vuotta ja tohtoriopinnot noin 4 vuotta.",
      uas: "<strong>Tyypillinen valinta:</strong> haluat käytännön projekteja ja työelämälähtöisen tutkinnon. AMK-tutkinto kestää tavallisesti 3,5–4,5 vuotta. YAMK-tutkinto kestää yleensä 1–1,5 vuotta ja edellyttää soveltuvaa työkokemusta."
    }
  };

  const copy = {
    fi: {
      "Skip to content": "Siirry sisältöön",
      "FINLAND, WITH YOU": "SUOMI, KANSSASI",
      Home: "Etusivu",
      "Learn Finnish": "Opiskele suomea",
      Work: "Työ",
      Study: "Opinnot",
      "Explore Finland": "Tutustu Suomeen",
      "Site language": "Sivuston kieli",
      "PLAN · COMPARE · APPLY": "SUUNNITTELE · VERTAILE · HAE",
      "Your study path starts here.": "Opintopolkusi alkaa tästä.",
      "Explore Finnish universities, understand admissions, plan the real costs, and move forward with trusted official links.": "Tutustu suomalaisiin korkeakouluihin, ymmärrä hakuprosessia ja suunnittele kustannuksia luotettavien virallisten lähteiden avulla.",
      "Build my study plan →": "Laadi opintosuunnitelma →",
      "Browse official programmes ↗": "Selaa virallisia koulutuksia ↗",
      "Clear guidance for international applicants and students already studying in Finland.": "Selkeää opastusta kansainvälisille hakijoille ja Suomessa jo opiskeleville.",
      "universities + UAS": "yliopistoa + AMK:ta",
      "English-taught Bachelor's and Master's programmes": "englanninkielistä kandi- ja maisteriohjelmaa",
      "studyat your pace": "opiskele omaan tahtiisi",
      "A new chapter · Suomi": "Uusi luku · Suomi",
      "recognised higher-education institutions": "tunnustettua korkeakoulua",
      "regions to explore — Finland has regions, not states": "aluetta — Suomessa on maakuntia, ei osavaltioita",
      "ECTS credits in a typical full-time study year": "ECTS-opintopistettä tavallisena kokopäiväisen opiskelun vuonna",
      "Bachelor · Master's · Doctoral": "Kandidaatti · Maisteri · Tohtori",
      "FIRST, CHOOSE THE LEARNING STYLE": "VALITSE ENSIN OPISKELUTAPA",
      "University or UAS?": "Yliopisto vai ammattikorkeakoulu?",
      "Both are higher education. The right choice depends on the programme, the way you want to learn, and your next goal.": "Molemmat ovat korkeakouluja. Sopiva vaihtoehto riippuu koulutuksesta, opiskelutavastasi ja tavoitteestasi.",
      "Research-led university": "Tutkimuspainotteinen yliopisto",
      "Academic study, research and a pathway to doctoral studies. Compare exact degree options and language of instruction.": "Akateemista opiskelua ja tutkimusta sekä mahdollisuus jatkaa tohtoriopintoihin. Vertaile tutkintoja ja opetuskieltä.",
      "Practice-oriented UAS": "Käytännönläheinen ammattikorkeakoulu",
      "Professional higher education, applied projects and close links with working life.": "Työelämälähtöistä korkeakoulutusta, soveltavia projekteja ja tiivistä yhteistyötä työelämän kanssa.",
      "Bachelor · eligibility from upper secondary": "Kandidaatti · kelpoisuus toisen asteen jälkeen",
      "Master's · relevant Bachelor's degree": "Maisteri · soveltuva kandidaatin tutkinto",
      "UAS Master's · usually 2 years' relevant work experience": "YAMK · yleensä 2 vuotta soveltuvaa työkokemusta",
      "Doctoral · research proposal + university-specific admission": "Tohtori · tutkimussuunnitelma ja yliopistokohtainen haku",
      "Tuition note: fee rules depend on citizenship, residence status, programme language and other exemptions. Doctoral programmes and Finnish/Swedish-taught degrees do not charge tuition under current Study in Finland guidance. Always check your programme's current fee page.": "Lukukausimaksut riippuvat kansalaisuudesta, oleskeluluvasta, opetuskielestä ja mahdollisista poikkeuksista. Study in Finland -ohjeen mukaan tohtoriohjelmissa ja suomen- tai ruotsinkielisissä tutkinto-ohjelmissa ei peritä lukukausimaksua. Tarkista aina oman koulutuksesi ajantasaiset maksut.",
      "Compare all recognised institutions": "Vertaile kaikkia tunnustettuja korkeakouluja",
      "13 universities and 22 universities of applied sciences (UAS), listed by the Finnish National Agency for Education.": "Opetushallituksen listalla on 13 yliopistoa ja 22 ammattikorkeakoulua.",
      "Browse the official directory ↗": "Selaa virallista hakemistoa ↗",
      "A SIMPLE ROUTE THROUGH ADMISSIONS": "SELKEÄ REITTI HAKUPROSESSISSA",
      "Five steps from search to start": "Viisi askelta koulutuksen etsimisestä opintojen alkuun",
      "Exact eligibility, documents and dates belong to each programme. Use the national portal and the university's own admissions page together.": "Kelpoisuus, asiakirjat ja päivämäärät ovat koulutuskohtaisia. Käytä sekä kansallista hakupalvelua että korkeakoulun hakusivuja.",
      "Choose a programme": "Valitse koulutus",
      "Compare subject, degree level, language, location and career fit.": "Vertaile alaa, tutkintotasoa, opetuskieltä, sijaintia ja uratavoitteita.",
      "Open Studyinfo ↗": "Avaa Studyinfo ↗",
      "Check eligibility": "Tarkista hakukelpoisuus",
      "Review accepted previous education, language proof and required documents.": "Tarkista hyväksyttävä aiempi koulutus, kielitodistus ja vaaditut asiakirjat.",
      "Apply on time": "Hae ajoissa",
      "Joint, separate and rolling applications can use different dates and selection steps.": "Yhteishauilla, erillishauilla ja jatkuvalla haulla voi olla eri päivämäärät ja valintatavat.",
      "Plan the full budget": "Suunnittele kokonaisbudjetti",
      "Check tuition, scholarships, living costs and any application fee before accepting.": "Tarkista lukukausimaksut, apurahat, elinkustannukset ja mahdollinen hakemusmaksu ennen paikan vastaanottamista.",
      "Confirm and prepare": "Vahvista paikka ja valmistaudu",
      "Accept the offer by its deadline; then check residence permit, insurance and housing.": "Ota opiskelupaikka vastaan määräaikaan mennessä. Selvitä sitten oleskelulupa, vakuutus ja asuminen.",
      "Permit guide ↗": "Oleskelulupaopas ↗",
      "Application timing: Many English-taught programmes for an autumn start use a January joint application, but other programmes have their own dates or rolling admissions. Always check the exact intake on Studyinfo.fi. An application fee may apply to applicants from outside the EU/EEA and Switzerland.": "Hakuajat: moniin syksyllä alkaviin englanninkielisiin koulutuksiin haetaan tammikuun yhteishaussa. Muilla koulutuksilla voi olla erillinen tai jatkuva haku. Tarkista tarkka hakuaika Studyinfo.fi-palvelusta. EU- ja ETA-alueen sekä Sveitsin ulkopuolelta hakevilta voidaan periä hakemusmaksu.",
      "DOCUMENTS TO PREPARE": "VALMISTELE ASIAKIRJAT",
      "Start collecting these early": "Aloita näiden kokoaminen ajoissa",
      "The exact list changes by programme. A translator, test provider or admissions office may have specific requirements.": "Tarkka luettelo vaihtelee koulutuksittain. Käännöksille ja kielikokeille voi olla omat vaatimuksensa.",
      "Passport / identity document": "Passi tai henkilöllisyystodistus",
      "Diploma and transcript": "Tutkintotodistus ja opintosuoritusote",
      "Official translations, if needed": "Viralliset käännökset tarvittaessa",
      "Accepted English-language proof": "Hyväksytty englannin kielen todistus",
      "CV and work certificates for relevant UAS Master's applications": "Ansioluettelo ja työtodistukset soveltuviin YAMK-hakuihin",
      "Portfolio, SAT or interview, if required by the programme": "Portfolio, SAT-tulos tai haastattelu, jos koulutus niitä edellyttää",
      "PLAN BEFORE YOU COMMIT": "SUUNNITTELE ENNEN PÄÄTÖSTÄ",
      "Make the costs easier to see": "Tee kustannuksista helpommin hahmotettavat",
      "Use this estimate to compare a scenario. It is not a university quote, scholarship offer, or Migri funds calculation.": "Käytä arviota eri vaihtoehtojen vertailuun. Se ei ole korkeakoulun tarjous, apurahapäätös eikä Migrin vaatiman toimeentulon laskelma.",
      "EDIT THE EXAMPLE": "MUOKKAA ESIMERKKIÄ",
      "Your study budget, in one view": "Opintobudjetti yhdellä silmäyksellä",
      "Tuition varies by institution, programme, nationality and residence status. Living costs also depend on the city and your choices.": "Lukukausimaksut vaihtelevat korkeakoulun, koulutuksen, kansalaisuuden ja oleskeluluvan mukaan. Elinkustannuksiin vaikuttavat myös kaupunki ja omat valinnat.",
      "Tuition per year (€)": "Lukukausimaksu vuodessa (€)",
      "Living costs per month (€)": "Elinkustannukset kuukaudessa (€)",
      "Study duration (years)": "Opintojen kesto (vuotta)",
      "Application fee (€; enter 0 if not applicable)": "Hakemusmaksu (€; kirjoita 0, jos maksua ei sovelleta)",
      "3 years": "3 vuotta",
      "3.5 years": "3,5 vuotta",
      "4 years": "4 vuotta",
      "2 years": "2 vuotta",
      "1.5 years": "1,5 vuotta",
      "4.5 years": "4,5 vuotta",
      "Current Study in Finland guidance: for many fee-paying students from outside the EU/EEA and Switzerland, tuition is €9,000–€20,000/year; suggested living costs are €900–€1,200/month. Exemptions, actual fees and personal costs vary.": "Study in Finland -palvelun ajantasaisen ohjeen mukaan monien EU- ja ETA-alueen sekä Sveitsin ulkopuolelta tulevien maksavien opiskelijoiden lukukausimaksu on 9 000–20 000 €/vuosi. Suositellut elinkustannukset ovat 900–1 200 €/kk. Poikkeukset, todelliset maksut ja henkilökohtaiset menot vaihtelevat.",
      "ESTIMATED TOTAL · EDITABLE SCENARIO": "KOKONAISARVIO · MUOKATTAVA ESIMERKKI",
      "Tuition + living costs across the selected study duration, plus the application fee. Excludes travel, insurance, student healthcare and other personal costs.": "Lukukausimaksut ja elinkustannukset valitulta opiskeluajalta sekä hakemusmaksu. Ei sisällä matkoja, vakuutuksia, opiskeluterveydenhuoltoa tai muita henkilökohtaisia menoja.",
      "Estimated per year": "Arvio vuodessa",
      "Study duration": "Opintojen kesto",
      "Check official fees and living-cost guidance ↗": "Tarkista viralliset maksu- ja elinkustannusohjeet ↗",
      "MATCH A FIELD TO A PLACE": "YHDISTÄ ALA JA OPISKELUPAIKKA",
      "What would you like to study?": "Mitä haluaisit opiskella?",
      "These are starting points based on institutions' published subject areas, not a ranking. Check current English-taught programmes for your intake.": "Nämä ovat korkeakoulujen ilmoittamiin aloihin perustuvia lähtökohtia, eivät paremmuusjärjestys. Tarkista hakukautesi englanninkieliset koulutukset.",
      "Technology · ICT": "Teknologia · tieto- ja viestintätekniikka",
      "Build and research": "Rakenna ja tutki",
      "Compare computing, engineering, data, energy and technology programmes.": "Vertaile tietojenkäsittelyä, tekniikkaa, dataa, energiaa ja teknologiaa.",
      "Business · economics": "Liiketoiminta · taloustiede",
      "Learn how organisations grow": "Opiskele organisaatioiden kehittämistä",
      "Explore business, economics, entrepreneurship, hospitality and international management.": "Tutustu liiketoimintaan, taloustieteeseen, yrittäjyyteen, matkailu- ja ravintola-alaan sekä kansainväliseen johtamiseen.",
      "Health · welfare": "Terveys · hyvinvointi",
      "Support people and wellbeing": "Tue ihmisiä ja hyvinvointia",
      "Compare health, nursing, social services and public-health options; language requirements can be strict.": "Vertaile terveysalaa, hoitotyötä, sosiaalipalveluja ja kansanterveyttä. Kielivaatimukset voivat olla tiukat.",
      "Education · society": "Koulutus · yhteiskunta",
      "Understand people and systems": "Ymmärrä ihmisiä ja järjestelmiä",
      "Explore education, social sciences, policy, law and public services.": "Tutustu kasvatustieteisiin, yhteiskuntatieteisiin, politiikkaan, oikeustieteeseen ja julkisiin palveluihin.",
      "Arts · design": "Taide · muotoilu",
      "Make ideas visible": "Tee ideoista näkyviä",
      "Look at art, architecture, media, music, design and creative practice.": "Tutustu taiteeseen, arkkitehtuuriin, mediaan, musiikkiin, muotoiluun ja luovaan työhön.",
      "Nature · sustainability": "Luonto · kestävyys",
      "Work with living systems": "Työskentele elävien järjestelmien parissa",
      "Explore environmental science, forestry, food systems, climate and sustainability.": "Tutustu ympäristötieteisiin, metsätalouteen, ruokajärjestelmiin, ilmastoon ja kestävyyteen.",
      "Institution examples are not a claim that every field is available in English. Use Studyinfo and each school's current admissions pages to verify.": "Korkeakouluesimerkit eivät tarkoita, että kaikkia aloja opetetaan englanniksi. Tarkista koulutukset Studyinfosta ja korkeakoulun hakusivuilta.",
      "Looking for the “best” university? Start with your subject and the actual degree programme. Compare teaching style, language, entry requirements, research/practice fit, costs and location. Rankings alone cannot tell you whether you meet the programme requirements.": "Etsitkö “parasta” yliopistoa? Aloita alasta ja tutkinto-ohjelmasta. Vertaile opetustapaa, kieltä, pääsyvaatimuksia, tutkimus- tai käytäntöpainotusta, kustannuksia ja sijaintia. Sijoituslista ei kerro, täytätkö hakukelpoisuusehdot.",
      "CHOOSE A PLACE THAT FITS YOU": "VALITSE SINULLE SOPIVA PAIKKA",
      "Study life across Finland": "Opiskelijaelämää eri puolilla Suomea",
      "Finland is divided into regions (maakunnat), not states. Compare a few well-known student hubs before widening the search.": "Suomi jakautuu maakuntiin, ei osavaltioihin. Vertaile ensin tunnettuja opiskelukaupunkeja ja laajenna hakua sitten.",
      "Lappeenranta & Lahti": "Lappeenranta ja Lahti",
      "Joensuu & Kuopio": "Joensuu ja Kuopio",
      "Finland's 19 regions: Åland · Central Finland · Central Ostrobothnia · Kainuu · Kanta-Häme · Kymenlaakso · Lapland · North Karelia · North Ostrobothnia · North Savo · Ostrobothnia · Päijät-Häme · Pirkanmaa · Satakunta · South Karelia · South Ostrobothnia · South Savo · Southwest Finland · Uusimaa.": "Suomen 19 maakuntaa: Ahvenanmaa · Etelä-Karjala · Etelä-Pohjanmaa · Etelä-Savo · Kainuu · Kanta-Häme · Keski-Pohjanmaa · Keski-Suomi · Kymenlaakso · Lappi · Pirkanmaa · Pohjanmaa · Pohjois-Karjala · Pohjois-Pohjanmaa · Pohjois-Savo · Päijät-Häme · Satakunta · Uusimaa · Varsinais-Suomi.",
      "How regional counts work: one institution may have campuses in several regions. Kielo distinguishes institution totals from campus totals; exact region-by-region counts will be added only after checking current official campus information. Browse the complete recognised-institution directory.": "Maakuntakohtaiset määrät: samalla korkeakoululla voi olla kampuksia useassa maakunnassa. Kielo erottaa korkeakoulujen ja kampusten määrät. Tarkat maakuntakohtaiset luvut julkaistaan vasta, kun viralliset kampustiedot on tarkistettu. Tutustu kaikkien tunnustettujen korkeakoulujen hakemistoon.",
      "Browse Finland's official institution directory ↗": "Selaa Suomen virallista korkeakouluhakemistoa ↗",
      "KEEP YOUR PREVIOUS LEARNING VISIBLE": "TUO AIEMMAT OPINTOSI NÄKYVIIN",
      "Credits, recognition and transfers": "Opintopisteet, tunnustaminen ja siirtyminen",
      "Moving between degree programmes can be possible, but it is never automatic. Ask the target institution before planning around transferred credits.": "Tutkinto-ohjelmasta toiseen siirtyminen voi olla mahdollista, mutta se ei tapahdu automaattisesti. Varmista vastaanottavalta korkeakoululta opintopisteiden hyväksilukeminen.",
      "ECTS": "op",
      "What does a credit mean?": "Mitä opintopiste tarkoittaa?",
      "A full-time academic year is typically 60 ECTS credits. Credits represent student workload. A Finnish institution decides how a course or prior learning fits a specific degree.": "Kokopäiväisen opiskelun vuosi on tavallisesti 60 ECTS-opintopistettä. Opintopiste kuvaa opiskelijan työmäärää. Suomalainen korkeakoulu päättää, miten aiempi kurssi tai osaaminen soveltuu tiettyyn tutkintoon.",
      "Read the national system guide ↗": "Lue kansallinen järjestelmäopas ↗",
      "Can I transfer credits or change universities?": "Voinko hyväksilukea opintoja tai vaihtaa yliopistoa?",
      "Sometimes. A transfer application may exist for a particular programme and intake. Conditions can include a current Finnish study right, completed credits, progress, language, available places and remaining study time.": "Joskus. Tietyssä koulutuksessa ja hakukohteessa voi olla siirtohaku. Ehtoihin voivat kuulua voimassa oleva suomalainen opiskeluoikeus, suoritetut opintopisteet, opintojen eteneminen, kielitaito, vapaa opiskelupaikka ja jäljellä oleva opiskeluaika.",
      "Ask the receiving programme about transfer eligibility and deadlines.": "Kysy vastaanottavalta koulutukselta siirtohaun kelpoisuudesta ja määräajoista.",
      "Prepare an official transcript, course descriptions and learning outcomes.": "Valmistele virallinen opintosuoritusote, kurssikuvaukset ja osaamistavoitteet.",
      "Request a written credit/RPL assessment; recognition is decided by the institution.": "Pyydä kirjallinen opintopisteiden tai aiemmin hankitun osaamisen arviointi. Korkeakoulu päättää hyväksilukemisesta.",
      "Check whether accepting a transfer changes your current study right.": "Tarkista, vaikuttaako siirron hyväksyminen nykyiseen opiskeluoikeuteesi.",
      "How academic recognition works ↗": "Näin opintojen tunnustaminen toimii ↗",
      "Important: If you are changing from a foreign institution, an assessment of your previous education for admission and the recognition of individual credits towards a degree are related but separate decisions.": "Tärkeää: ulkomaisesta korkeakoulusta siirtyessä aiemman koulutuksen arviointi hakukelpoisuutta varten ja yksittäisten opintopisteiden hyväksilukeminen tutkintoon ovat toisiinsa liittyviä mutta erillisiä päätöksiä.",
      "AFTER YOU RECEIVE AN OFFER": "KUN SAAT OPISKELUPAIKKATARJOUKSEN",
      "A calm checklist for the next steps": "Selkeä muistilista seuraaviin askeliin",
      "Rules depend on citizenship, residence status and programme. Use official sources for your personal case.": "Säännöt riippuvat kansalaisuudestasi, oleskeluluvastasi ja koulutuksesta. Tarkista oma tilanteesi virallisista lähteistä.",
      "Confirm your place": "Vahvista opiskelupaikka",
      "Read the offer carefully and accept before the stated deadline.": "Lue tarjous huolellisesti ja ota paikka vastaan ilmoitettuun määräaikaan mennessä.",
      "Review tuition and scholarship": "Tarkista lukukausimaksu ja apuraha",
      "Confirm amount, payment deadline, renewal rules and what a scholarship covers.": "Varmista summa, maksuaika, uusimisehdot ja apurahan kattavuus.",
      "Residence permit and insurance": "Oleskelulupa ja vakuutus",
      "Check current Migri requirements and apply early if you need a permit.": "Tarkista Migrin ajantasaiset ehdot ja hae lupaa ajoissa, jos tarvitset sen.",
      "Housing and arrival": "Asuminen ja saapuminen",
      "Ask the institution about student housing, orientation and local services.": "Kysy korkeakoululta opiskelija-asunnoista, perehdytyksestä ja paikallisista palveluista.",
      "Study language and support": "Opetuskieli ja tuki",
      "Ask what Finnish, Swedish or English is needed for your courses and placements.": "Selvitä, millaista suomen, ruotsin tai englannin taitoa kursseilla ja harjoittelussa tarvitaan.",
      "Keep your documents": "Säilytä asiakirjasi",
      "Store your admission, payment, education, transcript and identity documents safely.": "Säilytä turvallisesti hakemukseen, maksuun, koulutukseen, opintosuorituksiin ja henkilöllisyyteen liittyvät asiakirjat.",
      "WHEN YOU'RE READY": "KUN OLET VALMIS",
      "Find the programme that feels right.": "Löydä sinulle sopiva koulutus.",
      "Search current degree listings, read the exact eligibility criteria, and compare the official details before applying.": "Etsi ajantasaisia tutkinto-ohjelmia, lue tarkat hakukelpoisuusehdot ja vertaile virallisia tietoja ennen hakemista.",
      "Go to Studyinfo.fi ↗": "Siirry Studyinfo.fi-palveluun ↗",
      "Sources checked 4 November 2026: Finnish National Agency for Education (education system, ECTS, study recognition), Study in Finland (universities, admissions, tuition and living costs), Studyinfo.fi (programme listings), Finnish Immigration Service (residence permits). Dates, tuition and eligibility change by programme and intake.": "Lähteet tarkistettu 4.11.2026: Opetushallitus (koulutusjärjestelmä, ECTS ja opintojen tunnustaminen), Study in Finland (korkeakoulut, hakeminen ja kustannukset), Studyinfo.fi (koulutushaku) ja Maahanmuuttovirasto (oleskeluluvat). Hakuajat, maksut ja kelpoisuusehdot vaihtelevat koulutuksittain ja hakukausittain.",
      "Study with a clear plan. Find your way in Finland.": "Opiskele selkeällä suunnitelmalla. Löydä oma polkusi Suomessa.",
      "Credits: Leon Islam": "Tekijänoikeus: Leon Islam",
      "3 routes": "3 tutkintoreittiä",
      "study": "opiskele",
      "at your pace": "omaan tahtiisi",
      "Build my study plan": "Laadi opintosuunnitelma",
      "First, choose the learning style": "Valitse ensin opiskelutapa",
      "Tuition note:": "Lukukausimaksut:",
      "fee rules depend on citizenship, residence status, programme language and other exemptions. Doctoral programmes and Finnish/Swedish-taught degrees do not charge tuition under current Study in Finland guidance. Always check your programme's current fee page.": "maksusäännöt riippuvat kansalaisuudesta, oleskeluluvasta, opetuskielestä ja muista poikkeuksista. Tohtoriohjelmissa ja suomen- tai ruotsinkielisissä tutkinnoissa ei nykyisen Study in Finland -ohjeen mukaan peritä lukukausimaksua. Tarkista aina koulutuksesi ajantasaiset maksut.",
      "How regional counts work:": "Maakuntakohtaiset määrät:",
      "one institution may have campuses in several regions. Kielo distinguishes institution totals from campus totals; exact region-by-region counts will be added only after checking current official campus information. Browse the complete recognised-institution directory.": "samalla korkeakoululla voi olla kampuksia useassa maakunnassa. Kielo erottaa korkeakoulujen ja kampusten määrät. Tarkat luvut lisätään vasta virallisten kampustietojen tarkistamisen jälkeen. Tutustu kaikkien tunnustettujen korkeakoulujen hakemistoon.",
      "Application timing:": "Hakuajat:",
      "Many English-taught programmes for an autumn start use a January joint application, but other programmes have their own dates or rolling admissions. Always check the exact intake on Studyinfo.fi. An application fee may apply to applicants from outside the EU/EEA and Switzerland.": "moniin syksyllä alkaviin englanninkielisiin koulutuksiin haetaan tammikuun yhteishaussa, mutta muilla koulutuksilla voi olla erilliset ajat tai jatkuva haku. Tarkista tarkka hakuaika Studyinfo.fi-palvelusta. EU- ja ETA-alueen sekä Sveitsin ulkopuolelta hakevilta voidaan periä hakemusmaksu.",
      "Sources checked 4 November 2026:": "Lähteet tarkistettu 4.11.2026:",
      "Finnish National Agency for Education (education system, ECTS, study recognition), Study in Finland (universities, admissions, tuition and living costs), Studyinfo.fi (programme listings), Finnish Immigration Service (residence permits). Dates, tuition and eligibility change by programme and intake.": "Opetushallitus (koulutusjärjestelmä, ECTS ja opintojen tunnustaminen), Study in Finland (korkeakoulut, hakeminen ja kustannukset), Studyinfo.fi (koulutushaku) ja Maahanmuuttovirasto (oleskeluluvat). Hakuajat, maksut ja kelpoisuusehdot vaihtelevat koulutuksittain ja hakukausittain.",
      "Typical fit:": "Tyypillinen valinta:",
      "you enjoy research, theory or a future PhD. University Bachelor's degrees are commonly 3 years; Master's degrees commonly 2 years; doctoral studies commonly around 4 years.": "tutkimus, teoria tai tohtoriopinnot kiinnostavat sinua. Yliopiston kandidaatin tutkinto kestää tavallisesti 3 vuotta, maisterin tutkinto 2 vuotta ja tohtoriopinnot noin 4 vuotta.",
      "typical tuition €9,000–€20,000/year for many fee-paying English-taught degrees; recommended living budget €900–€1,200/month. Exemptions and programme fees vary.": "monien maksullisten englanninkielisten tutkintojen lukukausimaksu on 9 000–20 000 €/vuosi. Suositeltu elinkustannusbudjetti on 900–1 200 €/kk. Poikkeukset ja koulutusmaksut vaihtelevat.",
      "Scholarships:": "Apurahat:",
      "universities set their own eligibility, deadlines and scholarship conditions. Awards may reduce tuition, but do not assume they cover living expenses; check what the specific programme offers before making a budget.": "korkeakoulut päättävät itse apurahojen kelpoisuudesta, hakuajoista ja ehdoista. Apuraha voi pienentää lukukausimaksua, mutta älä oleta sen kattavan elinkustannuksia. Tarkista ohjelman ehdot ennen budjetin laatimista.",
      "Official scholarship guidance ↗": "Viralliset apurahaohjeet ↗",
      "Finland's 19 regions:": "Suomen 19 maakuntaa:",
      "Åland · Central Finland · Central Ostrobothnia · Kainuu · Kanta-Häme · Kymenlaakso · Lapland · North Karelia · North Ostrobothnia · North Savo · Ostrobothnia · Päijät-Häme · Pirkanmaa · Satakunta · South Karelia · South Ostrobothnia · South Savo · Southwest Finland · Uusimaa.": "Ahvenanmaa · Etelä-Karjala · Etelä-Pohjanmaa · Etelä-Savo · Kainuu · Kanta-Häme · Keski-Pohjanmaa · Keski-Suomi · Kymenlaakso · Lappi · Pirkanmaa · Pohjanmaa · Pohjois-Karjala · Pohjois-Pohjanmaa · Pohjois-Savo · Päijät-Häme · Satakunta · Uusimaa · Varsinais-Suomi.",
      "How regional counts work:": "Maakuntakohtaiset määrät:",
      "one institution may have campuses in several regions. Kielo distinguishes institution totals from campus totals; exact region-by-region counts will be added only after checking current official campus information. Browse the complete recognised-institution directory.": "samalla korkeakoululla voi olla kampuksia useassa maakunnassa. Kielo erottaa korkeakoulujen ja kampusten määrät. Tarkat maakuntakohtaiset luvut lisätään vasta virallisten kampustietojen tarkistamisen jälkeen. Selaa kaikkien tunnustettujen korkeakoulujen hakemistoa.",
      "Estimated total · editable scenario": "Kokonaisarvio · muokattava esimerkki",
      "Aalto · Tampere · Oulu · LUT · UAS network": "Aalto · Tampere · Oulu · LUT · AMK-verkosto",
      "Looking for the “best” university?": "Etsitkö sinulle sopivinta yliopistoa?",
      "Start with your subject and the actual degree programme. Compare teaching style, language, entry requirements, research/practice fit, costs and location. Rankings alone cannot tell you whether you meet the programme requirements.": "Aloita alasta ja tutkinto-ohjelmasta. Vertaile opetustapaa, kieltä, pääsyvaatimuksia, tutkimus- tai käytäntöpainotusta, kustannuksia ja sijaintia. Sijoituslista ei kerro, täytätkö ohjelman hakukelpoisuusehdot.",
      "Capital region · Aalto, University of Helsinki, Hanken and several UAS campuses.": "Pääkaupunkiseutu · Aalto-yliopisto, Helsingin yliopisto, Hanken ja useita AMK-kampuksia.",
      "Pirkanmaa · Tampere University and TAMK.": "Pirkanmaa · Tampereen yliopisto ja TAMK.",
      "Southwest Finland · University of Turku, Åbo Akademi and Turku UAS.": "Varsinais-Suomi · Turun yliopisto, Åbo Akademi ja Turun AMK.",
      "North Ostrobothnia · University of Oulu and Oulu UAS.": "Pohjois-Pohjanmaa · Oulun yliopisto ja Oulun AMK.",
      "Ostrobothnia · University of Vaasa, VAMK and campuses of other institutions.": "Pohjanmaa · Vaasan yliopisto, VAMK ja muiden korkeakoulujen kampuksia.",
      "South Karelia / Päijät-Häme · LUT and LAB campuses.": "Etelä-Karjala / Päijät-Häme · LUTin ja LABin kampuksia.",
      "North Karelia / North Savo · UEF, Karelia UAS and Savonia UAS.": "Pohjois-Karjala / Pohjois-Savo · UEF, Karelia AMK ja Savonia AMK.",
      "Lapland · University of Lapland and Lapland UAS.": "Lappi · Lapin yliopisto ja Lapin AMK.",
      "STUDY IS PART OF FINLAND'S STORY": "OPISKELU ON OSA SUOMEN TARINAA",
      "Get to know the country around your campus": "Tutustu kampuksesi ympärillä olevaan Suomeen",
      "Regions, languages, history and local culture shape everyday student life. Kielo's Finland Explorer connects those topics with useful Finnish words.": "Maakunnat, kielet, historia ja paikallinen kulttuuri vaikuttavat opiskelija-arkeen. Kielon Suomi-opas yhdistää nämä aiheet hyödyllisiin suomen sanoihin.",
      "Explore Finland's history and society": "Tutustu Suomen historiaan ja yhteiskuntaan",
      "Follow the regional and historical chapters in the Finland Explorer.": "Tutustu Suomi-oppaan alue- ja historiakokonaisuuksiin.",
      "Open Finland Explorer ↗": "Avaa Suomi-opas ↗",
      "Important:": "Tärkeää:",
      "If you are changing from a foreign institution, an assessment of your previous education for admission and the recognition of individual credits towards a degree are related but separate decisions.": "Jos siirryt ulkomaisesta korkeakoulusta, aiemman koulutuksen arviointi hakukelpoisuutta varten ja yksittäisten opintopisteiden hyväksilukeminen tutkintoon ovat toisiinsa liittyviä mutta erillisiä päätöksiä."
    }
  };

  function clean(value) {
    return value.replace(/\s+/g, " ").trim();
  }

  function setLanguage(language) {
    const lang = language === "fi" ? "fi" : "en";
    document.documentElement.lang = lang;
    document.querySelectorAll("#ui-language").forEach((control) => { control.value = lang; });
    const nodeOriginals = setLanguage.nodeOriginals ||= new WeakMap();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!nodeOriginals.has(node)) nodeOriginals.set(node, node.textContent);
      const original = nodeOriginals.get(node);
      const key = clean(original);
      const leading = original.match(/^\s*/)?.[0] || "";
      const trailing = original.match(/\s*$/)?.[0] || "";
      const translated = lang === "fi" ? copy.fi[key] : key;
      if (translated) node.textContent = leading + translated + trailing;
    }
    const headline = document.querySelector(".hero h1");
    if (headline) headline.innerHTML = lang === "fi" ? "Opintopolkusi <em>alkaa tästä.</em>" : "Your study path <em>starts here.</em>";
    const routeDetail = document.getElementById("route-detail");
    if (routeDetail) routeDetail.innerHTML = routeMessages[lang][document.querySelector("[data-route][aria-pressed='true']")?.dataset.route || "university"];
    document.querySelector(".header")?.setAttribute("data-language", lang);
    document.querySelector(".nav")?.setAttribute("aria-label", lang === "fi" ? "Päänavigaatio" : "Main navigation");
    document.querySelector("#ui-language")?.setAttribute("aria-label", lang === "fi" ? "Sivuston kieli" : "Site language");
    document.querySelector("#menu")?.setAttribute("aria-label", lang === "fi" ? "Avaa valikko" : "Open menu");
    try { localStorage.setItem(LANGUAGE_KEY, lang); } catch (_error) { /* Preferences remain optional. */ }
  }

  function updateBudget() {
    const tuition = Math.max(0, Number(document.getElementById("tuition").value) || 0);
    const living = Math.max(0, Number(document.getElementById("living").value) || 0);
    const duration = Math.max(0.5, Number(document.getElementById("duration").value) || 1);
    const application = Math.max(0, Number(document.getElementById("application").value) || 0);
    const yearly = tuition + living * 12;
    const locale = document.documentElement.lang === "fi" ? "fi-FI" : "en-FI";
    const money = (value) => new Intl.NumberFormat(locale, { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value);
    document.getElementById("total").textContent = money(yearly * duration + application);
    document.getElementById("yearly").textContent = money(yearly);
    document.getElementById("years").textContent = `${duration} ${document.documentElement.lang === "fi" ? "vuotta" : "years"}`;
  }

  document.querySelectorAll("[data-route]").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll("[data-route]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    document.getElementById("route-detail").innerHTML = routeMessages[document.documentElement.lang === "fi" ? "fi" : "en"][button.dataset.route];
  }));
  document.querySelectorAll("#tuition,#living,#duration,#application").forEach((input) => input.addEventListener("input", updateBudget));
  document.querySelectorAll("#ui-language").forEach((control) => control.addEventListener("change", () => { setLanguage(control.value); updateBudget(); }));
  const menu = document.getElementById("menu");
  menu?.addEventListener("click", () => {
    const open = document.getElementById("nav").classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", document.documentElement.lang === "fi" ? (open ? "Sulje valikko" : "Avaa valikko") : (open ? "Close navigation" : "Open navigation"));
  });
  document.querySelectorAll(".nav a").forEach((link) => link.addEventListener("click", () => {
    document.getElementById("nav").classList.remove("open");
    menu?.setAttribute("aria-expanded", "false");
  }));
  let preferredLanguage = "en";
  try { preferredLanguage = localStorage.getItem(LANGUAGE_KEY) || "en"; } catch (_error) { /* Use English by default. */ }
  setLanguage(preferredLanguage);
  updateBudget();
})();
