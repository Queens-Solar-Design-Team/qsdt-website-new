import { NextResponse } from 'next/server'
import { makeToken, isAuthed } from '@/lib/auth'

export async function GET() {
  return NextResponse.json({ authed: await isAuthed() })
}

export async function POST(req: Request) {
  const { password } = await req.json()
  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 })
  }
  const res = NextResponse.json({ ok: true })
  res.cookies.set('admin', makeToken(), {
    httpOnly: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 8,
    secure: process.env.NODE_ENV === 'production',
  })
  return res
}