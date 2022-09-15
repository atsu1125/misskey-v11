ChangeLog
=========

1.5.0 (2022/09/15)
--------------------
## To Update
以下を実施してください
- Areionskey 再起動
- database マイグレーション

Dockerfiles での Node デフォルトバージョンが 17.3.0 から 18.9.0 になっています

### ✨Improvements
- パスワードリマインダ を追加 by @atsu1125 [PR#799](https://github.com/sakura-tel/areionskey/pull/799)
- 通報受信メール送信機能 を追加 by @atsu1125 [PR#796](https://github.com/sakura-tel/areionskey/pull/796)
- api/server-info, api/ping を追加 by @atsu1125 [PR#795](https://github.com/sakura-tel/areionskey/pull/795)
- ErasticSearch なしの検索機能 を追加 by @atsu1125 [PR#794](https://github.com/sakura-tel/areionskey/pull/794)

### 🐛Fixes
- nodeinfo の software を areionskey に変更 by @atsu1125 [PR#728](https://github.com/sakura-tel/areionskey/pull/728)
- 左右のナビゲーションバー を整理 [5474635](https://github.com/sakura-tel/areionskey/commit/5474635320b6a38af8c2a99b34b231c73704628d)
- みつける で 無限に もっと見る が出現されないように変更 [3fc4528](https://github.com/sakura-tel/areionskey/commit/3fc45280810a9dbdfde3970a8159937fda403030)
- 依存関係の更新

### ❌Abolitions
- ナビゲーションバーやメニュー から ハイライト を削除 [ad1fb5f](https://github.com/sakura-tel/areionskey/commit/ad1fb5f78aff442a9d8c3aa4d844c8eb5e09ff42)

1.4.0 (2022/06/19)
--------------------
### ✨Improvements
- Misskey の表記 を Areionskey に変更（破壊的変更をされない箇所のみ）
- `:` だけを入力したときに絵文字をサジェストしないように変更

### 🐛Fixes
- ルーム機能の3D描画が出来なくなっていたのを修正
- 猫耳の色を文字色と同色 に変更
- 依存関係の更新
- 言語ファイル・文書の更新

### ❌Abolitions
- ヘッダ から ハイライト を削除
- みつける から 人気のユーザー と 人気のタグ を削除

1.3.8 (2022/06/12)
--------------------
### ✨Improvements
- めいv11 Commit [224cfe95ce5e3c0bfd94c13e1ea5384bb8c3dc8c](https://github.com/mei23/misskey-v11/commit/224cfe95ce5e3c0bfd94c13e1ea5384bb8c3dc8c) までをマージ
- Docker Container 構築時の Alpine Linux を v3.15 に変更

### 🐛Fixes
- モバイルUIの投稿フォームにある絵文字ピッカーアイコンに文字が被る問題を修正
- 猫耳の色を修正（というか復元）

### ❌Abolitions
- メンションのアバター表示（セキュリティアップデートを優先ゆえに実装を後で考える）

1.3.7 (2022/02/13)
--------------------
### ✨Improvements
- モバイルUIの投稿フォームに絵文字ピッカーを追加 ([#167](https://github.com/sakura-tel/areionskey/issues/167))
- プレミアム会員のドライブ増量機能を追加 ([#143](https://github.com/sakura-tel/areionskey/issues/143))
- 投稿フォームの表示を統一・改良 ([#5](https://github.com/sakura-tel/areionskey/issues/5)) ([#232](https://github.com/sakura-tel/areionskey/issues/232))

### 🐛Fixes
- メンションのアバター表示を中揃えに修正 ([#168](https://github.com/sakura-tel/areionskey/issues/168))
- 猫耳の色を修正 ([#130](https://github.com/sakura-tel/areionskey/issues/130))
- ノート中の KaTeX 表記が表示されない点を修正 ([#231](https://github.com/sakura-tel/areionskey/issues/231))
- デスクトップUIのヘッダにあるアナログ時計が見にくい点を修正 ([#233](https://github.com/sakura-tel/areionskey/issues/233))

1.3.6 (2022/02/12)
--------------------
### ✨Improvements
- タグ めいv11 [11.37.1-20220211194000](https://github.com/mei23/misskey-v11/releases/tag/11.37.1-20220211194000) をマージ
- 依存関係の更新
- 言語ファイル・文書の更新

1.3.5 (2022/01/14)
--------------------
### ✨Improvements
- メンションにアバターを表示 ([#17](https://github.com/sakura-tel/areionskey/issues/17))
- プレミアムアカウント・公式アカウントの表示を改良 ([#110](https://github.com/sakura-tel/areionskey/issues/110))
