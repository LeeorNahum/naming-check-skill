# Delegating The Check

How to hand the full check to subagents without it getting shallower: the order of work, how to split the set, the two briefs, and how to put the results together. A subagent starts with nothing, so each brief carries the whole job.

## Order Of Work

1. Settle the brief, including how the person says each name. Where they have not said, pick the most natural reading and mark it assumed
2. Tell the person what the set will cost and let them choose how far to go and in what order
3. Run fit on the whole set, and write for each name the line saying what it is and its reading. A lead checking a few names itself still does this first, then works name by name, and hands each name's facts to a challenger as it finishes, weighing them while the challenger works
4. Run the lookup script once on those names, with their spaced forms and the person's spellings, writing to a file with `--out`. Each name's forms are those plus the ones the script lists under `ruleForms`. Rerun it until no name is marked `INCOMPLETE`, or do those lookups by hand, before any handoff. Workers and challengers read its summaries. Print each name's with `--read`, at the `--top` number the summary gives where a list shows fewer live marks than it names, and hand those over
5. Hand the names to check workers, in waves. Workers run steps 1 to 8 and return the facts and their weights in two separate lists, with no verdict
6. Hand each finished wave's facts to a challenger
7. Set each verdict and write the blocks

## Splitting The Set

- A worker spends about five searches on each name, and every worker draws on the same session allowance where the harness has one. Many harnesses do not show it. Starting more workers than the allowance covers leaves every name half done and none checked, so when the allowance is unseen, start one small wave, see that it finishes, and go on from there
- Give each worker about five names, in the person's order, and tell it how many searches it has
- Start only as many workers at once as the allowance and the harness cover, and run further waves until every chosen name has been handed out or the allowance is spent. When the harness limits how many subagents one session may start, check fewer names in this session. Do not enlarge the batches
- Subagents do not run lookups through the script. One copy has already run, and several at once get refused by the registries. For a name already in use, a worker that sees other people write that name another way returns the spelling under `New forms`, with the link, and the lead looks it up. Any other spelling met on a page is a possible match, reported as a fact
- The company register lookup, when the brief calls for one, is the lead's. It runs once and is no part of a worker's steps
- A worker finishes one name completely before starting the next, and returns unfinished names as unchecked with what it found so far. Hand those to a later worker with that record, so the check is finished and not restarted. Do not accept a thinner check in their place

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

Names, each with its reading and its forms: [about five, or a file path]

Registry records already looked up: [the script's printed summary for each
name, pasted or as a file path]. The full records are in [file path]. To see
more of a list of marks, run [script command] <name> --out [file path] --read
--top <n>, which looks nothing up. Do not run the script any other way. Each
summary ends with the searches and a few pages still yours to run. Run them,
write the stem search yourself, then run whatever else steps 1 to 7 require
for this brief's markets and field. If a summary says INCOMPLETE or marks a
section "not run", do that lookup by a route in "Running the lookups", or
return the name as unchecked.

Rules:
- Finish one name completely before starting the next.
- Every step runs on every name. Do not stop a name early, even when the first
  result looks fatal, because the weighing depends on what the match turns out to be.
- Open every match in or near the niche and every adverse claim. A snippet is
  not evidence.
- A step you cannot run by any route makes that name unchecked.
- You have about [number] searches. When they are spent, stop and return the
  unfinished names as unchecked. Do not shorten the check to fit them in.
- Search the forms you were given and add none of your own. How a stranger
  might say, hear, or type a name is not a finding, so do not report it.
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
Lookups: <the list from the "Output Format" section, without Challenge.
  Name every form each lookup was run on>
New forms: <for a name already in use, any other way you saw people write
  it, with the link, or none. Any other spelling is a possible match and
  goes under Facts>

Return each unfinished name as:
Unchecked: <name> | steps done | steps still to run, with the exact queries |
facts found so far, each with its link and date, with no weight
```

## Challenger Brief

One subagent that has not seen any weight takes a wave's finished names, about five to ten. Give it the brief, each name's `Facts` list as the worker returned it, and the reading and forms used. A challenger that has only ever been given facts can take further waves, since it has still seen no weight.

```text
Below is what a name check found for this product: [brief]. For each name you
get the findings without the conclusion. Your job is to test them from both sides.

For each name:
- Look for the reason not to use it. Open any match, mark, or claim below that
  was noted and not opened, and say what it is. Search the stores and the web
  for a product in this field under the name's stem and under each form given
  below, since exact-name lookups miss those. Add no spelling of your own, and
  do not report how a stranger might say, hear, or type the name.
- Look for the reason a serious finding does not hold. For each match in or
  near the product's niche, confirm from its own page what it is, how many
  people use it (ratings, installs, stars, with the date), when it started,
  whether it is offered in the markets above, and when it was last active.
- For each live trademark below, say how the two names differ when said,
  by the reading given for the name, whether the owner still sells under the mark (with the page and
  date), whether its upkeep filings are in, and how many other names in the
  field share the close part.
- For each product whose reach decides something, check its figure, its
  release date, and the field figures given beside it.
- Say which single fact about the name matters most, and why.

Findings: [per name: each finding with its link and date, the lookups that ran,
and the reading and forms used]

Registry records: [the script's printed summary for each name]. They hold
domain registrations, archive captures, United States trademarks, live and
dead, and app store results.

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
