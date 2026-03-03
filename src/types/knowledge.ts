export type Perspective =
  | "①判断ルール"
  | "②社内ルール"
  | "③技術的注意点"
  | "④設計思想"
  | "⑤絶対注意"
  | "⑥前提条件"
  | "⑦検討漏れ"
  | "⑧再発防止"
  | "⑨影響範囲";

export type TechDomain =
  | "電力変換"
  | "組み込みソフト"
  | "通信/車載NW"
  | "機能安全/信頼性"
  | "回路/実装";

export type CustomerLayer =
  | "故障モード・故障原因"
  | "設計・製造の因果関係"
  | "評価基準"
  | "対策・設計ノウハウ"
  | "設計チェックリスト"
  | "横展開・波及リスク";

export type KnowledgeNode = {
  id: string;
  title: string;
  perspective: Perspective;
  product: string;
  domain: TechDomain;
  source: string;
  customerLayers: CustomerLayer[];
  sourceDate: string;
  sourceType: string;
  customer?: string;
  phase?: string;
  workflow?: string;
  body?: string;
  quote?: string;
};

export type RelationshipEdge = {
  from: string;
  to: string;
  type: "因果" | "前提" | "波及" | "対策";
  description: string;
};

export const PERSPECTIVES: Perspective[] = [
  "①判断ルール",
  "②社内ルール",
  "③技術的注意点",
  "④設計思想",
  "⑤絶対注意",
  "⑥前提条件",
  "⑦検討漏れ",
  "⑧再発防止",
  "⑨影響範囲",
];

export const DOMAINS: TechDomain[] = [
  "電力変換",
  "組み込みソフト",
  "通信/車載NW",
  "機能安全/信頼性",
  "回路/実装",
];
