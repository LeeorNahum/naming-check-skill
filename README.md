# naming-check-skill

`naming-check` is an Agent Skill for getting to a brand, product, company, app, or domain name you can adopt. It generates candidates when asked and reports two separate results. Every name gets a fit result, what the name says and whether anything in it points the wrong way. Every name that received the one full check gets a clearance verdict, whether it is clear to use. The rest are reported as unchecked.

## What to give it

- What the product is, and the words a buyer would search for
- Who it is for and in which countries
- Whether the name will mostly be said aloud, typed, or tapped
- The domain suffixes you would accept
- The name you use now and when you first offered anything under it, and any names you already like or dislike
- The legal name and the state or country of a company you are about to form, if there is one

It asks for whatever is missing.

## What comes back

- **Fit:** Fits, Partly fits, or Does not fit, with one plain line saying what the name is: its parts, its language, or that it is made up. Does not fit means the name says something wrong for the product or something you said you did not want. A made-up name that suggests nothing still fits. How a name sounds is yours to judge. Every name gets this
- **Clearance:** Clean, Fine, Caution, or Avoid. Fine means adopt it, with a footnote. Caution means it is usable and there is one answer to get before you spend, and it comes sized small, moderate, or large. Only Avoid means a named fact stands in the way
- **Unchecked:** Any name that did not get the whole clearance check is listed here with the reason, and carries no clearance verdict
- **Company register:** For a company you are about to form, whether its register would take the name: Available, Not available, or Open when the register could not be reached. It is reported apart from clearance

A name is checked in full or not at all. The result lists every name you could adopt, most usable first. One check is five searches plus a few dozen page and registry lookups, so a large set is checked in batches, sometimes over several sessions, and the result always says exactly which names were checked.

No verdict is legal clearance. Have a trademark professional search a name before real money rides on it.

## Files

- `SKILL.md` holds the fit rules, the full check, the weights and verdicts, and the output format.
- `references/weighing.md` holds the rules for weighing what a check finds, including trademarks.
- `references/lookups.md` covers running each lookup by hand, for markets outside the United States, products that are not software, and agents without web access.
- `references/delegating.md` covers checking many names with subagents.
- `references/generating.md` covers coming up with candidates.
- `scripts/lookup.mjs` looks up domain records, domain history, United States trademarks, the Apple app stores, and code registries for any number of names, and prints a short summary of each. It needs Node.js 18 or later.
- `package.json` lets the script run through `npx`.
- `AGENTS.md` is the maintenance contract for editing this skill.

## Install

```bash
git submodule add https://github.com/LeeorNahum/naming-check-skill.git .agents/skills/naming-check
```
