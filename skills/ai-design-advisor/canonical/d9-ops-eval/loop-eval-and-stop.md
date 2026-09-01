# ループ、評価、停止条件

- status: canonical
- dimensions: D9, D6, D5, D1
- verified_clusters: C14, C15, C23
- sources:
  - ai-agent-architecture/docs/ja/strategy/loop-engineering.md
  - OpenAI / Azure / Fowler / AWS Agentic Lens / GCP reliability
  - AISI 評価観点（目次のみ、C23）

## 判断の問い

- 内側ループか外側ループか
- 「完了」は機械的に検証できるか
- 検索品質と回答品質を混ぜていないか
- エージェントの一手を追えるか

## 推奨パターン

評価を先に置く。強いモデルで基準を出してから下げる。内ループ（開発）と外ループ（生産）を分ける。

1. **停止** — 上限と機械条件。自己申告だけは不可
2. **コンテキスト衛生**
3. **ツール** — 書き込みは冪等
4. **批評者** — maker と checker を分ける
5. **跡** — 推論・ツール・メモ・引き渡しを一本で。SLO は成功率・レイテンシ・有害出力率で置く。数値自体は転記しない

評価の分離: Retrieval と Generation。Judge は補助。実ユーザー分布。回帰セット。

**C23:** AISI の観点見出しは「何を測るか」の目次にしてよい。一覧を採点表にしない。

## よくある失敗

- 「進捗したので完了」を信じる
- Judge に全部採点させる
- AISI / NIST の表をそのまま合格線にする

## 代替・例外

- 小規模なら外側ループは人が座ったままでよい
- ハーネス逸話は二次情報。「実行系で結果が変わる」だけ採る
