#!/usr/bin/env node
// Registry lookups for the naming-check full check: domains, domain history,
// US trademarks, the Apple app stores, and code registries.
// Zero dependencies. Node.js 18 or later. Prints one JSON object per name.

import { connect } from "node:net";
import { resolveNs } from "node:dns/promises";
import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { domainToASCII } from "node:url";

const SECTIONS = ["domains", "history", "marks", "stores", "code"];
const DEFAULT_SECTIONS = ["domains", "history", "marks", "stores"];
const UA = "naming-check-lookup (+https://github.com/LeeorNahum/naming-check-skill)";

const HELP = `Usage: node scripts/lookup.mjs <name>... [options]
       npx --yes github:LeeorNahum/naming-check-skill <name>... [options]

Runs the registry lookups of the naming-check full check and prints one JSON
object per name (newline-delimited). It reports records. It gives no verdict.

A name can carry its other forms, the spellings a listener might type:
  Examplename=Exampelname,Exampleneym
Forms get the marks and stores lookups. Domains, history, and code are looked
up for the name itself only.

Options:
  --file <path>      Read names from a file, one per line, forms after "="
  --tlds <list>      Domain suffixes to look up, comma-separated (default: com)
  --category <list>  The product's category words, comma-separated. They go
                     into the search queries listed under "yours"
  --classes <list>   International trademark classes of the product, such as
                     9,42. Marks in these classes are flagged and listed first
  --country <code>   Apple storefront, two letters (default: us)
  --only <list>      Sections to run: ${SECTIONS.join(", ")}
                     (default: ${DEFAULT_SECTIONS.join(", ")})
  --code             Add the code section (npm, PyPI, crates.io, GitHub)
  --out <path>       Keep the results in a file, one JSON line per name,
                     written as each name finishes, and print only a count.
                     A rerun adds to the file: it looks up only what is
                     missing, failed, or asked with different classes or
                     country for each name given, keeps that name's earlier
                     suffixes when --tlds is left out, and leaves the other
                     names in the file alone. Names that differ only in capitals,
                     spaces, accents, or punctuation are one name. Use it for more than a
                     few names
  --help             Show this help

Reading the output, per name:
  failed    Sections that were tried and got no answer. A failed lookup is
            not a clear result. Rerun that name with --only <section>, or do
            the lookup by hand
  notRun    Default sections this name has never had, because it was looked
            up with --only. The record is incomplete until they run
  domains   records[]: status is "registered", "no record", "unknown", or
            "lookup failed", with creation date, registrar, and name servers.
            "no record" is a strong sign the name is free, not a checkout.
            "unknown" means no registry could be asked, and counts as failed.
            serves: what the address answers with, and parkingSigns, hints
            that it is parked or for sale. registeredTogether: suffixes
            registered within a minute of each other, so one buyer took them
  history   records[]: Internet Archive captures of each domain. open: one
            link per year, thinned to eight for a long history.
            earlierOwner: true when captures are older than the current
            registration, or exist for a domain nobody holds now. It says
            that there was an earlier holder, not who
  marks     USPTO word marks, United States only, in five lists.
            containing: marks with the name as a word, live and dead.
            near: live marks within two letters (one for a name of four
            letters or fewer), each with lettersApart. wholeMark is true
            when the whole mark is that close and false when only one word
            of a longer mark is. Whole marks come first. Read those, then
            the rest only for a word that is the heart of its mark.
            soundNear: live marks within one letter of a respelling that
            sounds the same (ph as f, c as k, a doubled letter as one), with
            the respelling. It is a net with holes: a mark that sounds alike
            and is spelled further off, or a mark more than two letters
            away, is in neither list, so the search and store steps still
            have to look for same-sound and same-stem names.
            containingInClasses: present when containing overflowed and the
            live marks in --classes were fetched separately.
            leading: live marks that are the first four or more letters of
            the name.
            builtOn: live marks holding a longer word that starts or ends
            with the whole name, such as the name plus "pro", with that word,
            where the name sits in it, and extraLetters. It holds only
            marks not already in containing, near, soundNear, or leading:
            containing has the name as a word of its own, near has a word
            within two letters, and builtOn has the whole name inside a
            longer word. containing and near can list the same mark. It
            is not looked up for a name under four letters
            or not in Latin letters, and then searchedAll is false.
            Marks that are that one word come first, shortest first. A name
            that begins an ordinary word returns that word's marks here too,
            so read the short ones and those in the product's classes. A name
            buried in the middle of a word is not listed.
            With --classes, near, soundNear, leading, and builtOn are limited
            to those classes. Every list is read to its end, up to a few thousand
            marks. searchedAll false means even that was not all of them, so
            the list is partial. classes leaves out cancelled classes, which
            are under cancelledClasses. Each mark carries its filed, firstUse,
            and registered dates, and for a live registration upkeep: how
            long it has been registered, and when its next declaration of
            use or renewal opens, falls due, and passes its grace period. Read goods before weighing a mark, open
            record for its current status, and open ownerRecord for the
            disputes its owner has been party to
  stores    apps[]: Apple App Store and Mac App Store apps whose title or
            seller carries the name. otherTopResults: what else came back
  code      Exact package on npm, PyPI, and crates.io, GitHub repositories by
            stars and by recent activity, and whether the GitHub account of
            that name is taken
  forms     For each other form: the marks containing it (no near or leading
            lists) and the iPhone and iPad store only
  yours     Some of the lookups this script does not run, with exact queries
            and addresses: four searches, templates for the two you write, and
            store and dictionary pages
            marked with when they apply. It is a start. Other markets,
            offices, languages, and fields are still to add

Requests to each service are spaced out, so allow about a minute per name
with three suffixes and two forms, and about three with --code. Run one copy at a
time: several at once get the trademark and store services to refuse all of
them. For a long list use --out, run it in the background if the shell has a
time limit, and rerun the same command to pick up where it stopped.
Set GITHUB_TOKEN to raise the code section's GitHub limit.

Exit codes: 0 every name is complete, 1 bad arguments, 2 some name has a
failed or not-run section (results are still printed).

Examples:
  node scripts/lookup.mjs Examplename --tlds com,app --category "word one,word two"
  node scripts/lookup.mjs "Examplename=Exampelname,Exampleneym" --tlds com --classes 9,42
  node scripts/lookup.mjs --file names.txt --tlds com,io --code --out lookups.jsonl
  node scripts/lookup.mjs Examplename --only history --out lookups.jsonl`;

