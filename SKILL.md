---
name: "naming-check"
description: "Use while generating, brainstorming, searching for, comparing, evaluating, or adopting a name for a brand, product, company, app, domain, handle, or project, including when the user asks whether a name is taken or available, and even when they only want name ideas and never ask for a check. Works out what the name is for, generates names that avoid the ones every model reaches for, checks every name put forward against what that goal needs, and returns a ranked recommendation: what each finding usually means for the person, what to do about it, and which name wins on the checks."
compatibility: "Lookups need web access. The bundled lookup script needs Node.js 18 or later and network access, and reads optional keys from environment variables. Without web access the skill gives fit results and sound flags only, and lists the lookups for the person to run."
metadata:
  author: "Leeor Nahum"
  version: "3.0.0"
---

# Naming Check

The job is to get a person to a name they can trust, quickly, for any kind of name. Every name put forward is checked against everything its goal needs, and the answer is a ranked recommendation the person can rely on: what each finding usually means for them, what to do about it, and which name wins on the checks.

Most names worth having come with something attached: a small product somewhere with a similar name, a taken address, a mark in the neighborhood. So the check shows what a name costs and what to do about it. It never decides for the person. They may accept a trade-off the check would not.

## What Every Run Holds To

- **Every name put forward is fully checked.** None ends partly checked or as an idea only. Look as far into each name as its goal needs and no further, with no fixed number of searches or lookups. Stop when each check the goal needs has an answer that settles it
- **A name leaves the ranking in two ways only.** It is removed early when a couple of lookups show it is plainly unusable, such as a large brand in the same field holding the same name. It is removed at the end when it clearly fails, which means a blocking finding (`Avoid`) in most of the checks the goal needs that can reach `Avoid`, which are trademarks in each market, product matches, meaning, and genericness. Domain state, history, and search results weigh at most a cost, so they are not counted, and a product found by both the search and the marketplaces counts once. When in doubt the name stays. The early removal is the same test run on fewer lookups
- **An early removal is listed.** One line gives the name and the observed reason, and claims no lookup that did not run
- **Every other name stays, ranked best to worst on the checks.** The person may accept a trade-off the agent would not
- **A lookup that gets no answer by any route never reads as clear.** The name stays ranked on the checks that did answer, its label is written as "so far" with the missing check named, it ranks after every fully answered name at that label and can never be the winner, its line gives the person the link to run it, and no conclusion that depends on that answer is given. Skipping a lookup is never a shortcut
- **A convergent name is flagged and never removed for it.** When several passes or models produce the same name, the result says so, and a recent registration of it, such as a domain, repository, handle, or mark created in the last months, reads as a sign another model got there first
- **A name is never dropped on taste, on pattern, or on a hunch.** The shape of a name and the assumption that a common construction must already be taken are prompts to investigate, not evidence
- **A result that stops at the fact fails the person.** Each finding says what it usually means and what to do. It shows what matters, so anything it leaves out can be taken not to matter
- **Nothing here is legal advice.** Trademark consequences are written as what usually happens, never as a promise, and name the question for a trademark professional

Check every name in play: each candidate the person gave, each one generated for them, and the name they use now, which is in the set like any other. A word in their message that is offered as a name is a candidate. A name they say was checked elsewhere is checked here unless they supply that check's record and it covers what the goal needs.

When the job includes coming up with names, read [Generating candidates](references/generating.md) before producing any.

## The Goal

The goal decides which kinds of names to make and which checks matter. Work it out from what the person says, from the project around them (its files, notes, and README), and from lookups. Ask once, briefly, only when it still cannot be told. When there is no one to ask, state the assumed goal at the top of the result so a wrong assumption is visible. Each product gets its own goal.

| The name is for | Checks that matter |
| --- | --- |
| A product or service sold to buyers | Search results, marketplaces, trademarks in each market, domains with price, history, words and sound, matches |
| A company | The same, plus the company register for where it will form |
| A domain only | Domains with price, history, and search results. Trademarks and marketplaces only when a business will run on it |
| A social handle or account | The handle on each platform, search results for impersonation, and trademarks when it will carry a brand |
| Something with no market, such as an internal tool or a personal project | Fit, sound, search for confusion, and the registries it will live in, such as a package registry. Skip trademarks and domains unless wanted |

Establish what the checks need:

