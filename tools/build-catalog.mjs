import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DASHBOARDS_DIR = path.join(ROOT, "dashboards");
const CATALOG_DIR = path.join(ROOT, "catalogs");
const CATALOG_PATH = path.join(CATALOG_DIR, "curated-dashboard-exchange.json");
const RAW_BASE_URL = (process.env.RAW_BASE_URL || "https://raw.githubusercontent.com/kdevilbiss/curated-dashboard-exchange/main").replace(/\/+$/, "");

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(value, null, 2) + "\n", "utf8");
}

function posixPath(file) {
  return path.relative(ROOT, file).split(path.sep).join("/");
}

function listDashboardPackages() {
  if (!fs.existsSync(DASHBOARDS_DIR)) return [];
  const packages = [];
  const authors = fs.readdirSync(DASHBOARDS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith(".") && !entry.name.startsWith("_"));

  for (const author of authors) {
    const authorDir = path.join(DASHBOARDS_DIR, author.name);
    const dashboards = fs.readdirSync(authorDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith(".") && !entry.name.startsWith("_"));
    for (const dashboard of dashboards) {
      const dashboardDir = path.join(authorDir, dashboard.name);
      const metadataPath = path.join(dashboardDir, "metadata.json");
      if (fs.existsSync(metadataPath)) packages.push({ dashboardDir, metadataPath });
    }
  }
  return packages;
}

function unique(values) {
  return [...new Set((values || []).map((value) => String(value || "").trim()).filter(Boolean))];
}

function dashboardEntry(pkg) {
  const metadata = readJson(pkg.metadataPath);
  const dashboardFile = metadata.dashboard_file || "dashboard.json";
  const dashboardPath = path.join(pkg.dashboardDir, dashboardFile);
  const dashboardRelPath = posixPath(dashboardPath);

  if (!fs.existsSync(dashboardPath)) {
    throw new Error(`${posixPath(pkg.metadataPath)} references missing ${dashboardFile}`);
  }

  const sourceUrl = metadata.source_url || `${RAW_BASE_URL}/${dashboardRelPath}`;
  return {
    dashboard_id: String(metadata.dashboard_id || "").trim(),
    name: String(metadata.name || "").trim(),
    aliases: unique(metadata.aliases),
    category: String(metadata.category || "Curated").trim(),
    expected_group: String(metadata.expected_group || "").trim(),
    source_path: String(metadata.source_path || "").trim(),
    source_url: sourceUrl,
    description: String(metadata.description || "").trim(),
    tags: unique(metadata.tags),
    namespace: String(metadata.namespace || "").trim(),
    source_model: String(metadata.source_model || "").trim(),
    support_level: String(metadata.support_level || "Community Curated").trim(),
    creator: metadata.creator || {},
    curator: metadata.curator || {},
    attribution: String(metadata.attribution || "").trim(),
    permission_status: String(metadata.permission_status || "pending").trim(),
    requirements: unique(metadata.requirements),
    known_limits: unique(metadata.known_limits),
    original_source: String(metadata.original_source || "").trim(),
    changes: unique(metadata.changes),
    preview_url: metadata.preview_url || "",
    upstream: metadata.upstream || {},
    security_review: metadata.security_review || {},
    importable: metadata.importable !== false
  };
}

const dashboards = listDashboardPackages()
  .map(dashboardEntry)
  .sort((a, b) => a.name.localeCompare(b.name));

const catalog = {
  catalog_id: "curated-dashboard-exchange",
  catalog_name: "Curated Dashboard Exchange",
  catalog_kind: "curated",
  support_level: "Community Curated",
  generated_at: new Date().toISOString(),
  dashboards
};

writeJson(CATALOG_PATH, catalog);
console.log(`Wrote ${path.relative(ROOT, CATALOG_PATH)} with ${dashboards.length} dashboard${dashboards.length === 1 ? "" : "s"}.`);
