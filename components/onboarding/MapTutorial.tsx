"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const STEPS = [
  {
    icon: "🗺️",
    title: "Bem-vindo ao Mapa do Maroto",
    description:
      "Este não é um portfólio comum. É um mapa vivo — cheio de passagens secretas que só se revelam para quem conhece os feitiços certos.",
    hint: null,
  },
  {
    icon: "🪄",
    title: "A Varinha é sua aliada",
    description:
      "Na parte inferior da tela há um campo de feitiços. Digite um encantamento e pressione Enter para revelar uma seção secreta do mapa.",
    hint: null,
  },
  {
    icon: "📜",
    title: "Os Feitiços do Mapa",
    description: "Cada feitiço revela uma passagem diferente:",
    hint: [
      { spell: "Aparecium", effect: "→ Sobre Mim" },
      { spell: "Revelio", effect: "→ Projetos" },
      { spell: "Specialis Revelio", effect: "→ Habilidades" },
      { spell: "Contacto", effect: "→ Contato" },
      { spell: "Malfeito Feito", effect: "→ Fecha o mapa" },
    ],
  },
  {
    icon: "✨",
    title: "O mapa está pronto",
    description:
      "Comece digitando o primeiro feitiço ou use o menu de navegação. Boa exploração, bruxo.",
    hint: null,
  },
];

interface MapTutorialProps {
  onFinish: () => void;
}

export default function MapTutorial({ onFinish }: MapTutorialProps) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const isLast = step === STEPS.length - 1;
  const current = STEPS[step];

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const slideVariants = {
    initial: (d: number) => ({ opacity: 0, x: d * 36, filter: "blur(4px)" }),
    animate: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.42, ease: "easeOut" } },
    exit: (d: number) => ({ opacity: 0, x: d * -36, filter: "blur(4px)", transition: { duration: 0.28 } }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "var(--bg-overlay)", backdropFilter: "blur(6px)" }}
    >
      {/* Parchment card */}
      <motion.div
        initial={{ scaleY: 0.4, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 1 }}
        exit={{ scaleY: 0.4, opacity: 0 }}
        transition={{ type: "spring", stiffness: 160, damping: 22 }}
        className="relative w-full max-w-md overflow-hidden"
        style={{
          borderRadius: "var(--radius-2xl)",
          background: "linear-gradient(160deg, var(--bg-surface) 0%, var(--bg-raised) 60%, var(--bg-page) 100%)",
          border: "1px solid var(--border-strong)",
          boxShadow: "var(--shadow-raised), var(--shadow-glow-md)",
        }}
      >
        {/* Top ornament bar */}
        <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, var(--border-strong), transparent)" }} />

        {/* Corner runes */}
        {["top-3 left-4", "top-3 right-4", "bottom-3 left-4", "bottom-3 right-4"].map((pos) => (
          <span key={pos} className={`absolute ${pos} select-none`} style={{ color: "var(--border-mid)", fontSize: "18px" }}>✦</span>
        ))}

        <div className="px-8 pt-8 pb-6">
          {/* Step indicator dots */}
          <div className="flex justify-center gap-2 mb-6" role="tablist" aria-label="Passos do tutorial">
            {STEPS.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === step}
                onClick={() => go(i)}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === step ? "1.25rem" : "0.375rem",
                  height: "0.375rem",
                  background: i === step ? "var(--gold)" : "var(--border-mid)",
                  minWidth: "var(--space-3)",
                  minHeight: "var(--space-3)",
                }}
              />
            ))}
          </div>

          {/* Animated step content */}
          <div className="min-h-[220px] flex flex-col items-center justify-start">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="w-full text-center"
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.12, type: "spring", stiffness: 200 }}
                  className="text-5xl mb-4 select-none"
                  aria-hidden="true"
                >
                  {current.icon}
                </motion.div>

                <h2
                  className="font-cinzel font-semibold tracking-wider mb-3"
                  style={{ color: "var(--gold)", fontSize: "var(--text-md)" }}
                >
                  {current.title}
                </h2>

                <p
                  className="font-crimson leading-relaxed mb-4"
                  style={{ color: "var(--ink-body)", fontSize: "var(--text-base)" }}
                >
                  {current.description}
                </p>

                {/* Spell cheat-sheet (step 2) */}
                {current.hint && (
                  <ul className="mt-2 space-y-2 text-left w-fit mx-auto">
                    {current.hint.map(({ spell, effect }) => (
                      <li key={spell} className="flex items-center gap-3">
                        <span
                          className="font-cinzel tracking-widest"
                          style={{ color: "var(--gold)", fontSize: "var(--text-sm)" }}
                        >
                          {spell}
                        </span>
                        <span
                          className="font-crimson"
                          style={{ color: "var(--ink-muted)", fontSize: "var(--text-sm)" }}
                        >
                          {effect}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div
            className="flex items-center justify-between mt-6 pt-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {step > 0 ? (
              <button
                onClick={() => go(step - 1)}
                className="touch-target flex items-center font-cinzel tracking-widest transition-colors"
                style={{ fontSize: "var(--text-xs)", color: "var(--ink-ghost)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-ghost)")}
              >
                ← Anterior
              </button>
            ) : (
              <button
                onClick={onFinish}
                className="touch-target flex items-center font-cinzel tracking-widest transition-colors"
                style={{ fontSize: "var(--text-xs)", color: "var(--ink-faint)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-ghost)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
              >
                Pular
              </button>
            )}

            <button
              onClick={isLast ? onFinish : () => go(step + 1)}
              className="relative font-cinzel tracking-widest rounded-full overflow-hidden group transition-all duration-300"
              style={{
                fontSize: "var(--text-sm)",
                padding: "0.55rem 1.25rem",
                minHeight: "var(--touch-target)",
                background: "rgba(212,168,67,0.10)",
                border: "1px solid var(--border-strong)",
                color: "var(--gold-light)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(212,168,67,0.18)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(212,168,67,0.10)")}
            >
              {isLast ? "✨ Entrar no Mapa" : "Próximo →"}
            </button>
          </div>
        </div>

        {/* Bottom ornament bar */}
        <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, var(--border-strong), transparent)" }} />
      </motion.div>
    </motion.div>
  );
}
