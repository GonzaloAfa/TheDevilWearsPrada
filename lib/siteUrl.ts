import { headers } from 'next/headers';

const FALLBACK_URL = 'http://localhost:3000';
const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '0.0.0.0']);

function trimTrailingSlash(value: string) {
  return value.replace(/\/$/, '');
}

function getHeaderBaseUrl() {
  const headerStore = headers();
  const forwardedHost = headerStore.get('x-forwarded-host');
  const host = forwardedHost || headerStore.get('host');

  if (!host) {
    return null;
  }

  const forwardedProto = headerStore.get('x-forwarded-proto');
  const hostName = host.split(':')[0];
  const protocol = forwardedProto || (LOCAL_HOSTS.has(hostName) ? 'http' : 'https');

  return trimTrailingSlash(`${protocol}://${host}`);
}

export function getConfiguredSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return configuredUrl ? trimTrailingSlash(configuredUrl) : null;
}

export function getRequestSiteUrl() {
  return getHeaderBaseUrl() || getConfiguredSiteUrl() || FALLBACK_URL;
}
