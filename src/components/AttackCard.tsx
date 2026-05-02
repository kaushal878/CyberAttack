import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { Attack } from "../types";

interface Props {
  attack: Attack;
  onSelect: (id: string) => void;
}

const accentRing: Record<Attack["accent"], string> = {
  cyan: "hover:shadow-neon hover:border-cyber-neon/60 group-hover:text-cyber-neon",
  magenta: "hover:shadow-neon-danger hover:border-cyber-danger/60 group-hover:text-cyber-danger",
  lime: "hover:shadow-neon-green hover:border-cyber-green/60 group-hover:text-cyber-green",
  amber: "hover:border-cyber-warn/60 group-hover:text-cyber-warn",
  violet: "hover:border-violet-400/60 group-hover:text-violet-300",
};

const accentChip: Record<Attack["accent"], string> = {
  cyan: "border-cyber-neon/40 text-cyber-neon",
  magenta: "border-cyber-danger/40 text-cyber-danger",
  lime: "border-cyber-green/40 text-cyber-green",
  amber: "border-cyber-warn/40 text-cyber-warn",
  violet: "border-violet-400/40 text-violet-300",
};

/**
 * Single homepage card — surfaces the live preview animation, name,
 * category, and short description.
 */
export default function AttackCard({ attack, onSelect }: Props) {
  const Icon = attack.icon;
  const Preview = attack.Preview;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(attack.id)}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      className={`group glass relative text-left p-5 transition-all duration-300 border-white/10 ${accentRing[attack.accent]}`}
      aria-label={`Open ${attack.name} simulation`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center transition-colors ${accentRing[attack.accent]}`}
          >
            <Icon size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-100 text-base group-hover:text-white">
              {attack.name}
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">{attack.tagline}</p>
          </div>
        </div>
        <span className={`chip ${accentChip[attack.accent]}`}>
          {attack.category}
        </span>
      </div>

      <div className="h-24 rounded-lg bg-black/30 border border-white/5 overflow-hidden mb-3">
        <Preview step={0} isPlaying speed={1} />
      </div>

      <p className="text-sm text-slate-300/90 leading-relaxed mb-4">
        {attack.shortDescription}
      </p>

      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-500 font-mono">
          {attack.steps.length} steps · {attack.quiz.length} quiz
        </span>
        <span className="flex items-center gap-1 text-slate-300 group-hover:text-white transition-colors">
          Explore
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </motion.button>
  );
}
