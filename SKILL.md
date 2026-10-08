---
name: "naming-check"
description: "Use while generating, brainstorming, searching for, comparing, evaluating, or adopting a name for a brand, product, company, app, or domain, including when the user asks whether a name is taken or available, and even when they only want name ideas and never ask for a check. Gives every name a fit result, what the name says and whether anything in it points the wrong way, and gives a clearance verdict, whether it is clear to use, only to names that received the one full check. The rest are reported as unchecked."
compatibility: "Clearance verdicts need web access. The bundled lookup script needs Node.js 18 or later and network access. Without web access the skill gives fit results only and lists the lookups for the person to run."
metadata:
  author: "Leeor Nahum"
  version: "2.1.0"
---

# Naming Check

The job is to get a person to a name they can adopt. Every name gets two separate results: **fit**, what the name says and whether anything in it points the wrong way, and **clearance**, whether they can use it. Neither result stands in for the other.

Most names worth having come with something attached: a small product somewhere with a similar name, a taken address, a mark in the neighborhood. So the check exists to show what a name costs, and the result shows every name the person could adopt, most usable first. Only a named, observed blocking fact rules a name out.

## Checked Or Unchecked

Fit needs no lookups, so every name in play gets a fit result. Clearance needs the full check, and for clearance a name is in one of two states with nothing in between.

- **Checked:** Every step of the full check below ran on it. Only a checked name carries a clearance verdict
- **Unchecked:** Anything less. An unchecked name carries no clearance verdict and no hint of one, only the reason it is unchecked and the steps still to run

A verdict hedged with a word such as probably or provisional is a guess, so no verdict is hedged. Never thin the check to cover more names. Depth is fixed and coverage is what varies. When a set cannot all be checked, the report lists exactly which names were checked and which were not.

Do not rule out a candidate until it has actually been checked. Pattern resemblance, the shape of a name, and the assumption that a common construction must already be taken are prompts to investigate, not evidence of a collision. A name set aside on a hunch goes in the unchecked list like any other.

Check every name in play: each candidate the person gave, each one generated for them, and the name they use now, which is the one every candidate has to beat. A word in their message that could be a candidate is a candidate. A name they say was checked elsewhere is unchecked here unless they supply that check's record and it shows every step of the full check.

When the job includes coming up with names, read [Generating candidates](references/generating.md) before producing any.

## The Brief

The check is measured against the product, so establish these before any lookup. Ask once, briefly, for whatever is missing. When there is no one to ask, state the assumed brief at the top of the result so a wrong assumption is visible. Two products get two briefs.

1. **Product:** What it is in one line, and the two or three category words a buyer would search for
2. **Buyers and markets:** Who it is for and in which countries, and for a local business which city or region. This sets the trademark offices, the languages, and the country suffixes
3. **Encounter:** Whether the name will mostly be said aloud, typed from memory, or tapped as a link, store listing, or icon
4. **Addresses:** The domain suffixes the person would accept, and the platforms where the product needs an account. With none given, assume `.com` and the country suffix of the first market. Some things need no address of their own, and the brief says so
5. **Taste so far:** Names they like or reject and why, anything the name must contain or must not be, how they say each candidate, and any spelling they have seen people use for it
6. **A name already in use:** The date they first offered anything to the public under it, and what shows that date. Registering an address is not use. A date that a dated record shows decides who was first against a match. A date that is only stated is recorded, marked as not shown, and moves no weight, and the person is told to save proof now
7. **A company to form:** The legal name the company will be filed under, and the state or country where it will be formed, when the person gives either. With a place and no legal name, the names are the candidates themselves. It adds the lookup under The Company Register

What the person already owns under a name, such as its domain, product, or accounts, is theirs and is never a match against it.

## Fit

Fit reports what the name is and what it says, and whether anything in it points the wrong way. Run it on every name, before any lookup.

### What The Name Is

Every name gets one short line saying what it is, in words a person with no background follows:

