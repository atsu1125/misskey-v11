# Contribution Guideline

Thanks for your contributions!

## Internationalization (i18n)

Areionskey uses the [Vue.js plugin Vue I18n](https://github.com/kazupon/vue-i18n).

[Documentation of Vue I18n](http://kazupon.github.io/vue-i18n/introduction.html)

## Versioning

Versioning follows [Semantic Versioning 2.0.0](https://semver.org/).

## Codenames

Codenames are based on the names of racetracks in Japan (JRA and local), starting from the north of Japan.
This will change with each major version.

`Obihiro (1.x.x) → Monbetsu (2.x.x) → Sapporo (3.x.x) → Hakodate (4.x.x) ･･･`

## Documentation

Documents for contributors and instance admins are located in this repository's wiki.
Documents for end users are located in `/src/docs`.

## Test

Test codes are located in `/test`.

## Directory structure

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

### How to resolve conflictions occurred at yarn.lock?

Just execute `yarn` to fix it.

## Adding MisskeyRoom items

* Use English for material, object and texture names.
* Use meter for unit of length.
* Your PR should include all source files (e.g. `.png`, `.blend`) of your models (for later editing).
* Your PR must include the glTF binary files (`.glb`) of your models.
* Add a locale key `room.furnitures.YOUR_ITEM` at `/locales/ja-JP.yml`.
* Add a furniture definition at `/src/client/app/common/scripts/room/furnitures.json5`.

If you have no experience on 3D modeling, we suggest to use the free 3DCG software [Blender](https://www.blender.org/).
You can find information on glTF 2.0 at [glTF 2.0 — Blender Manual]( https://docs.blender.org/manual/en/dev/addons/io_scene_gltf2.html).
