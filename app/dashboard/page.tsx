'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-8 text-center">
              Live Solar Dashboard
            </h1>
            
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-12 shadow-xl border-4 border-solar-light-green text-center">
              <div className="mb-6">
                <div className="text-6xl mb-4">🔧</div>
                <h2 className="text-3xl font-bold text-solar-dark-green mb-4">
                  Currently In The Making
                </h2>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Our live solar dashboard is currently under development. We're working hard to bring you real-time data from our solar installations, including power output, energy production, and environmental impact metrics.
              </p>
              <p className="text-lg text-gray-700">
                Check back soon to see live data from the <strong className="text-solar-dark-green">Queen's Solar Education Center</strong> and our other solar projects!
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

