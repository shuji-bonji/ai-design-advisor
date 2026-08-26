# RAG の要否と成熟度

- status: canonical
- dimensions: D5, D3, D7, D8, D9
- verified_clusters: C13
- sources:
  - knowledge/primary-sources/rag-guidelines.md
  - Fowler: Emerging Patterns（Direct / RAG / Hybrid / Rewrite / Rerank）
  - D3 knowledge-and-memory.md
  - D6 when-to-agentize.md（Agentic RAG は上の段）
  - 実務インタビュー: 分割・検索・並べ替え・ACL・更新削除をセットで問う

## 判断の問い

- カットオフ後・社内固有・根拠提示のどれが必要か
- Fine-tune せずに知識を足せば足りるか
- 検索品質を、生成品質と分けて測っているか
- 文書の更新・削除・権限は検索インデックスに反映されるか

## 推奨パターン

RAG が要る典型: 最新性、社内固有、根拠、Fine-tune なしのドメイン知識。Direct Prompting だけだと知識カットオフと幻覚が残る。

制御点:

1. 文書側の品質（見出し、リスト、用語定義）
2. Chunking（意味境界、オーバーラップ、メタデータ）
3. Embedding / ハイブリッド（キーワード + ベクトル）
4. Retrieval → Rerank
5. Query の書き換え・ルーティング
6. 生成時の Grounding（根拠が無ければ答えない）
7. 評価の分離（Retrieval vs Generation）
8. **運用**: 更新・削除の反映、権限（見えてはいけない文書を返さない）

成熟度は下から:

| 段 | 内容 |
| --- | --- |
| 1 | Naive ベクトル + LLM |
| 2 | Hybrid |
| 3 | + Rerank |
| 4 | Adaptive（クエリ処理） |
| 5 | Agentic（多段検索）。レイテンシ増。必要が証明されてから |

多くの現場は 2–3 で足りる。5 は D6 の「段を上げる」と同じ。

Embeddings は非構造データの近さ用。関係データは RAG の第一手段にしない（Fowler、一源だが既存指標と敵対しない）。

## よくある失敗

- チャンクが文脈を切る / 権限のない文書が混ざる
- 生成だけチューニングし、検索が死んでいる
- 「答えられない」経路が無い
- 更新した文書がインデックスに残る（古い根拠）

## 代替・例外

- 関係をまたぐ「前回の続き」は RAG より Memory（D3）
- 狭い固定知識でレイテンシ極小なら、SLM + 手順（Skill）や分類器の方が軽い
