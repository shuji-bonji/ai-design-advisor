# Canonical Indicators

設計判断の**指標（indicators）**として精査済みの知識を置く場所です。

## 方針

1. 判断に足りる情報が揃うまで、収集と精査を優先する
2. 収集のたびに本ディレクトリとチェックリストを改変してよい
3. 根拠が通ったものだけを canonical に残す。弱い・古い・誤りの可能性が高いものは載せないか「要再検証」とする

## ソースの優先順位（根拠として使う順）

1. **一次情報** … OpenAI / Anthropic / Google 等の公式ドキュメント
2. **自リポジトリの精査済み記述** … understanding-llm-through-claude-code / ai-agent-architecture（根拠と突き合わせて通ったもの）
3. **Zenn 用語集** … 概念の共通言語・定義の参照
4. **その他実務ガイド** … 補助。単独では canonical にしない

## ディレクトリ構成

```
canonical/
├── README.md                 # 本ファイル
├── REVIEW-CHECKLIST.md       # 精査チェックリスト
├── _index.md                 # 次元別の充足状況サマリ
├── d1-model-class/           # モデルクラス選定
├── d2-parameters/            # Temperature / Reasoning Effort
├── d3-context-knowledge/     # コンテキスト・知識
├── d4-prompt-dialogue/       # プロンプト・対話
├── d5-rag/                   # RAG
├── d6-agent/                 # エージェント（P0 優先）
├── d7-finetune/              # Fine-tuning / 蒸留
├── d8-security/              # セキュリティ・ガードレール
├── d9-ops-eval/              # 運用・評価
└── x-cross-constraints/      # 横断制約
```

各 `dN-*/` には、精査を通った指標ノートと、ソースマッピング（どの文書のどの主張を採用したか）を置く。

## スキルとの関係

スキルは原則として **canonical のみ** を判断根拠にする。  
未充足の次元は「情報が不足しているため推奨を保留／一般論のみ」と明示する。
