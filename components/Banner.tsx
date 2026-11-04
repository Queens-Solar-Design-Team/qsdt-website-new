'use client'

import { useEffect, useState } from 'react'

export default function Banner() {
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/banner').then((r) => r.json()).then((d) => setMessage(d.message))
  }, [])

  if (!message) return null

  return (
    <div className="bg-solar-yellow text-center py-2 text-sm font-semibold">
      {message}
    </div>
  )
}