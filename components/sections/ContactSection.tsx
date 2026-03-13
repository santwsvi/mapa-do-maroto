"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiSend } from "react-icons/fi";

const sectionVariants = {
  initial: { opacity: 0, y: 28, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.75, ease: "easeOut" } },
  exit:    { opacity: 0, y: -16, filter: "blur(8px)", transition: { duration: 0.4 } },
};

type Status = "idle" | "sending" | "sent";

const SOCIALS = [
  { icon: FiGithub,   href: "https://github.com/santwsvi",    label: "GitHub" },
  { icon: FiLinkedin, href: "https://linkedin.com/in/victorgsrocha",  label: "LinkedIn" },
  { icon: FiMail,     href: "mailto:victorgsantosrocha@gmail.com", label: "E-mail" },
];

export default function ContactSection() {
  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("sent");
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(12,11,10,0.65)",
    border: "1px solid var(--border-mid)",
    borderRadius: "var(--radius-md)",
    padding: "0.65rem 1rem",
    color: "var(--ink)",
    fontFamily: "'Crimson Text', serif",
    fontSize: "1.05rem",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
  } as React.CSSProperties;

  return (
    <motion.div
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full max-w-xl mx-auto"
    >
      <div className="map-card p-7 md:p-9">

        {/* Header */}
        <div className="text-center mb-7">
          <span className="text-4xl block mb-3 animate-float select-none">🦉</span>
          <p className="section-eyebrow mb-1">— Contacto —</p>
          <h2 className="section-title">O Corujal</h2>
          <p className="font-crimson mt-2" style={{ color: "var(--ink-muted)", fontSize: "1rem" }}>
            Envie uma mensagem — sua coruja chega em breve.
          </p>
        </div>

        <div className="gold-rule mb-6" />

        <AnimatePresence mode="wait">
          {status === "sent" ? (
            <motion.div
              key="sent"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <div className="text-5xl mb-4 animate-float select-none">🦉</div>
              <p className="font-cinzel mb-2" style={{ color: "var(--gold)", letterSpacing: "0.1em" }}>
                Mensagem Enviada!
              </p>
              <p className="font-crimson" style={{ color: "var(--ink-muted)", fontSize: "1rem" }}>
                Sua coruja partiu. Responderei assim que ela chegar a Hogwarts.
              </p>
              <button
                onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                className="touch-target inline-flex items-center justify-center mt-6 font-cinzel tracking-widest transition-colors"
                style={{ fontSize: "var(--text-xs)", letterSpacing: "0.18em", color: "var(--ink-ghost)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-ghost)")}
              >
                ↩ Enviar outra mensagem
              </button>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  style={inputStyle}
                  placeholder="Seu nome (ou codinome mágico)"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  onFocus={(e) => { e.target.style.borderColor = "var(--border-hover)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,168,67,0.05)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = "var(--border-mid)";  e.target.style.boxShadow = "none"; }}
                />
                <input
                  type="email"
                  style={inputStyle}
                  placeholder="Seu e-mail"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  onFocus={(e) => { e.target.style.borderColor = "var(--border-hover)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,168,67,0.05)"; }}
                  onBlur={(e)  => { e.target.style.borderColor = "var(--border-mid)";  e.target.style.boxShadow = "none"; }}
                />
              </div>
              <textarea
                style={{ ...inputStyle, resize: "none" }}
                placeholder="Sua mensagem secreta..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={4}
                onFocus={(e) => { e.target.style.borderColor = "var(--border-hover)"; e.target.style.boxShadow = "0 0 0 3px rgba(212,168,67,0.05)"; }}
                onBlur={(e)  => { e.target.style.borderColor = "var(--border-mid)";  e.target.style.boxShadow = "none"; }}
              />

              <motion.button
                type="submit"
                disabled={status === "sending"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 font-cinzel transition-all duration-300"
                style={{
                  fontSize: "var(--text-sm)",
                  letterSpacing: "0.14em",
                  padding: "var(--space-3) var(--space-4)",
                  borderRadius: "var(--radius-lg)",
                  color: "var(--gold-light)",
                  background: "rgba(212,168,67,0.10)",
                  border: "1px solid var(--border-mid)",
                  opacity: status === "sending" ? 0.6 : 1,
                  minHeight: "var(--touch-target)",
                }}
              >
                {status === "sending" ? (
                  <span className="animate-pulse">Coruja a caminho...</span>
                ) : (
                  <><FiSend size={13} /> Lançar Mensagem</>
                )}
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Social links */}
        <div className="gold-rule mt-7 mb-5" />
        <div className="flex items-center justify-center gap-8">
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
               className="touch-target flex flex-col items-center justify-center gap-1 group transition-all duration-200"
               style={{ color: "var(--ink-muted)" }}
               onMouseEnter={(e) => (e.currentTarget.style.color = "var(--gold)")}
               onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-muted)")}>
              <Icon size={19} />
              <span className="font-cinzel opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ fontSize: "var(--text-xs)", letterSpacing: "0.14em" }}>
                {label}
              </span>
            </a>
          ))}
        </div>

      </div>
    </motion.div>
  );
}
