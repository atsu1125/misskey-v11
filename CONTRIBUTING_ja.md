# Contribution Guideline

これは、コントリビューションに関するガイドラインです。
あなたがコントリビュートする際には、必ずお読みください。

## 国際化 (i18n)

Areionskey は [Vue.js: Vue I18n](https://github.com/kazupon/vue-i18n) プラグインを使用しています。

参照:
[Vue i18n のドキュメント](http://kazupon.github.io/vue-i18n/introduction.html)

## バージョニング

バージョニングは、[セマンティック バージョニング 2.0.0](https://semver.org/lang/ja/) に従います。

## コードネーム

コードネームは、国内の競馬場名 (中央競馬、地方競馬) から、北から順番につけられます。
メジャーバージョンが上がるごとに変更します。

`Obihiro (1.x.x) → Monbetsu (2.x.x) → Sapporo (3.x.x) → Hakodate (4.x.x) ･･･`

## ドキュメント

コントリビュータ向け・インスタンス管理者向けのドキュメント は このリポジトリの Wiki にあります。
エンドユーザ向けのドキュメント は `/src/docs` にあります。

## テスト

テスト用コード は `/test` にあります。

## ディレクトリ構造

``` text
src ... Source code
  @types ... Type definitions
  prelude ... Independence utils for coding JavaScript without side effects
  misc ... Independence utils for Misskey without side effects
  service ... Common functions with side effects
  queue ... Job queues and Jobs
  server ... Web Server
  client ... Client
  mfm ... MFM
test ... Test code
```

## FAQ

### `yarn.lock` で発生した コンフリクトを解決するには?

当該ディレクトリで `yarn` を実行してください。

## Misskey Room にアイテムを追加する

* 素材名・オブジェクト名・テクスチャ名には 英語を使用します。
* 長さの単位に メートルを使用します。
* PR には、後で編集するため、モデルのすべてのソースファイル（例: `.png`、`.blend`）を 含める必要があります。
* PR には、モデルの glTFバイナリファイル (`.glb`) を 含める必要があります。
* `/locales/ja-JP.yml` に `room.furnitures.(アイテム名)` を 追加します。
* `/src/client/app/common/scripts/room/furnitures.json5` に 家具の定義を追加します。

3Dモデリングの経験がない場合は、無償の3DCGソフト [Blender](https://www.blender.org/) を使用することをお勧めします。
glTF 2.0 に関する情報は、[glTF 2.0 — Blender Manual](https://docs.blender.org/manual/en/dev/addons/io_scene_gltf2.html) にあります。