function fail(message) {
  process.stderr.write(`Error: ${message}\nRun with --help for usage.\n`);
  process.exit(1);
}

function parseSpec(text) {
  const [head, ...rest] = text.split("=");
  const name = head.trim();
  const forms = rest.join(",").split(",").map((f) => f.trim()).filter((f) => f && f.toLowerCase() !== name.toLowerCase());
  return { name, forms: [...new Set(forms)] };
}

function parseArgs(argv) {
  const opts = { specs: [], tlds: ["com"], tldsGiven: false, category: [], classes: [], classesGiven: false, country: "us", countryGiven: false, only: null, code: false, out: null };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    const value = () => {
      const next = argv[++i];
      if (next === undefined || next.startsWith("--")) fail(`${arg} needs a value.`);
      return next;
    };
    if (arg === "--help" || arg === "-h") {
      process.stdout.write(HELP + "\n");
      process.exit(0);
    } else if (arg === "--file") {
      const path = value();
      let text;
      try {
        text = readFileSync(path, "utf8");
      } catch {
        fail(`cannot read ${path}.`);
      }
      opts.specs.push(...text.split(/\r?\n/).filter((line) => line.trim() && !line.trim().startsWith("#")).map(parseSpec));
    } else if (arg === "--tlds") {
      opts.tlds = value().split(",").map((t) => t.trim().replace(/^\./, "").toLowerCase()).filter(Boolean);
      opts.tldsGiven = true;
    } else if (arg === "--category") {
      opts.category = value().split(",").map((w) => w.trim()).filter(Boolean);
    } else if (arg === "--classes") {
      opts.classes = value().split(",").map((c) => c.trim().replace(/^0+/, "")).filter(Boolean);
      opts.classesGiven = true;
      const bad = opts.classes.filter((c) => !/^\d{1,2}$/.test(c) || Number(c) < 1 || Number(c) > 45);
      if (bad.length) fail(`--classes takes class numbers from 1 to 45. Received: "${bad.join(", ")}"`);
    } else if (arg === "--country") {
      opts.country = value().toLowerCase();
      opts.countryGiven = true;
      if (!/^[a-z]{2}$/.test(opts.country)) fail(`--country takes a two-letter code. Received: "${opts.country}"`);
    } else if (arg === "--only") {
      opts.only = value().split(",").map((s) => s.trim().toLowerCase()).filter(Boolean);
      const bad = opts.only.filter((s) => !SECTIONS.includes(s));
      if (bad.length) fail(`--only must list sections from: ${SECTIONS.join(", ")}. Received: "${bad.join(", ")}"`);
    } else if (arg === "--code") {
      opts.code = true;
    } else if (arg === "--out") {
      opts.out = value();
    } else if (arg.startsWith("--")) {
      fail(`unknown option ${arg}.`);
    } else {
      opts.specs.push(parseSpec(arg));
    }
  }
  const seen = new Set();
  const dropped = [];
  opts.specs = opts.specs.filter((spec) => {
    if (!spec.name) return false;
    const key = slug(spec.name) || spec.name;
    if (seen.has(key)) {
      dropped.push(spec.name);
      return false;
    }
    seen.add(key);
    return true;
  });
  if (dropped.length) process.stderr.write(`Skipped as duplicates (same letters as an earlier name): ${dropped.join(", ")}\n`);
  if (!opts.specs.length) fail("give at least one name, or --file <path>.");
  if (!opts.tlds.length) fail("--tlds needs at least one suffix.");
  opts.sections = opts.only ?? [...DEFAULT_SECTIONS, ...(opts.code ? ["code"] : [])];
  return opts;
}

// A name as it appears in a domain, a handle, or a package: letters and digits only, in any script.
function slug(name) {
  return (name ?? "").toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").replace(/[^\p{L}\p{N}]/gu, "");
}

// A name as words, for matching inside a title.
function words(text) {
  return (text ?? "").toLowerCase().normalize("NFKD").replace(/\p{M}/gu, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Requests to one host go out one at a time with a gap, so a large set does
// not get the service to refuse the whole run.
const HOST_GAP = { "github.com": 1000, "tmsearch.uspto.gov": 1500, "itunes.apple.com": 3200, "web.archive.org": 1500, "api.github.com": process.env.GITHUB_TOKEN ? 2200 : 6500 };
const hostQueue = new Map();
function paced(host, task) {
  const gap = HOST_GAP[host] ?? 200;
  const run = (hostQueue.get(host) ?? Promise.resolve()).then(async () => {
    try {
      return await task();
    } finally {
      await sleep(gap);
    }
  });
  hostQueue.set(host, run.catch(() => {}));
  return run;
}

// Once a service refuses, stop asking it for ten minutes instead of waiting out every retry.
const refusedUntil = new Map();
function refuse(host) {
  if ((refusedUntil.get(host) ?? 0) < Date.now()) refusedUntil.set(host, Date.now() + 600000);
}

const BLOCKED = "refused after too many requests. Wait ten minutes, then rerun this name alone with --only for this section, and run one copy of the script at a time";

async function request(url, { method = "GET", headers = {}, body, timeout = 20000, retries = 2, waits = [2, 6], retryOn = [429, 500, 502, 503, 504] } = {}) {
  const host = new URL(url).host;
  if ((refusedUntil.get(host) ?? 0) > Date.now()) return new Response(null, { status: 429 });
  let lastError;
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await paced(host, () => fetch(url, { method, body, headers: { "user-agent": UA, ...headers }, signal: AbortSignal.timeout(timeout) }));
      if (retryOn.includes(response.status) && attempt < retries) {
        const wait = Number(response.headers.get("retry-after")) || waits[Math.min(attempt, waits.length - 1)];
        await sleep(Math.min(wait, 90) * 1000);
        continue;
      }
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < retries) await sleep(waits[Math.min(attempt, waits.length - 1)] * 1000);
    }
  }
  const code = lastError?.cause?.code;
  if (lastError?.name === "TimeoutError") throw new Error("timed out");
  if (code === "ENOTFOUND") throw new Error("no address in DNS");
  if (code === "ECONNREFUSED") throw new Error("connection refused");
  throw new Error(code ? `connection failed (${code})` : lastError?.message || "request failed");
}

