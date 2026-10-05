'use client';

import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (project) {
      setRendered(project);
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

  useEffect(() => {
    if (!rendered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [rendered, onClose]);

  if (!rendered) return null;

  const shown = phase === 'in';

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(18, 15, 23, 0.8)',
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
          maxWidth: 680,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          overscrollBehavior: 'contain',
          // Paper look
          background:
            'linear-gradient(180deg, #fef8f1 0%, #f7efe2 100%)',
          color: '#403b32',
          padding: '3rem 2.75rem 3rem',
          boxShadow:
            '0 40px 100px rgba(0,0,0,0.55), inset 0 0 0 1px rgba(64,59,50,0.08)',
          opacity: shown ? 1 : 0,
          transform: shown
            ? 'translateY(0) scale(1) rotate(0deg)'
            : 'translateY(20px) scale(0.97) rotate(-0.4deg)',
          transition: `opacity ${FADE_MS}ms ease, transform ${FADE_MS + 60}ms cubic-bezier(0.16, 1, 0.3, 1)`,
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            width: 32,
            height: 32,
            background: 'transparent',
            border: 'none',
            fontSize: 18,
            cursor: 'pointer',
            color: '#403b32',
            opacity: 0.5,
          }}
        >
          ✕
        </button>

        {/* Eyebrow */}
        <p
          style={{
            fontSize: 10,
            letterSpacing: '0.32em',
            opacity: 0.5,
            margin: 0,
            fontWeight: 600,
          }}
        >
          CHAPTER · {rendered.year}
        </p>

        {/* Big serif title */}
        <h2
          style={{
            margin: '0.5rem 0 0.5rem',
            fontSize: 48,
            fontWeight: 400,
            lineHeight: 1,
            fontFamily: 'Georgia, "Times New Roman", serif',
            letterSpacing: '-0.01em',
          }}
        >
          {rendered.title}
        </h2>

        <p
          style={{
            fontStyle: 'italic',
            margin: '0 0 2rem',
            opacity: 0.6,
            fontSize: 15,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {rendered.tagline}
        </p>

        {/* Divider */}
        <div
          style={{
            height: 1,
            width: 60,
            background: '#403b32',
            opacity: 0.3,
            margin: '0 0 2rem',
          }}
        />

        {/* Image */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 10',
            overflow: 'hidden',
            marginBottom: '2rem',
            background: '#e8e0d2',
            boxShadow: 'inset 0 0 0 1px rgba(64,59,50,0.15)',
          }}
        >
          <Image
            src={rendered.image}
            alt={rendered.title}
            fill
            sizes="(max-width: 680px) 100vw, 680px"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Body */}
        <p
          style={{
            lineHeight: 1.75,
            margin: 0,
            fontSize: 15,
            fontFamily: 'Georgia, "Times New Roman", serif',
          }}
        >
          {rendered.description}
        </p>

        {/* Footer mark */}
        <p
          style={{
            margin: '2.5rem 0 0',
            fontSize: 10,
            letterSpacing: '0.3em',
            opacity: 0.35,
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          LES · THE COLLECTION
        </p>
      </div>
    </div>
  );
}