import { getClient } from '@/lib/mongo'

export const getDb = async () => (await getClient()).db('qsdt')

export type Kind = 'projects' | 'team'

export const FIELDS: Record<Kind, string[]> = {
  projects: ['title', 'short_description', 'description', 'status', 'year', 'images', 'image_url'],
  team: ['name', 'role', 'major', 'image_url', 'email', 'bio'],
}
const STATUS: Record<string, string> = {
  completed: 'Completed', in_progress: 'In Progress', planned: 'Planned',
}
export const MAX_TEXT = 5000

export const isKind = (k: string): k is Kind => k in FIELDS

// Only allowed fields are kept; size limits and "no embedded files" are enforced here
export function clean(kind: Kind, input: any): { data?: Record<string, any>; error?: string } {
  const out: Record<string, any> = {}
  for (const f of FIELDS[kind]) {
    const v = input?.[f]
    if (v === undefined) continue
    if (f === 'images') {
      if (!Array.isArray(v) || v.length > 20) return { error: 'Max 20 image links' }
      out[f] = v.map(String)
    } else out[f] = String(v)
  }
  for (const v of Object.values(out).flat() as string[]) {
    if (v.length > MAX_TEXT) return { error: `Text too long (max ${MAX_TEXT} characters)` }
    if (v.startsWith('data:')) return { error: 'Files can\'t be embedded. Use an image link.' }
  }
  return { data: out }
}

export async function listItems(kind: Kind) {
  const db = await getDb()
  const docs = await db.collection(kind).find({}, { projection: { _id: 0 } }).sort({ id: 1 }).toArray()
  return kind === 'projects'
    ? docs.map((d: any) => ({ ...d, status_display: STATUS[d.status] ?? d.status }))
    : docs
}