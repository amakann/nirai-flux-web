const COPY = {
  ja: {
    metaTitle: "Nirai Flux — 自分のPCで、配信BGMを流し続ける",
    metaDesc:
      "配信者のためのローカルAI音楽スタジオ。好きなジャンル・プロンプトの曲を、自分のパソコンで切れ目なくストリーミング。Stable Audio 3 がローカルで動きます。",
    eyebrow: "配信者のためのローカルAI音楽スタジオ",
    heroTitle: "自分のパソコンで、<br />好きな音楽をずっと流せる。",
    lede: "配信者向け。<strong>好きなジャンル・プロンプト</strong>の曲を、自分のPCから切れ目なくストリーミング。<strong>Stable Audio 3</strong> がローカルで生成するので、クラウドの音楽APIには何も送りません。",
    download: "Windows版をダウンロード",
    presets: "プリセット",
    formatColon: "フォーマット:",
    play: "再生",
    pause: "一時停止",
    demoCaption: "プリセットを選んで再生。ジャンルも雰囲気も、自分の枠のまま。",
    tocOverview: "概要",
    tocDemo: "デモ",
    tocFeatures: "できること",
    tocUses: "向いている使い方",
    tocNeed: "必要環境",
    tocDownload: "ダウンロード",
    featuresTitle: "できること",
    feat1Title: "商用配信可",
    feat1Body:
      '<a href="https://stability.ai/license" target="_blank" rel="noopener noreferrer">Stability AI Community License</a> の条件内で、商用配信にも使えます。年収などの制限はライセンス本文を確認してください。生成はあなたのPC上だけで完結します。',
    feat2Title: "API・OBS・Stream Deck対応",
    feat2Body:
      'ローカル HTTP API で Generate / Stream / Play / Stop を操作できます。OBS や Stream Deck、チャット連携からも同じエンドポイントを叩けます。<a href="api.html">API Doc</a>',
    feat3Title: "任意の音楽をアップロード",
    feat3Body:
      "好きな音声をアップロードして再生できます。配信のイントロやジングルを流してから、生成BGMへクロスフェードで切り替えることも可能です。",
    usesTitle: "向いている使い方",
    use1Title: "配信用BGM",
    use1Body:
      "VTuberの雑談枠、ゲーム配信、作業配信。プリセットを切り替えて、枠の雰囲気に合う曲を切れ目なくストリーミング。",
    use2Title: "作業・勉強用BGM",
    use2Body:
      "lo-fi やアンビエントなど、集中しやすい雰囲気をプロンプトで指定。自分のPCだけで流し続けられます。",
    use3Title: "レストラン・店舗用BGM",
    use3Body:
      "店の空気に合うジャンルを指定して、オリジナルの店内BGMをローカル生成。権利まわりを気にしやすい場面でも扱いやすい構成です。",
    use4Title: "作曲の参考・スケッチ",
    use4Body:
      "アイデア出しやムードボード代わりに。プロンプトで方向性を試し、気に入ったテイクを書き出して作曲の出発点にできます。",
    needTitle: "必要環境",
    smallTitle: "Small Music",
    smallTag: "軽量向け",
    mediumTitle: "Medium",
    mediumTag: "高品質・長尺",
    specGpu: "GPU",
    specDisk: "空き容量",
    specLength: "曲の長さ",
    specFit: "向いているPC",
    smallGpu: "NVIDIA / Intel Arc · 目安 VRAM 約2.5GB",
    smallDisk: "モデル約3GB（初回に加えて数GB）",
    smallLength: "最大 約2分",
    smallFit: "Arc ノートや 16GB メモリなど、余裕が少ないマシン",
    mediumGpu: "NVIDIA RTX 30シリーズ以上が目安 · VRAM 約6.5GB",
    mediumDisk: "モデル約10GB（初回に加えて数GB）",
    mediumLength: "最大 約6分20秒",
    mediumFit: "余裕のあるGPU。品質と長さを優先するとき",
    needOs: "Windows。NVIDIA または Intel Arc / Xe（例: Arc 140V）。",
    navApi: "API Doc",
    navHome: "ホーム",
    apiMetaTitle: "Nirai Flux API Doc — Stream Deck / OBS 自動化",
    apiMetaDesc:
      "Nirai Flux のローカル HTTP API。Generate / Stream / Play / Stop を Stream Deck や OBS、curl から操作する手順。",
    apiTitle: "API Doc",
    apiLede:
      "スタジオが開いているあいだ、ローカル HTTP API で再生と生成を操作できます。Stream Deck、OBS、チャットボット、スクリプトから同じエンドポイントを使えます。",
    apiBeforeTitle: "始める前に",
    apiBeforeBody:
      "<ol><li>Nirai Flux が起動し、モデルが Ready になっていること。</li><li>スタジオがブラウザで開いていること（通常 <code>http://127.0.0.1:8787</code>）。タブを閉じるとコマンドは溜まるだけで再生されません。</li><li>ポート <strong>8787</strong> は localhost / LAN / VPN に限定。インターネットに公開しないでください。</li></ol>",
    apiActionsTitle: "できること",
    apiActionsBody:
      "<ul><li><strong>generate</strong> — プロンプトまたはプリセットから1曲生成して再生</li><li><strong>stream</strong> — 同じ設定で新テイクを連続生成（切れないBGM）</li><li><strong>play</strong> — 既存の曲・ストリーム・アップロードを再生</li><li><strong>stop</strong> — 再生とストリームを停止</li></ul><p><code>play_when</code> は <code>now</code>（すぐ再生／クロスフェード）または <code>after_current</code>（今の曲が終わってから）。</p>",
    apiEndpointTitle: "エンドポイント",
    apiEndpointBody:
      "<p><code>POST http://127.0.0.1:8787/api/control</code> に JSON を送ります。<code>GET /api/control</code> で最後のコマンドを確認できます。</p>",
    apiExamplesTitle: "例",
    apiExamplesBody:
      "<p>プリセットから1曲:</p><pre><code>{\"action\":\"generate\",\"preset\":\"Chill Pad\",\"play_when\":\"now\"}</code></pre><p>連続ストリーム:</p><pre><code>{\"action\":\"stream\",\"preset\":\"Chill Pad\",\"crossfade_seconds\":3,\"play_when\":\"now\"}</code></pre><p>アップロードしたイントロ:</p><pre><code>{\"action\":\"play\",\"upload_id\":\"PASTE_ID_HERE\",\"play_when\":\"now\"}</code></pre><p>停止:</p><pre><code>{\"action\":\"stop\"}</code></pre>",
    apiCurlTitle: "curl",
    apiCurlBody:
      '<pre><code>curl -s http://127.0.0.1:8787/api/control \\\n  -H "Content-Type: application/json" \\\n  -d "{\\"action\\":\\"generate\\",\\"preset\\":\\"Chill Pad\\",\\"play_when\\":\\"now\\"}"</code></pre>',
    apiPsTitle: "PowerShell",
    apiPsBody:
      '<pre><code>$api = "http://127.0.0.1:8787"\nInvoke-RestMethod -Method Post "$api/api/control" -ContentType "application/json" -Body (@{\n  action = "generate"\n  preset = "Chill Pad"\n  play_when = "now"\n} | ConvertTo-Json)</code></pre>',
    apiIdsTitle: "IDの調べ方",
    apiIdsBody:
      "<ul><li><code>GET /api/favorites</code> — プリセット（name または id）</li><li><code>GET /api/songs</code> — 単曲</li><li><code>GET /api/streams</code> — ストリームセッション</li><li><code>GET /api/uploads</code> — アップロードした音声</li></ul><p>ファイルアップロード: <code>POST /api/uploads</code>（multipart <code>file</code>）</p>",
    apiFieldsTitle: "主なフィールド",
    apiFieldsBody:
      "<ul><li><code>action</code> — generate / stream / play / stop</li><li><code>prompt</code> または <code>preset</code></li><li><code>duration</code> — 秒（モデル上限あり）</li><li><code>play_when</code> — now / after_current</li><li><code>crossfade_seconds</code> — 0–10</li><li><code>output_format</code> — opus / mp3 / aac / wav</li><li>play 時は <code>generation_id</code> / <code>stream_id</code> / <code>upload_id</code> のいずれか1つ</li></ul>",
    apiTipTitle: "配信での定番",
    apiTipBody:
      "ベッドはプリセットに保存。イントロ／ジングル／BRB は Uploads に入れて id を控える。Stream Deck に generate・stream・play intro・stop を割り当て。<code>after_current</code> で今の曲のあとにジングルを挟めます。",
    footer:
      'ソースとリリース: <a href="https://github.com/amakann/nirai-flux">amakann/nirai-flux</a>（Pre-release を含む）。',
  },
  en: {
    metaTitle: "Nirai Flux — stream your own BGM, on your PC",
    metaDesc:
      "A local AI music studio for streamers. Prompt any genre and keep original tracks playing on your own computer. Stable Audio 3 runs locally — nothing is sent to a cloud music API.",
    eyebrow: "Local AI music studio for streamers",
    heroTitle: "Keep your own music playing.<br />On your PC, without stopping.",
    lede: "Built for streamers. Write a prompt, pick a genre, and <strong>stream new takes on your own computer</strong>. <strong>Stable Audio 3</strong> runs locally. Nothing is sent to a cloud music API.",
    download: "Download for Windows",
    presets: "Presets",
    formatColon: "Format:",
    play: "Play",
    pause: "Pause",
    demoCaption: "Pick a preset and play. Your genre, your vibe, your machine.",
    tocOverview: "Overview",
    tocDemo: "Demo",
    tocFeatures: "Features",
    tocUses: "Good fits",
    tocNeed: "Requirements",
    tocDownload: "Download",
    featuresTitle: "Features",
    feat1Title: "Commercial streams, within license terms",
    feat1Body:
      'Stable Audio 3 can be used for commercial streaming under the <a href="https://stability.ai/license" target="_blank" rel="noopener noreferrer">Stability AI Community License</a>. Check the license for revenue and other limits. Generation stays on your PC.',
    feat2Title: "API, OBS, and Stream Deck",
    feat2Body:
      'Drive Generate / Stream / Play / Stop over a local HTTP API. The same endpoint works from OBS, Stream Deck, chat bots, or scripts. <a href="api.html">API Doc</a>',
    feat3Title: "Uploads and jingles",
    feat3Body:
      "Upload any audio and play it. Run an intro or jingle first, then crossfade into generated BGM.",
    usesTitle: "Good fits",
    use1Title: "Live-stream BGM",
    use1Body:
      "VTuber chats, game streams, work streams. Switch presets and keep a matching bed playing without gaps.",
    use2Title: "Focus / study BGM",
    use2Body:
      "Prompt lo-fi, ambient, or anything that helps you concentrate — generated and played entirely on your machine.",
    use3Title: "Restaurant / store BGM",
    use3Body:
      "Describe the room’s mood and generate original in-store beds locally — useful when music rights are a concern.",
    use4Title: "Composition sketches",
    use4Body:
      "Try directions with prompts, export takes you like, and use them as a starting point for writing.",
    needTitle: "System requirements",
    smallTitle: "Small Music",
    smallTag: "Lighter PCs",
    mediumTitle: "Medium",
    mediumTag: "Higher quality",
    specGpu: "GPU",
    specDisk: "Disk",
    specLength: "Track length",
    specFit: "Best for",
    smallGpu: "NVIDIA / Intel Arc · about 2.5 GB VRAM",
    smallDisk: "About 3 GB for the model (plus a few GB on first launch)",
    smallLength: "Up to about 2 minutes",
    smallFit: "Arc laptops, 16 GB machines, tighter GPUs",
    mediumGpu: "NVIDIA RTX 30-series or newer is a comfortable fit · about 6.5 GB VRAM",
    mediumDisk: "About 10 GB for the model (plus a few GB on first launch)",
    mediumLength: "Up to about 6 minutes 20 seconds",
    mediumFit: "GPUs with headroom when you want quality and longer tracks",
    needOs: "Windows. NVIDIA or Intel Arc / Xe (e.g. Arc 140V).",
    navApi: "API Doc",
    navHome: "Home",
    apiMetaTitle: "Nirai Flux API Doc — Stream Deck / OBS automation",
    apiMetaDesc:
      "Local HTTP API for Nirai Flux. Generate, stream, play, and stop from Stream Deck, OBS, or curl.",
    apiTitle: "API Doc",
    apiLede:
      "While the studio tab is open, drive generation and playback over a local HTTP API — from Stream Deck, OBS, chat bots, or scripts.",
    apiBeforeTitle: "Before you start",
    apiBeforeBody:
      "<ol><li>Nirai Flux is running and the model is Ready.</li><li>The studio is open in a browser (usually <code>http://127.0.0.1:8787</code>). If that tab is closed, commands queue and nothing plays.</li><li>Keep port <strong>8787</strong> on localhost, LAN, or VPN. Do not put it on the public internet.</li></ol>",
    apiActionsTitle: "What you can automate",
    apiActionsBody:
      "<ul><li><strong>generate</strong> — make one track from a prompt or preset, then play</li><li><strong>stream</strong> — keep generating new takes (continuous bed)</li><li><strong>play</strong> — play an existing song, stream, or upload</li><li><strong>stop</strong> — stop playback and an active stream</li></ul><p><code>play_when</code> is <code>now</code> (start ASAP / crossfade) or <code>after_current</code> (wait for the current track).</p>",
    apiEndpointTitle: "Endpoint",
    apiEndpointBody:
      "<p>POST JSON to <code>http://127.0.0.1:8787/api/control</code>. <code>GET /api/control</code> returns the last command.</p>",
    apiExamplesTitle: "Examples",
    apiExamplesBody:
      "<p>One track from a preset:</p><pre><code>{\"action\":\"generate\",\"preset\":\"Chill Pad\",\"play_when\":\"now\"}</code></pre><p>Continuous stream:</p><pre><code>{\"action\":\"stream\",\"preset\":\"Chill Pad\",\"crossfade_seconds\":3,\"play_when\":\"now\"}</code></pre><p>Play an uploaded intro:</p><pre><code>{\"action\":\"play\",\"upload_id\":\"PASTE_ID_HERE\",\"play_when\":\"now\"}</code></pre><p>Stop:</p><pre><code>{\"action\":\"stop\"}</code></pre>",
    apiCurlTitle: "curl",
    apiCurlBody:
      '<pre><code>curl -s http://127.0.0.1:8787/api/control \\\n  -H "Content-Type: application/json" \\\n  -d "{\\"action\\":\\"generate\\",\\"preset\\":\\"Chill Pad\\",\\"play_when\\":\\"now\\"}"</code></pre>',
    apiPsTitle: "PowerShell",
    apiPsBody:
      '<pre><code>$api = "http://127.0.0.1:8787"\nInvoke-RestMethod -Method Post "$api/api/control" -ContentType "application/json" -Body (@{\n  action = "generate"\n  preset = "Chill Pad"\n  play_when = "now"\n} | ConvertTo-Json)</code></pre>',
    apiIdsTitle: "Look up IDs",
    apiIdsBody:
      "<ul><li><code>GET /api/favorites</code> — presets (name or id)</li><li><code>GET /api/songs</code> — single tracks</li><li><code>GET /api/streams</code> — stream sessions</li><li><code>GET /api/uploads</code> — uploaded files</li></ul><p>Upload a file: <code>POST /api/uploads</code> (multipart <code>file</code>)</p>",
    apiFieldsTitle: "Main fields",
    apiFieldsBody:
      "<ul><li><code>action</code> — generate / stream / play / stop</li><li><code>prompt</code> or <code>preset</code></li><li><code>duration</code> — seconds (capped by model)</li><li><code>play_when</code> — now / after_current</li><li><code>crossfade_seconds</code> — 0–10</li><li><code>output_format</code> — opus / mp3 / aac / wav</li><li>For play: exactly one of <code>generation_id</code>, <code>stream_id</code>, or <code>upload_id</code></li></ul>",
    apiTipTitle: "Typical live setup",
    apiTipBody:
      "Save beds as presets. Drop intros / stingers / BRB into Uploads and copy each id. Bind Stream Deck keys for generate, stream, play intro, and stop. Use <code>after_current</code> for a stinger that should wait.",
    footer:
      'Source and releases: <a href="https://github.com/amakann/nirai-flux">amakann/nirai-flux</a> (include Pre-release).',
  },
};

