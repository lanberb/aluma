f# Get Started with Aluma

Aluma makes easier management of assets on your Figma.

you can do

- Import assets as a ZipFile to your machines.
- Import assets as a PullRequest to your Github repository.

### 0️⃣ Try in local

1. Install packages.

```sh
yarn install
```

2. Click `Plugins → Development → Aluma` in your Figma.

### 1️⃣ Composition 🇯🇵

- src
  - app - Aluma 本体
    - assets - 静的アセット
      - styles - グローバルな CSS 群
    - components - コンポーネント
    - index.css - CSS バンドルのエンドポイント
    - index.tsx - JS バンドルのエンドポイント
    - index.html - ui.html になるエンドポイント
  - main - ゆ
  - libs
  - esbuild.config.ts
  - manifest.json
  - package.json
