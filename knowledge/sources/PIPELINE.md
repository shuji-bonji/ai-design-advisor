# 収集 → 同一スキーマ → 集約 → 検証 → canonical

Zenn 515 も、Well-Architected も、法令も、**抜いた瞬間は倉庫**。聞きの要約だけ残す。

追加・更新・削除の生涯は [`../LIFECYCLE.md`](../LIFECYCLE.md)。このファイルは抽出の型だけ。

## 順

1. **ソースごとに抽出**（まだマージしない）
2. **同一スキーマに乗せる**（タグ付け）
3. **同じ主張を集約**（クラスタ）
4. **集約単位で本当かを見る**
5. **正しいものだけ canonical に昇格**

抽出の場で文章を足して一本にすると、証跡が消える。集約は 3 でやる。

## 頂点の型（集約後）

一項の当たり:

- `claim` — 判断に使う一文（数値は分離）
- `decision_points` / `lifecycle_phases` / `dimensions`
- `track` — `product` | `dev` | `legal`
- `kind` — `principle` | `vendor_practice` | `legal` | `heuristic`
- `sources[]` — `{id, url, retrieved, quote_ok}`
- `agreement` — `複数準拠一致` | `一源のみ` | `矛盾`
- `status` — `raw` | `clustered` | `verified` | `rejected` | `canonical`
- `needs_verification` / `reject_reason`

原文は短い証拠だけ。用語集 JSON の `evidence_quote` をそのまま聞典にしない。

## 集約してよい / してはいけない

してよい: 主語が同じ（最新知識は RAG、書き込みは HITL、Effort と Temperature は別軸）。

してはいけない:

- 原則とベンダー手順（「キャッシュを使う」と「Bedrock のキャッシ TTL」）
- 法務とヘビリスティク（事業者GL と「90/10」）
- 数値の母集団（「約 50%」合体）
- 見えの似た反対（「社内用語は FT」と「用語も RAG」）→ `agreement: 矛盾` のまま残す

## 検証の先

1. 公式・公的機関（モデル作元、OWASP、事業者GL、NIST、デジタル庁）
2. 複数ソースが同方向
3. 実測・論文がある主張

落とす: 出典のない数値、時点依存のモデル名、一社の機器名だけの手順。

クラウド Lens は **原則だけ** 抽く。実装名は `vendor_practice` で残す。

## canonical へ

検証済みのクラスタを、既存の次元ノート（要否 / 禁止 / 代替）に折り込む。515 件のままを聞典にしない。
