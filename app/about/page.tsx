"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import {ScrollTrigger, SplitText} from "gsap/all";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);


export default function About() {
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const paragraphs = gsap.utils.toArray<HTMLParagraphElement>(
        "p",
        container.current
      );
      paragraphs.forEach((paragraph) => {
        const splitWords = new SplitText(paragraph, {
          type: "words, chars",
      });

      gsap.fromTo(
        splitWords.chars,
        { 
          opacity: 0
        },
        {
          delay: 0.5,
          opacity: 1,
          stagger: 0.005,
          duration: 0.1,
          scrollTrigger: {
            trigger: paragraph,
            start: "Top 80%",
            once: true
          },
          onComplete: () => splitWords.revert(),
        });  
      });
      },
      {
        scope: container,
      }
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            <div 
            ref={container}
            className="md:col-span-2 who-are-we-and-history-box h-auto">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-solar-green to-earth-green bg-clip-text text-transparent mb-8">
                About Us
              </h1>

              <section 
              className="mb-12 who-are-we-section">
                <h2 className="text-2xl font-bold text-solar-dark-green mb-4">
                  Who We Are
                </h2>
                <p 
                className="text-lg text-gray-700 mb-4 h-auto">
                  The Queen's University Solar Design Team (QSDT) is a
                  student-led organization dedicated to advancing solar energy
                  technology and promoting renewable energy awareness. Founded
                  in 2016, we have grown into a dynamic team of passionate
                  engineers, designers, and advocates.
                  <br></br><br></br>
                  Our team combines expertise from multiple engineering
                  disciplines including mechanical, electrical, and software
                  engineering to tackle complex solar challenges and compete in
                  international competitions.
                </p>
              </section>

              <section 
              className="mb-12">
                <h2 className="text-2xl font-bold text-solar-dark-green mb-4">
                  Our History
                </h2>
                <p 
                className="text-lg text-gray-700 mb-4 h-auto">
                  The Queen's University Solar Design Team was formerly the{" "}
                  <strong className="text-solar-dark-green">
                    Queen's Solar Vehicle Team (QSVT)
                  </strong>
                  . One of the original Canadian solar vehicle teams, QSVT began
                  in <strong className="text-solar-dark-green">1988</strong> and
                  designed and built{" "}
                  <strong className="text-solar-dark-green">
                    11 solar vehicles
                  </strong>
                  , setting numerous records and acquiring many accolades.
                
                <br></br><br></br>
                
                  In addition to technical innovation and increasing awareness
                  of the benefits of solar power, QSVT created{" "}
                  <strong className="text-solar-dark-green">Solar Quest</strong>{" "}
                  , an educational initiative for local schools that had
                  elementary and high school students design and build their own
                  solar cars.

                  <br></br><br></br>

                  The Solar Design Team's new mission is to build a net zero,
                  solar home as part of the U.S. Department of Energy's{" "}
                  <strong className="text-solar-dark-green">
                    Solar Decathlon
                  </strong>{" "}
                  in Washington, D.C. Today, we've evolved to focus on broader
                  solar energy applications, including the construction of fully
                  autonomous homes like the Queen's Solar Education Center and
                  various solar-powered projects. While our focus has expanded,
                  our commitment to pushing the limits of solar technology and
                  achieving excellence remains unchanged.
                </p>
              </section>
            </div>

            <aside className="md:col-span-1 relative">
              <div className="sticky top-24 bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border-l-4 border-solar-yellow">
                <h3 className="text-xl font-bold text-solar-dark-green mb-3">
                  Major Achievements
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-solar-yellow font-bold">2000:</span>
                    <span>
                      Set the{" "}
                      <strong className="text-solar-dark-green">
                        Guinness World Record
                      </strong>{" "}
                      for the longest journey in a solar vehicle
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-solar-yellow font-bold">2003:</span>
                    <span>
                      Placed{" "}
                      <strong className="text-solar-dark-green">first</strong>{" "}
                      in both the{" "}
                      <strong className="text-solar-dark-green">
                        North American Solar Challenge
                      </strong>{" "}
                      and the{" "}
                      <strong className="text-solar-dark-green">
                        World Solar Challenge
                      </strong>{" "}
                      for two-seater vehicles
                    </span>
                  </li>

                  <li className="flex items-start gap-2">
                    <span className="text-solar-yellow font-bold">2010:</span>
                    <span>
                      Built a{" "}
                      <strong className="text-solar-dark-green">fully autonomus home</strong>
                      currently operating on west campus.
                    </span>
                  </li>

                </ul>
              </div>
            </aside>
          </div>

          <div className="mt-12">

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-solar-dark-green mb-4">
                Queen's Solar Education Center
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                We are currently constructing a{" "}
                <strong className="text-solar-dark-green">
                  fully autonomous home
                </strong>{" "}
                at Queen's University - the{" "}
                <strong className="text-solar-dark-green">
                  Queen's Solar Education Center (QSEC)
                </strong>
                . While we have previously made net-zero and net-positive energy
                homes, the QSEC functions completely off-the-grid through the
                use of a wide array of advanced technologies.
              </p>
              <p className="text-lg text-gray-700 mb-4">
                This remarkable facility relies only on{" "}
                <strong className="text-solar-dark-green">
                  sunshine and rainwater
                </strong>{" "}
                to meet all its needs, representing the ultimate achievement in
                sustainable living. Many of our projects directly support and
                enhance the Solar Education Center, making it a cornerstone of
                renewable energy education and innovation at Queen's University.
              </p>
              <div className="bg-gradient-to-br from-green-50 to-white rounded-lg p-6 border-l-4 border-solar-green mt-6">
                <h3 className="text-xl font-bold text-solar-dark-green mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-solar-green">✓</span>
                    <span>
                      <strong>Fully autonomous</strong> - completely
                      off-the-grid with zero grid dependency
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-solar-green">✓</span>
                    <span>
                      <strong>Sunshine and rainwater only</strong> - no external
                      utilities required
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-solar-green">✓</span>
                    <span>
                      <strong>Advanced technologies</strong> - state-of-the-art
                      systems for energy and water management
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-solar-green">✓</span>
                    <span>
                      <strong>Beyond net-zero</strong> - going further than
                      previous net-zero/net-positive homes
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-solar-green">✓</span>
                    <span>
                      Educational resource for students, faculty, and the
                      broader community
                    </span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-solar-dark-green mb-4">
                Our Projects
              </h2>
              <p className="text-lg text-gray-700">
                From Solar Charging Tables to Solar Cathod Heating, we work on
                diverse projects that push the boundaries of solar technology.
                Many of these projects directly support and enhance the Queen's
                Solar Education Center, demonstrating practical applications of
                renewable energy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-solar-dark-green mb-4">
                Get Involved
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Are you a Queen's student interested in solar energy? We're
                always looking for new members! Join us to gain hands-on
                experience, network with industry professionals, and make a
                difference in renewable energy.
              </p>
              <p className="text-lg text-gray-700">
                Contact us at{" "}
                <a
                  href="mailto:director.qsdt@engsoc.queensu.ca"
                  className="text-solar-green hover:text-solar-dark-green hover:underline font-semibold"
                >
                  director.qsdt@engsoc.queensu.ca
                </a>{" "}
                or visit our team page to learn more.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
