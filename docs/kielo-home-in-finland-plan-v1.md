# Kielo · Make a home in Finland

**Page route:** `housing.html`  
**Audience:** people considering a move, international students, couples and families, renters, first-time buyers, and people exploring a self-build  
**Site language:** English and Finnish; this page explains housing, while Finnish expressions appear as optional vocabulary  
**Mobile first:** yes; minimum visible text size 12 px  
**Evidence checked:** 4 November 2026

## Page promise

Give a newcomer one friendly place to understand Finland's housing choices, prepare for a rental or purchase, compare the kind of place that may suit their life, and follow the right official next step. Kielo is an orientation guide: the landlord, housing provider, municipality, lender, tax authority and immigration authority make the decisions in their own areas.

## Information architecture

1. **Welcome and quick route picker** — a calm Finnish-home visual and direct paths for Rent, Student home, Buy, Build, and Move-in. Explain briefly that Finland uses municipalities and regions rather than states.
2. **Choose how you want to live** — compare renting, owner-occupied housing, right-of-occupancy, and shared ownership. Explain the broad trade-offs without promising that a route is available in every municipality.
3. **Renting, step by step** — set a full monthly budget; search a municipality, student foundation, city or private landlord; check the location and listing; view the home; confirm the written lease and all charges; pay only under the agreed contract; document condition and keys. Explain fixed-term versus open-ended leases, security deposit (usually two months; legal maximum three months), utilities and insurance. Include common documents a landlord may request, with a note that requirements vary.
4. **Student and international-student route** — apply to student housing as soon as an offer is received; compare the university/student foundation with private rental fallback; expect waiting time in high-demand cities. Separate housing-provider eligibility from immigration rules. Link current Migri living-funds and family-member guidance, and Kela/InfoFinland student-benefit guidance; never promise a benefit or a residence permit.
5. **Couples, families and shared leases** — compare a joint lease, one named tenant plus an occupant, and a larger home; tell both partners to understand who signs and who owes rent under the actual contract. For students arriving with a spouse/partner, explain that housing and immigration are separate processes; Migri decides eligibility, proof of funds and permit type. Do not infer residence rights from relationship status alone.
6. **Buying a home** — distinguish an apartment/terraced home bought as housing-company shares (`asunto-osake`) from detached-house/land real estate (`kiinteistö`). Walk through mortgage readiness, sale price versus debt-free price, maintenance/finance charges, building condition, housing-company repairs, offer/contract, transfer tax and registration. Include a small editable transfer-tax estimate using currently published rates (1.5% shares; 3% real estate), explain its base and show a direct Vero calculator link. Add the foreign-buyer rule: many non-EU/EEA citizens need a Ministry of Defence permit for real estate; housing-company shares are generally outside that permit requirement. The exceptions and exact case must be checked with the Ministry. State clearly that buying property does not grant a residence permit or citizenship.
7. **Building a home** — stages: choose a municipality and plot; verify zoning, building rights, plot lease/ownership, utilities and access before purchase; prepare financing and professionals; ask the municipal building-control authority which permits and plans apply; contract and supervise construction; complete inspections, utility arrangements and final documentation. Explain that the permit answer depends on current law and the municipality; even small works must comply with relevant rules. Never frame a size exemption as permission to ignore building standards.
8. **Find the place that fits** — guide by needs rather than ranking cities: capital region for broad services and transit with stronger housing competition; larger university cities for campus, services and urban living; mid-sized centres for a balance of services and access to nature; smaller towns/rural areas for more space and potentially lower prices, with fewer vacancies and more car dependence. Include all 19 regions with a few representative centres, a filter for student/city/coast/nature/northern priorities, and a comparison checklist (price, commute, work/study, services, language, childcare, climate, transport). Link Statistics Finland's municipality/rent tables instead of hard-coding volatile rents.
9. **Move-in checklist** — notification of move to DVV (from one month before to one week after), building manager, electricity, water/heating/waste where relevant, internet, home insurance, keys, condition photos, address updates, waste sorting and household rules. Differentiate moving within Finland from immigrating/municipality-of-residence registration.
10. **Mini glossary and FAQs** — `vuokra`, `vuokravakuus`, `vuokrasopimus`, `asunto-osake`, `kiinteistö`, `asumisoikeusasunto`, `yhteisomistus`, `muuttoilmoitus`. Questions cover deposit, student waitlists, co-renting, buying as a non-EU/EEA citizen, building permits, and whether buying a home lets someone live in Finland.
11. **Sources and scope** — dated official links for rental contract, student housing, buying, housing types, moving notice, building permits, Migri students/families and funds, Vero transfer tax, Ministry of Defence permits, and Statistics Finland. Label legal, tax and immigration details as subject to change and case-specific.

