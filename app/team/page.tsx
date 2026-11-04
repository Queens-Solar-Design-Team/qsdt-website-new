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

function TeamMemberCard({ member }: Readonly<{ member: TeamMember }>) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 text-center">
      <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden bg-gradient-to-br from-solar-green to-earth-green flex items-center justify-center relative shadow-lg">
        {(member.image_url || member.image) && (member.image_url || member.image)?.trim() !== '' ? (
          <img 
            src={member.image_url || member.image} 
            alt={member.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to initials if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                const initials = member.name.split(' ').map(n => n[0]).join('');
                const span = document.createElement('span');
                span.className = 'text-white text-3xl font-bold';
                span.textContent = initials;
                parent.appendChild(span);
              }
            }}
          />
        ) : (
          <span className="text-white text-3xl font-bold">
            {member.name.split(' ').map(n => n[0]).join('')}
          </span>
        )}
      </div>
      <h3 className="text-xl font-bold text-solar-dark-green mb-2">{member.name}</h3>
      <p className="text-solar-green font-semibold mb-2">{member.role}</p>
      {member.major && <p className="text-gray-600">{member.major}</p>}
    </div>
  )
}

function organizeTeamMembers(members: TeamMember[]) {
  const facultyAdvisors: TeamMember[] = []
  const coCaptains: TeamMember[] = []
  const rampProject: TeamMember[] = []
  const solarHeatingProject: TeamMember[] = []
  const websiteProject: TeamMember[] = []
  const otherRoles: TeamMember[] = []

  members.forEach(member => {
    const roleLower = member.role.toLowerCase()
    if (roleLower.includes('faculty advisor') || roleLower.includes('faculty') || roleLower.includes('advisor')) {
      facultyAdvisors.push(member)
    } else if (roleLower.includes('co-captain') || roleLower.includes('captain')) {
      coCaptains.push(member)
    } else if (roleLower.includes('ramp')) {
      rampProject.push(member)
    } else if (roleLower.includes('solar heating')) {
      solarHeatingProject.push(member)
    } else if (roleLower.includes('website')) {
      websiteProject.push(member)
    } else {
      otherRoles.push(member)
    }
  })

  return { facultyAdvisors, coCaptains, rampProject, solarHeatingProject, websiteProject, otherRoles }
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

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-8">Our Team</h1>
              <p className="text-lg text-gray-600">Loading team members...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-8">Our Team</h1>
              <p className="text-lg text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-queens-blue text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Retry
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const { facultyAdvisors, coCaptains, rampProject, solarHeatingProject, websiteProject, otherRoles } = organizeTeamMembers(teamMembers)

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-8 text-center">Our Team</h1>
            
            <p className="text-lg text-gray-700 mb-12 text-center">
              Meet the passionate students driving solar innovation at Queen's University.
            </p>

            {/* Co-Captains Section */}
            {coCaptains.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-solar-dark-green mb-6 text-center">Leadership</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {coCaptains.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            )}

            {/* Ramp Project Section */}
            {rampProject.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-solar-dark-green mb-6 text-center">Ramp Project</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {rampProject.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            )}

            {/* Solar Heating Project Section */}
            {solarHeatingProject.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-solar-dark-green mb-6 text-center">Solar Heating Project</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {solarHeatingProject.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            )}

            {/* Website Project Section */}
            {websiteProject.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-solar-dark-green mb-6 text-center">Website Project</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {websiteProject.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            )}

            {/* Other Roles Section */}
            {otherRoles.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-solar-dark-green mb-6 text-center">Other Roles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherRoles.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            )}

            {/* Faculty Advisors Section */}
            {facultyAdvisors.length > 0 && (
              <section className="mb-16">
                <h2 className="text-3xl font-bold text-solar-dark-green mb-6 text-center">Faculty Advisor</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {facultyAdvisors.map((member) => (
                    <TeamMemberCard key={member.id} member={member} />
                  ))}
                </div>
              </section>
            )}

            <div className="mt-12 bg-gradient-to-r from-solar-green via-earth-green to-sustainability text-white p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Join Our Team</h2>
              <p className="text-lg mb-4">
                We're always looking for motivated students to join our team. Whether you're interested in engineering, design, marketing, or project management, there's a place for you on QSDT.
              </p>
              <p className="text-lg">
                Contact us at <a href="mailto:director.qsdt@engsoc.queensu.ca" className="text-solar-yellow hover:underline font-semibold">director.qsdt@engsoc.queensu.ca</a> to learn more about joining.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
