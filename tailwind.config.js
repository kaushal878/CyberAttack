/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cybersecurity neon palette
        cyber: {
          bg: "#05070d",
          panel: "#0b1220",
          border: "#1f2a44",
          neon: "#00f0ff",
          neonDim: "#0891b2",
          green: "#22ff88",
          greenDim: "#16a34a",
          danger: "#ff3366",
          warn: "#ffcc00",
          mute: "#94a3b8",
        },
      },
      fontFamily: {
        mono: [
          "JetBrains Mono",
          "Fira Code",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
        display: ["Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        neon: "0 0 12px rgba(0, 240, 255, 0.45), 0 0 28px rgba(0, 240, 255, 0.18)",
        "neon-green":
          "0 0 12px rgba(34, 255, 136, 0.45), 0 0 28px rgba(34, 255, 136, 0.18)",
        "neon-danger":
          "0 0 12px rgba(255, 51, 102, 0.5), 0 0 28px rgba(255, 51, 102, 0.18)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(0,240,255,0.15), transparent 60%), radial-gradient(circle at 90% 90%, rgba(34,255,136,0.10), transparent 55%)",
        "scanline":
          "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)",
      },
      keyframes: {
        pulseNeon: {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 4px currentColor)" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 14px currentColor)" },
        },
        flicker: {
          "0%,100%": { opacity: "1" },
          "45%": { opacity: "0.6" },
          "50%": { opacity: "0.95" },
          "55%": { opacity: "0.7" },
        },
      },
      animation: {
        "pulse-neon": "pulseNeon 2.4s ease-in-out infinite",
        flicker: "flicker 3s linear infinite",
      },
    },
  },
  plugins: [],
};
