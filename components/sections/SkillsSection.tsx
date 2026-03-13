"use client";
import { motion } from "framer-motion";

const SKILLS = [
  {
    category: "Feitiços de Backend",
    icon: "⚗️",
    items: [
      { name: "Java",  level: 95 },
      { name: "Kotlin",        level: 90 },
      { name: "PHP",    level: 88 },
    ],
  },
  {
    category: "Poções de Banco de Dados",
    icon: "🧪",
    items: [
      { name: "MongoDB", level: 85 },
      { name: "PostgreSQL",  level: 78 },
    ],
  },
  {
    category: "Ingredientes Extras",
    icon: "🌿",
    items: [
      { name: "AWS / Vercel",  level: 82 },
      { name: "Git / CI·CD",  level: 90 },
    ],
  },
];

const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.12 } },
};
const cardVariants = {
  initial: { opacity: 0, y: 28, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.6, ease: "easeOut" } },
};

export default function SkillsSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-7">
        <p className="section-eyebrow mb-1">— Specialis Revelio —</p>
        <h2 className="section-title">Grimório de Feitiços</h2>
      </div>

      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 sm:grid-cols-3 gap-4"
      >
        {SKILLS.map((group) => (
          <motion.div key={group.category} variants={cardVariants} className="map-card p-5">
            {/* Group header */}
            <div className="text-center mb-5">
              <span className="text-3xl block mb-2">{group.icon}</span>
              <h3 className="font-cinzel uppercase"
                  style={{ fontSize: "var(--text-xs)", letterSpacing: "0.18em", color: "var(--ink-muted)" }}>
                {group.category}
              </h3>
            </div>

            <div className="gold-rule mb-4" />

            {/* Skills */}
            <div className="space-y-3.5">
              {group.items.map((skill, si) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-baseline mb-1.5">
                    <span className="font-crimson" style={{ fontSize: "var(--text-base)", color: "var(--ink-body)" }}>
                      {skill.name}
                    </span>
                    <span className="font-cinzel" style={{ fontSize: "var(--text-xs)", color: "var(--ink-muted)" }}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="skill-bar-track">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1.1, ease: "easeOut", delay: 0.3 + si * 0.08 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
