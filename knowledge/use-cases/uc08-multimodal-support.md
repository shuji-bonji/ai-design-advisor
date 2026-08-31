# 設計判断レポート: UC08 画像付きサポート

**対象**: コンシューマが商品・誤作画面の写真を送るサポート。テキスト FAQ と並存。返金実行はしない。
**前提**: 写真に PII が混じる可能がある。社外視覚 API 可否は未確認。体感の数値目標は未確認。
**日付**: 2026-08-31
**型**: スキル完全出力（canonical 検証用）

### 推奨構成（要約）

- モデル: 画像が本質なら Multimodal。テキスト化で足りる問いは載せない
- パラメータ: Temperature 低め。Effort は最小
- 知識: 規約・仕様は RAG。写真全体を窓に残さない
- 実行系: 段 0–2。返金ツールなし
- Fine-tune: しない
- 権限: 写真の PII 落とし。社外不可なら D1 が勝つ
- 測り方: テキスト FAQ と画像経路を分けて測る

### 次元別

| 次元 | 推奨 | 根拠 | 確度 |
| --- | --- | --- | --- |
| D1 | 画像が本質なら Multimodal。社外不可ならオンプレ / テキスト化 | selection.md | 条件付き |
| D2 | Temperature 0.0–0.3。Effort 最小 | temperature-and-effort.md | 確定 |
| D3 | 写真の生トークンを残さない。要約して残す | context-as-budget / structural-constraints | 確定 |
| D4 | 常駐は禁止 + 形式。写真から何を読むかを明示 | writing / placement | 確定 |
| D5 | 仕様・規約は RAG。写真を embedding しない | when-and-how.md | 確定 |
| D6 | 段 2 で止める | when-to-agentize.md | 確定 |
| D7 | しない | when-to-finetune.md | 確定 |
| D8 | 写真の PII。注入着弾前提 | threat-landscape / guardrail-layers | 条件付き |
| D9 | 経路別評価。TTFT は画像 prefill が先に壊れる | loop-eval-and-stop / serving-and-cache | 条件付き |
| X | 定型 system だけキャッシュ。写真回答を意味キャッシュしない | serving-and-cache.md | 確定 |

D1 / D8 が条件付きなのは、視覚 API の社外出力が未確認だから。

### 詳細

- **推奨**: 画像が本質の件だけ Multimodal。読めたラベルを残して RAG する。
- **なぜ**: テキスト化で足りるなら載せない（selection.md）。
- **代替**: オンプレ視覚が無ければ、人が写真を見てラベルする。
- **禁止**: 全問い合わせに Multimodal、写真の意味キャッシュ、返金ツール。

### ベンダーに渡す文

- やること: 画像経路の分離、PII 落とし、ラベル化後の RAG、体感の prefill 計測
- やらないこと: 全件視覚モデル、写真を索引に投げる

### 追加確認

- 写真を社外視覚に渡してよいか
- 画像が本質の問いの割合
