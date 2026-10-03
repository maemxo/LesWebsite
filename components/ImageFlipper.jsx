'use client';

import { useEffect, useRef, useState } from 'react';

export default function ImageFlipper({
  images = /** @type {string[]} */ ([]),
  interval = 4000,
  alt = '',
  width,
  height,
  className = '',
  fade = 500,
  startOnView = true,
  viewThreshold = 0.15
}) {
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(!startOnView);
  const wrapRef = useRef(null);
  // Track loaded images so we don't swap to one the browser hasn't fetched yet.
  const loadedRef = useRef(new Set());

  // Preload every image once on mount so swaps are instant.
  useEffect(() => {
    images.forEach(src => {
      const img = new window.Image();
      img.onload = () => loadedRef.current.add(src);
      img.src = src;
    });
  }, [images]);

  // Watch the wrapper; only start flipping once it's visible.
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

  // The actual flipper.
  useEffect(() => {
    if (!inView || images.length < 2) return undefined;
    const id = setInterval(() => {
      setIndex(i => (i + 1) % images.length);
    }, interval);
    return () => clearInterval(id);
  }, [inView, images.length, interval]);

  return (
    <span
      ref={wrapRef}
      className={className}
      style={{
        display: 'block',
        width: '100%',
        height: '100%',
        position: 'relative'
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={images[index]}
        alt={alt}
        width={width}
        height={height}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: `opacity ${fade}ms ease`
        }}
      />
    </span>
  );
}