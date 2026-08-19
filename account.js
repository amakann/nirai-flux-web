const FIREBASE_CONFIG = {
  apiKey: "AIzaSyBjjWwMpyuWzURu-UyOuJriWFsXzDrJJjw",
  authDomain: "nirai-flux-4d2c8.firebaseapp.com",
  projectId: "nirai-flux-4d2c8",
  appId: "1:844776605672:web:a805ecb395083f3520865d",
};

const FIREBASE_APP_URL = "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
const FIREBASE_AUTH_URL = "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";
const CLOUD = "https://asia-northeast1-nirai-flux-4d2c8.cloudfunctions.net";
const SESSION_KEY = "nirai.auth.session";

let auth = null;
let provider = null;
let firebaseApi = null;
let firebaseReady = null;

function loadFirebase() {
  if (firebaseReady) return firebaseReady;
  firebaseReady = Promise.all([import(FIREBASE_APP_URL), import(FIREBASE_AUTH_URL)])
    .then(function (mods) {
      const appMod = mods[0];
      const authMod = mods[1];
      firebaseApi = {
        createUserWithEmailAndPassword: authMod.createUserWithEmailAndPassword,
        getRedirectResult: authMod.getRedirectResult,
        onAuthStateChanged: authMod.onAuthStateChanged,
        sendPasswordResetEmail: authMod.sendPasswordResetEmail,
        signInWithEmailAndPassword: authMod.signInWithEmailAndPassword,
        signInWithPopup: authMod.signInWithPopup,
        signInWithRedirect: authMod.signInWithRedirect,
        signOut: authMod.signOut,
      };
      auth = authMod.getAuth(appMod.initializeApp(FIREBASE_CONFIG));
      provider = new authMod.GoogleAuthProvider();
      return auth;
    })
    .catch(function (err) {
      firebaseReady = null;
      throw err;
    });
  return firebaseReady;
}

const state = {
  user: null,
  entitlements: null,
  mode: "signin",
  busy: false,
  error: null,
  notice: null,
};

function t(key, vars) {
  const lang = document.documentElement.lang === "en" ? "en" : "ja";
  const dict = (window.NF_COPY && window.NF_COPY[lang]) || {};
  let value = dict[key];
  if (value == null) return key;
  if (vars) {
    Object.keys(vars).forEach(function (name) {
      value = value.replace(new RegExp("\\{\\{" + name + "\\}\\}", "g"), vars[name]);
    });
  }
  return value;
}

function yen(value) {
  return "¥" + Number(value || 0).toLocaleString("ja-JP");
}

function checkoutReturnUrl(extra) {
  const httpsOrigin =
    location.protocol === "https:" ? location.origin : "https://nirai-flux.com";
  const path =
    location.protocol === "https:" ? location.pathname : "/";
  const url = new URL(path, httpsOrigin);
  const lang = new URLSearchParams(location.search).get("lang");
  if (lang) url.searchParams.set("lang", lang);
  Object.keys(extra || {}).forEach(function (key) {
    url.searchParams.set(key, extra[key]);
  });
  return url.toString();
}

function saveSessionFromUser(user, extra) {
  if (!user) {
    localStorage.removeItem(SESSION_KEY);
    return Promise.resolve();
  }
  return user.getIdToken().then(function (idToken) {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        idToken: idToken,
        refreshToken: extra && extra.refreshToken ? extra.refreshToken : user.refreshToken,
        expiresAt: Date.now() + 55 * 60 * 1000,
        email: user.email || (extra && extra.email) || null,
        uid: user.uid,
      }),
    );
  });
}

function consumeAuthRedirect() {
  const hash = location.hash.replace(/^#/, "");
  if (!hash.startsWith("nirai_auth=")) return false;
  const clearHash = function () {
    history.replaceState({}, "", location.pathname + location.search);
  };
  try {
    const raw = decodeURIComponent(hash.slice("nirai_auth=".length));
    const data = JSON.parse(raw);
    clearHash();
    if (data.error) throw new Error(data.error);
    if (!data.idToken || !data.uid) return false;
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        idToken: data.idToken,
        refreshToken: data.refreshToken || "",
        expiresAt: Date.now() + Math.max(60, data.expiresIn || 3600) * 1000,
        email: data.email || null,
        uid: data.uid,
      }),
    );
    return true;
  } catch (err) {
    clearHash();
    state.error = firebaseAuthError(err);
    return false;
  }
}

