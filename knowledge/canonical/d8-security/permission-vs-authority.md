# Permission と Authority（自律性の渡し方）

- status: canonical
- dimensions: D8, D6, X
- verified_clusters: C02, C04
- sources:
  - ai-agent-architecture/docs/ja/strategy/permission-vs-authority.md
  - understanding-llm-through-claude-code/docs/ja/appendix/authority-and-llm-constraints.md
  - OWASP LLM03:2026 Excessive Agency（許可判定を LLM に任せない）
  - 12-Factor Factor 8: Own your control flow（選択と実行の間で止められる）
  - OpenAI: ツールに低・中・高の危険度。ループ終了条件を決める
  - AWS Agentic Lens: ground autonomy in explicit contracts

## 判断の問い

- この操作は「一回ずつ聞いてよいか」（permission）か、「この領域は任せてよいか」（authority）か
- 境界に達したことを、壁が止めるか、エージェントが自問するか
- 逸脱したとき、止まって見えるか、動き続けて気づきにくいか
- ツール選択とツール実行の間で止められるか

## 推奨パターン

| | Permission（許可） | Authority（権限） |
| --- | --- | --- |
| 粒度 | 個別の行為 | 判断領域 |
| 持続性 | one-shot。次も聞く | 一度委譲すると再帰的に行使 |
| 安全性の根拠 | 外部の壁と承認フロー | 内面化した原則（Doctrine） |
| 故障 | 許可待ちで硬直。検知しやすい | 拡大解釈して暴れる。検知しにくい |

LLM に広域の authority を渡しにくい理由は思想ではなく構造である。
authority が要求する「原則の保持 / 射程の自己判定 / 逸脱の自己申告」は、Instruction Decay・Sycophancy・Context Rot・Hallucination に侵食される。

だから **デフォルトは permission 反復（ハーネス）** が合理的。authority を広げるなら、監査・品質ゲート・Hooks をセットにする（MUST）。

**許可判定は LLM に任せない**（OWASP LLM03:2026）。画面に出す前にアプリ価の allowlist で止める。

制御フローはコードが持つ（12-Factor 8）。特に **ツール選択と実行の間** で一時停止できること。ここが HITL の挿入点になる。

ループの終わりは決めておく: 最終出力ツール / ツールなし応答 / エラー / 最大ターン数。

委譲は段階的に:

1. 提案のみ（実行権ゼロ）
2. 都度確認
3. 領域限定の allowlist（読み取り、特定ディレクトリの編集など）
4. 広域のバイパス（Doctrine が空ならやってはならない）

ツールに低・中・高の危険度を付ける（読取専用か書き込みか、可逆か、権限、金銭）。高は 2 止まで。

コンシューマ向けチャットボットでは、外部送信・購入・個人情報の更新・アカウント操作は 1〜2 に留める。社内の読み取りツールは 3 までを検討してよい。

## よくある失敗

- Doctrine（目的・禁止・射程）が空のまま「全部許可」にする
- 逸脱の検知をエージェントの自己申告だけに頼る
- ハーネス型の停止を「使いにくい」とだけ見て、壁を外す
- 「この操作を許可してよいか」をモデルに問う

## 代替・例外

- ホスト製品の permission mode 名は実装例。指標の本質は「一回の許可か、領域の権限か」
- 判定（合格/不合格）を下流が信じると取り消せない。行為の裁量より、判定を出す権限の方が危険なことがある
