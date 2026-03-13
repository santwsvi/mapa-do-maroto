"use client";
import { motion } from "framer-motion";

export default function UnknownSpell({ spell }: { spell: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
      animate={{ opacity: 1, scale: 1,   filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="text-center px-4 py-10"
    >
      {/* Animated explosion */}
      <motion.div
        animate={{ rotate: [0, -8, 8, -4, 0], scale: [1, 1.2, 0.95, 1.05, 1] }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="text-5xl mb-5 select-none"
        aria-hidden="true"
      >
        💥
      </motion.div>

      <p
        className="font-cinzel mb-2"
        style={{ color: "var(--danger)", fontSize: "var(--text-base)", letterSpacing: "0.14em" }}
      >
        Feitiço Desconhecido!
      </p>

      {spell && (
        <p className="font-crimson italic mb-4"
           style={{ color: "var(--ink-body)", fontSize: "var(--text-md)" }}>
          &ldquo;{spell}&rdquo; não consta no Grimório do Maroto.
        </p>
      )}

      <div className="gold-rule w-40 mx-auto mb-5" />

      <p
        className="font-cinzel"
        style={{ fontSize: "var(--text-xs)", letterSpacing: "0.18em", color: "var(--ink-ghost)" }}
      >
        Tente um dos feitiços válidos:
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {["Aparecium", "Revelio", "Specialis Revelio", "Contacto", "Malfeito Feito"].map((s) => (
          <span key={s} className="badge">✦ {s}</span>
        ))}
      </div>
    </motion.div>
  );
}
