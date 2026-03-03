export function parseBody(body: string): {
  content: string;
  rationale: string;
  implication: string;
  quote: string;
} {
  const sections: Record<string, string> = {};
  const parts = body.split(/■/).filter(Boolean);
  for (const part of parts) {
    const lineBreak = part.indexOf("\n");
    if (lineBreak === -1) continue;
    const key = part.slice(0, lineBreak).trim();
    const value = part.slice(lineBreak + 1).trim();
    sections[key] = value;
  }
  return {
    content: sections["観点の内容"] ?? "",
    rationale: sections["技術的根拠"] ?? "",
    implication: sections["今後への示唆"] ?? "",
    quote: (sections["原文引用"] ?? "").replace(/^quote:\s*/, ""),
  };
}