// ---------- domains ----------

let bootstrapPromise;
function rdapBases() {
  bootstrapPromise ??= (async () => {
    const response = await request("https://data.iana.org/rdap/dns.json");
    if (!response.ok) throw new Error(`IANA bootstrap answered ${response.status}`);
    const map = new Map();
    for (const [tlds, urls] of (await response.json()).services) {
      for (const tld of tlds) map.set(tld.toLowerCase(), urls[0].replace(/\/?$/, "/"));
    }
    return map;
  })();
  return bootstrapPromise;
}

function whoisQuery(host, query) {
  return new Promise((resolve, reject) => {
    let text = "";
    const socket = connect(43, host, () => socket.write(query + "\r\n"));
    socket.setTimeout(12000, () => socket.destroy(new Error("timed out")));
    socket.on("data", (chunk) => (text += chunk));
    socket.on("end", () => resolve(text));
    socket.on("error", reject);
  });
}

const whoisServers = new Map();
function whoisServer(tld) {
  if (!whoisServers.has(tld)) {
    whoisServers.set(tld, whoisQuery("whois.iana.org", tld).then((text) => text.match(/^whois:\s*(\S+)/m)?.[1] ?? null));
  }
  return whoisServers.get(tld);
}

const WHOIS_FREE = /no match|not found|no data found|no data was found|no entries found|no object found|is free|status:\s*(free|available)|domain not registered|^%% no/im;
const WHOIS_CREATED = /^\s*(?:creation date|created(?: on)?|registered(?: on)?|registration (?:time|date)|domain record activated|\[created on\])\s*[.:\]]*\s*(.+)$/im;

// The registrable form of a name under a suffix, in ASCII, or null when it has none.
function domainFor(name, tld) {
  const label = slug(name);
  return label ? domainToASCII(`${label}.${tld}`) || null : null;
}

async function lookupDomain(domain) {
  const tld = domain.split(".").pop();
  const record = { domain, status: "lookup failed" };
  let bases;
  try {
    bases = await rdapBases();
  } catch (error) {
    return { ...record, error: error.message };
  }
  const base = bases.get(tld);
  if (base) {
    record.source = "registry RDAP";
    try {
      const response = await request(`${base}domain/${domain}`, { headers: { accept: "application/rdap+json" } });
      if (response.status === 404) return { ...record, status: "no record" };
      if (!response.ok) return { ...record, error: `registry answered ${response.status}` };
      const data = await response.json();
      const event = (action) => data.events?.find((e) => e.eventAction === action)?.eventDate ?? null;
      const registrar = data.entities?.find((e) => e.roles?.includes("registrar"));
      return {
        ...record,
        status: "registered",
        created: event("registration"),
        expires: event("expiration"),
        changed: event("last changed"),
        registrar: registrar?.vcardArray?.[1]?.find((f) => f[0] === "fn")?.[3] ?? null,
        nameservers: (data.nameservers ?? []).map((n) => n.ldhName?.toLowerCase()).filter(Boolean),
        registryStatus: data.status ?? [],
      };
    } catch (error) {
      return { ...record, error: error.message };
    }
  }
  // The suffix publishes no RDAP service, so ask its WHOIS server, then DNS.
  try {
    const server = await whoisServer(tld);
    if (server) {
      record.source = `WHOIS ${server}`;
      const text = await whoisQuery(server, domain);
      if (WHOIS_FREE.test(text)) return { ...record, status: "no record" };
      const created = text.match(WHOIS_CREATED)?.[1]?.trim() ?? null;
      const nameservers = [...text.matchAll(/^\s*(?:name ?server|nserver)\s*[.:]*\s*(\S+)/gim)].map((m) => m[1].toLowerCase());
      const registrar = text.match(/^\s*registrar(?: name)?\s*[.:]+\s*(.+)$/im)?.[1]?.trim() ?? null;
      if (created || nameservers.length) return { ...record, status: "registered", created, registrar, nameservers };
      record.note = "WHOIS answered in a form this script does not read. Read the registry's own lookup page.";
    }
  } catch (error) {
    record.error = error.message;
  }
  try {
    const nameservers = (await resolveNs(domain)).map((n) => n.toLowerCase());
    return { ...record, status: "registered", source: "DNS only", nameservers, note: "Delegated in DNS, so it is registered. No registry record was readable, so the creation date is unknown." };
  } catch {
    return { ...record, status: "unknown", source: record.source ?? "DNS only", note: record.note ?? "No registry lookup exists for this suffix and the name is not delegated in DNS. That is not proof it is unregistered. Use the registry's own lookup page." };
  }
}

const SALE_HOSTS = /sedo|afternic|dan\.com|bodis|parkingcrew|hugedomains|brandbucket|namebright|squadhelp|atom\.com|undeveloped|uniregistry|internettraffic|above\.com|parklogic/;
const SALE_WORDS = /domain (?:name )?(?:is|may be) for sale|buy this domain|this domain is parked|parked free|make an offer|is available for purchase|\/lander|forsale\./i;

async function whatItServes(record) {
  const serves = { httpStatus: null, finalUrl: null, title: null, parkingSigns: [] };
  const saleNs = (record.nameservers ?? []).filter((n) => SALE_HOSTS.test(n));
  if (saleNs.length) serves.parkingSigns.push(`name servers at a domain marketplace (${saleNs[0]})`);
  try {
    const get = (scheme) => request(`${scheme}://${record.domain}/`, { timeout: 10000, retries: 0, headers: { accept: "text/html" } });
    const response = await get("https").catch(() => get("http"));
    const html = (await response.text()).slice(0, 80000);
    serves.httpStatus = response.status;
    serves.finalUrl = response.url;
    serves.title = html.match(/<title[^>]*>([^<]{0,200})/i)?.[1]?.replace(/\s+/g, " ").trim() || null;
    if (new URL(response.url).host.replace(/^www\./, "") !== record.domain) serves.parkingSigns.push(`redirects to ${new URL(response.url).host}`);
    if (SALE_WORDS.test(html)) serves.parkingSigns.push("page text or script points to a sale or parking page");
    if (!serves.title && html.length < 3000) serves.parkingSigns.push("near-empty page, typical of a parking redirect");
  } catch (error) {
    serves.error = error.message;
  }
  return serves;
}

