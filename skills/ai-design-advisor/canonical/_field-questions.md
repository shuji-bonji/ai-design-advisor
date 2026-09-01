# 実務インタビュー設問との対応

現場で「AI使ってます」を深掘りするときに出る問い。実装エンジニアには当たり前でも、**なぜそうするか**が設計指針そのもの。

出典の例: @voidwarriorchan の深掘り設問（2026-08、X Article および続報）。一次情報ではない。**問いの粒度**をチェックリストの種として使う。

| 設問の核 | 対応次元 | canonical |
| --- | --- | --- |
| 長いプロンプト以外のコンテキスト設計 | D3 D4 | 予算・住所分解 |
| 履歴の削り・優先 | D3 | context-as-budget |
| プロンプトキャッシュ / セマンティックキャッシュ | X / D9 | serving-and-cache |
| 遅さの切り分け（prefill vs decode） | X / D9 | serving-and-cache |
| 量子化してよいか | D1 | selection.md |
| モデルとコードの責任分離 | D6 D8 D9 | Hooks、permission |
| 更新され続ける文書 | D5 D8 | when-and-how.md |
| 変更で品質が落ちていないか | D9 | loop-eval-and-stop |
| LLM-as-Judge をどこまで信じるか | D9 | loop-eval-and-stop |
| モデル障害時の縮退 | X / D9 | serving-and-cache |
| Temperature / Effort | D2 | temperature-and-effort |
| SLM vs LLM | D1 | selection.md |
| プロンプトを誰が持ち、どう短くするか | D4 | ownership / optimization-techniques |
| 推論斜金の何が高いか | D9 | cost-decomposition |
| HITL で何を見せるか | D6 D8 | quality-gate |
| MCP の認可 | D6 D8 | skill-vs-subagent / guardrail-layers |
| 開発者 / 提供者 / 利用者 | D8 | legal-actors |

完成後のスキル／チェックリストは、この種の「面接問」を **ユースケースに合わせて生成**できる。採用スクリーニングそのものが目的ではないが、ベンダー依頼前の社内点検と同じ形になる。
