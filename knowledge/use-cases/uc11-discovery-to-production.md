# 設計判断レポート: UC11 発見から生産へ

**対象**: 社内で探索していた補助を、他部署へ渡す直前。指示書が書ける部分と書けない部分が混じる。
**前提**: 探索履歴が残っている。合格線は未整理。利用者は先輩だけではない。
**日付**: 2026-08-31
**型**: スキル完全出力（canonical 検証用）

### 推奨構成（要約）

- モデル: 生産経路は小さい側。発見は LLM 可
- パラメータ: 生産は Temperature 低め。発見に高 Effort を残さない
- 知識: 指示書はファイルへ。探索履歴を本番に混ぜない
- 実行系: 書ける部分だけ生産モード
- Fine-tune: しない
- 権限: 本番の書き込みは HITL
- 測り方: 合格線を先に書く。機械線は Hooks

### 次元別

| 次元 | 推奨 | 根拠 | 確度 |
| --- | --- | --- | --- |
| D1 | 生産は小さい側。発見だけ大きい | selection.md | 確定 |
| D2 | 生産は低 Temperature / 低 Effort | temperature-and-effort.md | 確定 |
| D3 | 探索履歴を本番コンテキストに残さない | context-as-budget / discovery-vs-production | 確定 |
| D4 | 指示書をファイルに外在化。他人の指示書を理解済みにしない | ownership / writing / discovery-vs-production | 確定 |
| D5 | 社内文書は RAG。探索メモは索引にしない | when-and-how.md | 確定 |
| D6 | 生産は段を上げない。破綻したら発見へ戻す | when-to-agentize / discovery-vs-production | 確定 |
| D7 | しない | when-to-finetune.md | 確定 |
| D8 | 本番の操作は permission | permission-vs-authority | 確定 |
| D9 | 圧縮レディネスでモードを分ける。機械線は Hooks | discovery-vs-production / hooks-and-runtime | 確定 |
| X | 生産の system を固定してキャッシュ | serving-and-cache.md | 確定 |

### 詳細

- **推奨**: 指示書が書ける部分だけ生産へ。探索履歴は捨てる。
- **なぜ**: 本番は Context Rot / Decay / Sycophancy に正面から当たる。
- **代替**: 同じ案件で混在してよい。
- **禁止**: 探索履歴を本番に残す、他人の指示書をそのまま使う、早すぎるテンプレ強制。

### ベンダーに渡す文

- やること: 指示書の外在化、モード分離、合格線の先出し、Hooks
- やらないこと: チャット履歴をそのまま製品化

### 追加確認

- 指示書が書ける範囲
- 後輩が使うときの再圧縮