let refreshInFlight = null;

function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.idToken) return null;
    return parsed;
  } catch {
    return null;
  }
}

function saveLocalSession(session) {
  if (!session) localStorage.removeItem(SESSION_KEY);
  else localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

async function refreshLocalSession(session) {
  const res = await fetch(
    "https://securetoken.googleapis.com/v1/token?key=" + encodeURIComponent(FIREBASE_CONFIG.apiKey),
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "grant_type=refresh_token&refresh_token=" + encodeURIComponent(session.refreshToken || ""),
    },
  );
  const data = await res.json().catch(function () {
    return {};
  });
  if (!res.ok || !data.id_token) {
    saveLocalSession(null);
    return null;
  }
  const next = {
    idToken: data.id_token,
    refreshToken: data.refresh_token || session.refreshToken,
    expiresAt: Date.now() + Math.max(60, Number(data.expires_in) || 3600) * 1000,
    email: session.email || null,
    uid: session.uid,
  };
  saveLocalSession(next);
  return next.idToken;
}

async function idToken() {
  if (auth && auth.currentUser) return auth.currentUser.getIdToken();
  const session = loadSession();
  if (!session) return null;
  if (!session.refreshToken) return session.idToken;
  if (Date.now() < (session.expiresAt || 0) - 60 * 1000) return session.idToken;
  if (!refreshInFlight) {
    refreshInFlight = refreshLocalSession(session).finally(function () {
      refreshInFlight = null;
    });
  }
  return refreshInFlight;
}

async function cloud(path, options) {
  const token = await idToken();
  const headers = Object.assign({}, options && options.headers);
  if (options && options.body) headers["Content-Type"] = "application/json";
  if (token) headers.Authorization = "Bearer " + token;
  const res = await fetch(CLOUD + "/" + path, Object.assign({}, options, { headers: headers }));
  const data = await res.json().catch(function () {
    return {};
  });
  if (!res.ok) {
    const err = new Error(data.message || data.error || "request_failed");
    err.code = data.error;
    err.status = res.status;
    throw err;
  }
  return data;
}

function firebaseAuthError(err) {
  const code = err && err.code ? String(err.code) : "";
  const message = err instanceof Error ? err.message : String(err || "");
  if (code === "auth/popup-blocked" || code === "auth/popup-closed-by-user") {
    return t("accountGoogleBlocked");
  }
  if (code === "auth/unauthorized-domain" || message.indexOf("auth/unauthorized-domain") >= 0) {
    return t("accountUnauthorizedDomain");
  }
  if (
    code === "auth/invalid-credential" ||
    code === "auth/wrong-password" ||
    code === "auth/user-not-found"
  ) {
    return t("accountBadPassword");
  }
  if (code === "auth/email-already-in-use") return t("accountEmailTaken");
  if (code === "auth/weak-password") return t("accountWeakPassword");
  if (code === "auth/invalid-email" || code === "auth/missing-email") return t("accountInvalidEmail");
  if (code === "auth/too-many-requests") return t("accountTooMany");
  return message;
}

function els() {
  return {
    open: document.getElementById("account-open"),
    openLabel: document.getElementById("account-open-label"),
    backdrop: document.getElementById("account-modal"),
    title: document.getElementById("account-title"),
    signedOut: document.getElementById("account-signed-out"),
    signedIn: document.getElementById("account-signed-in"),
    reset: document.getElementById("account-reset"),
    hint: document.getElementById("account-hint"),
    emailLine: document.getElementById("account-email-line"),
    notice: document.getElementById("account-notice"),
    error: document.getElementById("account-error"),
    upgrade: document.getElementById("account-upgrade"),
    proNote: document.getElementById("account-pro-note"),
    form: document.getElementById("account-form"),
    email: document.getElementById("account-email"),
    password: document.getElementById("account-password"),
    confirmWrap: document.getElementById("account-confirm-wrap"),
    confirm: document.getElementById("account-password-confirm"),
    submit: document.getElementById("account-submit"),
    switchRegister: document.getElementById("account-switch-register"),
    switchSignin: document.getElementById("account-switch-signin"),
    forgot: document.getElementById("account-forgot"),
    resetForm: document.getElementById("account-reset-form"),
    resetEmail: document.getElementById("account-reset-email"),
    resetSubmit: document.getElementById("account-reset-submit"),
    resetBack: document.getElementById("account-reset-back"),
    google: document.getElementById("account-google"),
    signout: document.getElementById("account-signout"),
  };
}

