import './globals.css'
import type { Metadata } from 'next'
import { Inter, Jost, Fraunces } from 'next/font/google'
import { CONTACT_EMAIL, LEGAL_NAME, SHORT_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIALS } from '@/lib/site'

const inter = Inter({ subsets: ['latin'] })
// Sans for nav, buttons and small labels (see docs/design-direction.md)
const jost = Jost({ subsets: ['latin'], weight: ['300', '400', '500'], variable: '--font-display' })
// Serif for the hero title, tagline (italic), section titles and big numbers
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  variable: '--font-heading',
})

export const metadata: Metadata = {
  // Lets Next turn relative URLs (sitemap, Open Graph) into full ones
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} (${SHORT_NAME})`,
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  // Link previews (LinkedIn, Instagram, Slack, iMessage...). The image is
  // app/opengraph-image.png: the QSDT logo on a white 1200x630 card.
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} (${SHORT_NAME})`,
    description: SITE_DESCRIPTION,
    locale: 'en_CA',
  },
  twitter: { card: 'summary_large_image', title: `${SITE_NAME} (${SHORT_NAME})`, description: SITE_DESCRIPTION },
}

// JSON-LD structured data: tells search engines who we are (name, logo, parent
// university, contact, socials). The values live in lib/site.ts.
// Check it with https://search.google.com/test/rich-results after a deploy.
const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      legalName: LEGAL_NAME,
      alternateName: [SHORT_NAME, LEGAL_NAME, "Queen's Solar Vehicle Team"],
      url: SITE_URL,
      logo: `${SITE_URL}/images/qsdt-logo.png`,
      description: SITE_DESCRIPTION,
      foundingDate: '1988',
      email: CONTACT_EMAIL,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kingston',
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
      parentOrganization: {
        '@type': 'CollegeOrUniversity',
        name: "Queen's University",
        url: 'https://www.queensu.ca',
      },
      sameAs: SOCIALS.map((s) => s.href),
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: SHORT_NAME,
      description: SITE_DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-CA',
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jost.variable} ${fraunces.variable}`}>
        <script
          type="application/ld+json"
          // Escape "<" so no value can close the script tag early
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        {children}
      </body>
    </html>
  )
}
