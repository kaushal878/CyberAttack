import { motion } from "framer-motion";
import { Bug, FileText, Lock, Bitcoin } from "lucide-react";
import type { AnimationProps } from "../types";

/**
 * Malware / Ransomware animation:
 *   0) Suspicious payload arrives
 *   1) Payload executes — establishes persistence
 *   2) Files encrypted across the disk
 *   3) Ransom note appears, demanding payment
 */
export default function RansomwareAnimation({ step, speed }: AnimationProps) {
  const t = (s: number) => s / speed;

  // grid of files (4x3)
  const cols = 5;
  const rows = 3;
  const startX = 200;
  const startY = 110;
  const cell = 50;

  return (
    <svg
      viewBox="0 0 600 360"
      className="w-full h-full"
      role="img"
      aria-label="Ransomware attack animation"
    >
      <defs>
        <radialGradient id="rw-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3366" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff3366" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Payload (left) */}
      <g transform="translate(80,180)">
        <motion.circle
          r="40"
          fill="url(#rw-glow)"
          animate={{ scale: step >= 1 ? [1, 1.15, 1] : 1 }}
          transition={{ duration: t(1.4), repeat: Infinity }}
        />
        <circle r="24" fill="#0b1220" stroke="#ff3366" strokeWidth="2" />
        <foreignObject x="-12" y="-12" width="24" height="24">
          <div className="text-cyber-danger flex items-center justify-center w-full h-full">
            <Bug size={20} />
          </div>
        </foreignObject>
        <text
          y="50"
          textAnchor="middle"
          fontSize="12"
          fill="#94a3b8"
          fontFamily="JetBrains Mono"
        >
          payload.exe
        </text>
      </g>

      {/* File grid */}
      {Array.from({ length: rows * cols }).map((_, idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;
        const x = startX + c * cell;
        const y = startY + r * cell;
        // encryption ripples outward from the leftmost file
        const encryptedAt = step >= 2 ? r * cols + c : -1;
        const isEncrypted = step >= 2 && idx <= encryptedAt + 12;

        return (
          <motion.g
            key={idx}
            transform={`translate(${x},${y})`}
            animate={{
              opacity: 1,
            }}
          >
            <motion.rect
              x="-16"
              y="-20"
              width="32"
              height="40"
              rx="3"
              fill={isEncrypted ? "#1a0a14" : "#0b1220"}
              stroke={isEncrypted ? "#ff3366" : "#1f2a44"}
              strokeWidth="1.5"
              animate={{
                scale: isEncrypted ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: t(0.5),
                delay: t(idx * 0.06),
              }}
            />
            <foreignObject x="-10" y="-10" width="20" height="20">
              <div
                className={
                  isEncrypted
                    ? "text-cyber-danger flex items-center justify-center w-full h-full"
                    : "text-slate-400 flex items-center justify-center w-full h-full"
                }
              >
                {isEncrypted ? <Lock size={14} /> : <FileText size={14} />}
              </div>
            </foreignObject>
          </motion.g>
        );
      })}

      {/* Infection trail */}
      {step >= 1 && (
        <motion.circle
          r="6"
          fill="#ff3366"
          initial={{ cx: 80, cy: 180 }}
          animate={{ cx: [80, startX + 0 * cell], cy: [180, startY] }}
          transition={{ duration: t(1.2), repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Ransom note */}
      {step >= 3 && (
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: t(0.4) }}
        >
          <g transform="translate(450,260)">
            <rect
              x="-90"
              y="-44"
              width="180"
              height="88"
              rx="8"
              fill="#1a0a14"
              stroke="#ff3366"
              strokeWidth="2"
            />
            <foreignObject x="-12" y="-34" width="24" height="24">
              <div className="text-cyber-warn flex items-center justify-center w-full h-full">
                <Bitcoin size={20} />
              </div>
            </foreignObject>
            <text
              y="0"
              textAnchor="middle"
              fontSize="12"
              fill="#ff3366"
              fontFamily="JetBrains Mono"
              fontWeight="700"
            >
              YOUR FILES ARE LOCKED
            </text>
            <text
              y="20"
              textAnchor="middle"
              fontSize="10"
              fill="#ffcc00"
              fontFamily="JetBrains Mono"
            >
              pay 0.7 BTC within 72h
            </text>
          </g>
        </motion.g>
      )}

      {/* Banner */}
      <text
        x="300"
        y="34"
        textAnchor="middle"
        fontSize="13"
        fill="#94a3b8"
        fontFamily="JetBrains Mono"
      >
        {step === 0 && "// payload delivered (email / drive-by)"}
        {step === 1 && "// payload executes — persistence installed"}
        {step === 2 && "// encrypting files with attacker key..."}
        {step === 3 && "// ransom note dropped"}
      </text>
    </svg>
  );
}
