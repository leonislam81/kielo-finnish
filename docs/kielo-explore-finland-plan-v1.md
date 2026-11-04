# Kielo · Explore Finland — page plan

**Status:** plan for the mobile-first Explore Finland page  
**Audience:** curious newcomers, learners, students, families and visitors  
**Page language:** English or Finnish. Finnish-lesson support languages remain inside Learn Finnish.

## Page promise

Help people understand Finland as a varied country and choose a useful next step. The page connects place, history, nature, culture and everyday systems, then points to the detailed Kielo learning, work, study and housing guides.

## Information architecture

1. **A warm country introduction** — clear statement that Finland is more than one city or one season, with an illustrated map and links to the region explorer and history.
2. **Finland at a glance** — population snapshot (31 December 2025), the 19 statistical regions, Finnish and Swedish national languages, and national parks (year-end 2025). Each changing figure carries its reference date and official source.
3. **The 19-region atlas** — searchable region names, example cities, dated regional population, short location notes and a Finland map built from the repository’s Statistics Finland 2026 GeoJSON. Filters cover city/campus life, coast/islands, lakes/forests and the north. City examples help orientation; they are not rankings or a substitute for current local data.
4. **A short history timeline** — the Swedish period, Russian Grand Duchy/autonomy, independence in 1917, republic in 1919, EU membership in 1995 and NATO membership in 2023. Each milestone links to a source.
5. **Land, water and seasons** — forests, lakes, Baltic coast, archipelago and Lapland; an interactive four-season card; national-park and Everyman’s Rights links with a reminder to follow local protected-area rules.
6. **Culture and everyday life** — sauna, food and markets, design and public spaces, quiet and conversation, and yearly celebrations. Present customs as common patterns, not rules for every person.
7. **Getting around and building a life** — practical links to current train/public-transport information, Finnish study, work and housing guides. Timetables and programme/service rules stay on their official current pages.
8. **Keep exploring** — source list, a small Finnish place-and-culture word set, links to the Finnish Explorer lessons and the other Kielo guides.

## Interaction and accessibility

- English/Finnish toggle remembers the site-language choice in the existing `kielo-site-language-v1` preference.
- Search and category filters update both the region directory and map; selecting either a region card or map region opens the same detail.
- Season tabs update the description, local word and practical seasonal note.
- Responsive map and cards are keyboard accessible, have visible focus, live status feedback and descriptive labels.
- All visible type is at least 12px; layouts reflow for narrow phones, tablets and desktop.
- The page is lightweight and works without a third-party map, image or tracking service.

## Content principles

- Explain that Finland has **regions (maakunnat), not states**; distinguish Statistics Finland’s 19 statistical regions from Visit Finland’s four broad travel regions.
- Label statistics by reference year and use direct official sources. Never present old population or park counts as live.
- Keep transport departure times, admission rules, opening hours, weather and other changing details on the official service pages.
- Separate cultural context from personal/legal eligibility guidance. Link to the established study, work, housing and Finnish-learning pages for deeper guidance.
- Avoid simplistic “best region” rankings; describe trade-offs such as city services, island/coastal life, lake/forest access and longer distances in the north.

## Visual direction

Use Kielo’s pine green, oat, lake blue and warm clay palette with the existing Fraunces/DM Sans pairing. Build an original, quiet map-led hero and use generous editorial sections, rounded cards and seasonal colour shifts. The real regional map supplies detail while the rest of the page remains calm, readable and mobile-first.

## Official sources checked 4 November 2026

- [Statistics Finland — Population and society](https://stat.fi/en/topic/population-and-society) and [Population structure](https://stat.fi/en/Statistics/Vaerak) — population and dated regional figures.
- [Statistics Finland — Regions 2026 classification](https://stat.fi/en/luokitukset/maakunta/maakunta_1_20260101) and [open geographic-data terms](https://stat.fi/en/services/statistical-data-services/open-data-and-interfaces/interface-use-of-geographic-data) — names, boundaries and attribution.
- [This is Finland — Main outlines of Finnish history](https://finland.fi/life-society/main-outlines-of-finnish-history/) — concise historical timeline.
- [European Union — 30 years together](https://commission.europa.eu/topics/enlargement/30-years-together_en) and [NATO — Finland joins NATO](https://www.nato.int/en/news-and-events/articles/news/2023/04/04/finland-joins-nato-as-31st-ally) — memberships and dates.
- [InfoFinland — Key facts about Finland](https://infofinland.fi/en/information-about-finland/key-facts-about-finland) and [Swedish language in Finland](https://infofinland.fi/en/finnish-and-swedish/swedish-language-in-finland) — national languages and society.
- [Metsähallitus — national parks](https://www.metsa.fi/en/lands-and-waters/protected-areas/national-parks/) and [hiking / Everyman’s Rights](https://www.metsa.fi/en/outdoors/hiking/) — outdoor guidance and park count.
- [Visit Finland — destinations](https://www.visitfinland.com/en/places-to-go/) and [weather and climate](https://www.visitfinland.com/en/practical-tips/climate-and-weather-in-finland/) — travel areas and seasonal context.
- [InfoFinland — Finnish customs](https://infofinland.fi/en/information-about-finland/finnish-customs), [VR timetables](https://www.vr.fi/en/timetables) and [HSL travel](https://www.hsl.fi/en/travelling) — everyday culture and current mobility links.

## Delivery sequence

1. Review this plan and the local mockup structure.
2. Build the page from the mockup with the official region boundary data already in the project.
3. Check region filters, map selection, search, season tabs, language toggle, narrow mobile layouts, official links and GitHub Pages output.
4. Publish to the existing public Kielo Site and update the project’s GitHub Pages source.
