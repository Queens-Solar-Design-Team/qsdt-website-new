'use client'

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { useState } from 'react'

interface Topic {
  title: string
  description: string
  content: string
  keyPoints: string[]
}

export default function Education() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const topics: Topic[] = [
    {
      title: 'How Solar Panels Work',
      description: 'Learn about photovoltaic cells and the conversion of sunlight into electricity.',
      content: 'Solar panels, also known as photovoltaic (PV) panels, convert sunlight directly into electricity using the photovoltaic effect. When photons from sunlight strike the semiconductor material (typically silicon) in the solar cells, they knock electrons loose from their atoms. These free electrons are then captured and directed into an electrical current.',
      keyPoints: [
        'Photovoltaic cells are made of semiconductor materials, most commonly silicon',
        'When sunlight hits the cells, photons transfer energy to electrons, creating an electric current',
        'Multiple cells are connected together to form a solar panel, which generates direct current (DC) electricity',
        'An inverter converts DC electricity to alternating current (AC) for use in homes and businesses',
        'Solar panels work best when facing south (in the Northern Hemisphere) at an optimal angle for maximum sun exposure',
        'Even on cloudy days, solar panels can generate electricity, though at reduced efficiency',
      ],
    },
    {
      title: 'Solar System Design',
      description: 'Understanding the components needed for a complete solar energy system.',
      content: 'A complete solar energy system consists of several key components working together to capture, convert, store, and distribute solar energy. Proper system design is crucial for maximizing efficiency and ensuring reliable power generation.',
      keyPoints: [
        'Solar Panels: The primary component that captures sunlight and converts it to DC electricity',
        'Inverter: Converts DC electricity from panels to AC electricity for household use',
        'Battery Storage: Optional but recommended for storing excess energy for use during nighttime or cloudy periods',
        'Charge Controller: Regulates the voltage and current from solar panels to batteries, preventing overcharging',
        'Mounting System: Securely attaches panels to rooftops or ground mounts, ensuring optimal angle and orientation',
        'Monitoring System: Tracks energy production, consumption, and system performance in real-time',
        'Grid Connection: Allows excess energy to be fed back to the electrical grid (net metering)',
        'Safety Equipment: Includes disconnect switches, fuses, and surge protectors to ensure safe operation',
      ],
    },
    {
      title: 'Energy Storage',
      description: 'Explore battery technologies and energy storage solutions for solar systems.',
      content: 'Energy storage is essential for maximizing the benefits of solar power, allowing you to use solar energy even when the sun isn\'t shining. Modern battery technologies have made solar energy storage more efficient, affordable, and accessible than ever before.',
      keyPoints: [
        'Lithium-Ion Batteries: Most common type, offering high energy density, long lifespan, and good efficiency',
        'Lead-Acid Batteries: Traditional option, more affordable but with shorter lifespan and lower efficiency',
        'Battery Capacity: Measured in kilowatt-hours (kWh), determines how much energy can be stored',
        'Depth of Discharge (DoD): The percentage of battery capacity that can be safely used before recharging',
        'Battery Lifecycle: Number of charge/discharge cycles a battery can handle before capacity degrades significantly',
        'Off-Grid Systems: Require larger battery banks to provide power during extended periods without sunlight',
        'Grid-Tied with Storage: Allows energy independence while maintaining connection to the utility grid as backup',
        'Smart Energy Management: Modern systems optimize when to charge, discharge, or draw from the grid based on usage patterns and rates',
      ],
    },
    {
      title: 'Solar Economics',
      description: 'Learn about the costs, savings, and ROI of solar energy installations.',
      content: 'Solar energy is not just environmentally friendly—it\'s also increasingly economically viable. Understanding the financial aspects of solar installations helps homeowners and businesses make informed decisions about investing in solar power.',
      keyPoints: [
        'Initial Investment: Upfront costs include panels, inverters, installation, and permits, typically ranging from $15,000-$30,000 for residential systems',
        'Payback Period: The time it takes for energy savings to equal the initial investment, typically 6-12 years depending on location and incentives',
        'Return on Investment (ROI): Solar systems typically provide 10-20% annual returns through energy savings',
        'Government Incentives: Tax credits, rebates, and grants can significantly reduce upfront costs (e.g., 30% federal tax credit in the U.S.)',
        'Net Metering: Allows you to sell excess energy back to the grid, further reducing electricity bills',
        'Increased Property Value: Homes with solar panels typically sell for 3-4% more than comparable homes without',
        'Energy Independence: Protection against rising electricity rates and grid outages',
        'Maintenance Costs: Solar systems require minimal maintenance, primarily periodic cleaning and occasional component replacement',
        'Lifespan: Most solar panels come with 25-year warranties and can last 30+ years with proper maintenance',
      ],
    },
  ]

  const togglePanel = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-8 text-center">Solar Education</h1>
            
            <p className="text-lg text-gray-700 mb-12 text-center">
              Learn about solar energy and how it can power a sustainable future. Click on any topic to expand and learn more.
            </p>

            <div className="space-y-4 mb-12">
              {topics.map((topic, index) => (
                <div 
                  key={topic.title} 
                  className="bg-white rounded-lg shadow-lg border-l-4 border-solar-green overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <button
                    onClick={() => togglePanel(index)}
                    className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-solar-green focus:ring-offset-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-solar-dark-green mb-2">{topic.title}</h2>
                        <p className="text-lg text-gray-700">{topic.description}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <svg
                          className={`w-6 h-6 text-solar-green transition-transform duration-300 ${
                            openIndex === index ? 'transform rotate-180' : ''
                          }`}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M19 9l-7 7-7-7"></path>
                        </svg>
                      </div>
                    </div>
                  </button>
                  
                  {openIndex === index && (
                    <div className="px-6 pb-6 animate-fadeIn">
                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                          {topic.content}
                        </p>
                        <div className="space-y-3">
                          <h3 className="text-xl font-bold text-solar-dark-green mb-3">Key Points:</h3>
                          <ul className="space-y-2">
                            {topic.keyPoints.map((point) => (
                              <li key={point} className="flex items-start gap-3">
                                <span className="text-solar-green font-bold mt-1 flex-shrink-0">•</span>
                                <span className="text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-solar-green via-earth-green to-sustainability text-white p-8 rounded-lg mb-8 shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Live Solar Data</h2>
              <p className="text-lg mb-4">
                See real-time solar performance data from our installations. Visit our dashboard to explore current power output, energy production, and environmental impact.
              </p>
              <a href="/dashboard" className="inline-block bg-solar-yellow text-solar-dark-green px-6 py-3 rounded-lg font-semibold hover:bg-solar-orange transition shadow-lg">
                View Dashboard
              </a>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-lg border border-solar-light-green">
              <h2 className="text-2xl font-bold text-solar-dark-green mb-4">Educational Resources</h2>
              <p className="text-lg text-gray-700 mb-4">
                Looking for more information about solar energy? We offer workshops, presentations, and educational materials for students, educators, and community members.
              </p>
              <p className="text-lg text-gray-700">
                Contact us at <a href="mailto:director.qsdt@engsoc.queensu.ca" className="text-solar-green hover:text-solar-dark-green hover:underline font-semibold">director.qsdt@engsoc.queensu.ca</a> to schedule a presentation or request materials.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

