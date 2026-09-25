---
name: "naming-check"
description: "Use while generating, brainstorming, searching for, comparing, evaluating, or adopting a name for a brand, product, company, app, or domain, including when the user asks whether a name is taken or available, and even when they only want name ideas and never ask for a check. Evaluates each candidate for conflicts, risks, and quality and gives a verdict."
metadata:
  author: "Leeor Nahum"
  version: "1.4.0"
---

# Naming Check

Evaluate a proposed name across these dimensions, then give a clear verdict.

## Checklist

### Conflicts And Legal

- Search for existing brands, products, companies, and apps using the exact name and close variants
- Check for trademark registrations (search USPTO, EUIPO, or equivalent, and note if a full TM search is advisable)
- Note any large, aggressive trademark holders whose name it starts with or closely resembles
- For each collision, establish how close the niche is and whether the use is live before weighing it. Check the last publish, release, or commit date, current version, downloads or users, stars, archived or deprecated status, current product or store presence, maintained documentation, and trademark status.

Do not rule out a candidate until it has actually been checked. Pattern resemblance, the shape of a name, and the assumption that a common construction must already be taken are prompts to investigate, not evidence of a collision. Every verdict must rest on an observed finding. Report an unchecked assumption or an unknown signal as unchecked, and do not score or summarize it as a collision, as dormancy, or as availability.

A match existing is not a finding against the name. A taken domain, a dormant package, a stale listing, a small unrelated business, or a weak use somewhere does not by itself reject a strong candidate, and a strong name is worth the work of establishing what a match actually is. Before a match counts against the name, establish each of these and let the evidence set its weight:

- **Liveness:** whether the use is current, by the signals listed above
- **Reach:** how many people the use actually reaches, by users, downloads, traffic, press, or store presence
- **Niche overlap:** how close the use sits to the target category and its buyers
- **Trademark scope:** which goods or services, jurisdictions, and status a mark covers, since a mark in an unrelated class is not a mark on this product
- **Search dominance:** who owns the results for the exact name today, and whether the product could plausibly displace them inside its own field
- **Domain posture:** whether the domain is parked, for sale, redirecting, expired, or the front door of an operating business

#### Collision Strength

Rank each collision by the strongest tier its evidence supports. A pile of weak matches does not outweigh one live exact-niche conflict.

1. **Tier 1, Fatal:** A maintained product, feature, or competitor uses the same or a confusingly close name in the same niche, or a live registered trademark covers the relevant goods or services in a relevant market. A maintained exact-niche tool remains fatal even with few stars or downloads because users can still confuse the products
2. **Tier 2, Strong:** A live use creates serious confusion but is not as directly dispositive, such as the exact name in an adjacent niche, a close variant in the same niche, an established current feature name inside one major product, or a live pending or unregistered mark backed by current commercial use
3. **Tier 3, Material:** A current but more distant use could still impair search, handles, expansion, or buyer understanding, or a once-real same-niche product has uncertain present activity. State what is current, what is stale, and what remains unknown
4. **Tier 4, Weak:** A dormant but formerly real product, package, repository, title, or mark has little current reach and limited niche overlap. Typical signals are a long gap since the last publish or commit, very low downloads and stars, deprecation, archival, or an inactive listing, but there is evidence that it once shipped or had users
5. **Tier 5, Inert residue:** The match never meaningfully shipped or no longer carries an active right or audience. Signals include version `0.0.0`, a stale `0.x` release with no evidence of real adoption, negligible downloads and stars, an abandoned or expired trademark, an archived artifact with no continuing use, or a public-domain work with no current brand use. Public-domain status weakens that title or copyright concern, but does not clear a separate live trademark or current category use

Treat version, age, reach, legal status, and niche distance as evidence, not a point tally. Record trademark status precisely as live, registered, pending, abandoned, or expired, with the relevant jurisdiction and goods or services when available.

#### Genericness

Assess genericness on its own weighted axis: **Low cost**, **Moderate cost**, or **High cost**. Check how commonplace or descriptive the term is in ordinary language and in the target category, and require observed evidence before assigning the weight. Genericness can make a name harder to rank in search, harder to defend as a mark, harder to disambiguate in conversation, and more work to establish. Those costs are payable, and products do pay them successfully.

Context can collapse ambiguity. A phrase may be completely generic in ordinary language and have established meanings in unrelated fields, yet a sufficiently distinctive product can become the dominant referent for that term inside its own field. Judge whether the product context gives the candidate a clear field and a plausible path to that contextual ownership, not whether the words are uncommon everywhere.

Genericness alone is not fatal when the field is clear. Treat it as a cost the owner may knowingly accept. Report **Genericness, Fatal** only when the genericness combines with an observed blocking fact, most commonly one or more live maintained competitors in the exact niche already using the term, or an existing product that already dominates the term in the category. Name that blocking fact explicitly.