- **What it is:** One line, and the two or three category words a buyer would search for
- **Who and where:** Who it is for and in which countries, and for a local business which city or region. This sets the trademark offices, the languages, and the country suffixes
- **Stakes:** Whether the name must earn money or be trademarked, since that sets how much a mark weighs
- **Encounter:** Whether the name will mostly be said aloud, typed from memory, or tapped as a link, store listing, or icon
- **Addresses:** The domain suffixes the person would accept, and the platforms where the product needs an account. With none given, assume `.com` and the country suffix of each market named, such as `.co.uk` for the United Kingdom. Some things need no address of their own, and the goal says so
- **Taste so far:** Names they like or reject and why, anything the name must contain or must not be, how they say each candidate, and any spelling they have seen people use for it
- **A name already in use:** The date they first offered anything to the public under it, and what shows that date. Registering an address is not use. A date that a dated record shows decides who was first against a match. A date that is only stated is recorded, marked as not shown, and moves no weight, and the person is told to save proof now
- **A company to form:** The legal name the company will be filed under, and the state or country where it will be formed, when the person gives either

What the person already owns under a name, such as its domain, product, or accounts, is theirs and is never a match against it.

## Fit

Fit reports what the name is and what it says, and whether anything in it points the wrong way. Run it on every name, before any lookup.

### What The Name Is

Every name gets one short line saying what it is, in words a person with no background follows:

- **Its parts,** and what each one is in everyday terms. A part taken from a trade, a science, or another language is explained down to something ordinary, so "carto" is cartography, the drawing of maps, and not just "cartography"
- **Its language,** for a word or a part from another language, with its plain meaning there
- **Made up,** when it is, with any word it was built from
- **An unrelated meaning,** when the name is a real word somewhere that has nothing to do with the product, said as plainly as the rest

Write the line from what the name is made of and what its words mean in ordinary dictionary use, as far as you know it without looking it up, not from what it might remind someone of. If any word in the line would make a reader ask what that is, the line answers it. Where you cannot tell where a part comes from, say so and do not supply an origin. The words lookup tests the line, and the line and the fit result are both corrected to what it found.

### The Result

| Result | Means |
| --- | --- |
| **Fits** | Nothing in the name points away from the product. Its parts say or point to what the product deals in, or it is made up, or it is a real word whose meaning has nothing to do with the product and that no buyer would take for the product's kind. A made-up name that suggests nothing fits, because that is a kind of name people choose on purpose |
| **Partly fits** | One part points away and another part suits, or the name misses something the person said they would like |
| **Does not fit** | The name's only or main meaning is another kind of product or trade a buyer could take this one for, or it is something the person said the name must not be |

When two rows apply, the lower one is the result.

A part points somewhere only when it is a word, or a root in everyday use, in a language of the goal's markets. An echo of a root those buyers do not use, or of some other brand, is not a meaning. An ordinary word the name resembles is treated as if the name contained it only when the two differ by one letter as written, or by one sound as the name is said. To count sounds, write both out as said, syllable by syllable, and count the vowel and consonant sounds that differ. A resemblance that fails this test is not a finding and is not reported. A rude or embarrassing word never enters fit by this test. It goes to the sound flag alone.

Whether a name explains the product or needs a tagline is not a fit finding. Some owners want one kind and some the other. When the person has said which, a name of the other kind misses that preference.

Fit never moves clearance.

### Sound

Say each name aloud in the reading the person uses. Where they have not said, take the most natural reading, show it marked as assumed, and let them correct it. Write a reading as plain syllables with the stressed one in capitals, never in phonetic symbols. A result that turns on an assumed reading says so wherever it is shown.

Flag, plainly, a name that sounds like, or differs by one sound from, a rude or embarrassing word in a language of the goal's markets, or in English when the goal names none: "<name>: close to <word>". The person can then say it aloud and decide. The flag goes in its own column. It never sets or lowers fit, a weight, clearance, or rank, and its absence does not say the name is safe, because the person hears the name in ways the agent cannot. A sense the dictionary lists for the name itself is a different thing. It is a finding from the words lookup and is weighed.

A guess at how a stranger would type a name is not evidence. It adds no spelling to the search. For a finalist, tell the person the one check only they can run: say the name once to two people who do not know the product, and ask what they heard and how they would write it.

