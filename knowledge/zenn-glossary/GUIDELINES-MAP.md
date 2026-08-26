# Zenn 用語集から抜いた設計指針の扱い

調査資料: 515 件（2026-08-26 抽出、schema 1.1）。  
出典: [サクッと始める生成AI用語集](https://zenn.dev/umi_mori/books/generative-ai-glossary)（著作権は著者）。  
索引: [`guidelines-index.json`](./guidelines-index.json)（言い換え guideline とタグのみ。原文引用は置かない）。

## 位置づけ

- **canonical ではない。** スキルの推奨根拠は `knowledge/canonical/`。
- 用語集は「判断の問い」と穴探しの倉庫。数値・モデル名は `needs_verification` が多い（515 中 157）。
- 検証済みの方向が canonical と一致するときだけ、根拠に「Zenn chXX-YYY と同趣旨」と書いてよい。数値は転記しない。

## decision_point → 次元

| decision_point（主） | 次元 |
| --- | --- |
| model_selection / modality_handling | D1 |
| generation_parameters | D2 |
| context_management / knowledge_freshness / hallucination_mitigation | D3 |
| prompt_structure / few_shot_and_cot | D4 |
| rag_architecture / grounding_and_citation | D5 |
| knowledge_injection_strategy | D5 → D7 の順 |
| tool_integration / connection_protocol / agent_autonomy / multi_agent / skill_packaging | D6 |
| training_strategy | D7 |
| permission_and_audit / guardrails / prompt_injection / privacy | D8 |
| evaluation / benchmark / rollout / observability / cost / latency | D9 / X |
| inference_optimization / vendor / scaling | D1 / X |
| rules_and_hooks_design | D4 + D9 |
| **dev_process_adoption / test_and_spec / team_role** | **DEV（現行9次元の外）** |

主 decision_point の件数（おおよそ）: D9 系が最多、D8/D4/D3/D5 が続く。D2 と D7 は相対的に少ない。

## canonical との差分（取り込む候補）

既に同じ方向のものは増やさない。足りないのは次。

### D7（要否は既にある。手法・運用が空）

用語集第6部は、いまの `methods-unreviewed` / `ops-unreviewed` を埋める種になる。ただし数値（件数・費用）は検証フラグ付き。

採用してよい方向（要否ノートと一致）:

- 最新情報は RAG。FT は形式・文体の固定
- データ品質が品質を決める。前後で同じ評価セット
- いきなり本番に出さない
- 自前 RLHF より、提供済みモデル + 必要なら DPO 検討（手法は未精査のまま）
- 蒸留は規約確認と自社タスク実測

まだ入れない: 「数百〜数万件」「数千〜数百万円」「90/10」などの数量。

### D9 / X（レイテンシ・Judge）

`serving-and-cache.md` と重なるが、用語集側が厚い。

足してよい原則（数値なし）:

- ストリーミングと「考え中」表示（Reasoning で無言待ちしない）
- 平均ではなく P95 / P99
- 独立ステップは並列
- Judge は評価対象とベンダーを分ける、提示順をランダム化、簡潔さ基準、人間の抜き取り

入れない: キャッシュ 50–90%、SLO 5000ms、自動化 90% など。

### DEV（第7部 AIDD / Vibe / TDD / SDD）

これは **プロダクトとしての生成AI設計** ではなく **AIでソフトウェアを書く過程**。  
ai-design-advisor の本体（コンシューマ向けボット等）とは別トラック。

今は次元を増やさない。スキルは「開発プロセスの導入（Vibe / SDD）を聞かれたら、本ツールの範囲外。必要なら別資料」と返す。
将来足すなら D10 ではなく `DEV` トラック。

## スキルでの使い方

1. 要件 → D1–D9 の canonical
2. その次元で例やアンチパターンが欲しいときだけ index を decision_point で絞る
3. `needs_verification: true` の guideline は「用語集の目安。未検証」と書くか、使わない

## 次に精査するなら

優先: D7 の手法ノート（ch47–50 の非数値主張）→ D9 の Judge / レイテンシ原則（ch65–66 の非数値主張）。  
後回し: DEV 64件、時点依存のモデル名。
