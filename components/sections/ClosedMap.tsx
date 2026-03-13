"use client";
import { motion } from "framer-motion";

const WORDS = ["Juro", "solenemente", "não", "fazer", "nada", "de", "bom"];

export default function ClosedMap() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.8 }}
      className="text-center px-4 py-6 select-none"
    >
      {/* ── Seal ── */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotate: -12 }}
        animate={{ scale: 1,   opacity: 1, rotate: 0 }}
        transition={{ duration: 1.1, ease: [0.34, 1.56, 0.64, 1], delay: 0.1 }}
        className="relative inline-flex items-center justify-center mb-10"
      >
        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full animate-pulse-gold"
          style={{
            background: "radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)",
            transform: "scale(2.4)",
          }}
        />
        <span style={{ fontSize: "88px", lineHeight: 1 }}>🗺️</span>
      </motion.div>

      {/* ── Title — word by word, shimmer on last word ── */}
      <div className="flex flex-wrap justify-center gap-x-[0.45em] gap-y-1 mb-5">
        {WORDS.map((word, wi) => (
          <motion.span
            key={wi}
            initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0,  filter: "blur(0px)" }}
            transition={{ delay: 0.5 + wi * 0.11, duration: 0.55, ease: "easeOut" }}
            className={`font-cinzel text-2xl md:text-[2rem] leading-tight tracking-wider ${
              wi === WORDS.length - 1 ? "shimmer-text" : ""
            }`}
            style={wi === WORDS.length - 1 ? {} : { color: "var(--gold)" }}
          >
            {word}
          </motion.span>
        ))}
      </div>

      {/* ── Divider ── */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1,  opacity: 1 }}
        transition={{ delay: 1.4, duration: 1, ease: "easeOut" }}
        className="gold-rule w-56 mx-auto mb-5"
      />

      {/* ── Subtitle ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.9 }}
        className="font-crimson text-lg italic mb-1"
        style={{ color: "var(--ink-muted)" }}
      >
        — O Mapa do Maroto —
      </motion.p>

      {/* ── Portfólio label ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="font-cinzel uppercase mt-1"
        style={{
          fontSize: "var(--text-xs)",
          letterSpacing: "0.25em",
          color: "var(--ink-ghost)",
        }}
      >
        Portfólio de Victor Gabriel · Engenheiro de Software
      </motion.p>

      {/* ── Call to action — reduced delay from 3.3s → 2.0s ── */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="mt-10 flex flex-col items-center gap-2"
      >
        <span
          className="font-cinzel uppercase"
          style={{
            fontSize: "var(--text-xs)",
            letterSpacing: "0.2em",
            color: "var(--ink-ghost)",
          }}
        >
          Use o campo abaixo e lance um feitiço
        </span>
        {/* Animated arrow */}
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          style={{ color: "var(--gold-dim)", fontSize: "18px" }}
        >
          ↓
        </motion.span>
      </motion.div>
    </motion.div>
  );
}
