import { ShieldHalf, Github } from "lucide-react";

interface Props {
  onHome: () => void;
}

export default function Header({ onHome }: Props) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 backdrop-blur-md bg-cyber-bg/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-2 group"
          aria-label="Home"
        >
          <ShieldHalf
            className="text-cyber-neon group-hover:animate-pulse-neon"
            size={22}
          />
          <span className="font-semibold tracking-tight">
            CyberAttack <span className="text-cyber-neon">Visualizer</span>
          </span>
        </button>

        <nav className="flex items-center gap-2 text-sm">
          <a
            href="https://github.com/kaushal878/CyberAttack"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
            aria-label="GitHub repository"
          >
            <Github size={16} />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
