# Zenn『サクッと始める生成AI用語集』概念マップ要約

出典: https://zenn.dev/umi_mori/books/generative-ai-glossary/viewer/concept-map

約60用語を9グループに整理した概念マップの要約。

## 第1部 生成AIの全体像
- 生成AI / 基盤モデル / LLM / SLM / 推論モデル / マルチモーダルモデル

## 第2部 LLMの仕組み
- Transformer / トークン / 次トークン予測 / 学習と推論 / コンテキスト・Context Window / 生成パラメータ / スケーリング則 / 幻覚・知識カットオフ

## 第3部 プロンプトと対話設計
- プロンプト / プロンプトエンジニアリング / 対話設計 / ICL / Few-Shot / CoT

## 第4部 RAGの用語
- RAG / Chunking / Embedding / ベクトルDB / ナレッジベース / Grounding

## 第5部 AIエージェントの用語
- AIエージェント / マルチエージェント / Tool Calling / HITL / スキル・コネクタ・プラグイン / API・MCP

## 第6部 Fine-tuningの用語
- Fine-tuning / 事前学習・事後学習 / RLHF / 蒸留

## 第7部 AI駆動開発の用語
- AIDD / バイブコーディング / AI-DLC / TDD・SDD / Rules・Steering / Hooks

## 第8部 生成AIセキュリティ
- プロンプトインジェクション / ガードレール

## 第9部 運用・保守
- LLMOps / ベンチマーク / レイテンシ / LLM-as-a-Judge

## 設計判断ツールへの示唆

このマップは「知識の全体像」を与える。  
ai-design-advisor では、特に以下を意思決定の軸に落とし込む：

- モデルクラス（LLM / SLM / Reasoning / Multimodal）
- 生成パラメータ（Temperature / Reasoning Effort）
- アーキテクチャ（Plain / RAG / Agent / Multi-Agent / Fine-tune）
- プロンプト戦略（Zero/Few-shot / CoT など）
- 運用・安全（Guardrail / HITL / Eval / Latency）

まだ詳細を読んでいない章が多いため、優先度の高い章から順に詳細ノートを追加していく。
