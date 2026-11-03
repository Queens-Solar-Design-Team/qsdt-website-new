import { cookies } from 'next/headers'
import crypto from 'crypto'

export function makeToken() {
  return crypto.createHmac('sha256', process.env.AUTH_SECRET!)
    .update(process.env.ADMIN_PASSWORD!).digest('hex')
}

export async function isAuthed() {
  const store = await cookies()
  return store.get('admin')?.value === makeToken()
}   