import Image from "next/image";

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
        <p className="eyebrow">INDEPENDENT BY DESIGN · EST. 2024</p>
        <h1 id="hero-title">
          IDEAS INTO
          <br />
          LIVING
          <br />
          SYSTEMS.
        </h1>
        <div className="hero-bottom">
          <p className="hero-copy">
            A small studio for ambitious things. Thoughtful software, digital
            worlds, and the details that make them feel alive.
          </p>
          <div className="hero-actions">
            <a className="button button-dark" href="#projects">
              VIEW PROJECTS <span aria-hidden="true">↘</span>
            </a>
            <a className="text-link" href="#contact">
              START A CONVERSATION <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <a className="scroll-cue" href="#about" aria-label="Scroll to about">
          <span>SCROLL TO EXPLORE</span>
          <span aria-hidden="true">↓</span>
        </a>
      </section>

      <section className="artwork" id="about" aria-label="A study in systems">
        <Image
          className="artwork-image"
          src="/2703.png"
          alt="Painterly illustration of a room filled with server racks"
          fill
          priority
          sizes="100vw"
        />
        <div className="artwork-caption" id="projects">
          <span>01 / THE INFRASTRUCTURE</span>
          <span>BUILT FOR WHAT COMES NEXT</span>
        </div>
      </section>

      <section className="closing" id="notes">
        <p className="eyebrow">THE WORK IS NEVER JUST THE WORK</p>
        <h2>MAKE ROOM FOR<br />WHAT&apos;S NEXT.</h2>
        <a className="text-link" href="mailto:hello@les.studio" id="contact">
          GET IN TOUCH <span aria-hidden="true">↗</span>
        </a>
      </section>
    </main>
  );
}
