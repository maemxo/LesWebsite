'use client';

import Link from "next/link";
import { useState } from "react";
import DitherVeil from "@/components/DitherVeil";
import RomanPillar from "@/components/RomanPillars";
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

const OZYMANDIAS = [
  { text: "I met a traveller from an antique land",     top: "15%", left: "4%",  rotate: -3, size: "sm" },
  { text: "Two vast and trunkless legs of stone",       top: "6%",  right: "6%", rotate: 2,  size: "sm" },
  { text: "Near them, on the sand,",                    top: "36%", right: "5%", rotate: -2, size: "xs" },
  { text: "half sunk, a shattered visage lies",         top: "60%", left: "5%",  rotate: 3,  size: "sm" },
  { text: "whose frown, and wrinkled lip",              top: "76%", right: "8%", rotate: -4, size: "xs" },
  { text: "and sneer of cold command",                  top: "28%", left: "6%",  rotate: 1,  size: "xs" },
  { text: "My name is Ozymandias, King of Kings;",      top: "83%", left: "7%",  rotate: -2, size: "md" },
  { text: "Look on my Works, ye Mighty, and despair!",  top: "10%", left: "42%", rotate: 2,  size: "md" },
  { text: "Nothing beside remains.",                    top: "68%", right: "4%", rotate: -1, size: "sm" },
  { text: "Round the decay of that colossal Wreck,",    top: "86%", right: "10%", rotate: 3, size: "xs" },
  { text: "boundless and bare",                         top: "48%", left: "3%",  rotate: -3, size: "xs" },
  { text: "The lone and level sands stretch far away.", top: "92%", left: "40%", rotate: -1, size: "sm" },
];

const TEXT_SIZES: Record<string, string> = {
  xs: "11px",
  sm: "14px",
  md: "18px",
};

export default function Projects() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#fef8f1",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: "url('/wallpapers.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.5,
          pointerEvents: "none",
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

        <section style={{ padding: "2rem" }}>
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "2600px",
              height: "1850px",
              margin: "2rem auto",
            }}
          >
            <DitherVeil
              src="/body.png"
              fit="contain"
              pattern="floyd"
              pixelSize={1.5}
              levels={2}
              palette="duotone"
              inkColor="#fef8f1"
              paperColor="#403b32"
              revealRadius={90}
            />

            {OZYMANDIAS.map((line, i) => (
              <p
                key={i}
                aria-hidden="true"
                style={{
                  position: "absolute",
                  top: line.top,
                  left: (line as any).left,
                  right: (line as any).right,
                  transform: `rotate(${line.rotate}deg)`,
                  fontSize: TEXT_SIZES[line.size],
                  letterSpacing: "0.08em",
                  color: "#403b32",
                  opacity: 0.55,
                  fontStyle: "italic",
                  margin: 0,
                  pointerEvents: "none",
                  userSelect: "none",
                  maxWidth: "220px",
                  lineHeight: 1.4,
                  zIndex: 2,
                }}
              >
                {line.text}
              </p>
            ))}

            <RomanPillar
              label="JUNO"
              height={260}
              style={{ top: "10%", left: "8%", zIndex: 3 }}
              onClick={() => setOpen(PROJECTS.JUNO)}
            />

            <RomanPillar
              label="WAYSTONE"
              height={300}
              style={{ top: "45%", right: "10%", zIndex: 3 }}
              onClick={() => setOpen(PROJECTS.WAYSTONE)}
            />
          </div>
        </section>

        <footer className="site-footer2">
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
      </div>

      <ProjectModal project={open} onClose={() => setOpen(null)} />
    </main>
  );
}