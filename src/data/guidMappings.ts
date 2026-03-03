export const productMapping: Record<string, string> = {
  "43cf88dd-e612-f111-8342-7ced8dbe2416": "共通",
  "b6c37195-e712-f111-8342-7ced8dbe2416": "コンバータ",
  "ab6e6711-e612-f111-8342-7ced8dbe2416": "充電器",
};

export const customerMapping: Record<string, string> = {
  "e5f2c418-ba0d-f111-8342-7ced8dbe2416": "共通",
  "24429aa2-ea12-f111-8342-7ced8dbe2416": "日産",
};

export const phaseMapping: Record<string, string> = {
  "4732ad9d-bf0d-f111-8342-7ced8dbe2416": "量産設計",
  "f03db7ff-8913-f111-8342-7ced8dbe2416": "プレAS",
  "93abfb72-8215-f111-8342-7ced8dbe2416": "SR",
};

export const workflowMapping: Record<string, string> = {
  "fa09889d-2f0e-f111-8342-7ced8dbe2416": "設計チェック",
  "a311a79c-2d0e-f111-8342-7ced8dbe2416": "設計レビュー",
  "bcdcdda3-3513-f111-8342-7ced8dbe2416": "ソフトウェアテスト",
};

export const resolveGuid = (guid: string, mapping: Record<string, string>): string => {
  return mapping[guid] ?? guid;
};
