import { NextResponse } from 'next/server'
import { isAuthed } from '@/lib/passwords'
import { getDb } from '@/lib/content'

export const dynamic = 'force-dynamic'

// free tier (M0 for mongo database on Atlas) has a 512MB limit
const LIMIT = 512 * 1024 * 1024


export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const s = await (await getDb()).command({ dbStats: 1 })
  const used = s.dataSize + s.indexSize
  return NextResponse.json({
    usedMB: Number((used / 1024 / 1024).toFixed(2)),
    limitMB: 512,
    pct: Number(((used / LIMIT) * 100).toFixed(1)),
  })
}   