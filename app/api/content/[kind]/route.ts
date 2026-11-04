import { NextResponse } from 'next/server'
import { isAuthed } from '@/lib/passwords'
import { getDb, isKind, clean } from '@/lib/content'

export const dynamic = 'force-dynamic'
type Ctx = { params: Promise<{ kind: string }> }
const no = (m: string, s = 400) => NextResponse.json({ error: m }, { status: s })

// History of one item: /api/content/projects?id=3
export async function GET(req: Request, { params }: Ctx) {
  const { kind } = await params
  if (!(await isAuthed())) return no('Unauthorized', 401)
  if (!isKind(kind)) return no('Bad type')
  const id = Number(new URL(req.url).searchParams.get('id'))
  const db = await getDb()
  const versions = await db.collection('versions')
    .find({ kind, itemId: id }, { projection: { _id: 0 } })
    .sort({ savedAt: -1 }).limit(20).toArray()
  return NextResponse.json(versions)
}

// Save (add or edit). Every save also stores a version.
export async function POST(req: Request, { params }: Ctx) {
  const { kind } = await params
  if (!(await isAuthed())) return no('Unauthorized', 401)
  if (!isKind(kind)) return no('Bad type')
  const { item } = await req.json()
  const { data, error } = clean(kind, item)
  if (error || !data) return no(error ?? 'Invalid')

  const db = await getDb()
  const col = db.collection(kind)
  let id = Number(item.id)
  if (!id) id = Math.max(1000, (await col.find().sort({ id: -1 }).limit(1).next())?.id ?? 0) + 1

  await col.updateOne({ id }, { $set: { id, ...data } }, { upsert: true })
  const versions = db.collection('versions')
  await versions.insertOne({ kind, itemId: id, data: { id, ...data }, savedAt: new Date() })

  // keep only the newest 20 versions per item
  const old = await versions.find({ kind, itemId: id }).sort({ savedAt: -1 }).skip(20).toArray()
  if (old.length) await versions.deleteMany({ _id: { $in: old.map((o) => o._id) } })
    
  return NextResponse.json({ ok: true, id })
}

// Remove from the database (item and its history)
export async function DELETE(req: Request, { params }: Ctx) {
  const { kind } = await params
  if (!(await isAuthed())) return no('Unauthorized', 401)
  if (!isKind(kind)) return no('Bad type')
  const id = Number(new URL(req.url).searchParams.get('id'))
  const db = await getDb()
  await db.collection(kind).deleteOne({ id })
  await db.collection('versions').deleteMany({ kind, itemId: id })
  return NextResponse.json({ ok: true })
}