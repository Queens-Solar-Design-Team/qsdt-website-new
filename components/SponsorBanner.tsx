'use client'

import Image from 'next/image'

interface Sponsor {
  name: string
  logo: string
  url?: string
}

interface SponsorBannerProps {
  readonly sponsors?: readonly Sponsor[]
}

// Default sponsors - can be replaced with actual sponsor data
// To add a new sponsor:
// 1. Add the logo image to apps/web/public/images/
// 2. Add an entry below with: { name: 'Sponsor Name', logo: '/images/logo-filename.png', url: 'https://sponsor-website.com' }
function isSafeUrl(url: string): boolean {
  try {
    const parsed = new URL(url)
    return parsed.protocol === 'https:' || parsed.protocol === 'http:'
  } catch {
    return false
  }
}

const defaultSponsors: Sponsor[] = [
  { name: "Queen's University", logo: '/images/queens-logo.png' },
  { name: 'Smith Engineering', logo: '/images/smith_engineering_logo.png' },
  { name: 'QSBRI', logo: '/images/3652323_3174x1269_500.png' },
  // Add more sponsors here:
  // { name: 'Sponsor Name', logo: '/images/sponsor-logo.png', url: 'https://sponsor-website.com' },
]

export default function SponsorBanner({ sponsors = defaultSponsors }: SponsorBannerProps) {
  // Duplicate sponsors for seamless infinite scroll
  const duplicatedSponsors = [...sponsors, ...sponsors]

  return (
    <div className="bg-gradient-to-b from-green-50 to-white py-8 overflow-hidden border-t border-solar-light-green">
      <div className="container mx-auto px-4">
        <h3 className="text-center text-600 font-semibold mb-6 text-lg">
          Our Sponsors
        </h3>
        <div className="relative overflow-hidden">
          <div className="sponsor-scroll-container">
            <div className="flex sponsor-scroll-content">
              {duplicatedSponsors.map((sponsor, index) => (
                <div
                  key={`${sponsor.name}-${index}`}
                  className="flex-shrink-0 mx-8 flex items-center justify-center"
                  style={{ width: '200px' }}
                >
                  {sponsor.url && isSafeUrl(sponsor.url) ? (
                    <a
                      href={sponsor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name}
                        width={200}
                        height={100}
                        className="object-contain max-h-20 w-auto transition-all"
                      />
                    </a>
                  ) : (
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      width={200}
                      height={100}
                      className="object-contain max-h-20 w-auto transition-all"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
