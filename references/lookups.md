# Running The Lookups

How to run each step of the full check by hand, what each answer does and does not mean, and what to do when a route is closed. A route is a way of getting one step's answer. When the first route fails, take the next one and name the route used in the `Lookups` list. When every route for a step fails, the name is unchecked.

## When The Script Fails Or Cannot Run

- A section the summary marks `not run`, which is `ran` false in the full records, did not happen. It is not a clear result. Rerun that name with `--only <section>` and the same `--out` file, or take the route for that step below
- A section that reports being refused clears after about ten minutes. Run one copy of the script at a time and let it pace itself
- A name the summary marks `INCOMPLETE` has something under `failed` or `notRun`. Clear both before using it
- A trademark list marked `PARTIAL`, which is `searchedAll` false, is missing live marks, and the Trademarks step has not run until it is whole. Give `--classes` if it was not given. For `containing`, a `containingInClasses` entry with `searchedAll` true completes it. If a list is still partial, query the office for that word yourself. Dead marks left unread do not make a list partial. For a form that is an ordinary word, read only the marks in the product's classes, and say so in the `Lookups` list
- The pages under `yours` are written for an English-language app, and each says when it applies. For another language or field, use the routes below
- Without the script, build the same lookups by hand: the five searches in the Search step, with the respellings made by the swaps the skill lists, and the routes below for the rest

## Search

- When the search tool returns a generated summary and not the results themselves, fetch a search engine's results page as an ordinary web page with the query in its address, and read the entries. A summary that comes with the list of results, about ten titles with their links, has the results: read the list. The summary itself is never evidence, whichever way it arrives
- The same route is worth trying when a search allowance runs out, though search engines often refuse it. A fetched results page is a search like any other, so name the engine in the `Lookups` list. When neither works, the search step cannot run and the name is unfinished
- When the market's language is not English, write the category words and the four adverse words in that language in place of the English ones, and search from that market's version of the engine, because local uses rank locally
- When a result page or an article refuses the request, try an archived copy of it. A page that refuses a fetch tool, including the archive itself, a registry status page, or a store page, often loads through a plain HTTP request from a shell
- An adverse claim is dated twice: when it was published, and whether it is about the present holder of the name or an earlier one

## Marketplaces

Search where a competitor of this product would be listed.

| Product | Where to search |
| --- | --- |
| App or software | Apple's App Store and Mac App Store, Google Play at `https://play.google.com/store/search?q=<name>&c=apps`, the Microsoft Store and browser extension stores when it runs there, the product launch directory its buyers read, and the package registries and code hosts when it is a developer tool |
| Physical goods | The dominant shopping marketplace of each market, and the craft or specialist marketplace of the category |
| Venue, food, or local service | The map listing for the name in the city or region of the brief, and the main review site there |
| Music, books, film, games, podcasts | The catalog where that kind of work is published, sold, or streamed |
| Company name | Wherever companies of its trade are listed, as in the rows above. Its register is a lookup of its own, under Company Registers below |

When the script's Apple lookup is refused, fetch `https://apps.apple.com/<country>/iphone/search?term=<name>` as a page. A store page that will not load through a fetch tool often loads through a plain HTTP request from a shell.

Reach looks different outside software. Use what the field offers: dated reviews, recent posts, opening hours, a price list, stock on sale, a company register status of active or dissolved, press coverage, a staff page. For software, use the last release or commit date, the version, downloads or installs, ratings, stars from other people, and whether the repository is archived.

For a local business, where the match trades decides its niche. The same trade in the same city or region is the same niche. The same trade somewhere its customers would never choose between the two is an adjacent one, unless it is a chain or sells online into the brief's area.

## Trademarks

The script queries the United States register only. For every other market in the brief, query its office. A market inside the European Union is covered by its national office and by the EUIPO, so query both.

| Market | Office search |
| --- | --- |
| United States | USPTO Trademark Search, `https://tmsearch.uspto.gov`. One mark's current status page is `https://tsdr.uspto.gov/statusview/sn<serial number>`. Near and leading lookups are run for the exact name only |
| European Union | EUIPO eSearch plus, `https://euipo.europa.eu/eSearch` |
| United Kingdom | UK Intellectual Property Office trademark search |
| Many countries at once | WIPO Global Brand Database, `https://branddb.wipo.int`, and TMview, `https://www.tmdn.org/tmview` |
| Any other country | That country's trademark office search, found by its name |

