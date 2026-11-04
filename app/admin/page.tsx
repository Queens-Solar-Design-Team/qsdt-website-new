'use client'

import { useEffect, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import ContentEditor, { StorageMeter } from '@/components/ContentEditor'

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const [stamp, setStamp] = useState(0)
  const [saved, setSaved] = useState('')
  const [tab, setTab] = useState<'projects' | 'team'>('projects')

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
      <main className="min-h-screen py-12 space-y-8">
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
              <div className="space-y-4">

                <StorageMeter refresh={stamp} />

                <div className="flex gap-2">
                  <button className="bg-solar-green text-white rounded-lg px-4 py-1" onClick={() => setTab('projects')}>Projects</button>
                  <button className="bg-solar-green text-white rounded-lg px-4 py-1" onClick={() => setTab('team')}>Team</button>
                </div>

                <ContentEditor kind={tab} onChange={() => setStamp((n) => n + 1)} />
                  
              </div>
              
            )}

        {msg && <p className="text-center text-sm text-red-600">{msg}</p>}
      </main>
      <Footer />
    </>
  )
}