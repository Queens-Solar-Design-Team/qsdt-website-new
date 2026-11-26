import type { Metadata } from 'next'

// The admin editor must never show up in search results. proxy.ts also sends an
// X-Robots-Tag header, and the editor is deliberately left out of robots.txt and
// the sitemap (robots.txt is public, so listing it would give its address away).
export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false },
  // No link preview: a shared admin link shouldn't look like an official QSDT page.
  // null removes the logo card and preview text inherited from app/layout.tsx.
  openGraph: null,
  twitter: null,
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