Routes, in order:

1. The office's own search, or the script for the United States
2. An aggregator run by the offices themselves: the WIPO Global Brand Database or TMview
3. A third-party trademark index that has its own search over registry records. Name the index and the date of the record it shows
4. If none can be reached, give the person the office link and the exact terms to enter. The name is unchecked until they report what it showed

Most office searches are browser applications. An agent that can fetch pages and cannot drive a browser will usually land on route 3 or 4 for markets outside the United States.

Near and leading marks are looked up where the route can do it: an office's similar-marks or wildcard search, or the script. Where the route offers neither, the exact name and its forms are that office's step, and the `Lookups` list says so.

Marks are filed in numbered international classes, and `--classes` takes the ones the product falls in. Software to download is class 9 and software as an online service is class 42. Toys and games are 28, entertainment and education services 41, clothing 25, food and drink 29 to 33, restaurants and lodging 43. For anything else, find the class in the office's own goods and services lookup.

Reading a result:

- **Live or dead decides first:** Registered and pending marks are live, and an application that has only had a first refusal is still pending. Abandoned, cancelled, expired, and finally refused marks are dead and weigh as notes. A registration can be live with some of its classes cancelled, so read the status page of a mark that matters
- **Goods and services decide next:** A mark covers what its record lists. A live mark for unrelated goods is not a mark on this product
- **Near marks count by sight and by sound:** Offices compare how marks look, sound, and what they mean, and closeness in one can be enough. The script's `near` list is close in spelling and its `soundNear` list is close to a same-sound respelling. Both hold live and dead marks, nearest first. A short name returns hundreds. Compare each live whole mark in the product's classes with the name and keep those that are near it by the closeness rules. The summary shows the first few and gives the `--top` number that shows them all. A longer mark that only holds a near word is read only where that word is the heart of the mark
- **Marks built on the name are a list of their own:** The script's `builtOn` list holds marks with a longer word that starts or ends with the whole name, such as the name with a grade or a product word added. Read the ones that are a single word and whose goods touch the product. Where the name begins an ordinary word, most of that list is that word and can be passed over
- **The lists have holes:** A mark that sounds alike and is spelled further off, a mark more than two letters away, and a mark sharing only the stem are in neither list. The stem search and the store search are where those turn up, and a name found there gets its own registry query
- **The owner's record is one page:** The office's trial board lists every proceeding an owner has been party to at `https://ttabvue.uspto.gov/ttabvue/v?pnam=<owner name>`. For an owner with hundreds, `https://ttabvue.uspto.gov/ttabvue/v?qs=<owner>+<word>` finds the records holding both words. Count those it started against other names, and note any against close spellings. It shows how likely the owner is to object. It does not change what the owner's rights are, and it shows registry disputes only
- **Dates decide who was first:** Record the mark's filing date and its claimed first-use date, both on the status page, beside the person's own first use
- **Upkeep is on the status page:** It shows the registration date, each declaration of use and renewal the owner has filed, and whether it was accepted. The script works out when the next filing falls due, which the summary shows, and the dates its window opens and its grace period ends, under `upkeep` in the full records. To see whether the owner still sells under the mark, open the owner's own site and the stores, and record the page and date
- **This is a knockout search:** It catches the marks that are plainly in the way. It does not cover unregistered rights from use, every sound-alike, or every jurisdiction

## Domains

- The script asks the registry itself. The service that answers is RDAP, and the registry for each suffix is listed in the IANA bootstrap file at `https://data.iana.org/rdap/dns.json`. Query `<registry base>domain/<name>.<suffix>`
- Some suffixes publish no RDAP service. For those the script asks the suffix's WHOIS server, then falls back to whether the name is delegated in DNS. A DNS-only answer cannot give a creation date
- **`no record` means** the registry holds no registration at the moment of the lookup. It is a strong sign the name is free. It is not a checkout: a registry can hold a name back as reserved or price it as premium. The registrar's checkout page is the final word, so run it for a finalist
- **`registered` means** unavailable at list price, and nothing more until the site is opened. Parking and sale pages, and name servers that belong to a domain marketplace, mean a purchase negotiation, and the asking price is the fact to read. Sale pages often refuse automated requests. When the price cannot be read by any route, record that and leave it for the person to ask. A working business means a match to weigh
- **Registration dates carry signal:** A domain registered in the last few months means someone reached the same name recently. The same name taken across several suffixes at one moment means one party staking a claim
- Country suffixes often register under a second level, so pass the form buyers there would type, such as `co.uk`
- A name in another script is looked up in its encoded form, which the script produces. Look up the Latin spelling too when buyers will type one

