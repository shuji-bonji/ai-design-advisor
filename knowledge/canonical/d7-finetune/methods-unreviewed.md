# 手法の選択（未精査）

- status: unreviewed
- dimensions: D7
- 種: Zenn 第6部の抽出指針 ch47–50（`knowledge/zenn-glossary/guidelines-index.json`）

スキルはここを根拠に推奨を確定しない。「情報不足」と返す。

未整理の項目:

- フル Fine-tune と PEFT（LoRA / QLoRA 等）の先後
- 蒸留と LoRA の切り分け
- 各社公式の制約、利用規約上の蒸留禁止
- DPO と RLHF の先後（用語集は DPO 先行の方向。未検証）
- ランク・学習率（製品依存。指標化しない）

用語集と揃うが数量は捨てる方向:

- LoRA / PEFT をコスト重視の第一候補にしがち、フルは後
- 自前 RLHF よりベンダー済みモデル
- 蒸留の前に規約と自社タスク実測

仮の方向は推奨に使わない。canonical の要否は [when-to-finetune.md](./when-to-finetune.md)。
