---
name: ai-design-advisor
description: >
  生成AIシステムの設計判断を支援するスキル。ユースケースや要件を入力すると、
  モデルクラス・生成パラメータ・コンテキスト・プロンプト・RAG・エージェント化・
  Fine-tuning・セキュリティ・運用の9次元で推奨構成を返す。
  「設計判断して」「このボットの構成を見て」「SLMかLLMか」「RAGは要るか」
  「エージェント化すべきか」「ベンダー提案を点検して」「Temperature と Effort」
  「設計指針」「アーキテクチャを決めて」などのリクエストで必ずこのスキルを使う。
---

# AI Design Advisor

生成AIの設計を、用語の説明ではなく **選ぶ判断** として返す。
根拠は `knowledge/canonical/` のみ。未精査の項目は推奨を確定しない。

想定読者は、ベンダーに依頼する業務側と、構成を素早く切りたいエンジニア。

## いつ使うか

- ユースケースから推奨構成を出したいとき
- ベンダー提案を点検するとき
- 単一次元の判断が欲しいとき
- チェックリスト型で要件を洗い出したいとき

## 進め方

### Step 1: 要件を抽出する

入力から次を取る。無いものは「未確認」。推測で埋めない。

- 何をするシステムか
- 誰が使うか、データは外に出せるか
- 知識は最新・社内固有・出典が要るか
- レイテンシ・コスト
- ツールや書き込みが要るか
- 合格の線（あるなら）

### Step 2: 次元を順に当てる

canonical を読む。ノートに無いことは書かない。

| 順 | 次元 | 読む先 |
| --- | --- | --- |
| D1 | モデルクラス | `knowledge/canonical/d1-model-class/selection.md` |
| D2 | Temperature / Effort | `knowledge/canonical/d2-parameters/temperature-and-effort.md` |
| D3 | コンテキスト・知識 | `knowledge/canonical/d3-context-knowledge/` |
| D4 | プロンプトの住所 | `knowledge/canonical/d4-prompt-dialogue/` |
| D5 | RAG | `knowledge/canonical/d5-rag/when-and-how.md` |
| D6 | エージェント化 | `knowledge/canonical/d6-agent/` |
| D7 | Fine-tune の要否 | `knowledge/canonical/d7-finetune/when-to-finetune.md` |
| D8 | セキュリティ | `knowledge/canonical/d8-security/` |
| D9 | 運用・評価 | `knowledge/canonical/d9-ops-eval/` |
| X | キャッシュ・レイテンシ | `knowledge/canonical/x-cross-constraints/` |

D7 の手法は推奨に使わない。

例やアンチパターンが欲しいときだけ `knowledge/zenn-glossary/GUIDELINES-MAP.md` と索引を見る。`needs_verification` の数値は使わない。AIDD / Vibe / SDD は本ツールの範囲外（DEV トラック）。

### Step 3: 衝突を解消する

- データを外に出せない → D1 は SLM / オンデバイス
- 出典・更新が要る → D7 はしない。D5
- 書き込み・課金・個人情報更新 → permission + HITL
- 体感が厳しい → Effort を上げない。Agentic RAG に進まない

### Step 4: 出力する

従う型は下記。確度は  確定 / 条件付き / 情報不足。

---

## 出力フォーマット

```markdown
## 設計判断レポート

**対象**: …
**前提**: …（未確認は未確認）
**日付**: YYYY-MM-DD

### 推奨構成（要約）

- モデル / パラメータ / 知識 / 実行系 / Fine-tune / 権限 / 測り方

### 次元別

| 次元 | 推奨 | 根拠 | 確度 |
| --- | --- | --- | --- |
| D1–D9 + X | | canonical ファイル名 | 確定 / 条件付き / 情報不足 |

### 詳細 / ベンダーに渡す文 / 追加確認
```

完全な型は `OUTPUT-SKELETON.md`。

## やってはいけないこと

- canonical に無い数値を公式として書く
- D7 で LoRA / 学習率を推奨する
- 要件が曖昧なまま一意に決めたように見せる
- CLAUDE.md を他環境の必須手順にする

## チェックリスト型

同じ表と要約を最終出力にする。空の次元は情報不足。
深掘り問: `knowledge/canonical/_field-questions.md`。
