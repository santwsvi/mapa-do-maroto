"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const FOOTPRINT_PATH = [
  { x: 10, y: 80 }, { x: 18, y: 74 }, { x: 26, y: 80 }, { x: 34, y: 74 },
  { x: 42, y: 68 }, { x: 50, y: 62 }, { x: 58, y: 56 }, { x: 66, y: 50 },
  { x: 74, y: 44 }, { x: 82, y: 50 }, { x: 88, y: 44 }, { x: 92, y: 38 },
];

type Step = { x: number; y: number; idx: number };

interface FootprintProps {
  active: boolean;
  onComplete?: () => void;
}

export default function Footprints({ active, onComplete }: FootprintProps) {
  const [visibleSteps, setVisibleSteps] = useState<Step[]>([]);

  useEffect(() => {
    if (!active) {
      setVisibleSteps([]);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i < FOOTPRINT_PATH.length) {
        const step = FOOTPRINT_PATH[i];
        setVisibleSteps((prev) => [...prev, { ...step, idx: i }]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete?.();
          setVisibleSteps([]);
        }, 600);
      }
    }, 120);

    return () => clearInterval(interval);
  }, [active, onComplete]);

  if (visibleSteps.length === 0) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <AnimatePresence>
        {visibleSteps.map((step) => {
          const isLeft = step.idx % 2 === 0;
          return (
            <motion.div
              key={step.idx}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.7, scale: 1 }}
              exit={{ opacity: 0, scale: 0.3 }}
              transition={{ duration: 0.2 }}
              style={{
                position: "absolute",
                left: `${step.x}%`,
                top: `${step.y}%`,
                transform: `rotate(${isLeft ? -15 : 15}deg) scaleX(${isLeft ? 1 : -1})`,
                fontSize: "1.2rem",
                lineHeight: 1,
                userSelect: "none",
                color: "rgba(107,76,17,0.75)",
              }}
            >
              👣
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
