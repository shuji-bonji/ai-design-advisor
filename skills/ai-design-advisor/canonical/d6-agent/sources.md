# D6 エージェント — ソースマッピング

## 精査済み（主張を指標ノートに採用）

| パス | 採用先 |
|------|--------|
| ai-agent-architecture/.../part-2/layers.md | five-layers-and-placement.md |
| ai-agent-architecture/.../part-2/placement.md | five-layers-and-placement.md |
| ai-agent-architecture/.../faq/agent-vs-subagent-vs-skill.md | skill-vs-subagent-vs-mcp.md, when-to-agentize.md |
| ai-agent-architecture/.../agents/subagent-vs-skill.md | skill-vs-subagent-vs-mcp.md |
| ai-agent-architecture/.../faq/mcp-vs-skills.md | skill-vs-subagent-vs-mcp.md |
| ai-agent-architecture/.../agents/subagent-quality-gate.md | quality-gate-and-objectivity.md |
| ai-agent-architecture/.../strategy/composition-patterns.md | when-to-agentize.md |
| understanding-llm/.../skill-vs-agent.md | skill-vs-subagent-vs-mcp.md, quality-gate |
| understanding-llm/.../problem-countermeasure-map.md | 独立コンテキストが効く問題の根拠 |

## 意図的に弱めた／ヒューリスティック扱い

- 「親を 1,000 トークン以上汚さないなら Skill」→ 公式閾値ではない。目安と明記。
- Sub-agent のネスト不可 → ホスト仕様。一般指標には「製品依存」と書いた。
- Claude Code のパス（`.claude/skills` 等）→ 指標の本質ではないのでノート本文では一般化した。

## 未精査（D6 残り / D8・D9 へ送る）

| パス | 想定 |
|------|------|
| strategy/loop-engineering.md, agent-loop-patterns.md | ループ設計 → D6 追記 or D9 |
| strategy/hooks.md, understanding-llm hooks | ランタイム制御 → D9 寄り |
| strategy/harness-engineering-mapping.md | Harness |
| strategy/routing-vs-cascading.md | ルーティング |
| strategy/discovery-vs-production.md | 探索 vs 本番 → D9 |
| strategy/permission-vs-authority.md | 権限 → D8 |
| mcp/security.md | MCP セキュリティ → D8 |
| agents/agent-taxonomy.md, agent-teams.md, what-is-a2a.md | 分類・チーム・A2A（必要なら追記） |
| skills/anti-patterns.md | Skill の書き方アンチパターン |
