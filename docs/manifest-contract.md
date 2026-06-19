# Manifest Contract

Dashboard Exchange reads a JSON manifest with a top-level `dashboards` array. Extra catalog-level and dashboard-level fields are allowed.

## Catalog Fields

```json
{
  "catalog_id": "curated-dashboard-exchange",
  "catalog_name": "Curated Dashboard Exchange",
  "catalog_kind": "curated",
  "support_level": "Community Curated",
  "generated_at": "2026-06-18T00:00:00.000Z",
  "dashboards": []
}
```

## Dashboard Fields

Required fields:

```json
{
  "dashboard_id": "better-map",
  "name": "Better Map",
  "category": "Maps",
  "source_path": "Maps/Better_Map.json",
  "source_url": "https://raw.githubusercontent.com/<owner>/curated-dashboard-exchange/main/dashboards/kevin-ford/better-map/dashboard.json",
  "description": "Shows ...",
  "tags": ["Maps", "Custom"],
  "creator": {
    "name": "Kevin Ford"
  },
  "curator": {
    "name": "Kerry DeVilbiss"
  },
  "attribution": "Created by Kevin Ford. Curated and packaged with permission by Kerry DeVilbiss.",
  "permission_status": "pending",
  "support_level": "Community Curated"
}
```

Optional fields:

```json
{
  "aliases": [],
  "requirements": [],
  "known_limits": [],
  "preview_url": "",
  "original_source": "",
  "changes": []
}
```

## Important Source Path Rule

`source_path` is the catalog/import path, not necessarily the repository path.

Dashboard Exchange currently uses `source_path` to derive the managed import folder. Keep it customer-readable:

```text
Maps/Better_Map.json
Cloud/AWS/Account_Overview_Custom.json
Widgets/Nocturne.json
```

Avoid repository-shaped paths like:

```text
dashboards/kevin-ford/better-map/dashboard.json
```

Those would create awkward import folders.