async function domainsSection(name, tlds) {
  if (!slug(name)) return { ran: false, error: "the name has no letters or digits to form a domain from", records: [], registeredTogether: [] };
  const records = [];
  for (const tld of tlds) {
    const domain = domainFor(name, tld);
    if (!domain) {
      records.push({ domain: `${slug(name)}.${tld}`, status: "lookup failed", error: "not a valid domain name" });
      continue;
    }
    const record = await lookupDomain(domain);
    if (record.status === "registered") record.serves = await whatItServes(record);
    records.push(record);
  }
  // Suffixes registered within a minute of each other were bought by one party.
  const dated = records.filter((r) => r.created && !Number.isNaN(Date.parse(r.created)));
  const together = [];
  for (const a of dated) {
    const group = dated.filter((b) => Math.abs(Date.parse(a.created) - Date.parse(b.created)) <= 60000).map((b) => b.domain);
    if (group.length > 1 && !together.some((g) => g.join() === group.join())) together.push(group);
  }
  const failed = records.filter((r) => r.status === "lookup failed" || r.status === "unknown");
  return {
    ran: failed.length === 0,
    ...(failed.length ? { error: `no registry answer for ${failed.map((r) => r.domain).join(", ")}` } : {}),
    records,
    registeredTogether: together,
  };
}

// ---------- history ----------

async function historySection(name, tlds, domainRecords) {
  const records = [];
  const errors = [];
  for (const tld of tlds) {
    const domain = domainFor(name, tld);
    if (!domain) {
      errors.push(`${tld}: not a valid domain name`);
      continue;
    }
    try {
      const url = `https://web.archive.org/cdx/search/cdx?url=${domain}&output=json&fl=timestamp,statuscode&collapse=timestamp:6&limit=400`;
      const response = await request(url, { timeout: 45000, retries: 3, waits: [10, 30, 60], retryOn: [403, 429, 500, 502, 503, 504] });
      if (response.status === 429 || response.status === 403) {
        refuse("web.archive.org");
        throw new Error(`archive ${BLOCKED}`);
      }
      if (!response.ok) throw new Error(`archive answered ${response.status}`);
      const text = await response.text();
      const rows = text.trim() ? JSON.parse(text).slice(1) : [];
      const stamps = rows.map((r) => r[0]);
      const iso = (s) => `${s.slice(0, 4)}-${s.slice(4, 6)}-${s.slice(6, 8)}`;
      const years = [...new Set(stamps.map((s) => s.slice(0, 4)))];
      // One link per year, a capture that returned a page where there is one.
      // A long history is thinned to eight links that keep the first and last year.
      let picked = years;
      if (years.length > 8) {
        const step = (years.length - 1) / 7;
        picked = [...new Set([...Array.from({ length: 7 }, (_, i) => years[Math.round(i * step)]), years.at(-1)])];
      }
      const open = picked.map((y) => {
        const inYear = rows.filter((r) => r[0].startsWith(y));
        const ordered = y === years.at(-1) ? [...inYear].reverse() : inYear;
        const pick = ordered.find((r) => r[1] === "200") ?? ordered[0];
        return { year: y, status: pick[1], url: `https://web.archive.org/web/${pick[0]}/${domain}` };
      });
      const current = domainRecords?.find((r) => r.domain === domain);
      let earlierOwner = null;
      if (!stamps.length) earlierOwner = false;
      else if (current?.status === "no record") earlierOwner = true;
      else if (current?.created && !Number.isNaN(Date.parse(current.created))) earlierOwner = Date.parse(iso(stamps[0])) < Date.parse(current.created) - 86400000;
      records.push({ domain, monthsCaptured: stamps.length, first: stamps.length ? iso(stamps[0]) : null, last: stamps.length ? iso(stamps.at(-1)) : null, years, open, earlierOwner });
    } catch (error) {
      errors.push(`${domain}: ${error.message}`);
      records.push({ domain, error: error.message });
    }
  }
  return { ran: errors.length === 0, ...(errors.length ? { error: errors.join(", ") } : {}), records };
}

// ---------- marks ----------

// This is the search service behind the USPTO's public trademark search page.
// The USPTO publishes no specification for it, so treat a failure as "not run".
async function usptoSearch(query, { liveOnly = false, classes = [], size = 60, from = 0 } = {}) {
  const filter = [];
  if (liveOnly) filter.push({ term: { LD: "true" } });
  if (classes.length) filter.push({ terms: { IC: classes.map((c) => c.padStart(3, "0")) } });
  const body = JSON.stringify({
    query: { bool: { must: [{ query_string: { query, default_operator: "AND", fields: ["WM", "PM"], fuzzy_max_expansions: 5000 } }], ...(filter.length ? { filter } : {}) } },
    size,
    from,
  });
  const response = await request("https://tmsearch.uspto.gov/prod-stage-v1-0-0/tmsearch", {
    method: "POST",
    body,
    headers: { "content-type": "application/json", accept: "application/json" },
    retries: 2,
    waits: [20, 60],
    retryOn: [403, 429, 500, 502, 503, 504],
  });
  if (response.status === 403 || response.status === 429) {
    refuse("tmsearch.uspto.gov");
    throw new Error(`USPTO search ${BLOCKED}`);
  }
  if (!response.ok) throw new Error(`USPTO search answered ${response.status}`);
  const data = await response.json();
  if (!data.hits || !Array.isArray(data.hits.hits)) throw new Error("USPTO search answered in an unexpected shape");
  if (typeof data.hits.totalValue !== "number") throw new Error("USPTO search no longer reports how many marks match, so its lists cannot be trusted. Query the office by hand");
  return { total: data.hits.totalValue, rows: data.hits.hits.map((h) => h.source) };
}

// Reads every page of a result, up to a cap. searchedAll is false when the cap cut it short.
async function usptoAll(query, options, cap) {
  const rows = [];
  let total = 0;
  do {
    const page = await usptoSearch(query, { ...options, size: 500, from: rows.length });
    total = page.total;
    rows.push(...page.rows);
    if (!page.rows.length) break;
  } while (rows.length < total && rows.length < cap);
  return { total, rows, searchedAll: rows.length >= total };
}

