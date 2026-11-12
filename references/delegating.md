# Delegating The Check

How to hand names to helpers without the check getting shallower: the order of work, how to split the set, the two briefs, and how to put the results together. A helper starts with nothing, so each brief carries the whole job. Helpers are optional in every harness. Spawn them through the harness's own spawn guidance, the Subagent Spawn Book skill where it is installed, which says how to reach another model family from each harness. Without them, do the same work alone, in order.

## Order Of Work

1. Settle the goal, including how the person says each name. Where they have not said, pick the most natural reading and mark it assumed
2. Run fit and the sound flag on the whole set, and write for each name the line saying what it is and its reading. A lead checking a few names itself still does this first, then works name by name, and hands each name's facts to a challenger as it finishes, weighing them while the challenger works
3. Run the lookup script once on those names, with their spaced forms and the person's spellings, writing to a file with `--out`. Each name's forms are those plus the ones the script lists under `ruleForms`. Rerun it until no name is marked `INCOMPLETE`, or do those lookups by hand, before any handoff. Workers and challengers read its summaries. Print each name's with `--read`, at the `--top` number the summary gives where a list shows fewer live marks than it names, and hand those over
4. Remove early the names that the script's records show are plainly unusable, each with its observed reason
5. Hand the remaining names to check workers. Workers run checks 1 to 8 as the goal needs them and return the facts and their weights in two separate lists, with no label
6. Hand each finished set of facts to a challenger
7. Set each label, rank the names, and write the blocks

## Splitting The Set

- Give each worker whole names, a handful at a time, in the order the person gave. A worker finishes one name completely before starting the next
- Start only as many workers at once as the harness covers. When it limits how many helpers one session may start, give each helper more names and not a shallower check
- Helpers do not run lookups through the script. One copy has already run, and several at once get refused by the registries. For a name already in use, a worker that sees other people write that name another way returns the spelling under `New forms`, with the link, and the lead looks it up. Any other spelling met on a page is a possible match, reported as a fact
- The company register lookup, when the goal calls for one, is the lead's. It runs once and is no part of a worker's checks
- A worker that cannot get an answer to a lookup by any route returns the name with that answer named as missing, the link for the person, and the facts found so far with no weight. The lead gives it to another worker or runs it, and does not accept a thinner check in its place

## Check Worker Brief

Fill in the bracketed parts and send it whole. Point the worker at the skill's `SKILL.md` and its lookups reference, or paste them.

```text
Run checks 1 to 8 of the naming-check checks on each name below, as far as
this goal needs. The checks are defined in SKILL.md at [path or pasted text],
section "The Checks", and the weights in "Weighing what was found" at [path].
Read "Running the lookups" at [path] when a route fails or the market or field
is not covered. Follow them exactly.

Goal:
- What the name is for, and what it is: [one line] Category words: [two or three]
- Buyers and markets: [who, which countries, city if local] Languages: [list]
- Encounter: [said aloud, typed, or tapped]
- Acceptable domain suffixes: [list]
- The person already owns: [domains, products, accounts, or none]
- First public use of a name already in use: [name and date, or none]
- Checks this goal does not need: [list, or none]

Names, each with its reading and its forms: [a handful, or a file path]

Registry records already looked up: [the script's printed summary for each
name, pasted or as a file path]. The full records are in [file path]. To see
more of a list of marks, run [script command] <name> --out [file path] --read
--top <n>, which looks nothing up. Do not run the script any other way. Each
summary ends with the searches and a few pages still yours to run. Run them,
write the stem search yourself, then run whatever else checks 1 to 7 require
for this goal's markets and field. If a summary says INCOMPLETE or marks a
section "not run", do that lookup by a route in "Running the lookups", or
return the name with that answer named as missing.

Rules:
- Finish one name completely before starting the next.
- Look as far into a name as the goal needs. A couple of lookups that show a
  name is plainly unusable, such as a large brand in the same field holding
  the same name, end its check: return it with the observed reason and say
  which lookups ran. Otherwise run every check the goal needs, because the
  weighing depends on what a match turns out to be.
- Open every match in or near the field and every adverse claim. A snippet is
  not evidence.
- A lookup you cannot run by any route is a missing answer. Name it, give the
  link for the person, and give no finding that depends on it.
- Search the forms you were given and add none of your own. How a stranger
  might type a name is not a finding, so do not report it.
- Do not give a label. The label is set after a separate challenge.

Return for each name, in two lists so the first can be passed on without the
second:
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
1. <Blocks, Question, Cost, or Note> | <for a product or trademark: field,
   reach, same or near name by sight and by sound, whether a person could
   plausibly confuse the two names and products, who was first> | <why> |
   <what it usually means for the person>
2. ...
To use it: <what going ahead would take, if any weight is above Note>
Keep the facts free of weights, opinions, and remarks to whoever reads them
next. A fact that weighs as a note is one line.
Lookups: <the list from the "Output Format" section, without Challenge.
  Name every form each lookup was run on>
New forms: <for a name already in use, any other way you saw people write
  it, with the link, or none. Any other spelling is a possible match and
  goes under Facts>
Not answered: <each lookup with no answer by any route, with the link, or none>
Removed early: <name | the observed reason | which lookups ran, or none>
```

## Challenger Brief

One helper that has not seen any weight takes the finished names, a handful to ten at a time. Give it the goal, each name's `Facts` list as the worker returned it, and the reading and forms used. A challenger that has only ever been given facts can take further sets, since it has still seen no weight.

```text
Below is what a name check found for this goal: [goal]. For each name you
get the findings without the conclusion. Your job is to test them from both sides.

For each name:
- Look for the reason not to use it. Open any match, mark, or claim below that
  was noted and not opened, and say what it is. Search the stores and the web
  for a product in this field under the name's stem and under each form given
  below, since exact-name lookups miss those. Add no spelling of your own, and
  do not report how a stranger might type the name.
- Look for the reason a serious finding does not hold. For each match in or
  near the product's field, confirm from its own page what it is, how many
  people use it (ratings, installs, stars, with the date), when it started,
  whether it is offered in the markets above, and when it was last active.
- For each live trademark below, say how the two names differ when said,
  by the reading given for the name, whether a person could plausibly confuse
  the two names and the two products, whether the owner still sells under the
  mark (with the page and date), whether its upkeep filings are in, and how
  many other names in the field share the close part.
- For each product whose reach decides something, check its figure, its
  release date, and the field figures given beside it.
- Say which single fact about the name matters most, and why.

Findings: [per name: each finding with its link and date, the lookups that ran,
and the reading and forms used]

Registry records: [the script's printed summary for each name]. They hold
domain registrations and prices, archive captures, United States trademarks,
live and dead, app store results, and dictionary entries.

Use web search and page fetches only. Return each point with its link and date.
Do not give a label.
```

## Putting Results Together

- A finding a helper returns with its link and date counts as opened. Carry it into the block as returned
- Weigh the challenger's points with the weighing reference, change a worker's weight only where a point calls for it, and say so in the block
- Set the label from the heaviest weight and write the block, with who ran the challenge in its `Lookups` list. A name whose challenge did not run is listed as not reached until it has run, and is checked again
- Read each worker's `Lookups` list against the name's forms before accepting its findings. Where a lookup is missing, run it yourself and add it to the list marked as run by the lead. A lookup still missing after that goes under Not answered
- Count before reporting: names handed out, names ranked, names removed with their reasons, names not reached. The numbers have to reconcile with the deduplicated set
