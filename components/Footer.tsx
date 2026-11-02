import SponsorBanner from '@/components/SponsorBanner'

export default function Footer() {
  return (
    <>
      <SponsorBanner />
      <footer className="bg-gradient-to-r from-solar-dark-green to-earth-green text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Queen's University Solar Design Team</h3>
            <p className="text-gray-300">
              Promoting solar energy education and innovation at Queen's University.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-solar-yellow transition">About Us</a></li>
              <li><a href="/team" className="hover:text-solar-yellow transition">Our Team</a></li>
              <li><a href="/projects" className="hover:text-solar-yellow transition">Projects</a></li>
              <li><a href="/dashboard" className="hover:text-solar-yellow transition">Live Data</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-300">
              Queen's University<br />
              Kingston, ON, Canada<br />
              <a href="mailto:director.qsdt@engsoc.queensu.ca" className="hover:text-solar-yellow transition">
                director.qsdt@engsoc.queensu.ca
              </a>
            </p>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-4 text-center text-gray-300">
          <p>&copy; 2025 Queen's University Solar Design Team. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  )
}

