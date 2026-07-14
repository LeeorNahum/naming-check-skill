# AGENTS.md

Rules for editing the **naming-check** skill. User-facing guidance lives in `SKILL.md`. `README.md` is the human skim layer.

## File roles

| File | Role |
| --- | --- |
| `SKILL.md` | Checklist dimensions and the verdict output format |
| `README.md` | Short human summary |

## Editing

- Bump `metadata.version` with semver in the same change whenever behavior changes: patch for wording, minor for a new checklist dimension, major for a changed verdict scale or scope.
- Quote every frontmatter string value. Keys stay unquoted.
- No em dashes, and no semicolons used to join what should be separate sentences. Use commas, periods, parentheses, or "to".
- Capitalized bullets and parallel list voice within each checklist group.
- Keep the verdict scale (`Clean`, `Caution`, `Avoid`) as a closed set; do not add a fourth tier without updating every place the scale is described.

## Before finishing

- `metadata.version` bumped if and only if behavior changed.
- `README.md` matches the actual file layout.
