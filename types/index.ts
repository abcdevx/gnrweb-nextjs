export type Show = {
  id: string
  venue_name: string | null
  event_date: string | null
  event_time: string | null
  event_end_time: string | null
  status: 'confirmed' | 'completed'
  notes: string | null
}

export type BandMember = {
  id: string
  name: string
  avatar_url: string | null
  sort_order: number
  roles: string[]
}