- **Its parts,** and what each one is in everyday terms. A part taken from a trade, a science, or another language is explained down to something ordinary, so "carto" is cartography, the drawing of maps, and not just "cartography"
- **Its language,** for a word or a part from another language, with its plain meaning there
- **Made up,** when it is, with any word it was built from
- **An unrelated meaning,** when the name is a real word somewhere that has nothing to do with the product, said as plainly as the rest

Write the line from what the name is made of and what its words mean in ordinary dictionary use, as far as you know it without looking it up, not from what it might remind someone of. If any word in the line would make a reader ask what that is, the line answers it. Where you cannot tell where a part comes from, say so and do not supply an origin. For a checked name the Languages step tests the line, and the line and the fit result are both corrected to what that step found. The line goes wherever a name's fit result goes.

### The Result

| Result | Means |
| --- | --- |
| **Fits** | Nothing in the name points away from the product. Its parts say or point to what the product deals in, or it is made up, or it is a real word whose meaning has nothing to do with the product and that no buyer would take for the product's kind. A made-up name that suggests nothing fits, because that is a kind of name people choose on purpose |
| **Partly fits** | One part points away and another part suits, or the name misses something the person said they would like |
| **Does not fit** | The name's only or main meaning is another kind of product or trade a buyer could take this one for, or the name is or contains a rude or embarrassing word in a language of the brief's markets, or it is something the person said the name must not be |

When two rows apply, the lower one is the result.

A part points somewhere only when it is a word, or a root in everyday use, in a language of the brief's markets. An echo of a root those buyers do not use, or of some other brand, is not a meaning. A word the name resembles is treated as if the name contained it only when the two differ by one letter as written, or by one sound as the name is said. To count sounds, write both out as said, syllable by syllable, and count the vowel and consonant sounds that differ. Then the word is placed by the table like any other part. A resemblance that fails this test is not a finding and is not reported. The bar is the same for an insult as for any other word.

Whether a name explains the product or needs a tagline is not a fit finding. Some owners want one kind and some the other. When the person has said which, a name of the other kind misses that preference.

### How It Sounds Is The Person's Call

How a name is heard, said, and spelled from memory is for the person to judge. They can say it aloud and hear it, and you cannot. A guess at how a stranger would say, hear, or type a name, whether yours or a subagent's, is not evidence. It does not lower a fit result, it is not a finding, and it adds no spelling to the search.

The check still needs one reading of each name, to compare its sound with other names. Use the way the person says it. Where they have not said, take the most natural reading, show it in the result marked as assumed, and let them correct it. Write a reading as plain syllables with the stressed one in capitals, never in phonetic symbols. A fit result or a finding that turns on an assumed reading says so wherever it is shown, the table included.

What the person says about a name is taken as given: how it sounds to them, how they say it, a spelling they have seen people use for it, whether they like it. It sets the reading, and it can add a spelling to search. Where their view of a name differs from your result, the fit cell gives your result and what points away, then their view, marked as theirs. Their view decides the order, and a meaning you found is never left out because they like the name. For a finalist, tell the person the one check only they can run: say the name once to two people who do not know the product, and ask what they heard and how they would write it.

Fit never moves clearance.

## The Full Check

One full check is five searches and some thirty to sixty page opens and registry lookups, more when a lead turns up. Read [Weighing what was found](references/weighing.md) before the first lookup, because it says which facts about a match to gather: its reach, its dates, and the crowd around it. Run fit on every name first. Then work name by name: finish every step for one name and write its block before starting the next, so an interruption leaves whole names checked and not every name half done.

Inside one name, start steps 1 to 6 together: the script first, in the background where the shell allows, and the searches and page opens side by side while it runs, as many at a time as the harness takes. Then run what they turn up, such as a suffix or a spelling the search surfaced. Read each reference once in a session.

A name's **forms** are the other spellings the check searches. They come from rules and from the person, never from a guess at what someone would type:

