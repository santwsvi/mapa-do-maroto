"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import MagicInput from "@/components/magic-input/MagicInput";
import ClosedMap from "@/components/sections/ClosedMap";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import UnknownSpell from "@/components/sections/UnknownSpell";
import Footprints from "@/components/animations/Footprints";
import MapTutorial from "@/components/onboarding/MapTutorial";

type Section = "closed" | "about" | "projects" | "skills" | "contact" | "unknown";

const SPELL_MAP: Record<string, Section> = {
  "aparecium": "about",
  "revelio": "projects",
  "specialis revelio": "skills",
  "contacto": "contact",
  "malfeito feito": "closed",
};

const NAV_SPELLS = [
  { label: "Sobre Mim", section: "about" as Section },
  { label: "Projetos", section: "projects" as Section },
  { label: "Habilidades", section: "skills" as Section },
  { label: "Contato", section: "contact" as Section },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("closed");
  const [footprintsActive, setFootprintsActive] = useState(false);
  const [pendingSection, setPendingSection] = useState<Section | null>(null);
  const [lastUnknownSpell, setLastUnknownSpell] = useState("");
  const [inputDisabled, setInputDisabled] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);

  // Show tutorial only on first visit
  useEffect(() => {
    const seen = localStorage.getItem("mapa-tutorial-seen");
    if (!seen) setShowTutorial(true);
  }, []);

  const handleTutorialFinish = useCallback(() => {
    setShowTutorial(false);
    localStorage.setItem("mapa-tutorial-seen", "1");
  }, []);

  const revealSection = useCallback((section: Section) => {
    if (section === "about") {
      setFootprintsActive(true);
      setPendingSection(section);
      setInputDisabled(true);
    } else {
      setActiveSection(section);
    }
  }, []);

  const handleFootprintsComplete = useCallback(() => {
    setFootprintsActive(false);
    setPendingSection((pending) => {
      if (pending) setActiveSection(pending);
      return null;
    });
    setInputDisabled(false);
  }, []);

  const handleSpellCast = useCallback(
    (spell: string) => {
      const formatted = spell.toLowerCase().trim();
      const target = SPELL_MAP[formatted];
      if (target) {
        revealSection(target);
      } else {
        setLastUnknownSpell(spell);
        setActiveSection("unknown");
      }
    },
    [revealSection]
  );

  const renderSection = () => {
    switch (activeSection) {
      case "closed":
        return <ClosedMap key="closed" />;
      case "about":
        return <AboutSection key="about" />;
      case "projects":
        return <ProjectsSection key="projects" />;
      case "skills":
        return <SkillsSection key="skills" />;
      case "contact":
        return <ContactSection key="contact" />;
      case "unknown":
        return <UnknownSpell key={`unknown-${lastUnknownSpell}`} spell={lastUnknownSpell} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      {/* ── Onboarding tutorial (first visit only) ── */}
      <AnimatePresence>
        {showTutorial && <MapTutorial onFinish={handleTutorialFinish} />}
      </AnimatePresence>

      {/* Animated footprints overlay for Aparecium */}
      <Footprints active={footprintsActive} onComplete={handleFootprintsComplete} />

      {/* Header */}
      <header
        className="flex items-center justify-between px-5 flex-shrink-0"
        style={{
          height: "var(--touch-target)",
          borderBottom: "1px solid var(--border)",
          paddingTop: "var(--space-2)",
          paddingBottom: "var(--space-2)",
        }}
      >
        <button
          onClick={() => setActiveSection("closed")}
          className="touch-target flex items-center font-cinzel tracking-widest transition-colors"
          style={{
            fontSize: "var(--text-sm)",
            color: activeSection === "closed" ? "var(--gold)" : "var(--ink-ghost)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = activeSection === "closed" ? "var(--gold)" : "var(--ink-ghost)")}
        >
          🗺️&nbsp; O Mapa do Maroto
        </button>

        {/* Mobile help button */}
        <button
          onClick={() => setShowTutorial(true)}
          title="Como usar o mapa"
          aria-label="Abrir tutorial"
          className="touch-target md:hidden flex items-center justify-center font-cinzel rounded-full transition-all duration-200"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--ink-ghost)",
            border: "1px solid var(--border)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-ghost)")}
        >
          ?
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_SPELLS.map(({ label, section }) => (
            <button
              key={section}
              onClick={() => revealSection(section)}
              className="touch-target flex items-center px-3 font-cinzel uppercase rounded-md transition-colors duration-200"
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "0.14em",
                color: activeSection === section ? "var(--gold)" : "var(--ink-muted)",
                background: activeSection === section ? "rgba(212,168,67,0.07)" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (activeSection !== section) e.currentTarget.style.color = "var(--ink-body)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = activeSection === section ? "var(--gold)" : "var(--ink-muted)";
              }}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => setShowTutorial(true)}
            title="Como usar o mapa"
            aria-label="Abrir tutorial"
            className="touch-target flex items-center justify-center ml-1 rounded-full border transition-all duration-200"
            style={{
              width: "var(--touch-target)",
              fontSize: "var(--text-sm)",
              color: "var(--ink-ghost)",
              borderColor: "var(--border)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--gold)";
              e.currentTarget.style.borderColor = "var(--border-mid)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--ink-ghost)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            ?
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8 overflow-y-auto min-h-0">
        <div className="w-full max-w-3xl">
          <AnimatePresence mode="wait">{renderSection()}</AnimatePresence>
        </div>
      </main>

      {/* Footer — spell input */}
      <footer
        className="px-4 py-5 flex-shrink-0"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {activeSection !== "closed" && activeSection !== "unknown" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-3"
          >
            <button
              onClick={() => setActiveSection("closed")}
              className="touch-target inline-flex items-center justify-center font-cinzel tracking-widest transition-colors"
              style={{
                fontSize: "var(--text-xs)",
                color: "var(--ink-faint)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-ghost)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-faint)")}
            >
              ↩ Malfeito Feito — fechar mapa
            </button>
          </motion.div>
        )}
        <MagicInput onSpellCast={handleSpellCast} disabled={inputDisabled} />
      </footer>
    </Layout>
  );
}

