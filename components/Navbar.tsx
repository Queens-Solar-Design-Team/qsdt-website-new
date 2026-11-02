import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="relative backdrop-blur-md bg-gradient-to-r from-solar-green/90 to-earth-green/90 border-b border-solar-dark-green/30 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-2">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/qsdt-logo.png" 
              alt="QSDT Logo" 
              width={90} 
              height={90}
              className="object-contain"
            />
            <span className="text-xl font-bold text-white drop-shadow-lg">Queen's Solar Design Team</span>
          </Link>
          <div className="space-x-4">
            <Link href="/" className="text-white hover:text-solar-yellow transition font-medium drop-shadow-md">Home</Link>
            <Link href="/about" className="text-white hover:text-solar-yellow transition font-medium drop-shadow-md">About</Link>
            <Link href="/qsec" className="text-white hover:text-solar-yellow transition font-medium drop-shadow-md">QSEC</Link>
            <Link href="/team" className="text-white hover:text-solar-yellow transition font-medium drop-shadow-md">Team</Link>
            <Link href="/projects" className="text-white hover:text-solar-yellow transition font-medium drop-shadow-md">Projects</Link>
            <Link href="/education" className="text-white hover:text-solar-yellow transition font-medium drop-shadow-md">Education</Link>
            <Link href="/dashboard" className="bg-solar-yellow hover:bg-solar-orange px-4 py-2 rounded transition text-solar-dark-green font-medium shadow-lg font-semibold">
              Dashboard
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

