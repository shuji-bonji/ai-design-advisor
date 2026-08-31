# ai-design-advisor

**Generative AI Tool to Support Design Decisions**

生成AIシステムの設計判断を支援するツール。  
ドメイン知識が豊富な業務側の人が、決まっていないことを名指したうえでベンダーに依頼できるようにすることを目指す。

価値の中心は推奨スタックではなく、**入力が足りないときに発明しないこと**。

## 目的

- ユースケースを入力すると、言えること / 言えないこと / 確認してほしいことを返す
- 判断軸を共通言語とする
- 用語の理解から意思決定支援へ

## 想定ユーザー

- ベンダーに依頼する業務側・企画
- PdM / 企画
- 構成を素早く切りたいエンジニア

## 提供形態

1. **スキル版**（優先）— [`skills/ai-design-advisor/SKILL.md`](./skills/ai-design-advisor/SKILL.md)
2. **設問セット** — [`knowledge/decision-axes/QUESTIONS.md`](./knowledge/decision-axes/QUESTIONS.md)
3. **持って行ける一枚**（後続）— 決まっていること／決まっていないこと／確認すること。スキル出力の HTML 化はしない

## 現状

- [x] canonical（D1–D9 + X。D7 は要否のみ。手法・運用は未精査）
- [x] スキルの出力スケルトン（確認論点を先に）
- [x] UC01–23（スターター + 組成 + 事例メモ）。一貫性チェックであり成否検証ではない
- [x] ユースケースメモと Issue 型
- [x] decision-axes（CHECKLIST / BRANCHES / QUESTIONS）
- [x] 手元メモは UC23 まで（再開は MEMO / Issue）
- [ ] 素のモデルとの比較（手順は [`knowledge/use-cases/COMPARE.md`](./knowledge/use-cases/COMPARE.md)）
- [ ] 持って行ける一枚

## 知識の流れ

```mermaid
flowchart LR
  P["一次情報（更新する）"] --> C[canonical]
  S["安定コーパス（都度確認）"] --> C
  C --> K[skills]
  C --> A[decision-axes]
  K --> U[use-cases]
  A --> W["一枚 未着手"]
```

スキルが読むのは canonical だけ。図と一次情報の追加・更新・削除は [`knowledge/LIFECYCLE.md`](./knowledge/LIFECYCLE.md)。

- 一次情報: [`knowledge/primary-sources/`](./knowledge/primary-sources/) と [`knowledge/sources/`](./knowledge/sources/)
- 安定コーパス: [`knowledge/stable-corpus/`](./knowledge/stable-corpus/)
- 次元: [`knowledge/SYSTEMATIC-FRAMEWORK.md`](./knowledge/SYSTEMATIC-FRAMEWORK.md)
- ユースケース: [`knowledge/use-cases/`](./knowledge/use-cases/)
- チェック項目: [`knowledge/decision-axes/`](./knowledge/decision-axes/)
- 出力契約: [`skills/ai-design-advisor/OUTPUT-SKELETON.md`](./skills/ai-design-advisor/OUTPUT-SKELETON.md)

## 関連

- [understanding-llm-through-claude-code](https://github.com/shuji-bonji/understanding-llm-through-claude-code)
- [ai-agent-architecture](https://github.com/shuji-bonji/ai-agent-architecture)
- [factcheck-skill](https://github.com/shuji-bonji/factcheck-skill) / [fact-checklist](https://github.com/shuji-bonji/fact-checklist)
