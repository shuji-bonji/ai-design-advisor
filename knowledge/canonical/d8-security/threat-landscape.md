# 脅威の見取り図（設計判断用）

- status: canonical
- dimensions: D8, D6, D5
- verified_clusters: C05, C07, C08
- sources:
  - OWASP GenAI LLM Top 10 2026（正本 2026/final）
  - OWASP Top 10 for Agentic Applications（ASI01–10）
  - OWASP MCP / 公式 Security Best Practices 2026-07-28
  - ai-agent-architecture/docs/ja/mcp/security.md（原則は採用、LLM番号対応は補正）

## 判断の問い

- ユーザー入力がモデルの動作を変えうるか（チャット・RAG・ツール結果のすべて）
- モデルがツールや書き込み権限を持つか（過副な自律性）
- 社外モデルに渡してよいデータか
- ツール／MCP／プラグインの出所は管理されているか

## 推奨パターン

設計判断では、次を「必ず見る脅威」とする。番号は世代で動くので、**名前で扱う**。引用するときだけ `LLM01:2026` のように年号付きで書く。

| 脅威（名前） | 2026 ID | 設計で効く問い | 典型対策の置き場 |
| --- | --- | --- | --- |
| Prompt Injection | LLM01 / ASI01 | 入力・検索結果・ツール出力を信頼するか | 入力分離、ツール権限縮小、出力検証 |
| Sensitive information disclosure | LLM02 | プロンプト／ログ／推論跡に秘密が乗るか | マスキング、最小投入、セッション分離 |
| Excessive agency | LLM03 | モデルが「できること」が広すぎないか | 最小権限、破壊的操作は HITL |
| Supply chain | LLM04 / ASI04 | モデル・MCP・依存の出所 | 許可リスト、棚卸し |
| Data / model poisoning | LLM05 | FT や RAG 抜きに毒が入るか | 出典制限、書き込み審査 |
| Unbounded consumption | LLM06 | 無限ループ・巨大コンテキストで枯渇しないか | 上限、タイムアウト、レート制限 |
| Misinformation | LLM07 | 流暢な誤りが判断やツールを動かすか | 評価、出典、HITL |
| Hidden context exposure | LLM08 | 隠しプロンプトを秘密場所にしていないか | 秘密を隠さない。漏れる前提 |
| Vector / embedding weaknesses | LLM09 | 類似度検索の幾何側を見ているか | ACL、テナント分離 |
| Improper output handling | LLM10 | 出力を HTML/SQL/シェルに生流しするか | 出力はデータとして扱う |

**C07**: 隠しコンテキストはセキュリティ境界にしない。許可や秘密を system prompt に置かない。
**C08**: 誤りの内容（LLM07）と出力の生流し（LLM10）は別項。

Prompt Injection は RAG や Fine-tune だけでは消えない。検索結果も攻撃面である。着弾前提で権限を狭くする。

**画像・音声も入力である。** 注入と PII（写真の文字・顔）を疑う。OCR の手順は持たない。出せないなら D1 が勝つ。

**閉域は安全ではない。** 注入とテナント越権を疑う。

MCP を使うならアプリ側（LLM Top 10）とサーバ側（MCP Best Practices / ASI04）の両方を見る。

## よくある失敗

- 「ガードレール製品を入れたから Injection は終わった」と思う
- コンシューマ向けボットに広いツール権限を最初から付ける
- 未承認 MCP を開発者が個別導入する（Shadow MCP）
- システムプロンプトに秘密やガードレールの内部仕様を書く（漏洩面）
- 写真だけテキストより安全だと見る

## 代替・例外

- 社内・読み取り専用・人間が最終確認するツールは、過副な自律性のリスクが相対的に低い。それでも Injection と情報漏洩は残る。
- OWASP リストは年次で入れ替わる。canonical は「名前と問い」を残し、番号は一次情報で更新する。
