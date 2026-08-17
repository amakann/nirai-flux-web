# Nirai Flux website

Public marketing site for **Nirai Flux**, a local AI music studio.

This repo is the landing page only. The desktop app lives in [`amakann/nirai-flux`](https://github.com/amakann/nirai-flux).

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

## Download button

The Windows button always points at the moving **test** channel:

`https://github.com/amakann/nirai-flux/releases/download/test/NiraiFlux-windows-x64-setup-TEST.exe`

That asset is overwritten on each desktop test publish, so this site does not need a version bump per release.

The app repository is currently **private**, so GitHub may require sign-in (and repo access) to download.

## Deploy

Live site (GitHub Pages): **https://amakann.github.io/nirai-flux-web/**

Static site from the repo root (`master`). `.nojekyll` is included so assets and paths work as-is.
