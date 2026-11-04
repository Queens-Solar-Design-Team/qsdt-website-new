'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'



export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')

  const [banner, setBanner] = useState('')
  const [saved, setSaved] = useState('')

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

  async function saveBanner() {
    const r = await fetch('/api/banner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: banner }),
    })
    setSaved(r.ok ? 'Saved!' : 'Failed')
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 container mx-auto px-4 max-w-md space-y-4">
        <h1 className="text-3xl font-bold text-solar-green text-center">Admin</h1>

        {!authed ? (
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              login()
            }}
          >
            <input
              type="password"
              placeholder="Password"
              className="border-2 border-solar-light-green rounded-lg p-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="bg-solar-green text-white rounded-lg px-4 py-2">
              Log in
            </button>
          </form>
            ) : (
              <div className="space-y-3">
                 
                <h2 className="font-bold text-solar-dark-green">Announcement banner</h2>
                
                <input
                  className="border-2 border-solar-light-green rounded-lg p-2 w-full"
                  placeholder="Banner message (leave empty to hide)"
                  value={banner}
                  onChange={(e) => setBanner(e.target.value)}
                />

                <button className="bg-solar-green text-white rounded-lg px-4 py-2" onClick={saveBanner}>
                  Save banner
                </button>

                {saved && <p className="text-sm">{saved}</p>}

              </div>
            )}

        {msg && <p className="text-center text-sm text-red-600">{msg}</p>}
      </main>
      <Footer />
    </>
  )
}