- The spaced and the hyphenated form of a name made of two words
- Each spelling the person says people use for it, or that pages show people using for a name already in use
- Its respellings by rule. Apply each swap that fits the name by itself, in the order listed, then make one more with every swap except the last applied together. Keep the first four of these, and drop any shorter than three letters. The swaps are ph to f, ck to k, a hard c to k, x to ks, a final y to i, a doubled consonant to one, and a hard k to c. The script makes these without being given them, lists them under `ruleForms`, and looks them up

A form is a way of finding things. What turns up through one is a match only when its own name is the same as the name or near it, by the closeness rules in the weighing reference. A form that is an ordinary word or a common name in its own right returns that word's results, so search it only beside a category word and read only what is in the product's field. Meanings are looked up for the name and the person's spellings, never for a respelling made by rule.

The forms are a net with holes. A name that sounds the same and is spelled some other way turns up only when a store search, the script's `soundNear` list of marks, an office's own sound search, or the stem search returns it, so no verdict says that nothing sounds like the name.

1. **Search:** Run these five queries and read each whole first page. Where the market's language is not English, write the category and adverse words in that language. A search tool's own summary of the results is not the page. When the tool lists the results beside its summary, read that list and leave the summary aside. When it returns a summary alone, fetch a results page instead
   - `"<name>"`
   - `"<name>"` with the category words joined by OR
   - The forms, each in quotes and joined by OR, with the category words. A name with no forms skips this query, and the `Lookups` list says so
   - `("<name>" OR "<name>.<suffix>") (scam OR fraud OR lawsuit OR complaint)`, with the name under every suffix in the brief
   - The name's stem, meaning its leading word or root, in quotes, with the category words. This is how a product named with the same stem or the same sound turns up

   Open every result in or near the brief's niche, every adverse claim about the name or its domain, and the top result for the bare name whatever it is. A result plainly in an unrelated field is recorded from its title
2. **Marketplaces:** Search the name, its forms, and its stem beside a category word, wherever a competitor of this product would be listed: the stores or directories of its own field, and the code hosts and package registries when it is software. Compare the names of the top results with the name by the closeness rules, because a store search also returns names that are spelled differently and sound the same. Open each match and record its reach and its dates. When a match in or near the niche turns up there, read the same measure for the first ten results for the category word, because reach is judged against the field. With no such match there is nothing to compare, so the field is not read, and the `Lookups` list says so
3. **Trademarks:** Query the registry of each market in the brief for the exact name and each form, and for the exact name also marks close in spelling, marks close in sound, marks the name starts with, and marks built on the name, where the office's search can do it. For each live mark that could weigh more than a note, record its goods or services, its filing, first-use, and registration dates, the upkeep filings made and the next one due, who its owner is and whether it still sells under the mark, and the owner's record of acting against other names. A web search restricted to a registry's site is not a registry query
4. **Domains:** Look up the exact name on `.com`, on each suffix in the brief, and on any suffix where the search turned up a site of that name. Record whether each is registered, since when, and through whom, and open each registered one to see what it serves
5. **History:** For each domain the person could end up on, and any that surfaced in the search, list its archived copies and open the first, the last, and one from each year between, up to eight. A domain whose archive is older than its current registration had an earlier owner
6. **Languages:** Look up the name and the person's spellings of it in a dictionary that covers the main languages spoken in the brief's markets, and in a slang dictionary for those languages: plain sense, slang, vulgar or medical senses, well-known people and places. A slang sense counts when a general dictionary also carries it or it is the slang dictionary's leading definition. An entry the dictionary shows under some other headword belongs to that word, and reaches the name only when that word passes the one-letter or one-sound test in Fit
7. **Matches:** For every match the steps above turned up in or near the niche, open the thing itself and establish what it is, how close its name and niche are, its reach in numbers, when it started, and whether buyers in the brief's markets can get it. A feature of a larger product counts as a product. A search snippet is not evidence
8. **Weigh:** Give every finding its weight by the weighing reference
9. **Challenge:** Before the verdict, argue the other side from what was found. For a name heading to Clean or Fine, look for the reason not to use it: a match or mark set aside too quickly, a claim not opened, a product with the same stem or under one of the forms. For a name heading to Caution or Avoid, look for the reason the finding does not hold: another niche, little reach beside its field, a match that came after the person's own use, a mark nobody keeps up or sells under, a field crowded with the same word. With subagents, one that has not seen the weights does this, by the challenger brief in [Delegating the check](references/delegating.md). Start it as soon as step 7's facts are written and weigh while it works, since it is not shown the weights. Without subagents, do it yourself as a separate step. Then set the verdict

