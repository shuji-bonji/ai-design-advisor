# 設計判断レポート: UC10 Skill / Sub-agent / MCP の組み

**対象**: 社内の調査補助。規約の読み方、社内検索、別人格のレビューがある。初手から Teams にしない。
**前提**: 既存 CLI で読めるリポがある。MCP の認可モデルは未確認。
**日付**: 2026-09-01
**型**: スキル完全出力（canonical 検証用）
**位置づけ**: 確認論点。決定ではない。一貫性チェックであり、成否の検証ではない。

### 決まっていないこと

- MCP にしか読めない端末があるか
- レビュー MUST の視点
- MCP の認可モデル

### ベンダーに確認してほしい論点

- Skill から始めているか。初手で 4 つ揃えていないか
- 既存 CLI で足りる接続を MCP にしていないか
- MCP を使うなら別トークンか
- レビューは別会話か。同一会話の自己レビューで完結していないか
- 中間検索を親に流していないか

### いま言えること

- モデル: 親は LLM。ゲートは別コンテキスト
- パラメータ: Temperature 低め。Effort は計画だけ
- 知識: 手順は Skill。検索が親を汚すなら Sub-agent
- 実行系: Skill から。CLI で足りるなら MCP を急がない
- Fine-tune: しない
- 権限: passthrough 禁止。レビューは独立コンテキスト
- 測り方: 親のトークン増加とゲートの不合格率

### 次元別

| 次元 | 推奨 | 根拠 | 確度 |
| --- | --- | --- | --- |
| D1 | 親は LLM。ゲートは小さい側可 | selection.md | 確定 |
| D2 | Effort は計画だけ。ゲートに高 Effort を重ねない | temperature-and-effort.md | 確定 |
| D3 | 中間呼出を親に流さない | context-as-budget / skill-vs-subagent | 確定 |
| D4 | 手順は Skill ファイル。常駐に書かない | ownership / placement | 確定 |
| D5 | 検索はツール / Sub-agent。Agentic RAG にしない | when-and-how.md | 確定 |
| D6 | Skill から。汚染・客観・並列で Sub-agent。MCP は接続が要るとき | skill-vs-subagent / when-to-agentize | 確定 |
| D7 | しない | when-to-finetune.md | 確定 |
| D8 | passthrough 禁止。ゲートは別会話 | permission-vs-authority / quality-gate | 条件付き |
| D9 | 機械線は Hooks。ゲート中で LLM 判定しない | hooks-and-runtime / quality-gate | 確定 |
| X | ツール定義をキャッシュ。定義が肥ると TTFT が壊れる | serving-and-cache.md | 確定 |

D8 が条件付きなのは、MCP 認可が未確認だから。

### 詳細

- **推奨**: Skill → CLI。親が汚れる検索だけ Sub-agent。レビューは別コンテキスト。
- **なぜ**: 4 者は同じものではない。Sub-agent は強力版 Skill ではない。
- **代替**: 既存 CLI が無ければ MCP。別トークン。
- **禁止**: 初手で 4 つ揃える、passthrough、自己レビューで完結。
