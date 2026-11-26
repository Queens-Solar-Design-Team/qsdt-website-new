import type { MetadataRoute } from 'next'
import { listProjectsWithDefaults } from '@/lib/content'
import { PAGES, SITE_URL } from '@/lib/site'

// Served at /sitemap.xml. Lists every public page plus one page per project
// (built-in and admin-created). Rebuilt at most once an hour so new projects show up.
export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Outside Vercel (e.g. the standalone Docker/VPS build) nothing sets the URL, so the
  // sitemap, robots.txt and link previews would point at localhost. Say so in the build log.
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL && SITE_URL.includes('localhost')) {
    console.warn(`NEXT_PUBLIC_SITE_URL is not set: the sitemap, robots.txt and link previews will use ${SITE_URL}`)
  }

  const pages: MetadataRoute.Sitemap = PAGES.map((p) => ({
    url: `${SITE_URL}${p.href === '/' ? '' : p.href}`,
    changeFrequency: p.href === '/' ? 'weekly' : 'monthly',
    priority: p.href === '/' ? 1 : 0.7,
  }))

  const projects: MetadataRoute.Sitemap = (await listProjectsWithDefaults()).map((p) => ({
    url: `${SITE_URL}/projects/${p.id}`,
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  return [...pages, ...projects]
}
