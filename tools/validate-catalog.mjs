import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CATALOG_PATH = path.join(ROOT, "catalogs", "curated-dashboard-exchange.json");
const REQUIRED = ["dashboard_id", "name", "category", "source_path", "source_url", "description", "attribution", "permission_status", "support_level"];
const MAX_DESCRIPTION = 255;

function fail(message) {
  throw new Error(message);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function text(value) {
  return String(value || "").trim();
}

function creatorName(entry) {
  return text(entry.creator && entry.creator.name);
}

function curatorName(entry) {
  return text(entry.curator && entry.curator.name);
}

function addSeen(map, key, label, entry) {
  if (!key) return;
  if (map.has(key)) fail(`Duplicate ${label}: ${key} (${map.get(key)} and ${entry.name})`);
  map.set(key, entry.name);
}

if (!fs.existsSync(CATALOG_PATH)) fail("Missing catalogs/curated-dashboard-exchange.json");

const catalog = readJson(CATALOG_PATH);
if (!Array.isArray(catalog.dashboards)) fail("Catalog must contain a dashboards array.");

const ids = new Map();
const names = new Map();
const sourcePaths = new Map();
const sourceUrls = new Map();
const errors = [];
const warnings = [];

for (const entry of catalog.dashboards) {
  for (const field of REQUIRED) {
    if (!text(entry[field])) errors.push(`${entry.name || entry.dashboard_id || "(unnamed)"} is missing ${field}`);
  }

  if (!creatorName(entry)) errors.push(`${entry.name || entry.dashboard_id || "(unnamed)"} is missing creator.name`);
  if (!curatorName(entry)) errors.push(`${entry.name || entry.dashboard_id || "(unnamed)"} is missing curator.name`);

  addSeen(ids, text(entry.dashboard_id), "dashboard_id", entry);
  addSeen(names, text(entry.name).toLowerCase(), "name", entry);
  addSeen(sourcePaths, text(entry.source_path).toLowerCase(), "source_path", entry);
  addSeen(sourceUrls, text(entry.source_url), "source_url", entry);

  if (text(entry.source_path).startsWith("dashboards/")) {
    errors.push(`${entry.name} has repository-shaped source_path "${entry.source_path}". Use a customer-readable import path instead.`);
  }
  if (!/^https?:\/\//.test(text(entry.source_url))) {
    errors.push(`${entry.name} source_url must be an absolute http(s) URL.`);
  }
  if (text(entry.source_url).includes("<owner>")) {
    warnings.push(`${entry.name} source_url still contains <owner>; set RAW_BASE_URL before publishing.`);
  }
  if (text(entry.description).length > MAX_DESCRIPTION) {
    warnings.push(`${entry.name} description is ${text(entry.description).length} characters; LogicMonitor dashboard descriptions are limited to ${MAX_DESCRIPTION} during import.`);
  }
  if (text(entry.permission_status).toLowerCase() === "pending") {
    warnings.push(`${entry.name} permission_status is pending.`);
  }
}

if (errors.length) {
  console.error("Catalog validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

if (warnings.length) {
  console.warn("Catalog validation warnings:");
  for (const warning of warnings) console.warn(`- ${warning}`);
}

console.log(`Catalog validation passed for ${catalog.dashboards.length} dashboard${catalog.dashboards.length === 1 ? "" : "s"}.`);
