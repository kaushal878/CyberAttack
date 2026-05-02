import { Pause, Play, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

interface Props {
  isPlaying: boolean;
  onTogglePlay: () => void;
  onRestart: () => void;
  onPrev: () => void;
  onNext: () => void;
  speed: number;
  onSpeed: (v: number) => void;
  soundOn: boolean;
  onToggleSound: () => void;
  canPrev: boolean;
  canNext: boolean;
}

const speeds = [0.5, 1, 1.5, 2];

/**
 * Universal playback bar — play/pause, prev/next step, restart,
 * speed selector, and a sound toggle for attack SFX.
 */
export default function PlaybackControls({
  isPlaying,
  onTogglePlay,
  onRestart,
  onPrev,
  onNext,
  speed,
  onSpeed,
  soundOn,
  onToggleSound,
  canPrev,
  canNext,
}: Props) {
  return (
    <div className="glass p-3 flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onRestart}
        className="btn-ghost"
        aria-label="Restart"
        title="Restart"
      >
        <RotateCcw size={16} />
      </button>
      <button
        type="button"
        onClick={onPrev}
        className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={!canPrev}
        aria-label="Previous step"
        title="Previous step"
      >
        <SkipBack size={16} />
      </button>
      <button
        type="button"
        onClick={onTogglePlay}
        className="btn-primary"
        aria-label={isPlaying ? "Pause" : "Play"}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        <span className="hidden sm:inline">{isPlaying ? "Pause" : "Play"}</span>
      </button>
      <button
        type="button"
        onClick={onNext}
        className="btn-ghost disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={!canNext}
        aria-label="Next step"
        title="Next step"
      >
        <SkipForward size={16} />
      </button>

      <div className="flex items-center gap-1 ml-auto">
        <span className="text-[11px] font-mono text-slate-400 mr-1 uppercase tracking-wider">
          Speed
        </span>
        {speeds.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => onSpeed(s)}
            className={[
              "px-2 py-1 rounded-md text-[11px] font-mono border transition-colors",
              speed === s
                ? "border-cyber-neon/60 text-cyber-neon bg-cyber-neon/10"
                : "border-white/10 text-slate-400 hover:text-slate-200 hover:border-white/20",
            ].join(" ")}
            aria-pressed={speed === s}
            title={`${s}x speed`}
          >
            {s}x
          </button>
        ))}
        <button
          type="button"
          onClick={onToggleSound}
          className="btn-ghost ml-2"
          aria-label={soundOn ? "Mute sound effects" : "Enable sound effects"}
          title={soundOn ? "Mute sound effects" : "Enable sound effects"}
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>
    </div>
  );
}
