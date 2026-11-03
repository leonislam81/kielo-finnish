# Kielo job search: source and integration status

## What this release does

- The Find a Job page searches a curated directory of Finnish job boards, public employment services, staffing agencies, student portals, and employer career pages.
- Keyword, city, employment type, source category, and work-area filters help narrow the source list. Search criteria can be bookmarked, and Work in Finland receives supported query terms in its public open-jobs URL.
- Job seekers open the original source to read the advert and apply. Kielo does not copy vacancies, estimate job counts or salary details, or claim that a source is connected.
- Saved searches and application notes are stored in the current browser on the current device. They are not sent to an account or server. Users can export and import a JSON backup.

## Why listings are not aggregated yet

Job Market Finland documents a Partner API for vacancies. Access requires the KEHA Centre to approve and activate the partner, after which the partner receives credentials. Kielo has not been issued those credentials, so the page links to the service and clearly marks the API requirement instead of attempting an undocumented feed.

The other directory entries are link-only. Their listing formats and reuse terms have not been represented as feed integrations. A source link is a convenient starting point, not a claim that every employer, URL, vacancy, or filter has been independently verified for this release. Users should confirm each advert on its original site.

## Safe integration path

1. Contact each source or employer and obtain written permission or official feed/API documentation.
2. Record the source owner, canonical URL, permitted fields, refresh interval, attribution rules, and integration status in the source registry.
3. Ingest only permitted vacancy fields through a server-side scheduled job. Keep source URL and last-checked time with every record; do not infer language, salary, deadlines, or “English-friendly” status.
4. Normalize Finnish and English job titles, locations, and employment types. Deduplicate using source IDs where available and a documented fallback match.
5. Expire or re-check removed adverts, expose the original advert and application link, and show when a record was last verified.
6. Add genuine combined vacancy search only after the permitted sources and freshness process are operating. Never display sample vacancies or invented counts as live results.

## Primary references

- [Job Market Finland: interfaces for job postings](https://tyomarkkinatori.fi/en/instructions-and-support/interfaces/interfaces-for-job-postings)
- [Job Market Finland: Partner API documentation](https://tyomarkkinatori.fi/jobpostingprovider/documentation/KIPA-search-jobpostings-en.html)
- [Work in Finland: open jobs](https://www.workinfinland.com/en/open-jobs/)
- [Kuntarekry: job seeker information](https://kuntarekry.fi/en/for-job-seeker/)
- [InfoFinland: tips for job hunting](https://infofinland.fi/en/work-and-enterprise/find-a-job-in-finland/tips-for-job-hunting)
