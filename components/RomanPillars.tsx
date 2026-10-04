'use client';

import Image from 'next/image';
import { CSSProperties } from 'react';

type Props = {
  label: string;
  onClick: () => void;
  style?: CSSProperties;
  width?: number;
  height?: number;
};

export default function RomanPillar({
  label,
  onClick,
  style,
  width = 90,
  height = 260,
}: Props) {
  return (
    <button
      onClick={onClick}
      aria-label={`Open ${label}`}
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'transform 200ms ease',
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <Image
        src="/pillars.png"
        alt=""
        width={width}
        height={height}
        priority
        style={{
          display: 'block',
          width,
          height,
          objectFit: 'contain',
          filter: 'drop-shadow(0 6px 16px rgba(0,0,0,0.25))',
          pointerEvents: 'none',
        }}
      />
      <span
        style={{
          marginTop: 8,
          fontSize: 11,
          letterSpacing: '0.18em',
          color: '#403b32',
          fontWeight: 600,
        }}
      >
        {label}
      </span>
    </button>
  );
}