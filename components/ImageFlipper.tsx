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
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const loadedRef = useRef(new Map<string, HTMLImageElement>());

  useEffect(() => {
    images.forEach(src => {
      if (loadedRef.current.has(src)) return;
      const img = new window.Image();
      img.onload = () => {
        loadedRef.current.set(src, img);
        if (src === images[index]) drawLeak(img);
      };
      img.src = src;
    });
  }, [images, index]);

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

  function drawLeak(img: HTMLImageElement) {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const rect = wrap.getBoundingClientRect();
    const w = Math.max(1, Math.round(rect.width));
    const h = Math.max(1, Math.round(rect.height));
    const bleed = Math.max(85, Math.round(Math.min(w, h) * 0.34));
    const dpr = window.devicePixelRatio || 1;
    const canvasW = w + bleed * 2;
    const canvasH = h + bleed * 2;

    canvas.width = canvasW * dpr;
    canvas.height = canvasH * dpr;
    canvas.style.width = `${canvasW}px`;
    canvas.style.height = `${canvasH}px`;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, canvasW, canvasH);
    ctx.imageSmoothingEnabled = true;

    const sourceRatio = img.naturalWidth / img.naturalHeight;
    const targetRatio = w / h;
    let sx = 0;
    let sy = 0;
    let sw = img.naturalWidth;
    let sh = img.naturalHeight;

    if (sourceRatio > targetRatio) {
      sw = img.naturalHeight * targetRatio;
      sx = (img.naturalWidth - sw) / 2;
    } else {
      sh = img.naturalWidth / targetRatio;
      sy = (img.naturalHeight - sh) / 2;
    }

    const ox = bleed;
    const oy = bleed;
    let seed = (index + 1) * 7919;

    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const drawStreak = (
      side: 'top' | 'bottom' | 'left' | 'right',
      position: number,
      length: number,
      thickness: number,
      alpha: number,
      sourceSpan: number
    ) => {
      const horizontal = side === 'left' || side === 'right';
      const center = horizontal ? oy + position * h : ox + position * w;


      const streakCanvas = document.createElement('canvas');
      const streakCtx = streakCanvas.getContext('2d');
      if (!streakCtx) return;

      streakCanvas.width = Math.ceil(horizontal ? length : thickness);
      streakCanvas.height = Math.ceil(horizontal ? thickness : length);
      streakCtx.clearRect(0, 0, streakCanvas.width, streakCanvas.height);

      const gradient = horizontal
        ? streakCtx.createLinearGradient(0, 0, length, 0)
        : streakCtx.createLinearGradient(0, 0, 0, length);

      if (side === 'left' || side === 'top') {
        gradient.addColorStop(0, 'rgba(255,255,255,0)');
        gradient.addColorStop(0.72, `rgba(255,255,255,${alpha * 0.45})`);
        gradient.addColorStop(1, 'rgba(255,255,255,1)');
      } else {
        gradient.addColorStop(0, 'rgba(255,255,255,1)');
        gradient.addColorStop(0.28, `rgba(255,255,255,${alpha * 0.45})`);
        gradient.addColorStop(1, 'rgba(255,255,255,0)');
      }

      streakCtx.save();
      streakCtx.globalAlpha = 1;
      if (side === 'top' || side === 'bottom') {
        const sourceX = sx + position * sw;
        const sourceW = Math.max(1, sw * sourceSpan);
        const sourceY = side === 'top' ? sy : sy + sh - Math.max(1, sh * sourceSpan * 0.9);
        streakCtx.drawImage(
          img,
          sourceX,
          sourceY,
          sourceW,
          Math.max(1, sh * sourceSpan * 0.9),
          0,
          0,
          thickness,
          length
        );
      } else {
        const sourceY = sy + position * sh;
        const sourceH = Math.max(1, sh * sourceSpan);
        const sourceX = side === 'left' ? sx : sx + sw - Math.max(1, sw * sourceSpan * 0.9);
        streakCtx.drawImage(
          img,
          sourceX,
          sourceY,
          Math.max(1, sw * sourceSpan * 0.9),
          sourceH,
          0,
          0,
          length,
          thickness
        );
      }

      streakCtx.globalCompositeOperation = 'destination-in';
      streakCtx.fillStyle = gradient;
      streakCtx.fillRect(0, 0, streakCanvas.width, streakCanvas.height);
      streakCtx.restore();

      ctx.save();
      ctx.globalAlpha = alpha;
      if (horizontal) {
        ctx.drawImage(
          streakCanvas,
          side === 'left' ? ox - length : ox + w,
          center - thickness / 2
        );
      } else {
        ctx.drawImage(
          streakCanvas,
          center - thickness / 2,
          side === 'top' ? oy - length : oy + h
        );
      }
      ctx.restore();
    };

    const drawSide = (side: 'top' | 'bottom' | 'left' | 'right', count: number) => {
      for (let i = 0; i < count; i++) {
        const position = Math.min(0.98, Math.max(0.02, random()));
        const length = 18 + Math.pow(random(), 2.2) * bleed * 1.8;
        const thickness = 1 + Math.pow(random(), 2.5) * Math.min(8, Math.max(3, Math.min(w, h) * 0.018));
        const alpha = 0.16 + Math.pow(random(), 1.5) * 0.5;
        const sourceSpan = 0.002 + Math.pow(random(), 2) * 0.025;
        drawStreak(side, position, length, thickness, alpha, sourceSpan);
      }
    };

    ctx.clearRect(0, 0, canvasW, canvasH);
    drawSide('top', 52);
    drawSide('bottom', 52);
    drawSide('left', 42);
    drawSide('right', 42);

    ctx.globalAlpha = 1;
  }

  useEffect(() => {
    const img = loadedRef.current.get(images[index]);
    if (!img) return;
    drawLeak(img);
  }, [index, images]);

  useEffect(() => {
    const handleResize = () => {
      const img = loadedRef.current.get(images[index]);
      if (img) drawLeak(img);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [index, images]);

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
        overflow: 'visible',
      }}
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <img
        src={images[index]}
        alt={alt}
        style={{
          position: 'relative',
          zIndex: 1,
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
