const LAYER_MAPPING: Record<string, string[]> = {
  "①": ["対策・設計ノウハウ"],
  "②": ["設計チェックリスト"],
  "③": ["設計・製造の因果関係"],
  "④": ["設計・製造の因果関係"],
  "⑤": ["対策・設計ノウハウ", "設計チェックリスト"],
  "⑥": ["設計・製造の因果関係"],
  "⑦": ["故障モード・故障原因"],
  "⑧": ["故障モード・故障原因", "対策・設計ノウハウ"],
  "⑨": ["横展開・波及リスク"],
};

export function perspectiveToLayers(perspective: string): string[] {
  const key = perspective.charAt(0);
  return LAYER_MAPPING[key] ?? [];
}