The bundled script runs the United States and Apple parts of steps 2 to 5 for any number of names: domain records, archive history, United States word marks, the Apple stores, and code registries with `--code`. It exists for the marks, which a page fetch cannot get: the United States trademark search is a browser application with no results page to fetch, and its lists of near marks run to thousands of rows that have to be read to the end and sorted. The other lookups ride along so that one paced run asks every registry the same way for every name. It returns records and no judgment.

It prints a short summary for each name, or one line each for more than five, and keeps the full records in the `--out` file. Every list of marks holds live and dead ones, the dead marked, and says how many it holds beside how many it shows. Where a list shows fewer live marks than it names, print it again with `--read` and the `--top` number the summary gives, which looks nothing up, before the Trademarks step counts. The summary ends with the lookups left to you, `yours` in the full records: the first four searches, a template for the stem search, which you write yourself, and a few pages of steps 2 and 6. That list is a start and not the whole remainder: every step above still has to run for the brief's own markets and field. Run one copy at a time and give each name its spaced form and the person's spellings. It adds the respellings by rule itself and lists them, as `ruleForms` in the full records. Its `--help` says how to read the summary and every field.

```bash
npx --yes github:LeeorNahum/naming-check-skill "<name>=<form>,<form>" ... --tlds com,<suffix> --category "<word>,<word>" --classes <class>,<class> --out <file>
node scripts/lookup.mjs "<name>=<form>,<form>" ... --tlds com,<suffix> --category "<word>,<word>" --classes <class>,<class> --out <file>
```

Read [Running the lookups](references/lookups.md) when the script cannot run or reports a failed lookup, when there is no web access, when a market is outside the United States or the product is not software, when the brief names a company or a place of formation, or when a service refuses a request.

Three rules hold the check together:

- **A step ran when each lookup it lists returned an answer,** by the first route or an alternate one. Nothing found is an answer. Record it with the query used
- **A step that could not run leaves the name unchecked.** Try the alternate routes in the reference first. If none works, the report names the step and gives the person the link to run it themselves. The same holds for a match in or near the niche that cannot be opened and that nothing else establishes
- **A lead is followed to its end.** Anything seen along the way that could matter is opened and settled as a finding or dismissed with a reason before any verdict

### The Company Register

When the brief gives a legal entity name or a place of formation, look the name up on that place's company register, by the Company Registers section of [Running the lookups](references/lookups.md). The name looked up is the legal name the brief gives, or each candidate when it gives only a place. With a legal name and no place, ask where the company will be formed, and report the lookup as `Open` until that is known.

It is a lookup of its own and not one of the nine steps, because it answers another question. A register only keeps two entities on its own books from sharing a name. It says nothing about marks, products, or other places. So whatever it answers, and when it does not answer, the name's clearance verdict stands as the nine steps set it, and no verdict answers for the register.

Report it on its own line, as one of three results:

- **Available:** On that date the register's own search showed no entity and no reservation under the same or a near name. The filed name still needs the ending that place requires for the kind of company, such as LLC. The line names the register, the date, and the nearest names seen
- **Not available:** An entity or a reservation on the register is in the way. The line names it
- **Open:** The register gave no answer, so nothing is known yet. The line gives the person the link and the exact terms to enter, and what a third-party index showed, as that index's answer

An entity the register shows under the same or a near name, in a trade that could be in or near the niche, is also a match for step 7.

