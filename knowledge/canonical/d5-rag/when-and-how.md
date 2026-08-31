# RAG の要否と成熟度

- status: canonical
- dimensions: D5, D3, D7, D8, D9
- verified_clusters: C13, C20
- sources:
  - knowledge/primary-sources/rag-guidelines.md
  - Fowler: Emerging Patterns（Direct / RAG / Hybrid / Rewrite / Rerank / Embeddings の用途）
  - D3 knowledge-and-memory.md
  - D6 when-to-agentize.md
  - 実務インタビュー: 分割・検索・並べ替え・ACL・更新削除

## 判断の問い

- カットオフ後・社内固有・根拠提示のどれが必要か
- Fine-tune せずに知識を足せば足りるか
- 検索品質を、生成品質と分けて測っているか
- 文書の更新・削除・権限は検索インデックスに反映されるか
- 足したいのは非構造文の近さか、関係・マスタか

## 推奨パターン

RAG が要る典型: 最新性、社内固有、根拠、Fine-tune なしのドメイン知識。Direct Prompting だけだと知識カットオフと幻覚が残る。

制御点:

1. 文書側の品質
2. Chunking
3. Embedding / ハイブリッド
4. Retrieval → Rerank
5. Query の書き換え
6. Grounding（根拠が無ければ答えない）
7. 評価の分離
8. **運用**: 更新・削除・権限

成熟度は下から 1 Naive → 2 Hybrid → 3 Rerank → 4 Adaptive → 5 Agentic。多くの現場は 2–3。5 は D6 と同じ「段を上げる」。

**C20（一源・Fowler、既存指標と敵対しない）:** Embeddings は非構造データの近さ用。顧客マスタ・注文関係・在庫の結合は第一手段にしない。関係はツール / SQL / Memory（D3）。

**入力が取れなかった項目を「一致」「該当なし確定」にしない。** 沈黙して合格にしない。

## よくある失敗

- チャンクが文脈を切る / 権限のない文書が混ざる
- 生成だけチューニングし、検索が死んでいる
- 「答えられない」経路が無い
- 更新した文書がインデックスに残る
- マスタや関係を embedding だけで解こうとする

## 代替・例外

- 関係をまたぐ「前回の続き」は RAG より Memory（D3）
- 狭い固定知識でレイテンシ極小なら SLM + Skill や分類器
