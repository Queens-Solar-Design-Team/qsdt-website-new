import { SITE_NAME, SHORT_NAME, SITE_URL } from '@/lib/site'

// Serves /robots.txt. Written by hand (not app/robots.ts) so it can start with a
// comment saying whose site this is; Next's robots.ts can't output comments.
//
// The admin editor is deliberately NOT listed here: robots.txt is public, so naming its
// address would advertise it. The admin page sends its own "noindex" instead (proxy.ts).
export const dynamic = 'force-static'

export function GET() {
  const header = [
    `# robots.txt for ${SITE_NAME} (${SHORT_NAME})`,
    "# Queen's University, Kingston, Ontario",
    `# ${SITE_URL}`,
    '',
  ]

  // Vercel preview deployments (every branch) should never be indexed, only production.
  const isPreview = Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production')

  const rules = isPreview
    ? ['# Preview deployment: not for search engines', 'User-agent: *', 'Disallow: /']
    : [
        'User-agent: *',
        'Allow: /',
        // Team, Projects and Dashboard fill themselves in from these public APIs in the
        // browser. Google fetches them while rendering, so they must stay crawlable or
        // those pages get indexed empty. (The more specific Allow wins over Disallow.)
        'Allow: /api/team',
        'Allow: /api/projects',
        'Allow: /api/solar',
        'Disallow: /api/',
        '',
        `Sitemap: ${SITE_URL}/sitemap.xml`,
      ]

  return new Response([...header, ...rules, ''].join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
