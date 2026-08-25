# 生成AIにおけるパラメータ（Temperature / Reasoning Effort）

出典の中心: [Zenn 用語集 Chapter 18](https://zenn.dev/umi_mori/books/generative-ai-glossary/viewer/what-is-generation-parameters)

## Temperature

確率分布の鋭さを調整する基本パラメータ。非Reasoning Modelで広く使われる。

| 値 | 挙動 | 向いている用途 |
| --- | --- | --- |
| 0〜0.3 | 確定的・保守的 | 分類、抽出、コード生成 |
| 0.4〜0.7 | バランス型 | 一般的な対話、ドキュメント生成 |
| 0.8〜1.5 | 多様・創造的 | アイデア出し、創作、コピー作成 |

## Reasoning Effort

Reasoning Model（o系列、Claude Thinking系など）が回答前にどれだけ深く考えるかを制御するパラメータ。
Temperatureとは別軸（揺らぎ vs 思考の深さ）。

- Reasoning Model以外では使えない / 無視される場合がある
- 高いEffortは品質向上の可能性がある一方、レイテンシとコストが増加する
- 実務では「タスクの複雑さに応じて最小限のEffortから始める」のが推奨される傾向

## Temperature と Reasoning Effort の関係

| 観点 | Temperature | Reasoning Effort |
| --- | --- | --- |
| 制御するもの | 出力の揺らぎ | 思考の深さ |
| 効果 | 同じ質問への多様性 | 回答の質 |
| 使えるモデル | ほぼ全モデル | Reasoning Modelのみ |
| Reasoning Modelでの扱い | 無視・固定の場合あり | 主要パラメータ |

## 一次情報での裏取りメモ（要追加）

- OpenAI: reasoning_effort のレベル（none / minimal / low / medium / high / xhigh など）
- Anthropic: Effort levels（low / medium / high / xhigh / max）、Thinking の扱い
- Google: thinkingBudget / thinkingLevel
