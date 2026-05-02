import { motion } from "framer-motion";
import { User, Server, EyeOff } from "lucide-react";
import type { AnimationProps } from "../types";

/**
 * Man-in-the-Middle animation:
 *   0) Direct, expected client <-> server channel
 *   1) Attacker positions on the path (e.g. rogue Wi-Fi / ARP poisoning)
 *   2) Attacker silently relays + observes traffic
 *   3) Attacker tampers with payload before forwarding
 */
export default function MITMAnimation({ step, speed }: AnimationProps) {
  const t = (s: number) => s / speed;

  return (
    <svg
      viewBox="0 0 600 360"
      className="w-full h-full"
      role="img"
      aria-label="Man-in-the-middle attack animation"
    >
      <defs>
        <radialGradient id="mitm-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff3366" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ff3366" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Client */}
      <g transform="translate(80,180)">
        <circle r="28" fill="#0b1220" stroke="#00f0ff" strokeWidth="2" />
        <foreignObject x="-14" y="-14" width="28" height="28">
          <div className="text-cyber-neon flex items-center justify-center w-full h-full">
            <User size={22} />
          </div>
        </foreignObject>
        <text
          y="56"
          textAnchor="middle"
          fontSize="12"
          fill="#94a3b8"
          fontFamily="JetBrains Mono"
        >
          Client
        </text>
      </g>

      {/* Server */}
      <g transform="translate(520,180)">
        <circle r="28" fill="#0b1220" stroke="#22ff88" strokeWidth="2" />
        <foreignObject x="-14" y="-14" width="28" height="28">
          <div className="text-cyber-green flex items-center justify-center w-full h-full">
            <Server size={22} />
          </div>
        </foreignObject>
        <text
          y="56"
          textAnchor="middle"
          fontSize="12"
          fill="#94a3b8"
          fontFamily="JetBrains Mono"
        >
          Server
        </text>
      </g>

      {/* Attacker (slides into position on step >=1) */}
      <motion.g
        animate={{ y: step >= 1 ? 0 : -120, opacity: step >= 1 ? 1 : 0 }}
        transition={{ duration: t(0.8) }}
      >
        <g transform="translate(300,180)">
          <motion.circle
            r="46"
            fill="url(#mitm-glow)"
            animate={{ scale: step >= 1 ? [1, 1.15, 1] : 1 }}
            transition={{ duration: t(2), repeat: Infinity }}
          />
          <circle r="28" fill="#0b1220" stroke="#ff3366" strokeWidth="2" />
          <foreignObject x="-14" y="-14" width="28" height="28">
            <div className="text-cyber-danger flex items-center justify-center w-full h-full">
              <EyeOff size={22} />
            </div>
          </foreignObject>
          <text
            y="56"
            textAnchor="middle"
            fontSize="12"
            fill="#ff3366"
            fontFamily="JetBrains Mono"
          >
            MITM
          </text>
        </g>
      </motion.g>

      {/* Direct line (step 0) */}
      {step === 0 && (
        <line
          x1="108"
          y1="180"
          x2="492"
          y2="180"
          stroke="#22ff88"
          strokeWidth="2"
          strokeDasharray="4 4"
          opacity="0.6"
        />
      )}

      {/* Routed-through-attacker line (step >=1) */}
      {step >= 1 && (
        <>
          <line
            x1="108"
            y1="180"
            x2="272"
            y2="180"
            stroke="#ff3366"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <line
            x1="328"
            y1="180"
            x2="492"
            y2="180"
            stroke="#ff3366"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </>
      )}

      {/* Packets — direct */}
      {step === 0 && (
        <motion.circle
          r="5"
          fill="#22ff88"
          initial={{ cx: 108, cy: 180 }}
          animate={{ cx: [108, 492], cy: 180 }}
          transition={{ duration: t(1.6), repeat: Infinity, ease: "linear" }}
        />
      )}

      {/* Packets — through attacker, possibly tampered */}
      {step >= 1 && (
        <>
          <motion.circle
            r="5"
            fill={step >= 3 ? "#ff3366" : "#00f0ff"}
            initial={{ cx: 108, cy: 180 }}
            animate={{ cx: [108, 300], cy: 180 }}
            transition={{ duration: t(1.2), repeat: Infinity, ease: "linear" }}
          />
          <motion.circle
            r="5"
            fill={step >= 3 ? "#ff3366" : "#22ff88"}
            initial={{ cx: 300, cy: 180 }}
            animate={{ cx: [300, 492], cy: 180 }}
            transition={{
              duration: t(1.2),
              repeat: Infinity,
              ease: "linear",
              delay: t(0.6),
            }}
          />
        </>
      )}

      {step >= 2 && (
        <text
          x="300"
          y="135"
          textAnchor="middle"
          fontSize="11"
          fill="#ff3366"
          fontFamily="JetBrains Mono"
          className="animate-pulse-neon"
        >
          {step >= 3 ? "tamper(payload)" : "sniff(payload)"}
        </text>
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
        {step === 0 && "// secure direct channel"}
        {step === 1 && "// attacker on path (rogue Wi-Fi / ARP poison)"}
        {step === 2 && "// silently observing traffic"}
        {step === 3 && "// rewriting requests in flight"}
      </text>
    </svg>
  );
}