const PENDING_KEY = "nirai.pending.action";
const DESKTOP_AUTH_URL = "http://127.0.0.1:18787/desktop-auth";
let pendingAction = null;
try {
  pendingAction = sessionStorage.getItem(PENDING_KEY);
} catch {
  pendingAction = null;
}

function isDesktopAuth() {
  try {
    return new URLSearchParams(location.search).get("desktop_auth") === "1";
  } catch {
    return false;
  }
}

let desktopAuthSent = false;

function handOffDesktopAuthIfNeeded(user) {
  if (!isDesktopAuth() || !user || desktopAuthSent) return Promise.resolve();
  desktopAuthSent = true;
  state.notice = t("accountDesktopReturn");
  render();
  return user.getIdToken().then(function (idToken) {
    const form = document.createElement("form");
    form.method = "POST";
    form.action = DESKTOP_AUTH_URL;
    form.acceptCharset = "UTF-8";
    const add = function (name, value) {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = name;
      input.value = value || "";
      form.appendChild(input);
    };
    add("id_token", idToken);
    add("refresh_token", user.refreshToken || "");
    add("email", user.email || "");
    add("uid", user.uid || "");
    document.body.appendChild(form);
    form.submit();
  }).catch(function () {
    desktopAuthSent = false;
    state.error = t("accountDesktopFailed");
    render();
  });
}

function setPending(action) {
  pendingAction = action || null;
  try {
    if (action) sessionStorage.setItem(PENDING_KEY, action);
    else sessionStorage.removeItem(PENDING_KEY);
  } catch {
    // ignore
  }
}

function windowsDownloadUrl() {
  if (window.NF_DOWNLOAD && typeof window.NF_DOWNLOAD.windowsUrl === "function") {
    return window.NF_DOWNLOAD.windowsUrl();
  }
  return "https://nirai-flux.com/download/NiraiFlux-v1.0.1-x64-Setup.exe";
}

