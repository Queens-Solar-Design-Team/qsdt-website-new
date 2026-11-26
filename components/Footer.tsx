import Image from 'next/image'
import Link from 'next/link'
import SponsorBanner from '@/components/SponsorBanner'
import { CONTACT_EMAIL, PAGES, SOCIALS } from '@/lib/site'

// The page links and social links come from lib/site.ts (shared with the sitemap
// and structured data). Edit them there; see "Updating content" in README.md.
function ArrowUpRight() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5}>
      <path d="M5 11L11 5M6 5h5v5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function Footer() {
  return (
    <>
      <SponsorBanner />
      <footer className="bg-ink text-white">
        <div className="mx-auto max-w-6xl px-6">
          {/* Top row: identity left, socials right */}
          <div className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-4">
              <Image
                src="/images/qsdt-logo.png"
                alt=""
                width={56}
                height={56}
                className="h-12 w-12 shrink-0 object-contain md:h-14 md:w-14"
              />
              <div>
                <p className="font-heading text-lg font-light uppercase tracking-[0.1em]">
                  Queen&rsquo;s Solar Design Team
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                  Queen&rsquo;s University, Kingston, Ontario
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex min-h-10 items-center break-all text-sm text-white/80 transition-colors hover:text-gold"
                >
                  {CONTACT_EMAIL}
                </a>
              </div>
            </div>

            <ul className="flex flex-wrap gap-x-7 gap-y-1">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex min-h-10 items-center gap-1.5 text-sm text-white/80 transition-colors hover:text-gold"
                  >
                    {s.label}
                    <span className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                      <ArrowUpRight />
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom row: legal left, page links right */}
          <div className="flex flex-col-reverse gap-6 border-t border-white/10 py-6 text-xs md:flex-row md:items-start md:justify-between">
            <p className="text-white/45">
              &copy; {new Date().getFullYear()} Queen&rsquo;s University Solar Design Team
            </p>
            <nav aria-label="Footer">
              <ul className="flex flex-wrap gap-x-6 gap-y-1 md:justify-end">
                {PAGES.map((p) => (
                  <li key={p.href}>
                    <Link
                      href={p.href}
                      className="inline-flex min-h-10 items-center text-white/70 transition-colors hover:text-gold md:min-h-0"
                    >
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}
