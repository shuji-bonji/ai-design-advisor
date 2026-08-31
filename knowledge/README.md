# Knowledge Base

設計判断の根拠。スキルが読むのは `canonical/` だけ。

構成図と一次情報の生涯: [`LIFECYCLE.md`](./LIFECYCLE.md)

## 構成

- `canonical/` … 精査済みの指標（正本）
- `primary-sources/` / `sources/` … **一次情報**。公式・標準・公的。更新する
- `stable-corpus/` … **一次情報以外の索引**（Zenn ・understanding-llm ・ai-agent-architecture）
- `use-cases/` … スキル出力の検証とメモ（一貫性。成否検証ではない）
- `decision-axes/` … チェック項目への投影。スキルは読まない

自著 2 リポの全文も Zenn 原文もコピーしない。取込済みと見送りは [`stable-corpus/INDEX.md`](./stable-corpus/INDEX.md)。

## 収集方針

1. 日常の追加・更新・削除は **一次情報** だけ → [`LIFECYCLE.md`](./LIFECYCLE.md)
2. 自著に追加があったら [`stable-corpus/INTAKE.md`](./stable-corpus/INTAKE.md) で都度確認してから取り込む
3. 抽出の型は [`sources/PIPELINE.md`](./sources/PIPELINE.md)
4. ユースケースで canonical を調整する
5. チェック項目は [`decision-axes/`](./decision-axes/) へ投影する。ここへ判断文を書かない
