import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
export const INDEXNOW_HOST = 'www.mengche.dev';
export const INDEXNOW_KEY = '40b1ed70e9ebcb96b25e2e4a261af813';
export const INDEXNOW_KEY_LOCATION = `https://${INDEXNOW_HOST}/${INDEXNOW_KEY}.txt`;

const ACCEPTED_STATUSES = new Set([200, 202]);
const RETRYABLE_STATUSES = new Set([403, 422, 429]);
const RETRY_DELAYS_MS = [1000, 2000];

function decodeXml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

export function parseSitemapLocations(xml, expectedHost = INDEXNOW_HOST) {
  const urls = [];
  for (const match of xml.matchAll(/<loc\b[^>]*>([\s\S]*?)<\/loc>/gi)) {
    const value = decodeXml(match[1].trim());
    try {
      const url = new URL(value);
      if (url.protocol === 'https:' && url.host === expectedHost) urls.push(url.toString());
    } catch {
      // Ignore invalid loc entries; the canonical sitemap generator remains authoritative.
    }
  }
  return urls;
}

export function mergeSitemapLocations(oldXml, newXml, expectedHost = INDEXNOW_HOST) {
  return [
    ...new Set([
      ...parseSitemapLocations(oldXml, expectedHost),
      ...parseSitemapLocations(newXml, expectedHost)
    ])
  ];
}

const isRetryable = (status) => RETRYABLE_STATUSES.has(status) || status >= 500;
const defaultSleep = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

export async function submitIndexNow(urlList, options = {}) {
  const fetchImpl = options.fetchImpl ?? fetch;
  const sleep = options.sleep ?? defaultSleep;
  const endpoint = options.endpoint ?? INDEXNOW_ENDPOINT;
  const payload = {
    host: INDEXNOW_HOST,
    key: INDEXNOW_KEY,
    keyLocation: INDEXNOW_KEY_LOCATION,
    urlList: [...new Set(urlList)]
  };

  if (payload.urlList.length === 0) throw new Error('No canonical sitemap URLs to submit');
  if (payload.urlList.length > 10_000) throw new Error('IndexNow batch exceeds 10,000 URLs');

  for (let attempt = 0; attempt < 3; attempt += 1) {
    const response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });

    if (ACCEPTED_STATUSES.has(response.status))
      return { status: response.status, count: payload.urlList.length };
    if (!isRetryable(response.status) || attempt === 2) {
      throw new Error(`IndexNow submission failed with HTTP ${response.status}`);
    }
    await sleep(RETRY_DELAYS_MS[attempt]);
  }

  throw new Error('IndexNow submission exhausted its retry limit');
}

function argumentValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

async function readOptional(filePath) {
  if (!filePath) return '';
  try {
    return await readFile(filePath, 'utf8');
  } catch (error) {
    if (error?.code === 'ENOENT') return '';
    throw error;
  }
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  const oldXml = await readOptional(argumentValue('--old'));
  const newPath = argumentValue('--new');
  if (!newPath) throw new Error('Usage: submit-indexnow.mjs --old <previous.xml> --new <current.xml>');
  const newXml = await readFile(newPath, 'utf8');
  const urls = mergeSitemapLocations(oldXml, newXml);
  const result = await submitIndexNow(urls);
  console.log(`IndexNow accepted ${result.count} URLs with HTTP ${result.status}.`);
}
