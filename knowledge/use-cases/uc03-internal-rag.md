# 設計判断レポート: UC03 社内ナレッジ RAG

**対象**: 社員向けの社内文書 Q&A。規程・手順書・既往 QA。根拠提示が必須。書き込みは無い。
**前提**: 利用者は社員。文書に ACL がある。社外モデル可否は未確認。合格線の数値は未確認。
**日付**: 2026-08-30
**型**: スキル完全出力（canonical 検証用）

### 推奨構成（要約）

- モデル: 定型は中〜小。長文の整理だけ大きい
- パラメータ: Temperature 0.0–0.3。Effort は最小
- 知識: Hybrid + Rerank（段 2–3）。権限なし文書を混ぜない。マスタは embedding しない
- 実行系: 段 0–2。Agentic RAG にしない
- Fine-tune: しない
- 権限: 検索に ACL。根拠が無ければ答えない
- 測り方: Retrieval と Generation を分ける

### 次元別

| 次元 | 推奨 | 根拠 | 確度 |
| --- | --- | --- | --- |
| D1 | 定型 Q&A は小さい LLM / SLM。社外不可ならオンプレ / オンデバイス | selection.md | 条件付き |
| D2 | Temperature 低め。Effort は最小 | temperature-and-effort.md | 確定 |
| D3 | 常駐は短く。文書全量を窓に載せない | context-as-budget / knowledge-and-memory | 確定 |
| D4 | 常駐は方針 + 禁止 + 引用形式。例より検索 | placement / writing / optimization-techniques | 確定 |
| D5 | Hybrid + Rerank。Grounding。更新・削除をインデックスへ | when-and-how.md | 確定 |
| D6 | 段 2 で止める。検索をループにしない | when-to-agentize.md | 確定 |
| D7 | しない。変わる知識と出典 | when-to-finetune.md | 確定 |
| D8 | ACL を検索前に。注入着弾前提 | threat-landscape / guardrail-layers | 確定 |
| D9 | 検索と回答を別評価。Judge は後 | loop-eval-and-stop | 条件付き |
| X | system / クエリ型をキャッシュ | serving-and-cache.md | 確定 |

D1 が条件付きなのは社外出力可否が未確認だから。D9 は数値目標がノートに無いから。

### 詳細

- **推奨**: 一回の検索 + 回答 + 引用。権限の違うコーパスを同じインデックスに乗せない。
- **なぜ**: 出典と更新が要件。FT も Agentic RAG も先に壊れる。
- **代替**: 検索が親を汚すなら検索だけ Sub-agent。全件 5 段にしない。
- **禁止**: FAQ を重みへ焼く、権限なし文書の混入、マスタを embedding だけで解く。

### ベンダーに渡す文

- やること: Hybrid + rerank、ACL、更新削除の反映、引用付き回答、答えられない定型、検索と回答の別評価
- やらないこと: LoRA、Agentic RAG、全文チャンクの毎回挿入

### 追加確認

- 社外モデルに渡してよいか
- 部署マスタ・人事が検索対象か（関係ならツール）
