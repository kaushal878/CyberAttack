import { motion } from "framer-motion";
import { Server, Bot } from "lucide-react";
import type { AnimationProps } from "../types";

/**
 * DDoS animation — depicts a botnet flooding a server:
 *   0) Botnet idle
 *   1) C2 issues attack command
 *   2) Bots flood the server with requests
 *   3) Server overloads & goes offline
 */
export default function DDoSAnimation({ step, speed }: AnimationProps) {
  const t = (s: number) => s / speed;
  const bots = Array.from({ length: 12 }, (_, i) => i);
  const radius = 130;

  return (
    <svg
      viewBox="0 0 600 360"
      className="w-full h-full"
      role="img"
      aria-label="DDoS attack animation"
    >
      <defs>
        <radialGradient id="ddos-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3366" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ff3366" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ddos-server-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Server */}
      <g transform="translate(450,180)">
        <motion.circle
          r="72"
          fill={step >= 3 ? "url(#ddos-glow)" : "url(#ddos-server-glow)"}
          animate={{
            scale: step >= 2 ? [1, 1.15, 1] : 1,
          }}
          transition={{ duration: t(1.2), repeat: Infinity }}
        />
        <motion.rect
          x="-30"
          y="-36"
          width="60"
          height="72"
          rx="6"
          fill="#0b1220"
          stroke={step >= 3 ? "#ff3366" : "#00f0ff"}
          strokeWidth="2"
          animate={{
            x: step >= 3 ? [-30, -32, -28, -30] : -30,
            y: step >= 3 ? [-36, -38, -34, -36] : -36,
          }}
          transition={{
            duration: t(0.25),
            repeat: step >= 3 ? Infinity : 0,
          }}
        />
        <foreignObject x="-16" y="-16" width="32" height="32">
          <div
            className={
              step >= 3
                ? "text-cyber-danger flex items-center justify-center w-full h-full"
                : "text-cyber-neon flex items-center justify-center w-full h-full"
            }
          >
            <Server size={28} />
          </div>
        </foreignObject>
        <text
          y="58"
          textAnchor="middle"
          fontSize="12"
          fill="#94a3b8"
          fontFamily="JetBrains Mono"
        >
          {step >= 3 ? "SERVICE DOWN" : "Target server"}
        </text>
      </g>

      {/* Botnet */}
      {bots.map((i) => {
        const angle = (i / bots.length) * Math.PI * 2;
        const cx = 150 + Math.cos(angle) * radius;
        const cy = 180 + Math.sin(angle) * (radius * 0.55);
        return (
          <g key={i} transform={`translate(${cx},${cy})`}>
            <motion.circle
              r="14"
              fill="#0b1220"
              stroke="#ff3366"
              strokeWidth="1.5"
              animate={{
                opacity: step >= 1 ? [0.6, 1, 0.6] : 0.4,
              }}
              transition={{
                duration: t(1.2),
                repeat: Infinity,
                delay: (i % 4) * 0.15,
              }}
            />
            <foreignObject x="-8" y="-8" width="16" height="16">
              <div className="text-cyber-danger flex items-center justify-center w-full h-full">
                <Bot size={14} />
              </div>
            </foreignObject>
          </g>
        );
      })}
      <text
        x="150"
        y="320"
        textAnchor="middle"
        fontSize="12"
        fill="#94a3b8"
        fontFamily="JetBrains Mono"
      >
        Botnet ({bots.length}+ nodes)
      </text>

      {/* Attack packets */}
      {step >= 2 &&
        bots.map((i) => {
          const angle = (i / bots.length) * Math.PI * 2;
          const cx = 150 + Math.cos(angle) * radius;
          const cy = 180 + Math.sin(angle) * (radius * 0.55);
          return (
            <motion.circle
              key={`p-${i}`}
              r="3"
              fill="#ff3366"
              initial={{ cx, cy, opacity: 0 }}
              animate={{
                cx: [cx, 450],
                cy: [cy, 180],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: t(1.4),
                repeat: Infinity,
                delay: (i % 6) * 0.1,
                ease: "linear",
              }}
            />
          );
        })}

      {/* Banner */}
      <text
        x="300"
        y="34"
        textAnchor="middle"
        fontSize="13"
        fill="#94a3b8"
        fontFamily="JetBrains Mono"
      >
        {step === 0 && "// botnet idle"}
        {step === 1 && "// command-and-control: ATTACK"}
        {step === 2 && "// flooding requests..."}
        {step === 3 && "// server saturated — denial of service"}
      </text>
    </svg>
  );
}
