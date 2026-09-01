# D8 ソースマッピング

## 採用

| ソース | 採用先 | メモ |
| --- | --- | --- |
| OWASP LLM Top 10 2025 / 2026 | threat-landscape.md | 一次情報。Prompt Injection は継続して最上位 |
| OWASP MCP Top 10 | threat-landscape, guardrail-layers | MCP サーバー側の視点 |
| mcp/security.md | guardrail-layers | 原則・チェックリストは採用 |
| permission-vs-authority.md | permission-vs-authority.md | 構造として採用 |
| authority-and-llm-constraints.md | permission-vs-authority.md | なぜ authority を渡しにくいか |

## 補正・不採用

- `mcp/security.md` の LLM08=Excessive Agency 対応表は旧番号。指標では名前を使う。
- LINEヤフー調査の具体パーセントは時点依存のため、指標本文には「静的キー依存が多く発展途上」程度に一般化。
- コード例のコピーは指標に不要なため入れない。

## 未精査（D9 へ送るものが多い）

- 監査ログの設計詳細、インシデント手順の運用面 → D9
- deterministic-verdicts（判定権限）→ D8/D9 境界。必要なら追記
