/**
 * Tiny WebAudio sound-effect utility. Generates short tones synthetically
 * so we don't ship any audio files. All FX are soft / non-startling.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (ctx) return ctx;
  const Ctor =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!Ctor) return null;
  ctx = new Ctor();
  return ctx;
}

interface BeepOpts {
  /** Frequency in Hz. Defaults to 660. */
  freq?: number;
  /** Duration in seconds. Defaults to 0.12. */
  duration?: number;
  /** Peak gain (0..1). Defaults to 0.05. */
  gain?: number;
  /** Oscillator type. Defaults to "sine". */
  type?: OscillatorType;
}

/** Play a short beep. Safely no-ops if WebAudio is unavailable. */
export function beep({
  freq = 660,
  duration = 0.12,
  gain = 0.05,
  type = "sine",
}: BeepOpts = {}): void {
  const c = getCtx();
  if (!c) return;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, c.currentTime);
  g.gain.linearRampToValueAtTime(gain, c.currentTime + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, c.currentTime + duration);
  osc.connect(g);
  g.connect(c.destination);
  osc.start();
  osc.stop(c.currentTime + duration + 0.02);
}

/** Cue used when a new attack step becomes active. */
export function stepCue(): void {
  beep({ freq: 540, duration: 0.09, gain: 0.04, type: "triangle" });
}

/** Cue used when the simulation reaches its final step. */
export function impactCue(): void {
  beep({ freq: 220, duration: 0.18, gain: 0.07, type: "sawtooth" });
  setTimeout(() => beep({ freq: 165, duration: 0.22, gain: 0.07, type: "sawtooth" }), 110);
}
