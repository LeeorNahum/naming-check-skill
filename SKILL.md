---
name: "naming-check"
description: "Use while generating, brainstorming, searching for, comparing, evaluating, or adopting a name for a brand, product, company, app, or domain, including when the user asks whether a name is taken or available, and even when they only want name ideas and never ask for a check. Gives every name a fit result, whether it sounds like the thing it names, and gives a clearance verdict, whether it is clear to use, only to names that received the one full check. The rest are reported as unchecked."
compatibility: "Clearance verdicts need web access. The bundled lookup script needs Node.js 18 or later and network access. Without web access the skill gives fit results only and lists the lookups for the person to run."
metadata:
  author: "Leeor Nahum"
  version: "2.0.0"
---

# Naming Check

The job is to get a person to a name they can adopt. Every name gets two separate results: **fit**, whether it sounds like the thing it names, and **clearance**, whether they can use it. Neither result stands in for the other.

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
5. **Taste so far:** Names they like or reject and why, anything the name must contain, and how they say and write each candidate when that is open
6. **A name already in use:** The date they first offered anything to the public under it, and what shows that date. Registering an address is not use. A date that a dated record shows decides who was first against a match. A date that is only stated is recorded, marked as not shown, and moves no weight, and the person is told to save proof now

What the person already owns under a name, such as its domain, product, or accounts, is theirs and is never a match against it.

## Fit

Fit asks what the name sounds like to someone who knows nothing about the product. Run these on every name, before any lookup:

- **Cold listener:** Given only the name, what kind of thing does a stranger take it for? Compare the first guess with the brief
- **Reading:** How will people say the written name? List each plausible reading, including readings from the first languages of the brief's markets, and say which one wins and whether it is the one the person intends
- **Hearing:** From hearing it once, what would a listener type? The exact name, its spaced or hyphenated form when it is made of two words, and up to three of those spellings are the name's **forms**, which the check searches. When listeners spell it correctly there are no others, so add none. A form that is an ordinary word or a common name in its own right loses the listener. Search it, in the search and store steps, only beside a category word, and leave it out of the trademark lookup and the script, where its results belong to the word
- **Meaning:** Does the name carry a cue to what the product does, or does it need a tagline to mean anything? Say which, because some owners want a name that explains itself and some do not. It is an observation and does not lower the result

A resemblance to another word is a finding only when it passes one of two tests. A listener, hearing the name, typed or named that word as what they heard. Or the word and the name differ by one sound when said, or by one letter when written. To count sounds, write both out as said, syllable by syllable, and count the vowel and consonant sounds that differ. A word that merely came to mind, to a listener or to you, is not a finding and is not reported. The bar is the same for an insult as for any other word.

| Result | Means |
| --- | --- |
| **Fits** | Nothing points away from the product. A stranger's first guess is the product's kind, or something else about the same subject, or nothing in particular, and the name is said and typed without trouble the way the brief says it will be met |
| **Partly fits** | It works, with named drawbacks: the right subject only in a second guess, a second reading, a spelling a listener gets wrong, a sound-alike that passed the test, an awkward short form |
| **Does not fit** | A stranger's first and second guesses are both about a different subject, or the name is one sound from a rude word, or has one as a whole part when said |

The subject is what the product deals in, such as bread for a bakery. A guess about that subject counts even when the stranger pictures another kind of thing, such as a bread cookbook. When the person has said how a name sounds to them, that is its fit result, and the listeners' result is shown beside it.

Where a reader and a hearer disagree, the result follows the one that matches the encounter in the brief, and the block reports both. The first impression has to come from someone who has not seen the brief. With subagents, give the names alone to ones that have seen nothing else, as [Delegating the check](references/delegating.md) describes. Without them, write your own first impression before rereading the brief and record the listener as yourself. Either way it is a stand-in. For a finalist the real test is the person's to run: say the name once to two people who do not know the product and ask what they heard and what they think it is.

Weigh the drawbacks by the encounter in the brief. A name passed by word of mouth pays the full price of an ambiguous spelling or reading. A name met as a link, a store listing, or an icon pays much less.

Fit never moves clearance, and the person's ear outranks the listeners' result. Report what the name sounds like and let their reaction settle it.

## The Full Check

One full check is six searches and some thirty to sixty page opens and registry lookups, more when a lead turns up. Read [Weighing what was found](references/weighing.md) before the first lookup, because it says which facts about a match to gather: its reach, its dates, and the crowd around it. Run fit on every name first. Then work name by name: finish every step for one name and write its block before starting the next, so an interruption leaves whole names checked and not every name half done.

1. **Search:** Run these six queries and read each whole first page. Where the market's language is not English, write the category and adverse words in that language. If the search tool returns only a summary, fetch a results page instead
   - `"<name>"`
   - `"<name>"` with the category words joined by OR
   - The other forms, each in quotes and joined by OR, with the category words
   - `("<name>" OR "<name>.<suffix>") (scam OR fraud OR lawsuit OR complaint)`
   - Up to six near forms, meaning misspellings not already among the forms, each in quotes and joined by OR, with the category words: a letter doubled or dropped, a vowel swapped, a respelling that sounds the same
   - The name's stem, meaning its leading word or root, in quotes, with the category words. This is how a product named with the same stem or the same sound turns up

   Open every result in or near the brief's niche, every adverse claim about the name or its domain, and the top result for the bare name whatever it is. A result plainly in an unrelated field is recorded from its title
