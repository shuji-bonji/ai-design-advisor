# 取込索引（2026-08-31）

状態: `in` = canonical に折込み済み / `hold` = 見送り / `out` = 範囲外

## Zenn

原文は置かない。用語と次元の骨だけ折込み済み。

| 部 | 状態 | 先 |
| --- | --- | --- |
| 第1部 全体像 | in | D1 |
| 第2部 仕組み | in | D2 |
| 概念マップ | in | 次元の骨 |
| 第3部 詳細 | hold | D4 |
| 第6部 手法・運用 | hold | D7 methods/ops |
| 第7部 AIDD / Vibe / SDD | out | DEV |
| 第9部 LLMOps 詳細 | hold | D9 |

## understanding-llm

パスは `docs/` 配下（JA と同内容）。

| パス | 状態 | 先 |
| --- | --- | --- |
| 01-llm-structural-problems/* | in | D3 structural-constraints |
| 01 .../knowledge-boundary.md | in | D3 knowledge-and-memory |
| 01 .../prompt-sensitivity.md | in | D4 writing |
| 02-context-window/context-budget.md | in | D3 context-as-budget |
| 03-always-loaded-context/* ・ 04-conditional-context/rules.md | in | D4 placement / ownership |
| 05-on-demand-context/skill-vs-agent.md | in | D6 skill-vs-subagent-vs-mcp |
| appendix/problem-countermeasure-map.md | in | D6 quality-gate |
| appendix/authority-and-llm-constraints.md | in | D8 permission-vs-authority |
| 07-runtime-layer/hooks.md ・ why-not-in-context.md | in | D9 hooks-and-runtime |
| 08-session-management/compact-and-clear.md | hold | 製品手順 |
| 01 .../lost-in-the-middle.md | hold | 原論文の再読 |
| 09-code-intelligence/* | out | DEV |
| 10-multi-session/* | hold | D6 チームが必要になったとき |
| 11-cross-llm-principles/* | out | DEV |
| appendix/claude-code-config-reference.md | out | 製品仕様 |

## ai-agent-architecture

パスは `docs/` 配下（JA と同内容）。

| パス | 状態 | 先 |
| --- | --- | --- |
| part-2/layers.md ・ placement.md | in | D6 five-layers |
| faq/agent-vs-subagent-vs-skill.md ・ mcp-vs-skills.md | in | D6 skill-vs-subagent |
| agents/subagent-vs-skill.md ・ subagent-quality-gate.md | in | D6 |
| strategy/composition-patterns.md | in | D6 when-to-agentize |
| strategy/permission-vs-authority.md | in | D8 |
| mcp/security.md | in | D8 guardrail-layers |
| strategy/discovery-vs-production.md | in | D9 |
| strategy/hooks.md | in | D9 |
| strategy/loop-engineering.md | in | D9 loop-eval-and-stop |
| part-3/memory.md | in | D3 knowledge-and-memory |
| part-4/prompt-decomposition.md | in | D4 placement |
| strategy/routing-vs-cascading.md | hold | D1 / D9 |
| strategy/deterministic-verdicts.md | hold | D8/D9 境界 |
| strategy/harness-engineering-mapping.md | hold | D9 |
| agents/agent-taxonomy.md ・ agent-teams.md ・ what-is-a2a.md | hold | UC で必要になったとき |
| skills/anti-patterns.md | hold | D6 |
| workflows/* | out | DEV |
| strategy/local-llm-workspace-mapping.md | out | 別リポ |
