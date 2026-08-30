# 設計判断の体系的フレームワーク

本ドキュメントは、ai-design-advisor の知識ベースを**意思決定の次元（Decision Dimensions）**として体系化するための中核です。  
スキル版の評価指標・チェックリスト版の項目・推奨ロジックの共通基盤になります。

> 方針: 次元の骨組みは安定コーパス（Zenn 用語集・understanding-llm ・ai-agent-architecture）を土台にし、推奨値や禁止は一次情報で裏取りする。  
> 充足状況の正本は [`canonical/_index.md`](./canonical/_index.md)。  
> 構成図と一次情報の生涯は [`LIFECYCLE.md`](./LIFECYCLE.md)。

---

## 全体構造（9次元 + 横断制約）

Zennの9グループを、**設計時に実際に選ぶ判断軸**に再配置したものです。

| # | 意思決定の次元 | 対応するZennグループ | 主な問い |
|---|----------------|----------------------|----------|
| D1 | **モデルクラス選定** | 第1部（全体像） | SLM / LLM / Reasoning / Multimodal のどれか？ハイブリッドか？ |
| D2 | **生成パラメータ** | 第2部（仕組み） | Temperature帯、Reasoning Effort のレベルは？ |
| D3 | **コンテキスト・知識の扱い** | 第2部 + 第4部 | 知識カットオフ問題があるか？Context Windowは足りるか？ |
| D4 | **プロンプト・対話設計** | 第3部 | Zero/Few-shot / CoT / 対話履歴管理はどうする？ |
| D5 | **RAGの要否と設計** | 第4部 | RAGは必要か？どの成熟度まで？Chunking/Embedding/Retrieval戦略は？ |
| D6 | **エージェント化の要否と設計** | 第5部 | Plain / Tool Calling / Multi-Agent のどれか？HITLの粒度は？ |
| D7 | **Fine-tuning / 蒸留の要否** | 第6部 | プロンプト+RAGで足りるか？Fine-tune / 蒸留が必要か？ |
| D8 | **セキュリティ・ガードレール** | 第8部 | Prompt Injection対策、Guardrailの強さ、データ保護は？ |
| D9 | **運用・評価・コスト** | 第9部 | Latency目標、評価方法（LLM-as-a-Judge等）、LLMOps体制は？ |
| X  | **横断制約** | （全般 + 管理視点） | レイテンシ / コスト / プライバシー / 既存システム / 説明責任 |

---

## ソースは 2 経路

- **一次情報**（更新する）… 公式・標準・公的。`primary-sources/` と `sources/`
- **安定コーパス**（都度確認）… Zenn、understanding-llm、ai-agent-architecture

スキルの根拠は canonical のみ。運用手順は [`LIFECYCLE.md`](./LIFECYCLE.md)。

---

## スキル活用時の指標としての使い方

スキルにユースケースを投げたとき、出力は概ね次の構造を取る（詳しい型は `skills/ai-design-advisor/OUTPUT-SKELETON.md`）。

1. **要件の要約**（入力から抽出した制約と目標）
2. **各次元ごとの推奨**（D1〜D9 + X）
3. **推奨構成のまとめ**
4. **不確実な点・追加で確認すべきこと**

各次元について「推奨」「根拠（canonical ファイル名）」「確度」を返す。

---

## 充足ロードマップ

first-pass は D1–D9 + X まで済み（D7 は要否のみ）。次はユースケースでスキルを回す。

| 優先度 | 対象 | 理由 |
|--------|------|------|
| 今 | UC03 以降でスキル検証 | canonical が現場の問いに足りるか |
| 穴が出たとき | 該当 canonical ノート | 安定コーパスの再読みはしない |
| 継続 | 一次情報の追加・更新・削除 | [`LIFECYCLE.md`](./LIFECYCLE.md) |
| 後回し | D7 手法・運用 | 要否ノートは済み。手法は未精査のまま |

---

## 関連ファイル

- `LIFECYCLE.md` … 構成図と一次情報の生涯
- `canonical/` … 指標の正本
- `primary-sources/` / `sources/` … 一次情報（更新する）
- `stable-corpus/` … 一次情報以外の集約
- `use-cases/` … スキル出力の検証
- `decision-axes/` … チェック項目への落とし（未作成）
