#!/usr/bin/env node
// Registry lookups for the naming-check full check: domains, domain history,
// US trademarks, the Apple app stores, and code registries.
// Zero dependencies. Node.js 18 or later. Prints a short summary per name and
// keeps the full records, one JSON object per name, behind --out or --json.

import { connect } from "node:net";
import { resolveNs } from "node:dns/promises";
import { existsSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import { domainToASCII } from "node:url";

const SECTIONS = ["domains", "history", "marks", "stores", "code"];
const DEFAULT_SECTIONS = ["domains", "history", "marks", "stores"];
const UA = "naming-check-lookup (+https://github.com/LeeorNahum/naming-check-skill)";

const HELP = `Usage: node scripts/lookup.mjs <name>... [options]
       npx --yes github:LeeorNahum/naming-check-skill <name>... [options]

Runs the registry lookups of the naming-check full check and prints a short
summary per name. The full records, one JSON object per name, go to the --out
file or are printed with --json. It reports records. It gives no verdict.

A name can carry other forms: its spaced form, and spellings its owner says
people use for it:
  Examplename="Example Name",Exampelname
The script adds respellings by rule without being given them. It applies each
swap that fits the name by itself, in the order listed, then makes one more
with every swap except the last applied together, and keeps the first four
that are three letters or longer. The swaps are ph to f, ck to k, a hard c to
k, x to ks, a final y to i, a doubled consonant to one, and a hard k to c.
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
  --out <path>       Keep the full records in a file, one JSON line per name,
                     written as each name finishes. For more than five names
                     it prints one line per name and not the summaries.
                     A rerun adds to the file: it looks up only what is
                     missing, failed, or asked with different classes or
                     country for each name given, keeps that name's earlier
                     suffixes when --tlds is left out, and leaves the other
                     names in the file alone. Names that differ only in capitals,
                     spaces, accents, or punctuation are one name. A row keeps every
                     form it was ever given, so start a new file to drop one.
                     Use it on every run, so nothing is looked up twice
  --read             With --out, print the summary of what the file holds for
                     the names given and look nothing up
  --top <n>          Marks shown per list in the summary (default: 10). With
                     --out and --read, a larger number prints more of a list
  --json             Print the full records and no summary
  --help             Show this help

Reading the summary: each list of marks says how many it holds, live and
dead, and how many are shown. A dead mark is written DEAD. A mark's goods
start at the product's first class that the mark covers. "INCOMPLETE",
"not run", and "PARTIAL" mark a lookup that got no answer or not all of it,
which is not a clear result. "not searched" marks a list this name cannot
have. The summary leaves out the marks past --top, the goods past their
first words, cancelled classes, the dates a registration's upkeep window
opens and closes, the link to its owner's disputes, and a domain's expiry
and name servers. Those are in the full records.

Reading the full records, per name:
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
            containing: marks the office returns for the name, live and
            dead: the exact ones, marks with it as a word, and marks the
            office files under it for sounding or reading the same.
            near: marks within two letters (one for a name of four
            letters or fewer), each with lettersApart. wholeMark is true
            when the whole mark is that close and false when only one word
            of a longer mark is. Whole marks come first. Read those, then
            the rest only for a word that is the heart of its mark.
            soundNear: marks within one letter of a respelling that
            sounds the same or nearly so (ph as f, c as k, a doubled letter as
            one, and looser swaps than the forms use), with the respelling. It is a net with holes: a mark that sounds alike
            and is spelled further off, or a mark more than two letters
            away, is in neither list, so the search and store steps still
            have to look for same-sound and same-stem names.
            containingInClasses: present when containing overflowed and the
            live marks in --classes were fetched separately.
            leading: marks that are the first four or more letters of
            the name.
            builtOn: marks holding a longer word that starts or ends
            with the whole name, such as the name plus "pro", with that word,
            where the name sits in it, and extraLetters. It holds only
            marks not already in containing, near, soundNear, or leading:
            containing has the name as a word of its own, near has a word
            within two letters, and builtOn has the whole name inside a
            longer word. containing and near can list the same mark.
            builtOn is not looked up for a name under four letters or not in
            Latin letters, and then searchedAll is false. notSearched on a
            list says why it was not looked up.
            Marks that are that one word come first, shortest first. A name
            that begins an ordinary word returns that word's marks here too,
            so read the short ones and those in the product's classes. A name
            buried in the middle of a word is not listed.
            near, soundNear, leading, and builtOn hold live and dead marks,
            live first at the same closeness, each with live true or false,
            and the list counts both under live and dead. With --classes
            they are limited to those classes. Every list is read to its end,
            up to ten thousand marks. searchedAll false means even that was
            not all of the live ones, so the list is partial.
            deadSearchedAll false means only that some dead marks are
            missing. goods is filled for the first 500 marks of each of these
            four lists and is null after that, so open record for the rest.
            classes leaves out cancelled classes, which
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
  ruleForms The respellings made by rule for this name. Each is looked up
            as a form
  forms     For each form, given or made by rule: the marks containing it
            (no near or leading lists) and the iPhone and iPad store only. A
            form that is an ordinary word returns that word's marks and apps
  yours     Some of the lookups this script does not run, with exact queries
            and addresses: the searches, with a template for the stem search, and
            store and dictionary pages marked with when they apply.
            Dictionary pages are listed for the name and the forms given, not
            for the respellings by rule. It is a start. Other markets,
            offices, languages, and fields are still to add

Requests to each service are spaced out and the services are asked side by
side, so allow about a minute per name, more for a short name or one with
several forms, and about three with --code. Run one copy at a
time: several at once get the trademark and store services to refuse all of
them. For a long list use --out, run it in the background if the shell has a
time limit, and rerun the same command to pick up where it stopped.
Set GITHUB_TOKEN to raise the code section's GitHub limit.

Exit codes: 0 every name is complete, 1 bad arguments, 2 some name has a
failed or not-run section (results are still printed).

Examples:
  node scripts/lookup.mjs Examplename --tlds com,app --category "word one,word two" --out lookups.jsonl
  node scripts/lookup.mjs "Examplename=Exampelname,Exampleneym" --tlds com --classes 9,42 --out lookups.jsonl
  node scripts/lookup.mjs --file names.txt --tlds com,io --code --out lookups.jsonl
  node scripts/lookup.mjs Examplename --only history --out lookups.jsonl
  node scripts/lookup.mjs Examplename --out lookups.jsonl --read --top 40`;

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
  const opts = { specs: [], tlds: ["com"], tldsGiven: false, category: [], classes: [], classesGiven: false, country: "us", countryGiven: false, only: null, code: false, out: null, read: false, json: false, top: 10 };
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
    } else if (arg === "--read") {
      opts.read = true;
    } else if (arg === "--json") {
      opts.json = true;
    } else if (arg === "--top") {
      opts.top = Number(value());
      if (!Number.isInteger(opts.top) || opts.top < 1) fail(`--top takes a whole number, 1 or more. Received: "${argv[i]}"`);
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
  if (opts.read && !opts.out) fail("--read needs --out <path>, the file to read from.");
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
      const response = await request(url, { timeout: 45000, retries: 2, waits: [5, 20], retryOn: [403, 429, 500, 502, 503, 504] });
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
// The fields a mark row is built from. The wide lists leave the goods out, which
// is most of a row's size, and fetch them afterwards for the marks listed first.
const MARK_FIELDS = ["id", "wordmark", "alive", "statusDescription", "internationalClass", "ownerName", "filedDate", "registrationDate", "firstUseAnyDate", "renewalDate"];
const GOODS_FIELD = "goodsAndServices";
// The service answers no further than this many marks into a result.
const USPTO_WINDOW = 10000;

function usptoSearch(query, { liveOnly = false, deadOnly = false, classes = [], size = 60, from = 0, goods = true } = {}) {
  const filter = [];
  if (liveOnly || deadOnly) filter.push({ term: { LD: liveOnly ? "true" : "false" } });
  if (classes.length) filter.push({ terms: { IC: classes.map((c) => c.padStart(3, "0")) } });
  const bool = { must: [{ query_string: { query, default_operator: "AND", fields: ["WM", "PM"], fuzzy_max_expansions: 5000 } }], ...(filter.length ? { filter } : {}) };
  return usptoPost({ bool }, { size, from, fields: goods ? [...MARK_FIELDS, GOODS_FIELD] : MARK_FIELDS });
}

async function usptoPost(query, { size, from = 0, fields }) {
  const body = JSON.stringify({ query, size, from, _source: fields });
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
// A total at the window's edge means that many or more, so it never counts as all of them.
async function usptoAll(query, options, cap = USPTO_WINDOW) {
  const rows = [];
  let total = 0;
  const pageSize = options.goods === false ? 2500 : 500;
  do {
    const page = await usptoSearch(query, { ...options, size: Math.min(pageSize, USPTO_WINDOW - rows.length), from: rows.length });
    total = page.total;
    rows.push(...page.rows);
    if (!page.rows.length) break;
  } while (rows.length < total && rows.length < cap && rows.length < USPTO_WINDOW);
  return { total, rows, searchedAll: rows.length >= total && total < USPTO_WINDOW };
}

// Live and dead marks for one of the wide lists, read apart so that a flood of dead
// marks can never leave the live ones partial.
async function usptoLiveAndDead(query, classes) {
  const live = await usptoAll(query, { liveOnly: true, classes, goods: false });
  const dead = await usptoAll(query, { deadOnly: true, classes, goods: false });
  return { rows: [...live.rows, ...dead.rows], searchedAll: live.searchedAll, deadSearchedAll: dead.searchedAll };
}

// Fills in the goods of the first marks of each wide list, by serial number.
const GOODS_PER_LIST = 500;
async function fillGoods(lists) {
  const wanted = new Map();
  for (const list of lists) for (const mark of list.marks.slice(0, GOODS_PER_LIST)) wanted.set(mark.serial, null);
  const serials = [...wanted.keys()];
  for (let i = 0; i < serials.length; i += 500) {
    const page = await usptoPost({ ids: { values: serials.slice(i, i + 500) } }, { size: 500, fields: ["id", GOODS_FIELD] });
    for (const row of page.rows) wanted.set(row.id, cut((row[GOODS_FIELD] ?? []).join(" "), 1500));
  }
  for (const list of lists) for (const mark of list.marks.slice(0, GOODS_PER_LIST)) mark.goods = wanted.get(mark.serial);
}

// What every wide list reports beside its marks.
// A list that was not looked up carries notSearched, the reason, so that its emptiness never reads as a result.
function wideList(marks, fetched, classes, extra = {}) {
  const live = marks.filter((m) => m.live).length;
  return { ...extra, total: marks.length, live, dead: marks.length - live, limitedToClasses: classes.length > 0, searchedAll: fetched.searchedAll, deadSearchedAll: fetched.deadSearchedAll, listed: marks.length, marks };
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
    goods: source[GOODS_FIELD] ? cut(source[GOODS_FIELD].join(" "), 1500) : null,
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

// Respellings looked up as forms, the first four of: each swap alone, k to c, then all but k to c together.
const FORM_SWAPS = [
  [/ph/g, "f"],
  [/ck/g, "k"],
  [/c(?=[aou]|[^eiyhk]|$)/g, "k"],
  [/x/g, "ks"],
  [/(?<=[^aeiou])y$/g, "i"],
  [/([^aeiou0-9])\1/g, "$1"],
];
const K_TO_C = /(?<!c)k(?=[aoulr]|$)/g;
function ruleForms(name) {
  const key = slug(name);
  if (!/^[a-z0-9]+$/.test(key)) return [];
  const forms = new Set();
  let all = key;
  for (const [pattern, replacement] of FORM_SWAPS) {
    forms.add(key.replace(pattern, replacement));
    all = all.replace(pattern, replacement);
  }
  forms.add(key.replace(K_TO_C, "c"));
  forms.add(all);
  forms.delete(key);
  const capital = /^\p{Lu}/u.test(name.trim());
  return [...forms].filter((form) => form.length >= 3).slice(0, 4).map((form) => (capital ? form[0].toUpperCase() + form.slice(1) : form));
}

// A wider net of same-sound respellings, used only to find marks near one of them.
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

    // Marks within two letters, or one for a name of four letters or fewer, closest first.
    const near = await usptoLiveAndDead(`${key}~${key.length >= 5 ? 2 : 1}`, classes);
    // The service also returns marks that merely contain a near word, so keep those truly within reach.
    const reach = key.length >= 5 ? 2 : 1;
    const nearMarks = near.rows.map((s) => markRow(s, name, classes)).filter((m) => !m.exact);
    for (const m of nearMarks) {
      const whole = editDistance(slug(m.wordmark ?? ""), key);
      m.lettersApart = Math.min(whole, ...words(m.wordmark).split(" ").map((w) => editDistance(w, key)));
      // False when only one word of a longer mark is close, which is most of a long list.
      m.wholeMark = whole <= reach;
    }
    // Whole marks first, then nearest, live, and for a longer mark the fewest words, where the near word is likeliest its heart.
    const wordCount = (m) => words(m.wordmark).split(" ").length;
    const within = nearMarks.filter((m) => m.lettersApart <= reach).sort((a, b) => b.wholeMark - a.wholeMark || a.lettersApart - b.lettersApart || b.live - a.live || wordCount(a) - wordCount(b) || (b.classMatch ?? false) - (a.classMatch ?? false));
    result.near = wideList(within, near, classes);

    // Marks within one letter of a respelling that sounds the same, which a letter count alone misses.
    const respelled = soundForms(key);
    const none = { searchedAll: true, deadSearchedAll: true };
    if (respelled.length) {
      const sound = await usptoLiveAndDead(respelled.map((form) => `${form}~1`).join(" OR "), classes);
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
      soundMarks.sort((a, b) => a.lettersFromRespelling - b.lettersFromRespelling || b.live - a.live || (b.classMatch ?? false) - (a.classMatch ?? false));
      result.soundNear = wideList(soundMarks, sound, classes, { respellings: respelled });
    } else {
      result.soundNear = wideList([], none, classes, { respellings: [], notSearched: "the name has no same-sound respelling by this script's rules, so the search and store steps have to find same-sound names" });
    }

    // Marks that are the leading part of the name, four letters or more.
    const prefixes = [];
    for (let length = 4; length < key.length; length++) prefixes.push(key.slice(0, length));
    if (prefixes.length) {
      const leading = await usptoLiveAndDead(prefixes.join(" OR "), classes);
      const marks = rankMarks(leading.rows.map((s) => markRow(s, name, classes)).filter((m) => prefixes.includes(slug(m.wordmark ?? ""))));
      result.leading = wideList(marks, leading, classes);
    } else {
      result.leading = wideList([], none, classes, { notSearched: "the name has no leading part of four letters or more" });
    }

    // Marks with a longer word that starts or ends with the whole name, such as the name plus "pro".
    // The lists above compare whole words, so they cannot see these.
    if (key.length >= 4 && /^[a-z0-9]+$/.test(key)) {
      const built = await usptoLiveAndDead(`${key}* OR *${key}`, classes);
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
      marks.sort((a, b) => b.wholeMark - a.wholeMark || a.extraLetters - b.extraLetters || b.live - a.live || (b.classMatch ?? false) - (a.classMatch ?? false));
      result.builtOn = wideList(marks, built, classes);
    } else {
      result.builtOn = wideList([], { searchedAll: false, deadSearchedAll: false }, classes, { notSearched: "the name is shorter than four letters or not in Latin letters. Query the office for marks that start or end with it" });
    }
    await fillGoods([result.near, result.soundNear, result.leading, result.builtOn]);
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
  const given = forms.filter((form) => !spec.byRule.includes(form));
  const quote = (t) => `"${t}"`;
  const category = opts.category.length ? `(${opts.category.map((w) => (w.includes(" ") ? quote(w) : w)).join(" OR ")})` : "(<category words joined by OR>)";
  const domains = opts.tlds.map((tld) => domainFor(name, tld) ?? `${slug(name)}.${tld}`);
  const list = [
    { step: "search", query: quote(name) },
    { step: "search", query: `${quote(name)} ${category}` },
    ...(forms.length ? [{ step: "search", query: `(${forms.map(quote).join(" OR ")}) ${category}` }] : []),
    { step: "search", when: "when buyers read English. Otherwise write the four adverse words in their language", query: `(${[name, ...domains].map(quote).join(" OR ")}) (scam OR fraud OR lawsuit OR complaint)` },
    { step: "search", query: `"<the name's stem: its leading word or root>" ${category}` },
  ];
  for (const term of [name, ...forms]) list.push({ step: "marketplaces", when: "when the product is an app", url: `https://play.google.com/store/search?q=${encodeURIComponent(term)}&c=apps` });
  for (const term of [name, ...given]) {
    for (const spelling of new Set([term.toLowerCase(), term])) list.push({ step: "languages", when: "always. The page lists the word in every language that has it", url: `https://en.wiktionary.org/wiki/${encodeURIComponent(spelling)}` });
  }
  for (const term of [name, ...given]) list.push({ step: "languages", when: "when buyers read English", url: `https://www.urbandictionary.com/define.php?term=${encodeURIComponent(term)}` });
  return list;
}

// ---------- run ----------

// Looks up what is asked for and not already answered in `base`, a row kept from an earlier run.
async function lookupName(spec, opts, base) {
  const { name } = spec;
  const result = base ? { ...base } : { name };
  // The forms looked up are the ones given and the respellings made by rule.
  result.ruleForms = ruleForms(name);
  const given = new Set(spec.forms.map(slug));
  const forms = [...spec.forms, ...result.ruleForms.filter((form) => !given.has(slug(form)))];
  // A rerun that leaves out --classes or --country keeps what the row was looked up with.
  const classes = !opts.classesGiven && base?.settings?.classes ? base.settings.classes : opts.classes;
  const country = !opts.countryGiven && base?.settings?.country ? base.settings.country : opts.country;
  const settings = { classes: [...classes].sort(), country };
  const changed = (key) => base?.settings && JSON.stringify(base.settings[key]) !== JSON.stringify(settings[key]);
  const want = (section) => opts.sections.includes(section);
  // A marks record from before the wide lists held dead marks is looked up again.
  const liveOnly = (marks) => Boolean(marks?.near) && marks.near.deadSearchedAll === undefined;
  const missing = (section) => want(section) && (!result[section] || result[section].ran === false || (section === "marks" && liveOnly(result.marks)));

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
  const entries = new Map((result.forms ?? []).map((entry) => [entry.form, entry]));
  for (const form of forms) if (!entries.has(form)) entries.set(form, { form });

  // Each service has its own queue, so the services are asked side by side.
  // History waits for the domain records, which tell it whether a holder came before.
  const addresses = async () => {
    if (want("domains") && (missing("domains") || !covers("domains"))) {
      result.domains = merge(result.domains, await domainsSection(name, tlds));
      looked = true;
    }
    if (want("history") && (missing("history") || !covers("history"))) {
      result.history = merge(result.history, await historySection(name, tlds, result.domains?.records));
      looked = true;
    }
  };
  const marks = async () => {
    if (missing("marks") || (want("marks") && changed("classes"))) {
      result.marks = await marksSection(name, classes);
      looked = true;
    }
    for (const form of forms) {
      const entry = entries.get(form);
      if (want("marks") && (!entry.marks || entry.marks.ran === false || changed("classes"))) {
        entry.marks = await marksSection(form, classes, { exactOnly: true });
        looked = true;
      }
    }
  };
  const stores = async () => {
    if (missing("stores") || (want("stores") && changed("country"))) {
      result.stores = await storesSection(name, country);
      looked = true;
    }
    for (const form of forms) {
      const entry = entries.get(form);
      if (want("stores") && (!entry.stores || entry.stores.ran === false || changed("country"))) {
        entry.stores = await storesSection(form, country, { iphoneOnly: true });
        looked = true;
      }
    }
  };
  const code = async () => {
    if (missing("code")) {
      result.code = await codeSection(name);
      looked = true;
    }
  };
  await Promise.all([addresses(), marks(), stores(), code()]);
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
  result.yours = yours({ name, forms: (result.forms ?? []).map((entry) => entry.form), byRule: result.ruleForms.filter((form) => !given.has(slug(form))) }, { ...opts, tlds });
  return { result, looked };
}

// ---- the summary ----

const day = (value) => (value ? String(value).slice(0, 10) : null);
const clip = (text, limit) => (text && text.length > limit ? `${text.slice(0, limit).trimEnd()}...` : text ?? "");
const liveAndDead = (marks) => {
  const live = marks.filter((m) => m.live).length;
  return `${live} live, ${marks.length - live} dead`;
};

// One mark on one line: how close, live or dead, where it is filed, whose it is, and how its goods begin.
function markLine(m, classes = []) {
  const close = [
    m.exact ? "exact" : null,
    m.lettersApart !== undefined ? `${m.lettersApart} ${m.lettersApart === 1 ? "letter" : "letters"} apart${m.wholeMark ? "" : ", one word of the mark"}` : null,
    m.respelling ? `${m.lettersFromRespelling} from "${m.respelling}"` : null,
    m.word ? `"${m.word}" ${m.namePosition}` : null,
  ].filter(Boolean)[0];
  const dates = [m.filed ? `filed ${m.filed}` : null, m.firstUse ? `first use ${day(m.firstUse)}` : null, m.registered ? `registered ${day(m.registered)}` : null, m.upkeep?.next ? `next ${m.upkeep.next.filing} due ${m.upkeep.next.due}` : null].filter(Boolean).join(", ");
  const parts = [
    m.wordmark,
    close,
    `${m.live ? "live" : "DEAD"}, ${(m.status ?? "no status").toLowerCase()}`,
    `class ${m.classes.join(", ") || "none listed"}`,
    clip((m.owner ?? "no owner listed").replace(/\s*\(.*$/, ""), 40),
    dates,
    `sn ${m.serial}`,
    m.goods ? clip(goodsFrom(m.goods, classes), 90) : "goods: open the record",
  ];
  return `      ${parts.filter(Boolean).join(" | ")}`;
}

// A mark's goods, starting at the product's first class that the mark lists, so the part that matters is not cut off.
function goodsFrom(goods, classes) {
  const text = goods.replace(/\s+/g, " ");
  const starts = classes.map((c) => text.indexOf(`IC ${String(c).padStart(3, "0")}:`)).filter((i) => i >= 0);
  return starts.length ? text.slice(Math.min(...starts)) : text;
}

// How a list's marks fall across classes: the product's classes when given, or else the five fullest.
function classLine(marks, classes) {
  const count = new Map();
  for (const m of marks) for (const c of m.classes) count.set(c, [...(count.get(c) ?? []), m]);
  const shown = classes.length ? classes : [...count.keys()].sort((a, b) => count.get(b).length - count.get(a).length).slice(0, 5);
  return `By class, a mark counted once in each: ${shown.map((c) => `class ${c}: ${liveAndDead(count.get(c) ?? [])}`).join(". ")}`;
}

// The first rows of a list, how the counted marks fall across classes, and what was left out.
// `counted` is the part of the list its heading counts, which the rows start with.
function markRows(lines, marks, counted, opts, classes, kind = "live one") {
  if (!marks.length) return;
  if (counted.length > opts.top) lines.push(`      ${classLine(counted, classes)}`);
  for (const m of marks.slice(0, opts.top)) lines.push(markLine(m, classes));
  if (marks.length <= opts.top) return;
  const lastLive = counted.findLastIndex((m) => m.live) + 1;
  lines.push(`      ${opts.top} of ${marks.length} shown.${lastLive > opts.top ? ` --top ${lastLive} shows every ${kind}.` : ` Every ${kind} is shown.`}${counted.length < marks.length ? " The longer marks follow the whole ones, nearest and fewest words first." : ""}`);
}

// One of the wide lists. In the near list only whole marks are counted up front, since a
// longer mark that merely holds a near word is rarely a match. Those follow in the rows.
function markList(lines, title, list, opts, classes, { wholeFirst = false } = {}) {
  if (!list) return;
  const why = list.notSearched ?? (list.note ? list.note.replace(/^Not looked up: /, "") : null);
  if (why) {
    lines.push(`    ${title}: not searched, ${why.replace(/\.$/, "")}`);
    return;
  }
  const partial = [list.searchedAll === false ? "PARTIAL: the office holds more live marks than were read" : null, list.deadSearchedAll === false ? "some dead marks not read" : null, list.deadSearchedAll === undefined ? "dead marks not searched: this record is from an older version, so run the lookup again" : null].filter(Boolean).join(". ");
  const whole = wholeFirst ? list.marks.filter((m) => m.wholeMark) : list.marks;
  const rest = list.marks.filter((m) => !whole.includes(m));
  lines.push(`    ${title}: ${whole.length ? liveAndDead(whole) : "none"}${rest.length ? `, and ${rest.length} longer marks that only hold a near word (${liveAndDead(rest)})` : ""}${partial ? `. ${partial}` : ""}`);
  markRows(lines, list.marks, whole, opts, classes, wholeFirst ? "live whole mark" : "live one");
}

function marksLines(lines, marks, opts, classes, { formOf = null } = {}) {
  if (!marks) return;
  if (marks.ran === false) {
    lines.push(`    not run: ${marks.error}`);
    return;
  }
  const containing = marks.containing;
  const partial = containing.searchedAll === false && !marks.containingInClasses?.searchedAll ? `. PARTIAL: ${containing.listed} of ${containing.total} read` : "";
  const exact = containing.marks.filter((m) => m.exact);
  const others = containing.marks.filter((m) => !m.exact);
  const what = formOf ? `"${formOf}"` : "the name";
  lines.push(`    Exactly ${what}: ${exact.length ? liveAndDead(exact) : "none"}${partial}`);
  markRows(lines, exact, exact, opts, classes);
  lines.push(`    Other marks the office returns for ${what}: ${others.length ? liveAndDead(others) : "none"}${partial}`);
  markRows(lines, others, others, opts, classes);
  if (formOf) return;
  markList(lines, "Near by spelling, whole marks", marks.near, opts, classes, { wholeFirst: true });
  markList(lines, `Near by sound${marks.soundNear?.respellings?.length ? ` (within a letter of ${marks.soundNear.respellings.join(", ")})` : ""}`, marks.soundNear?.respellings?.length === 0 && !marks.soundNear.notSearched ? { ...marks.soundNear, notSearched: "the name has no same-sound respelling by this script's rules" } : marks.soundNear, opts, classes);
  markList(lines, "The leading part of the name", marks.leading, opts, classes);
  markList(lines, "Built on the name", marks.builtOn, opts, classes);
}

function storeLines(lines, stores) {
  if (!stores) return;
  if (stores.ran === false) {
    lines.push(`    not run: ${stores.error}`);
    return;
  }
  lines.push(`    ${stores.store}, title or seller carries the name: ${stores.apps.length || "none"}`);
  for (const a of stores.apps) lines.push(`      ${a.title} | ${a.seller} | ${a.platform} | ${a.genre} | released ${a.released} | updated ${a.updated} | ${a.ratings} ratings | ${a.url}`);
  if (stores.otherTopResults?.length) lines.push(`      Also returned: ${stores.otherTopResults.map((o) => clip(o.title, 40)).join(", ")}`);
}

function summarize(r, opts) {
  if (r.notInFile) return `${r.name}\n  Not in ${opts.out}. Run the same command without --read to look it up.`;
  const classes = [...(r.settings?.classes ?? [])].sort((a, b) => a - b);
  const lines = [r.name];
  const gaps = [...r.failed.map((f) => `failed ${f}`), ...r.notRun.map((n) => `not run ${n}`)];
  const lists = [r.marks, ...(r.forms ?? []).map((entry) => entry.marks)].filter((m) => m && m.ran !== false);
  const partial = lists.some((m) => (m.containing.searchedAll === false && !m.containingInClasses?.searchedAll) || [m.near, m.soundNear, m.leading, m.builtOn].some((list) => list && !list.notSearched && !list.note && list.searchedAll === false));
  lines.push(gaps.length ? `  INCOMPLETE: ${gaps.join(", ")}. A lookup with no answer is not a clear result.` : `  Every section answered, looked up ${day(r.lookedUp)}.${partial ? " A list of marks below is PARTIAL." : ""}${r.marks?.near && r.marks.near.deadSearchedAll === undefined ? " The marks are from an older version that left dead marks out, so run the lookup again." : ""}`);
  lines.push(`  Respellings by rule, looked up as forms: ${r.ruleForms?.length ? r.ruleForms.join(", ") : "none"}`);

  if (r.domains) {
    lines.push("  Domains");
    for (const d of r.domains.records) {
      const serves = d.serves ? ` | serves ${d.serves.error ? `nothing (${d.serves.error})` : `${d.serves.httpStatus} "${clip(d.serves.title ?? "no title", 60)}" at ${d.serves.finalUrl}`}${d.serves.parkingSigns?.length ? ` | parking signs: ${d.serves.parkingSigns.join(", ")}` : ""}` : "";
      const facts = d.status === "registered" ? ` since ${day(d.created) ?? "an unknown date"} through ${d.registrar ?? "an unlisted registrar"}` : "";
      lines.push(`    ${d.domain} | ${d.status}${facts} | ${d.source ?? "no source"}${serves}${d.error ? ` | ${d.error}` : ""}${d.note ? ` | ${d.note}` : ""}`);
    }
    for (const group of r.domains.registeredTogether ?? []) lines.push(`    Registered within a minute of each other: ${group.join(", ")}`);
  }
  if (r.history) {
    lines.push("  History, Internet Archive");
    for (const h of r.history.records) {
      if (h.error) lines.push(`    ${h.domain} | not run: ${h.error}`);
      else if (!h.monthsCaptured) lines.push(`    ${h.domain} | no captures`);
      else {
        lines.push(`    ${h.domain} | captured in ${h.monthsCaptured} ${h.monthsCaptured === 1 ? "month" : "months"}, ${h.first} to ${h.last} | earlier owner: ${h.earlierOwner === null ? "cannot tell" : h.earlierOwner ? "yes" : "no"} | open these:`);
        for (const o of h.open) lines.push(`      ${o.url}${o.status === "200" ? "" : ` (answered ${o.status})`}`);
      }
    }
  }
  if (r.marks) {
    lines.push(`  Marks, USPTO word marks. ${classes.length ? `The first two lists cover every class. The four after them cover only class ${classes.join(", ")}` : "Every list covers every class"}`);
    marksLines(lines, r.marks, opts, classes);
  }
  if (r.stores) {
    lines.push("  Stores");
    storeLines(lines, r.stores);
  }
  if (r.code) {
    lines.push("  Code");
    if (r.code.ran === false) lines.push(`    not run: ${r.code.error}`);
    for (const registry of ["npm", "pypi", "crates"]) {
      const p = r.code[registry];
      if (p && !p.error) lines.push(`    ${registry} | ${p.exists ? `taken, latest ${p.latest}, ${p.published ?? p.updated ?? "no date"}, ${clip(p.description ?? "no description", 70)}${p.downloadsLastMonth != null ? `, ${p.downloadsLastMonth} downloads last month` : ""}${p.downloads != null ? `, ${p.downloads} downloads` : ""}` : "no package of this name"}`);
    }
    const repos = r.code.githubRepositories;
    if (repos && !repos.error) {
      lines.push(`    GitHub repositories | ${repos.exactName} with this very name among the top results, ${repos.total} matching loosely`);
      for (const repo of repos.repositories.slice(0, opts.top)) lines.push(`      ${repo.name} | ${repo.stars} stars | created ${repo.created} | pushed ${repo.pushed}${repo.archived ? " | archived" : ""} | ${clip(repo.description ?? "no description", 70)} | ${repo.url}`);
    }
    if (r.code.githubAccount && !r.code.githubAccount.error) lines.push(`    GitHub account | ${r.code.githubAccount.taken ? `taken, ${r.code.githubAccount.url}` : "free"}`);
  }
  for (const entry of r.forms ?? []) {
    lines.push(`  Form "${entry.form}"`);
    marksLines(lines, entry.marks, opts, classes, { formOf: entry.form });
    storeLines(lines, entry.stores);
  }
  lines.push("  Yours to run");
  for (const y of r.yours ?? []) lines.push(`    ${y.step} | ${y.query ?? y.url}${y.when ? ` | ${y.when}` : ""}`);
  return lines.join("\n");
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
      if (opts.read) {
        results[index] = rows.get(keyOf(spec.name)) ?? { name: spec.name, notInFile: true, failed: [], notRun: [...DEFAULT_SECTIONS] };
        continue;
      }
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
  if (opts.out && !opts.read) save();
  if (opts.json) {
    process.stdout.write(results.map((r) => JSON.stringify(r)).join("\n") + "\n");
  } else {
    const kept = opts.out ? `Full records: ${opts.out}, one JSON line per name.${opts.read ? "" : " Add --read to print from it without looking anything up."} --top <n> shows more of a list.` : "Full records were not kept. Add --out <path> to keep them, or --json to print them.";
    const out = [`Records, not verdicts. Open a mark at https://tsdr.uspto.gov/statusview/sn<serial>. ${kept}`, ""];
    if (opts.out && !opts.read && results.length > 5) {
      for (const r of results) out.push(`${r.name} | ${r.failed.length || r.notRun.length ? `INCOMPLETE: ${[...r.failed.map((f) => `failed ${f}`), ...r.notRun.map((n) => `not run ${n}`)].join(", ")}` : "complete"}`);
      out.push("", `${results.length} names this run, ${reused} already complete, ${rows.size} in the file. Print a name's summary with: <name> --out ${opts.out} --read`);
    } else {
      out.push(results.map((r) => summarize(r, opts)).join("\n\n"));
    }
    process.stdout.write(out.join("\n") + "\n");
  }
  if (incomplete.length) {
    process.stderr.write(`Incomplete: ${incomplete.map((r) => `${r.name} (${[...r.failed.map((f) => `failed ${f}`), ...r.notRun.map((n) => `not run ${n}`)].join(", ")})`).join(", ")}\n`);
    process.exit(2);
  }
}

main();