2. **Marketplaces:** Search the name, its forms, and its stem beside a category word, wherever a competitor of this product would be listed: the stores or directories of its own field, and the code hosts and package registries when it is software. Say the names of the top results aloud against the name, because a store search returns what sounds alike. Open each match and record its reach and its dates. While there, read the same measure for the first ten results for the category word, because reach is judged against the field
3. **Trademarks:** Query the registry of each market in the brief for the exact name and each form, and for the exact name also marks close in spelling, marks close in sound, marks the name starts with, and marks built on the name, where the office's search can do it. For each live mark that could weigh more than a note, record its goods or services, its filing, first-use, and registration dates, the upkeep filings made and the next one due, who its owner is and whether it still sells under the mark, and the owner's record of acting against other names. A web search restricted to a registry's site is not a registry query
4. **Domains:** Look up the exact name on `.com`, on each suffix in the brief, and on any suffix where the search turned up a site of that name. Record whether each is registered, since when, and through whom, and open each registered one to see what it serves
5. **History:** For each domain the person could end up on, and any that surfaced in the search, list its archived copies and open the first, the last, and one from each year between, up to eight. A domain whose archive is older than its current registration had an earlier owner
6. **Languages:** Look up the name and its forms in a dictionary that covers the main languages spoken in the brief's markets, and in a slang dictionary for those languages: plain sense, slang, vulgar or medical senses, well-known people and places. A slang sense counts when a general dictionary also carries it or it is the slang dictionary's leading definition
7. **Matches:** For every match the steps above turned up in or near the niche, open the thing itself and establish what it is, how close its name and niche are, its reach in numbers, when it started, and whether buyers in the brief's markets can get it. A feature of a larger product counts as a product. A search snippet is not evidence
8. **Weigh:** Give every finding its weight by the weighing reference
9. **Challenge:** Before the verdict, argue the other side from what was found. For a name heading to Clean or Fine, look for the reason not to use it: a match or mark set aside too quickly, a claim not opened, a product with the same stem or sound. For a name heading to Caution or Avoid, look for the reason the finding does not hold: another niche, little reach beside its field, a match that came after the person's own use, a mark nobody keeps up or sells under, a field crowded with the same word. With subagents, one that has not seen the weights does this, as [Delegating the check](references/delegating.md) describes. Without them, do it yourself as a separate step. Then set the verdict

The bundled script runs the United States and Apple parts of steps 2 to 5 for any number of names: domain records, archive history, United States word marks, the Apple stores, and code registries with `--code`. It returns records and no judgment. Under `yours` it prints the first four searches, templates for the two you write yourself, and a few pages of steps 2 and 6 for each name, so two agents start from the same lookups. `yours` is a start and not the whole remainder: every step above still has to run for the brief's own markets and field. Run one copy at a time and give each name its forms, except ordinary-word forms. Its `--help` says how to read every field.

```bash
npx --yes github:LeeorNahum/naming-check-skill "<name>=<form>,<form>" ... --tlds com,<suffix> --category "<word>,<word>" --classes <class>,<class>
node scripts/lookup.mjs "<name>=<form>,<form>" ... --tlds com,<suffix> --category "<word>,<word>" --classes <class>,<class>
```

Read [Running the lookups](references/lookups.md) when the script cannot run or reports a failed lookup, when there is no web access, when a market is outside the United States or the product is not software, or when a service refuses a request.

Three rules hold the check together:

- **A step ran when each lookup it lists returned an answer,** by the first route or an alternate one. Nothing found is an answer. Record it with the query used
- **A step that could not run leaves the name unchecked.** Try the alternate routes in the reference first. If none works, the report names the step and gives the person the link to run it themselves. The same holds for a match in or near the niche that cannot be opened and that nothing else establishes
- **A lead is followed to its end.** Anything seen along the way that could matter is opened and settled as a finding or dismissed with a reason before any verdict

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

Most usable first means this order: names that are Clean or Fine and that fit or partly fit, then names that are Caution and that fit or partly fit, smaller first, then adoptable names that do not fit. Inside each group, lighter clearance first, then better fit. A name the person has said fits is ordered by their word.

```markdown
Brief: <product, markets, encounter, addresses, first use of a current name, with anything assumed marked>

Checked <count> of <total>. Adoptable <count>. Blocked <count>. Unchecked <count>.

**Names you could adopt, most usable first**

| Name | Clearance | Fit | What comes with it | To use it |
| --- | --- | --- | --- | --- |
| <name> | <Clean, Fine, or Caution with its size, as in "Caution, small"> | <result> | <the heaviest finding in plain words, with its reach and date> | <footnote to accept, or the answer to get and from whom. Blank for Clean> |

**Blocked**

| Name | Fit | The blocking fact | What would change it |
| --- | --- | --- | --- |

**Unchecked**

- <name> | Fit: <result> | <not reached, or the step that could not run, with the link for the person>

**Next**

<Whether any candidate beats the current name on both results, which names are worth saying aloud, and for a name the person picks, the address to register and the accounts to claim that day.>
```

A name appears in one of the three lists, never two and never none. Beyond about twenty names the reply carries the count, the adoptable table, the blocked and unchecked names by name, the next steps, and the path to the file holding every block. Names merged as duplicates are listed once, under the count. Give each checked name its block, in the reply for up to about five names and in the file beyond that:

```markdown
### <name>: <clearance, with its size for Caution>, <fit>

<One sentence naming the single heaviest piece of evidence for the clearance verdict, and one for fit.>

- <Blocks, Question, Cost, or Note> | <kind> | <what it is, its reach in numbers, its dates, with its link> | <finding>

To use it: <for Fine, Caution, and Avoid>

Sounds like: <first guess, then others> | Said: <readings> | Typed after hearing: <forms>

Lookups:
- Listener: <subagents that saw only names, or yourself>
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