window.NF_COPY = COPY;

function detectLang() {
  const query = new URLSearchParams(location.search).get("lang");
  if (query === "ja" || query === "en") return query;
  const saved = localStorage.getItem("nf-lang");
  if (saved === "ja" || saved === "en") return saved;
  return String(navigator.language || "").toLowerCase().startsWith("ja") ? "ja" : "en";
}

function applyLang(lang) {
  const dict = COPY[lang];
  if (!dict) return;

  document.documentElement.lang = lang;
  localStorage.setItem("nf-lang", lang);

  const titleKey = document.body.dataset.i18nTitle || "metaTitle";
  const descKey = document.body.dataset.i18nDesc || "metaDesc";
  document.title = dict[titleKey] || dict.metaTitle;
  const desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", dict[descKey] || dict.metaDesc);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", dict[titleKey] || dict.metaTitle);
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) ogDesc.setAttribute("content", dict[descKey] || dict.metaDesc);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = dict[el.dataset.i18n];
    if (value != null) el.textContent = value;
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const value = dict[el.dataset.i18nHtml];
    if (value != null) el.innerHTML = value;
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const value = dict[el.dataset.i18nAlt];
    if (value != null) el.setAttribute("alt", value);
  });
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.lang === lang ? "true" : "false");
  });

  const url = new URL(location.href);
  url.searchParams.set("lang", lang);
  history.replaceState(null, "", url);
  document.dispatchEvent(new CustomEvent("nf-lang"));
  document.documentElement.classList.add("i18n-ready");
}

function bootLang() {
  applyLang(detectLang());
  document.querySelectorAll("[data-lang]").forEach((btn) => {
    btn.addEventListener("click", () => applyLang(btn.dataset.lang));
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootLang);
} else {
  bootLang();
}