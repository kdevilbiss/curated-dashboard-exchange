# Dashboard Exchange

We put the Dashboard Exchange in the Dashboard Exchange so you can Dashboard Exchange while you Dashboard Exchange.

## Summary

Dashboard Exchange is a LogicMonitor Text widget that lets users browse, review, and safely import dashboard packages from inside a LogicMonitor dashboard.

It compares a catalog manifest against dashboards visible in the current portal, shows status and detail metadata, previews dashboard layouts when source JSON is available, and imports selected dashboards as safe copies under a managed `Dashboard Exchange` group.

## Attribution

- Original creator: Kerry DeVilbiss
- Curator/packager: Kerry DeVilbiss
- Permission/status: self-authored
- Original source: https://github.com/kdevilbiss/curated-dashboard-exchange/

## Requirements

- LogicMonitor Text widget raw HTML mode.
- Viewer permission to see dashboard groups and dashboards.
- Dashboard manage permissions for imports.
- Browser access to the configured catalog manifest and dashboard source URLs.

## Changes Made During Curation

- Packaged as an installable dashboard for Curated Dashboard Exchange.

## Known Limits

- Uses the viewer's current LogicMonitor browser session for LogicMonitor dashboard API calls.
- Imports create safe copies under a managed `Dashboard Exchange` group.
- Existing customer dashboards are not overwritten, renamed, moved, or deleted.
- Import is blocked if a `Dashboard Exchange` group already exists without the managed marker.

## Preview

Add `preview.png` when available.
