# 脅威の見取り図（設計判断用）

- status: canonical
- dimensions: D8, D6, D5
- sources:
  - OWASP Top 10 for LLM Applications 2025 / GenAI LLM Top 10 2026（一次情報）
  - OWASP MCP Top 10（2025, Beta）
  - ai-agent-architecture/docs/ja/mcp/security.md（原則は採用、LLM番号対応は補正）

## 判断の問い

- ユーザー入力がモデルの動作を変えうるか（チャット・RAG・ツール結果のすべて）
- モデルがツールや書き込み権限を持つか（過剰な自律性）
- 社外モデルに渡してよいデータか
- ツール／MCP／プラグインの出所は管理されているか

## 推奨パターン

設計判断では、次を「必ず見る脅威」とする。番号は世代で動くので、**名前で扱う**。

| 脅威（名前） | 設計で効く問い | 典型対策の置き場 |
| --- | --- | --- |
| Prompt Injection | 入力・検索結果・ツール出力を信頼するか | 入力分離、ツール権限縮小、出力検証 |
| Sensitive information disclosure | プロンプト／ログ／コンテキストに秘密が乗るか | マスキング、最小投入、セッション分離 |
| Excessive agency | モデルが「できること」が広すぎないか | 最小権限、破壊的操作は HITL |
| Insecure / poisoned tools (MCP, plugins) | ツール定義と供給源は信頼できるか | 許可リスト、スキーマ検証 |
| Improper output handling | モデル出力をそのまま HTML/SQL/シェルに渡すか | 出力はデータとして扱う |
| Supply chain | モデル・MCP・依存の出所 | ロックファイル、棚卸し |
| Unbounded consumption | 無限ループ・巨大コンテキストで枯渇しないか | 上限、タイムアウト、レート制限 |

MCP を使うなら、アプリ側（LLM Top 10）とサーバー側（MCP Top 10）の両方を見る。
MCP Top 10 で設計に効くもの: Token mismanagement、Privilege creep、Tool poisoning、Command injection、Shadow MCP、Context over-sharing、Audit 不足。

**補正**: 自リポ `mcp/security.md` の「LLM08 = Excessive Agency」は古い番号。2025 年版では Excessive Agency は LLM06、2026 年版では順位が上がり上位（報道上は 3 位付近）。指標では ID より名前を使う。

Prompt Injection は RAG や Fine-tune だけでは消えない（OWASP 2025 の記述）。検索結果も攻撃面である。

## よくある失敗

- 「ガードレール製品を入れたから Injection は終わった」と思う
- コンシューマ向けボットに広いツール権限を最初から付ける
- 未承認 MCP を開発者が個別導入する（Shadow MCP）
- システムプロンプトに秘密やガードレールの内部仕様を書く（漏洩面）

## 代替・例外

- 社内・読み取り専用・人間が最終確認するツールは、過剰な自律性のリスクが相対的に低い。それでも Injection と情報漏洩は残る。
- OWASP リストは年次で入れ替わる。canonical は「名前と問い」を残し、番号は一次情報で更新する。
