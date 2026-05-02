import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, RefreshCw, Trophy, XCircle } from "lucide-react";
import type { Attack } from "../types";

interface Props {
  attack: Attack;
}

/**
 * Multiple-choice quiz that shows immediate feedback per question and
 * a final score with the option to retry.
 */
export default function Quiz({ attack }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => attack.quiz.map(() => null),
  );
  const [submitted, setSubmitted] = useState(false);

  const score = answers.reduce<number>(
    (acc, val, i) => acc + (val === attack.quiz[i].answer ? 1 : 0),
    0,
  );

  const reset = () => {
    setAnswers(attack.quiz.map(() => null));
    setSubmitted(false);
  };

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="glass-strong p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Trophy className="text-cyber-warn" size={18} /> Quick check
        </h3>
        {submitted && (
          <span
            className={`chip ${
              score === attack.quiz.length
                ? "border-cyber-green/40 text-cyber-green"
                : "border-cyber-warn/40 text-cyber-warn"
            }`}
          >
            {score} / {attack.quiz.length}
          </span>
        )}
      </div>

      <div className="space-y-5">
        {attack.quiz.map((q, qi) => (
          <div key={q.question}>
            <p className="text-sm text-slate-200 mb-2">
              <span className="text-slate-500 mr-1 font-mono">
                {qi + 1}.
              </span>
              {q.question}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {q.options.map((opt, oi) => {
                const selected = answers[qi] === oi;
                const correct = q.answer === oi;
                let cls =
                  "border-white/10 hover:border-cyber-neon/40 text-slate-300";
                if (submitted) {
                  if (correct) {
                    cls =
                      "border-cyber-green/60 text-cyber-green bg-cyber-green/10";
                  } else if (selected && !correct) {
                    cls =
                      "border-cyber-danger/60 text-cyber-danger bg-cyber-danger/10";
                  } else {
                    cls = "border-white/5 text-slate-500";
                  }
                } else if (selected) {
                  cls =
                    "border-cyber-neon/60 text-cyber-neon bg-cyber-neon/10";
                }
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      if (submitted) return;
                      const next = [...answers];
                      next[qi] = oi;
                      setAnswers(next);
                    }}
                    className={`text-left text-sm border rounded-lg px-3 py-2 transition-colors flex items-start gap-2 ${cls}`}
                  >
                    {submitted && correct && (
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
                    )}
                    {submitted && selected && !correct && (
                      <XCircle size={14} className="mt-0.5 shrink-0" />
                    )}
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
            {submitted && (
              <motion.p
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-[12px] text-slate-400 mt-2 leading-relaxed"
              >
                {q.explanation}
              </motion.p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2">
        {!submitted ? (
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            disabled={!allAnswered}
            className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit answers
          </button>
        ) : (
          <button type="button" onClick={reset} className="btn-ghost">
            <RefreshCw size={14} /> Try again
          </button>
        )}
      </div>
    </div>
  );
}
