# 設計判断レポート: UC02 書き込み付き社内エージェント

**対象**: 社内の業務エージェント。社内文書の参照、チケット更新、共有フォルダへの書き込みがある。社外送信や決済は持たない。
**前提**: 利用者は社員。データは社内テナントに留める（社外モデルに出すかは未確認）。破壊的操作は人が承認する。
**日付**: 2026-08-28
**型**: スキル完全出力（canonical 検証用）

### 推奨構成（要約）

- モデル: 計画は LLM / Reasoning。定型分類は小さい側
- パラメータ: Temperature 低め。Effort は計画時だけ上げる
- 知識: 規約・手順は RAG + Skill。チケット本体はツール。Memory への書き込みは承認
- 実行系: 段 3（単一ツール呼び出しループ）。書き込み前に HITL。初手は Multi-agent にしない
- Fine-tune: しない
- 権限: permission 反復。許可判定はコード。passthrough 禁止
- 測り方: 停止上限、跡、書き込みの成否を機械検証

### 次元別

| 次元 | 推奨 | 根拠 | 確度 |
| --- | --- | --- | --- |
| D1 | 計画は LLM / Reasoning。分類は SLM 可 | selection.md | 条件付き |
| D2 | Effort は計画ターンだけ上げる。CoT を重ねない | temperature-and-effort.md | 確定 |
| D3 | 窓は自分で組む。エラーは圧縮して戻す。メモ書き込みは特権 | context-as-budget / knowledge-and-memory | 確定 |
| D4 | プロンプトとツール目録はリポで持つ。常駐は痩せる | ownership / placement / optimization-techniques | 確定 |
| D5 | 社内文書は RAG 段 2–3。チケット・権限はツール | when-and-how.md | 確定 |
| D6 | 単一エージェント + ツール足し。書き込みは HITL。客観レビューが要るなら段 4 | when-to-agentize / skill-vs-subagent / quality-gate | 確定 |
| D7 | しない | when-to-finetune.md | 確定 |
| D8 | permission 反復。承認 UI は操作本文。passthrough 禁止。セッション ID は認証ではない | permission-vs-authority / guardrail-layers / quality-gate | 確定 |
| D9 | 回数・トークン・時間の上限。跡。書き込みは冪等 | loop-eval-and-stop / cost-decomposition | 条件付き |
| X | 安定な system / ツール定義をキャッシュ | serving-and-cache.md | 確定 |

D1 が条件付きなのは、社外モデル可否が未確認だから（出せないならオンプレミ / オンデバイス）。
D9 が条件付きなのは、上限の数字を canonical が持たないから。

### 詳細

- **推奨**: 制御フローはコード。ツール選択と実行の間で止める。承認画面は要約ではなく、宜先・パス・差分本文。
- **なぜ**: 書き込みは不可逆に近い。LLM に authority を渡すと検知しにくい（C02 / C03 / C04）。
- **代替**: 中間検索が親コンテキストを汚すなら Sub-agent（段 4）。初手から Teams にしない。
- **禁止**: 「この操作を許可してよいか」をモデルに問う、token passthrough、メモへの自由書き込み、歩数閾値を SLA にする。

### ベンダーに渡す文

- やること: allowlist、書き込み前一時停止、操作本文の承認 UI、跡（推論・ツール・承認結果）、回数上限、MCP を使うなら別トークン
- やらないこと: 全ツール常時接続、黒箱オーケストレータに本文を任せる、自己レビューだけで書き込み

### 追加確認

- 社外 LLM に渡してよいか（出せないなら D1 が変わる）
- 書き込み対象のディレクトリ / チケット種別の allowlist
- 一人が承認するか、役割で分けるか
