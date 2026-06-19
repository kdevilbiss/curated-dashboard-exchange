# Curated Dashboard Exchange

Curated Dashboard Exchange is a small catalog of installable LogicMonitor dashboards that are useful, experimental, or community-built, but not part of the official LogicMonitor dashboard catalog.

These dashboards are meant to be installed through Dashboard Exchange as safe copies. They do not overwrite existing dashboards in your portal.

## What's Included

Current catalog:

| Dashboard | Creator | Notes |
| --- | --- | --- |
| Better Map Widget (Full) | Kevin Ford | Enhanced map dashboard with marker clustering, status detail, weather overlays, and mapping options. |
| NOCturne | Kerry DeVilbiss | Turns active alerts into a generative audio and visual NOC experience. |

## How To Use

Use Dashboard Exchange and switch the catalog selector from `Official` to `Custom`.

The custom catalog manifest is:

```text
https://raw.githubusercontent.com/kdevilbiss/curated-dashboard-exchange/main/catalogs/curated-dashboard-exchange.json
```

When imported, dashboards are created under a managed dashboard group named `Dashboard Exchange`. Existing dashboards are not modified.

Example import locations:

```text
Dashboard Exchange/custom_widgets/Better Map
Dashboard Exchange/kdevilbiss/NOCturne
```

## Support

Items in this catalog are `Community Curated`.

That means they are packaged and reviewed for practical use, but they are not official LogicMonitor product content unless explicitly stated otherwise. Some dashboards use raw HTML/JavaScript Text widgets and may call external browser-side services such as map, weather, or CDN resources.

Review each dashboard's notes before importing it into a customer portal.

## Attribution

Attribution is included in each dashboard package and, where practical, in the dashboard description itself.

If something here is based on your work and the attribution is wrong or incomplete, open an issue or contact the curator so it can be fixed.

## For Maintainers

Maintainer workflow, package format, build steps, and validation details live in [docs/maintainer-guide.md](docs/maintainer-guide.md).
