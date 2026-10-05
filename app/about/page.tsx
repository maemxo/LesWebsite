'use client';

import Link from "next/link";

const navigation = [
  { label: "ABOUT",    href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT",  href: "/contact" },
];

export default function About() {
  return (
    <main style={{ position: "relative", backgroundColor: "#fef8f1" }}>
      <header className="site-header">
        <nav className="site-nav" aria-label="Main navigation">
          <div className="nav-links nav-links-left">
            {navigation.slice(0, 2).map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <Link className="wordmark" href="/" aria-label="LES home">
            L̷E̷S
          </Link>

          <div className="nav-links nav-links-right">
            {navigation.slice(2).map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <a
            className="nav-cta"
            href="https://github.com/maemxo"
            target="_blank"
            rel="noopener noreferrer"
          >
            GITHUB <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      {/* HERO — small about title, with a masked NeoTokyo image behind it */}
      <section
        id="top"
        aria-labelledby="about-title"
        style={{
          position: "relative",
          padding: "8rem 2rem 6rem",
          maxWidth: "1200px",
          margin: "0 auto",
          overflow: "hidden",
        }}
      >
        {/* Masked image layer — sits behind the content */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "60%",
            height: "100%",
            backgroundImage: "url('/NeoTokyo.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center right",
            backgroundRepeat: "no-repeat",
            opacity: 0.65,
            pointerEvents: "none",
            zIndex: 0,
            // Radial mask — fades the whole rectangle out to nothing at its edges.
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 75%)",
          }}
        />

        {/* Content sits above the image */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: 12,
              letterSpacing: "0.25em",
              opacity: 0.5,
              margin: 0,
              fontWeight: 600,
            }}
          >
            ABOUT · EST. 2026
          </p>

          <h1
            id="about-title"
            style={{
              fontSize: "clamp(40px, 5vw, 72px)",
              lineHeight: 1,
              letterSpacing: "-0.02em",
              margin: "1.5rem 0 2.5rem",
              fontWeight: 500,
              color: "#403b32",
              maxWidth: "820px",
            }}
          >
            A small studio for
            <br />
            ambitious projects.
          </h1>

          <div
            style={{
              maxWidth: "640px",
              lineHeight: 1.7,
              fontSize: 17,
              color: "#403b32",
            }}
          >
            <p style={{ marginBottom: "1.25rem" }}>
              LES is built around a single idea: the details are the work. We partner
              with brands, artists, and individuals who care about the small decisions
              that make things feel alive.
            </p>
            <p>
              Founded in 2026 by Max Eekhof. Based between Amsterdam and the internet.
            </p>
          </div>
        </div>
      </section>

      {/* PRINCIPLES — three short columns */}
      <section
        style={{
          position: "relative",
          padding: "4rem 2rem",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "3rem",
        }}
      >
        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.5, margin: 0 }}>
            01 · THE WORK
          </p>
          <h3 style={{ fontSize: 22, fontWeight: 500, margin: "0.75rem 0 0.75rem" }}>
            Built to last
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: 15, margin: 0, opacity: 0.85 }}>
            Every project starts with a question: what will still matter in ten
            years? Everything else is noise.
          </p>
        </div>

        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.5, margin: 0 }}>
            02 · THE PROCESS
          </p>
          <h3 style={{ fontSize: 22, fontWeight: 500, margin: "0.75rem 0 0.75rem" }}>
            Slow on purpose
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: 15, margin: 0, opacity: 0.85 }}>
            We work in long-form collaborations. Fewer clients, deeper engagements,
            more of the details that matter.
          </p>
        </div>

        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.5, margin: 0 }}>
            03 · THE STUDIO
          </p>
          <h3 style={{ fontSize: 22, fontWeight: 500, margin: "0.75rem 0 0.75rem" }}>
            Small by design
          </h3>
          <p style={{ lineHeight: 1.6, fontSize: 15, margin: 0, opacity: 0.85 }}>
            A one-person studio with a wide network. Direct contact, no layers,
            no account managers.
          </p>
        </div>
      </section>

      {/* DETAILS */}
      <section
        style={{
          position: "relative",
          padding: "4rem 2rem 6rem",
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2rem",
        }}
      >
        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.5, margin: 0 }}>
            FOUNDED
          </p>
          <p style={{ fontSize: 16, margin: "0.5rem 0 0" }}>
            2026 · Max Eekhof
          </p>
        </div>

        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.5, margin: 0 }}>
            BASED
          </p>
          <p style={{ fontSize: 16, margin: "0.5rem 0 0" }}>
            Amsterdam · the internet
          </p>
        </div>

        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.5, margin: 0 }}>
            CONTACT
          </p>
          <a
            href="mailto:hello@les.studio"
            style={{
              color: "#403b32",
              textDecoration: "none",
              fontSize: 16,
              borderBottom: "1px solid #403b32",
              paddingBottom: 2,
              display: "inline-block",
              marginTop: "0.5rem",
            }}
          >
            hello@les.studio
          </a>
        </div>

        <div>
          <p style={{ fontSize: 11, letterSpacing: "0.2em", opacity: 0.5, margin: 0 }}>
            ELSEWHERE
          </p>
          <a
            href="https://github.com/maemxo"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#403b32",
              textDecoration: "none",
              fontSize: 16,
              borderBottom: "1px solid #403b32",
              paddingBottom: 2,
              display: "inline-block",
              marginTop: "0.5rem",
            }}
          >
            GitHub ↗
          </a>
        </div>
      </section>

      <footer className="site-footer">
        <Link className="footer-brand" href="/" aria-label="LES home">
          L̷E̷S
        </Link>
        <span className="footer-note">INDEPENDENT BY DESIGN</span>
        <nav className="footer-links" aria-label="Footer navigation">
          <Link href="/about">ABOUT</Link>
          <Link href="/projects">PROJECTS</Link>
          <Link href="/contact">CONTACT</Link>
        </nav>
        <Link className="footer-top" href="/">
          BACK TO TOP <span aria-hidden="true">↑</span>
        </Link>
      </footer>
    </main>
  );
}