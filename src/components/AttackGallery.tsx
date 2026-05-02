import { motion } from "framer-motion";
import { ShieldAlert, Sparkles } from "lucide-react";
import { attacks } from "../data/attacks";
import AttackCard from "./AttackCard";

interface Props {
  onSelect: (id: string) => void;
}

/**
 * Homepage attack gallery. Lays out every entry in `attacks` as an
 * animated card. New attacks appear automatically.
 */
export default function AttackGallery({ onSelect }: Props) {
  return (
    <div className="relative">
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 chip border-cyber-neon/40 text-cyber-neon mb-4">
          <Sparkles size={12} /> Educational visualizer
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
          See how cyberattacks <span className="neon-text text-cyber-neon">actually</span> work
        </h1>
        <p className="text-slate-300/90 leading-relaxed">
          Click any attack below to step through an animated, narrated
          simulation — then test your understanding with a short quiz and
          download a PDF summary you can share with your team.
        </p>
      </motion.section>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: { staggerChildren: 0.08 },
          },
        }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {attacks.map((a) => (
          <motion.div
            key={a.id}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
          >
            <AttackCard attack={a} onSelect={onSelect} />
          </motion.div>
        ))}
      </motion.div>

      <div className="mt-12 glass p-5 flex items-start gap-3 max-w-3xl mx-auto">
        <ShieldAlert className="text-cyber-warn shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-slate-300/90 leading-relaxed">
          <span className="text-cyber-warn font-semibold">For defenders.</span>{" "}
          Every simulation here is intentionally simplified for teaching. The
          goal is to make defensive concepts — least privilege, parameterised
          queries, immutable backups, phishing-resistant MFA — feel concrete.
          Don't run any of these techniques against systems you don't own.
        </p>
      </div>
    </div>
  );
}