## History

- The Internet Archive lists its captures of a domain at `https://web.archive.org/cdx/search/cdx?url=<domain>&output=json&fl=timestamp,statuscode&collapse=timestamp:6`. Open a capture at `https://web.archive.org/web/<timestamp>/<domain>`
- Open the first capture, the last, and one from each year between, up to eight. A name's past is whatever those pages were: a shop, a blog, a parking page, a scam. A capture that comes back blank still counts as opened. Rely on its neighbors
- History matters for a domain the person could end up holding, and for one that still surfaces in the name's search results. For any other it is a note at most
- The fourth search of the check is where reports against the name or its domain surface. A report found there is an adverse claim, and it gets opened and dated
- No captures at all is an ordinary result for a name nobody has used

## Languages

- Look up each form in a multilingual dictionary that lists every language a spelling exists in. One page per form answers most of this step
- Add a slang dictionary for the market's language. One joke entry is not a sense. Count a slang sense when a general dictionary carries it too or it is the leading definition
- A language widely spoken in a market counts even when the product is sold in another one
- A name that is a common first name, surname, or place somewhere in the brief's markets is worth a note, because that is what search will return there

## Company Registers

For a brief that gives a legal entity name or a place of formation. The register is the list of companies kept by that state or country, usually by its secretary of state, treasury, or companies office. Find it by the place's name and use the office's own site.

- **Search the name without its ending,** such as LLC or Inc., and read every entity whose name is the same or near by the closeness rules. Many registers match only what is typed, letter for letter and space for space, so search the spaced form and the name's first letters as well
- **Use the availability look-up where the register has one,** and its entity search too. The first says whether the name can be filed. The second shows who holds the names around it
- **`Available` means the register's search showed nothing in the way on that date.** What stands in the way is set by that place's law, and it is commonly two things. The name has to be distinguishable on the register from the names it protects: usually the entities formed there, outside entities registered to do business there, and reserved names. And it has to carry the ending required for its kind of company, such as "LLC" for a limited liability company. Each office decides what counts as distinguishable, so read its rule before treating another ending, a capital, or a comma as a difference
- **It means nothing more.** The office decides when the papers are filed, not when the look-up is run, and many registers will reserve a name for a fee where holding it matters. A register compares its own entities only: not another place's, not trademarks, not a business trading without an entity. Some list active and inactive entities together and do not say which is which
- **An entity under the same or a near name** shows that it exists, not that it trades. When its trade could be in or near the niche, open it as a match in the Matches step

Routes, in order:

1. The register's own search. Some registers forbid automated searches or ask for a typed code. Those are the person's to run, and the lookup is `Open` until they report what it showed
2. A third-party index of company records, such as OpenCorporates at `https://opencorporates.com/companies/<jurisdiction code>?q=<name>`. Report what it shows as the index's answer and not the register's, with its freshness unknown: an index copies a register on its own schedule, so a company formed last month may be missing from it. Whatever it shows, the lookup stays `Open`
3. With no answer from the register, give the person its link and the exact terms to enter, with whatever the index showed

## Accounts

Accounts are claimed at adoption and are not a step of the check. To see whether one is free, fetch the profile address for the exact handle: a missing-page answer usually means free, and a profile page means taken. Many platforms show nothing without signing in, so the person confirms those themselves. An active account in the product's niche turns up in the Search and Marketplaces steps, where it is weighed as a match.

## Without Web Access

No clearance verdict is possible, so every name is unchecked. Give the fit results, each with the line saying what the name is, which need no lookup.

The person can run the lookups themselves. Give them every one, for the names they choose, with the queries and links filled in: the five searches, the store or directory of their field, the trademark office of each market for the name and its forms, each domain at a registrar, the archive list for each domain, and the dictionary page for the name and each of the person's spellings. Record what they bring back as facts. A name is checked when every step has an answer, whoever ran it, and not before. A few lookups are not the check, and they do not produce a verdict.
