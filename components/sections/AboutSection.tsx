"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

const sectionVariants = {
  initial: { opacity: 0, y: 28, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: "easeOut" } },
  exit:    { opacity: 0, y: -16, filter: "blur(8px)", transition: { duration: 0.4 } },
};

function Counter({ to, delay = 0 }: { to: number; delay?: number }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(count, to, { duration: 1.6, delay, ease: "easeOut" });
    return controls.stop;
  }, [count, to, delay]);

  return <motion.span>{rounded}</motion.span>;
}

export default function AboutSection() {
  return (
    <motion.div
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full max-w-2xl mx-auto"
    >
      <div className="map-card p-7 md:p-9">

        {/* ── Header ── */}
        <div className="text-center mb-7">
          {/* Avatar ring */}
          <div className="relative inline-flex items-center justify-center mb-5">
            <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl select-none"
              style={{
                background: "radial-gradient(circle at 35% 35%, var(--bg-surface), var(--bg-card))",
                border: "1px solid var(--border-mid)",
                boxShadow: "0 0 24px rgba(212,168,67,0.10), inset 0 1px 0 rgba(212,168,67,0.06)",
              }}>
              🧙
            </div>
            {/* Online indicator */}
            <span className="absolute bottom-1 right-1 w-3 h-3 rounded-full border-2"
              style={{ background: "var(--success)", borderColor: "var(--bg-deep)" }} />
          </div>

          <p className="section-eyebrow mb-1">— Revelado pelo feitiço Aparecium —</p>
          <h2 className="section-title">Victor Gabriel</h2>
          <p className="font-crimson mt-1.5" style={{ color: "var(--ink-muted)", fontSize: "1.05rem" }}>
            Engenheiro de Software
          </p>

          {/* Tags */}
          <div className="flex flex-wrap justify-center gap-2 mt-3">
            {["Java", "Kotlin", "PHP", "PostgreSQL", "MongoDB"].map((tag) => (
              <span key={tag} className="badge">✦ {tag}</span>
            ))}
          </div>
        </div>

        <div className="gold-rule mb-6" />

        {/* ── Bio ── */}
        <div className="space-y-4 font-crimson"
             style={{ fontSize: "var(--text-base)", lineHeight: 1.75, color: "var(--ink-body)" }}>
          <p>
            Sou um desenvolvedor capactiado para criar experiências digitais que{" "}
            <span style={{ color: "var(--gold)" }}>cumprem seu propósito,</span> — tal como uma poção
            bem elaborada no laboratório de Snape.
          </p>
          <p>
          </p>
        </div>

        <div className="gold-rule mt-6 mb-6" />

        {/* ── Stats ── */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { label: "Anos de Feitiçaria", to: 3,  suffix: "+" },
            { label: "Projetos Lançados",  to: 2, suffix: "+" },
            { label: "Clientes Felizes",   to: 2, suffix: "+" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.12, duration: 0.5 }}
            >
              <div className="font-cinzel font-bold text-2xl" style={{ color: "var(--gold)" }}>
                <Counter to={stat.to} delay={0.6 + i * 0.12} />{stat.suffix}
              </div>
              <div className="font-cinzel mt-1" style={{ fontSize: "var(--text-xs)", letterSpacing: "0.12em", color: "var(--ink-ghost)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
