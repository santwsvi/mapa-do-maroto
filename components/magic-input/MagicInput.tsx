"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPELLS = ["Aparecium", "Revelio", "Specialis Revelio", "Contacto", "Malfeito Feito"];

interface MagicInputProps {
  onSpellCast: (spell: string) => void;
  disabled?: boolean;
}

export default function MagicInput({ onSpellCast, disabled }: MagicInputProps) {
  const [value, setValue]             = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [highlighted, setHighlighted] = useState(-1);
  const [shaking, setShaking]         = useState(false);
  const [casting, setCasting]         = useState(false);
  const inputRef                      = useRef<HTMLInputElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  const getSuggestions = (val: string) =>
    val.trim().length > 0
      ? SPELLS.filter((s) => s.toLowerCase().startsWith(val.toLowerCase()))
      : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    setSuggestions(getSuggestions(val));
    setHighlighted(-1);
  };

  const castSpell = useCallback((spell: string) => {
    const trimmed = spell.trim();
    if (!trimmed || casting) return;
    const isValid = SPELLS.some((s) => s.toLowerCase() === trimmed.toLowerCase());
    if (!isValid) {
      setShaking(true);
      setTimeout(() => setShaking(false), 500);
    } else {
      setCasting(true);
      setTimeout(() => setCasting(false), 700);
    }
    onSpellCast(trimmed);
    setValue("");
    setSuggestions([]);
    setHighlighted(-1);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, [casting, onSpellCast]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter") {
      highlighted >= 0 && suggestions[highlighted]
        ? castSpell(suggestions[highlighted])
        : castSpell(value);
    } else if (e.key === "Escape") {
      setSuggestions([]); setHighlighted(-1);
    } else if (e.key === "Tab" && suggestions.length > 0) {
      e.preventDefault();
      const pick = highlighted >= 0 ? suggestions[highlighted] : suggestions[0];
      setValue(pick);
      setSuggestions([]);
      setHighlighted(-1);
    }
  };

  return (
    <div className="relative w-full max-w-lg mx-auto">

      {/* ── Autocomplete suggestions ── */}
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            className="absolute bottom-full mb-2 w-full overflow-hidden z-50"
            style={{
              borderRadius: "var(--radius-lg)",
              background: "rgba(12,11,10,0.97)",
              border: "1px solid var(--border-mid)",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.65)",
              backdropFilter: "blur(18px)",
            }}
          >
            <li className="px-4 pt-2.5 pb-1.5 list-none">
              <span className="section-eyebrow">↑↓ navegar · Tab completar · Enter lançar</span>
            </li>
            {suggestions.map((s, i) => (
              <li
                key={s}
                onMouseDown={(e) => { e.preventDefault(); castSpell(s); }}
                onMouseEnter={() => setHighlighted(i)}
                className="list-none px-4 py-3 flex items-center justify-between cursor-pointer transition-colors duration-150"
                style={{
                  background: i === highlighted ? "rgba(212,168,67,0.09)" : "transparent",
                  borderTop: "1px solid var(--border)",
                  color: i === highlighted ? "var(--gold)" : "var(--ink-body)",
                  minHeight: "var(--touch-target)",
                }}
              >
                <span className="font-cinzel tracking-widest" style={{ fontSize: "var(--text-sm)" }}>
                  ✦ {s}
                </span>
                {i === highlighted && (
                  <span className="section-eyebrow">Enter ↵</span>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* ── Input ring ── */}
      <div
        className={`spell-ring flex items-center gap-3 px-5 ${shaking ? "shaking animate-shake" : ""}`}
        style={{
          opacity: disabled ? 0.45 : 1,
          pointerEvents: disabled ? "none" : "auto",
          minHeight: "var(--touch-target)",
          paddingTop: "var(--space-3)",
          paddingBottom: "var(--space-3)",
        }}
      >
        {/* Wand — animates on successful cast */}
        <motion.span
          animate={casting ? { rotate: [0, -20, 20, -10, 0], scale: [1, 1.3, 1] } : {}}
          transition={{ duration: 0.5 }}
          className="text-xl select-none flex-shrink-0"
          style={{ color: "var(--gold)" }}
          aria-hidden="true"
        >
          🪄
        </motion.span>

        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Lançar feitiço..."
          autoComplete="off"
          spellCheck={false}
          aria-label="Campo de feitiços"
          className="flex-1 bg-transparent outline-none font-cinzel tracking-widest"
          style={{
            fontSize: "var(--text-sm)",
            color: "var(--gold-pale)",
            caretColor: "var(--gold)",
            /* placeholder color handled in globals.css via --ink-ghost */
          }}
        />

        {/* Cast button — slides in when there's text */}
        <AnimatePresence>
          {value.trim().length > 0 && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onMouseDown={(e) => { e.preventDefault(); castSpell(value); }}
              className="touch-target flex items-center justify-center flex-shrink-0 font-cinzel rounded-full transition-all duration-200"
              style={{
                fontSize: "var(--text-xs)",
                letterSpacing: "0.1em",
                paddingLeft: "var(--space-3)",
                paddingRight: "var(--space-3)",
                color: "var(--gold)",
                border: "1px solid var(--border-mid)",
                background: "rgba(212,168,67,0.06)",
              }}
            >
              Lançar
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* ── Spell cheatsheet hint ── */}
      <p
        className="text-center mt-2.5 font-cinzel"
        style={{
          fontSize: "var(--text-xs)",
          letterSpacing: "0.16em",
          color: "var(--ink-faint)",
        }}
      >
        Aparecium · Revelio · Specialis Revelio · Contacto · Malfeito Feito
      </p>
    </div>
  );
}
