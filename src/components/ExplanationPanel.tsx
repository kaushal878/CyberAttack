import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Skull } from "lucide-react";
import type { Attack } from "../types";

interface Props {
  attack: Attack;
  step: number;
}

/**
 * Right-hand panel synced with the simulation. Highlights the active
 * step and surfaces the long-form how-it-works / impact / prevention.
 */
export default function ExplanationPanel({ attack, step }: Props) {
  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Step explainer (synced) */}
      <div className="glass-strong p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="chip border-cyber-neon/40 text-cyber-neon">
            Step {step + 1} / {attack.steps.length}
          </span>
          {attack.steps[step].technique && (
            <span className="text-[11px] font-mono text-slate-500">
              {attack.steps[step].technique}
            </span>
          )}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {attack.steps[step].title}
            </h3>
            <p className="text-slate-300/90 leading-relaxed">
              {attack.steps[step].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* How it works */}
      <div className="glass p-5">
        <h4 className="text-sm font-semibold text-slate-200 mb-2 uppercase tracking-wider font-mono">
          How it works
        </h4>
        <p className="text-sm text-slate-300/90 leading-relaxed">
          {attack.howItWorks}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Impact */}
        <div className="glass p-5">
          <h4 className="text-sm font-semibold text-cyber-danger mb-3 uppercase tracking-wider font-mono flex items-center gap-2">
            <Skull size={14} /> Real-world impact
          </h4>
          <ul className="space-y-2 text-sm text-slate-300/90">
            {attack.impact.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-cyber-danger mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prevention */}
        <div className="glass p-5">
          <h4 className="text-sm font-semibold text-cyber-green mb-3 uppercase tracking-wider font-mono flex items-center gap-2">
            <ShieldCheck size={14} /> Prevention
          </h4>
          <ul className="space-y-2 text-sm text-slate-300/90">
            {attack.prevention.map((item) => (
              <li key={item} className="flex gap-2">
                <CheckCircle2
                  size={14}
                  className="text-cyber-green mt-1 shrink-0"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
