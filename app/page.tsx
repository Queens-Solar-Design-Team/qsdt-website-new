'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative text-white py-20 min-h-screen flex items-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-no-repeat"
            style={{
              backgroundImage: 'url(/images/queens-university-background.png)',
              backgroundPosition: 'center 30%',
            }}
          >
            {/* Optional: Subtle dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-bold mb-6">
                Queen's University Solar Design Team
              </h1>
              <p className="text-xl mb-8">
                Empowering tomorrow through solar innovation. We design, build, and compete with solar-powered solutions while educating our community about renewable energy.
              </p>
              <div className="flex gap-4">
                <Link href="/dashboard" className="bg-solar-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-solar-dark-green transition shadow-lg hover:shadow-xl">
                  View Live Data
                </Link>
                <Link href="/about" className="border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-solar-dark-green transition backdrop-blur-sm bg-white/10">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-8">
                The Queen's University Solar Design Team is dedicated to advancing solar energy technology through hands-on projects, competition, and public education. We combine engineering excellence with environmental stewardship to create innovative solutions for a sustainable future.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-solar-green hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-solar-dark-green">Innovation</h3>
                  <p className="text-gray-600">Designing cutting-edge solar solutions</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-solar-yellow hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-solar-dark-green">Competition</h3>
                  <p className="text-gray-600">Competing in international solar challenges</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg border-t-4 border-earth-green hover:shadow-xl transition-shadow">
                  <h3 className="text-xl font-bold mb-2 text-solar-dark-green">Education</h3>
                  <p className="text-gray-600">Teaching others about renewable energy</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QSEC Call-to-Action Section */}
        <section className="py-16 bg-gradient-to-br from-green-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent">
                Queen's Solar Education Center
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                We are currently constructing a <strong className="text-solar-dark-green">fully autonomous home</strong> at Queen's University - the <strong className="text-solar-dark-green">Queen's Solar Education Center (QSEC)</strong>. This remarkable facility relies only on <strong className="text-solar-dark-green">sunshine and rainwater</strong> to meet all its needs, representing the ultimate achievement in sustainable living.
              </p>
              <Link href="/qsec" className="inline-block bg-solar-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-solar-dark-green transition shadow-lg hover:shadow-xl">
                Learn More About QSEC
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-gradient-to-r from-solar-green via-earth-green to-sustainability text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl font-bold text-solar-yellow mb-2">10+</div>
                <div className="text-green-50">Years Active</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl font-bold text-solar-yellow mb-2">50+</div>
                <div className="text-green-50">Team Members</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl font-bold text-solar-yellow mb-2">10+</div>
                <div className="text-green-50">Projects Completed</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                <div className="text-4xl font-bold text-solar-yellow mb-2">100%</div>
                <div className="text-green-50">Solar Powered</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

