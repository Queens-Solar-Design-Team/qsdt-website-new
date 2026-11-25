'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/qsec', label: 'QSEC' },
  { href: '/team', label: 'Team' },
  { href: '/projects', label: 'Projects' },
  { href: '/education', label: 'Education' },
  { href: '/dashboard', label: 'Dashboard' },
]

/**
 * overlay: transparent, white text, sits on top of a full-bleed hero photo (home page).
 * default: solid black (ink) bar with white text (every other page).
 */
export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href))

  const linkBase =
    'font-display text-[13px] uppercase tracking-[0.18em] transition-colors duration-200'
  const linkColour = (href: string) =>
    isActive(href)
      ? 'text-gold'
      : 'text-white/85 hover:text-gold'

  return (
    <nav
      className={
        overlay
          ? `absolute inset-x-0 top-0 z-30 transition-colors ${
              open ? 'bg-ink' : 'bg-gradient-to-b from-black/50 to-transparent'
            }`
          : 'relative z-30 bg-ink'
      }
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
            <Image
              src="/images/qsdt-logo.png"
              alt="QSDT logo"
              width={48}
              height={48}
              className="h-11 w-11 shrink-0 object-contain"
              priority
            />
            <span
              className="font-display text-sm uppercase tracking-[0.22em] text-white"
            >
              <span className="sm:hidden">QSDT</span>
              <span className="hidden sm:inline">Queen&rsquo;s Solar Design Team</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`${linkBase} ${linkColour(l.href)}`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Hamburger button */}
          <button
            className="lg:hidden -mr-2 flex h-11 w-11 items-center justify-center text-white"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div
            className={`lg:hidden -mx-6 flex flex-col px-6 pb-4 ${
              'border-t border-white/10'
            }`}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? 'page' : undefined}
                className={`${linkBase} py-3 ${
                  isActive(l.href) ? 'text-gold' : 'text-white'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
