# プロンプトは自分で持ち、バージョン管理する

- status: canonical
- dimensions: D4, D9
- verified_clusters: C09
- sources:
  - 12-Factor Agents Factor 2: Own your prompts
  - AWS Agentic AI Lens: treat prompts, tool catalogs, policies as code
  - OpenAI Practical Guide: 指示は既存手順書を小さく分けて書く

## 判断の問い

- 今の常駐テキストは誰が書いているか（フレームワークの黒箱か）
- 変更したとき回帰できるか
- ツール目録やポリシーも同じ対象になっているか

## 推奨パターン

プロンプトはコードとして持つ。role / goal / personality だけ渡して中身が見えないフレームワークに任せない。

- 既存の手順書・支援スクリプトを先に使う
- 歩ごとに行動を定め、端を書く
- リポでバージョン管理し、変更は回帰セットと一緒に見る（D9）

書き方自体は [writing-and-underspecification.md](./writing-and-underspecification.md)。置き場は [placement-and-decomposition.md](./placement-and-decomposition.md)。

## よくある失敗

- ベンダーの黒箱エージェントに仕事を任せ、本文を読めない
- プロンプトをチャット画面だけで直し、何が変わったか追えない

## 代替・例外

- PoC でフレームワークを使うのはよい。本番前に本文を仕事リポへ移す
