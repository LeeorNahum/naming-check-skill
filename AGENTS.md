# AGENTS.md

Rules for editing the **naming-check** skill. User-facing guidance lives in `SKILL.md`. `README.md` is the human skim layer.

## File roles

| File | Role |
| --- | --- |
| `SKILL.md` | What every run holds to, the goal, fit and sound, the checks, weights and labels, ranking, and the output format |
| `references/weighing.md` | How each finding gets its weight and what it usually means: closeness, reach, who was first, trademarks and exposure |
| `references/lookups.md` | How to run each check by hand, what each answer means, and the routes when one is closed |
| `references/delegating.md` | Splitting a set across helpers, the two briefs, and merging results |
| `references/generating.md` | Producing candidates, and catching convergence |
| `scripts/lookup.mjs` | Agent-facing lookups. Returns records, never a verdict |
| `package.json` | Lets the script run through `npx` from the repository |
| `README.md` | Short human summary |

## Editing

- Bump `metadata.version` by the release-versioning skill's rules for skills, and `package.json` with it.
- Quote every frontmatter string value. Keys stay unquoted.
- No em dashes, no en dashes, and no semicolons used to join what should be separate sentences. Use commas, periods, parentheses, or "to".
- Capitalized bullets and parallel list voice within each list.
- The result words are closed sets. Weights are `Note`, `Cost`, `Question`, `Blocks`, and each sets one label: `Clean`, `Fine`, `Caution`, `Avoid`. Fit is `Fits`, `Partly fits`, `Does not fit`. Reach is `Real reach`, `Small reach`, `No reach shown`. A `Caution` is always written with its size: `small`, `moderate`, or `large`. The company register line is `Available`, `Not available`, or `Open`. Do not add a word to any set, or a qualifier to any label, without updating every place the set appears: `SKILL.md`, the references, and `README.md`.
- Every name put forward is fully checked against what its goal needs, with no fixed number of searches or lookups. No name ends partly checked, unchecked, or as an idea only, and no such state exists in any table or list. A name leaves the ranking in two ways only: an early removal for an observed reason, listed with that reason and claiming no lookup that did not run, and a blocking finding (`Avoid`) in most of the checks the goal needs that can block at all, where a doubtful edge keeps the name. Checks that weigh at most a cost, such as domain state, are not counted. Do not write, order, or summarize a `Fine` or `Caution` name as a rejection, and do not drop a ranked name from the reply.
- A lookup the goal needs that got no answer by any route never reads as clear. The name stays ranked on the checks that did answer, its label is written as "so far", its line names the missing answer and gives the link, and no conclusion that depends on it is given. Never write that as a way to save time.
- The reply always carries every ranked name. Do not reintroduce a count-and-path summary, a results file the agent is told to write, or a rule that tells the agent to save or not to save. The skill says nothing about saving. The script's `--out` file stays a record of lookups and never the place results go.
- The ranking is by label, then by how many checks sit at that label or heavier, then by fit, then by the order the person gave. A name with a missing answer ranks after every fully answered name at its label and is never the winner. What the person likes is a column of its own beside the ranking and never moves a name. Say plainly which name wins on the checks.
- Each finding carries what it usually means for the person and what to do. Consequences are what usually happens, never a promise, and name the question for a trademark professional. `references/weighing.md` covers United States law. For any other office the consequence comes from that office's own published guidance read during the run, and where none was read the result says only that a mark there is a question for a professional in that market.
- The trademark rules in `references/weighing.md` describe United States law as checked against the statute and the USPTO examining manual. Check a change to them at those sources, keep them as fact-gathering and sizing, and never let them promise an outcome.
- Reach is judged against the match's own field and its time out, never against a fixed count of ratings, installs, or stars. Do not put such a count back. The ratios that divide the bands are part of the relative rule and may be tuned.
- A near-name finding says whether a person could plausibly confuse the two names and products, and is minor when they could not, with any legal question still named.
- A change to what the checks contain changes the numbered checks in `SKILL.md`, the briefs in `references/delegating.md`, the `Lookups` list in the block template, and the `yours` list the script prints, together.
- The goal decides the scope. The skill works it out from what the person says, the project, and lookups, and asks only when it still cannot tell. Do not add fixed questions about markets or addresses that ignore the goal.
- Fit is given for every name and clearance for every ranked name. Keep fit, sound, clearance, and what the person likes apart in every table and block.
- The company register lookup stays on its own line and never sets or moves a label, unless the goal makes the company name the thing being named. Then `Not available` is a blocking finding and `Open` is a missing answer, and `SKILL.md`, this file, and `references/lookups.md` change together. An unreachable register is `Open` and never counted as looked up, and a third-party index never makes a name `Available`. `SKILL.md` owns the three results and `references/lookups.md` owns what a register tests and the routes. The register rules in `references/lookups.md` hold for any state or country, so keep a single place's rule out of them.
- The agent itself flags a name that sounds close to a rude or embarrassing word in a language of the goal's markets, or in English when the goal names none, plainly and in its own column. The flag never sets or lowers fit, a weight, a label, or a rank. A sense a dictionary lists for the name itself is a finding and is weighed. Do not add a step where a model or a helper guesses how a stranger would type a name, and do not let such a guess make a finding, size one, or add a search.
- Generation may produce respellings, any form of name, and names from a different direction or scope. Forms for the check come from rules and from the person. The swaps listed in `SKILL.md` and in `--help` are `FORM_SWAPS` and `K_TO_C` in the script, in the same order. Change them together. `SOUND_SWAPS` is a wider net used only for the `soundNear` list of marks.
- A name that is convergent, produced by several passes or models, is flagged and never removed for it.
- A made-up name that suggests nothing is `Fits`. `Does not fit` is for a name that points somewhere wrong or that the person said it must not be, and nothing else.
- Every result carries one plain line saying what the name is, and the line for what comes with a name, or for a blocking fact, says what it is and how big it is.
- The output templates set content, not layout. Do not turn them into fixed columns.
- Keep the skill usable by a stranger: no step may assume software, the United States, a browser, or helpers without saying what to do otherwise.
- The script reports and does not judge. Keep weighing and labels out of its output.
- The script does much of the checking so that a run rarely needs a browser, and `SKILL.md` says so where it introduces it. Keep that line true.

