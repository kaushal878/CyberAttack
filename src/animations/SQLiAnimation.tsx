import { motion } from "framer-motion";
import { Database, Terminal, FileWarning } from "lucide-react";
import type { AnimationProps } from "../types";

/**
 * SQL Injection animation — depicts hostile input bypassing app logic and
 * dumping the database:
 *   0) Normal login attempt
 *   1) Attacker injects ' OR 1=1 --
 *   2) DB executes the tampered query
 *   3) Records exfiltrated
 */
export default function SQLiAnimation({ step, speed }: AnimationProps) {
  const t = (s: number) => s / speed;

  const payload = step >= 1 ? "' OR 1=1 --" : "alice";
  const queryColor = step >= 1 ? "#ff3366" : "#00f0ff";

  const records = ["alice:****", "bob:****", "carol:****", "dave:****"];

  return (
    <svg
      viewBox="0 0 600 360"
      className="w-full h-full"
      role="img"
      aria-label="SQL Injection animation"
    >
      <defs>
        <radialGradient id="sql-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3366" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ff3366" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Attacker terminal (left) */}
      <g transform="translate(80,180)">
        <rect
          x="-60"
          y="-50"
          width="120"
          height="100"
          rx="8"
          fill="#0b1220"
          stroke="#1f2a44"
        />
        <rect
          x="-60"
          y="-50"
          width="120"
          height="14"
          fill="#1f2a44"
        />
        <circle cx="-50" cy="-43" r="2.5" fill="#ff3366" />
        <circle cx="-42" cy="-43" r="2.5" fill="#ffcc00" />
        <circle cx="-34" cy="-43" r="2.5" fill="#22ff88" />
        <foreignObject x="-16" y="-30" width="32" height="32">
          <div className="text-cyber-neon flex items-center justify-center w-full h-full">
            <Terminal size={28} />
          </div>
        </foreignObject>
        <text
          y="64"
          textAnchor="middle"
          fontSize="12"
          fill="#94a3b8"
          fontFamily="JetBrains Mono"
        >
          Attacker
        </text>
      </g>

      {/* App box (middle) */}
      <g transform="translate(300,180)">
        <motion.rect
          x="-70"
          y="-50"
          width="140"
          height="100"
          rx="8"
          fill="#0b1220"
          stroke={step >= 2 ? "#ff3366" : "#1f2a44"}
          strokeWidth="2"
          animate={{ filter: step >= 2 ? "brightness(1.15)" : "brightness(1)" }}
        />
        <text
          x="0"
          y="-22"
          textAnchor="middle"
          fontSize="11"
          fill="#94a3b8"
          fontFamily="JetBrains Mono"
        >
          web-app
        </text>
        <text
          x="0"
          y="0"
          textAnchor="middle"
          fontSize="11"
          fill={queryColor}
          fontFamily="JetBrains Mono"
        >
          SELECT * FROM users
        </text>
        <text
          x="0"
          y="18"
          textAnchor="middle"
          fontSize="11"
          fill={queryColor}
          fontFamily="JetBrains Mono"
        >
          WHERE name='{payload}'
        </text>
      </g>

      {/* DB (right) */}
      <g transform="translate(520,180)">
        <motion.circle
          r="62"
          fill="url(#sql-glow)"
          animate={{ opacity: step >= 2 ? [0.4, 0.9, 0.4] : 0.2 }}
          transition={{ duration: t(1.2), repeat: Infinity }}
        />
        <rect
          x="-30"
          y="-40"
          width="60"
          height="80"
          rx="8"
          fill="#0b1220"
          stroke={step >= 2 ? "#ff3366" : "#22ff88"}
          strokeWidth="2"
        />
        <foreignObject x="-16" y="-16" width="32" height="32">
          <div
            className={
              step >= 2
                ? "text-cyber-danger flex items-center justify-center w-full h-full"
                : "text-cyber-green flex items-center justify-center w-full h-full"
            }
          >
            <Database size={28} />
          </div>
        </foreignObject>
        <text
          y="60"
          textAnchor="middle"
          fontSize="12"
          fill="#94a3b8"
          fontFamily="JetBrains Mono"
        >
          users-db
        </text>
      </g>

      {/* Payload packet */}
      {step >= 1 && (
        <motion.g
          initial={{ x: 80 }}
          animate={{ x: 300 }}
          transition={{ duration: t(1.4), repeat: Infinity, ease: "easeInOut" }}
        >
          <g transform="translate(0,180)">
            <rect
              x="-44"
              y="-12"
              width="88"
              height="24"
              rx="4"
              fill="#1a0a14"
              stroke="#ff3366"
            />
            <text
              y="4"
              textAnchor="middle"
              fontSize="11"
              fill="#ff3366"
              fontFamily="JetBrains Mono"
            >
              ' OR 1=1 --
            </text>
          </g>
        </motion.g>
      )}

      {/* Exfiltrated rows flowing back */}
      {step >= 3 &&
        records.map((row, i) => (
          <motion.g
            key={row}
            initial={{ x: 520, opacity: 0 }}
            animate={{ x: 80, opacity: [0, 1, 1, 0] }}
            transition={{
              duration: t(2.2),
              delay: t(i * 0.25),
              repeat: Infinity,
            }}
          >
            <g transform={`translate(0,${100 + i * 22})`}>
              <foreignObject x="-10" y="-8" width="16" height="16">
                <div className="text-cyber-danger flex items-center justify-center w-full h-full">
                  <FileWarning size={14} />
                </div>
              </foreignObject>
              <text
                x="14"
                y="4"
                fontSize="11"
                fill="#ff3366"
                fontFamily="JetBrains Mono"
              >
                {row}
              </text>
            </g>
          </motion.g>
        ))}

      {/* Banner */}
      <text
        x="300"
        y="34"
        textAnchor="middle"
        fontSize="13"
        fill="#94a3b8"
        fontFamily="JetBrains Mono"
      >
        {step === 0 && "// normal login: name='alice'"}
        {step === 1 && "// injecting payload"}
        {step === 2 && "// query rewritten — auth bypassed"}
        {step === 3 && "// dumping users table"}
      </text>
    </svg>
  );
}
