# Temperature と Reasoning Effort

- status: canonical
- dimensions: D2, D1, D4
- sources:
  - knowledge/primary-sources/temperature.md
  - knowledge/primary-sources/reasoning-effort.md（OpenAI / Anthropic / Google 公式、2026-08）

## 判断の問い

- 揺らぎ（多様性）が要るか、再現が要るか → Temperature
- 考える量（途中の探索）が要るか、速度が要るか → Effort / thinkingLevel
- この2つを同じつまみだと思っていないか

## 推奨パターン

Temperature（分布の鋭さ）と Effort（思考量）は **別軸**。

Temperature の目安:

| 仕事 | 目安 |
| --- | --- |
| 抽出・分類・ルーティング | 0.0–0.2 |
| コード、事実 Q&A、RAG 回答 | 0.0–0.3 |
| 要約 | 0.3–0.5 |
| 一般対話 | 0.4–0.7 |
| コピー・創作・発想 | 0.7–1.3 |

Effort の原則（3社共通）:

1. **最小から始める。** 評価で品質が上がったときだけ上げる
2. 抽出・分類・単純変換は低 Effort で足りることが多い
3. 複雑な推論・長時間エージェントは高めが効くことがある
4. Reasoning モデルでは Temperature が固定・無視されることがある。深さは Effort で見る

決定的な部分と創造的な部分は、呼び出しを分ける。Temperature と top_p を同時に極端に振らない。

値の名前（`none` / `minimal` / `xhigh` 等）はモデル世代で増減する。指標は名前より「最小から測って上げる」。

## よくある失敗

- 単純ボットに常時 high / max Effort
- Reasoning モデルに CoT「よく考えて」を二重に積む（D4）
- Temperature を上げて「賢くなった」と誤解する（揺らいでいるだけ）

## 代替・例外

- Anthropic の thinking 利用時に temperature=1 が求められる等、プロバイダ制約は一次情報をその都度見る
- デフォルト Effort はモデルで違う。未指定を「中くらい」と思い込まない
