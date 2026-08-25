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
- [ ] 知識ベース構築（用語集 + 一次情報）
- [ ] 代表ユースケースの洗い出し
- [ ] 意思決定の軸（チェック項目）の定義
- [ ] スキル版の実装
- [ ] Webアプリ版の実装

## 知識の源泉

- [サクッと始める生成AI用語集（Zenn）](https://zenn.dev/umi_mori/books/generative-ai-glossary)
- OpenAI / Anthropic / Google などの公式ドキュメント（Temperature, Reasoning Effort / Thinking, Effort levels など）
- 実務で見られる代表的なユースケース（コンシューマ向けチャットボット、社内RAG、エージェント自動化など）

## 関連プロジェクト

- [fact-checklist](https://github.com/shuji-bonji/fact-checklist) / [factcheck-skill](https://github.com/shuji-bonji/factcheck-skill)
- [ai-agent-architecture](https://github.com/shuji-bonji/ai-agent-architecture)
- [media-literacycheck-skill](https://github.com/shuji-bonji/media-literacycheck-skill)

## License

MIT（予定）
