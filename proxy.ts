import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

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

// Addresses ADMIN_PATH must not take over (real pages and Next's own folders)
const RESERVED = new Set(['admin', 'api', '_next', 'images', 'about', 'qsec', 'team', 'projects', 'education', 'dashboard'])

function adminPath(): string | null {
  const p = (process.env.ADMIN_PATH ?? '').trim().replace(/^\/+|\/+$/g, '')
  if (!/^[A-Za-z0-9_-]{8,}$/.test(p) || RESERVED.has(p.toLowerCase())) return null
  return p
}

// "/admin", "/admin/", "/admin.rsc" etc., but not "/administrator"
const startsWithSegment = (pathname: string, segment: string) =>
  pathname === `/${segment}` || pathname.startsWith(`/${segment}/`) || pathname.startsWith(`/${segment}.`)

function noindex(res: NextResponse) {
  res.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return res
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const secret = adminPath()

  if (secret && startsWithSegment(pathname, secret)) {
    const url = request.nextUrl.clone()
    url.pathname = '/admin' + pathname.slice(secret.length + 1)
    return noindex(NextResponse.rewrite(url))
  }

  if (startsWithSegment(pathname, 'admin')) {
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
