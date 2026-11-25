import './globals.css'
import type { Metadata } from 'next'
import { Inter, Jost, Fraunces } from 'next/font/google'

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
  title: 'Queen\'s University Solar Design Team',
  description: 'Promoting solar energy education and innovation at Queen\'s University',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${jost.variable} ${fraunces.variable}`}>
        {children}
      </body>
    </html>
  )
}
