# naming-check-skill

`naming-check` is an Agent Skill for getting to a brand, product, company, app, or domain name you can adopt. It generates candidates when asked and reports two separate results. Every name gets a fit result, whether it sounds like the thing it names. Every name that received the one full check gets a clearance verdict, whether it is clear to use. The rest are reported as unchecked.

## What to give it

- What the product is, and the words a buyer would search for
- Who it is for and in which countries
- Whether the name will mostly be said aloud, typed, or tapped
- The domain suffixes you would accept
- The name you use now and when you first offered anything under it, and any names you already like or dislike

It asks for whatever is missing.

## What comes back

- **Fit:** Fits, Partly fits, or Does not fit, with what the name sounds like to someone who has never heard of the product. Every name gets this
- **Clearance:** Clean, Fine, Caution, or Avoid. Fine means adopt it, with a footnote. Caution means it is usable and there is one answer to get before you spend, and it comes sized small, moderate, or large. Only Avoid means a named fact stands in the way
- **Unchecked:** Any name that did not get the whole clearance check is listed here with the reason, and carries no clearance verdict

A name is checked in full or not at all. The result lists every name you could adopt, most usable first. One check is six searches plus a few dozen page and registry lookups, so a large set is checked in batches, sometimes over several sessions, and the result always says exactly which names were checked.

No verdict is legal clearance. Have a trademark professional search a name before real money rides on it.

## Files

- `SKILL.md` holds the fit tests, the full check, the weights and verdicts, and the output format.
- `references/weighing.md` holds the rules for weighing what a check finds, including trademarks.
- `references/lookups.md` covers running each lookup by hand, for markets outside the United States, products that are not software, and agents without web access.
- `references/delegating.md` covers checking many names with subagents.
- `references/generating.md` covers coming up with candidates.
- `scripts/lookup.mjs` looks up domain records, domain history, United States trademarks, the Apple app stores, and code registries for any number of names. It needs Node.js 18 or later.
- `package.json` lets the script run through `npx`.
- `AGENTS.md` is the maintenance contract for editing this skill.

## Install

```bash
git submodule add https://github.com/LeeorNahum/naming-check-skill.git .agents/skills/naming-check
```
