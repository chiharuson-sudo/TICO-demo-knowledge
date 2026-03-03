/**
 * 識別名（name）から会議名と日付を抽出
 * パターン1: "設計チェックシート読み合わせ会-20260113_110416.vtt_202601131104"
 * パターン2: "スタッフ週報会-20250729_093111-会議の録音.vtt_202603011521"
 * パターン3: "設計チェック...-20250826_110531-会議の.vtt---..."
 * パターン4: "設計チェックシート読み合わせ会-20250909.vtt_202509091103"
 * パターン5: "設計チェック-20251104"（従来形式）
 */
export function parseSource(name: string): { name: string; date: string } {
  const primary = name.split("---")[0];
  const dateMatch = primary.match(/-(\d{8})/);
  if (!dateMatch) return { name: primary, date: "unknown" };
  const dateStr = dateMatch[1];
  const date = `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
  const nameEnd = primary.indexOf(`-${dateStr}`);
  const meetingName = nameEnd > 0 ? primary.slice(0, nameEnd) : primary;
  return { name: meetingName, date };
}
