(function () {
  if (!window.SwaggerUIBundle) return;

  var bundleOptions = {
    dom_id: "#swagger-ui",
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
    plugins: [SwaggerUIBundle.plugins.DownloadUrl],
    layout: "StandaloneLayout",
    defaultModelsExpandDepth: 1,
    defaultModelExpandDepth: 2,
    docExpansion: "list",
    tryItOutEnabled: true,
    persistAuthorization: false,
  };

  function currentLang() {
    return document.documentElement.lang === "ja" ? "ja" : "en";
  }

  function pickSpec() {
    if (currentLang() === "ja" && window.NF_OPENAPI_SPEC_JA) {
      return window.NF_OPENAPI_SPEC_JA;
    }
    return window.NF_OPENAPI_SPEC;
  }

  function loadErrorHtml() {
    var ja = currentLang() === "ja";
    return (
      '<div class="swagger-load-error"><p>' +
      (ja ? "API 仕様を読み込めませんでした。" : "Could not load the API spec.") +
      '</p><p class="quiet">' +
      (ja
        ? '<a href="openapi-ja.yaml">openapi-ja.yaml</a> · <a href="openapi.yaml">openapi.yaml</a> · <a href="openapi.json">openapi.json</a>'
        : '<a href="openapi.yaml">openapi.yaml</a> · <a href="openapi.json">openapi.json</a>') +
      "</p></div>"
    );
  }

  function showError() {
    var el = document.getElementById("swagger-ui");
    if (el) el.innerHTML = loadErrorHtml();
  }

  function mount(spec) {
    var root = document.getElementById("swagger-ui");
    if (!root) return;
    root.innerHTML = "";
    window.ui = SwaggerUIBundle(Object.assign({ spec: spec }, bundleOptions));
    if (window.NF_applySwaggerJa) {
      requestAnimationFrame(function () {
        window.NF_applySwaggerJa();
      });
    }
  }

  function init() {
    var spec = pickSpec();
    if (spec) {
      mount(spec);
      return;
    }

    showError(new Error("No inline spec found — include openapi-spec.js or openapi-spec-ja.js"));
  }

  var initScheduled = 0;

  function scheduleInit() {
    if (initScheduled) cancelAnimationFrame(initScheduled);
    initScheduled = requestAnimationFrame(function () {
      initScheduled = 0;
      init();
    });
  }

  document.addEventListener("nf-lang", scheduleInit);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleInit);
  } else {
    scheduleInit();
  }
})();
