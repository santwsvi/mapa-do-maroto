"use client";
import { ReactNode } from "react";
import MagicParticles from "../animations/MagicParticles";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "var(--bg-deep)" }}>

      {/* ── Ambient vignette — desaturated, subtle warm-cool interplay ── */}
      <div className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%,   rgba(212,168,67,0.03) 0%, transparent 100%),
            radial-gradient(ellipse 60% 40% at 50% 100%, rgba(40,25,12,0.32)   0%, transparent 100%),
            radial-gradient(ellipse 40% 80% at 0%   50%, rgba(0,0,0,0.20)      0%, transparent 100%),
            radial-gradient(ellipse 40% 80% at 100% 50%, rgba(0,0,0,0.20)      0%, transparent 100%)
          `,
        }}
      />

      {/* ── Parchment line texture (very subtle) ── */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.015]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg, transparent, transparent 31px,
            rgba(212,168,67,1) 31px, rgba(212,168,67,1) 32px
          )`,
        }}
      />

      {/* ── Double border frame ── */}
      <div className="absolute inset-4 pointer-events-none z-0 rounded-sm"
           style={{ border: "1px solid var(--border)" }} />
      <div className="absolute inset-[22px] pointer-events-none z-0 rounded-sm"
           style={{ border: "1px solid rgba(212,168,67,0.03)" }} />

      {/* ── Corner ornaments ── */}
      {[
        "top-[14px] left-[14px]",
        "top-[14px] right-[14px]",
        "bottom-[14px] left-[14px]",
        "bottom-[14px] right-[14px]",
      ].map((pos) => (
        <span key={pos}
          className={`absolute ${pos} pointer-events-none select-none z-0`}
          style={{ color: "var(--border-mid)", fontSize: "18px", lineHeight: 1 }}
        >
          ✦
        </span>
      ))}

      {/* ── Magic particles ── */}
      <MagicParticles />

      {/* ── Content ── */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {children}
      </div>
    </div>
  );
}
