'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  images?: string[];
  interval?: number;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  fade?: number;
  startOnView?: boolean;
  viewThreshold?: number;
};

export default function ImageFlipper({
  images = [],
  interval = 4000,
  alt = '',
  width,
  height,
  className = '',
  fade = 500,
  startOnView = true,
  viewThreshold = 0.15,
}: Props) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(!startOnView);
  const wrapRef = useRef<HTMLSpanElement>(null);
  const loadedRef = useRef(new Set<string>());

  useEffect(() => {
    images.forEach(src => {
      const img = new window.Image();
      img.onload = () => loadedRef.current.add(src);
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (!startOnView) return undefined;
    const el = wrapRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: viewThreshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [startOnView, viewThreshold]);

  useEffect(() => {
    if (!inView || images.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [inView, images.length, interval]);

  if (!images.length) return null;

  return (
    <span
      ref={wrapRef}
      className={className}
      style={{
        display: 'block',
        position: 'relative',
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : 'auto',
        overflow: 'hidden',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt={alt}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: `opacity ${fade}ms ease`,
        }}
      />
    </span>
  );
}