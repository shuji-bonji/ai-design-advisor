# いつエージェント化するか（Plain / Tool / Agent / Multi-agent）

- status: canonical
- dimensions: D6, X
- verified_clusters: C01, C22
- sources:
  - Anthropic: Building effective agents
  - OpenAI: A practical guide to building agents
  - AWS Agentic AI Lens
  - 12-Factor Agents Factor 10
  - ai-agent-architecture の composition / faq

## 判断の問い

- 1回の生成で足りるか、外部の事実・操作が要るか、多段が要るか
- 失敗したときのコストは高いか
- 指示の条件分岐が育てないか、似たツールを取り違えているか

## 推奨パターン

複雑さは下から足す。

| 段 | 構成 | 使う条件 |
| --- | --- | --- |
| 0 | Plain Prompt | 単発の生成 |
| 1 | Prompt + Skill | 繰り返すやり方 |
| 2 | + Tool / MCP / CLI | 最新事実・操作 |
| 3 | Tool-calling Agent | 計画→実行→観察→再計画 |
| 4 | Sub-agent / 品質ゲート | 親汚染、客観レビュー、並列 |
| 5 | Multi-agent | 責務分割が必要で予算が足りない |

コンシューマ向けは最初 0–2。単一エージェントを先に極める。能力はツール足し。

複数化の失敗シグナル: 条件分岐が育てない、ツールが似て取り違える、複雑な指示に従えない。初手の型は Manager。

**ホスト名や A2A の商標で段を選ばない。** 独立コンテキストが要るか、責務を分ける必要があるかで見る。製品差は未確認のまま残す。

## よくある失敗

- 単発 Q&A に Multi-agent を載せる
- RAG で足りる検索を Agentic RAG にする
- 生成と自己レビューを同じ会話で完結させる
- 歩数の目安を合格線にする
- 「このホストだから Multi-agent」と決める

## 代替・例外

- 規制・監査が強い領域では品質ゲートを早めてよい
- オンデバイス SLM ではマルチエージェントはレイテンシが先に破綻しやすい
- **C22（12-Factor heuristic・一源）:** 「3–10 歩、多くて 20 歩」は狙いエージェントの感親。閾値として転記しない。歩数が増えたら分割を疑う、とだけ採る
