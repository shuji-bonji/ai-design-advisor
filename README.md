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
- [x] 知識ベースの箱作り + 初期ノート（parameters・モデルクラス）
- [x] 代表ユースケースのスターターリスト作成
- [x] 一次情報の追加（Reasoning Effort: OpenAI / Anthropic / Google、Temperature）
- [x] 一次情報の追加（SLM vs LLM 選定指針、RAG 設計指針）
- [x] Zenn概念マップ要約
- [ ] Zenn用語集の主要章の詳細化（RAG・Agent・セキュリティ・運用など未着手が多い）
- [ ] 意思決定の軸（チェック項目）の定義
- [ ] スキル版の実装
- [ ] Webアプリ版の実装

## 知識の源泉

- [サクッと始める生成AI用語集（Zenn）](https://zenn.dev/umi_mori/books/generative-ai-glossary)
- OpenAI / Anthropic / Google などの公式ドキュメント（Temperature, Reasoning Effort / Thinking, Effort levels など）
- SLM/LLM選定・RAG設計に関する実務ガイド・ベストプラクティス
- 実務で見られる代表的なユースケース（コンシューマ向けチャットボット、社内RAG、エージェント自動化など）

## ディレクトリ構成

```
knowledge/
├── zenn-glossary/     # 用語集ベースのノート（概念マップ要約済み）
├── primary-sources/   # 公式・実務一次情報（Reasoning / Temperature / SLM-LLM / RAG）
├── use-cases/         # 代表ユースケース
└── decision-axes/     # 意思決定の軸（これから）
```

## 関連プロジェクト

- [fact-checklist](https://github.com/shuji-bonji/fact-checklist) / [factcheck-skill](https://github.com/shuji-bonji/factcheck-skill)
- [ai-agent-architecture](https://github.com/shuji-bonji/ai-agent-architecture)
- [media-literacycheck-skill](https://github.com/shuji-bonji/media-literacycheck-skill)

## License

MIT（予定）
