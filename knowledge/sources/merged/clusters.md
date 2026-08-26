# P0/P1 クラスタ（2026-08-27）

status: clustered。検証前。

## A. 複数準拠一致（検証優先）

### C01 単一・狭いエージェントが先
能力はツール足しで広げる。複数化は指示が育てない・ツールが似て違うとき。

- raw: oai-ag-008, oai-ag-010, 12f-010, aws-agent-001, anth 単純ループ優先
- D6 multi_agent_topology

### C02 制御フローはコードが持つ
LLM に許可やループ終了を任せない。ツール選択と実行の間で止められる。自律はスキーマ・契約に置く。

- raw: 12f-008, owasp-llm03-m, aws-agent-005, oai-ag-009
- D6 / D8

### C03 不可逆・高ステークは HITL
審査は要約でなく実際の操作を見せる。人への連絡もツールにする。自律度は事前に決める。

- raw: oai-ag-017, owasp-llm01-m, owasp-asi09, 12f-007, aws-agent-004, mcp-sec-008
- D6 / D8 human_oversight_level

### C04 権限は最小。Excessive Agency を設計しない
ツール数・粒度・権限・自律のいずれかが過ぎると実害になる。スコープは小さく始める。

- raw: owasp-llm03, oai-ag-015, mcp-sec-011, aws-genai-002
- D8 permission_and_audit

### C05 プロンプト注入は着弾前提
指示とデータの枠が無い。守るのは権限と出力検証と HITL。

- raw: owasp-llm01, oai-ag-014, owasp-asi01
- D8 prompt_injection_defense

### C06 ガードレールは層
LLM 一枚で足りとしない。規則ベースを並べる。

- raw: oai-ag-013, oai-ag-016, fowler-006, aws-genai-002
- D8 input_output_guardrails

### C07 隠しコンテキストをセキュリティ境界にしない
システムプロンプトに秘密や許可を置かない。

- raw: owasp-llm08
- 一源だが公式 Top 10 なので優先に残す
- D4 / D8

### C08 誤りの内容と出力の生流しは別項
Misinformation ≠ Improper Output Handling。

- raw: owasp-llm07, owasp-llm10
- D8 / D9

### C09 プロンプトと政策は自分で持ちバージョン管理する
フレームワーク黒箱に任せない。

- raw: 12f-002, aws-agent-003, oai-ag-007
- D4 prompt_versioning

### C10 コンテキストは自分で組む
一回の入力は「今までと次の一手」。エラーは圧縮して戻す。

- raw: 12f-003, 12f-009, anth context engineering
- D3

### C11 ツールは構造化出力
実行は決まり切れたコード。Data / Action / Orchestration に分ける。

- raw: 12f-001, 12f-004, oai-ag-006, anth writing tools
- D6 tool_integration_design

### C12 FT はプロンプトと RAG の後
デフォルトはしない。

- raw: fowler-007, aws-genai-001（カスタマイズの要否）, 既存 D7 when-to-finetune
- D7

### C13 RAG は固有・最新知識を足す形
Direct Prompting だけでは切れる。hybrid / rewrite / rerank で育てる。

- raw: fowler-001, fowler-004, fowler-005
- D5

### C14 評価を先に置く
強いモデルで基準を出してから下げる。内ループと外ループ。

- raw: oai-ag-005, az-ai-001, fowler-002, gcp-rel-002
- D9 / D1

### C15 エージェント行動は一本の跡で追える
推論・ツール・メモ・引き渡し。インフラ監視とは別。SLO で置く。

- raw: aws-agent-002, gcp-rel-001, 12f-006, az-ai-004
- D9

### C16 MCP は認可モデル込み。passthrough 禁止
下流には別トークン。audience を見る。

- raw: mcp-sec-001, mcp-sec-004, mcp-sec-005, owasp-asi04, owasp-llm04
- D6 connection_protocol_choice / D8

### C17 メモ書き込みは権限操作
毒が以後のセッションを汚す。

- raw: owasp-asi06, owasp-llm01, owasp-llm05
- D3 / D5 / D8

### C18 法務の主体は分ける
開発者 / 提供者 / 利用者。調達では CAIO / 企画 / 提供 / 利用。

- raw: meti-gl-003, ds920-002
- track: legal

---

## B. 一源（補強前は canonical にしない）

| ID | 主張 | 源 |
| --- | --- | --- |
| C19 | コストをモデル/推論/プロンプト/ベクトル/エージェント流れに分解 | aws-genai-003 |
| C20 | Embeddings は関係データ向けではない | fowler-003 |
| C21 | セッション ID は認証ではない | mcp-sec-007 |
| C22 | 歩数 3–10（多くて 20） | 12f-010b heuristic |
| C23 | AISI 評価観点一覧 | aisi-001 未展開 |
| C24 | NIST リスク区分の語彙 | nist-600-002 |

---

## C. この回まとめていないもの

- Lens 全設問、AWS モデル選定表、Azure グラウンディング品質ページ
- Reasoning Effort / Temperature（既存 canonical 側。今回の raw に新見はほぼ無い）
- SLM vs LLM の数値条件

## D. 矛盾

原則同士での反対は見つからなかった。数値同士はまとめていない。
