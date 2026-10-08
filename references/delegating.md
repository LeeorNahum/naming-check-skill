# Delegating The Check

How to hand the full check to subagents without it getting shallower: the order of work, how to split the set, the three briefs, and how to put the results together. A subagent starts with nothing, so each brief carries the whole job.

## Order Of Work

1. Settle the brief, including how the person says each name. Where they have not said, pick the most natural reading and mark it assumed
2. Tell the person what the set will cost and let them choose how far to go and in what order
3. Run the blind listeners on the whole set. Their answers give each name its fit result and its forms. A lead checking a few names itself still does this first, then works name by name, and hands each name's facts to a challenger as it finishes
4. Run the lookup script once on those names, with their forms, writing to a file with `--out`. Rerun it until no name has anything under `failed` or `notRun`, or do those lookups by hand, before any handoff
5. Hand the names to check workers, in waves. Workers run steps 1 to 8 and return the facts and their weights in two separate lists, with no verdict
6. Hand each finished wave's facts to a challenger
7. Set each verdict and write the blocks

## Splitting The Set

- A worker spends about six searches on each name, and every worker draws on the same session allowance where the harness has one. Many harnesses do not show it. Starting more workers than the allowance covers leaves every name half done and none checked, so when the allowance is unseen, start one small wave, see that it finishes, and go on from there
- Give each worker about five names, in the person's order, and tell it how many searches it has
- Start only as many workers at once as the allowance and the harness cover, and run further waves until every chosen name has been handed out or the allowance is spent. When the harness limits how many subagents one session may start, check fewer names in this session. Do not enlarge the batches
- Subagents do not run lookups through the script. One copy has already run, and several at once get refused by the registries. A worker that turns up a new form worth a registry lookup returns it under `New forms`, and the lead looks it up
- A worker finishes one name completely before starting the next, and returns unfinished names as unchecked with what it found so far. Hand those to a later worker with that record, so the check is finished and not restarted. Do not accept a thinner check in their place

## Blind Listener Briefs

Use subagents that see nothing but the names: one kind reads them and another kind hears them, so neither answer leaks into the other. What makes a listener usable is what it has seen, not whether it is new: one that has only ever been given lists of names can be given another list, and one that has seen the brief or any finding cannot. Shuffle the order, give each listener about ten names, and tell it the names are unrelated, because a whole set on one theme gives the theme away. For a market with more than one main language, run one pair of listeners per language.

```text
Answer as a speaker of [language] living in [country], from first impressions,
and do not look anything up. These are names of unrelated things: businesses,
products, places, or creative works.

Names as written: [names]

For each: write how you would pronounce it, syllable by syllable, and what kind
of thing you would guess it is (first guess, then one alternative).
```

```text
Answer as a speaker of [language] living in [country], from first impressions,
and do not look anything up. These are names of unrelated things: businesses,
products, places, or creative works.

Names as heard, written the way they sound: [phonetic respellings]

For each: write the spelling you would type to look it up, and what kind of
thing it sounds like (first guess, then one alternative). If you heard an
ordinary word, write that word.
```

The reader's pronunciations are the readings. The hearer's spellings join each name's forms, up to three, and they are a floor: the respelling it was given steers what it types, so real listeners will find more. The first guesses are the cold-listener result, and where the two listeners disagree, report both. The listeners are not asked what a name resembles, because asking produces associations nobody would hear. A sound-alike enters the result only by the two tests in the skill's Fit section: a hearer wrote that word as what it heard, or the two differ by one sound.

## Check Worker Brief

Fill in the bracketed parts and send it whole. Point the worker at the skill's `SKILL.md` and its lookups reference, or paste them.

