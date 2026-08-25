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

## 現状のステータス

- [x] リポジトリ・知識ベースの箱・体系的フレームワーク（9次元）
- [x] 一次情報・Zenn要約・ユースケーススターター
- [x] **canonical ディレクトリ + 精査チェックリスト**
- [x] **D6 ソースマッピング開始**（P0: 2リポジトリの該当ドキュメント一覧）
- [ ] 判断に足りるまで指標収集・精査（P0: D6 → D8 → D9 を優先）
- [ ] チェック項目への落とし込み・スキル版・Webアプリ版

## 知識の流れ

```
Zenn / 一次情報 / understanding-llm / ai-agent-architecture
        ↓ 精査（REVIEW-CHECKLIST）
   knowledge/canonical/     ← スキルが根拠にする指標のみ
        ↓
   decision-axes / スキル出力
```

詳細: [`knowledge/SYSTEMATIC-FRAMEWORK.md`](./knowledge/SYSTEMATIC-FRAMEWORK.md)  
Canonical: [`knowledge/canonical/`](./knowledge/canonical/)

## 関連プロジェクト

- [understanding-llm-through-claude-code](https://github.com/shuji-bonji/understanding-llm-through-claude-code)
- [ai-agent-architecture](https://github.com/shuji-bonji/ai-agent-architecture)
- [fact-checklist](https://github.com/shuji-bonji/fact-checklist) / [factcheck-skill](https://github.com/shuji-bonji/factcheck-skill)

## License

MIT（予定）
