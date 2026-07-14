---
name: "naming-check"
description: "Evaluate a proposed name (brand, product, company, app, domain) for conflicts, risks, and quality. Use when the user wants to vet, validate, or assess a name before committing to it."
metadata:
  author: "Leeor Nahum"
  version: "1.1.0"
---

# Naming Check

Evaluate a proposed name across these dimensions, then give a clear verdict.

## Checklist

### Conflicts And Legal

- Search for existing brands, products, companies, and apps using the exact name and close variants
- Check for trademark registrations (search USPTO, EUIPO, or equivalent, and note if a full TM search is advisable)
- Note any large, aggressive trademark holders whose name it starts with or closely resembles

### Domain And Handles

- Check if `.com` is available as the primary signal, noting `.io`, `.app`, `.co` as fallbacks
- Flag if the name is a common word likely to have its social handles already taken, without enumerating every platform

### Linguistic And Cultural

- Check for unintended meanings in major languages (Spanish, French, German, Italian, Portuguese, Japanese)
- Check for negative, embarrassing, or offensive associations
- Note if it derives from or closely resembles a word in another language, as a positive or a risk

### Pronunciation And Clarity

- Check whether it is phonetically unambiguous, listing likely mispronunciations if not
- Check whether it reads naturally in writing without needing explanation

### Brand Quality

- Check whether the meaning or portmanteau is immediately clear or needs a tagline
- Assess memorability, distinctiveness, and how easy it is to spell from hearing it
- Note any accidental double meanings or unfortunate abbreviations

## Output format

Lead with the verdict: **Clean**, **Caution**, or **Avoid**, then one short paragraph of key findings, then a bullet list of specific risks or positives worth noting. Keep it concise.
