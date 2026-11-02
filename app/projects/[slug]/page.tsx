'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'

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
  project_images?: Array<{ image_url: string }>
}

export default function ProjectDetail() {
  const params = useParams()
  const projectId = params?.slug as string | undefined
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    const fetchProject = async () => {
      if (!projectId) {
        setLoading(false)
        return
      }

      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
        const response = await fetch(`${apiUrl}/api/projects`)
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const projects = await response.json()
        const foundProject = projects.find((p: Project) => p.id.toString() === projectId)
        
        if (foundProject) {
          // Combine images array with image_url if it exists
          const allImages = foundProject.images || []
          if (foundProject.image_url && !allImages.includes(foundProject.image_url)) {
            allImages.unshift(foundProject.image_url)
          }
          setProject({ ...foundProject, images: allImages })
        } else {
          setError('Project not found')
        }
      } catch (err) {
        console.error('Error fetching project:', err)
        setError('Failed to load project. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-4">Loading...</h1>
              <p className="text-lg text-gray-600">Fetching project details...</p>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (error || !project) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-4">Project Not Found</h1>
              <p className="text-lg text-gray-700 mb-8">{error || 'The project you\'re looking for doesn\'t exist.'}</p>
              <Link href="/projects" className="text-solar-green hover:text-solar-dark-green hover:underline">
                ← Back to Projects
              </Link>
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
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Link 
              href="/projects" 
              className="inline-flex items-center text-solar-dark-green hover:text-solar-green mb-8 transition"
            >
              <span className="mr-2">←</span>
              Back to Projects
            </Link>

            {/* Project Header */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-4">{project.title}</h1>
                  <div className="flex gap-3 items-center">
                    <span className={`px-4 py-2 rounded ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status_display}
                    </span>
                    <span className="px-4 py-2 rounded bg-blue-100 text-blue-800">
                      {project.year}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Images */}
            {project.images && project.images.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                <h2 className="text-2xl font-bold text-solar-dark-green mb-6">Gallery</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {project.images.map((image, index) => (
                    <div 
                      key={`${project.id}-image-${index}`}
                      className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-pointer hover:opacity-90 transition"
                      onClick={() => setSelectedImage(image)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedImage(image);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`View ${project.title} image ${index + 1} in full screen`}
                    >
                      <img 
                        src={image} 
                        alt={`${project.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          console.error('Image failed to load:', image);
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Screen Image Modal */}
            {selectedImage && (
              <div 
                className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                onClick={() => setSelectedImage(null)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setSelectedImage(null);
                  }
                }}
                role="dialog"
                aria-modal="true"
                aria-label="Full screen image viewer"
              >
                <button
                  className="absolute top-4 right-4 text-white text-4xl font-bold hover:text-gray-300 transition z-10 w-12 h-12 flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(null);
                  }}
                  aria-label="Close full screen view"
                >
                  ×
                </button>
                <img 
                  src={selectedImage} 
                  alt="Full screen view"
                  className="max-w-full max-h-full object-contain"
                  onClick={(e) => e.stopPropagation()}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setSelectedImage(null);
                    }
                  }}
                />
              </div>
            )}

            {/* Project Description */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-solar-dark-green mb-6">About This Project</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-solar-green via-earth-green to-sustainability text-white rounded-lg p-8 text-center shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Interested in Learning More?</h2>
              <p className="text-lg mb-6">
                Want to know more about this project or get involved? Contact us!
              </p>
              <div className="flex gap-4 justify-center">
                <a 
                  href="mailto:director.qsdt@engsoc.queensu.ca" 
                  className="bg-solar-yellow text-solar-dark-green px-6 py-3 rounded-lg font-semibold hover:bg-solar-orange transition shadow-lg"
                >
                  Contact Us
                </a>
                <Link 
                  href="/projects" 
                  className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-solar-dark-green transition backdrop-blur-sm bg-white/10"
                >
                  View All Projects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