// The search service has no published contract. If it stops finding a mark that
// certainly exists, its answers cannot be trusted, so the marks lookups fail.
let usptoChecked;
function usptoSelfTest() {
  usptoChecked ??= usptoSearch("apple", { size: 1 }).then((answer) => {
    if (!(answer.total > 0) || !answer.rows[0]?.wordmark) throw new Error("USPTO search no longer answers as expected, so its results cannot be trusted. Query the office by hand");
  });
  return usptoChecked;
}

// When a United States registration's next upkeep filing opens and when its grace period ends.
// A declaration of use falls due in the sixth year, and a renewal in every tenth.
function upkeep(registered, status, renewed) {
  if (!registered || Number.isNaN(Date.parse(registered))) return null;
  const at = (years, months = 0) => {
    const d = new Date(registered);
    d.setUTCFullYear(d.getUTCFullYear() + years);
    d.setUTCMonth(d.getUTCMonth() + months);
    return d.toISOString().slice(0, 10);
  };
  const today = new Date().toISOString().slice(0, 10);
  const windows = [{ filing: "declaration of use", opens: at(5), due: at(6), graceEnds: at(6, 6) }];
  for (let year = 10; year <= 100; year += 10) windows.push({ filing: "renewal and declaration of use", opens: at(year - 1), due: at(year), graceEnds: at(year, 6) });
  // A status that names an accepted declaration or a renewal means the current window's filing is in.
  const open = windows.filter((w) => w.graceEnds >= today);
  // The first window's filing is in when the status names an accepted declaration.
  // A renewal window's filing is in when the record carries a renewal date inside it.
  const current = open[0];
  const filed = current && current.opens <= today && (current === windows[0] ? /section 8/i.test(status ?? "") : Boolean(renewed) && renewed.slice(0, 10) >= current.opens);
  const next = (filed ? open[1] : current) ?? null;
  return {
    yearsRegistered: Math.floor((Date.parse(today) - Date.parse(registered)) / 31557600000),
    statusNow: status ?? null,
    next,
    inWindowNow: next ? next.opens <= today : false,
    note: "The status page lists the filings actually made. A registration past a grace period with nothing filed is cancelled or expired.",
  };
}

function markRow(source, name, classes) {
  const numberOf = (c) => c.replace(/\D/g, "").replace(/^0+/, "");
  const all = source.internationalClass ?? [];
  const markClasses = all.filter((c) => !/cancel/i.test(c)).map(numberOf);
  const cancelledClasses = all.filter((c) => /cancel/i.test(c)).map(numberOf);
  return {
    wordmark: source.wordmark,
    exact: slug(source.wordmark ?? "") === slug(name),
    live: source.alive === true,
    status: source.statusDescription,
    classes: markClasses,
    ...(cancelledClasses.length ? { cancelledClasses } : {}),
    ...(classes.length ? { classMatch: markClasses.some((c) => classes.includes(c)) } : {}),
    goods: cut((source.goodsAndServices ?? []).join(" "), 1500),
    owner: (source.ownerName ?? []).join(" / ") || null,
    filed: source.filedDate?.slice(0, 10) ?? null,
    registered: source.registrationDate ?? null,
    firstUse: source.firstUseAnyDate ?? null,
    upkeep: source.alive === true ? upkeep(source.registrationDate, source.statusDescription, source.renewalDate) : null,
    serial: source.id,
    record: `https://tsdr.uspto.gov/statusview/sn${source.id}`,
    ownerRecord: source.ownerName?.[0] ? `https://ttabvue.uspto.gov/ttabvue/v?pnam=${encodeURIComponent(source.ownerName[0].replace(/\s*\(.*$/, ""))}` : null,
  };
}

// Shortens long text and says so, so a cut is never mistaken for the end.
function cut(text, limit) {
  return text.length > limit ? `${text.slice(0, limit)} [cut, open record for the rest]` : text;
}

function editDistance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

// Respellings a listener could type for the same sound: each swap alone, and all of them together.
const SOUND_SWAPS = [
  [/ph/g, "f"],
  [/ck/g, "k"],
  [/c(?=[aou]|[^eiyh]|$)/g, "k"],
  [/qu/g, "kw"],
  [/x/g, "ks"],
  [/y(?=[^aeiou]|$)/g, "i"],
  [/z/g, "s"],
  [/([a-z])\1/g, "$1"],
  [/(?<=[^aeiou])e$/g, ""],
  [/ou/g, "u"],
  [/ee|ea/g, "e"],
];
function soundForms(key) {
  if (key.length < 5 || !/^[a-z0-9]+$/.test(key)) return [];
  const forms = new Set();
  let all = key;
  for (const [pattern, replacement] of SOUND_SWAPS) {
    const one = key.replace(pattern, replacement);
    if (one !== key && one.length >= 4) forms.add(one);
    all = all.replace(pattern, replacement);
  }
  if (all !== key && all.length >= 4) forms.add(all);
  return [...forms].slice(0, 10);
}

function rankMarks(rows) {
  return rows.sort((a, b) => b.exact - a.exact || b.live - a.live || (b.classMatch ?? false) - (a.classMatch ?? false));
}

