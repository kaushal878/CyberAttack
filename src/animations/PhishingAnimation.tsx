import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, KeyRound, Skull } from "lucide-react";
import type { AnimationProps } from "../types";

/**
 * Phishing animation — depicts the classic credential-theft chain:
 *   0) Attacker drafts a fake email
 *   1) Email lands in the victim's inbox
 *   2) Victim clicks the malicious link
 *   3) Credentials are exfiltrated to the attacker
 */
export default function PhishingAnimation({ step, speed }: AnimationProps) {
  const t = (s: number) => s / speed;

  return (
    <svg
      viewBox="0 0 600 360"
      className="w-full h-full"
      role="img"
      aria-label="Phishing attack animation"
    >
      <defs>
        <linearGradient id="ph-link" x1="0" x2="1">
          <stop offset="0%" stopColor="#ff3366" />
          <stop offset="100%" stopColor="#ffcc00" />
        </linearGradient>
        <radialGradient id="ph-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3366" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff3366" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Attacker node */}
      <g transform="translate(60,150)">
        <motion.circle
          r="42"
          fill="url(#ph-glow)"
          animate={{ scale: step >= 0 ? [1, 1.15, 1] : 1 }}
          transition={{ duration: t(2), repeat: Infinity }}
        />
        <circle r="28" fill="#0b1220" stroke="#ff3366" strokeWidth="2" />
        <foreignObject x="-14" y="-14" width="28" height="28">
          <div className="text-cyber-danger flex items-center justify-center w-full h-full">
            <Skull size={22} />
          </div>
        </foreignObject>
        <text
          y="58"
          textAnchor="middle"
          fontSize="12"
          fill="#94a3b8"
          fontFamily="JetBrains Mono"
        >
          Attacker
        </text>
      </g>

      {/* Victim node */}
      <g transform="translate(540,150)">
        <circle r="28" fill="#0b1220" stroke="#00f0ff" strokeWidth="2" />
        <foreignObject x="-14" y="-14" width="28" height="28">
          <div className="text-cyber-neon flex items-center justify-center w-full h-full">
            <User size={22} />
          </div>
        </foreignObject>
        <text
          y="58"
          textAnchor="middle"
          fontSize="12"
          fill="#94a3b8"
          fontFamily="JetBrains Mono"
        >
          Victim
        </text>
      </g>

      {/* Wire between */}
      <line
        x1="100"
        y1="150"
        x2="510"
        y2="150"
        stroke="#1f2a44"
        strokeDasharray="4 4"
      />

      {/* Step 1: email travelling left -> right */}
      <AnimatePresence>
        {step >= 1 && (
          <motion.g
            key="email"
            initial={{ x: 100 }}
            animate={{ x: step === 1 ? 510 : 510 }}
            transition={{ duration: t(2), ease: "easeInOut" }}
          >
            <g transform="translate(0,150)">
              <rect
                x="-22"
                y="-16"
                width="44"
                height="32"
                rx="4"
                fill="#0b1220"
                stroke="#ffcc00"
                strokeWidth="1.5"
              />
              <foreignObject x="-12" y="-12" width="24" height="24">
                <div className="text-cyber-warn flex items-center justify-center w-full h-full">
                  <Mail size={20} />
                </div>
              </foreignObject>
            </g>
          </motion.g>
        )}
      </AnimatePresence>

      {/* Step 2: link click pulse */}
      {step >= 2 && (
        <motion.circle
          cx="540"
          cy="150"
          r="28"
          fill="none"
          stroke="#ff3366"
          strokeWidth="2"
          initial={{ r: 28, opacity: 0.9 }}
          animate={{ r: [28, 60], opacity: [0.9, 0] }}
          transition={{ duration: t(1.4), repeat: Infinity }}
        />
      )}

      {/* Step 3: credentials flowing victim -> attacker */}
      {step >= 3 && (
        <>
          {[0, 0.5, 1].map((delay) => (
            <motion.g
              key={`cred-${delay}`}
              initial={{ x: 540, opacity: 0 }}
              animate={{ x: 100, opacity: [0, 1, 1, 0] }}
              transition={{
                duration: t(2.2),
                delay: t(delay),
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <g transform="translate(0,150)">
                <rect
                  x="-12"
                  y="-10"
                  width="24"
                  height="20"
                  rx="3"
                  fill="#ff3366"
                  fillOpacity="0.15"
                  stroke="#ff3366"
                />
                <foreignObject x="-8" y="-8" width="16" height="16">
                  <div className="text-cyber-danger flex items-center justify-center w-full h-full">
                    <KeyRound size={14} />
                  </div>
                </foreignObject>
              </g>
            </motion.g>
          ))}
          <text
            x="300"
            y="120"
            textAnchor="middle"
            fontSize="12"
            fill="#ff3366"
            fontFamily="JetBrains Mono"
            className="animate-pulse-neon"
          >
            credentials.exfiltrate()
          </text>
        </>
      )}

      {/* Banner labels */}
      <text
        x="300"
        y="40"
        textAnchor="middle"
        fontSize="13"
        fill="#94a3b8"
        fontFamily="JetBrains Mono"
      >
        {step === 0 && "// drafting lure email"}
        {step === 1 && "// email in transit"}
        {step === 2 && "// victim clicks link"}
        {step === 3 && "// credentials stolen"}
      </text>
    </svg>
  );
}
