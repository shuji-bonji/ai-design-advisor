# 設計判断レポート: UC01 コンシューマ向け FAQ ボット

**対象**: 自社 EC のコンシューマ向け FAQ チャット。返品規約・配送・商品説明。在庫は社内 DB 参照。決済・返金実行はしない。
**前提**: データを社外モデルに渡してよい（PII は投入しない）。体感の対話が優先。合格線の数値目標は未確認。
**日付**: 2026-08-28
**型**: スキル完全出力（canonical 検証用）

### 推奨構成（要約）

- モデル: 定型は中〜小。難しい問い合わせだけ大きい / Reasoning
- パラメータ: Temperature 低め。Effort は最小から
- 知識: RAG（規約・商品）。Memory は急がない。在庫はツール
- 実行系: 段 0–2。ツールは読み取りのみ。Agent ループにしない
- Fine-tune: しない
- 権限: 参照のみ。PII はログに残さない
- 測り方: Retrieval と Generation を分ける。答えられない経路

### 次元別

| 次元 | 推奨 | 根拠 | 確度 |
| --- | --- | --- | --- |
| D1 | 定型は小さい LLM / SLM。難しい問い合よせだけ上げる | selection.md | 確定 |
| D2 | Temperature 低め。Effort は最小 | temperature-and-effort.md | 確定 |
| D3 | 常駐は短く。履歴は要約かスライド。Memory は急がない | context-as-budget.md / knowledge-and-memory.md | 確定 |
| D4 | 常駐は方針 + 禁止 + 形式。FAQ は例より検索。出力 2–4 文 | placement / writing / optimization-techniques | 確定 |
| D5 | Hybrid + Rerank（段 2–3）。在庫は embedding しない | when-and-how.md | 確定 |
| D6 | 段 2 で止める。ループにしない | when-to-agentize.md | 確定 |
| D7 | しない | when-to-finetune.md | 確定 |
| D8 | 読み取りツール。注入着弾前提。PII 非投入 | threat-landscape / guardrail-layers / permission-vs-authority | 確定 |
| D9 | 検索と回答を分けて測る。コストは層1・3が先 | loop-eval-and-stop / cost-decomposition | 条件付き |
| X | system 接頭辞をキャッシュ。FAQ の意味キャッシュは権限付き回答に使わない | serving-and-cache.md | 確定 |

D9 が条件付きなのは、レイテンシ / コストの数値目標が未確認だから。

### 詳細

- **推奨**: 一回の回答 + 検索 + 必要なら在庫参照。規約は RAG。在庫・注文の関係はツール（C20）。
- **なぜ**: 単発 Q&A にループを載せると体感とコストが先に壊れる（D6 / D9 第5層）。
- **代替**: 規制が強い問い合わせだけ品質ゲートを足してよい。全件 Multi-agent にしない。
- **禁止**: 決済ツール、FAQ を FT する、チャンク全量を毎回挿む、常駐を百科事典にする。

### ベンダーに渡す文

- やること: Hybrid 検索 + rerank、在庫参照 API、答えられない時の定型文、PII 落とし、検索と回答の別評価
- やらないこと: エージェント化、LoRA、広い書き込み権限、ガードレール製品一枚で Injection 完了

### 追加確認

- 体感の上限（TTFT / 全体）
- 社外モデルに渡してよいデータの範囲
- 在庫 API の権限（読み取り専用か）
