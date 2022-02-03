# Contribution Guideline

これは、Contribution に関するガイドラインです。あなたが Contribution する際には、必ず先にお読みください。

## Internationalization (i18n)

Areionskey は Vue.js プラグインを使用しています。 [Vue i18n](https://github.com/kazupon/vue-i18n)

Vue i18n のドキュメント は 以下のサイトにあります。 [こちら](http://kazupon.github.io/vue-i18n/introduction.html)

## Documentation

* Contributors 向けのドキュメント は [Github Wiki](https://github.com/sakura-tel/areionskey/wiki) にあります。
  * **当リポジトリではコミットのプロセスを定めてあります。原則でありますので必ずお読みください。**
* インスタンス管理者向けのドキュメント は [`/docs`](/docs) にあります。
* エンドユーザ向けのドキュメント は [`/src/docs`](/src/docs) にあります。

## Test

* テスト用コード は [`/test`](/test) にあります。

## FAQ

### `yarn.lock` で発生した コンフリクトを解決するには?

当該ディレクトリで `yarn` を実行してください。

## Glossary: 用語解説

### AP

_**A**ctivity**P**ub_ を意味します。

### MFM

_**M**isskey **F**lavored **M**arkdown_ を意味します。

### Mk

_**M**iss**k**ey_ を意味します。

### SW

_**S**ervice**W**orker_ を意味します。

### Nyaize

「な」 を 「にゃ」に変換することです。

#### Denyaize

Nyaize を復元することです。

## Misskey Room にアイテムを追加する

* 素材名・オブジェクト名・テクスチャ名には 英語を使用します。
* 長さの単位に メートル[m]を使用します。
* PR には、後で編集するため、モデルのすべてのソースファイル（例: `.png`、`.blend`）を 含める必要があります。
* PR には、モデルの glTFバイナリファイル (`.glb`) を 含める必要があります。
* [`/locales/ja-JP.yml`](/locales/ja-JP.yml) に `room.furnitures.(アイテム名)` を 追加します。
* [`/src/client/app/common/scripts/room/furnitures.json5`](/src/client/app/common/scripts/room/furnitures.json5) に 家具の定義を追加します。

3Dモデリングの経験がない場合は、無償の3DCGソフトを使用することをお勧めします。 [Blender](https://www.blender.org/)

glTF 2.0 に関する情報は、以下のサイトにあります。[glTF 2.0 — Blender Manual](https://docs.blender.org/manual/en/dev/addons/io_scene_gltf2.html)

## TypeScript Coding Style

### セミコロン `;` を外さない

これは、ASI（Automatic Semicolon Insertion）の危険性を 回避するためです。

参照:
* https://www.ecma-international.org/ecma-262/#sec-automatic-semicolon-insertion
* https://github.com/tc39/ecma262/pull/1062

### 波括弧 `{}` を外さない

悪い例:
```ts
if (foo)
	bar;
else
	baz;
```

良い例:
``` ts
if (foo) {
	bar;
} else {
	baz;
}
```

例外として、

* `if` 文 の本文が 1つの文のみである かつ `else` 句がない

場合、波括弧を 外すことができます。

良い例:
``` ts
if (foo) bar;
```

条件式と本文が 同じ行にあることを確認します。

### 単に `===` で置き換えることができる場合は、`==` を使用しない

### `if` 文の条件式には、boolean 値 または null 関連値 のみを使用する

悪い例:
``` ts
if (foo.length)
```

良い例:
``` ts
if (foo.length > 0)
```

### `export default` を使わない

これは、現在の言語サポートが `export default` とうまく連動していないためです。

参照:
* https://basarat.gitbooks.io/typescript/docs/tips/defaultIsBad.html
* https://gfx.hatenablog.com/entry/2017/11/24/135343

悪い例:
``` ts
export default function(foo: string): string {
```

良い例:
``` ts
export function something(foo: string): string {
```

## ディレクトリ構造

```
src ... ソースコード
	@types ... Type 定義
	prelude ... 副作用のない JavaScript をコーディングするための 独立したユーティリティ
	misc ... 副作用のない Areionskey のための 独立したユーティリティ
	service ... 副作用のある 共通機能
	queue ... ジョブキューとジョブ
	server ... Web サーバ
	client ... クライアント
	mfm ... MFM

test ... テストコード
```

## 備考

### プレースホルダ

SQL を クエリビルダで組み立てる際、使用するプレースホルダは重複してはいけません。

例えば:

``` ts
query.andWhere(new Brackets(qb => {
	for (const type of ps.fileType) {
		qb.orWhere(`:type = ANY(note.attachedFileTypes)`, { type: type });
	}
}));
```

のように実装すると、ループ中で `type` というプレースホルダが 複数回使われてしまうため、不具合を生じます。
したがって、次のように実装する必要があります。

```ts
query.andWhere(new Brackets(qb => {
	for (const type of ps.fileType) {
		const i = ps.fileType.indexOf(type);
		qb.orWhere(`:type${i} = ANY(note.attachedFileTypes)`, { [`type${i}`]: type });
	}
}));
```

### TypeORM では `null` を使用しない

例えば:

```ts
const foo = await Foos.findOne({
	bar: Not(null)
});
```

のような クエリ(`bar`が`null`ではない) は期待通りに動作しません。
したがって、次のように実装する必要があります。

```ts
const foo = await Foos.findOne({
	bar: Not(IsNull())
});
```

### SQL での `null`

SQL を発行する際、パラメータが `null` になる可能性のある場合は、SQL文を分けて発行する必要があります。

例えば:

``` ts
query.where('file.folderId = :folderId', { folderId: ps.folderId });
```

という処理では、
`ps.folderId` が `null` の場合、結果的に `file.folderId = null` のようなクエリが発行されてしまいます。
これは、正しい SQL ではないので、期待した結果が得られません。
したがって、次のように実装する必要があります。

``` ts
if (ps.folderId) {
	query.where('file.folderId = :folderId', { folderId: ps.folderId });
} else {
	query.where('file.folderId IS NULL');
}
```

### SQL での `[]`(空の配列)

SQL を発行する際、`IN` のパラメータが `[]`(空の配列) になる可能性のある場合は、SQL文を分けて発行する必要があります。

例えば:

``` ts
const users = await Users.find({
	id: In(userIds)
});
```

という処理では、
`userIds` が `[]` の場合、結果的に `user.id IN ()` のようなクエリが発行されてしまいます。
これは、正しい SQL ではないので、期待した結果が得られません。
したがって、次のように実装する必要があります。

``` ts
const users = userIds.length > 0 ? await Users.find({
	id: In(userIds)
}) : [];
```

### SQL での 配列のインデックス
SQL では 配列のインデックス は **1始まり** です。
`[a, b, c]` の `a` にアクセスしたい場合、 `[0]` ではなく `[1]` と書きます。

### 簡素な `undefined` チェック
データベースからレコードを取得する場合、`undefined` になる可能性が限りなく低い場合でも、
TypeScript では `undefined` チェックを行う必要があります。
そこで、簡素な `undefined` チェックが可能な `ensure` というユーティリティ関数を用意しています。

例えば:

``` ts
const user = await Users.findOne(userId);
// この時点で user の型は User | undefined
if (user == null) {
	throw 'missing user';
}
// この時点で user の型は User
```

という処理で `ensure` を使うと

``` ts
const user = await Users.findOne(userId).then(ensure);
// この時点で user の型は User
```

という実装が可能です。
万が一 `undefined` だった場合、Promise が Reject され後続の処理は実行されません。

``` ts
const user = await Users.findOne(userId).then(ensure);
// 万が一 Users.findOne の結果が undefined の場合、ensure でエラーが発生するので
// この行に到達することはありません
// なので、.then(ensure) は
// if (user == null) {
//	throw 'missing user';
// }
// の糖衣構文のような扱いです
```

### Migration の作成方法

```
npx ts-node ./node_modules/typeorm/cli.js migration:generate -n 変更の名前
```

作成されたスクリプトは、不必要な変更を含むため 除去してください。

### ローカルでテストを動かす方法

```
cp test/test.yml .config/
```

```
docker-compose -f test/docker-compose.yml up
```

を実行し、テスト用の DB と Redis を起動します。
または、空の (データが消去されてもいい) DB を準備して `.config/test.yml` を調整します。

```
yarn test
```

## その他

### HTML のクラス名で `follow` という単語は使わない

広告ブロッカーで誤ってブロックされます。
