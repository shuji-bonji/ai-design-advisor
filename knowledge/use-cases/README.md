# ユースケース

スキル出力と同じ型で、canonical が足りるかを見る。

新規: [メモの型](./MEMO.md) または GitHub Issue「ユースケースメモ」。埋まったら `ucNN` に昇格。canonical には直さない。

## スターター（UC01–07）

| ID | ファイル | 何を試すか |
| --- | --- | --- |
| UC01 | [uc01-consumer-faq.md](./uc01-consumer-faq.md) | 段を上げない、RAG と参照ツール |
| UC02 | [uc02-internal-write-agent.md](./uc02-internal-write-agent.md) | HITL、permission、単一ループ |
| UC03 | [uc03-internal-rag.md](./uc03-internal-rag.md) | ACL、Grounding、検索と回答の分離 |
| UC04 | [uc04-content-generation.md](./uc04-content-generation.md) | Temperature 分離、人の採用 |
| UC05 | [uc05-classify-extract.md](./uc05-classify-extract.md) | SLM、低 Temperature、構造化出力 |
| UC06 | [uc06-on-device-privacy.md](./uc06-on-device-privacy.md) | データ外出禁止、量子化 |
| UC07 | [uc07-high-stakes.md](./uc07-high-stakes.md) | 品質ゲートを早める |

## 組成パターン（UC08–12）

| ID | ファイル | 何を試すか |
| --- | --- | --- |
| UC08 | [uc08-multimodal-support.md](./uc08-multimodal-support.md) | Multimodal の要否、写真の PII |
| UC09 | [uc09-case-memory.md](./uc09-case-memory.md) | Memory は関係、書き込みは承認 |
| UC10 | [uc10-skill-subagent-mcp.md](./uc10-skill-subagent-mcp.md) | Skill から、passthrough 禁止 |
| UC11 | [uc11-discovery-to-production.md](./uc11-discovery-to-production.md) | 探索履歴を本番に残さない |
| UC12 | [uc12-procurement.md](./uc12-procurement.md) | 主体を契約に書く |

## 事例メモ（UC13–17）

公表事例から起こしたメモを昇格。`未確認` は残し、推測で埋めない。

| ID | ファイル | 何を突くか | 元 |
| --- | --- | --- | --- |
| UC13 | [uc13-clinical-note-draft.md](./uc13-clinical-note-draft.md) | 起案者と承認者が同一人 | [memo-a](./memo-a-clinical-note-draft.md) |
| UC14 | [uc14-drawing-spec-match.md](./uc14-drawing-spec-match.md) | 文書間の一致判定。取れない項目 | [memo-b](./memo-b-drawing-spec-match.md) |
| UC15 | [uc15-loan-review-draft.md](./uc15-loan-review-draft.md) | 過去の判断を知識にする。提供側 | [memo-c](./memo-c-loan-review-draft.md) |
| UC16 | [uc16-contract-review-legal.md](./uc16-contract-review-legal.md) | 出力そのものが規制対象になりうる | [memo-d](./memo-d-contract-review-legal.md) |
| UC17 | [uc17-closed-network-multitenant.md](./uc17-closed-network-multitenant.md) | 閉域だが多テナント | [memo-e](./memo-e-closed-network-multitenant.md) |

## 未昇格のメモ（raw）

被覆の空欄に寄せて起こしたメモ。`未確認` は残す。埋まったら `uc18` 以降へ昇格。

| メモ | 突く軸 | 空欄 |
| --- | --- | --- |
| [memo-f-realtime-voice-intake.md](./memo-f-realtime-voice-intake.md) | 双方向リアルタイム音声 | X / D2 レイテンシ予算、D6 引き際 |
| [memo-g-bulk-generation.md](./memo-g-bulk-generation.md) | 人が全件を見ない生成 | D9 合否、X バッチのコスト |
| [memo-h-domain-pretraining.md](./memo-h-domain-pretraining.md) | 継続事前学習を「する」 | D7（全 UC が「しない」） |
| [memo-i-student-learning-support.md](./memo-i-student-learning-support.md) | 未成年が使う | D8 同意、D4 答えを出さない |
| [memo-j-publish-with-known-errors.md](./memo-j-publish-with-known-errors.md) | 誤り前提で先に出す | D9 合格線を下げる判断 |
| [memo-k-ugc-moderation.md](./memo-k-ugc-moderation.md) | 判定が第三者に作用する | D8 異議申立、D9 非対称 |

穴: [GAPS.md](./GAPS.md)

一覧: [starter-list.md](./starter-list.md)
