import { motion } from "framer-motion";
import type { AttackStep } from "../types";

interface Props {
  steps: AttackStep[];
  current: number;
  onSelect: (index: number) => void;
}

/**
 * Horizontal step indicator that highlights the active step and
 * lets the user jump straight to a given step.
 */
export default function Timeline({ steps, current, onSelect }: Props) {
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between gap-2">
        {/* Background rail */}
        <div className="absolute inset-x-3 top-3 h-[2px] bg-white/10" />
        {/* Filled rail */}
        <motion.div
          className="absolute left-3 top-3 h-[2px] bg-gradient-to-r from-cyber-neon via-cyber-green to-cyber-warn rounded-full"
          initial={false}
          animate={{
            width: `calc(${(current / Math.max(1, steps.length - 1)) * 100}% - ${current === steps.length - 1 ? 24 : 0}px)`,
          }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        />

        {steps.map((s, i) => {
          const active = i === current;
          const done = i < current;
          return (
            <button
              key={s.title}
              type="button"
              onClick={() => onSelect(i)}
              className="relative z-10 flex flex-col items-center gap-2 group flex-1"
              aria-label={`Jump to step ${i + 1}: ${s.title}`}
            >
              <span
                className={[
                  "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold border transition-all",
                  active
                    ? "bg-cyber-neon text-cyber-bg border-cyber-neon shadow-neon"
                    : done
                      ? "bg-cyber-green/20 text-cyber-green border-cyber-green/50"
                      : "bg-cyber-panel text-slate-400 border-white/15 group-hover:border-cyber-neon/40",
                ].join(" ")}
              >
                {i + 1}
              </span>
              <span
                className={[
                  "text-[11px] font-mono uppercase tracking-wider text-center transition-colors max-w-[10ch]",
                  active
                    ? "text-cyber-neon"
                    : done
                      ? "text-cyber-green"
                      : "text-slate-500 group-hover:text-slate-300",
                ].join(" ")}
              >
                {s.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
