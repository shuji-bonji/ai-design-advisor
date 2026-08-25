# D6 エージェント — ソースマッピング（精査前）

P0 の最初の作業用。ここに挙げた文書を REVIEW-CHECKLIST に通しながら、通った主張だけを同ディレクトリの指標ノートに落とす。

## ai-agent-architecture

| パス | 想定する判断テーマ | 精査状況 |
|------|-------------------|----------|
| docs/ja/part-2/layers.md / docs/part-2/layers.md | 5層（Doctrine / Agent / Skills / Memory / MCP）の役割分担 | 未 |
| docs/ja/part-2/placement.md | 何をどの層に置くか | 未 |
| docs/ja/agents/agent-taxonomy.md | エージェント種別の整理 | 未 |
| docs/ja/agents/what-is-subagent.md | Subagent の定義・使いどころ | 未 |
| docs/ja/agents/subagent-vs-skill.md | Subagent vs Skill の選択 | 未 |
| docs/ja/agents/agent-teams.md | Multi-agent / チーム | 未 |
| docs/ja/agents/subagent-quality-gate.md | 品質ゲート・HITL 的な制御 | 未 |
| docs/ja/strategy/composition-patterns.md | 合成パターン | 未 |
| docs/ja/strategy/agent-loop-patterns.md | ループ設計 | 未 |
| docs/ja/strategy/loop-engineering.md | ループ工学 | 未 |
| docs/ja/strategy/hooks.md | Hooks（ランタイム制御） | 未 |
| docs/ja/strategy/harness-engineering-mapping.md | Harness との対応 | 未 |
| docs/ja/strategy/routing-vs-cascading.md | ルーティング vs カスケード | 未 |
| docs/ja/strategy/discovery-vs-production.md | 探索期 vs 本番 | 未 |
| docs/ja/strategy/permission-vs-authority.md | 権限と権威 | 未 |
| docs/ja/faq/agent-vs-subagent-vs-skill.md | 用語の切り分け | 未 |
| docs/ja/mcp/what-is-mcp.md 他 | MCP をエージェント設計にどう置くか | 未 |
| docs/ja/skills/* | Skills の役割・アンチパターン | 未 |

## understanding-llm-through-claude-code

| パス | 想定する判断テーマ | 精査状況 |
|------|-------------------|----------|
| docs/ja/05-on-demand-context/skills.md | On-demand としての Skill | 未 |
| docs/ja/05-on-demand-context/agents.md | On-demand としての Agent | 未 |
| docs/ja/05-on-demand-context/skill-vs-agent.md | Skill vs Agent | 未 |
| docs/ja/06-tool-context/* | Tool / MCP とコンテキストコスト | 未 |
| docs/ja/07-runtime-layer/hooks.md | コンテキスト外の制御 | 未 |
| docs/ja/10-multi-session/* | Multi-session / Agent teams | 未 |
| docs/ja/appendix/problem-countermeasure-map.md | 問題→対策の対応（エージェント関連箇所） | 未 |
| docs/ja/appendix/harness-and-llm-constraints.md | Harness と制約 | 未 |

## 一次情報・その他

| ソース | 想定する判断テーマ | 精査状況 |
|--------|-------------------|----------|
| Anthropic: Building effective agents / Tool design 系 | 単純さ優先、Tool 説明の質 | 未（要約は primary-sources 収集時に一部あり） |
| Zenn 第5部 AIエージェント用語 | 用語の共通言語 | 未 |

## 次のアクション

1. 上表を優先度順に読み、主張を抜き出す
2. REVIEW-CHECKLIST で判定
3. 通ったものを `d6-agent/` 配下の指標ノート（例: when-to-use-skill-vs-agent.md）に書く
4. 不採用・保留も本ファイルに短く理由を残す