What the person says about a name is taken as given: how it sounds to them, how they say it, a spelling they have seen people use for it. It sets the reading, and it can add a spelling to search. Where they like a name, say so beside the ranking, in its own column. Their liking never moves the name up or down, and a meaning you found is never left out because they like the name. Where their view of a name differs from your fit result, the fit cell gives your result and what points away, then their view, marked as theirs.

## The Checks

Read [Weighing what was found](references/weighing.md) before the first lookup, because it says which facts about a match to gather: its reach, its dates, and the crowd around it. Run fit on every name first. Then work name by name for the checks the goal needs, and write each name's block as it finishes.

Start the script first for the whole set, in the background where the shell allows. Inside one name, start every lookup that does not depend on another together, the searches and page opens side by side while the script runs, as many at a time as the harness takes. Then run what they turn up, such as a suffix or a spelling the search surfaced. Read each reference once in a session. A couple of lookups that show a name is plainly unusable end its check, and the name goes on the removed list with the reason seen.

A name's **forms** are the other spellings the check searches. They come from rules and from the person, never from a guess at what someone would type:

- The spaced and the hyphenated form of a name made of two words
- Each spelling the person says people use for it, or that pages show people using for a name already in use
- Its respellings by rule. Apply each swap that fits the name by itself, in the order listed, then make one more with every swap except the last applied together. Keep the first four of these, and drop any shorter than three letters. The swaps are ph to f, ck to k, a hard c to k, x to ks, a final y to i, a doubled consonant to one, and a hard k to c. The script makes these without being given them, lists them under `ruleForms`, and looks them up

A form is a way of finding things. What turns up through one is a match only when its own name is the same as the name or near it, by the closeness rules in the weighing reference. A form that is an ordinary word or a common name in its own right returns that word's results, so search it only beside a category word and read only what is in the product's field.

The forms are a net with holes. A name that sounds the same and is spelled some other way turns up only when a store search, the script's `soundNear` list of marks, an office's own sound search, or the stem search returns it, so no result says that nothing sounds like the name.

1. **Search:** Is the name already taken in search results? Taken means the first page of results for the bare name, and for the name beside the category words, shows a product, company, or project of that name in or near the goal's field. Run it with your own web search, or read the script's `web` section when `BRAVE_SEARCH_API_KEY` is set. Also run the forms beside the category words, the name and its domains beside scam, fraud, lawsuit, and complaint, and the stem beside the category words. The stem is the leading word or root, and for a coined one-word name its first syllables or the root it was built from. Where the market's language is not English, write the category and adverse words in that language. A search tool's own summary of the results is not the page. When the tool lists the results beside its summary, read that list and leave the summary aside. When it returns a summary alone, fetch a results page instead. Open every result in or near the goal's field, every adverse claim about the name or its domain, and the top result for the bare name whatever it is. A result plainly in an unrelated field is recorded from its title
2. **Marketplaces:** Search the name, its forms, and its stem beside a category word, wherever a competitor of this product would be listed: the stores or directories of its own field in each market's storefront, and the code hosts and package registries when it is software or a developer tool. Compare the names of the top results with the name by the closeness rules, because a store search also returns names that are spelled differently and sound the same. Open each match and record its reach and its dates. When a match in or near the field turns up there, read the same measure for the first ten results for the category word, because reach is judged against the field. With no such match there is nothing to compare, so the field is not read
3. **Trademarks:** Query the registry of each market in the goal for the exact name and each form, and for the exact name also marks close in spelling, marks close in sound, marks the name starts with, and marks built on the name, where the office's search can do it. For each live mark that could weigh more than a note, record its goods or services, its filing, first-use, and registration dates, the upkeep filings made and the next one due, who its owner is and whether it still sells under the mark, and the owner's record of acting against other names. A web search restricted to a registry's site is not a registry query
4. **Domains and price:** Look up the exact name on `.com`, on each suffix in the goal, and on any suffix where the search turned up a site of that name. Record whether each is registered, since when, through whom, what it serves, and what it costs: the price to register where it is free, the asking price where it is for sale. A cheaper suffix, or an address that contains the name, is an acceptable route around a taken one, so price those too
5. **History:** For each domain the person could end up on, and any that surfaced in the search, list its archived copies and open the first, the last, and one from each year between, up to eight. A domain whose archive is older than its current registration had an earlier owner
6. **Words and sound:** Read the dictionary entries for the name and the person's spellings, in the main languages spoken in the goal's markets, and a slang dictionary for those languages: plain sense, slang, vulgar or medical senses, well-known people and places. A slang sense counts when a general dictionary also carries it or it is the slang dictionary's leading definition. An entry the dictionary shows under some other headword belongs to that word, and reaches the name only when that word is the name spelled another way, or an ordinary word that passes the one-letter or one-sound test in Fit. A rude word the name only resembles is the sound flag, never a finding. Then set the sound flag, which every name gets before ranking
7. **Matches:** For every match the checks above turned up in or near the field, open the thing itself and establish what it is, how close its name and field are, its reach in numbers, when it started, and whether buyers in the goal's markets can get it. A feature of a larger product counts as a product. A search snippet is not evidence. A near-name match says whether a person could plausibly confuse the two names and the two products, and is minor when they could not, with any legal question still named
8. **Weigh:** Give every finding its weight by the weighing reference
9. **Challenge:** Before the result, argue the other side from what was found. For a name heading to Clean or Fine, look for the reason not to use it: a match or mark set aside too quickly, a claim not opened, a product with the same stem or under one of the forms. For a name heading to Caution or Avoid, look for the reason the finding does not hold: another field, little reach beside its field, a match that came after the person's own use, a mark nobody keeps up or sells under, a field crowded with the same word. With helpers, one that has not seen the weights does this, by the challenger brief in [Delegating the check](references/delegating.md). Without helpers, do it yourself as a separate step, arguing from the facts alone before you read your weights back. Then set the label

