# ai-design-advisor

**Generative AI Tool to Support Design Decisions**

生成AIシステムの設計判断を支援するツール。  
ドメイン知識が豊富な業務側の人が、ある程度の指針を掴んだ上でベンダーに依頼できるようにすることを目指す。

## 目的

- ユースケースを入力すると、推奨される設計構成（モデルクラス、パラメータ、アーキテクチャパターン、実装上の注意点など）を提示する
- 「設計のできる人」がボトルネックになっている現場で、共通言語となる判断軸を提供する
- 用語の理解から、実際の意思決定支援へ橋渡しする

## 想定ユーザー

- ドメイン知識が豊富な業務側・企画側の社員（ベンダーに依頼する側）
- 生成AIを使ったサービス設計に関わるプロダクトマネージャーや企画担当
- エージェント設計やLocal LLM構築の指針を素早く把握したいエンジニア

## 提供形態（計画）

1. **スキル版**（優先）  
   Claude Code / エージェント向けスキル。自然言語でユースケースを投げるだけで推奨構成を返す。

2. **構造化チェックリスト Webアプリ**（後続）  
   fact-checklist 型のUI。カテゴリ分けされた項目をチェックしながら要件を洗い出し、リアルタイムで推奨が変わる。  
   オプションでチャット機能を追加し、対話的に深掘りできるようにする。

直接プロンプトで要件を投げても利用価値が高い。

## 現状のステータス

- [x] リポジトリ作成
- [x] 知識ベースの箱作り
- [x] 代表ユースケースのスターターリスト
- [x] 一次情報（Reasoning Effort / Temperature / SLM vs LLM / RAG）
- [x] Zenn概念マップ要約
- [x] **体系的フレームワーク**（`knowledge/SYSTEMATIC-FRAMEWORK.md`）— 9次元 + 横断制約
- [ ] 未充足次元の一次情報収集・詳細化（D3/D4/D6/D7/D8/D9 が中心）
- [ ] 意思決定の軸（チェック項目）への落とし込み
- [ ] スキル版の実装
- [ ] Webアプリ版の実装

## 知識の体系（Decision Dimensions）

詳細は [`knowledge/SYSTEMATIC-FRAMEWORK.md`](./knowledge/SYSTEMATIC-FRAMEWORK.md) を参照。

| 次元 | 内容 | 状態 |
|------|------|------|
| D1 モデルクラス | SLM / LLM / Reasoning / Multimodal | 一次情報あり |
| D2 生成パラメータ | Temperature / Reasoning Effort | 一次情報あり |
| D3 コンテキスト・知識 | Context Window / カットオフ / 履歴管理 | 部分的 |
| D4 プロンプト・対話 | Few-shot / CoT / 履歴設計 | 未充足 |
| D5 RAG | 要否・成熟度・Chunking等 | 一次情報あり |
| D6 エージェント | Tool Calling / Multi-Agent / HITL | 未充足 |
| D7 Fine-tuning | 要否・蒸留 | 未充足 |
| D8 セキュリティ | Injection / Guardrail | 未充足 |
| D9 運用・評価 | Latency / Eval / LLMOps | 未充足 |
| X 横断制約 | コスト・プライバシー・既存システム等 | 部分的 |

## ディレクトリ構成

```
knowledge/
├── SYSTEMATIC-FRAMEWORK.md  # 意思決定の次元マップ（中核）
├── zenn-glossary/           # 用語集ベースのノート
├── primary-sources/         # 公式・実務一次情報
├── use-cases/               # 代表ユースケース
└── decision-axes/           # チェック項目への落とし込み（これから）
```

## 関連プロジェクト

- [fact-checklist](https://github.com/shuji-bonji/fact-checklist) / [factcheck-skill](https://github.com/shuji-bonji/factcheck-skill)
- [ai-agent-architecture](https://github.com/shuji-bonji/ai-agent-architecture)
- [media-literacycheck-skill](https://github.com/shuji-bonji/media-literacycheck-skill)
- [Management-of-software-systems-and-services](https://github.com/shuji-bonji/Management-of-software-systems-and-services)

## License

MIT（予定）
