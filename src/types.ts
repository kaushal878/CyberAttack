import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

/** A single step in an attack timeline. */
export interface AttackStep {
  /** Short label shown in the timeline (e.g. "Bait sent"). */
  title: string;
  /** Sentence shown beneath the title in Learn Mode and the explanation panel. */
  description: string;
  /** Real-world technique reference (MITRE-ish; informational only). */
  technique?: string;
}

/** Props passed to every animation component. */
export interface AnimationProps {
  /** 0-based index of the currently active step. */
  step: number;
  /** Whether the timeline is currently advancing. */
  isPlaying: boolean;
  /** Multiplier for animation speed (1 = normal, 0.5 = slow, 2 = fast). */
  speed: number;
}

/** A single multiple-choice quiz question. */
export interface QuizQuestion {
  question: string;
  options: string[];
  /** 0-based index of the correct option. */
  answer: number;
  explanation: string;
}

/** Top-level definition of an attack scenario. */
export interface Attack {
  id: string;
  name: string;
  tagline: string;
  category: string;
  /** Tailwind colour token used for accent gradients. */
  accent: "cyan" | "magenta" | "lime" | "amber" | "violet";
  /** Lucide icon shown on cards and headers. */
  icon: LucideIcon;
  /** Short paragraph for the gallery card. */
  shortDescription: string;
  /** Long-form explanation for the impact panel. */
  howItWorks: string;
  /** Bullet list of real-world impacts. */
  impact: string[];
  /** Bullet list of prevention tips. */
  prevention: string[];
  /** Ordered timeline steps. */
  steps: AttackStep[];
  /** Animation component shown on the left side of the simulator. */
  Animation: ComponentType<AnimationProps>;
  /** Mini animation component shown inside gallery cards. */
  Preview: ComponentType<AnimationProps>;
  /** Quiz questions shown at the end of the simulation. */
  quiz: QuizQuestion[];
}
