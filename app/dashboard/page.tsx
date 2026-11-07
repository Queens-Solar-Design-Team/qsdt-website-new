'use client'

import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function Dashboard() {
   const [data, setData] = useState<any>(null)

   useEffect(() => {
     fetch('/api/solar').then((r) => r.json()).then(setData)
   }, [])

  return (
    <> 
      <Navbar />
      <main className="min-h-screen py-12">
        
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-8 text-center">
              Fake Solar Dashboard
            </h1>
            
                        {!data ? (
              <p className="text-center text-gray-600">Loading...</p>
            ) : (
              <div className="space-y-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 shadow-lg border-2 border-solar-light-green">
                    <p className="text-sm text-gray-600">Current output</p>
                    <p className="text-2xl font-bold text-solar-dark-green">{data.currentKw} kW</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 shadow-lg border-2 border-solar-light-green">
                    <p className="text-sm text-gray-600">Energy today</p>
                    <p className="text-2xl font-bold text-solar-dark-green">{data.todayKwh} kWh</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 shadow-lg border-2 border-solar-light-green">
                    <p className="text-sm text-gray-600">CO₂ avoided</p>
                    <p className="text-2xl font-bold text-solar-dark-green">{data.co2AvoidedKg} kg</p>
                  </div>
                </div>

                <div className="h-72 bg-white rounded-2xl p-6 shadow-xl border-4 border-solar-light-green">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data.hourly}>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area dataKey="kw" stroke="#166534" fill="#fbbf24" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}
          </div>
        </div>

        
      </main>
      <Footer />
    </>
  )
}

