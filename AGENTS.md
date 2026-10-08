# AGENTS.md

Rules for editing the **naming-check** skill. User-facing guidance lives in `SKILL.md`. `README.md` is the human skim layer.

## File roles

| File | Role |
| --- | --- |
| `SKILL.md` | The checked-or-unchecked rule, the brief, the full check, weighing, verdicts, fit, and the output format |
| `references/weighing.md` | How each finding gets its weight: closeness, reach, who was first, trademarks and exposure |
| `references/lookups.md` | How to run each lookup by hand, what each answer means, and the routes when one is closed |
| `references/delegating.md` | Splitting a set across subagents, the two briefs, and merging results |
| `references/generating.md` | Producing candidates |
| `scripts/lookup.mjs` | Agent-facing registry lookups. Returns records, never a verdict |
| `package.json` | Lets the script run through `npx` from the repository |
| `README.md` | Short human summary |

## Editing

- Bump `metadata.version` by the release-versioning skill's rules for skills, and `package.json` with it.
- Quote every frontmatter string value. Keys stay unquoted.
- No em dashes, and no semicolons used to join what should be separate sentences. Use commas, periods, parentheses, or "to".
- Capitalized bullets and parallel list voice within each list.
- The result words are closed sets. Weights are `Note`, `Cost`, `Question`, `Blocks`, and each sets one clearance verdict: `Clean`, `Fine`, `Caution`, `Avoid`. Fit is `Fits`, `Partly fits`, `Does not fit`. Reach is `Real reach`, `Small reach`, `No reach shown`. A `Caution` is always written with its size: `small`, `moderate`, or `large`. `Unchecked` is a state, not a verdict. The company register line is `Available`, `Not available`, or `Open`. Do not add a word to any set, or a qualifier to any verdict, without updating every place the set appears: `SKILL.md`, the four references, and `README.md`.
- Only `Avoid` may read as ruled out. Do not write, order, or summarize a `Fine` or `Caution` name as a rejection, and do not drop adoptable names from the result table.
- The trademark rules in `references/weighing.md` describe United States law as checked against the statute and the USPTO examining manual. Check a change to them at those sources, keep them as fact-gathering and sizing, and never let them promise an outcome.
- Reach is judged against the match's own field and its time out, never against a fixed count of ratings, installs, or stars. Do not put such a count back. The ratios that divide the bands are part of the relative rule and may be tuned.
- The full check has one depth. Do not add any shallower, conditional, or early-ending version of it, and do not make a step optional. A change to what the check contains changes the numbered steps in `SKILL.md`, the briefs in `references/delegating.md`, the `Lookups` list, and the `yours` list the script prints, together.
- Fit is given for every name and clearance only for checked ones. Keep the two apart in every table and block.
- The company register lookup is not a step of the full check. It never sets or moves a clearance verdict, an unreachable register is `Open` and never counted as looked up, and a third-party index never makes a name `Available`. `SKILL.md` owns the three results and `references/lookups.md` owns what a register tests and the routes. The register rules in `references/lookups.md` hold for any state or country, so keep a single place's rule out of them.
- How a name is heard, said, and spelled from memory is the person's judgment. Do not add a step where a model or a subagent guesses what a stranger would hear, say, or type, and do not let such a guess move fit, make a finding, size one, or add a search.
- Forms come from rules and from the person. The swaps listed in `SKILL.md` and in `--help` are `FORM_SWAPS` and `K_TO_C` in the script, in the same order. Change them together. `SOUND_SWAPS` is a wider net used only for the `soundNear` list of marks.
- A made-up name that suggests nothing is `Fits`. `Does not fit` is for a name that points somewhere wrong or unwanted, and nothing else.
- Every result carries one plain line saying what the name is, and the line for what comes with a name, or for a blocking fact, says what it is and how big it is.
- The output templates set content, not layout. Do not turn them into fixed columns.
- Keep the skill usable by a stranger: no step may assume software, the United States, a browser, or subagents without saying what to do otherwise.
- The script reports and does not judge. Keep weighing and verdicts out of its output.
- The script is there for the marks lookup, which a page fetch cannot do, and `SKILL.md` says so where it introduces it. Keep that line true.

## The lookup script

- Zero dependencies, Node.js 18 or later, one file.
- The domain lookups follow the IANA RDAP bootstrap file and fall back to WHOIS, then DNS. The history lookup uses the Internet Archive CDX server. The store lookup uses Apple's iTunes Search API.
- The trademark lookup calls the search service behind the USPTO's public trademark search page. The USPTO publishes no specification for it. It is relied on for three things beyond the search: the `_source` list that leaves goods out of the wide lists, the `LD` filter that tells live from dead, and the `ids` query that fetches goods by serial number. When it changes, fix the request in `usptoSearch` and `usptoPost`, and keep the failure path returning `ran: false` so a broken lookup can never read as a clear result.
- Every section must return `ran`. A section that could not get an answer returns `ran: false` with `error`, a trademark list missing live marks carries `searchedAll: false`, and a row missing a default section lists it under `notRun`. None of these may read as a clear result.
- Every input name comes back in the summary and as a line of the full records, whatever script it is written in. A name must never be dropped silently.
- The summary is what an agent reads. It may leave out marks past `--top` and goods past their first words, and wherever it does it gives the count held beside the count shown. A lookup that got no answer, a list that is partial, and a list that was not searched each say so in it, and none may read as an empty result.
- The near, sound, leading, and built-on lists hold live and dead marks, and the summary writes a dead one as `DEAD`.
- `--help` is the guide to reading the summary and the full records. Keep it in step with both.

## Before finishing

- `metadata.version` and `package.json` bumped as the release-versioning skill requires.
- `README.md` matches the actual file layout.
- The skill-forge validator passes.
- `node scripts/lookup.mjs --help` matches what the script does.
- The script ran on one name, and its summary was read from top to bottom.
