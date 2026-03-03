import type { KnowledgeNode, RelationshipEdge, Perspective, TechDomain, CustomerLayer } from "../types/knowledge";
import { parseSource } from "../utils/parseSource";

function initNodes(rawNodes: Omit<KnowledgeNode, "sourceDate" | "sourceType">[]): KnowledgeNode[] {
  return rawNodes.map((n) => {
    const parsed = parseSource(n.source);
    return { ...n, sourceDate: parsed.date, sourceType: parsed.name };
  });
}

const RAW_NODES: Omit<KnowledgeNode, "sourceDate" | "sourceType">[] = [
  { id: "K1", title: "AD変換：ポート安定待ち時間等の考慮が必須", perspective: "③技術的注意点" as Perspective, product: "コンバータ", domain: "電力変換" as TechDomain, source: "設計チェック-20251104", customerLayers: ["設計・製造の因果関係"] as CustomerLayer[] },
  { id: "K2", title: "AD変換異常時：タイムアウト異常対応が仕様書で定義", perspective: "①判断ルール" as Perspective, product: "コンバータ", domain: "電力変換" as TechDomain, source: "設計チェック-20251104", customerLayers: ["評価基準"] as CustomerLayer[] },
  { id: "K3", title: "AD変換結果取得は変換完了フラグ確認後に実施", perspective: "②社内ルール" as Perspective, product: "コンバータ", domain: "電力変換" as TechDomain, source: "設計チェック-20251104", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K4", title: "サンプルホールド回路はAD変換の基本回路で全方式に必須", perspective: "⑤絶対注意" as Perspective, product: "コンバータ", domain: "電力変換" as TechDomain, source: "設計チェック-20251104", customerLayers: ["対策・設計ノウハウ", "設計チェックリスト"] as CustomerLayer[] },
  { id: "K5", title: "低電圧検出時にパルスあり異常フラグをクリアする", perspective: "⑤絶対注意" as Perspective, product: "コンバータ", domain: "電力変換" as TechDomain, source: "設計チェック-20250923", customerLayers: ["対策・設計ノウハウ"] as CustomerLayer[] },
  { id: "K6", title: "イニシャルチェック中の電圧変動パターンを評価に含める", perspective: "⑧再発防止" as Perspective, product: "コンバータ", domain: "電力変換" as TechDomain, source: "設計チェック-20250923", customerLayers: ["故障モード・故障原因"] as CustomerLayer[] },
  { id: "K7", title: "強制加電圧時のマイコン端子制御", perspective: "④設計思想" as Perspective, product: "コンバータ", domain: "電力変換" as TechDomain, source: "設計チェック-20250923", customerLayers: ["設計・製造の因果関係", "対策・設計ノウハウ"] as CustomerLayer[] },
  { id: "K8", title: "状態遷移条件と処理内容の明確化", perspective: "①判断ルール" as Perspective, product: "コンバータ", domain: "電力変換" as TechDomain, source: "設計チェック-20250923", customerLayers: ["評価基準"] as CustomerLayer[] },
  { id: "K9", title: "パワーサイクル対策で基板銅箔部に金メッキ追加", perspective: "③技術的注意点" as Perspective, product: "コンバータ", domain: "回路/実装" as TechDomain, source: "スタッフ週報-20250729", customerLayers: ["設計・製造の因果関係", "対策・設計ノウハウ"] as CustomerLayer[] },
  { id: "K10", title: "マイコンリセット時のポート状態はハイインピーダンス", perspective: "①判断ルール" as Perspective, product: "充電器", domain: "電力変換" as TechDomain, source: "設計チェック-20251007", customerLayers: ["評価基準", "設計・製造の因果関係"] as CustomerLayer[] },
  { id: "K11", title: "リセット時のハイインピーダンスが外部回路に与える影響", perspective: "⑨影響範囲" as Perspective, product: "充電器", domain: "電力変換" as TechDomain, source: "設計チェック-20251007", customerLayers: ["横展開・波及リスク"] as CustomerLayer[] },
  { id: "K12", title: "リセット時の動作を設計書に明記し外部回路設計者と認識合わせ", perspective: "②社内ルール" as Perspective, product: "充電器", domain: "電力変換" as TechDomain, source: "設計チェック-20251007", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K13", title: "リセット時の誤動作防止にはプルダウン抵抗設計が重要", perspective: "⑤絶対注意" as Perspective, product: "充電器", domain: "電力変換" as TechDomain, source: "設計チェック-20251007", customerLayers: ["対策・設計ノウハウ"] as CustomerLayer[] },
  { id: "K14", title: "割り込み禁止による順序維持と処理負荷の考慮", perspective: "①判断ルール" as Perspective, product: "コンバータ", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20260113", customerLayers: ["評価基準"] as CustomerLayer[] },
  { id: "K15", title: "単体テストツールによる最適化抑制のフィードバック", perspective: "②社内ルール" as Perspective, product: "コンバータ", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20260113", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K16", title: "配列のvolatile宣言による最適化抑制", perspective: "③技術的注意点" as Perspective, product: "コンバータ", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20260113", customerLayers: ["設計・製造の因果関係"] as CustomerLayer[] },
  { id: "K17", title: "コンパイラ最適化のアズイフルールと副作用の扱い", perspective: "④設計思想" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20260113", customerLayers: ["設計・製造の因果関係", "対策・設計ノウハウ"] as CustomerLayer[] },
  { id: "K18", title: "割り込みとメインで共有する変数の順序依存", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20260113", customerLayers: ["対策・設計ノウハウ", "故障モード・故障原因"] as CustomerLayer[] },
  { id: "K19", title: "D-MIPS値による処理速度見積もりの限界と注意点", perspective: "③技術的注意点" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251202", customerLayers: ["設計・製造の因果関係"] as CustomerLayer[] },
  { id: "K20", title: "スタックのベリファイチェック時は関数ジャンプ先に注意", perspective: "③技術的注意点" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251202", customerLayers: ["設計・製造の因果関係"] as CustomerLayer[] },
  { id: "K21", title: "スタック領域の静的・動的見積もり方法", perspective: "③技術的注意点" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251202", customerLayers: ["設計・製造の因果関係"] as CustomerLayer[] },
  { id: "K22", title: "使用メモリ・スタック量の妥当性確認は必須", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251202", customerLayers: ["対策・設計ノウハウ", "設計チェックリスト"] as CustomerLayer[] },
  { id: "K23", title: "処理時間を実測し周期時間内完了を確認すること", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251202", customerLayers: ["対策・設計ノウハウ", "設計チェックリスト"] as CustomerLayer[] },
  { id: "K24", title: "テイラーリングは製品担当と合意した内容を記録する", perspective: "④設計思想" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251202", customerLayers: ["対策・設計ノウハウ"] as CustomerLayer[] },
  { id: "K25", title: "テイラーリング方針とテスト項目の相関確認は必須", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251202", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K26", title: "ソフトウェア変更時は客先と必ず合意を取る", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251021", customerLayers: ["対策・設計ノウハウ", "設計チェックリスト"] as CustomerLayer[] },
  { id: "K27", title: "ソフトウェア設計変更は影響分析後に起票", perspective: "①判断ルール" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251021", customerLayers: ["評価基準"] as CustomerLayer[] },
  { id: "K28", title: "変更内容の詳細記載と保管は必須", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251021", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K29", title: "変更箇所と変更元の明確化は必須", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251021", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K30", title: "変更管理表に変更箇所を明確に記載し帳票連携を徹底", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251021", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K31", title: "設計書・変更管理表の記載内容は必ず一致させる", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20251021", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K32", title: "変更要求管理台帳で一元管理する", perspective: "②社内ルール" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20250909", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K33", title: "変更要求管理台帳のベースライン記載は必須", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20250909", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K34", title: "変更要求管理台帳の分割は規模と機種派生で判断", perspective: "①判断ルール" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20250909", customerLayers: ["評価基準"] as CustomerLayer[] },
  { id: "K35", title: "台帳作成の考え方シートが未整備で課題", perspective: "⑦検討漏れ" as Perspective, product: "共通", domain: "組み込みソフト" as TechDomain, source: "設計チェック-20250909", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K36", title: "シリアル通信のエラー検出方式と判定基準", perspective: "①判断ルール" as Perspective, product: "共通", domain: "通信/車載NW" as TechDomain, source: "設計チェック-20251223", customerLayers: ["評価基準"] as CustomerLayer[] },
  { id: "K37", title: "通信異常検出後のフェールセーフは上位システムと合意必須", perspective: "②社内ルール" as Perspective, product: "共通", domain: "通信/車載NW" as TechDomain, source: "設計チェック-20251223", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K38", title: "通信異常判定ロジックのエラーフラグ上書きに注意", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "通信/車載NW" as TechDomain, source: "設計チェック-20251223", customerLayers: ["故障モード・故障原因", "対策・設計ノウハウ"] as CustomerLayer[] },
  { id: "K39", title: "エラーフラグ上書きによる判定漏れ防止設計", perspective: "⑧再発防止" as Perspective, product: "コンバータ", domain: "通信/車載NW" as TechDomain, source: "設計チェック-20251223", customerLayers: ["故障モード・故障原因"] as CustomerLayer[] },
  { id: "K40", title: "FMEAは故障モード影響解析でリスク評価と対策が必須", perspective: "④設計思想" as Perspective, product: "共通", domain: "機能安全/信頼性" as TechDomain, source: "設計チェック-20250826", customerLayers: ["設計・製造の因果関係", "対策・設計ノウハウ"] as CustomerLayer[] },
  { id: "K41", title: "FMEAは社内標準・業界規格に準拠し最新フォーマット使用", perspective: "②社内ルール" as Perspective, product: "共通", domain: "機能安全/信頼性" as TechDomain, source: "設計チェック-20250826", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K42", title: "FMEAは未然防止のため事前リスク評価が必須", perspective: "⑤絶対注意" as Perspective, product: "共通", domain: "機能安全/信頼性" as TechDomain, source: "設計チェック-20250826", customerLayers: ["対策・設計ノウハウ", "故障モード・故障原因"] as CustomerLayer[] },
  { id: "K43", title: "サイバーセキュリティ要求はFMEAで重点管理項目として工程に申し送り", perspective: "⑤絶対注意" as Perspective, product: "充電器", domain: "通信/車載NW" as TechDomain, source: "設計チェック-20250826", customerLayers: ["対策・設計ノウハウ", "横展開・波及リスク"] as CustomerLayer[] },
  { id: "K44", title: "NG品試験時は必ず組長・課長に相談", perspective: "②社内ルール" as Perspective, product: "共通", domain: "回路/実装" as TechDomain, source: "スタッフ週報-20250729", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
  { id: "K45", title: "断面観察指示書は正式シートのみ使用", perspective: "②社内ルール" as Perspective, product: "共通", domain: "回路/実装" as TechDomain, source: "スタッフ週報-20250729", customerLayers: ["設計チェックリスト"] as CustomerLayer[] },
];

const DEFAULT_EDGES: RelationshipEdge[] = [
  { from: "K1", to: "K4", type: "前提", description: "AD変換の時間的注意点がサンプルホールド必須の前提" },
  { from: "K8", to: "K5", type: "前提", description: "状態遷移条件の明確化がフラグクリアの前提" },
  { from: "K6", to: "K8", type: "対策", description: "電圧変動パターン評価追加が状態遷移条件明確化の対策" },
  { from: "K10", to: "K11", type: "波及", description: "リセット時ハイインピーダンスが外部回路に波及" },
  { from: "K11", to: "K13", type: "対策", description: "外部回路波及リスクに対しプルダウン抵抗が対策" },
  { from: "K13", to: "K12", type: "前提", description: "プルダウン抵抗設計の徹底は設計書明記と認識合わせが前提" },
  { from: "K2", to: "K3", type: "対策", description: "AD変換異常時の判断ルールが結果取得の社内ルールの対策" },
  { from: "K16", to: "K14", type: "前提", description: "volatile宣言は割り込み禁止による順序維持の前提" },
  { from: "K15", to: "K14", type: "対策", description: "単体テストのフィードバックが最適化抑制の対策" },
  { from: "K17", to: "K18", type: "前提", description: "アズイフルールの理解が順序依存の絶対注意の前提" },
  { from: "K22", to: "K21", type: "前提", description: "メモリ妥当性確認はスタック見積もり方法の理解が前提" },
  { from: "K22", to: "K20", type: "前提", description: "メモリ妥当性確認はベリファイチェック注意点の理解が前提" },
  { from: "K23", to: "K19", type: "前提", description: "処理時間実測はD-MIPS限界の理解が前提" },
  { from: "K25", to: "K24", type: "前提", description: "テスト項目相関確認はテイラーリング設計思想が前提" },
  { from: "K30", to: "K29", type: "波及", description: "帳票変更漏れが変更箇所明確化の必要性に波及" },
  { from: "K34", to: "K35", type: "前提", description: "台帳分割判断の前提として考え方シートが未整備" },
  { from: "K32", to: "K33", type: "前提", description: "台帳一元管理が台帳ベースライン記載の前提" },
  { from: "K36", to: "K37", type: "前提", description: "通信異常判定方式の選定は上位システム合意が前提" },
  { from: "K39", to: "K38", type: "前提", description: "エラーフラグ上書き防止が判定漏れ防止の前提" },
  { from: "K41", to: "K42", type: "前提", description: "社内標準準拠が未然防止の事前リスク評価の前提" },
  { from: "K40", to: "K42", type: "前提", description: "FMEAリスク評価の設計思想が未然防止の前提" },
];

export const defaultKnowledgeNodes: KnowledgeNode[] = initNodes(RAW_NODES);
export const defaultRelationshipEdges: RelationshipEdge[] = DEFAULT_EDGES;