The goal decides which of these run. A domain-only goal skips the marketplaces and the trademark checks unless a business will run on it, and a goal with no market skips them outright. A check the goal does not need is not a missing answer. A check the goal needs that cannot run by any route is.

The bundled script does much of this for any number of names: domain records with prices, archive history, United States word marks, the Apple stores, dictionary entries, and code registries with `--code`. With keys set in the environment it also reads web search, European Union word marks, and UK company records. It is why a run rarely needs a browser: the United States trademark search is a browser application with no results page to fetch, and its lists of near marks run to thousands of rows that have to be read to the end and sorted. It returns records and no judgment.

It prints a short summary for each name, or one line each for more than five, and keeps the full records in the `--out` file, a record of lookups and never a place for results. Every list of marks holds live and dead ones, the dead marked, and says how many it holds beside how many it shows. Where a list shows fewer live marks than it names, print it again with `--read` and the `--top` number the summary gives, which looks nothing up, before the trademark check counts. The summary says which keyed routes had no key, and which lookups are left to you, `yours` in the full records. That list is a start and not the whole remainder: every check the goal needs still has to run for its own markets and field. Run one copy at a time and give each name its spaced form and the person's spellings. Its `--help` says how to read the summary and every field, and names each key.

```bash
npx --yes github:LeeorNahum/naming-check-skill "<name>=<form>,<form>" ... --tlds com,<suffix> --category "<word>,<word>" --classes <class>,<class> --out <file>
node scripts/lookup.mjs "<name>=<form>,<form>" ... --tlds com,<suffix> --category "<word>,<word>" --classes <class>,<class> --out <file>
```

Read [Running the lookups](references/lookups.md) when the script cannot run or reports a failed lookup, when there is no web access, when a market is outside the United States or the product is not software, when the goal names a company or a place of formation, or when a service refuses a request.

Three rules hold the checks together:

- **A check ran when each lookup it lists returned an answer,** by the first route or an alternate one. Nothing found is an answer. Record it with the query used
- **A check that could not run leaves a missing answer.** Try the alternate routes in the reference first. If none works, the name's line names the check and gives the person the link to run it themselves, and no finding that depends on it is given. The same holds for a match in or near the field that cannot be opened and that nothing else establishes
- **A lead is followed to its end.** Anything seen along the way that could matter is opened and settled as a finding or dismissed with a reason before any label

### The Company Register

When the goal gives a legal entity name or a place of formation, look the name up on that place's company register, by the Company Registers section of [Running the lookups](references/lookups.md). The name looked up is the legal name the goal gives, or each candidate when it gives only a place. With a legal name and no place, ask where the company will be formed, and report the lookup as `Open` until that is known.

A register only keeps two entities on its own books from sharing a name. It says nothing about marks, products, or other places. So by default it is a lookup of its own, reported on its own line, and it never sets or moves a label. The exception is a goal that makes the company name the thing being named, where the person is choosing the legal name and nothing else. Then the register is one of the checks the goal needs: `Not available` is a blocking finding, and `Open` is a missing answer.