### Domain And Handles

- Check if `.com` is available as the primary signal, noting `.io`, `.app`, `.co` as fallbacks
- Check the relevant social handles without enumerating every platform
- When a domain is taken, check its registration date. A recently registered one signals a namespace being actively contested right now, not one settled years ago
- Count how many TLDs of the same name are held, and whether one party holds several. A single parked domain is noise. The same name claimed across multiple TLDs by one pre-launch project is a competitor staking a deliberate claim, and it is the tightest available measure of how recently that name entered circulation
- Separate a parked or squatted domain from an operating business. They carry different risk: one is a purchase negotiation, the other is a collision. A taken, parked, expensive, or squatted `.com` and a launch on a fallback TLD are domain friction, a cost reported on its own line and never given a collision tier. A domain enters the Collision Strength tiers only through the business operating on it, weighed by that business's liveness, reach, and niche overlap like any other match

### Generated Names

- If the name came from a generative tool, treat that as a barometer rather than a verdict. A name arrived at through many parameters is not disqualified by being reachable, and another person following the same path to it is a reason to check the namespace harder, not to drop the name
- Let the registration recency and TLD spread checks settle it. Those measure whether anyone actually acted on the same conclusion, which is the thing that matters

### Linguistic And Cultural

- Check for unintended meanings in major languages (Spanish, French, German, Italian, Portuguese, Japanese)
- Check for negative, embarrassing, or offensive associations
- Note if it derives from or closely resembles a word in another language, as a positive or a risk

### Search And Dictionary Meaning

- Search the bare name, its natural spellings, and the name plus the product category, and record the prominent ordinary meanings that come back: a dictionary sense, slang, a medical, legal, or adult term, a place, a person, a news event, or a common word owned by another category
- Flag a meaning that would embarrass the brand or that buyers will encounter before the product, and say which one
- Flag an anti-SEO condition: a meaning so prominent that the product cannot plausibly displace it in results for its own name, even inside its field. A neutral common word whose field the product could own is a genericness cost, not this finding
- Weigh both against the product context and the field the product could own, and say why the meaning matters or does not

### Pronunciation And Clarity

- Say the written name the way people will naturally read it, listing every plausible reading of the spelling, including the readings of the target markets' first languages. Name the one that will win and whether it is the one the owner intends
- Run the reverse test: from hearing the name once, can a listener recover a spelling that reaches the product? List the spellings a listener would try and whether a search or a typed address on each one lands on the product
- Weigh ambiguity by the product context, not in the abstract. A name passed by word of mouth, spoken in ads or sales calls, or typed into an address bar from a podcast pays the full price of an ambiguous spelling or reading. A name almost always encountered as a link, a store listing, or an icon pays much less, and one that is also short and distinctive may pay almost nothing
- Check whether it reads naturally in writing without needing explanation

### Brand Quality

- Check whether the meaning or portmanteau is immediately clear or needs a tagline
- Assess memorability and distinctiveness
- Note any accidental double meanings or unfortunate abbreviations

## Output Format

Lead with the verdict: **Clean**, **Caution**, or **Avoid**, and name the single strongest piece of evidence supporting it in the verdict sentence. The strongest finding sets the verdict. A Tier 1 collision or a **Genericness, Fatal** finding means **Avoid**. A Tier 2 or Tier 3 collision, a High genericness cost, High domain friction, or an Embarrassing or Anti-SEO meaning means **Caution**. Anything weaker means **Clean**. Follow with one short paragraph of key findings, then a bullet list of specific risks or positives worth noting. Keep it concise.

Order findings by their observed decision weight in the report and in every compressed summary. Order collisions from Tier 1 through Tier 5, and place genericness, domain friction, and meaning findings according to their actual weight. A supported **Genericness, Fatal** finding comes first with the collision or category-dominance fact that makes it fatal. Otherwise report it as Low, Moderate, or High cost among findings of comparable consequence. Every collision finding must state its tier and liveness evidence inline so its strength survives summarization. Use these compact shapes:

- `Tier 1, Fatal | Liveness: maintained, last release [date], [usage signal], exact niche | [finding]`
- `Genericness, High cost | Evidence: common or descriptive use across [contexts], clear target-category field | [finding]`
- `Genericness, Fatal | Evidence: [genericness evidence] plus [live exact-niche or category-dominance fact] | [finding]`
- `Domain friction, [Low, Moderate, or High] | Posture: [parked, for sale, redirecting, or operating] since [date], [fallback TLD status] | [finding]`
- `Meaning, [Embarrassing or Anti-SEO] | Prominence: [what ranks for the bare name and how strongly] | [finding]`

For trademarks, use the registry status, jurisdiction, relevant goods or services, and status date as the liveness evidence. For products and code, include the most useful available publish, release, commit, version, usage, and archive signals.
