'use client';

import Link from "next/link";
import { useState } from "react";
import ProjectModal, { Project } from "@/components/ProjectModal";

const navigation = [
  { label: "ABOUT",    href: "/about" },
  { label: "PROJECTS", href: "/projects" },
  { label: "CONTACT",  href: "/contact" },
];

const PROJECTS: Record<string, Project> = {
  JUNO: {
    title: "JUNO",
    tagline: "A quiet system for loud ideas.",
    description:
      "JUNO is a long-form exploration of how small, deliberate details shape how a space feels. Built as a brand identity and digital home for an independent studio.",
    image: "/610.jpg",
    year: "2025",
  },
  WAYSTONE: {
    title: "WAYSTONE",
    tagline: "Wayfinding for the in-between.",
    description:
      "WAYSTONE reimagines navigation as a narrative. Every signpost is a story beat, every path a decision made visible.",
    image: "/611.png",
    year: "2026",
  },
};

const HOTSPOTS = [
  { id: "JUNO",     top: "16%", left: "6%",  width: "5%",  height: "20%", labelBottom: "-40px" },
  { id: "WAYSTONE", top: "52%", left: "52%", width: "5%",  height: "26%", labelBottom: "-70px" },
];

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  const handleSelect = (id: string) => {
    const p = PROJECTS[id];
    if (p) setOpen(p);
  };

  return (
    <main style={{ position: "relative", minHeight: "100vh" }}>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/wallpapers.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
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

        <section
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8rem 2rem 6rem",
            minHeight: "calc(100vh - 200px)",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "900px",
              position: "relative",
            }}
          >
            <p
              style={{
                fontSize: 12,
                letterSpacing: "0.3em",
                opacity: 0.75,
                margin: 0,
                fontWeight: 600,
                color: "#2a1f12",
                textAlign: "center",
                textShadow: "0 1px 12px rgba(254,248,241,0.7)",
              }}
            >
              THE COLLECTION · VOL. I
            </p>

            <h1
              style={{
                fontSize: "clamp(32px, 4vw, 52px)",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                margin: "1rem 0 2.5rem",
                fontWeight: 500,
                color: "#2a1f12",
                textAlign: "center",
                textShadow: "0 2px 20px rgba(254,248,241,0.85)",
              }}
            >
              Selected works.
            </h1>

            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "700 / 315",
              }}
            >
              <img
                src="/books.png"
                alt=""
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  userSelect: "none",
                  pointerEvents: "none",
                  mixBlendMode: "multiply",
                }}
              />

              {HOTSPOTS.map((spot) => {
                const project = PROJECTS[spot.id];
                if (!project) return null;
                return (
                  <button
                    key={spot.id}
                    onClick={() => handleSelect(spot.id)}
                    aria-label={`Open ${project.title}`}
                    style={{
                      position: "absolute",
                      top: spot.top,
                      left: spot.left,
                      width: spot.width,
                      height: spot.height,
                      padding: 0,
                      border: "none",
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        bottom: spot.labelBottom,
                        left: "50%",
                        transform: "translateX(-50%)",
                        fontSize: 10,
                        letterSpacing: "0.28em",
                        color: "#2a1f12",
                        fontWeight: 600,
                        opacity: 0.7,
                        pointerEvents: "none",
                        whiteSpace: "nowrap",
                        userSelect: "none",
                        textShadow: "0 1px 8px rgba(254,248,241,0.8)",
                      }}
                    >
                      {project.title}
                    </span>
                  </button>
                );
              })}
            </div>

            <p
              style={{
                fontSize: 11,
                letterSpacing: "0.3em",
                opacity: 0.65,
                margin: "2.5rem 0 0",
                color: "#2a1f12",
                textAlign: "center",
                textShadow: "0 1px 10px rgba(254,248,241,0.7)",
              }}
            >
              2 CHAMBERS · 2025 — 2026
            </p>
          </div>
        </section>

        <footer className="site-footer2">
          <Link className="footer-brand" href="/" aria-label="LES home">
            L̷E̷S
          </Link>

          <span className="footer-note" style={{ color: "#f0e2c2" }}>
            INDEPENDENT BY DESIGN
          </span>
          <nav className="footer-links" aria-label="Footer navigation">
            <Link href="/about">ABOUT</Link>
            <Link href="/projects">PROJECTS</Link>
            <Link href="/contact">CONTACT</Link>
          </nav>
          <Link className="footer-top" href="/">
            BACK TO TOP <span aria-hidden="true">↑</span>
          </Link>
        </footer>
      </div>

      <ProjectModal project={open} onClose={setOpen.bind(null, null)} />
    </main>
  );
}