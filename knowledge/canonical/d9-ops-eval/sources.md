# D9 ソースマッピング

## 採用

| ソース | 採用先 |
| --- | --- |
| discovery-vs-production.md | discovery-vs-production.md |
| hooks.md / why-not-in-context.md | hooks-and-runtime.md |
| loop-engineering.md | loop-eval-and-stop.md |
| rag-guidelines.md（評価の分離） | loop-eval-and-stop.md |
| D6 quality-gate | 批評者・maker/checker |

## 弱めたもの

- 「平均39%の性能低下」など個別数値は一次情報として採用しない
- Cherny / Karpathy / harness>model の逸話は二次。含意だけ採用
- 指示書 100〜150 行はヒューリスティック

## 未精査（後で足してよい）

- deterministic-verdicts.md（判定権限の詳細）
- routing-vs-cascading.md
- LLM-as-a-Judge の公式ガイド（OpenAI Evals 等）の一次情報メモ
- Zenn 第9部 LLMOps 章の詳細
