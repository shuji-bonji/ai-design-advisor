# コストは層で分解する

- status: canonical
- dimensions: D9, D1, D3, D4, D5, D6
- verified_clusters: C19
- kind: principle（層の切り方） / vendor_practice は AWS の BP ID のみ
- sources:
  - AWS Generative AI Lens — Cost optimization（GENCOST01–05）
  - AWS Agentic AI Lens — Cost design principles / AGENTCOST02
  - D1 selection.md
  - D4 optimization-techniques.md（第3層の手法）
  - X serving-and-cache.md
  - D3 context-as-budget.md / D6 when-to-agentize.md / D9 loop-eval-and-stop.md

## 判断の問い

- 今談の「高い」はどの層か
- 最悪ケースのモデルと最長コンテキストで全件を予約していないか
- 走りの上限はループの中ではなく、境界で止めているか
- 費やしはセッション / ワークフローに帰属しているか

## 推奨パターン

一枚の「推論斜金」で語らない。層を分けて問う。

| 層 | Lens | ここで決めること | 詳細 |
| --- | --- | --- | --- |
| 1 モデル | GENCOST01 / AGENTCOST02 | 定型は小さい側。信頼が落ちたときだけ上げる | D1 selection.md |
| 2 推論形態 | GENCOST02 | 実時が要るかバッチでよいか。自前ホストか | X serving-and-cache.md |
| 3 プロンプト | GENCOST03 | 入力長さ・出力長さ・接頭辞キャッシュ・無関連の落とし | D4 optimization-techniques.md |
| 4 ベクトル | GENCOST04 | 次元と件数を用途に合わせる | D5 when-and-how.md |
| 5 エージェント流れ | GENCOST05 | 停止・回数・並列の上限 | D6 when-to-agentize / D9 loop-eval |

### 症状から層を視る

| 症状 | 先に見る層 |
| --- | --- |
| 回数は少ないのに一回が高い | 1 モデル階級、Effort |
| 夜は使わないのにエンドポイントが常時髒っている | 2 推論形態 |
| 入力トークンが出力の数倍 | 3 常駐・RAG 貼り |
| 出力だけ長い | 3 max tokens と方針 |
| 検索の度にストレージが伸びる | 4 次元・件数 |
| 回数もトークンも思った以上 | 5 ループ上限。段を下げる |

### 原則（製品非依存）

1. **仕事が要る推論だけ払う**
2. **消費の上限は層ごとに置き、境界で拒否する**
3. **再計算の前に使い回す**（プロンプト・ツール結果・検索結果）
4. **費やした単位に帰属する**（エージェント / テナント / セッション / ワークフロー）
5. **計測を設計に戻す**。一回のレビューで終わらない

### コンシューマ向けボットの既定

- 層1: 定型は小さいモデル。難しい問い合わせだけ上
- 層2: 実時応答。夜間バッチは集計や再インデックスに限る
- 層3: 常駐は短い方針 + 禁止 + 形式。出力 2–4 文
- 層4: rerank まで。チャンク全量を挿まない
- 層5: エージェント化しない（D6 段 0–2）

スキルの根拠列にはこのファイル名を書く。第3層の手法名まで下るときだけ `optimization-techniques.md` を追記する。

## よくある失敗

- 全件を最大モデル + 最大 Effort + 全ツール常時接続
- プロンプトを短くせずモデル斜金だけ語る
- ベクトル次元を評価せずデフォルト
- エージェントの走りを発見してから止める
- インフラ斜金だけ見てセッション単位が見えない

## 代替・例外

- Bedrock の intelligent routing 等は vendor_practice。本質は「階とルーティングを持つ」
- 閾値数字は転記しない
- 自前ホストの予約・量子化は D1 / X
- カスタムモデルで長期運用する話は D7 の要否を通ってから