Report it as one of three results:

- **Available:** On that date the register's own search showed no entity and no reservation under the same or a near name. The filed name still needs the ending that place requires for the kind of company, such as LLC. The line names the register, the date, and the nearest names seen
- **Not available:** An entity or a reservation on the register is in the way. The line names it
- **Open:** The register gave no answer, so nothing is known yet. The line gives the person the link and the exact terms to enter, and what a third-party index showed, as that index's answer, which never makes a name `Available`

An entity the register shows under the same or a near name, in a trade that could be in or near the field, is also a match for check 7.

## Weights, Labels, And What They Mean

A match existing is not a finding against the name. A taken domain, a dormant package, a stale listing, a small unrelated business, or a weak use somewhere does not by itself reject a strong candidate, and a strong name is worth the work of establishing what a match actually is.

Every finding gets one of four weights, by the rules in [Weighing what was found](references/weighing.md). The heaviest finding in a check sets that check's label, and the heaviest across the checks sets the name's label.

| Weight | What it is | Label it sets | What the person does |
| --- | --- | --- | --- |
| **Note** | A fact worth knowing that costs nothing | **Clean** | If the name also fits, adopt it. Register the address the same day, because someone else can take it at any time |
| **Cost** | A known, bounded price the person can simply accept or pay: sharing search results with a small product, a word shared with a crowded field, an address to buy, a new product with no reach shown, to watch | **Fine** | Adopt it, knowing the footnote |
| **Question** | Something only someone else can answer, whose answer could turn into a block: a trademark professional's opinion on a nearby mark, or an owner's consent | **Caution,** sized small, moderate, or large | Use it if they wish, and get that one answer before spending on filing, launch, or marketing. The size says how much rides on the answer, and the finding says why |
| **Blocks** | A named, observed fact that stands in the way now | **Avoid** | Drop it, or change the fact, for example by buying the name from its holder, getting its consent, or having a mark cancelled |

The labels are short so names compare at a glance. Each one is written with its plain consequence and its recommendation beside it, in the shape "<name>: Caution, moderate. Someone holds this exact name for <kind of software> in the United States, so the office may refuse your filing and they may object to your use. Ask a trademark lawyer before using it, or pick another." A Caution is never written without its size, and it names the one answer to get. The weighing reference says what each kind of finding usually means. Where a consequence turns on another office's law, it comes from that office's own published guidance read during the run. Where none was read, the result says only that a mark there is a question for a professional in that market.

Weights are evidence, not a tally. Notes do not add up to a cost, costs do not add up to a question, and questions do not add up to a block.

Every Fine, Caution, and Avoid carries a `To use it` entry stating what going ahead takes: the footnote to accept, the answer to get and from whom, or the fact to change. For a name already in use, it says what keeping the name takes. Labels are set once, after the challenge. Changing one later takes a new lookup, named in the result.

No label is legal clearance. Where a finding turns on trademark law, the check gathers the facts a trademark professional would ask for and says plainly that the answer is theirs.

### Ranking

Rank the names that stay from best to worst on the checks, in this order:

1. **The heaviest label,** lightest first: Clean, Fine, Caution small, Caution moderate, Caution large, Avoid
2. **How many checks sit at that label or heavier,** fewest first
3. **Fit,** better first
4. **The order the person gave,** for names still tied

Only labels from checks that can reach `Avoid` count in step 2. A name with a missing answer ranks after every fully answered name at its label, and the winner is always fully answered.

Say plainly which name wins on the checks, which is the first one, and why in one line. Show what the person likes beside the ranking, in its own column, and never fold it in, because winning on the checks and being liked are different things. Where the liked name ranks lower, say what ranks it lower.

## Many Names

The check is the same for five names and five hundred. Only the arrangement changes.

- **Remove duplicates first,** ignoring capitals and spaces
- **Run fit and the sound flag on the whole set first.** They cost no lookups, and they give the person something to react to
- **Run the script on the whole set,** one copy, writing to a file. A cheap lookup that removes a name early spares the dearer ones
- **Check name by name,** and finish each name's block before starting the next
- **Helpers are optional.** Spawn them in any harness through that harness's own spawn guidance, such as a spawn-guidance skill where one is installed, which says how to reach another model family from that harness. Give each helper whole names and the whole check by [Delegating the check](references/delegating.md), and read the reference before the first handoff. Without helpers, check the names yourself, in order
- **Put forward only what can be checked in full.** When a session ends before every name has been checked, say which names were not reached. They were never ranked, so they are not removals. They carry no result, and the next session checks them

