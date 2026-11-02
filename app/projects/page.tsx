'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Project {
  id: number
  title: string
  short_description: string
  description: string
  status: string
  status_display: string
  year: string
  images?: string[]
  image_url?: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
        const response = await fetch(`${apiUrl}/api/projects`)
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError('Failed to load projects. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-8">Our Projects</h1>
              <p className="text-lg text-gray-600">Loading projects...</p>
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
              <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-8">Our Projects</h1>
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl font-bold text-queens-blue mb-8 text-center">Our Projects</h1>
            
            <p className="text-lg text-gray-700 mb-12 text-center">
              Explore our innovative solar energy projects and initiatives.
            </p>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No projects available at this time.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {projects.map((project) => (
                  <Link 
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="block bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition cursor-pointer"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold text-solar-dark-green">{project.title}</h2>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded ${
                          project.status === 'completed' ? 'bg-green-100 text-green-800' :
                          project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {project.status_display}
                        </span>
                        <span className="px-3 py-1 rounded bg-blue-100 text-blue-800">
                          {project.year}
                        </span>
                      </div>
                    </div>
                    <p className="text-lg text-gray-700">{project.short_description}</p>
                    <p className="text-solar-green mt-4 font-semibold hover:text-solar-dark-green transition">Learn more →</p>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-12 bg-gradient-to-r from-solar-green via-earth-green to-sustainability text-white p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Project Sponsorship</h2>
              <p className="text-lg mb-4">
                Our projects are made possible through the generous support of sponsors and the Queen's University community.
              </p>
              <p className="text-lg">
                Interested in sponsoring a project? Contact us at <a href="mailto:director.qsdt@engsoc.queensu.ca" className="text-solar-yellow hover:underline font-semibold">director.qsdt@engsoc.queensu.ca</a>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
