# 品質ゲートと客観性（HITL / 独立コンテキスト）

- status: canonical
- dimensions: D6, D8, D9
- verified_clusters: C03
- sources:
  - ai-agent-architecture/docs/ja/agents/subagent-quality-gate.md
  - understanding-llm: Sycophancy / Context Rot / Priority Saturation
  - OpenAI: Plan for human intervention（失敗回数上限・高ステーク）
  - OWASP LLM01:2026 / ASI09: 不可逆は本文を人が見る。要約だけで承認させない
  - 12-Factor Factor 7: 人への連絡もツール呼び出し
  - AWS Agentic Lens: autonomy levels + 影響に比例した監修

## 判断の問い

- 生成した本人（同じ会話）がレビューしてよいか
- 「合格 / 不合格」を仕組みで強制する必要があるか
- 人間の最終承認（HITL）はどの粒度か
- 審査者は要約ではなく、実際に走る操作を見られるか

## 推奨パターン

同じ会話内の「生成 → 自己レビュー」は、構造的に甘くなる。

| 構造的問題 | 自己レビューで起きること |
| --- | --- |
| Sycophancy | 自分の出力に矛盾する指摘を避ける |
| Context Rot | 生成時の文脈が残り、客観評価できない |
| Priority Saturation | 「書け」と「レビューしろ」が同時だと後者が落ちる |

対策は **コンテキストを分ける** こと。独立コンテキストの Sub-agent（または別セッション / 別モデル）に、成果物と評価基準だけ渡す。

合格基準は曖昧にしない。MUST / SHOULD / MAY で書く。

- MUST: 1件でも違反なら不合格
- SHOULD: 件数閾値で不合格
- MAY: 情報提示のみ

HITL の粒度:

- 低リスクの定型 → 自動ゲートのみでも可
- 顧客向け回答・課金・個人情報 → ゲート + 人間承認
- 破壊的操作（削除、本番反映、外部送信、返金・決済） → 人間承認を必須

承認 UI は操作の本文（宛先・金額・引数）を見せる。モデルの要約だけで押すと ASI09（Human-Agent Trust Exploitation）になる。
人への連絡は平文切り替えではなく、`request_human_input` のようなツールにすると制御フローに載る。

自律度は事前に決める（AWS: observer / assistant / autonomous / orchestrator）。影響が大きいほど審査を厚くする。

静的解析（lint / test）と人間レビューの**間**に、設計レベルのゲートを置くのが実務的。
ゲートを直列に増やしすぎない。近い観点は統合し、独立な観点は並列にする。

## よくある失敗

- 「いい感じにレビューして」で基準をゲート任せにする → 常に合格になる
- ゲートを MUST で固定せず、面倒だから自己レビューでバイパスする
- ゲートが「すべて合格」しか返さない状態を放置する
- ゲートを 10 個直列に並べてレイテンシだけ増やす
- HITL に要約だけ見せて承認させる

## 代替・例外

- 小規模なら軽量ゲート（観点 3〜5、小さいモデル）からでよい
- 機械的に検証できること（テスト、コンパイラ、スキーマ）は LLM ゲートより Hooks / CI が先（ハルシネーションしない）
