'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useEffect, useState } from 'react'

interface TeamMember {
  id: number
  name: string
  role: string
  major: string
  image?: string
  image_url?: string
  bio?: string
  email?: string
}

const initialsOf = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)

function MemberPhoto({ member }: Readonly<{ member: TeamMember }>) {
  const src = (member.image_url || member.image || '').trim()
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <span className="font-heading text-4xl font-light text-ink/35">{initialsOf(member.name)}</span>
      </div>
    )
  }
  return (
    // Plain <img>: admins can enter photo links from any site, which next/image would need whitelisted.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={member.name}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className="h-full w-full object-cover object-[center_20%]"
    />
  )
}

// Under a project heading the project name is redundant, so
// "QSEC Winter Heating Project Manager" shows as "Project Manager".
const shortRole = (role: string) => (/project manager$/i.test(role.trim()) ? 'Project Manager' : role)

function TeamMemberCard({ member }: Readonly<{ member: TeamMember }>) {
  return (
    <li className="w-[calc(50%-0.5rem)] sm:w-[calc(33.333%-0.667rem)] lg:w-[calc(25%-0.75rem)] text-center">
      <div className="aspect-[4/5] overflow-hidden rounded-lg bg-stone">
        <MemberPhoto member={member} />
      </div>
      <h3 className="mt-4 font-heading text-base sm:text-lg leading-snug text-ink">{member.name}</h3>
      <p className="mt-1.5 font-display text-[10px] sm:text-[11px] uppercase leading-relaxed tracking-[0.16em] text-ink/60">
        {shortRole(member.role)}
      </p>
      {member.major && <p className="mt-1 text-xs sm:text-sm text-ink/50">{member.major}</p>}
    </li>
  )
}

// Display order of the groups. The first matching rule wins, so order matters
// (e.g. "advisor" is checked before "coordinator").
const GROUPS: { title: string; match: (role: string) => boolean }[] = [
  { title: 'Faculty Advisor', match: (r) => r.includes('faculty') || r.includes('advisor') },
  { title: 'Leadership', match: (r) => r.includes('captain') },
  { title: 'QSEC Research & Modeling', match: (r) => r.includes('qsec research') || r.includes('qsec model') },
  { title: 'QSEC Winter Heating', match: (r) => r.includes('qsec winter') },
  { title: 'Off-Grid Water System', match: (r) => r.includes('off-grid') || r.includes('off grid') },
  { title: 'Solar Thermal Heating', match: (r) => r.includes('solar thermal') },
  { title: 'Website', match: (r) => r.includes('website') },
  { title: 'Coordinators', match: (r) => r.includes('coordinator') },
]
// Shown in this order on the page (Faculty Advisor is matched first but shown last).
const DISPLAY_ORDER = [
  'Leadership',
  'QSEC Research & Modeling',
  'QSEC Winter Heating',
  'Off-Grid Water System',
  'Solar Thermal Heating',
  'Website',
  'Coordinators',
  'Other Roles',
  'Faculty Advisor',
]

function groupMembers(members: TeamMember[]) {
  const groups = new Map<string, TeamMember[]>(DISPLAY_ORDER.map((t) => [t, []]))
  for (const m of members) {
    const role = m.role.toLowerCase()
    const title = GROUPS.find((g) => g.match(role))?.title ?? 'Other Roles'
    groups.get(title)!.push(m)
  }
  return DISPLAY_ORDER.map((title) => ({ title, members: groups.get(title)! })).filter((g) => g.members.length > 0)
}

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
        const response = await fetch(`${apiUrl}/api/team`)
        if (!response.ok) {
          throw new Error('Failed to fetch team members')
        }
        const data = await response.json()
        setTeamMembers(data)
      } catch (err) {
        console.error('Error fetching team members:', err)
        setError('Failed to load team members. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white">
        <header className="mx-auto max-w-3xl px-6 pt-16 pb-10 text-center md:pt-24 md:pb-14">
          <h1 className="font-heading text-4xl font-light uppercase tracking-[0.1em] text-ink md:text-5xl">Our Team</h1>
          <p className="mt-5 text-base leading-relaxed text-ink/70 md:text-lg">
            The students, and the advisor, behind every project at QSEC.
          </p>
        </header>

        <div className="mx-auto max-w-6xl px-6 pb-20 md:pb-28">
          {loading && <p className="text-center text-ink/60">Loading team members…</p>}

          {error && (
            <div className="text-center">
              <p className="mb-6 text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="min-h-11 rounded-lg bg-ink px-8 py-3 font-display text-sm uppercase tracking-[0.2em] text-white transition hover:bg-gold hover:text-ink active:scale-[0.98]"
              >
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-16 md:space-y-24">
              {groupMembers(teamMembers).map((group) => (
                <section key={group.title} aria-labelledby={`group-${group.title}`}>
                  <h2
                    id={`group-${group.title}`}
                    className="mb-8 text-center font-heading text-xl font-light uppercase tracking-[0.12em] text-ink md:mb-10 md:text-2xl"
                  >
                    {group.title}
                  </h2>
                  {/* flex-wrap + justify-center keeps groups of 1 or 2 centred under their heading */}
                  <ul className="flex flex-wrap justify-center gap-x-4 gap-y-10">
                    {group.members.map((member) => (
                      <TeamMemberCard key={member.id} member={member} />
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          )}
        </div>

        <section id="join" className="scroll-mt-4 bg-ink px-6 py-20 text-center text-white md:py-28">
          <h2 className="font-heading text-3xl font-light uppercase tracking-[0.12em] md:text-4xl">Join the team</h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            We&rsquo;re always looking for students who want to build real things. There&rsquo;s a place for you
            on QSDT.
          </p>
          {/* Applications go through the team's Linktree (docs/editing-guide.md) */}
          <a
            href="https://linktr.ee/queenssolardesign"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex min-h-11 items-center rounded-lg bg-gold px-8 py-3.5 font-display text-sm font-medium uppercase tracking-[0.22em] text-ink transition duration-200 hover:-translate-y-0.5 hover:bg-white active:translate-y-0 active:scale-[0.98]"
          >
            Apply to join
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </section>
      </main>
      <Footer />
    </>
  )
}
