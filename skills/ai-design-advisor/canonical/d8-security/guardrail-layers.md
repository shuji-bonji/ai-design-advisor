# ガードレールは多層（入力・モデル・ツール・出力・運用）

- status: canonical
- dimensions: D8, D9, D6
- verified_clusters: C05, C06, C16, C21
- sources:
  - OWASP LLM / MCP Top 10
  - OpenAI Practical Guide: layered guardrails
  - Fowler: Guardrails
  - AWS Generative AI Lens: security pillar
  - MCP Security Best Practices 2026-07-28
  - ai-agent-architecture/docs/ja/mcp/security.md
  - D6 quality-gate-and-objectivity.md
  - understanding-llm: Hooks はコンテキスト外の機械的検証

## 判断の問い

- どの層で止めるか。プロンプト一文だけで止めるつもりになっていないか
- 機械的に検証できることを LLM に任せていないか
- MCP を選ぶなら認可モデルを読んだか
- セッション ID や state を認証の代わりにしていないか

## 推奨パターン

単一のガードレール製品や system prompt の禁止文では足りない。層を分ける。

| 層 | 止めるもの | 手段の例 |
| --- | --- | --- |
| 入力 | 直接 Injection、過大入力、PII | 長さ制限、分類、マスキング |
| 検索・ツール結果 | 間接 Injection、毒 | 出典制限、スキーマ、信頼できる MCP のみ |
| モデル | 方針逸脱、秘密の復唱 | system 方針、出力フィルタ |
| ツール実行 | Excessive agency | 最小権限、allowlist、HITL |
| 出力 | 生流し・漏洩 | 出力はデータとして扱う |
| 運用 | 検知できない逸脱 | 監査、レート制限、品質ゲート |

規則ベース（ブロックリスト・長さ上限・正規表現）を LLM 層と並べる。

MCP:

- 許可リスト
- Token passthrough 禁止。下流には別トークン
- **C21（MCP 公式・一源）: セッション ID や state handle は認証ではない。** 所持者だけ知っている値ではない
- スコープは最小から
- Shadow MCP を棚卸しする

成熟度: 無管理 → 許可リスト → 監視 → 自動化。

## よくある失敗

- 入力サニタイズだけで Injection 完了
- クライアントのトークンを下流に流す
- セッション ID があるだけで操作を通す
- 開発用 MCP を本番に流用する

## 代替・例外

- オフライン SLM でも Injection と過剩権限は残る
- 規制業種は「データを外に出さない」が先
