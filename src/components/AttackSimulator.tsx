import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Download,
  Gamepad2,
} from "lucide-react";
import type { Attack } from "../types";
import { attacks } from "../data/attacks";
import { allAttacks } from "../data/comprehensiveAttacks";
import { additionalAttacks } from "../data/additionalAttacks";
import Timeline from "./Timeline";
import PlaybackControls from "./PlaybackControls";
import ExplanationPanel from "./ExplanationPanel";
import Quiz from "./Quiz";
import { downloadAttackSummary } from "../lib/pdf";
import { impactCue, stepCue } from "../lib/sound";

interface Props {
  attack: Attack;
  onBack: () => void;
  onSwitch: (id: string) => void;
}

type Mode = "learn" | "simulation";

const STEP_DURATION_MS = 2600;

/**
 * The split-view that drives a single attack's simulation. Owns all
 * playback state — current step, playing flag, speed, mode, sound.
 */
export default function AttackSimulator({ attack, onBack, onSwitch }: Props) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [mode, setMode] = useState<Mode>("simulation");
  const [soundOn, setSoundOn] = useState(false);
  const lastCueRef = useRef<number>(-1);

  // reset when switching attacks
  useEffect(() => {
    setStep(0);
    setIsPlaying(true);
  }, [attack.id]);

  // Combine all attacks for quick switcher
  const allComprehensiveAttacks = [...attacks, ...allAttacks, ...additionalAttacks];

  // step auto-advance loop
  useEffect(() => {
    if (!isPlaying) return;
    const id = window.setTimeout(() => {
      setStep((s) => {
        if (s >= attack.steps.length - 1) {
          setIsPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, STEP_DURATION_MS / speed);
    return () => window.clearTimeout(id);
  }, [isPlaying, speed, step, attack.steps.length]);

  // sound effects on step changes
  useEffect(() => {
    if (!soundOn) return;
    if (lastCueRef.current === step) return;
    lastCueRef.current = step;
    if (step === attack.steps.length - 1) {
      impactCue();
    } else if (step > 0) {
      stepCue();
    }
  }, [step, soundOn, attack.steps.length]);

  const Animation = attack.Animation;

  const togglePlay = () => {
    if (!isPlaying && step >= attack.steps.length - 1) {
      // restart from the top if we'd already finished
      setStep(0);
    }
    setIsPlaying((p) => !p);
  };

  const restart = () => {
    setStep(0);
    setIsPlaying(true);
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));
  const next = () =>
    setStep((s) => Math.min(attack.steps.length - 1, s + 1));

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
        <button
          type="button"
          onClick={onBack}
          className="btn-ghost"
          aria-label="Back to gallery"
        >
          <ArrowLeft size={16} /> Gallery
        </button>

        <div className="flex-1">
          <div className="flex items-center gap-3">
            <attack.icon className="text-cyber-neon" size={22} />
            <h2 className="text-2xl font-semibold text-white">
              {attack.name}
            </h2>
            <span className="chip border-cyber-neon/40 text-cyber-neon">
              {attack.category}
            </span>
          </div>
          <p className="text-sm text-slate-400 font-mono mt-1">
            {attack.tagline}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Mode toggle */}
          <div
            role="tablist"
            aria-label="Mode"
            className="glass p-1 flex items-center text-xs"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === "simulation"}
              onClick={() => setMode("simulation")}
              className={`btn px-3 py-1.5 ${mode === "simulation" ? "bg-cyber-neon/15 text-cyber-neon" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Gamepad2 size={14} /> Simulation
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === "learn"}
              onClick={() => setMode("learn")}
              className={`btn px-3 py-1.5 ${mode === "learn" ? "bg-cyber-neon/15 text-cyber-neon" : "text-slate-400 hover:text-slate-200"}`}
            >
              <BookOpen size={14} /> Learn
            </button>
          </div>
          <button
            type="button"
            onClick={() => downloadAttackSummary(attack)}
            className="btn-ghost"
            aria-label="Download summary as PDF"
            title="Download summary as PDF"
          >
            <Download size={16} />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>
      </div>

      {/* Quick switcher */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {allComprehensiveAttacks.map((a) => {
          const active = a.id === attack.id;
          return (
            <button
              key={a.id}
              type="button"
              onClick={() => onSwitch(a.id)}
              className={[
                "shrink-0 chip flex items-center gap-1.5",
                active
                  ? "border-cyber-neon/60 text-cyber-neon bg-cyber-neon/10"
                  : "border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20",
              ].join(" ")}
              aria-pressed={active}
            >
              <a.icon size={12} /> {a.name}
            </button>
          );
        })}
      </div>

      {/* Split view */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* LEFT: simulation */}
        <motion.div
          key={`${attack.id}-sim`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="glass-strong overflow-hidden">
            <div className="aspect-[5/3] bg-black/40 relative">
              <Animation step={step} isPlaying={isPlaying} speed={speed} />
              {mode === "learn" && (
                <div className="absolute inset-x-3 bottom-3 glass p-3 text-xs text-slate-300 leading-relaxed">
                  <span className="text-cyber-neon font-mono uppercase tracking-wider mr-2">
                    Step {step + 1}
                  </span>
                  {attack.steps[step].description}
                </div>
              )}
            </div>
            <div className="p-4">
              <Timeline
                steps={attack.steps}
                current={step}
                onSelect={(i) => {
                  setStep(i);
                  setIsPlaying(false);
                }}
              />
            </div>
          </div>
          <PlaybackControls
            isPlaying={isPlaying}
            onTogglePlay={togglePlay}
            onRestart={restart}
            onPrev={prev}
            onNext={next}
            speed={speed}
            onSpeed={setSpeed}
            soundOn={soundOn}
            onToggleSound={() => setSoundOn((s) => !s)}
            canPrev={step > 0}
            canNext={step < attack.steps.length - 1}
          />
        </motion.div>

        {/* RIGHT: explanation + quiz */}
        <motion.div
          key={`${attack.id}-info`}
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          className="space-y-5"
        >
          <ExplanationPanel attack={attack} step={step} />
          <Quiz attack={attack} />
        </motion.div>
      </div>
    </div>
  );
}
