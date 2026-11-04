# Kielo · Study in Finland page plan

**Status:** research and content plan for the first Study in Finland page  
**Audience:** international applicants, current students considering a transfer, and anyone comparing Finnish higher education  
**Content language:** English by default; Finnish page copy follows the site language selector  
**Evidence checked:** 4 November 2026; changing details always link to the official source

## Page promise

Help a visitor go from “I might study in Finland” to a sensible next step: understand the study route, compare an institution and place, estimate a budget, find the real programme listing, and know what to verify before applying.

Kielo is a guide, not an admissions authority. Programme dates, eligibility, tuition, scholarships, credit recognition, campus locations, and permits can differ by institution and intake. The official programme page and the institution's admissions service remain authoritative.

## Information architecture

1. **Study hero and quick facts** — primary actions to compare pathways and browse official programmes; 13 universities, 22 universities of applied sciences (UAS), 600+ English-taught bachelor's/master's programmes, and Finland's 19 regions.
2. **Choose a study route** — research-led university vs practice-oriented UAS; Bachelor, Master's, doctoral, and UAS Master's distinctions; typical duration and entry starting point.
3. **Programme finder hand-off** — let visitors decide field, degree level, language and preferred area, then open the national Studyinfo programme search. Do not copy or imply a live Kielo programme feed.
4. **Admissions in plain language** — qualification eligibility, English proof, selection methods, joint vs separate/rolling application, exact-date check, application fee, offer and accepting one place per term.
5. **International-student cost planner** — editable annual tuition, monthly living budget and duration; show estimated annual and whole-degree totals, disclose excluded costs, and link to current scholarship, permit, insurance and housing guidance.
6. **Fields and institutions** — practical starting examples for technology/ICT, business, health/welfare, education, arts/design, and environment; label these as fit examples, never a universal “best university” ranking. Link to the official 35-institution directory.
7. **Study places across Finland** — Finland has 19 regions, not states. Introduce selected student hubs (capital region, Tampere, Turku, Oulu, Vaasa, Lappeenranta, Joensuu/Kuopio, Rovaniemi). A higher-education institution can operate campuses in several regions, so institution counts and campus counts must be kept distinct. The first release names verified hubs and links to the complete directory; exact region totals are held until an official campus-by-region crosswalk is sourced and checked.
8. **Credits, recognition and changing universities** — explain ECTS (60 credits for a full-time academic year), credit recognition/RPL, transcript and syllabus preparation, transfer applications and the fact that neither admission nor credit carry-over is automatic.
9. **Before arrival** — scholarship decision, offer confirmation, permit/insurance, housing, student services and Finnish/Swedish learning; official next-step links.
10. **Finland context and history** — connect visitors to Kielo's Finland Explorer for the country's history, society and regions instead of duplicating a shallow history article here.
11. **Sources and last-checked note** — dated source list with a clear distinction between Kielo guidance and official requirements.

## Decisions that protect accuracy

- **“Best” is personal.** Compare by programme, language, entry requirements, research/practice style, location, cost, and career goal. Avoid unsupported global ranking claims.
- **Avoid hard-coded deadlines.** Many autumn programmes use a January joint-application period, while separate/rolling rounds differ. Send applicants to the exact Studyinfo listing.
- **Budget is an estimate.** Official Study in Finland guidance currently gives typical English-taught tuition of €9,000–€20,000/year for many non-EU/EEA/Swiss applicants, plus a recommended €900–€1,200/month living budget. Exemptions exist. Show range, editable inputs and direct source links.
- **Scholarships are not guaranteed.** They are institution/programme-specific; visitors must check eligibility and what a scholarship covers.
- **Credits and transfers are institution decisions.** The Finnish National Agency for Education says higher-education institutions decide whether foreign studies/learning are credited. Transfer routes have their own programme-specific eligibility, dates, available-place and study-progress conditions.
- **No scraped listings.** Use the official Studyinfo portal for live programme listings and preserve each institution's source of truth.
- **Regional counts need a declared method.** Do not call regions “states”, and do not count a multi-campus institution once per campus without labeling that metric.

## Proposed interaction and mobile behaviour

- Sticky compact Kielo navigation with a visible `Study` active state; mobile menu remains one tap away.
- University/UAS selector updates the “which path fits?” explanation.
- Budget inputs recalculate immediately and remain local to the browser; do not collect personal data.
- Region/student-hub selector reveals institution examples and local context.
- FAQ accordions clarify application routes, English tests, scholarships, credit transfers and changing institutions.
- All buttons, links and form controls have accessible labels and visible focus. The smallest visible font is 12px; cards collapse to one column on phones.

## Verified starting facts

- Finnish higher education includes 13 universities and 22 UAS; their national portal currently describes 600+ English-taught bachelor's and master's programmes.
- Universities focus on research and can award doctoral degrees; UAS focus on professionally oriented higher education and applied R&D.
- Typical full-time year: 60 ECTS credits.
- Many English-taught bachelor/master admissions use Studyinfo; application periods and selection criteria vary by programme.
- Official cost guidance (updated 18 Sep 2026 when checked): tuition typically €9,000–€20,000/year for relevant fee-paying English-taught degrees; recommended living budget €900–€1,200/month; €100 application fee for relevant applicants outside the EU/EEA and Switzerland; doctoral programmes do not charge tuition.

## First mockup deliverable

`docs/kielo-study-finland-mockup-v1.html` will show the page hierarchy, visual system, mobile-first cards, and representative controls before the production page is wired into Kielo. The deployed route will be `public/study.html`.

## Official sources

- [Study in Finland — universities](https://www.studyinfinland.fi/universities)
- [Study in Finland — bachelor's and master's admissions](https://www.studyinfinland.fi/admissions/bachelors-and-masters-admissions)
- [Study in Finland — fees and cost of living](https://www.studyinfinland.fi/funding-your-studies/fees-and-cost-living)
- [Studyinfo — official programme and application portal](https://studyinfo.fi/konfo/en/)
- [Finnish National Agency for Education — Finnish education system and ECTS](https://www.oph.fi/en/education-system)
- [Finnish National Agency for Education — recognition of foreign qualifications/studies](https://www.oph.fi/en/services/academic-recognition-qualifications-and-studies)
- [Finnish Immigration Service — studying in Finland](https://migri.fi/en/studying-in-finland)