// searchedAll false on a list means more marks exist than the service returned.
async function marksSection(name, classes, { exactOnly = false } = {}) {
  const key = slug(name);
  const phrase = name.replace(/["\\]/g, " ").trim();
  const result = { ran: true, office: "USPTO" };
  try {
    await usptoSelfTest();
    const query = `"${phrase}" OR ${key}`;
    const containing = await usptoAll(query, {}, 500);
    const rows = new Map(containing.rows.map((s) => [s.id, s]));
    if (!containing.searchedAll && classes.length) {
      // Too many to read them all, so read every live one in the product's classes.
      const inClass = await usptoAll(query, { liveOnly: true, classes }, 2000);
      for (const s of inClass.rows) rows.set(s.id, s);
      result.containingInClasses = { total: inClass.total, searchedAll: inClass.searchedAll };
    }
    result.containing = { total: containing.total, searchedAll: containing.searchedAll, listed: rows.size, marks: rankMarks([...rows.values()].map((s) => markRow(s, name, classes))) };
    if (exactOnly) return result;

    // Live marks within two letters, or one for a name of four letters or fewer, closest first.
    const near = await usptoAll(`${key}~${key.length >= 5 ? 2 : 1}`, { liveOnly: true, classes }, 8000);
    // The service also returns marks that merely contain a near word, so keep those truly within reach.
    const reach = key.length >= 5 ? 2 : 1;
    const nearMarks = near.rows.map((s) => markRow(s, name, classes)).filter((m) => !m.exact);
    for (const m of nearMarks) {
      const whole = editDistance(slug(m.wordmark ?? ""), key);
      m.lettersApart = Math.min(whole, ...words(m.wordmark).split(" ").map((w) => editDistance(w, key)));
      // False when only one word of a longer mark is close, which is most of a long list.
      m.wholeMark = whole <= reach;
    }
    const within = nearMarks.filter((m) => m.lettersApart <= reach).sort((a, b) => b.wholeMark - a.wholeMark || a.lettersApart - b.lettersApart || (b.classMatch ?? false) - (a.classMatch ?? false));
    result.near = { total: within.length, limitedToClasses: classes.length > 0, searchedAll: near.searchedAll, listed: within.length, marks: within };

    // Live marks within one letter of a respelling that sounds the same, which a letter count alone misses.
    const respelled = soundForms(key);
    if (respelled.length) {
      const sound = await usptoAll(respelled.map((form) => `${form}~1`).join(" OR "), { liveOnly: true, classes }, 4000);
      const listed = new Set(within.map((m) => m.serial));
      const soundMarks = [];
      for (const source of sound.rows) {
        const m = markRow(source, name, classes);
        if (m.exact || listed.has(m.serial)) continue;
        const parts = [slug(m.wordmark ?? ""), ...words(m.wordmark).split(" ")];
        let best = null;
        for (const form of respelled) {
          const apart = Math.min(...parts.map((part) => editDistance(part, form)));
          if (apart <= 1 && (!best || apart < best.apart)) best = { form, apart };
        }
        if (best) soundMarks.push({ ...m, respelling: best.form, lettersFromRespelling: best.apart });
      }
      soundMarks.sort((a, b) => a.lettersFromRespelling - b.lettersFromRespelling || (b.classMatch ?? false) - (a.classMatch ?? false));
      result.soundNear = { respellings: respelled, total: soundMarks.length, limitedToClasses: classes.length > 0, searchedAll: sound.searchedAll, listed: soundMarks.length, marks: soundMarks };
    } else {
      result.soundNear = { respellings: [], total: 0, limitedToClasses: classes.length > 0, searchedAll: true, listed: 0, marks: [] };
    }

    // Live marks that are the leading part of the name, four letters or more.
    const prefixes = [];
    for (let length = 4; length < key.length; length++) prefixes.push(key.slice(0, length));
    if (prefixes.length) {
      const leading = await usptoAll(prefixes.join(" OR "), { liveOnly: true, classes }, 3000);
      const marks = rankMarks(leading.rows.map((s) => markRow(s, name, classes)).filter((m) => prefixes.includes(slug(m.wordmark ?? ""))));
      result.leading = { total: marks.length, limitedToClasses: classes.length > 0, searchedAll: leading.searchedAll, listed: marks.length, marks };
    } else {
      result.leading = { total: 0, limitedToClasses: classes.length > 0, searchedAll: true, listed: 0, marks: [] };
    }

    // Live marks with a longer word that starts or ends with the whole name, such as the name plus "pro".
    // The lists above compare whole words, so they cannot see these.
    if (key.length >= 4 && /^[a-z0-9]+$/.test(key)) {
      const built = await usptoAll(`${key}* OR *${key}`, { liveOnly: true, classes }, 3000);
      const shown = new Set([...result.containing.marks, ...result.near.marks, ...result.soundNear.marks, ...result.leading.marks].map((m) => m.serial));
      const marks = [];
      for (const source of built.rows) {
        const m = markRow(source, name, classes);
        if (shown.has(m.serial)) continue;
        const parts = [slug(m.wordmark ?? ""), ...words(m.wordmark).split(" ")];
        const word = parts.filter((p) => p.length > key.length && (p.startsWith(key) || p.endsWith(key))).sort((a, b) => a.length - b.length)[0];
        if (!word) continue;
        marks.push({ ...m, word, namePosition: word.startsWith(key) ? "starts the word" : "ends the word", extraLetters: word.length - key.length, wholeMark: slug(m.wordmark ?? "") === word });
      }
      marks.sort((a, b) => b.wholeMark - a.wholeMark || a.extraLetters - b.extraLetters || (b.classMatch ?? false) - (a.classMatch ?? false));
      result.builtOn = { total: marks.length, limitedToClasses: classes.length > 0, searchedAll: built.searchedAll, listed: marks.length, marks };
    } else {
      result.builtOn = { total: 0, limitedToClasses: classes.length > 0, searchedAll: false, listed: 0, marks: [], note: "Not looked up: the name is shorter than four letters or not in Latin letters. Query the office for marks that start or end with it." };
    }
    return result;
  } catch (error) {
    return { ...result, ran: false, error: error.message };
  }
}

// ---------- stores ----------

async function storesSection(name, country, { iphoneOnly = false } = {}) {
  const store = iphoneOnly ? `Apple App Store (${country})` : `Apple App Store and Mac App Store (${country})`;
  try {
    const phrase = words(name);
    const key = slug(name);
    // The name as a phrase, as one word, or as two or three neighboring words run together.
    const carries = (text) => {
      const list = words(text).split(" ");
      if (` ${list.join(" ")} `.includes(` ${phrase} `)) return true;
      return list.some((w, i) => w === key || w + (list[i + 1] ?? "") === key || w + (list[i + 1] ?? "") + (list[i + 2] ?? "") === key);
    };
    const apps = [];
    const others = [];
    for (const entity of iphoneOnly ? ["software"] : ["software", "macSoftware"]) {
      const url = `https://itunes.apple.com/search?term=${encodeURIComponent(name)}&entity=${entity}&country=${country}&limit=25`;
      const response = await request(url, { retries: 2, waits: [20, 60], retryOn: [403, 429, 500, 502, 503, 504] });
      if (response.status === 403 || response.status === 429) {
        refuse("itunes.apple.com");
        throw new Error(`Apple search ${BLOCKED}`);
      }
      if (!response.ok) throw new Error(`Apple search answered ${response.status}`);
      for (const r of (await response.json()).results ?? []) {
        const row = { title: r.trackName, seller: r.sellerName, platform: entity === "macSoftware" ? "Mac" : "iPhone and iPad", genre: r.primaryGenreName, released: r.releaseDate?.slice(0, 10) ?? null, updated: r.currentVersionReleaseDate?.slice(0, 10) ?? null, ratings: r.userRatingCount ?? 0, url: r.trackViewUrl };
        if (carries(r.trackName) || carries(r.sellerName)) apps.push(row);
        else if (others.length < 8) others.push({ title: r.trackName, seller: r.sellerName, platform: row.platform });
      }
    }
    return { ran: true, store, titleMatches: apps.length, apps, otherTopResults: others };
  } catch (error) {
    return { ran: false, store, error: error.message };
  }
}

// ---------- code ----------

async function codeSection(name) {
  const key = slug(name);
  const out = { ran: true };
  const errors = [];
  const attempt = async (label, fn) => {
    try {
      out[label] = await fn();
    } catch (error) {
      errors.push(`${label}: ${error.message}`);
      out[label] = { error: error.message };
    }
  };
  const github = async (path) => {
    const headers = { accept: "application/vnd.github+json" };
    if (process.env.GITHUB_TOKEN) headers.authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const response = await request(`https://api.github.com${path}`, { headers, retries: 2, waits: [30, 65], retryOn: [403, 429] });
    if (response.status === 403 || response.status === 429) throw new Error("GitHub rate limit. Set GITHUB_TOKEN, or rerun this name later with --only code");
    return response;
  };
  await attempt("npm", async () => {
    const response = await request(`https://registry.npmjs.org/${encodeURIComponent(key)}`);
    if (response.status === 404) return { exists: false };
    if (!response.ok) throw new Error(`answered ${response.status}`);
    const data = await response.json();
    const latest = data["dist-tags"]?.latest ?? null;
    const downloads = await request(`https://api.npmjs.org/downloads/point/last-month/${encodeURIComponent(key)}`).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    return { exists: true, latest, published: data.time?.[latest]?.slice(0, 10) ?? null, created: data.time?.created?.slice(0, 10) ?? null, description: data.description ?? null, downloadsLastMonth: downloads?.downloads ?? null };
  });
  await attempt("pypi", async () => {
    const response = await request(`https://pypi.org/pypi/${encodeURIComponent(key)}/json`);
    if (response.status === 404) return { exists: false };
    if (!response.ok) throw new Error(`answered ${response.status}`);
    const data = await response.json();
    return { exists: true, latest: data.info?.version ?? null, published: (data.urls ?? [])[0]?.upload_time?.slice(0, 10) ?? null, description: data.info?.summary ?? null };
  });
  await attempt("crates", async () => {
    const response = await request(`https://crates.io/api/v1/crates/${encodeURIComponent(key)}`);
    if (response.status === 404) return { exists: false };
    if (!response.ok) throw new Error(`answered ${response.status}`);
    const { crate } = await response.json();
    return { exists: true, latest: crate.newest_version, updated: crate.updated_at?.slice(0, 10) ?? null, downloads: crate.downloads, description: crate.description ?? null };
  });
  await attempt("githubRepositories", async () => {
    // Most starred shows the established uses. Most recently pushed shows the new ones.
    const seen = new Map();
    let total = 0;
    for (const sort of ["stars", "updated"]) {
      const response = await github(`/search/repositories?q=${encodeURIComponent(key)}+in:name&sort=${sort}&per_page=8`);
      if (!response.ok) throw new Error(`answered ${response.status}`);
      const data = await response.json();
      total = data.total_count;
      for (const r of data.items ?? []) {
        seen.set(r.full_name, { name: r.full_name, exact: slug(r.name) === key, stars: r.stargazers_count, created: r.created_at?.slice(0, 10), pushed: r.pushed_at?.slice(0, 10), archived: r.archived, description: r.description, url: r.html_url });
      }
    }
    const repositories = [...seen.values()].sort((a, b) => b.exact - a.exact || b.stars - a.stars);
    // total counts loose matches on the word. exactName counts repositories with this very name.
    return { total, exactName: repositories.filter((r) => r.exact).length, repositories };
  });
  await attempt("githubAccount", async () => {
    // The profile page answers without the API's hourly limit.
    const response = await request(`https://github.com/${encodeURIComponent(key)}`, { method: "HEAD", retries: 1 });
    if (response.status === 404) return { taken: false };
    if (response.ok) return { taken: true, url: `https://github.com/${key}` };
    throw new Error(`answered ${response.status}`);
  });
  if (errors.length) {
    out.ran = false;
    out.error = errors.join(", ");
  }
  return out;
}

// ---------- the lookups left to the agent ----------

function yours(spec, opts) {
  const { name, forms } = spec;
  const quote = (t) => `"${t}"`;
  const category = opts.category.length ? `(${opts.category.map((w) => (w.includes(" ") ? quote(w) : w)).join(" OR ")})` : "(<category words joined by OR>)";
  const domain = domainFor(name, opts.tlds[0]) ?? `${slug(name)}.${opts.tlds[0]}`;
  const list = [
    { step: "search", query: quote(name) },
    { step: "search", query: `${quote(name)} ${category}` },
    ...(forms.length ? [{ step: "search", query: `(${forms.map(quote).join(" OR ")}) ${category}` }] : []),
    { step: "search", when: "buyers read English. Otherwise write the four adverse words in their language", query: `(${quote(name)} OR ${quote(domain)}) (scam OR fraud OR lawsuit OR complaint)` },
    { step: "search", query: `(<near forms and same-sound respellings you choose, each in quotes, joined by OR>) ${category}` },
    { step: "search", query: `"<the name's stem: its leading word or root>" ${category}` },
  ];
  for (const term of [name, ...forms]) list.push({ step: "marketplaces", when: "the product is an app", url: `https://play.google.com/store/search?q=${encodeURIComponent(term)}&c=apps` });
  for (const term of [name, ...forms]) {
    for (const spelling of new Set([term.toLowerCase(), term])) list.push({ step: "languages", when: "always, the page lists the word in every language that has it", url: `https://en.wiktionary.org/wiki/${encodeURIComponent(spelling)}` });
  }
  for (const term of [name, ...forms]) list.push({ step: "languages", when: "buyers read English", url: `https://www.urbandictionary.com/define.php?term=${encodeURIComponent(term)}` });
  return list;
}

// ---------- run ----------

// Looks up what is asked for and not already answered in `base`, a row kept from an earlier run.
async function lookupName(spec, opts, base) {
  const { name, forms } = spec;
  const result = base ? { ...base } : { name };
  // A rerun that leaves out --classes or --country keeps what the row was looked up with.
  const classes = !opts.classesGiven && base?.settings?.classes ? base.settings.classes : opts.classes;
  const country = !opts.countryGiven && base?.settings?.country ? base.settings.country : opts.country;
  const settings = { classes: [...classes].sort(), country };
  const changed = (key) => base?.settings && JSON.stringify(base.settings[key]) !== JSON.stringify(settings[key]);
  const want = (section) => opts.sections.includes(section);
  const missing = (section) => want(section) && (!result[section] || result[section].ran === false);

  // A rerun with no --tlds keeps looking at the suffixes the row already has.
  const label = slug(name);
  const known = (result.domains?.records ?? []).map((r) => r.domain.split(".").slice(1).join(".")).filter(Boolean);
  const tlds = !opts.tldsGiven && known.length && label ? [...new Set(known)] : opts.tlds;
  const domains = tlds.map((tld) => domainFor(name, tld));
  const bad = (r) => r.error || r.status === "lookup failed" || r.status === "unknown";
  const covers = (section) => domains.every((d) => result[section]?.records?.some((r) => r.domain === d && !bad(r)));
  const merge = (old, fresh) => {
    const records = [...(old?.records ?? []).filter((r) => !fresh.records.some((f) => f.domain === r.domain)), ...fresh.records];
    const failed = records.filter(bad);
    const merged = { ...fresh, ran: failed.length === 0, records };
    delete merged.error;
    if (failed.length) merged.error = `no answer for ${failed.map((r) => r.domain).join(", ")}`;
    return merged;
  };
  let looked = false;

  if (want("domains") && (missing("domains") || !covers("domains"))) {
    result.domains = merge(result.domains, await domainsSection(name, tlds));
    looked = true;
  }
  if (want("history") && (missing("history") || !covers("history"))) {
    result.history = merge(result.history, await historySection(name, tlds, result.domains?.records));
    looked = true;
  }
  if (missing("marks") || (want("marks") && changed("classes"))) {
    result.marks = await marksSection(name, classes);
    looked = true;
  }
  if (missing("stores") || (want("stores") && changed("country"))) {
    result.stores = await storesSection(name, country);
    looked = true;
  }
  if (missing("code")) {
    result.code = await codeSection(name);
    looked = true;
  }

  const entries = new Map((result.forms ?? []).map((entry) => [entry.form, entry]));
  for (const form of forms) {
    const entry = entries.get(form) ?? { form };
    if (want("marks") && (!entry.marks || entry.marks.ran === false || changed("classes"))) {
      entry.marks = await marksSection(form, classes, { exactOnly: true });
      looked = true;
    }
    if (want("stores") && (!entry.stores || entry.stores.ran === false || changed("country"))) {
      entry.stores = await storesSection(form, country, { iphoneOnly: true });
      looked = true;
    }
    entries.set(form, entry);
  }
  if (entries.size) result.forms = [...entries.values()];

  result.settings = settings;
  result.failed = SECTIONS.filter((section) => result[section]?.ran === false);
  for (const entry of result.forms ?? []) {
    for (const section of ["marks", "stores"]) {
      if (entry[section]?.ran === false) result.failed.push(`${section} for form ${entry.form}`);
    }
  }
  // A row built with --only is not a complete record until the other sections have run.
  result.notRun = DEFAULT_SECTIONS.filter((section) => !result[section]);
  for (const entry of result.forms ?? []) {
    for (const section of ["marks", "stores"]) {
      if (!entry[section]) result.notRun.push(`${section} for form ${entry.form}`);
    }
  }
  if (looked || !result.lookedUp) result.lookedUp = new Date().toISOString();
  result.yours = yours({ name, forms: (result.forms ?? []).map((entry) => entry.form) }, { ...opts, tlds });
  return { result, looked };
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  // With --out the file is the record: every row in it is kept, and a rerun adds to a name's row.
  const keyOf = (name) => slug(name) || name;
  const rows = new Map();
  if (opts.out && existsSync(opts.out)) {
    for (const line of readFileSync(opts.out, "utf8").split("\n")) {
      try {
        const row = JSON.parse(line);
        if (row?.name) rows.set(keyOf(row.name), row);
      } catch {
        // A line cut off by an interrupted run is looked up again.
      }
    }
  }
  const save = () => {
    writeFileSync(`${opts.out}.tmp`, [...rows.values()].map((row) => JSON.stringify(row)).join("\n") + "\n");
    renameSync(`${opts.out}.tmp`, opts.out);
  };
  const results = new Array(opts.specs.length);
  let next = 0;
  let done = 0;
  let reused = 0;
  const worker = async () => {
    while (next < opts.specs.length) {
      const index = next++;
      const spec = opts.specs[index];
      const { result, looked } = await lookupName(spec, opts, rows.get(keyOf(spec.name)));
      results[index] = result;
      rows.set(keyOf(spec.name), result);
      if (!looked) reused++;
      done++;
      if (opts.out) save();
      if (opts.specs.length > 3) process.stderr.write(`${done} of ${opts.specs.length} done\n`);
    }
  };
  await Promise.all(Array.from({ length: Math.min(3, opts.specs.length) }, worker));
  const incomplete = results.filter((r) => r.failed.length || r.notRun.length);
  if (opts.out) {
    save();
    process.stdout.write(JSON.stringify({ wrote: opts.out, namesInFile: rows.size, namesThisRun: results.length, alreadyComplete: reused, incomplete: incomplete.map((r) => ({ name: r.name, failed: r.failed, notRun: r.notRun })) }) + "\n");
  } else {
    process.stdout.write(results.map((r) => JSON.stringify(r)).join("\n") + "\n");
  }
  if (incomplete.length) {
    process.stderr.write(`Incomplete: ${incomplete.map((r) => `${r.name} (${[...r.failed.map((f) => `failed ${f}`), ...r.notRun.map((n) => `not run ${n}`)].join(", ")})`).join(", ")}\n`);
    process.exit(2);
  }
}

main();
