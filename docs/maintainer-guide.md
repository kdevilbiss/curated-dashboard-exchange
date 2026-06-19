# Maintainer Guide

This guide covers the repo workflow for adding and publishing curated dashboards.

## Principles

- Attribution is required.
- Permission/status must be recorded before a dashboard is published.
- Descriptions should say what the dashboard actually does.
- Dashboards should import as safe copies under `Dashboard Exchange/...`.
- Existing customer dashboards should not be modified, overwritten, renamed, or deleted.
- Experimental work should be labeled honestly.

## Repository Layout

```text
catalogs/
  curated-dashboard-exchange.json
dashboards/
  <author-or-source>/
    <dashboard-slug>/
      metadata.json
      dashboard.json
      DASHBOARD.md
      preview.png
contributors/
  <person>.md
docs/
  intake-checklist.md
  manifest-contract.md
  maintainer-guide.md
templates/
  dashboard-package/
tools/
  build-catalog.mjs
  validate-catalog.mjs
```

## Adding A Dashboard

1. Copy `templates/dashboard-package/` into `dashboards/<author-or-source>/<dashboard-slug>/`.
2. Rename `dashboard.json.example` to `dashboard.json`.
3. Fill in `metadata.json`.
4. Fill in `DASHBOARD.md`.
5. Add a preview image if available.
6. Run:

```bash
npm run build
npm run validate
```

## Build

This repo uses no runtime dependencies. The scripts use Node.js built-ins.

```bash
npm run build
```

`tools/build-catalog.mjs` scans dashboard package metadata and writes `catalogs/curated-dashboard-exchange.json`.

By default, the build uses:

```text
https://raw.githubusercontent.com/kdevilbiss/curated-dashboard-exchange/main
```

Set `RAW_BASE_URL` if you need to build against a different public raw URL:

```bash
RAW_BASE_URL="https://raw.githubusercontent.com/<owner>/curated-dashboard-exchange/main" npm run build
```

The repo must be public, or the generated raw GitHub URLs will not load from a LogicMonitor portal.

## Validate

```bash
npm run validate
```

Validation checks required catalog fields, duplicate identities, attribution fields, source paths, and source URLs.

## Attribution Requirements

Every dashboard package must include:

- Original creator.
- Curator/packager.
- Permission or publication status.
- Original source when known.
- Changes made during curation.
- Requirements and known limitations.

This catalog was inspired in part by Kevin Ford's Better Map widget work and the broader use of raw HTML Text widgets to extend LogicMonitor dashboard experiences.

## Support Level

Unless a dashboard package says otherwise, entries in this catalog should be treated as:

```text
Community Curated
```

That means useful, reviewed, and packaged with care, but not official LogicMonitor product content.

## License

No broad license is granted yet. Each dashboard package must record its own permission/status before publication.
