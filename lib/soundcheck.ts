/**
 * soundcheck.ts — Server-only API client for SoundCheck.
 *
 * All functions in this file run server-side only (Server Components or Route
 * Handlers). The API key is never sent to the browser.
 *
 * Environment variables required (set in .env.local):
 *   SOUNDCHECK_API_URL   — Base URL of the SoundCheck app (e.g. https://app.soundcheck.com)
 *   SOUNDCHECK_API_KEY   — API key generated in SoundCheck for this band
 */

import type { Show, BandMember } from '@/types'

const BASE_URL = process.env.SOUNDCHECK_API_URL?.replace(/\/$/, '')
const API_KEY = process.env.SOUNDCHECK_API_KEY

function getHeaders(): Record<string, string> {
  return {
    'x-api-key': API_KEY ?? '',
    'Content-Type': 'application/json',
  }
}

function isConfigured(): boolean {
  return Boolean(BASE_URL && API_KEY)
}

export async function getShows(): Promise<Show[]> {
  console.log('[soundcheck] BASE_URL:', BASE_URL, 'API_KEY set:', Boolean(API_KEY))
  if (!isConfigured()) {
    console.log('[soundcheck] Not configured, returning empty shows')
    return []
  }
  const url = `${BASE_URL}/api/public/shows`
  console.log('[soundcheck] Fetching shows from:', url)
  const res = await fetch(url, {
    headers: getHeaders(),
    cache: 'no-store',
  })
  console.log('[soundcheck] Shows response status:', res.status)
  if (!res.ok) {
    const text = await res.text()
    console.log('[soundcheck] Shows error body:', text)
    throw new Error(`Failed to fetch shows: ${res.status}`)
  }
  const data = await res.json() as { shows: Show[] }
  console.log('[soundcheck] Shows count:', data.shows?.length)
  return data.shows ?? []
}

export async function getMembers(): Promise<BandMember[]> {
  if (!isConfigured()) return []
  const res = await fetch(`${BASE_URL}/api/public/members`, {
    headers: getHeaders(),
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Failed to fetch members: ${res.status}`)
  const data = await res.json() as { members: BandMember[] }
  return data.members ?? []
}
