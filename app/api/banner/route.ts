import { NextResponse } from 'next/server'
import { clientPromise } from '@/lib/mongo'
import { isAuthed } from '@/lib/passwords'

export const dynamic = 'force-dynamic'

export async function GET() {
  const db = (await clientPromise).db('qsdt')
  const doc = await db.collection('settings').findOne({ _id: 'banner' as any })
  return NextResponse.json({ message: doc?.message ?? '' })
}

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { message } = await req.json()
  const db = (await clientPromise).db('qsdt')
  await db.collection('settings').updateOne(
    { _id: 'banner' as any },
    { $set: { message } },
    { upsert: true }
  )
  return NextResponse.json({ ok: true })
}