## The lookup script

- Zero dependencies, Node.js 18 or later, one file.
- The domain lookups follow the IANA RDAP bootstrap file and fall back to WHOIS, then DNS. The history lookup uses the Internet Archive CDX server. The store lookup uses Apple's iTunes Search API. The words lookup uses Wiktionary's definition API. The code lookup uses npm, PyPI, crates.io, and GitHub.
- Free sources with no key are the default. Keys are optional, read only from environment variables, and never printed or written to a record: `CLOUDFLARE_API_TOKEN` with `CLOUDFLARE_ACCOUNT_ID` (Cloudflare Registrar, preferred for live availability and price), `PORKBUN_API_KEY` with `PORKBUN_SECRET_API_KEY` (the fallback), `BRAVE_SEARCH_API_KEY`, `EUIPO_CLIENT_ID` with `EUIPO_CLIENT_SECRET`, and `COMPANIES_HOUSE_API_KEY`. Without a key the script takes the keyless route and its summary says which route is left to the agent. Domain price without a key is Porkbun's public list price, marked as the suffix's standard price and not a quote.
- A keyed route that could not be confirmed against a live account is built behind its key and marked untested in `--help` until it is confirmed. An answer in an unexpected shape is a failed lookup, never an empty result.
- The trademark lookup calls the search service behind the USPTO's public trademark search page. The USPTO publishes no specification for it. It is relied on for three things beyond the search: the `_source` list that leaves goods out of the wide lists, the `LD` filter that tells live from dead, and the `ids` query that fetches goods by serial number. When it changes, fix the request in `usptoSearch` and `usptoPost`, and keep the failure path returning `ran: false` so a broken lookup can never read as a clear result.
- Do not automate a search that a service's terms forbid, and treat a refusal as a sign to stop and not to route around.
- Every section must return `ran`. A section that could not get an answer returns `ran: false` with `error`, a trademark list missing live marks carries `searchedAll: false`, and a row missing a default section lists it under `notRun`. None of these may read as a clear result.
- Every input name comes back in the summary and as a line of the full records, whatever script it is written in. A name must never be dropped silently.
- The summary is what an agent reads. It may leave out marks past `--top` and goods past their first words, and wherever it does it gives the count held beside the count shown. A lookup that got no answer, a list that is partial, and a list that was not searched each say so in it, and none may read as an empty result.
- The near, sound, leading, and built-on lists hold live and dead marks, and the summary writes a dead one as `DEAD`.
- `--help` is the guide to reading the summary and the full records, and names every key. Keep it in step with both.

## Before finishing

- `metadata.version` and `package.json` bumped as the release-versioning skill requires.
- `README.md` matches the actual file layout.
- The skill-forge validator passes.
- `node scripts/lookup.mjs --help` matches what the script does.
- The script ran on one name, and its summary was read from top to bottom.
