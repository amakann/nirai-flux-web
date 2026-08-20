# Nirai Flux website

Public marketing site for **Nirai Flux**, a local AI music studio.

This repo is the landing page only. The desktop app lives in the private [`amakann/nirai-flux`](https://github.com/amakann/nirai-flux) repo.

## Local preview

Open `index.html` in a browser, or serve the folder:

```bash
npx --yes serve .
```

## Download button

Windows installer (Cloudflare R2, public):

`https://nirai-flux.com/download/NiraiFlux-v1.0.7-x64-Setup.exe`

Version and URL are defined in `download-config.js`. When you ship a new beta, bump `version` there and in the app repo’s `desktop/src-tauri/tauri.conf.json`, then upload the new exe to R2 (see `nirai-flux/packaging/cloudflare/upload_windows.ps1`).

## Deploy

Live site: **https://nirai-flux.com** (GitHub Pages + custom domain)

Static site from the repo root (`master`). `.nojekyll` is included so assets and paths work as-is.
