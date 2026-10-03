'use client';

import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Alert02Icon, Loading03Icon, RefreshIcon, Tick02Icon } from '@hugeicons/core-free-icons';
import './RefineFrame.css';

const STAGES = {
  queued: { blur: 4, sat: 0.6, scale: 1.04, opacity: 0.55 },
  generating: { blur: 1.5, sat: 0.8, scale: 1.02, opacity: 0.85 },
  refining: { blur: 0, sat: 0.95, scale: 1.005, opacity: 1 },
  complete: { blur: 0, sat: 1, scale: 1, opacity: 1 },
  error: { blur: 2, sat: 0.5, scale: 1, opacity: 0.28 }
};
const LEVELS = [48, 32, 20, 12, 8, 5, 3, 2, 1];
const EDGE = 28;
const STRIPS = 14;
const DEFAULT_LABELS = {
  queued: 'Queued',
  generating: 'Generating',
  refining: '',
  complete: 'Ready',
  error: 'Failed'
};
const ACTIVE = new Set(['queued', 'generating', 'refining']);

const build = (s, canvas, img, dpr) => {
  const rect = canvas.getBoundingClientRect();
  const W = Math.max(1, Math.round(rect.width * dpr));
  const H = Math.max(1, Math.round(rect.height * dpr));
  const key = `${img.currentSrc || img.src}|${W}x${H}`;
  if (s.key === key && s.levels.length) return;
  s.key = key;
  s.w = W;
  s.h = H;
  canvas.width = W;
  canvas.height = H;
  const iw = img.naturalWidth;
  const ih = img.naturalHeight;
  const cover = Math.max(W / iw, H / ih);
  const sw = W / cover;
  const sh = H / cover;
  const sx = (iw - sw) / 2;
  const sy = (ih - sh) / 2;
  const glint = canvas.getContext('2d')?.createLinearGradient(0, 0, W, 0) ?? null;
  if (glint) {
    for (const [at, a] of [
      [0, 0],
      [0.08, 0.1],
      [0.2, 0.7],
      [0.32, 1],
      [0.68, 1],
      [0.8, 0.7],
      [0.92, 0.1],
      [1, 0]
    ]) {
      glint.addColorStop(at, `rgba(255, 255, 255, ${a})`);
    }
  }
  s.glint = glint;
  s.levels = LEVELS.map(block => {
    const b = block === 1 ? 1 : Math.max(2, Math.round(block * dpr));
    const full = document.createElement('canvas');
    full.width = W;
    full.height = H;
    const fc = full.getContext('2d');
    if (!fc) return full;
    if (b === 1) {
      fc.imageSmoothingEnabled = true;
      fc.imageSmoothingQuality = 'high';
      fc.drawImage(img, sx, sy, sw, sh, 0, 0, W, H);
      return full;
    }
    const small = document.createElement('canvas');
    small.width = Math.max(1, Math.round(W / b));
    small.height = Math.max(1, Math.round(H / b));
    const sc = small.getContext('2d');
    if (sc) {
      sc.imageSmoothingEnabled = true;
      sc.imageSmoothingQuality = 'high';
      sc.drawImage(img, sx, sy, sw, sh, 0, 0, small.width, small.height);
    }
    fc.imageSmoothingEnabled = false;
    fc.drawImage(small, 0, 0, W, H);
    return full;
  });
};

