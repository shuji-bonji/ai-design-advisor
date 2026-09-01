# 設計判断レポート: UC09 案件をまたぐ Memory

**対象**: 社内セールス補助。顧客・案件・約束を会話越しで残す。チケット書き込みは別経路。
**前提**: 「前回の続き」が要件。社外モデル可否は未確認。段落要約のタイミングは未確認。
**日付**: 2026-09-01
**型**: スキル完全出力（canonical 検証用）
**位置づけ**: 確認論点。決定ではない。一貫性チェックであり、成否の検証ではない。

### 決まっていないこと

- 残す項目（顧客 ID・約束・次アクション）
- 書き込み承認は起案者と別人か
- 社外モデル可否
- 要約のタイミング

### ベンダーに確認してほしい論点

- Memory のスキーマと出所制限があるか
- モデルが自由に書けないか
- 会話ログ全量を Memory と呼んでいないか
- チケット本体はツールか
- 個人 Memory を共有キャッシュしていないか

### いま言えること

- モデル: 定型は小さい側。案件整理は LLM
- パラメータ: Temperature 低め。Effort は整理ターンだけ
- 知識: 関係は Memory。規約は RAG。履歴全量は Memory 代わりにしない
- 実行系: メモ書き込み前に止める
- Fine-tune: しない
- 権限: メモ書き込みは権限操作。スキーマと出所
- 測り方: 毒の混入を別に見る

### 次元別

| 次元 | 推奨 | 根拠 | 確度 |
| --- | --- | --- | --- |
| D1 | 整理は LLM。定型応答は SLM 可 | selection.md | 条件付き |
| D2 | Temperature 低め。Effort は整理だけ | temperature-and-effort.md | 確定 |
| D3 | 関係は Memory。履歴だけを Memory にしない | knowledge-and-memory / context-as-budget | 確定 |
| D4 | 常駐は短く。関係はプロンプトに書かない | placement / optimization-techniques | 確定 |
| D5 | 規約・製品は RAG。顧客マスタはツール | when-and-how.md | 確定 |
| D6 | Memory 書き込み前に止める | when-to-agentize / permission-vs-authority | 確定 |
| D7 | しない | when-to-finetune.md | 確定 |
| D8 | メモ書き込みは承認。注入の延長面 | knowledge-and-memory / threat-landscape | 確定 |
| D9 | 出所と書き込み成否を跡に残す | loop-eval-and-stop / hooks-and-runtime | 確定 |
| X | 定型 system をキャッシュ。個人 Memory を共有キャッシュしない | serving-and-cache.md | 確定 |

### 詳細

- **推奨**: 関係だけ Memory。モデルは自由に書けない。
- **なぜ**: 毒が以後のセッションを汚す（ASI06）。
- **代替**: 関係が浅いなら Memory を急がない（UC01 寄り）。
- **禁止**: 履歴全量を Memory に投げる、モデルの自由書き込み、FAQ を FT する。
