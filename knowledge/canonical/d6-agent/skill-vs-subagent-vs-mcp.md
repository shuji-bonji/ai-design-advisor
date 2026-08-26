# Skill / Sub-agent / MCP / Agent の選び方

- status: canonical
- dimensions: D6, D3
- sources:
  - ai-agent-architecture/docs/ja/faq/agent-vs-subagent-vs-skill.md
  - ai-agent-architecture/docs/ja/agents/subagent-vs-skill.md
  - ai-agent-architecture/docs/ja/faq/mcp-vs-skills.md
  - understanding-llm-through-claude-code/docs/ja/05-on-demand-context/skill-vs-agent.md
  - understanding-llm-through-claude-code/docs/ja/appendix/problem-countermeasure-map.md（独立コンテキストが Context Rot / Sycophancy 対策になる根拠）

## 判断の問い

- 外部に手を伸ばす必要があるか（API / DB / ファイルシステム）
- やり方・規約・テンプレを教えたいだけか
- 中間のツール呼出が親コンテキストを汚すか
- 並列実行や客観的な別人格が必要か
- 既存 CLI で足りるか

## 推奨パターン

4者は同じものではない。「誰が・何を知り・何でつながるか」が別軸。

| 単位 | 本質 | コンテキスト |
| --- | --- | --- |
| Agent | 思考・意思決定・統括の主体 | 親（ホストが提供することが多い） |
| Sub-agent | 親から委任された独立コンテキストの専門家 | **独立**。中間呼出は親に流入しない |
| Skill | やり方・規約・手順書 | **親と同じ**。展開すると親のトークンを消費 |
| MCP | 外部システムへの接続 | ツール定義自体がコンテキストを消費しうる |

**デフォルトは Skill から。** Markdown 1ファイルで始められる。次が「外部接続が必要なら MCP（または既存 CLI + Skill）」、最後が「独立コンテキストが要件になってから Sub-agent」。

Skill vs Sub-agent の分岐は機能の優劣ではなく **コンテキスト境界の有無**。

Sub-agent を選ぶ条件（上から Yes で決定）:

1. 中間ツール呼出が多く、親のコンテキストを汚す（探索的な横断検索など）
2. 同じタスクを並列で走らせたい
3. 最終結果だけ欲しく、過程は不要
4. ロール固定の独立人格が品質に直結する（レビュー、監査）

それ以外は Skill。

MCP vs Skill:

- 接続が必要 → MCP（ただし既存 CLI で足りるなら **Skill + CLI** の方がトークン効率が良いことが多い）
- 知識・判断基準を教えたい → Skill
- 両方必要なら両方使う（排他ではない）

昇格シグナル（Skill → Sub-agent）:

- 呼ぶたびに親コンテキストが膨らむ
- Skill 内で外部ツールを何度も呼ぶ
- 並列が必要になった
- 客観性（レビュー・検証）が品質に直結し始めた

昇格しても Skill は残してよい。Sub-agent が Skill を参照する形が標準。

## よくある失敗

- 「Sub-agent = 強力版 Skill」と思う
- Skill で足りる定型（規約・テンプレ）を Sub-agent 化する（起動コストが重い）
- 探索・横断調査を Skill だけでやり、親コンテキストが爆発する
- 何でも MCP にする（判断不要な処理や人間が叩く CLI まで）
- 4つ全部を最初から揃える

## 代替・例外

- Sub-agent のネスト不可など、起動の仕様はホスト製品依存。一般論としては「独立コンテキストが必要か」で判断する。
- 「親を 1,000 トークン以上汚さないなら Skill」は自リポの目安であり、公式の閾値ではない（ヒューリスティック）。
- Orchestrator / Swarm / メタエージェントは実装単位ではなく設計パターン。