## Weights And Verdicts

A match existing is not a finding against the name. A taken domain, a dormant package, a stale listing, a small unrelated business, or a weak use somewhere does not by itself reject a strong candidate, and a strong name is worth the work of establishing what a match actually is.

Every finding gets one of four weights, by the rules in [Weighing what was found](references/weighing.md). The heaviest finding sets the verdict.

| Weight | What it is | Verdict it sets | What the person does |
| --- | --- | --- | --- |
| **Note** | A fact worth knowing that costs nothing | **Clean** | If the name also fits, adopt it. Register the address the same day, because someone else can take it at any time |
| **Cost** | A known, bounded price the person can simply accept or pay: sharing search results with a small product, a word shared with a crowded field, an address to buy, a new product with no reach shown, to watch | **Fine** | Adopt it, knowing the footnote |
| **Question** | Something only someone else can answer, whose answer could turn into a block: a trademark professional's opinion on a nearby mark, or an owner's consent | **Caution,** sized small, moderate, or large | Use it if they wish, and get that one answer before spending on filing, launch, or marketing. The size says how much rides on the answer, and the finding says why |
| **Blocks** | A named, observed fact that stands in the way now | **Avoid** | Drop it, or change the fact, for example by buying the name from its holder, getting its consent, or having a mark cancelled |

Clean, Fine, and Caution are all names the person can adopt, and the result says so. A Caution is never written without its size, as in "Caution, small", and it names the one answer to get. Whether to go on with the name while getting the answer is the person's choice, and the size is there to inform it. For large exposure the result says to get the answer first. Nothing lighter than a blocking fact may be written, ordered, or summarized as if the name were out.

Weights are evidence, not a tally. Notes do not add up to a cost, costs do not add up to a question, and questions do not add up to a block.

Every Fine, Caution, and Avoid carries a `To use it` entry stating what going ahead takes: the footnote to accept, the answer to get and from whom, or the fact to change. For a name already in use, it says what keeping the name takes. Clearance is set once, after the challenge. Changing it later takes a new lookup, named in the report.

No verdict is legal clearance, and nothing here is legal advice. Where a finding turns on trademark law, the check gathers the facts a trademark professional would ask for and says plainly that the answer is theirs.

## Many Names

The check is the same for five names and five hundred. Only the arrangement changes.

- **Remove duplicates first,** ignoring capitals and spaces
- **Say what the set will cost before starting:** The names times the cost of one check, given above. Many harnesses limit searches in a session without showing the limit, so say when you cannot see one, and work strictly in order so that running out costs only the end of the list. Then let the person choose: all of it, across as many sessions as it takes, or an order to work through. The choice is theirs. When they have already said to check everything, or there is no one to ask, state the cost and go on
- **Run fit on the whole set first.** It costs no lookups, and it gives the person something to react to
- **Order by the person, not by your taste:** Their own candidates and their current name first, then the names they reacted to, then the rest in the order given. Your own taste favors the names everyone reaches for, which are the likeliest to be taken, so choosing by it makes a list look worse than it is. Fit orders the names and never removes one: a name that does not fit is checked last, not dropped
- **Run the script on the names this session will reach,** one copy, writing to a file
- **Up to about five names,** run the checks yourself
- **Beyond that, fan out:** Hand batches of about five names to subagents that each run steps 1 to 8, in waves sized to what the session can spend, and have the challenge run on each wave as it returns. Read [Delegating the check](references/delegating.md) before the first handoff
- **Without subagents,** check in order for as long as the session allows, then stop and report
- **Save as you go:** Beyond about five names, write each name's block to a file as it finishes. Keep what was found for an unfinished name there too, as plain facts with links and the steps still to run, with no weight and no verdict, so a later session finishes the check and does not restart it

## Output Format

Open with the brief as used, marking anything assumed, then the count, then every checked name the person could adopt, most usable first, then the blocked names, the unchecked list, and what to do next. The adoptable names go in one table, or in one table per group below when there are many.

