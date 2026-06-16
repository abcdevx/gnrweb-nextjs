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
  if (!isConfigured()) return []
  const res = await fetch(`${BASE_URL}/api/public/shows`, {
    headers: getHeaders(),
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error(`Failed to fetch shows: ${res.status}`)
  const data = await res.json() as { shows: Show[] }
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
