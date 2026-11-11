'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/qsec', label: 'QSEC' },
  { href: '/team', label: 'Team' },
  { href: '/projects', label: 'Projects' },
  { href: '/education', label: 'Education' },
]

export default function Navbar() {

  const [open, setOpen] = useState(false)

  return (
    <nav className="relative backdrop-blur-md bg-gradient-to-r from-solar-green/90 to-earth-green/90 border-b border-solar-dark-green/30 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="flex items-center gap-2 min-w-0" onClick={() => setOpen(false)}>
            <Image 
              src="/images/qsdt-logo.png" 
              alt="QSDT Logo" 
              width={90} 
              height={90}
              className="object-contain w-14 h-14 md:w-[90px] md:h-[90px] shrink-0"
            />
            <span className="text-base md:text-xl font-bold text-white drop-shadow-lg truncate">
              Queen's Solar Design Team
            </span>
          </Link>
          
          
          {/* Desktop links */}
          <div className="hidden lg:flex items-center space-x-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-white hover:text-solar-yellow transition font-medium drop-shadow-md">
                {l.label}
              </Link>
            ))}
            
            
            <Link href="/dashboard" className="bg-solar-yellow hover:bg-solar-orange px-4 py-2 rounded transition text-solar-dark-green shadow-lg font-semibold">
              Dashboard
            </Link>
          </div>

          {/* Hamburger button */}
          <button
            className="lg:hidden text-white p-2 shrink-0"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
         </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden flex flex-col gap-3 pb-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-white hover:text-solar-yellow transition font-medium"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="bg-solar-yellow hover:bg-solar-orange px-4 py-2 rounded text-center text-solar-dark-green font-semibold shadow-lg"
            >
              Dashboard
            </Link>
          </div>
        )}
       </div>
     </nav>
   )
 }

