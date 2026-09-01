# Canonical Indicators

設計判断の**指標（indicators）**として精査済みの知識を置く場所です。

編集の正本はここ。Claude Desktop は `skills/ai-design-advisor/` しかマウントしないので、配布時は同内容を `skills/ai-design-advisor/canonical/` へ渡す。

## 方針

1. 判断に足りる情報が揃うまで、収集と精査を優先する
2. 収集のたびに本ディレクトリとチェックリストを改変してよい
3. 根拠が通ったものだけを canonical に残す。弱い・古い・誤りの可能性が高いものは載せないか「要再検証」とする

## ソースは 2 経路

日常は 4 系統を並べて重み付けない。

| 経路             | 何が入るか                                                                            | 運用                                                                            |
| ---------------- | ------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| **一次情報**     | OpenAI / Anthropic / Google などの公式、MCP 仕様、OWASP、NIST、事業者GL / DS-920 など | **更新する**。モデル世代や公式が変わったら raw → 検証 → canonical               |
| **安定コーパス** | Zenn 用語集、understanding-llm-through-claude-code、ai-agent-architecture             | **原則凍結**。すでに canonical へ折込み済み。再抽出は大きな改訂があったときだけ |

スキルの根拠はどちらも経由せず **canonical のみ**。

安定コーパスの中を開くときだけ区別する。

- 自リポの精査済み記述 … 判断文の種にできる（一次情報と突き合わせ済みのもの）
- Zenn … 用語と穴探し。数値・モデル名は転記しない

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
