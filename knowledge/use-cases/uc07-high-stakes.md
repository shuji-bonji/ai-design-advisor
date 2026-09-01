# 設計判断レポート: UC07 高リスク・高説明責任

**対象**: 金融・法務・医療寄りの社内補助。草案と根拠提示まで。最終判断は人。
**前提**: HITL 必須。監査可能が要件。適用法規の名前は未確認。社外モデル可否は未確認。
**日付**: 2026-09-01
**型**: スキル完全出力（canonical 検証用）
**位置づけ**: 確認論点。決定ではない。一貫性チェックであり、成否の検証ではない。

### 決まっていないこと

- 適用法規と業界ガイドラインの名前
- 承認者は一人か役割か
- 社外 LLM に渡してよいか

### ベンダーに確認してほしい論点

- 承認画面に操作本文が出るか
- 自己レビューで完結していないか
- NIST / AISI 表を合格線にしていないか
- 主体（開発者 / 提供者 / 利用者）を契約に書くか
- 知識を FT していないか

### いま言えること

- モデル: 計画・比較は LLM / Reasoning。分類は小さい側
- パラメータ: Temperature 低め。Effort は計画ターンだけ
- 知識: RAG + Grounding。根拠が無ければ答えない
- 実行系: 品質ゲートを早める。最終判定をモデルに渡さない
- Fine-tune: しない
- 権限: permission 反復。承認は操作本文
- 測り方: 跡、根拠、人の採用。NIST / AISI 表は合格線にしない

### 次元別

| 次元 | 推奨 | 根拠 | 確度 |
| --- | --- | --- | --- |
| D1 | 比較・計画は LLM / Reasoning。社外不可ならオンプレ | selection.md | 条件付き |
| D2 | Temperature 低め。Effort は計画だけ | temperature-and-effort.md | 確定 |
| D3 | 窓は自分で組む。要約して残す | context-as-budget / knowledge-and-memory | 確定 |
| D4 | 観点と合格線を明示。「しっかり」は使わない | writing / ownership | 確定 |
| D5 | RAG + Grounding。出典が要件なら FT しない | when-and-how.md | 確定 |
| D6 | 品質ゲートを早める。初手 Multi-agent にしない | when-to-agentize / quality-gate | 確定 |
| D7 | しない | when-to-finetune.md | 確定 |
| D8 | permission。承認は本文。主体は開発者 / 提供者 / 利用者 | permission-vs-authority / quality-gate / legal-actors | 条件付き |
| D9 | 跡を残す。Judge は抽き取り。人が最終 | loop-eval-and-stop | 条件付き |
| X | 安定提示をキャッシュ。意味キャッシュは権限付き回答に使わない | serving-and-cache.md | 確定 |

D8 が条件付きなのは、法規名前と AISI / NIST を確定推奨にしないから。

### 詳細

- **推奨**: 草案 + 引用 + 別会話の批評。判定権は人。
- **なぜ**: 判定を下流が信じると取り消せない（permission-vs-authority）。
- **代替**: 読み取り専用なら検索 + 引用で止め、承認 UI だけ厚くする。
- **禁止**: 自己レビューで完結、NIST / AISI 表を採点、知識を FT する。
