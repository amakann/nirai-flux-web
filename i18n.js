const COPY = {
  ja: {
    metaTitle: "Nirai Flux — 自分のPCで、配信BGMを流し続ける",
    metaDesc:
      "配信者のためのローカルAI音楽スタジオ。好きなジャンル・プロンプトの曲を自分のPCで生成。ゲスト5曲、無料アカウント100曲、Proは買い切り¥980で無制限。",
    eyebrow: "配信者のためのローカルAI音楽スタジオ",
    heroTitle: "自分のパソコンで、<br />好きな音楽をずっと流せる。",
    lede: "配信者向け。<strong>好きなジャンル・プロンプト</strong>の曲を、自分のPCで生成。<strong>Stable Audio 3</strong> がローカルで動くので、クラウドの音楽APIには何も送りません。アカウントは任意です。",
    download: "Windows版をダウンロード",
    downloadOffer:
      '100曲まで無料 <span class="cta-offer-sep">·</span> 無制限は <strong>¥980</strong> <span class="pricing-was">¥2,980</span> <span class="cta-offer-off">67%オフ</span>',
    presets: "プリセット",
    play: "再生",
    pause: "一時停止",
    demoCaption: "プリセットを選んで再生。ジャンルも雰囲気も、自分の枠のまま。",
    tocOverview: "概要",
    tocDemo: "デモ",
    tocFeatures: "できること",
    tocUses: "向いている使い方",
    tocPricing: "料金",
    tocHowTo: "使い方",
    tocCreator: "制作者",
    tocNeed: "必要環境",
    tocDownload: "ダウンロード",
    featuresTitle: "できること",
    feat1Title: "商用配信可",
    feat1Body:
      '<a href="https://stability.ai/license" target="_blank" rel="noopener noreferrer">Stability AI Community License</a> の条件内で、商用配信にも使えます。年収などの制限はライセンス本文を確認してください。生成はあなたのPC上だけで完結します。',
    feat2Title: "API・OBS・Stream Deck対応",
    feat2Body:
      'ローカル HTTP API で Generate / Stream / Play / Stop を操作できます。OBS や Stream Deck、チャット連携からも同じエンドポイントを叩けます。<a href="api.html">API ドキュメント</a>',
    feat3Title: "任意の音楽をアップロード",
    feat3Body:
      "好きな音声をアップロードして再生できます。配信のイントロやジングルを流してから、生成BGMへクロスフェードで切り替えることも可能です。",
    feat4Title: "出力フォーマットを選択",
    feat4Body:
      "OPUS、AAC、MP3、WAV から選べます。配信用の軽量コーデックから、編集用の非圧縮まで用途に合わせて書き出せます。",
    feat5Title: "プリセット",
    feat5Body:
      "気に入った設定をプリセットとして保存。枠の流れに合わせて切り替えられます。",
    feat6Title: "作った曲は何度でも再生",
    feat6Body:
      "一度つくった曲は残ります。配信のたびに作り直す必要はありません。何回再生しても、生成回数は増えません。",
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
    pricingTitle: "料金",
    pricingLede:
      "アカウントは任意。生成は自分のPC上。ログインは「誰か」「何曲作ったか」「Pro か」だけをクラウドで管理します。",
    pricingGuestTitle: "ゲスト",
    pricingGuestPrice: "無料",
    pricingGuestGen: "5曲",
    pricingFreeTitle: "無料アカウント",
    pricingFreePrice: "無料",
    pricingFreeGen: "100曲",
    pricingProTitle: "Pro",
    pricingProGen: "無制限",
    pricingProPrice: '<strong class="pricing-now">¥980</strong> <span class="pricing-was">¥2,980</span>',
    pricingRowGen: "生成",
    pricingRowLength: "トラックの生成時間",
    pricingGuestLength: "最大2分",
    pricingAccountLength: "最大6分20秒",
    pricingRowCommercial: "商用利用",
    pricingRowPrice: "価格",
    howToTitle: "使い方",
    howTo1: "ログインせずに生成 — このPCで最大 5 曲。",
    howTo2:
      "このサイトまたはアプリの <strong>アカウント</strong> から Google またはメールでログイン。無料枠は <strong>このPCあたり100曲</strong>（端末IDで管理するので、別メールで新規登録しても同じPCではリセットされません）。",
    howTo3:
      "<strong>アップグレード</strong> で Pro を購入（ローンチセール ¥980）。Stripe 決済後、同じアカウントでアプリを開くと生成が無制限になります。",
    howToSignIn: "ログインは Google またはメール。Google のポップアップがブロックされたらメールでどうぞ。",
    howToStudio:
      "スタジオは通常 <code>http://127.0.0.1:8787</code>。トップバーに残り曲数とアカウントが出ます。",
    creatorTitle: "制作者",
    creatorPhotoAlt: "制作者のプロフィール写真",
    creatorRole: "Software Engineer & Sound Engineer · Tokyo",
    creatorBio1:
      "Funeral Doom バンド Funeral Moth、Post-Metal バンド Presence of Soul、Hardcore / Grindcore バンド Guede で演奏しています。",
    creatorBio2: "プライベートスタジオ Studio Kamiokande を運営しています。",
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
    navApi: "API ドキュメント",
    navHome: "ホーム",
    navAccount: "アカウント",
    saleBanner:
      'セール中 <strong>¥980</strong> <span class="pricing-was">¥2,980</span> <span class="cta-offer-off">67%オフ</span>',
    accountTitle: "アカウント",
    accountResetTitle: "パスワード再設定",
    accountHint: "サイトとアプリで同じアカウントです。ログインは「誰か」「何曲作ったか」「Pro か」だけをクラウドで管理します。",
    accountDesktopHint: "ここでログインすると、このページから Nirai Flux アプリに戻します。スタジオは開きません。",
    accountDesktopReturn: "アプリに戻しています… このタブは閉じてかまいません。",
    accountDesktopFailed: "アプリに接続できませんでした。Nirai Flux を開いたまま、もう一度ログインしてください。",
    accountGoogle: "Google で続ける",
    accountOrEmail: "またはメール",
    accountEmail: "メール",
    accountPassword: "パスワード",
    accountConfirmPassword: "パスワード（確認）",
    accountSignIn: "ログイン",
    accountCreate: "アカウント作成",
    accountNeedAccount: "アカウントを作る",
    accountHaveAccount: "すでにアカウントがある",
    accountForgot: "パスワードを忘れた",
    accountSendReset: "リセット用リンクを送る",
    accountBackToSignIn: "ログインに戻る",
    accountClose: "閉じる",
    accountDone: "完了",
    accountSignOut: "ログアウト",
    accountProUnlocked: "このアカウントは Pro です。デスクトップアプリでも同じログインが使えます。",
    accountOpenCta: "ログイン / アップグレード",
    pricingUpgrade: "アップグレード",
    accountProChip: "Pro",
    accountLeftChip: "残り {{count}} 曲",
    accountUpgradeSale: "Pro にアップグレード {{sale}}（定価 {{regular}}）",
    accountUpgradeRegular: "Pro にアップグレード {{price}}",
    accountFirebaseLoadFailed:
      "Google ログイン用の Firebase を読み込めませんでした。広告ブロッカーで gstatic.com を許可するか、メールでログインしてください。",
    accountGoogleBlocked: "Google のポップアップがブロックされました。メールでログインするか、もう一度試してください。",
    accountUnauthorizedDomain: "このアドレスでは Google ログインがまだ許可されていません。メールでログインしてください。",
    accountBadPassword: "メールまたはパスワードが違います。",
    accountEmailTaken: "このメールはすでに登録されています。ログインしてください。",
    accountWeakPassword: "パスワードは 6 文字以上にしてください。",
    accountInvalidEmail: "正しいメールアドレスを入力してください。",
    accountTooMany: "試行が多すぎます。少し待ってからもう一度。",
    accountPasswordMismatch: "パスワードが一致しません。",
    accountResetSent: "リセット用のメールを送りました。",
    accountPurchaseSuccess: "Pro が有効になりました。アプリでも同じアカウントでログインしてください。",
    accountPurchaseCancel: "購入はキャンセルされました。",
    accountPurchasePending: "決済を確認しています…",
    apiMetaTitle: "Nirai Flux API — OpenAPI",
    apiMetaDesc:
      "Nirai Flux のローカル HTTP API リファレンス。Stream Deck、OBS、curl から Generate / Stream / Play / Stop を操作。",
    apiTitle: "API リファレンス",
    apiLede:
      "ローカルスタジオ API の OpenAPI リファレンス。起動中の <code>http://127.0.0.1:8787</code> に対して Try it out できます。",
    apiSpecNote:
      '仕様書: <a href="openapi-ja.yaml">openapi-ja.yaml</a> · <a href="openapi.yaml">openapi.yaml</a> · <a href="openapi.json">openapi.json</a>',
  },
  en: {
    metaTitle: "Nirai Flux — stream your own BGM, on your PC",
    metaDesc:
      "A local AI music studio for streamers. Generate on your PC. Guest: 5 songs. Free account: 100. Pro: ¥980 one-time for unlimited generations.",
    eyebrow: "Local AI music studio for streamers",
    heroTitle: "Keep your own music playing.<br />On your PC, without stopping.",
    lede: "Built for streamers. Write a prompt, pick a genre, and <strong>generate on your own computer</strong>. <strong>Stable Audio 3</strong> runs locally — nothing is sent to a cloud music API. Accounts are optional.",
    download: "Download for Windows",
    downloadOffer:
      'Free up to 100 songs <span class="cta-offer-sep">·</span> Unlimited <strong>¥980</strong> <span class="pricing-was">¥2,980</span> <span class="cta-offer-off">67% off</span>',
    presets: "Presets",
    play: "Play",
    pause: "Pause",
    demoCaption: "Pick a preset and play. Your genre, your vibe, your machine.",
    tocOverview: "Overview",
    tocDemo: "Demo",
    tocFeatures: "Features",
    tocUses: "Good fits",
    tocPricing: "Pricing",
    tocHowTo: "How to use",
    tocCreator: "Creator",
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
    feat4Title: "Pick your output format",
    feat4Body:
      "Choose OPUS, AAC, MP3, or WAV — from lightweight streaming codecs to uncompressed files for editing.",
    feat5Title: "Presets",
    feat5Body:
      "Save settings you like as presets and switch them to match your stream or session flow.",
    feat6Title: "Play generated songs anytime",
    feat6Body:
      "Songs you make are saved. You don’t have to generate them again for every stream. Playing a track never uses another generation.",
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
    pricingTitle: "Pricing",
    pricingLede:
      "Accounts are optional. Generation still runs on your machine. Sign-in only tracks who you are, how many songs you’ve made, and whether Pro is unlocked.",
    pricingGuestTitle: "Guest",
    pricingGuestPrice: "Free",
    pricingGuestGen: "5 songs",
    pricingFreeTitle: "Free account",
    pricingFreePrice: "Free",
    pricingFreeGen: "100 songs",
    pricingProTitle: "Pro",
    pricingProGen: "Unlimited",
    pricingProPrice: '<strong class="pricing-now">¥980</strong> <span class="pricing-was">¥2,980</span>',
    pricingRowGen: "Generations",
    pricingRowLength: "Track length",
    pricingGuestLength: "Up to 2 min",
    pricingAccountLength: "Up to 6 min 20 sec",
    pricingRowCommercial: "Commercial use",
    pricingRowPrice: "Price",
    howToTitle: "How to use",
    howTo1: "Generate without signing in — up to 5 songs on this PC.",
    howTo2:
      "On this site or in the app, open <strong>Account</strong> → <strong>Continue with Google</strong> or email + password. Free tier is <strong>100 songs per PC</strong> (tracked by device ID — a new email on the same machine does not reset the limit).",
    howTo3:
      "Click <strong>Upgrade</strong> to buy Pro (¥980, launch sale). After Stripe checkout, the same account unlocks unlimited generations in the desktop app.",
    howToSignIn: "Sign-in is Google or email/password. If a Google popup is blocked, use email.",
    howToStudio:
      "Open the studio (usually <code>http://127.0.0.1:8787</code>). The top bar shows remaining songs and Account.",
    creatorTitle: "About the creator",
    creatorPhotoAlt: "Portrait of the app creator",
    creatorRole: "Software Engineer & Sound Engineer · Tokyo",
    creatorBio1:
      "Plays in Funeral Doom band Funeral Moth, Post-Metal band Presence of Soul, and Hardcore / Grindcore band Guede.",
    creatorBio2: "Runs the private music studio Studio Kamiokande.",
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
    navApi: "API Doc",
    navHome: "Home",
    navAccount: "Account",
    saleBanner:
      'On sale <strong>¥980</strong> <span class="pricing-was">¥2,980</span> <span class="cta-offer-off">67% off</span>',
    accountTitle: "Account",
    accountResetTitle: "Reset password",
    accountHint: "The website and the app share the same account. Sign-in only tracks who you are, how many songs you’ve made, and whether Pro is unlocked.",
    accountDesktopHint: "Sign in here, then this page returns you to the Nirai Flux app. The studio will not open.",
    accountDesktopReturn: "Returning you to the app… you can close this tab.",
    accountDesktopFailed: "Could not reach the app. Keep Nirai Flux open and sign in again.",
    accountGoogle: "Continue with Google",
    accountOrEmail: "or email",
    accountEmail: "Email",
    accountPassword: "Password",
    accountConfirmPassword: "Confirm password",
    accountSignIn: "Sign in",
    accountCreate: "Create account",
    accountNeedAccount: "Create an account",
    accountHaveAccount: "Already have an account",
    accountForgot: "Forgot password",
    accountSendReset: "Send reset link",
    accountBackToSignIn: "Back to sign in",
    accountClose: "Close",
    accountDone: "Done",
    accountSignOut: "Sign out",
    accountProUnlocked: "Pro is unlocked on this account. The desktop app uses the same login.",
    accountOpenCta: "Sign in or upgrade",
    pricingUpgrade: "Upgrade",
    accountProChip: "Pro",
    accountLeftChip: "{{count}} left",
    accountUpgradeSale: "Upgrade to Pro {{sale}} (was {{regular}})",
    accountUpgradeRegular: "Upgrade to Pro {{price}}",
    accountFirebaseLoadFailed:
      "Could not load Firebase for Google sign-in. Allow gstatic.com in blockers, or use email and password.",
    accountGoogleBlocked: "Google sign-in was interrupted. Try again, or use email and password.",
    accountUnauthorizedDomain: "Google sign-in is not allowed on this address yet. Use email and password.",
    accountBadPassword: "Email or password is incorrect.",
    accountEmailTaken: "That email already has an account. Sign in instead.",
    accountWeakPassword: "Password must be at least 6 characters.",
    accountInvalidEmail: "Enter a valid email address.",
    accountTooMany: "Too many attempts. Wait a minute and try again.",
    accountPasswordMismatch: "Passwords do not match.",
    accountResetSent: "Check your email for a reset link.",
    accountPurchaseSuccess: "Pro is unlocked. Sign in with the same account in the desktop app.",
    accountPurchaseCancel: "Checkout was canceled.",
    accountPurchasePending: "Confirming your purchase…",
    apiMetaTitle: "Nirai Flux API — OpenAPI",
    apiMetaDesc:
      "OpenAPI reference for the Nirai Flux local HTTP API. Generate, stream, play, and stop from Stream Deck, OBS, or curl.",
    apiTitle: "API Reference",
    apiLede:
      "OpenAPI reference for the local studio API. Use Try it out against your running instance at <code>http://127.0.0.1:8787</code>.",
    apiSpecNote: 'Spec: <a href="openapi.yaml">openapi.yaml</a> · <a href="openapi.json">openapi.json</a>',
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

function formatCopy(value, vars) {
  if (value == null) return value;
  let text = String(value);
  if (vars) {
    for (const [name, val] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(val));
    }
  }
  return text;
}

function copyVars() {
  const version = (window.NF_DOWNLOAD && window.NF_DOWNLOAD.version) || "1.0.0";
  return { version };
}

function applyLang(lang) {
  const dict = COPY[lang];
  if (!dict) return;
  const vars = copyVars();

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
    if (value != null) el.textContent = formatCopy(value, vars);
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