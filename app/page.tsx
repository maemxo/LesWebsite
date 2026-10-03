import Image from "next/image";
import RefineFrame from "../components/RefineFrame";
import ImageFlipper from "../components/ImageFlipper";

const navigation = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "NOTES", href: "#notes" },
  { label: "CONTACT", href: "#contact" },
];

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <div className="nav-links nav-links-left">
            {navigation.slice(0, 2).map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <a className="wordmark" href=" " aria-label="LES home">
            L̷E̷S
          </a>
          <div className="nav-links nav-links-right">
            {navigation.slice(2).map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <a className="nav-cta" href="#projects">
            EXPLORE <span aria-hidden="true">↘</span>
          </a>
        </nav>
      </header>

      <section className="hero" id="top" aria-labelledby="hero-title">
        <Image
          className="hero-background"
          src="/02.png"
          alt=""
          fill
          priority
          sizes="100vw"
          aria-hidden="true"
        />
        <p className="eyebrow">INDEPENDENT BY DESIGN · EST. 2026</p>
        <h1 id="hero-title">
          IDEAS INTO
          <br />
          LIVING
          <br />
          SYSTEMS.
        </h1>
        <div className="hero-bottom">
          <p className="hero-copy">
            A small studio for ambitious projects. Discover the details that make them feel alive.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">
              VIEW PROJECTS <span aria-hidden="true">↘</span>
            </a>
            <a>
              *<span aria-hidden="true"></span>
            </a>
          </div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about">
          <span>SCROLL TO EXPLORE</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="closing" id="about">
        <div className="closing-copy" id="notes">
          <p className="eyebrow">THE TIME YOU SPENT TO CREATE IS TIME WELL LIVED</p>
          <h2 className="" id="projects">MAKE YOUR DREAMS<br />A REALITY</h2>
          <a className="text-link" href="mailto:hello@les.studio" id="contact">
            GET IN TOUCH <span aria-hidden="true">↗</span>
          </a>
        </div>

        <RefineFrame
          className="closing-refinement"
          status="refining"
          width={560}
          aspectRatio="666 / 375"
          radius={0}
          background="transparent"
          stageDuration={0}
          onRetry={10}
        >
          <ImageFlipper
            images={["/2703.png", "/610.jpg", "/611.png", "/612.png", "1024.jpg"]}
            interval={4000}
            alt="Painted illustration of infrastructure"
            width={666}
            height={375}
          />
        </RefineFrame>

      </section>

      <footer className="site-footer">
        <a className="footer-brand" href="#top" aria-label="LES home">
          L̷E̷S
        </a>
        <span className="footer-note">INDEPENDENT BY DESIGN</span>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#about">ABOUT</a>
          <a href="#projects">PROJECTS</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <a className="footer-top" href="">
          BACK TO TOP <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </main>
  );
}