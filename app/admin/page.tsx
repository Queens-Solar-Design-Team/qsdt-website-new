'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  useEffect(() => {
    fetch('/api/login').then((r) => r.json()).then((d) => setAuthed(d.authed))
  }, [])

  async function login() {
    const r = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (r.ok) setAuthed(true)
    else setMsg('Wrong password')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 container mx-auto px-4 max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-solar-green text-center">Admin</h1>

        {!authed ? (
          <>
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-solar-light-green rounded-lg p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-solar-green text-white rounded-lg px-4 py-2" onClick={login}>
              Log in
            </button>
          </>
        ) : (
          <p className="text-center">You're logged in. Editing tools will go here.</p>
        )}

        {msg && <p className="text-center text-sm text-red-600">{msg}</p>}
      </main>
      <Footer />
    </>
  )
}