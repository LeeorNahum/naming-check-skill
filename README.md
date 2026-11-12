# naming-check-skill

`naming-check` is an Agent Skill for getting to a name you can trust, for any kind of name: a brand, product, company, app, domain, handle, or project. It works out what the name is for, generates candidates that avoid the names every model reaches for, checks every name it puts forward against what that goal needs, and returns a ranked recommendation. Each finding says what it usually means for you and what to do, and the result says plainly which name wins on the checks.

## What to give it

- What the name is for, in your own words. It works the rest out from what you say, your project, and lookups, and asks only when it still cannot tell
- Names you already like or dislike, the name you use now, and when you first offered anything under it
- The legal name and place of a company you are about to form, if there is one

## What comes back

- **A ranking:** Every name that stays, best to worst on the checks, and a plain statement of which one wins. What you like is shown beside the ranking and never moves it
- **Fit:** Fits, Partly fits, or Does not fit, with one plain line saying what the name is. A made-up name that suggests nothing still fits
- **Sound:** A plain flag when a name sounds close to a rude or embarrassing word in your markets. It never lowers anything. You say it aloud and decide
- **Result:** Clean, Fine, Caution (small, moderate, or large), or Avoid, each with what it usually means and what to do
- **Address and price:** The best domain, what it costs, and a cheaper suffix or an address that contains the name when the first is taken
- **Removed:** A name goes only when a couple of lookups show it is plainly unusable, or when it clearly fails most of the checks, and the reason is listed
- **Not answered:** A lookup that got no answer is named with the link to run it, and no conclusion rests on it
- **Company register:** For a company you are about to form, whether its register would take the name: Available, Not available, or Open

No result is legal advice. Have a trademark professional search a name before real money rides on it.

## Files

- `SKILL.md` holds what every run holds to, the goal, fit and sound, the checks, the weights and labels, the ranking, and the output format.
- `references/weighing.md` holds the rules for weighing what a check finds and what it usually means, including trademarks.
- `references/lookups.md` covers running each lookup by hand, for markets outside the United States, products that are not software, and agents without web access.
- `references/delegating.md` covers checking many names with helpers.
- `references/generating.md` covers coming up with candidates and catching convergence.
- `scripts/lookup.mjs` looks up domains with their price, domain history, United States trademarks, the Apple app stores, and dictionary entries for any number of names, plus code registries with `--code`, and prints a short summary of each. It needs Node.js 18 or later.
- `package.json` lets the script run through `npx`.
- `AGENTS.md` is the maintenance contract for editing this skill.

## Optional keys

The script needs no key. Each key below is read from an environment variable and improves one lookup. A missing key means the keyless route, and the script's summary says so.

| Variable | Adds |
| --- | --- |
| `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` | Live domain availability and price from Cloudflare Registrar, the preferred source |
| `PORKBUN_API_KEY` and `PORKBUN_SECRET_API_KEY` | The same from Porkbun, as the fallback |
| `BRAVE_SEARCH_API_KEY` | Web search results for the name |
| `EUIPO_CLIENT_ID` and `EUIPO_CLIENT_SECRET` | European Union word marks |
| `COMPANIES_HOUSE_API_KEY` | UK company records |
| `GITHUB_TOKEN` | A higher GitHub limit for `--code` |

## Install

Copy the folder into your agent's skills directory under the name `naming-check`, or add it as a submodule:

```bash
git submodule add https://github.com/LeeorNahum/naming-check-skill.git .agents/skills/naming-check
```
