# Reasoning Effort / Thinking Control — Primary Sources (as of 2026-08)

> 注意: この領域は急速に変化しています。モデル世代ごとにサポートされる値・デフォルトが異なります。必ず最新の公式ドキュメントを確認してください。

## 1. OpenAI

出典の中心:
- https://developers.openai.com/api/docs/guides/reasoning
- Responses API の `reasoning.effort`

### サポートされる値（モデル依存）

| 値 | 概要 | 主な用途の目安 |
| --- | --- | --- |
| `none` | 推論をほぼ無効化。最低レイテンシ | 抽出・ルーティング・単純変換、音声など |
| `minimal` | ごくわずかな推論トークン | 高速が必要だが少しの思考は欲しい場合（一部モデルのみ） |
| `low` | 高速・簡潔な推論 | 軽い判断、ツール利用を含むが速度重視 |
| `medium` | バランス（多くのモデルのデフォルト） | 一般的な計画・コーディング・合成 |
| `high` | 十分な推論 | 複雑な推論・コーディング・エージェント |
| `xhigh` | 最大に近い深さ（新しいモデル） | 最も難しい自律タスク、長時間エージェント |
| `max` | 一部モデルで追加 | 制約なしの最大能力 |

### 実務的な指針（OpenAI公式・コミュニティまとめ）

- **最低限のEffortから始め、評価で品質向上が確認できた場合のみ上げる**
- 単純タスクで常に high / xhigh にするのはコストとレイテンシの無駄
- GPT-5系以降はモデルによってデフォルトが `none` や `medium` と異なる
- Reasoningモデルでは Temperature などのサンプリングパラメータが制限される場合がある（固定値のみ許可など）

### モデルファミリーごとの傾向（2026時点の概要）

- o-series: 主に `low` / `medium` / `high`
- GPT-5 初期: `minimal` 〜 `high`
- GPT-5.1 / 5.2 以降: `none` や `xhigh` が追加される傾向

## 2. Anthropic (Claude)

出典の中心:
- https://platform.claude.com/docs/en/build-with-claude/effort
- https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost.md
- Adaptive thinking

### Effort レベル

| Level | 思考の挙動 | 典型用途 |
| --- | --- | --- |
| `max` | 制約なしで常に深く思考 | 最も深い推論・徹底分析が必要なタスク |
| `xhigh` | 常に深く、拡張探索 | 長時間（30分超）のエージェント・コーディング |
| `high`（デフォルト） | ほぼ常に思考。深い推論 | 複雑な推論、難しいコーディング、エージェント |
| `medium` | 適度な思考。単純クエリはスキップ可 | 速度・コスト・性能のバランスが必要なエージェント |
| `low` | 思考を最小化。単純タスクはスキップ | 速度・コスト最優先の単純タスクやサブエージェント |

### 重要なポイント

- 新しいモデルでは `budget_tokens` より **effort** が推奨される（adaptive thinking と組み合わせ）
- Effort は思考の深さだけでなく、ツール呼び出しの回数など全体のトークン消費にも影響する
- `high` / `max` ではほぼ常に thinking が発生する
- 低い Effort では単純な問題で thinking をスキップすることがある

## 3. Google (Gemini)

出典の中心:
- https://ai.google.dev/gemini-api/docs/thinking
- thinkingLevel（Gemini 3以降） / thinkingBudget（Gemini 2.5系）

### thinkingLevel（Gemini 3以降推奨）

| Level | 概要 |
| --- | --- |
| `minimal` | ほぼ思考なしに近い（多くのクエリで） |
| `low` | レイテンシとコストを最小化 |
| `medium` | バランス（多くのモデルのデフォルト付近） |
| `high` | 推論深度を最大化 |

### thinkingBudget（Gemini 2.5系）

- 具体的な思考トークン数を指定
- `0` で thinking 無効化（可能なモデル）
- `-1` で dynamic thinking（モデルが複雑さに応じて調整）

### 実務的な指針

- 単純な事実検索・分類 → minimal / low
- 複雑な推論やエージェント → high
- デフォルトはモデルによって異なる（Pro系は高め、Flash系は中〜低めの傾向）

## 共通の実務原則（3社横断）

1. **タスクの複雑さに応じて最小限のEffortから始める**
2. 評価（品質・レイテンシ・コスト）で上げる判断をする
3. Reasoning / Thinking モデルでは Temperature などのサンプリングが制限・無視される場合がある
4. エージェント・長時間タスクでは高めのEffortが有効なケースが多い
5. 抽出・分類・単純変換では低Effortで十分なことが多い

## 更新メモ

- 収集日: 2026-08-26
- モデル世代が進むたびにサポート値・デフォルトが変わるため、定期的な見直しが必要
