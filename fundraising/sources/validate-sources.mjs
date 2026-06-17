#!/usr/bin/env node
import fs from 'node:fs';

const readJson = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));

const sourceSchema = readJson('fundraising/sources/source.schema.json');
const sources = readJson('fundraising/sources/web-source-database.json');
const queries = readJson('fundraising/sources/search-query-library.json');
const watchlists = readJson('fundraising/sources/organization-watchlist.json');
const countryCoverage = readJson('fundraising/sources/country-coverage.json');
const opportunityMap = readJson('fundraising/sources/gtcx-opportunity-map.json');
const forensicBacklog = readJson('fundraising/sources/forensic-tracking-backlog.json');

const enums = {
  source_type: sourceSchema.properties.source_type.enum,
  listener_type: sourceSchema.properties.listener_type.enum,
  cadence: sourceSchema.properties.cadence.enum,
  funding_types: sourceSchema.properties.funding_types.items.enum
};

const fail = (message) => {
  console.error(`FAIL ${message}`);
  process.exitCode = 1;
};

const countBy = (items, key) =>
  items.reduce((acc, item) => {
    acc[item[key]] = (acc[item[key]] || 0) + 1;
    return acc;
  }, {});

const sourceIds = new Set();
for (const source of sources) {
  for (const required of sourceSchema.required) {
    if (!(required in source)) fail(`${source.id || source.name} missing ${required}`);
  }
  if (sourceIds.has(source.id)) fail(`duplicate source id ${source.id}`);
  sourceIds.add(source.id);
  for (const key of ['source_type', 'listener_type', 'cadence']) {
    if (!enums[key].includes(source[key])) fail(`${source.id} invalid ${key}: ${source[key]}`);
  }
  for (const fundingType of source.funding_types || []) {
    if (!enums.funding_types.includes(fundingType)) {
      fail(`${source.id} invalid funding type: ${fundingType}`);
    }
  }
}

const queryIds = new Set();
for (const query of queries) {
  for (const required of ['id', 'cadence', 'priority', 'funding_types', 'query', 'route_to']) {
    if (!(required in query)) fail(`${query.id || query.query} missing ${required}`);
  }
  if (queryIds.has(query.id)) fail(`duplicate query id ${query.id}`);
  queryIds.add(query.id);
}

let organizationCount = 0;
const organizationNames = new Set();
for (const watchlist of watchlists) {
  for (const required of ['group', 'cadence', 'priority', 'organizations']) {
    if (!(required in watchlist)) fail(`${watchlist.group || 'watchlist'} missing ${required}`);
  }
  for (const org of watchlist.organizations) {
    organizationCount += 1;
    if (!org.name || !org.url || !org.themes) fail(`${watchlist.group} has incomplete organization`);
    const key = org.name.toLowerCase();
    if (organizationNames.has(key)) fail(`duplicate organization ${org.name}`);
    organizationNames.add(key);
  }
}

const countryCount = countryCoverage.reduce((total, region) => total + region.countries.length, 0);

const opportunityIds = new Set();
for (const opportunity of opportunityMap) {
  for (const required of [
    'id',
    'name',
    'priority',
    'capital_type',
    'target_orgs',
    'best_fit_products',
    'proof_needed',
    'example_searches'
  ]) {
    if (!(required in opportunity)) fail(`${opportunity.id || opportunity.name} missing ${required}`);
  }
  if (opportunityIds.has(opportunity.id)) fail(`duplicate opportunity id ${opportunity.id}`);
  opportunityIds.add(opportunity.id);
}

const backlogIds = new Set();
for (const item of forensicBacklog) {
  for (const required of ['id', 'name', 'url', 'category', 'tier', 'cadence', 'fit', 'route_to']) {
    if (!(required in item)) fail(`${item.id || item.name} missing ${required}`);
  }
  if (backlogIds.has(item.id)) fail(`duplicate forensic backlog id ${item.id}`);
  backlogIds.add(item.id);
}

if (process.exitCode) process.exit(process.exitCode);

console.log(JSON.stringify({
  sources: sources.length,
  queries: queries.length,
  watchlist_groups: watchlists.length,
  organizations: organizationCount,
  country_regions: countryCoverage.length,
  countries_or_segments: countryCount,
  opportunity_classes: opportunityMap.length,
  forensic_backlog_items: forensicBacklog.length,
  sources_by_type: countBy(sources, 'source_type'),
  sources_by_listener: countBy(sources, 'listener_type')
}, null, 2));