function startWindowsDownload() {
  const url = windowsDownloadUrl();
  const name =
    window.NF_DOWNLOAD && typeof window.NF_DOWNLOAD.fileName === "function"
      ? window.NF_DOWNLOAD.fileName()
      : "NiraiFlux-Setup.exe";
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", name);
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

function runPendingAction() {
  const action = pendingAction;
  setPending(null);
  if (action === "download") {
    closeModal();
    startWindowsDownload();
    return;
  }
  if (action === "upgrade") {
    const features = (state.entitlements && state.entitlements.features) || {};
    if (features.is_pro) {
      openModal();
      return;
    }
    void onUpgrade();
  }
}

async function requireSignInThen(action) {
  setPending(action);
  const token = await idToken();
  if (token) {
    runPendingAction();
    return;
  }
  openModal("signin");
}

function setBusy(busy) {
  state.busy = busy;
  const node = els();
  [
    node.google,
    node.submit,
    node.upgrade,
    node.resetSubmit,
    document.getElementById("pricing-login"),
    document.getElementById("pricing-upgrade"),
  ].forEach(function (btn) {
    if (btn) btn.disabled = busy;
  });
}

function render() {
  const node = els();
  if (!node.open || !node.backdrop) return;

  const signedIn = Boolean(state.user || (state.entitlements && state.entitlements.uid));
  const features = (state.entitlements && state.entitlements.features) || {};
  const pricing = (state.entitlements && state.entitlements.pricing) || {};
  const isPro = Boolean(features.is_pro);
  const left = features.generations_left;
  const email = (state.user && state.user.email) || (state.entitlements && state.entitlements.email) || "";

  const openLabel = node.openLabel || node.open;
  if (!signedIn) openLabel.textContent = t("navAccount");
  else if (isPro) openLabel.textContent = t("accountProChip");
  else if (typeof left === "number") openLabel.textContent = t("accountLeftChip", { count: String(left) });
  else openLabel.textContent = t("navAccount");

  const showReset = !signedIn && state.mode === "reset";
  node.signedOut.hidden = signedIn || showReset;
  node.signedIn.hidden = !signedIn;
  node.reset.hidden = !showReset;

  node.title.textContent = showReset ? t("accountResetTitle") : t("accountTitle");
  if (node.hint) {
    node.hint.textContent = isDesktopAuth() ? t("accountDesktopHint") : t("accountHint");
  }

  node.notice.hidden = !state.notice;
  node.notice.textContent = state.notice || "";
  node.error.hidden = !state.error;
  node.error.textContent = state.error || "";
  node.signout = node.signout || document.getElementById("account-signout");
  if (node.signout) node.signout.hidden = !signedIn;

  if (signedIn) {
    node.emailLine.textContent = email + (isPro ? " · Pro" : "");
    node.upgrade.hidden = isPro;
    node.proNote.hidden = !isPro;
    const sale = pricing.sale_active !== false;
    const current = pricing.current_price || 980;
    const regular = pricing.regular_price || 2980;
    node.upgrade.textContent = sale
      ? t("accountUpgradeSale", { sale: yen(current), regular: yen(regular) })
      : t("accountUpgradeRegular", { price: yen(current) });
  } else if (!showReset) {
    const register = state.mode === "register";
    node.confirmWrap.hidden = !register;
    if (node.confirm) node.confirm.required = register;
    node.submit.textContent = register ? t("accountCreate") : t("accountSignIn");
    node.switchRegister.hidden = register;
    node.switchSignin.hidden = !register;
  }
}

function openModal(mode) {
  if (mode) state.mode = mode;
  state.error = null;
  const node = els();
  node.backdrop.hidden = false;
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  render();
}

function closeModal() {
  els().backdrop.hidden = true;
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  setPending(null);
}

async function refreshEntitlements() {
  const token = await idToken();
  if (!token) {
    state.entitlements = null;
    render();
    return;
  }
  try {
    state.entitlements = await cloud("entitlements", { method: "GET" });
  } catch {
    state.entitlements = null;
  }
  render();
}

async function confirmPurchaseIfNeeded() {
  const params = new URLSearchParams(location.search);
  const purchase = params.get("purchase");
  const sessionId = params.get("session_id") || "";
  if (purchase === "cancel") {
    state.notice = t("accountPurchaseCancel");
    openModal();
  }
  if (purchase === "success") {
    state.notice = t("accountPurchasePending");
    openModal();
    if (sessionId.indexOf("cs_") === 0) {
      try {
        await cloud("confirmCheckout", {
          method: "POST",
          body: JSON.stringify({ session_id: sessionId }),
        });
        await refreshEntitlements();
        state.notice = t("accountPurchaseSuccess");
        render();
      } catch (err) {
        state.error = firebaseAuthError(err);
        render();
      }
    }
  }
  if (purchase) {
    const clean = new URL(location.href);
    clean.searchParams.delete("purchase");
    clean.searchParams.delete("session_id");
    history.replaceState({}, "", clean);
  }
}

async function onGoogle() {
  setBusy(true);
  state.error = null;
  render();
  try {
    await loadFirebase();
    await firebaseApi.signInWithPopup(auth, provider);
  } catch (err) {
    const code = err && err.code ? String(err.code) : "";
    const message = err instanceof Error ? err.message : String(err || "");
    if (code === "auth/popup-closed-by-user" || code === "auth/cancelled-popup-request") {
      state.error = firebaseAuthError(err);
    } else if (/Failed to fetch|dynamically imported module|Importing a module script failed/i.test(message)) {
      state.error = t("accountFirebaseLoadFailed");
    } else {
      try {
        await loadFirebase();
        await firebaseApi.signInWithRedirect(auth, provider);
        return;
      } catch (redirectErr) {
        state.error = firebaseAuthError(redirectErr);
      }
    }
  } finally {
    setBusy(false);
    render();
  }
}

async function onEmail(event) {
  event.preventDefault();
  const node = els();
  const email = node.email.value.trim();
  const password = node.password.value;
  if (state.mode === "register" && password !== node.confirm.value) {
    state.error = t("accountPasswordMismatch");
    render();
    return;
  }
  setBusy(true);
  state.error = null;
  try {
    await loadFirebase();
    if (state.mode === "register") {
      await firebaseApi.createUserWithEmailAndPassword(auth, email, password);
    } else {
      await firebaseApi.signInWithEmailAndPassword(auth, email, password);
    }
  } catch (err) {
    state.error = firebaseAuthError(err);
  } finally {
    setBusy(false);
    render();
  }
}

async function onReset(event) {
  event.preventDefault();
  const email = els().resetEmail.value.trim();
  setBusy(true);
  state.error = null;
  try {
    await loadFirebase();
    await firebaseApi.sendPasswordResetEmail(auth, email, { url: checkoutReturnUrl() });
    state.notice = t("accountResetSent");
  } catch (err) {
    state.error = firebaseAuthError(err);
  } finally {
    setBusy(false);
    render();
  }
}

async function onUpgrade() {
  setBusy(true);
  state.error = null;
  try {
    const data = await cloud("createCheckout", {
      method: "POST",
      body: JSON.stringify({
        success_url: checkoutReturnUrl({ purchase: "success" }),
        cancel_url: checkoutReturnUrl({ purchase: "cancel" }),
      }),
    });
    if (!data.checkout_url) throw new Error("checkout_failed");
    location.assign(data.checkout_url);
  } catch (err) {
    state.error = firebaseAuthError(err);
    setBusy(false);
    render();
  }
}

async function onSignOut() {
  if (auth && firebaseApi) await firebaseApi.signOut(auth);
  localStorage.removeItem(SESSION_KEY);
  state.user = null;
  state.entitlements = null;
  state.notice = null;
  render();
}

function bind() {
  const node = els();
  if (!node.open) return;

  node.open.addEventListener("click", function () {
    openModal();
  });
  node.backdrop.addEventListener("click", function (event) {
    if (event.target === node.backdrop) closeModal();
  });
  node.backdrop.querySelectorAll("[data-account-close]").forEach(function (btn) {
    btn.addEventListener("click", closeModal);
  });
  node.google.addEventListener("click", function () {
    void onGoogle();
  });
  node.form.addEventListener("submit", function (event) {
    void onEmail(event);
  });
  node.resetForm.addEventListener("submit", function (event) {
    void onReset(event);
  });
  node.switchRegister.addEventListener("click", function () {
    state.mode = "register";
    state.error = null;
    render();
  });
  node.switchSignin.addEventListener("click", function () {
    state.mode = "signin";
    state.error = null;
    render();
  });
  node.forgot.addEventListener("click", function () {
    state.mode = "reset";
    state.error = null;
    render();
  });
  node.resetBack.addEventListener("click", function () {
    state.mode = "signin";
    state.error = null;
    render();
  });
  node.upgrade.addEventListener("click", function () {
    void onUpgrade();
  });
  document.getElementById("account-signout").addEventListener("click", function () {
    void onSignOut();
  });
  document.querySelectorAll("[data-account-open]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal();
    });
  });
  const pricingLogin = document.getElementById("pricing-login");
  if (pricingLogin) {
    pricingLogin.addEventListener("click", function () {
      void requireSignInThen("download");
    });
  }
  const pricingUpgrade = document.getElementById("pricing-upgrade");
  if (pricingUpgrade) {
    pricingUpgrade.addEventListener("click", function () {
      void requireSignInThen("upgrade");
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !node.backdrop.hidden) closeModal();
  });
  document.addEventListener("nf-lang", render);
}

consumeAuthRedirect();
bind();
if (isDesktopAuth()) {
  setPending(null);
  openModal();
}
render();
void (async function () {
  try {
    await loadFirebase();
    const cred = await firebaseApi.getRedirectResult(auth);
    if (cred && cred.user) {
      state.user = cred.user;
      await saveSessionFromUser(cred.user);
    }
    firebaseApi.onAuthStateChanged(auth, function (user) {
      state.user = user;
      if (user) {
        void saveSessionFromUser(user)
          .then(refreshEntitlements)
          .then(function () {
            if (isDesktopAuth()) return handOffDesktopAuthIfNeeded(user);
            if (pendingAction) runPendingAction();
          });
      } else {
        state.entitlements = null;
        render();
      }
    });
    await refreshEntitlements();
    await confirmPurchaseIfNeeded();
    if (isDesktopAuth()) {
      setPending(null);
      openModal();
      if (state.user) await handOffDesktopAuthIfNeeded(state.user);
    } else if (pendingAction && (await idToken())) {
      runPendingAction();
    }
    render();
  } catch (err) {
    console.error(err);
    state.error = t("accountFirebaseLoadFailed");
    render();
  }
})();