Most usable first means this order: names that are Clean or Fine and that fit or partly fit, then names that are Caution and that fit or partly fit, smaller first, then adoptable names that do not fit. Inside each group, lighter clearance first, then better fit. A name the person has said they like is ordered as a name that fits.

The templates below set what each result carries, not how it is laid out. Merge, rename, or reorder columns to suit the reply, as long as nothing is left out and fit and clearance stay in separate cells.

```markdown
Brief: <product, markets, encounter, addresses, first use of a current name, a company to form, with anything assumed marked>

Checked <count> of <total>. Adoptable <count>. Blocked <count>. Unchecked <count>.

**Names you could adopt, most usable first**

| Name | What the name is | Fit | Clearance | What comes with it | To use it |
| --- | --- | --- | --- | --- | --- |
| <name> | <its parts in everyday words, its language, or made up. Then how it was read, when the reading is assumed> | <result, with what points away when it is not Fits> | <Clean, Fine, or Caution with its size, as in "Caution, small"> | <the heaviest finding in one line: what it is and how big it is> | <footnote to accept, or the answer to get and from whom. Blank for Clean> |

**Blocked**

| Name | What the name is | Fit | The blocking fact | What would change it |
| --- | --- | --- | --- | --- |

**Unchecked**

- <name> | <what the name is> | Fit: <result> | <not reached, or the step that could not run, with the link for the person>

**Company register**

- <entity name> | <the register, the route, and the date> | <Available, Not available, or Open, written as "Open: the register gave no answer"> | <the nearest names seen, the entity in the way, or the link and terms for the person and what a third-party index showed>

**Next**

<Whether any candidate beats the current name on both results, which names are worth saying aloud, and for a name the person picks, the address to register and the accounts to claim that day.>
```

The line for what comes with a name, and for a blocking fact, answers two things at once: what the match is, in a few plain words, and how big it is, as a figure with the measure it counts, such as "<its name>, a <kind of product> with <figure> downloads". A match with no figure to read says so. For a mark the line says what it covers and whether anything is sold under it. For a finding that is not a product or a mark, the line says what it is and what it costs: the asking price of an address or that none is shown, the meaning and where a buyer meets it, the claim and whether it still shows in search. A date alone, such as how long a thing has existed, answers neither.

The company register list appears only when the brief gave an entity name or a place of formation. A name appears in one of the three lists of names, never two and never none. Beyond about twenty names the reply carries the count, the adoptable table, the blocked and unchecked names by name, the next steps, and the path to the file holding every block. Names merged as duplicates are listed once, under the count. Give each checked name its block, in the reply for up to about five names and in the file beyond that:

```markdown
### <name>: <clearance, with its size for Caution>, <fit>

<What the name is, in one line.>

<One sentence naming the single heaviest piece of evidence for the clearance verdict: what it is and how big it is. One more for fit when it is not Fits.>

- <Blocks, Question, Cost, or Note> | <kind> | <what it is, its reach in numbers, its dates, with its link> | <finding>

To use it: <for Fine, Caution, and Avoid>

Said: <the person's reading, or the assumed one marked assumed> | Forms: <each form searched, marked spaced, hyphenated, the person's, or a respelling by rule>

Lookups:
- Search: <the queries run>
- Marketplaces: <which>
- Marks: <offices and route>
- Domains: <suffixes>
- History: <domains>
- Languages: <which>
- Challenge: <who ran it>
```

Kind is one of product, trademark, domain, history, meaning, search ownership, or genericness. A product or trademark finding states its niche, its reach in numbers, when it started, and whether it is the same name or a near one, so its strength survives being summarized. A Question on a trademark also carries its exposure, in the shape the weighing reference gives.

Keep a block short. Findings that weigh more than a note get their evidence in full. Notes get one line each, and notes about unrelated fields share one line. The `Lookups` list is the proof the check ran, so it is never omitted, and each entry is a few words, not a transcript.
