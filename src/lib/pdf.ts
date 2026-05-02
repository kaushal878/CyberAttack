import jsPDF from "jspdf";
import type { Attack } from "../types";

/**
 * Generate a downloadable summary PDF for a given attack.
 * Uses jsPDF's plain-text API so it works fully offline / without
 * network fonts.
 */
export function downloadAttackSummary(attack: Attack): void {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;

  let y = margin;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(attack.name, margin, y);
  y += 24;

  doc.setFont("helvetica", "italic");
  doc.setFontSize(11);
  doc.setTextColor(80);
  doc.text(attack.tagline, margin, y);
  y += 22;

  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  const desc = doc.splitTextToSize(attack.shortDescription, maxWidth);
  doc.text(desc, margin, y);
  y += desc.length * 14 + 12;

  // Section helper
  const section = (title: string) => {
    if (y > 760) {
      doc.addPage();
      y = margin;
    }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, margin, y);
    y += 16;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
  };

  const paragraph = (text: string) => {
    const lines = doc.splitTextToSize(text, maxWidth);
    if (y + lines.length * 14 > 800) {
      doc.addPage();
      y = margin;
    }
    doc.text(lines, margin, y);
    y += lines.length * 14 + 8;
  };

  const bullets = (items: string[]) => {
    items.forEach((item) => {
      const lines = doc.splitTextToSize(`• ${item}`, maxWidth);
      if (y + lines.length * 14 > 800) {
        doc.addPage();
        y = margin;
      }
      doc.text(lines, margin, y);
      y += lines.length * 14 + 4;
    });
    y += 6;
  };

  section("How it works");
  paragraph(attack.howItWorks);

  section("Attack timeline");
  attack.steps.forEach((s, i) => {
    if (y > 760) {
      doc.addPage();
      y = margin;
    }
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}. ${s.title}`, margin, y);
    y += 14;
    doc.setFont("helvetica", "normal");
    const lines = doc.splitTextToSize(s.description, maxWidth - 12);
    doc.text(lines, margin + 12, y);
    y += lines.length * 14 + 4;
    if (s.technique) {
      doc.setTextColor(120);
      doc.setFontSize(10);
      doc.text(`technique: ${s.technique}`, margin + 12, y);
      doc.setTextColor(0);
      doc.setFontSize(11);
      y += 14;
    }
    y += 4;
  });

  section("Real-world impact");
  bullets(attack.impact);

  section("Prevention");
  bullets(attack.prevention);

  section("Quick check");
  attack.quiz.forEach((q, qi) => {
    if (y > 740) {
      doc.addPage();
      y = margin;
    }
    doc.setFont("helvetica", "bold");
    paragraph(`Q${qi + 1}. ${q.question}`);
    doc.setFont("helvetica", "normal");
    q.options.forEach((opt, oi) => {
      const marker = oi === q.answer ? "[correct]" : "         ";
      paragraph(`  ${marker} ${String.fromCharCode(65 + oi)}. ${opt}`);
    });
    paragraph(`Why: ${q.explanation}`);
  });

  doc.save(`cyberattack-visualizer-${attack.id}.pdf`);
}