## Tools and interaction

- Route cards jump to the matching guide and highlight the chosen route.
- Tabs or accordions can focus the page on renting, studying, couples, buying or building while keeping the full guide available.
- Editable monthly housing budget: rent, utilities, water, transport/parking and insurance; show monthly total and a separate first-rent-plus-deposit estimate (1/2/3 rent months) as a planning aid.
- Transfer-tax estimate reacts to purchase amount and property type. For housing shares, prompt to use the debt-free price. It is not a Vero assessment.
- City-fit selector filters place profiles by `transit`, `student`, `family`, `nature`, and `lower-cost-to-research`; it does not call any place “best” or assert live affordability.
- English/Finnish switch uses Kielo's existing `kielo-site-language-v1` preference. No Bengali site-wide translation; Finnish vocabulary may be explained through English or Finnish.
- Links to official sources open in a new tab, with clear source names. All saved calculator values remain in the visitor's browser; no personal data collection.

## Content and accuracy guardrails

- Use “region” or “municipality,” never “state.”
- Do not suggest a property purchase provides immigration status.
- Do not give individual legal, immigration, construction, lending, benefit or tax advice.
- Avoid fixed rent/property cost claims by city. Link to current Statistics Finland data and advise checking the exact address and date.
- Explain student housing applications can take weeks or months in larger cities; apply early and prepare a private-market backup.
- Make international-student and couple guidance conditional on citizenship, permit type, municipality and provider rules. Link to current Migri and Kela pages.
- Distinguish housing-company shares from real estate before explaining foreign purchase permissions or transfer tax.
- Building project requirements depend on municipality, zoning and project scope; direct the reader to municipal building control before buying a plot or starting work.

## Design direction

Use Kielo's pine, lake, oat and clay palette with Fraunces display headings and DM Sans body text. Lead with a welcoming Finland home illustration/photo, then clear route cards and short numbered steps. Keep key decisions in compact cards, use one main column on small phones, and avoid legal-looking walls of text. Minimum text size is 12 px, focus states are visible, and controls have labels.

## Mockup → production sequence

1. `docs/kielo-home-in-finland-mockup-v1.html` — reviewable responsive interaction mockup for the information hierarchy and main tools.
2. Review at desktop and narrow phone widths; adjust clipped cards and action placement.
3. `public/housing.html` and `public/housing-page.js` — production page, bilingual copy, route interactions and calculators.
4. Update the “Make a home here” home card, service-worker precache, and asset versions.
5. Verify the production page on desktop and mobile, English and Finnish, both calculators, navigation, and source links.
6. Publish to the current public Kielo Site and GitHub Pages without changing the existing audience.

## Official sources checked

- [InfoFinland — housing in Finland](https://infofinland.fi/en/housing/housing-in-finland)
- [InfoFinland — rental homes](https://infofinland.fi/en/housing/rental-home)
- [InfoFinland — tenancy agreements](https://infofinland.fi/housing/rental-home/tenancy-agreement)
- [InfoFinland — student housing](https://infofinland.fi/en/housing/student-housing)
- [InfoFinland — buying a home](https://infofinland.fi/housing/buying-a-home)
- [InfoFinland — moving house](https://infofinland.fi/en/housing/moving-house)
- [InfoFinland — residents' rights and obligations](https://infofinland.fi/en/housing/rights-and-obligations-of-occupants)
- [Finnish Immigration Service — students' family members](https://migri.fi/en/students-family-members)
- [Finnish Immigration Service — student income requirement](https://migri.fi/en/income-requirement-for-students)
- [InfoFinland — financing studies and student benefits](https://infofinland.fi/education/financing-your-studies)
- [Finnish Immigration Service — frequently asked questions, including property ownership and residence](https://migri.fi/frequently-asked-questions2)
- [Finnish Tax Administration — transfer tax and current rates](https://vero.fi/en/individuals/property/transfer-tax/)
- [Finnish Tax Administration — buying real estate](https://www.vero.fi/en/individuals/property/transfer-tax/buying_real_propert/)
- [Suomi.fi — construction and renovation](https://www.suomi.fi/citizen/housing-and-construction/construction-and-properties/guide/construction-and-waste-management/construction-and-renovation)
- [Statistics Finland — rental housing tables](https://pxdata.stat.fi/PXWeb/pxweb/en/StatFin/StatFin__asvu/?tablelist=true)
