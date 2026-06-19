# Contributing

This repository is curated rather than open-submission. Contributions should go through an intake review before they appear in the public catalog.

## Intake Rules

- Do not claim authorship for work you did not create.
- Record the original creator whenever known.
- Record permission/status before publishing.
- Preserve useful comments, dashboard notes, and source context when possible.
- Document any material changes made during curation.
- Keep customer names, hostnames, screenshots, tokens, or other unsafe data out of committed files.

## Dashboard Package Requirements

Every dashboard package needs:

```text
metadata.json
dashboard.json
DASHBOARD.md
```

Preview images are strongly recommended.

## Before Publishing

Run:

```bash
npm run build
npm run validate
```

Then review the generated catalog diff before pushing.
