import Image, { getImageProps } from "next/image";

const navigation = [
  { label: "ABOUT", href: "#about" },
  { label: "PROJECTS", href: "#projects" },
  { label: "NOTES", href: "#notes" },
  { label: "CONTACT", href: "#contact" },
];

const desktopArtwork = getImageProps({
  src: "/2703.png",
  alt: "",
  width: 1200,
  height: 720,
  sizes: "100vw",
}).props;

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
          <a className="wordmark" href="#top" aria-label="LES home">
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
            <a className="text-link" href="#contact">
              Talk to a niggah <span aria-hidden="true">↗</span>
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
          <p className="eyebrow">THE WORK IS NEVER JUST THE WORK</p>
          <h2>MAKE ROOM FOR<br />WHAT&apos;S NEXT.</h2>
          <a className="text-link" href="mailto:hello@les.studio" id="contact">
            GET IN TOUCH <span aria-hidden="true">↗</span>
          </a>
        </div>

        <figure className="artwork" id="projects">
          <div className="artwork-frame">
            <svg
              className="artwork-streak"
              viewBox="0 0 1200 260"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <mask
                  id="theblur-streak-mask"
                  x="0"
                  y="0"
                  width="1200"
                  height="260"
                  maskUnits="userSpaceOnUse"
                  mask-type="alpha"
                >
                  <image
                    href="/theblur.svg"
                    width="1200"
                    height="260"
                    preserveAspectRatio="none"
                  />
                </mask>
              </defs>
              <image
                href={desktopArtwork.src}
                x="0"
                y="0"
                width="1200"
                height="260"
                preserveAspectRatio="xMaxYMid slice"
                mask="url(#theblur-streak-mask)"
              />
            </svg>
            <Image
              className="artwork-image"
              src="/2703.png"
              alt="Painterly illustration of a room filled with server racks"
              fill
              sizes="(max-width: 760px) 88vw, 50vw"
            />
          </div>
          <figcaption className="artwork-caption">
            <span>01 / THE INFRASTRUCTURE</span>
            <span>BUILT FOR WHAT COMES NEXT</span>
          </figcaption>
        </figure>
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
        <a className="footer-top" href="#top">
          BACK TO TOP <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </main>
  );
}
