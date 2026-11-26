// Site-wide facts used by the sitemap, robots.txt, page metadata and the JSON-LD
// structured data in app/layout.tsx. Change them here, not in each file.

// The public address of the site, with no trailing slash.
// Order: NEXT_PUBLIC_SITE_URL (set this once the team has its own domain), then the
// production domain Vercel sets automatically, then localhost for development.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  'http://localhost:3000'
).replace(/\/+$/, '')

// The team's name as search engines, link previews and robots.txt show it
export const SITE_NAME = "Queen's Solar Design Team"
export const SHORT_NAME = 'QSDT'
export const LEGAL_NAME = "Queen's Solar Design Team"
export const SITE_DESCRIPTION =
  "The Queen's Solar Design Team (QSDT) is a student design team at Queen's University in Kingston, Ontario, building solar-powered systems since 1988 and running the Queen's Solar Education Centre (QSEC)."

export const CONTACT_EMAIL = 'director.qsdt@engsoc.queensu.ca'

export const SOCIALS = [
  { href: 'https://www.instagram.com/queenssolardesignteam/', label: 'Instagram' },
  { href: "https://www.linkedin.com/company/queen's-solar-design-team/", label: 'LinkedIn' },
]

// Public pages, in footer order. The sitemap lists these plus one page per project.
export const PAGES = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/qsec', label: 'QSEC' },
  { href: '/team', label: 'Team' },
  { href: '/projects', label: 'Projects' },
  { href: '/education', label: 'Education' },
  { href: '/dashboard', label: 'Dashboard' },
]
