'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export type Project = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  year: string;
};

type Props = {
  project: Project | null;
  onClose: () => void;
};

const FADE_MS = 260;

export default function ProjectModal({ project, onClose }: Props) {
  const [rendered, setRendered] = useState<Project | null>(project);
  const [phase, setPhase] = useState<'in' | 'out'>('in');
  const overlayRef = useRef<HTMLDivElement>(null);

  // Enter / exit handling
  useEffect(() => {
    if (project) {
      setRendered(project);
      // Reset to 'out' first so the enter animation actually plays
      setPhase('out');
      const raf = requestAnimationFrame(() => setPhase('in'));
      return () => cancelAnimationFrame(raf);
    } else if (rendered) {
      setPhase('out');
      const t = setTimeout(() => setRendered(null), FADE_MS);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [project, rendered]);

  // Lock page scroll while modal is open (block wheel/touch on overlay)
  useEffect(() => {
    if (!rendered) return;

    const el = overlayRef.current;
    if (!el) return;

    // Prevent wheel/touch from reaching the page behind
    const blockWheel = (e: WheelEvent) => {
      // Allow scrolling inside the modal panel
      const panel = el.firstElementChild as HTMLElement | null;
      if (panel && panel.contains(e.target as Node)) return;
      e.preventDefault();
    };
    const blockTouch = (e: TouchEvent) => {
      const panel = el.firstElementChild as HTMLElement | null;
      if (panel && panel.contains(e.target as Node)) return;
      e.preventDefault();
    };

    window.addEventListener('wheel', blockWheel, { passive: false });
    window.addEventListener('touchmove', blockTouch, { passive: false });

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    return () => {
      window.removeEventListener('wheel', blockWheel);
      window.removeEventListener('touchmove', blockTouch);
      window.removeEventListener('keydown', onKey);
    };
  }, [rendered, onClose]);

  if (!rendered) return null;

  const shown = phase === 'in';

  return (
    <div
      ref={overlayRef}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(18, 15, 23, 0.78)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '2rem',
        opacity: shown ? 1 : 0,
        transition: `opacity ${FADE_MS}ms ease`,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        style={{
          position: 'relative',
          maxWidth: 720,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          background: '#fef8f1',
          color: '#403b32',
          padding: '2.5rem 2.75rem 2.75rem',
          boxShadow: '0 30px 100px rgba(0,0,0,0.55)',
          opacity: shown ? 1 : 0,
          transform: shown ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
          transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS + 40}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            width: 36,
            height: 36,
            background: 'transparent',
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            color: '#403b32',
            opacity: 0.6,
          }}
        >
          ✕
        </button>

        <p style={{ fontSize: 11, letterSpacing: '0.22em', opacity: 0.55, margin: 0, fontWeight: 600 }}>
          PROJECT · {rendered.year}
        </p>

        <h2 style={{ margin: '0.5rem 0 0.35rem', fontSize: 44, fontWeight: 500, lineHeight: 1 }}>
          {rendered.title}
        </h2>

        <p style={{ fontStyle: 'italic', margin: '0 0 1.75rem', opacity: 0.7, fontSize: 16 }}>
          {rendered.tagline}
        </p>

        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            overflow: 'hidden',
            marginBottom: '1.75rem',
            background: '#e8e0d2',
          }}
        >
          <Image
            src={rendered.image}
            alt={rendered.title}
            fill
            sizes="(max-width: 720px) 100vw, 720px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div style={{ height: 1, background: '#403b32', opacity: 0.15, margin: '0 0 1.5rem' }} />

        <p style={{ lineHeight: 1.7, margin: 0, fontSize: 15, opacity: 0.85 }}>
          {rendered.description}
        </p>
      </div>
    </div>
  );
}