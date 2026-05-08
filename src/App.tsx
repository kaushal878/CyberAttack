import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import AttackGallery from "./components/AttackGallery";
import EnhancedAttackGallery from "./components/EnhancedAttackGallery";
import AttackSimulator from "./components/AttackSimulator";
import { attacks } from "./data/attacks";
import { allAttacks } from "./data/comprehensiveAttacks";
import { additionalAttacks } from "./data/additionalAttacks";

/**
 * Root view router. Two views:
 *  - "gallery": homepage attack grid
 *  - "attack/<id>": split-view simulator for a single attack
 *
 * Hash-based routing keeps deep links working without adding a router lib.
 */
export default function App() {
  const [route, setRoute] = useState<string>(() =>
    typeof window !== "undefined" ? window.location.hash.slice(1) : "",
  );

  useEffect(() => {
    const handler = () => setRoute(window.location.hash.slice(1));
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);

  const goHome = () => {
    window.location.hash = "";
  };
  const select = (id: string) => {
    window.location.hash = `attack/${id}`;
    // Scroll to top so the user sees the simulator from its header.
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const attackId = route.startsWith("attack/")
    ? route.slice("attack/".length)
    : null;
  
  // Combine all attacks for comprehensive search
  const allComprehensiveAttacks = [...attacks, ...allAttacks, ...additionalAttacks];
  const attack = attackId ? allComprehensiveAttacks.find((a) => a.id === attackId) : undefined;

  return (
    <div className="relative min-h-screen flex flex-col">
      <Header onHome={goHome} />
      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          {attack ? (
            <motion.div
              key={`sim-${attack.id}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <AttackSimulator
                attack={attack}
                onBack={goHome}
                onSwitch={select}
              />
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <EnhancedAttackGallery onSelect={select} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <footer className="relative z-10 border-t border-white/5 mt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 text-center text-xs text-slate-500 font-mono">
          built for defenders · {new Date().getFullYear()} · open source
        </div>
      </footer>
    </div>
  );
}