```text
Run steps 1 to 8 of the naming-check full check on each name below. The check
is defined in SKILL.md at [path or pasted text], section "The Full Check", and
the weights in "Weighing what was found" at [path]. Read "Running the lookups"
at [path] when a route fails or the market or field is not covered. Follow
them exactly.

Brief:
- Product: [one line] Category words: [two or three]
- Buyers and markets: [who, which countries, city if local] Languages: [list]
- Encounter: [said aloud, typed, or tapped]
- Acceptable domain suffixes: [list]
- The person already owns: [domains, products, accounts, or none]
- First public use of a name already in use: [name and date, or none]

Names, each with its forms and what the blind listeners said of it: [about five, or a file path]

Registry records already looked up: [file path, one JSON line per name]. Run
[script command] --help once to learn how to read the fields. Do not use the
script for lookups. Each line lists under "yours" the searches and a few pages
still to run. Run them, write the near-form and stem searches yourself, then
run whatever else steps 1 to 7 require for this brief's markets and field. If a line's "failed" or "notRun" list is not empty,
do that lookup by a route in "Running the lookups", or return the name as
unchecked.

Rules:
- Finish one name completely before starting the next.
- Every step runs on every name. Do not stop a name early, even when the first
  result looks fatal, because the weighing depends on what the match turns out to be.
- Open every match in or near the niche and every adverse claim. A snippet is
  not evidence.
- A step you cannot run by any route makes that name unchecked.
- You have about [number] searches. When they are spent, stop and return the
  unfinished names as unchecked. Do not shorten the check to fit them in.
- Do not give a verdict. The verdict is set after a separate challenge.

Return for each finished name, in two lists so the first can be passed on
without the second:
Facts: <name>
1. <kind> | <what it is, its reach in numbers and the date read, when it
   started, where it is offered, with its link. For a product, the field
   beside it: the typical and leading pace of ten other products for the
   category word in the same place, or that the field could not be measured.
   For a live mark, its goods, its filing, first-use, and registration dates,
   the upkeep filings made and the next one due, who owns it, and what the
   owner sells under it today>
2. ...
Weights: <name>
1. <Blocks, Question, Cost, or Note> | <for a product or trademark: niche,
   reach, same or near name by sight and by sound, who was first> | <why>
2. ...
To use it: <what going ahead would take, if any weight is above Note>
Keep the facts free of weights, opinions, and remarks to whoever reads them
next. A fact that weighs as a note is one line.
Lookups: <the list from the "Output Format" section, without Listener and
  Challenge. Name every form each lookup was run on>
New forms: <any spelling you met that needs a registry lookup, or none>

Return each unfinished name as:
Unchecked: <name> | steps done | steps still to run, with the exact queries |
facts found so far, each with its link and date, with no weight
```

## Challenger Brief

One subagent that has not seen any weight takes a wave's finished names, about five to ten. Give it the brief, each name's `Facts` list as the worker returned it, and what the listeners said. A challenger that has only ever been given facts can take further waves, since it has still seen no weight.

```text
Below is what a name check found for this product: [brief]. For each name you
get the findings without the conclusion. Your job is to test them from both sides.

For each name:
- Look for the reason not to use it. Open any match, mark, or claim below that
  was noted and not opened, and say what it is. Search the stores and the web
  for a product in this field whose name has the same stem or the same sound,
  since exact-name lookups miss those.
- Look for the reason a serious finding does not hold. For each match in or
  near the product's niche, confirm from its own page what it is, how many
  people use it (ratings, installs, stars, with the date), when it started,
  whether it is offered in the markets above, and when it was last active.
- For each live trademark below, say how the two names differ when said
  aloud, whether the owner still sells under the mark (with the page and
  date), whether its upkeep filings are in, and how many other names in the
  field share the close part.
- For each product whose reach decides something, check its figure, its
  release date, and the field figures given beside it.
- Say which single fact about the name matters most, and why.

Findings: [per name: each finding with its link and date, the lookups that ran,
and how strangers pronounced and spelled the name]

Registry file: [path]. Each line is JSON for one name, holding domain
registrations, archive captures, United States trademarks, and app store results.

Use web search and page fetches only. Return each point with its link and date.
Do not give a verdict.
```

## Putting Results Together

- A finding a subagent returns with its link and date counts as opened. Carry it into the block as returned
- Weigh the challenger's points with the weighing reference, change a worker's weight only where a point calls for it, and say so in the block
- Set the verdict from the heaviest weight and write the block, with who ran the challenge in its `Lookups` list. A name whose challenge did not run is reported as unchecked, with its findings as plain facts and no weights
- Read each worker's `Lookups` list against the name's forms before accepting its findings. Where a lookup is missing, run it yourself, add it to the list marked as run by the lead, and only then count the step. A name with a lookup still missing is unchecked
- Count before reporting: names handed out, names checked, names unchecked. The numbers have to reconcile with the deduplicated set
- Write to the results file as each worker and challenger returns: findings awaiting a challenge under their own heading with no verdict, then finished blocks
