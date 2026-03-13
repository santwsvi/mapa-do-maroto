"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiExternalLink, FiGithub, FiStar } from "react-icons/fi";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
}

const FALLBACK: Repo[] = [
  { id: 1, name: "mapa-do-maroto", description: "Portfólio interativo inspirado no Mapa do Maroto — SPA em Next.js com feitiços e animações mágicas.", html_url: "https://github.com/", homepage: null, stargazers_count: 8,  language: "TypeScript" },
  { id: 2, name: "potion-api",     description: "API RESTful com autenticação JWT, rate-limiting e documentação Swagger automática.", html_url: "https://github.com/", homepage: null, stargazers_count: 21, language: "C" },
  { id: 3, name: "sorting-hat-ml", description: "Modelo NLP que classifica texto em 'casas' por estilo de escrita — acurácia de 87%.", html_url: "https://github.com/", homepage: null, stargazers_count: 34, language: "C" },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: "#3178c6", JavaScript: "#f0c040", Python: "#4b8fc9",
  "Node.js": "#68a063", Rust: "#ce7a4e", Go: "#00add8", CSS: "#663399",
};

const containerVariants = {
  initial: {},
  animate: { transition: { staggerChildren: 0.09 } },
};
const cardVariants = {
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.55, ease: "easeOut" } },
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Repo[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/victor-gabriel/repos?sort=stars&per_page=6")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data: Repo[]) => setProjects(Array.isArray(data) && data.length ? data.slice(0, 6) : FALLBACK))
      .catch(() => setProjects(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-7">
        <p className="section-eyebrow mb-1">— Revelio —</p>
        <h2 className="section-title">Passagens Secretas</h2>
      </div>

      {loading ? (
        <div className="text-center py-16 font-cinzel animate-pulse-gold"
             style={{ color: "var(--ink-ghost)", fontSize: "var(--text-xs)", letterSpacing: "0.18em" }}>
          Consultando o Registro de Feitiços...
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {projects.map((p) => (
            <motion.div
              key={p.id}
              variants={cardVariants}
              className="map-card map-card-interactive p-5 group"
            >
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-cinzel text-sm tracking-wide leading-snug"
                    style={{ color: "var(--gold-light)" }}>
                  📜 {p.name}
                </h3>
                  <div className="flex items-center gap-1 flex-shrink-0"
                     style={{ color: "var(--ink-muted)", fontSize: "var(--text-sm)" }}>
                  <FiStar size={11} />
                  <span className="font-cinzel" style={{ fontSize: "var(--text-xs)" }}>{p.stargazers_count}</span>
                </div>
              </div>

              {/* Description */}
              <p className="font-crimson leading-relaxed mb-4 min-h-[3rem]"
                 style={{ fontSize: "0.95rem", color: "var(--ink-muted)" }}>
                {p.description ?? "Uma passagem secreta ainda por documentar..."}
              </p>

              <div className="gold-rule mb-3" />

              {/* Footer */}
              <div className="flex items-center justify-between">
                {p.language ? (
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ background: LANG_COLORS[p.language] ?? "var(--gold)" }} />
                    <span className="font-cinzel" style={{ fontSize: "var(--text-xs)", color: "var(--ink-muted)" }}>
                      {p.language}
                    </span>
                  </div>
                ) : <span />}

                <div className="flex items-center gap-3">
                  <a href={p.html_url} target="_blank" rel="noopener noreferrer"
                     className="touch-target flex items-center justify-center transition-colors duration-200"
                     style={{ color: "var(--ink-muted)" }}
                     onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                     onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}>
                    <FiGithub size={15} />
                  </a>
                  {p.homepage && (
                    <a href={p.homepage} target="_blank" rel="noopener noreferrer"
                       className="touch-target flex items-center justify-center transition-colors duration-200"
                       style={{ color: "var(--ink-muted)" }}
                       onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
                       onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}>
                      <FiExternalLink size={15} />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}
