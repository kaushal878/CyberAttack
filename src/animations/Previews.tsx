import { motion } from "framer-motion";
import { Mail, Server, Database, EyeOff, Bug, Lock } from "lucide-react";
import type { AnimationProps } from "../types";

/**
 * Tiny ambient animations shown inside the homepage gallery cards.
 * Each preview is a self-contained loop that does not depend on `step`,
 * but accepts the same AnimationProps shape so it composes uniformly.
 */

export function PhishingPreview({ speed }: AnimationProps) {
  const t = (s: number) => s / speed;
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <line
        x1="20"
        y1="50"
        x2="180"
        y2="50"
        stroke="#1f2a44"
        strokeDasharray="3 3"
      />
      <circle cx="20" cy="50" r="10" fill="#0b1220" stroke="#ff3366" />
      <circle cx="180" cy="50" r="10" fill="#0b1220" stroke="#00f0ff" />
      <motion.g
        animate={{ x: [0, 160, 160] }}
        transition={{
          duration: t(2),
          repeat: Infinity,
          times: [0, 0.7, 1],
          ease: "easeInOut",
        }}
      >
        <foreignObject x="14" y="38" width="24" height="24">
          <div className="text-cyber-warn flex items-center justify-center w-full h-full">
            <Mail size={18} />
          </div>
        </foreignObject>
      </motion.g>
    </svg>
  );
}

export function DDoSPreview({ speed }: AnimationProps) {
  const t = (s: number) => s / speed;
  const bots = [0, 1, 2, 3, 4, 5];
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <rect
        x="160"
        y="35"
        width="20"
        height="30"
        rx="3"
        fill="#0b1220"
        stroke="#00f0ff"
      />
      <foreignObject x="162" y="40" width="16" height="20">
        <div className="text-cyber-neon flex items-center justify-center w-full h-full">
          <Server size={14} />
        </div>
      </foreignObject>
      {bots.map((i) => {
        const cy = 20 + i * 11;
        return (
          <motion.circle
            key={i}
            r="2.5"
            fill="#ff3366"
            initial={{ cx: 20, cy }}
            animate={{ cx: [20, 160], cy }}
            transition={{
              duration: t(1.4),
              repeat: Infinity,
              delay: i * 0.12,
              ease: "linear",
            }}
          />
        );
      })}
    </svg>
  );
}

export function SQLiPreview({ speed }: AnimationProps) {
  const t = (s: number) => s / speed;
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <rect
        x="160"
        y="30"
        width="22"
        height="40"
        rx="3"
        fill="#0b1220"
        stroke="#22ff88"
      />
      <foreignObject x="162" y="38" width="18" height="22">
        <div className="text-cyber-green flex items-center justify-center w-full h-full">
          <Database size={16} />
        </div>
      </foreignObject>
      <motion.text
        x="14"
        y="55"
        fontSize="11"
        fill="#ff3366"
        fontFamily="JetBrains Mono"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: t(1.6), repeat: Infinity }}
      >
        ' OR 1=1 --
      </motion.text>
    </svg>
  );
}

export function MITMPreview({ speed }: AnimationProps) {
  const t = (s: number) => s / speed;
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <line
        x1="20"
        y1="50"
        x2="180"
        y2="50"
        stroke="#1f2a44"
        strokeDasharray="3 3"
      />
      <circle cx="20" cy="50" r="9" fill="#0b1220" stroke="#00f0ff" />
      <circle cx="180" cy="50" r="9" fill="#0b1220" stroke="#22ff88" />
      <circle cx="100" cy="50" r="11" fill="#0b1220" stroke="#ff3366" />
      <foreignObject x="89" y="39" width="22" height="22">
        <div className="text-cyber-danger flex items-center justify-center w-full h-full">
          <EyeOff size={16} />
        </div>
      </foreignObject>
      <motion.circle
        r="3"
        fill="#00f0ff"
        initial={{ cx: 29 }}
        animate={{ cx: [29, 100] }}
        transition={{ duration: t(1.2), repeat: Infinity, ease: "linear" }}
        cy="50"
      />
      <motion.circle
        r="3"
        fill="#22ff88"
        initial={{ cx: 100 }}
        animate={{ cx: [100, 171] }}
        transition={{
          duration: t(1.2),
          repeat: Infinity,
          delay: t(0.6),
          ease: "linear",
        }}
        cy="50"
      />
    </svg>
  );
}

export function RansomwarePreview({ speed }: AnimationProps) {
  const t = (s: number) => s / speed;
  return (
    <svg viewBox="0 0 200 100" className="w-full h-full">
      <foreignObject x="14" y="38" width="22" height="22">
        <div className="text-cyber-danger flex items-center justify-center w-full h-full">
          <Bug size={18} />
        </div>
      </foreignObject>
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={70 + i * 24}
            y="38"
            width="20"
            height="24"
            rx="2"
            fill="#0b1220"
            stroke="#1f2a44"
          />
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: t(2),
              repeat: Infinity,
              delay: i * 0.25,
            }}
          >
            <foreignObject
              x={73 + i * 24}
              y="42"
              width="14"
              height="16"
            >
              <div className="text-cyber-danger flex items-center justify-center w-full h-full">
                <Lock size={12} />
              </div>
            </foreignObject>
          </motion.g>
        </g>
      ))}
    </svg>
  );
}
