import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PAGES } from '@/lib/site'

// Hides the admin editor behind a private address.
//
// The editor's code lives in app/admin/, but nobody can open it at /admin. It is only
// served at /<ADMIN_PATH>, where ADMIN_PATH is an environment variable (set in
// .env.local and in Vercel → Settings → Environment Variables). The repo never
// contains the real address, so reading the code doesn't reveal it.
//
//   ADMIN_PATH set     → /<ADMIN_PATH> shows the editor; /admin is a 404
//   ADMIN_PATH not set → /admin works in `npm run dev` only; a 404 everywhere else
//
// This is only a speed bump. The real protection is still the ADMIN_PASSWORD login,
// which every admin API route checks.

// Addresses ADMIN_PATH must not take over: every public page (from lib/site.ts), Next's
// own folders, and the generated SEO files
const RESERVED = new Set([
  ...PAGES.map((p) => p.href.split('/')[1]).filter(Boolean),
  'admin', 'api', '_next', 'images', 'favicon.ico', 'opengraph-image', 'twitter-image',
  'sitemap', 'robots', '404-not-found',
])

let warned = false
function adminPath(): string | null {
  const raw = process.env.ADMIN_PATH
  if (!raw) return null
  const p = raw.trim().replace(/^\/+|\/+$/g, '')
  if (/^[A-Za-z0-9_-]{8,}$/.test(p) && !RESERVED.has(p.toLowerCase())) return p
  if (!warned) {
    warned = true
    console.warn(
      'ADMIN_PATH is set but ignored: use 8+ letters, digits, "-" or "_", and not a page name. The admin editor is unreachable.',
    )
  }
  return null
}

// "/admin", "/admin/", "/admin.rsc" etc., but not "/administrator". Case-insensitive.
const startsWithSegment = (pathname: string, segment: string) => {
  const path = pathname.toLowerCase()
  const seg = segment.toLowerCase()
  return path === `/${seg}` || path.startsWith(`/${seg}/`) || path.startsWith(`/${seg}.`)
}

// Decode %-escapes and collapse "//" so "/%61dmin" or "//admin" can't slip past the check
function normalize(pathname: string) {
  let p = pathname
  try {
    p = decodeURIComponent(p)
  } catch {
    // malformed escape: keep the raw path
  }
  return p.replace(/\/{2,}/g, '/')
}

function noindex(res: NextResponse) {
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const path = normalize(pathname)
  const secret = adminPath()

  if (secret && startsWithSegment(path, secret)) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin' + path.slice(secret.length + 1)
    return noindex(NextResponse.rewrite(url))
  }

  if (startsWithSegment(path, 'admin')) {
    if (!secret && process.env.NODE_ENV === 'development') return noindex(NextResponse.next())
    // Any path with no page behind it renders the normal 404
    const url = request.nextUrl.clone()
    url.pathname = '/404-not-found'
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  // Skip API routes, build assets, images and the SEO files; run on every page
  matcher: ['/((?!api/|_next/static|_next/image|images/|favicon.ico|robots.txt|sitemap.xml).*)'],
}
