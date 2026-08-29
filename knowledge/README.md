# Knowledge Base

設計判断の根拠。スキルが読むのは `canonical/` だけ。

## 構成

- `canonical/` … 精査済みの指標（正本）
- `primary-sources/` / `sources/` … **一次情報**。公式・標準・公的。更新する
- `zenn-glossary/` … 安定コーパスの一部（用語・穴探し）。原則凍結
- `use-cases/` … スキル出力の検証
- `decision-axes/` … チェック項目への落とし（未作成）

understanding-llm と ai-agent-architecture も安定コーパス。本リポへの全文コピーはしない。必要な主張はすでに canonical へ折込み済み。

## 収集方針

1. 日常の追加・更新・削除は **一次情報** だけ
2. 安定コーパスは再抽出しない。大きな改訂があったときだけ開く
3. 一次情報で裏取りするのは、Temperature / Effort / RAG / Agent などの推奨値やトレードオフ
4. ユースケースで「本当に聞かれる軸」を見て canonical を調整する