## Output Format

Open with the goal as used, marking anything assumed, then the counts, then the ranking. The reply always carries every name that was not removed.

The templates below set what each result carries, not how it is laid out. Merge, rename, or reorder columns to suit the reply, as long as nothing is left out and fit, sound, clearance, and what the person likes stay in separate cells.

```markdown
Goal: <what the name is for, markets, encounter, addresses, first use of a current name, a company to form, with anything assumed marked>

Put forward <count>. Ranked <count>. Removed <count>. Not reached <count>.

**Winner on the checks:** <name>, <one line: what it has over the next>

| Rank | Name | What the name is | Fit | Sound | Result and what it means | To use it | Address and price | Liked |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| <number> | <name> | <its parts in everyday words, its language, or made up. Then how it was read, when the reading is assumed. Marked convergent when several passes or models produced it> | <result, with what points away when it is not Fits> | <the flag in the form "close to <word>", or blank> | <label with its size for Caution, then the heaviest finding in one plain line: what it usually means for the person> | <footnote to accept, or the answer to get and from whom. Blank for Clean> | <the best address, what it costs, and any cheaper suffix or containing address> | <the person's own view, marked as theirs, or blank> |

**Not answered**

- <name> | <the check, the answer still missing, and the link for the person to run it> | <what no conclusion is given on until then>

**Not reached**

- <name> | <generated or given, and its check not finished>

**Removed**

- <name> | <the observed reason, with its source> | <blocking finding in most checks, or a plainly unusable name seen early>

**Company register**

- <entity name> | <the register, the route, and the date> | <Available, Not available, or Open, written as "Open: the register gave no answer"> | <the nearest names seen, the entity in the way, or the link and terms for the person and what a third-party index showed>

**Next**

<Where the name in use ranks, which names are worth saying aloud, and for a name the person picks, the address to register and the accounts to claim that day.>
```

The line for what a result means answers two things at once: what the match is, in a few plain words, and how big it is, as a figure with the measure it counts, such as "<its name>, a <kind of product> with <figure> downloads". A match with no figure to read says so. For a mark the line says what it covers and whether anything is sold under it. For a finding that is not a product or a mark, the line says what it is and what it costs: the asking price of an address or that none is shown, the meaning and where a buyer meets it, the claim and whether it still shows in search. A date alone, such as how long a thing has existed, answers neither.

The company register list appears only when the goal gave an entity name or a place of formation. A name appears in the ranking, the removed list, or the not-reached list, and a ranked name with a missing answer also appears under Not answered. Names merged as duplicates are listed once, under the count. Give each ranked name its block:

```markdown
### <name>: <label, with its size for Caution>, <fit>

<What the name is, in one line.>

<One sentence naming the single heaviest piece of evidence for the label: what it is, how big it is, and what it usually means. One more for fit when it is not Fits.>

- <Blocks, Question, Cost, or Note> | <kind> | <what it is, its reach in numbers, its dates, with its link> | <finding and what it usually means>

To use it: <for Fine, Caution, and Avoid>

Said: <the person's reading, or the assumed one marked assumed> | Forms: <each form searched, marked spaced, hyphenated, the person's, or a respelling by rule>

Lookups:
- Search: <the queries run, and by what tool>
- Marketplaces: <which>
- Marks: <offices and route>
- Domains: <suffixes, and where the price came from>
- History: <domains>
- Words: <which>
- Matches: <what was opened>
- Not answered: <the check and the link, or none>
- Challenge: <who ran it>
```

Kind is one of product, trademark, domain, history, meaning, search ownership, genericness, or company register. A product or trademark finding states its field, its reach in numbers, when it started, and whether it is the same name or a near one, so its strength survives being summarized. A Question on a trademark also carries its exposure, in the shape the weighing reference gives.

Keep a block short. Findings that weigh more than a note get their evidence in full. Notes get one line each, and notes about unrelated fields share one line. The `Lookups` list is the proof the checks ran, so it is never omitted, and each entry is a few words, not a transcript.
