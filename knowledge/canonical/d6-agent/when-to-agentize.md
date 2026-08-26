# いつエージェント化するか（Plain / Tool / Agent / Multi-agent）

- status: canonical
- dimensions: D6, X
- verified_clusters: C01
- sources:
  - Anthropic: Building effective agents（単純さ優先、必要が証明されてから複雑化）
  - OpenAI: A practical guide to building agents（単一エージェントを先に極める。複数化の失敗シグナル）
  - AWS Agentic AI Lens: decompose into specialized bounded agents
  - 12-Factor Agents Factor 10: Small, Focused Agents
  - ai-agent-architecture/docs/ja/faq/agent-vs-subagent-vs-skill.md
  - ai-agent-architecture/docs/ja/strategy/composition-patterns.md
  - understanding-llm problem-countermeasure-map

## 判断の問い

- 1回の生成で足りるか、外部の事実・操作が要るか、多段の計画と再試行が要るか
- 失敗したときのコストは高いか（レビューなしで本番に出るか）
- レイテンシとコストの予算はどれくらいか
- 指示の条件分岐が育てないか、似たツールを取り違えているか（複数化の前提）

## 推奨パターン

複雑さは下から足す。上の段は下を内包してよいが、最初から最上段にしない。

| 段 | 構成 | 使う条件 |
| --- | --- | --- |
| 0 | Plain Prompt | 単発の生成。知識はプロンプト内で足りる |
| 1 | Prompt + Skill（手順・規約） | 繰り返すやり方がある。接続はまだ不要 |
| 2 | + Tool / MCP / CLI | 最新事実・社内データ・操作が必要 |
| 3 | Tool-calling Agent（ループ） | 計画→実行→観察→再計画が必要 |
| 4 | Sub-agent / 品質ゲート | 親コンテキスト汚染、客観レビュー、並列 |
| 5 | Multi-agent / Teams | 責務分割が必要で、単一ループでは予算が足りない |

コンシューマ向けチャットボットの多くは、最初は 0〜2 で足りる。
「エージェント」という言葉を先に置かない。ツール呼び出しのループが必要になってから 3 に上げる。

**単一エージェントを先に極める。** 能力はエージェント増やしではなくツール足しで広げる（OpenAI、Anthropic、AWS Lens、12-Factor が同方向）。

複数化してよい失敗シグナル（OpenAI）:

- 指示の条件分岐が増えてテンプレートが育てない
- ツールが似て取り違える
- 複雑な指示に従えない

複数化するときの型: Manager（中央が専門家をツール呼び出し）か handoff（制御を渡す）。初手は Manager の方が追いやすい。

複合構成も同様に足す:

- 外部データ取得 + 判断基準 → MCP + Skill
- 複数データ源の比較 → 複数 MCP（統合は Agent）
- 複数知識の重ね合わせ → 複数 Skill（優先順位を決める）
- データ + 知識の完全統合 → 複数 MCP + 複数 Skill（オーケストレーションは Agent）

全部を最初から組まない。

## よくある失敗

- 単発 Q&A に Multi-agent を載せる
- RAG で足りる社内検索をいきなり Agentic RAG にする
- 生成と自己レビューを同じ会話で完結させる

## 代替・例外

- 規制・監査が強い領域では、段が低くても品質ゲート（独立コンテキスト）を早めに足してよい
- オンデバイス SLM の場合、マルチエージェントはコストよりレイテンシが先に破綻しやすい
- 「3–10 歩、多くて 20 歩」は 12-Factor の heuristic。閾値として転記しない
