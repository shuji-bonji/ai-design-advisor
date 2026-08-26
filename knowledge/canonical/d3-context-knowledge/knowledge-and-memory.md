# 知識カットオフと Memory

- status: canonical
- dimensions: D3, D5, D6, D8
- verified_clusters: C17
- sources:
  - understanding-llm: Knowledge Boundary / Hallucination
  - ai-agent-architecture/docs/ja/part-3/memory.md
  - OWASP ASI06 Memory and Context Poisoning
  - OWASP LLM01:2026 / LLM05（メモ書き込みは注入の延長面）
  - D5 rag-guidelines.md

## 判断の問い

- その知識はモデル内にあるか、カットオフ後か、社内固有か
- 毎回ツールで集めれば足りるか、関係を残す層が要るか
- 「前回の続き」は仕事の要件か
- メモへの書き込みを誰が承認するか

## 推奨パターン

| 知識の種類 | 置き場 |
| --- | --- |
| 訓練でカバーできる一般知識 | モデル（ただし古さと幻覚を疑う） |
| 原文が必要な法令・仕様・最新情報 | RAG / MCP で原文へ |
| 会話をまたぐ関係（顧客・案件・約束） | Memory |
| 変わらない手順 | Skills |

毎回 scatter-gather（関係をその場でつなぐ）だけだと、遅さとずれが出る。関係を聞く仕事が多いなら、考える前に Memory にまとめておく。Memory はキャッシュではなく関係の残り方。

**メモ書き込みは権限操作。** 毒が以後のセッションを汚す（ASI06）。モデルが自由に書けない。承認・スキーマ・出所制限を置く。

Memory を急がなくてよい場合: ドメインが一つ、関係が浅い、過去の文脈が要件でない。

答えられないときは答えない経路を用意する（Knowledge Boundary 対策）。コンシューマ向けでは「分かりません／担当につなぎます」が設計項目。

## よくある失敗

- 原文を Skills にコピーして終わりにする
- 会話履歴だけを Memory 代わりにする
- 社内 FAQ を Fine-tune だけで最新に保とうとする（D5 / D7）
- モデルが自由にメモへ書ける

## 代替・例外

- Memory の実装（ファイル / DB / グラフ）は規模の段。最初はファイルでよい