export default function RefineFrame({
  status = 'generating',
  children,
  aspectRatio = '4 / 3',
  width = 320,
  radius = 16,
  background = '#27272a',
  color = '#f5f5f505',
  stageDuration = 1600,
  sweep = true,
  showStatus = true,
  hideAfter = 1200,
  labels = DEFAULT_LABELS,
  retryLabel = 'Retry',
  onRetry,
  className = '',
  startOnView = true,
  viewThreshold = 0.15
}) {
  const stage = STAGES[status] ?? STAGES.generating;
  const active = ACTIVE.has(status);
  const text = { ...DEFAULT_LABELS, ...labels };

  const frameRef = useRef(null);
  const printRef = useRef(null);
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  const runIdRef = useRef(0);
  const live = useRef({});
  live.current = { stageDuration, sweep };

  const [mosaic, setMosaic] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [inView, setInView] = useState(!startOnView);

  const [chip, setChip] = useState(showStatus);
  const timer = useRef(undefined);
  useEffect(() => {
    clearTimeout(timer.current);
    if (!showStatus) {
      setChip(false);
      return undefined;
    }
    setChip(true);
    if (status === 'complete' && hideAfter > 0) {
      timer.current = setTimeout(() => setChip(false), hideAfter);
    }
    return () => clearTimeout(timer.current);
  }, [status, showStatus, hideAfter]);

  // ---- the animation ------------------------------------------------
  const run = img => {
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.naturalWidth) return;

    cancelAnimationFrame(rafRef.current);
    const runId = ++runIdRef.current;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const s = { p: 0, key: '', w: 0, h: 0, levels: [], glint: null };

    build(s, canvas, img, dpr);
    if (!s.levels.length) return;

    setMosaic(true);
    setResolved(false);

    const n = s.levels.length - 1;
    const duration = Math.max(300, live.current.stageDuration);
    const t0 = performance.now();

    const step = now => {
      if (runId !== runIdRef.current) return;

      const elapsed = now - t0;
      const p = Math.min(1, elapsed / duration);
      const L = p * n;
      const i = Math.min(n, Math.floor(L + 1e-6));
      const frac = L - i;

      const ctx = canvas.getContext('2d');
      if (ctx && s.levels[i]) {
        ctx.globalAlpha = 1;
        ctx.drawImage(s.levels[i], 0, 0);
        if (i < n && frac > 0 && s.levels[i + 1]) {
          const edge = EDGE * dpr;
          const front = frac * (s.h + edge) - edge / 2;
          const top = Math.max(0, Math.floor(front - edge / 2));
          if (top > 0) ctx.drawImage(s.levels[i + 1], 0, 0, s.w, top, 0, 0, s.w, top);
          const sh = edge / STRIPS;
          for (let k = 0; k < STRIPS; k += 1) {
            const y = front - edge / 2 + k * sh;
            if (y + sh <= 0 || y >= s.h) continue;
            const t = 1 - (k + 0.5) / STRIPS;
            ctx.globalAlpha = t * t * (3 - 2 * t);
            const y0 = Math.max(0, y);
            const h0 = Math.min(s.h, y + sh) - y0;
            if (h0 > 0) ctx.drawImage(s.levels[i + 1], 0, y0, s.w, h0, 0, y0, s.w, h0);
          }
          ctx.globalAlpha = 1;
          if (live.current.sweep && s.glint && front > 0 && front < s.h) {
            ctx.fillStyle = s.glint;
            ctx.globalAlpha = 0.12;
            ctx.fillRect(0, front - 2 * dpr, s.w, 4 * dpr);
            ctx.globalAlpha = 0.3;
            ctx.fillRect(0, front - dpr, s.w, 2 * dpr);
            ctx.globalAlpha = 1;
          }
        }
      }

      if (p >= 1) {
        setMosaic(false);
        setResolved(true);
        rafRef.current = 0;
        return;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
  };

  // ---- start when in view + image ready ----------------------------
  // This effect reads the actual <img> DOM node out of the print wrapper,
  // so it works whether the child is a plain <img> or next/image.
  useEffect(() => {
    if (!inView) return undefined;

    let gone = false;
    let interval = 0;

    const go = () => {
      if (gone) return true;
      const print = printRef.current;
      if (!print) return false;
      const img = print.querySelector('img');
      if (!img || !img.naturalWidth) return false;
      run(img);
      return true;
    };

    if (go()) return () => { gone = true; cancelAnimationFrame(rafRef.current); };

    interval = setInterval(() => {
      if (go()) clearInterval(interval);
    }, 80);

    return () => {
      gone = true;
      clearInterval(interval);
      cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, children]);

  // ---- viewport observer -------------------------------------------
  useEffect(() => {
    if (!startOnView) return undefined;
    const el = frameRef.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    let fired = false;
    const io = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            fired = true;
            setInView(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: viewThreshold }
    );
    io.observe(el);
    const fallback = setTimeout(() => {
      if (!fired) setInView(true);
    }, 6000);
    return () => {
      io.disconnect();
      clearTimeout(fallback);
    };
  }, [startOnView, viewThreshold]);

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <div
      ref={frameRef}
      className={`refine-frame${className ? ` ${className}` : ''}`}
      role="img"
      aria-label={text[status] ?? status}
      aria-busy={active || undefined}
      data-status={status}
      data-active={active ? '' : undefined}
      data-sweep={sweep && active && !resolved ? '' : undefined}
      data-mosaic={mosaic ? '' : undefined}
      style={{
        '--rf-w': `${width}px`,
        '--rf-aspect': aspectRatio,
        '--rf-radius': `${radius}px`,
        '--rf-bg': background,
        '--rf-ink': color,
        '--rf-stage': `${stageDuration}ms`,
        '--rf-blur': `${mosaic ? 0 : stage.blur}px`,
        '--rf-sat': stage.sat,
        '--rf-scale': mosaic ? 1 : stage.scale,
        '--rf-opacity': mosaic ? 1 : stage.opacity
      }}
    >
      <div className="refine-frame__media" aria-hidden="true">
        <div ref={printRef} className="refine-frame__print">
          {children}
        </div>
        <canvas ref={canvasRef} className="refine-frame__mosaic" />
      </div>
      <div className="refine-frame__sweep" aria-hidden="true" />
      {chip ? (
        <div className="refine-frame__chip" aria-hidden="true">
          <span className="refine-frame__mark" data-kind={active ? 'spin' : status}>
            {status === 'complete' ? (
              <HugeiconsIcon icon={Tick02Icon} size={13} strokeWidth={2.5} />
            ) : status === 'error' ? (
              <HugeiconsIcon icon={Alert02Icon} size={13} strokeWidth={2.2} />
            ) : (
              <HugeiconsIcon icon={Loading03Icon} size={13} strokeWidth={2.2} />
            )}
          </span>
          <span key={status} className="refine-frame__label">
            {text[status] ?? status}
          </span>
        </div>
      ) : null}
      {status === 'error' && onRetry ? (
        <button type="button" className="refine-frame__retry" onClick={onRetry}>
          <HugeiconsIcon icon={RefreshIcon} size={14} strokeWidth={2.2} />
          <span>{retryLabel}</span>
        </button>
      ) : null}
      <span className="refine-frame__sr" role="status">
        {text[status] ?? status}
      </span>
    </div>
  );
}