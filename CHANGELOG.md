ChangeLog
=========

2.1.0 (2022/12/18)
--------------------
### To Update
以下を実施してください
- Areionskey 再起動

Dockerfiles での Node デフォルトバージョンが 18.9.0 から 18.12.1 になっています

### ✨Improvements
- mobile/postform: プレビューを追加 by @EbiseLutica(from Groundpolis v2) [9189144](https://github.com/sakura-tel/areionskey/commit/91891445c0860bf283beb868f71711fe728cc8bf)
- mobile: 下部ナビゲーションバーを追加 by @EbiseLutica(from Groundpolis v2) [db1af2a](https://github.com/sakura-tel/areionskey/commit/db1af2a0bfa5b7543825c1d4dc0c3044a8635d38)
- profile: 場所/誕生日の設定項目に警告を表示 by @atsu1125 [PR#1037](https://github.com/sakura-tel/areionskey/pull/1037) [8f16281](https://github.com/sakura-tel/areionskey/commit/8f162818435029e4f6b1a742ab66b34af39e2522)
- 検索エンジンによるインデックスを拒否する機能を追加 by @atsu1125 [PR#1033](https://github.com/sakura-tel/areionskey/pull/1033) [41f664b](https://github.com/sakura-tel/areionskey/commit/41f664bed978acfcbd4fde02513bafb163e0351a)
- postform: ダイレクト投稿を選択したときに警告を表示 [9986cee](https://github.com/sakura-tel/areionskey/commit/9986ceef8eb717c4b7d039347fc16ff0e2c34733)
- welcome/timeline: リアクションを表示 by @atsu1125 [PR#1021](https://github.com/sakura-tel/areionskey/pull/1021) [9986cee](https://github.com/sakura-tel/areionskey/commit/9986cee915f994b28f60c2d55e855658153cc3ef)

### 🐛Fixes
- admin: 管理者/モデレータ以外がアクセスしたときにアクセス拒否画面を出すように変更 by @EbiseLutica(from Groundpolis v2) [3556f9c](https://github.com/sakura-tel/areionskey/commit/3556f9cbcf4219f5fa8004e0b59db9906b4f7395)
- mobile/notify: 引用符にまで色がついていたのを修正 [4c18113](https://github.com/sakura-tel/areionskey/commit/4c181139f151156fc235bc91fe8b22836d21b47b)
- note/menu: ブックマークやウォッチの操作後にメニューが開けるように修正 [54ee840](https://github.com/sakura-tel/areionskey/commit/54ee8403d1f89235454f1f3028832280b2066068)
- mobile/widget: ウィジェットを削除できるように修正 [afe8c83](https://github.com/sakura-tel/areionskey/commit/afe8c835e1839dca7e954f8a3efd3484d339bc3d)
- daemon/server: hideServerInfo = true 時にエラーが返るのを修正 by @atsu1125 [PR#1022](https://github.com/sakura-tel/areionskey/pull/1022) [3f76d15](https://github.com/sakura-tel/areionskey/commit/3f76d15ab49a36000c0ec9f43af06fa6f010ccd6)
- note/react: 自分のノートにリアクションできるように変更 by @atsu1125 [PR#1021](https://github.com/sakura-tel/areionskey/pull/1021) [a8138e2](https://github.com/sakura-tel/areionskey/commit/a8138e24246dfe817c864a548bbcc9ae777bc17d)
- admin: テキストボックスによる設定項目でスペースのみの項目が保存できてしまうのを修正 by @mei23(from Mei v11) [8319033](https://github.com/sakura-tel/areionskey/commit/831903304e4ccd1925b0cb460c819d413090a83c)
- Home posts -> Unlisted posts [5779815](https://github.com/sakura-tel/areionskey/commit/5779815ff4a87c331f05ed808ea497869681994e)
- explore: 無限ループしないように修正 [bb11d3c](https://github.com/sakura-tel/areionskey/commit/bb11d3caae3f8bc572d8f0c891c959b2d2600886)
- widget/stickynote: 即時保存するように変更 [63dfef9](https://github.com/sakura-tel/areionskey/commit/63dfef96fadd0f3ef431a399faa6390b28c151fa)
- その他 mergin/padding の調整
- 統一されていない文言やアイコンを統一
- 言語ファイルや文書の更新
- 依存関係の更新

2.0.0 (2022/12/04)
--------------------
### 💥BREAKING CHANGES
- Drop Node.js v12.x support

### To Update
以下を実施してください
- Areionskey 再起動

### ✨Improvements
- めいv11 [v11.37.1-20221204012750](https://github.com/mei23/misskey-v11/releases/tag/11.37.1-20221204012750) by @mei23 までの変更/修正を適用

### 🐛Fixes
- favorite -> bookmark [19a2cc1](https://github.com/sakura-tel/areionskey/commit/19a2cc10de12b659bec8e2a9cf6240bd98749b64) [3737abd](https://github.com/sakura-tel/areionskey/commit/3737abdf09fc706572ef946112379770893ed036)
- profile: Location, birthday の連合 を修正 [853afa6](https://github.com/sakura-tel/areionskey/commit/853afa6007d49c51dd4f8db775dfd119fdc8235b)
- 依存関係の更新

1.6.3 (2022/12/03)
--------------------
### To Update
以下を実施してください
- Areionskey 再起動

### ✨Improvements
- 手動でのリモート情報の更新をする機能 を追加 by @EbiseLutica, @atsu1125 [PR#994](https://github.com/sakura-tel/areionskey/pull/994) [4594b7b](https://github.com/sakura-tel/areionskey/commit/4594b7b5fa7fd9f601a2125c3ab228398d761f99)
- profile: Location, birthday の連合 を追加 by @atsu1125 [PR#992](https://github.com/sakura-tel/areionskey/pull/992) [aab6ed3](https://github.com/sakura-tel/areionskey/commit/aab6ed32798a1916134013cce68bd3fc1b5036a1) [2ac9f6f](https://github.com/sakura-tel/areionskey/commit/2ac9f6f9530a9f53b2a8cc828674a9810e53ab0d) [c4a638c](https://github.com/sakura-tel/areionskey/commit/c4a638c7448a0866abfa002e58af568b30f69a38)
- Renote 取り消し機能 を追加 by @EbiseLutica, @atsu1125 [PR#984](https://github.com/sakura-tel/areionskey/pull/984) [b7fc5a3](https://github.com/sakura-tel/areionskey/commit/b7fc5a31b56002b0e5f3545e896b255726dcc6a8) [1234aa5](https://github.com/sakura-tel/areionskey/commit/1234aa5d6e0681fc27e78339272b5433a7c51137)

### 🐛Fixes
- forkbomb 攻撃に対処するための修正 by @mei23 [04ac49a](https://github.com/sakura-tel/areionskey/commit/04ac49a32f67dde786294209bf610fa6d352329d)
- モバイル: 非ログイン時のWelcome画面の 新規登録 / ログイン リンクの隙間 を調整 by @atsu1125 [PE#993](https://github.com/sakura-tel/areionskey/pull/993) [24951cf](https://github.com/sakura-tel/areionskey/commit/24951cfe9671703c6b679cab15db2bdbeaff8389)
- Deck: ハッシュタグタイムライン追加のダイアログ を改良 by @atsu1125 [PR#983](https://github.com/sakura-tel/areionskey/pull/983) [38f4da1](https://github.com/sakura-tel/areionskey/commit/38f4da1a3ca3b861902a09b9d831388481b4137b) [51dc14e](https://github.com/sakura-tel/areionskey/commit/51dc14e4cd2fc824c1a5c890d937ef773869c52b)
- 画像の更新
- 依存関係の更新

### ❌Abolitions
- ブロックの連合 を削除 [ae2be09](https://github.com/sakura-tel/areionskey/commit/ae2be095651e83b295f2e1c870c0d52a1aaf24b5)

1.6.2 (2022/12/03)
--------------------
### To Update
以下を実施してください
- Areionskey 再起動

緊急のリリースなので Changelog はリリース後に書きます

1.6.1 (2022/11/17)
--------------------
### To Update
以下を実施してください
- Areionskey 再起動

### ✨Improvements
- ユーザページに バッジを追加 [562f7d2](https://github.com/sakura-tel/areionskey/commit/562f7d28b516828850bb91a0d2b1af042dfcd5e5)

### 🐛Fixes
- DNS キャッシュをしないように変更 by @atsu1125 [b0facdf](https://github.com/sakura-tel/areionskey/commit/b0facdf9c77b60329b808b675ee09ae6054d66fe)
- データのエクスポートができなくなっていたのを修正 [ebe32ce](https://github.com/sakura-tel/areionskey/commit/ebe32ce1e43406c7c4c51e23abc1ea4bcbf9545c)
- 「閉鎖されているとマーク」を「配信停止」に変更 [7590578](https://github.com/sakura-tel/areionskey/commit/75905784050d46aa9fcf0d7bd1ed2568830ba3f9)
- Admin バッジ を ノートヘッダから削除，Bot バッジ を 文字からアイコンに変更 [e75deda](https://github.com/sakura-tel/areionskey/commit/e75dedaae35aa45aa1b2ddc90ee3b87e9b45ebb8) [3a28f17](https://github.com/sakura-tel/areionskey/commit/3a28f1727b9dce255f410f0e9912c54e0ae257e6)
- モバイル: ログインダイアログの OK(わかった) ボタンを削除 [1fcfcc8](https://github.com/sakura-tel/areionskey/commit/1fcfcc82406888a524d27892356ef0cbdf05646f)
- モバイル: 非ログイン時のWelcome画面の ログイン リンクを 新規登録 リンクと同じ場所に移動 [92320b0](https://github.com/sakura-tel/areionskey/commit/92320b047efdbf5979964ca3d469a8ce3bfe659b)
- 依存関係の更新

### ❌Abolitions
- 非ログイン時のユーザ画面 から トレンド関連 を削除 [495c479](https://github.com/sakura-tel/areionskey/commit/495c479ba3f6bb54c26f863f2aadf5d064c62844)

1.6.0 (2022/11/11)
--------------------
### To Update
以下を実施してください
- Areionskey 再起動

Dockerfiles での Node デフォルトバージョンが 18.9.0 から 18.10.0 になっています

### ✨Improvements
- フォロワー解除機能 を追加 by @atsu1125 [PR#912](https://github.com/sakura-tel/areionskey/pull/912)
- サイレンスされたユーザからのフォローは フォローリクエストを発行する機能 を追加 by @atsu1125 [PR#872](https://github.com/sakura-tel/areionskey/pull/872)

### 🐛Fixes
- 投票しようとした時 確認するように変更 by @atsu1125 [PR#934](https://github.com/sakura-tel/areionskey/pull/934)
- 管理者が 自分以外の投稿を削除しようとした時 確認するように変更 by @atsu1125 [PR#913](https://github.com/sakura-tel/areionskey/pull/913)
- ドライブ上限を超過した時 エラーを Bad Request に修正 by @atsu1125 [PR#809](https://github.com/sakura-tel/areionskey/pull/809)
- ブロック時に フォロワーを解除するように変更 by @atsu1125 [f2d6f2a](https://github.com/sakura-tel/areionskey/commit/f2d6f2ad16b3bae1e43d285eebac741a156910fa)
- ナビゲーションに フォローリクエストを常に表示するように変更 [2135d8e](https://github.com/sakura-tel/areionskey/commit/2135d8ed44009b9e87b1ec16d7eb94b7f7895460)
- 言語ファイル・文書の更新
- 依存関係の更新

### ❌Abolitions
- 非ログイン時のWelcome画面 から トレンド関連 を削除 [17f8e24](https://github.com/sakura-tel/areionskey/commit/17f8e2492dd3699b33d148e531a057cf05efd922)
- Revert [3de1369](https://github.com/sakura-tel/areionskey/commit/3de1369778cdc5f2444dedb5200ae80643693965)

1.5.0 (2022/09/15)
--------------------
### To Update
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
