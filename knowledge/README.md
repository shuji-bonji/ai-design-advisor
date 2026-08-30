# Knowledge Base

設計判断の根拠。スキルが読むのは `canonical/` だけ。

構成図と一次情報の生涯: [`LIFECYCLE.md`](./LIFECYCLE.md)

## 構成

- `canonical/` … 精査済みの指標（正本）
- `primary-sources/` / `sources/` … **一次情報**。公式・標準・公的。更新する
- `stable-corpus/` … **一次情報以外の集約**（Zenn ・understanding-llm ・ai-agent-architecture）
- `zenn-glossary/` … 安定コーパスの実体（用語・穴探し）
- `use-cases/` … スキル出力の検証
- `decision-axes/` … チェック項目への落とし（未作成）

自著 2 リポの全文はコピーしない。取込済みと見送りは [`stable-corpus/INDEX.md`](./stable-corpus/INDEX.md)。

## 収集方針

1. 日常の追加・更新・削除は **一次情報** だけ → [`LIFECYCLE.md`](./LIFECYCLE.md)
2. 自著に追加があったら [`stable-corpus/INTAKE.md`](./stable-corpus/INTAKE.md) で都度確認してから取り込む
3. 抽出の型は [`sources/PIPELINE.md`](./sources/PIPELINE.md)
4. ユースケースで canonical を調整する
