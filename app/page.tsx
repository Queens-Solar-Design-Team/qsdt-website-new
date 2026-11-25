import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { team } from '@/data/team'
import { projects } from '@/data/projects'

// The three photos on the home page, top to bottom. To swap one, put the file in
// public/images/ and change the path here (see docs/photos.md for the shortlist).
const IMAGES = {
  // 1. Hero: the full-screen photo behind the title and JOIN button. Kept as qsec.jpg
  //    (the golden-hour tower shot was considered and decided against, 24 Nov 2026).
  hero: { src: '/images/qsec.jpg', alt: "The Queen's Solar Education Centre with its rooftop solar panels" },
  // 2. "Who we are" section: QSEC's rooftop solar array under the sun (photo 16). Portrait, shown in a 4:5 frame.
  whoWeAre: {
    src: '/images/rooftop-solar.jpg',
    alt: "QSEC's rooftop solar panels in full sun, with campus behind",
  },
  // 3. "The Solar Education Centre" section.
  qsec: { src: '/images/project-images/OGWS-1.jpeg', alt: 'Rainwater collection piping running along the side of QSEC' },
}

const activeProjects = projects.filter((p) => p.status === 'in_progress').length

const facts = [
  { value: '1988', label: 'Founded' },
  { value: String(team.length), label: 'Team members' },
  { value: String(activeProjects), label: 'Active projects' },
]

const sectionTitle =
  'font-heading text-2xl md:text-3xl font-light uppercase tracking-[0.12em] text-ink'
const textLink =
  'group inline-flex min-h-11 items-center gap-2 font-display text-sm uppercase tracking-[0.2em] text-ink'
const underline =
  'bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]'

export default function Home() {
  return (
    <>
      <Navbar overlay />
      <main>
        {/* Hero */}
        <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden text-white">
          <Image
            src={IMAGES.hero.src}
            alt={IMAGES.hero.alt}
            fill
            priority
            sizes="100vw"
            // Phones: shift the crop left so the rooftop panels stay in frame
            className="object-cover object-[30%_45%] md:object-[center_45%]"
          />
          {/* Neutral darken so the gold type reads; heavier at top (nav) and bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/30 to-black/50" />
          {/* Warm amber at the sides, so the gold title and button belong to the picture */}
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(150,92,10,0.7)_0%,rgba(150,92,10,0)_28%,rgba(150,92,10,0)_72%,rgba(150,92,10,0.7)_100%)] mix-blend-multiply" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(242,183,5,0.22)_0%,rgba(242,183,5,0)_22%,rgba(242,183,5,0)_78%,rgba(242,183,5,0.22)_100%)] mix-blend-soft-light" />

          <div className="relative z-10 px-6 text-center">
            <h1
              className="hero-in font-heading font-light uppercase leading-[1.1] tracking-[0.08em] text-[2.1rem] sm:text-5xl lg:text-6xl xl:text-7xl text-[#f8d26a] [text-wrap:balance] drop-shadow-[0_2px_14px_rgba(0,0,0,0.55)]"
              style={{ animationDelay: '0.1s' }}
            >
              Queen&rsquo;s Solar Design Team
            </h1>
            <p
              className="hero-in mt-6 flex items-center justify-center gap-x-4 sm:gap-x-6 font-heading font-light italic tracking-[0.06em] text-lg sm:text-2xl lg:text-3xl text-[#f8d26a] drop-shadow-[0_1px_8px_rgba(0,0,0,0.6)]"
              style={{ animationDelay: '0.3s' }}
            >
              <span>Design</span>
              <span aria-hidden className="not-italic text-[#f8d26a]">&middot;</span>
              <span>Build</span>
              <span aria-hidden className="not-italic text-[#f8d26a]">&middot;</span>
              <span>Sustain</span>
            </p>
            <div className="hero-in mt-10" style={{ animationDelay: '0.5s' }}>
              <Link
                href="/team#join"
                className="inline-flex min-h-11 items-center rounded-lg bg-gold px-10 py-3.5 font-display text-sm font-medium uppercase tracking-[0.28em] text-ink shadow-[0_6px_24px_rgba(30,17,3,0.45)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#fff3d9] active:translate-y-0 active:scale-[0.98]"
              >
                Join
              </Link>
            </div>
          </div>
        </section>

        {/* Who we are: text beside photo */}
        <section className="bg-white py-16 md:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
            <div>
              <h2 className={sectionTitle}>Who we are</h2>
              <p className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-ink/75">
                The Queen&apos;s University Solar Design Team is a student team that has been designing and
                building solar-powered systems since 1988. We take projects from first sketch to working
                hardware, and we teach our community what renewable energy can do along the way.
              </p>
              <Link href="/about" className={`${textLink} mt-6 md:mt-10`}>
                <span className={underline}>About the team</span>
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
            <Link href="/projects" className="group block overflow-hidden rounded-lg" aria-label="See our projects">
              <Image
                src={IMAGES.whoWeAre.src}
                alt={IMAGES.whoWeAre.alt}
                width={1200}
                height={1600}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/5] w-full object-cover object-[center_40%] transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
          </div>
        </section>

        {/* QSEC: photo beside text, reversed */}
        <section className="bg-stone py-16 md:py-32">
          <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-2 md:gap-16">
            <Link href="/qsec" className="group block overflow-hidden rounded-lg md:order-first" aria-label="Explore QSEC">
              <Image
                src={IMAGES.qsec.src}
                alt={IMAGES.qsec.alt}
                width={1200}
                height={1200}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Link>
            <div className="order-first md:order-none">
              <h2 className={sectionTitle}>The Solar Education Centre</h2>
              <p className="mt-6 md:mt-8 text-base md:text-lg leading-relaxed text-ink/75">
                QSEC is a fully autonomous home on campus that runs on nothing but sunshine and rainwater.
                Every system in it, from the panels on the roof to the water filtration, is a project our
                members design, build and keep improving.
              </p>
              <Link href="/qsec" className={`${textLink} mt-6 md:mt-10`}>
                <span className={underline}>Explore QSEC</span>
                <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Facts */}
        <section className="bg-ink py-14 md:py-20 text-white">
          <dl className="mx-auto grid max-w-6xl grid-cols-3 gap-4 px-6 text-center md:gap-12">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="font-display text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/60">{f.label}</dt>
                <dd className="mt-2 md:mt-3 font-heading text-4xl md:text-5xl font-light tracking-wide">{f.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>
      <Footer />
    </>
  )
}
