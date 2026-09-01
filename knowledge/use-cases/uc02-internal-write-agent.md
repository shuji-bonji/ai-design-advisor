# 設計判断レポート: UC02 書き込み付き社内エージェント

**対象**: 社内の業務エージェント。社内文書の参照、チケット更新、共有フォルダへの書き込みがある。社外送信や決済は持たない。
**前提**: 利用者は社員。データは社内テナントに留める（社外モデルに出すかは未確認）。破壊的操作は人が承認する。
**日付**: 2026-09-01
**型**: スキル完全出力（canonical 検証用）
**位置づけ**: 確認論点。決定ではない。一貫性チェックであり、成否の検証ではない。

### 決まっていないこと

- 社外 LLM に渡してよいか
- 書き込み対象のディレクトリ / チケット種別の allowlist
- 承認は一人か、役割で分けるか
- 回数・トークン・時間の上限数字

### ベンダーに確認してほしい論点

- 書き込み前に一時停止し、承認画面に操作本文（宛先・パス・差分）が出るか
- 許可判定をモデルに問うのではなく、コードか
- MCP を使うなら、トークンをそのまま渡していないか
- 自己レビューだけで書き込んでいないか
- 全ツール常時接続にしていないか

### いま言えること

- モデル: 計画は LLM / Reasoning。定型分類は小さい側
- パラメータ: Temperature 低め。Effort は計画時だけ上げる
- 知識: 規約・手順は RAG + Skill。チケット本体はツール。Memory 書き込みは承認
- 実行系: 単一ループ + ツール。書き込み前に HITL。初手は Multi-agent にしない
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
| D5 | 社内文書は RAG。チケット・権限はツール | when-and-how.md | 確定 |
| D6 | 単一エージェント + ツール。書き込みは HITL | when-to-agentize / skill-vs-subagent / quality-gate | 確定 |
| D7 | しない | when-to-finetune.md | 確定 |
| D8 | permission 反復。承認 UI は操作本文。passthrough 禁止 | permission-vs-authority / guardrail-layers / quality-gate | 確定 |
| D9 | 回数・トークン・時間の上限。跡。書き込みは冪等 | loop-eval-and-stop / cost-decomposition | 条件付き |
| X | 安定な system / ツール定義をキャッシュ | serving-and-cache.md | 確定 |

D1 が条件付きなのは、社外モデル可否が未確認だから。D9 は上限の数字を canonical が持たないから。

### 詳細

- **推奨**: 制御フローはコード。ツール選択と実行の間で止める。承認画面は要約ではなく本文。
- **なぜ**: 書き込みは不可逆に近い。LLM に authority を渡すと検知しにくい。
- **代替**: 中間検索が親コンテキストを汚すなら Sub-agent。初手から複数人格にしない。
- **禁止**: 許可をモデルに問う、token passthrough、メモへの自由書き込み、歩数閾値を SLA にする。
