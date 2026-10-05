'use client';

import { useState } from 'react';

type Book = {
  id: string;
  title: string;
  color: string;
  width: number;
  height: number;
};

type Props = {
  books: Book[];
  onSelect: (id: string) => void;
};

export default function Bookshelf({ books, onSelect }: Props) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        // Outer wooden frame of the bookcase
        background: `linear-gradient(180deg, #5a3d24 0%, #4a3018 45%, #38210f 100%)`,
        padding: "18px 18px 22px",
        borderRadius: 4,
        boxShadow: `
          inset 0 2px 0 rgba(255,210,160,0.1),
          inset 0 -3px 0 rgba(0,0,0,0.5),
          0 20px 50px rgba(0,0,0,0.45)
        `,
        position: "relative",
      }}
    >
      {/* Wood grain overlay on the frame */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 4,
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent 0px, transparent 90px,
            rgba(0,0,0,0.12) 90px, rgba(0,0,0,0.12) 91px,
            transparent 91px, transparent 180px,
            rgba(255,200,150,0.05) 180px, rgba(255,200,150,0.05) 181px
          )`,
          pointerEvents: "none",
          opacity: 0.7,
        }}
      />

      {/* Interior cavity */}
      <div
        style={{
          position: "relative",
          background: "linear-gradient(180deg, #1a0f05 0%, #26170a 100%)",
          padding: "16px 24px",
          boxShadow: "inset 0 4px 20px rgba(0,0,0,0.85), inset 0 -4px 12px rgba(0,0,0,0.6)",
        }}
      >
        {/* Shelf interior backdrop — subtle back panel wood */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              90deg,
              rgba(0,0,0,0.15) 0px, rgba(0,0,0,0.15) 1px,
              transparent 1px, transparent 60px
            )`,
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* Books row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            gap: 0,
            minHeight: 340,
            position: "relative",
            paddingBottom: "6px",
          }}
        >
          {books.map((book) => {
            const isHovered = hovered === book.id;
            return (
              <button
                key={book.id}
                onClick={() => onSelect(book.id)}
                onMouseEnter={() => setHovered(book.id)}
                onMouseLeave={() => setHovered(null)}
                aria-label={`Open ${book.title}`}
                style={{
                  position: "relative",
                  width: book.width,
                  height: book.height,
                  padding: 0,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  transform: isHovered
                    ? "translateY(-22px) rotate(-2.5deg)"
                    : "translateY(0) rotate(0)",
                  transformOrigin: "bottom center",
                  transition:
                    "transform 340ms cubic-bezier(0.16, 1, 0.3, 1), filter 340ms ease",
                  zIndex: isHovered ? 20 : 1,
                  filter: isHovered
                    ? "drop-shadow(0 20px 26px rgba(0,0,0,0.7))"
                    : "drop-shadow(0 2px 3px rgba(0,0,0,0.5))",
                }}
              >
                <div style={{ position: "relative", width: "100%", height: "100%" }}>
                  {/* Spine */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 2,
                      background: `linear-gradient(
                        to right,
                        ${shade(book.color, -55)} 0%,
                        ${shade(book.color, -20)} 12%,
                        ${shade(book.color, 20)} 45%,
                        ${shade(book.color, 10)} 60%,
                        ${shade(book.color, -20)} 88%,
                        ${shade(book.color, -55)} 100%
                      )`,
                      overflow: "hidden",
                      boxShadow:
                        "inset 0 0 0 1px rgba(0,0,0,0.4), inset 0 -8px 14px rgba(0,0,0,0.5), inset 0 8px 14px rgba(255,255,255,0.05)",
                    }}
                  >
                    {/* Paper grain */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `repeating-linear-gradient(
                          90deg,
                          rgba(255,255,255,0.05) 0px,
                          rgba(255,255,255,0.05) 1px,
                          rgba(0,0,0,0.06) 1px,
                          rgba(0,0,0,0.06) 2px
                        )`,
                        mixBlendMode: "overlay",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Cloth speckle */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage: `radial-gradient(circle at 30% 40%, rgba(255,255,255,0.07) 0%, transparent 1.5%),
                                          radial-gradient(circle at 70% 20%, rgba(0,0,0,0.09) 0%, transparent 1.2%),
                                          radial-gradient(circle at 45% 75%, rgba(255,255,255,0.05) 0%, transparent 1.3%),
                                          radial-gradient(circle at 80% 60%, rgba(0,0,0,0.07) 0%, transparent 1.4%)`,
                        backgroundSize: "24px 24px, 36px 36px, 30px 30px, 42px 42px",
                        pointerEvents: "none",
                      }}
                    />

                    {/* Top + bottom gold bands */}
                    <div
                      style={{
                        position: "absolute",
                        top: 14, left: 4, right: 4, height: 2,
                        background: "linear-gradient(to right, rgba(180,140,70,0.15), rgba(230,190,110,0.9), rgba(180,140,70,0.15))",
                        boxShadow: "0 0 4px rgba(212,175,100,0.4)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 14, left: 4, right: 4, height: 2,
                        background: "linear-gradient(to right, rgba(180,140,70,0.15), rgba(230,190,110,0.9), rgba(180,140,70,0.15))",
                        boxShadow: "0 0 4px rgba(212,175,100,0.4)",
                      }}
                    />

                    {/* Headbands top/bottom */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 7, background: "linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)" }} />
                    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 7, background: "linear-gradient(to top, rgba(0,0,0,0.6), transparent)" }} />

                    {/* Title */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                      }}
                    >
                      <span
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                          fontSize: book.width < 40 ? 8 : 10,
                          letterSpacing: "0.28em",
                          color: "rgba(240, 228, 205, 0.95)",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          padding: "2rem 0",
                          textTransform: "uppercase",
                          textShadow: "0 1px 0 rgba(0,0,0,0.75), 0 -1px 0 rgba(255,255,255,0.06)",
                          userSelect: "none",
                          fontFamily: "Georgia, 'Times New Roman', serif",
                        }}
                      >
                        {book.title}
                      </span>
                    </div>

                    {/* Right edge depth */}
                    <div style={{ position: "absolute", top: 0, bottom: 0, right: 0, width: 5, background: "linear-gradient(to right, transparent, rgba(0,0,0,0.55))", pointerEvents: "none" }} />

                    {/* Left edge highlight */}
                    <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 2, background: "linear-gradient(to right, rgba(255,255,255,0.14), transparent)", pointerEvents: "none" }} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom shelf board (inside the case, under the books) */}
      <div
        aria-hidden="true"
        style={{
          position: "relative",
          height: 16,
          marginTop: -6,
          background: `linear-gradient(180deg, #6b4a2e 0%, #4a3018 55%, #2a1809 100%)`,
          boxShadow: `
            inset 0 1px 0 rgba(255,220,170,0.15),
            inset 0 -2px 0 rgba(0,0,0,0.6),
            0 10px 20px rgba(0,0,0,0.55)
          `,
        }}
      >
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent 0px, transparent 60px,
              rgba(0,0,0,0.18) 60px, rgba(0,0,0,0.18) 61px,
              transparent 61px, transparent 150px,
              rgba(255,200,150,0.05) 150px, rgba(255,200,150,0.05) 151px
            )`,
            pointerEvents: "none",
          }}
        />
      </div>
    </div>
  );
}

function shade(hex: string, amt: number) {
  const h = hex.replace('#', '');
  const full = h.length === 3 ? h.replace(/./g, (c) => c + c) : h;
  const n = parseInt(full, 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 0xff) + amt));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 0xff) + amt));
  const b = Math.max(0, Math.min(255, (n & 0xff) + amt));
  return `rgb(${r}, ${g}, ${b})`;
}