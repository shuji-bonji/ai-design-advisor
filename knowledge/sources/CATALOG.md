# 収集キュー（用語集の外）

用語集は倉庫の一つ。欠落を補う一次情報の順。全部を同時に抽かない。

## P0 — このプロジェクトの判断に直結

| 資料 | 補う穴 |
| --- | --- |
| [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents) / [context engineering](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) / [writing tools](https://www.anthropic.com/engineering/writing-tools-for-agents) | D3 / D6。既に canonical の種 |
| [OpenAI: Practical guide to building agents](https://cdn.openai.com/business-guides-and-resources/a-practical-guide-to-building-agents.pdf) | D6 / D8 HITL |
| [OWASP GenAI LLM Top 10 2026](https://genai.owasp.org/resource/owasp-genai-llm-top-10-2026/) / [Agentic 2026](https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/) | D8。ID ではなく脅威名で引く |
| [MCP Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices) | D6 接続 / D8 |
| [12-Factor Agents](https://github.com/humanlayer/12-factor-agents) | D6 / D9 の実装原則 |

## P1 — 横断・運用・法令

| 資料 | 補う穴 |
| --- | --- |
| [AWS Generative AI Lens](https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html) （2025-04 公開、2025-11 更新） | 設問形式。原則だけ抽く |
| [AWS Agentic AI Lens](https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentic-ai-lens.html) （公開 2026-06-10） | 権限・観測・自律度。GenAI Lens 内の agentic 節と重複しうる |
| [Azure WA: AI workloads](https://learn.microsoft.com/en-us/azure/well-architected/ai/) | データ設計・グラウンディング品質 |
| [Google AF: AI/ML perspective](https://docs.cloud.google.com/architecture/framework/perspectives/ai-ml) | 信頼性・性能・運用。scaling が用語集で薄い |
| [Fowler: GenAI patterns](https://martinfowler.com/articles/gen-ai-patterns/) | パターン名と decision_point の対応 |
| [NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) | リスク区分の表 |
| [AI 事業者ガイドライン 1.2](https://www.meti.go.jp/shingikai/mono_info_service/ai_shakai_jisso/20260331_report.html) （2026-03-31） | 国内の責務。エージェント記述が 1.2 で追加 |
| [DS-920 2.0](https://www.digital.go.jp/news/decb64eb-f26e-41cb-8d37-f3dd173108b8) （2026-06-12、施行 2026-09-01） | 企画・調達。行政向けだがチェックシートが使える |
| [AISI 評価観点](https://aisi.go.jp/output/output_framework/guide_to_evaluation_perspective_on_ai_safety/) | D9 国内版 |

## P2 — 組織統制・MCP 周辺

- [Google SAIF](https://saif.google/secure-ai-framework)
- [NSA CSI: MCP Security](https://media.defense.gov/2026/Jun/02/2003943289/-1/-1/0/CSI_MCP_SECURITY.PDF)
- [CSA Agentic MCP](https://labs.cloudsecurityalliance.org/agentic/agentic-mcp-security-best-practices-v1/)
- AWS Responsible AI Lens（GenAI Lens 2025-11 更新と重なる。抽出時に重複除去）

## 注意

- Lens はクラウド寄り。`kind: vendor_practice` を忘れない。
- Agentic AI Lens の公開は **2026-06-10**（2025-11 は GenAI Lens 更新と agentic preamble）。
- 法令トラックはプロダクト設計の推奨と混ぜない。`track: legal`。
