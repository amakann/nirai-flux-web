/**
 * Swagger UI 5.x does not ship built-in Japanese yet.
 * Translate common UI strings when the site language is ja.
 */
(function () {
  var MAP = {
    "Try it out": "試してみる",
    Cancel: "キャンセル",
    Execute: "実行",
    Clear: "クリア",
    Reset: "リセット",
    Close: "閉じる",
    Authorize: "認証",
    Logout: "ログアウト",
    Schemas: "スキーマ",
    Models: "モデル",
    Parameters: "パラメータ",
    "No parameters": "パラメータなし",
    "Request body": "リクエストボディ",
    Responses: "レスポンス",
    "Response body": "レスポンスボディ",
    "Response headers": "レスポンスヘッダ",
    "Request URL": "リクエストURL",
    "Server response": "サーバレスポンス",
    "Request duration": "リクエスト時間",
    Links: "リンク",
    "No links": "リンクなし",
    Examples: "例",
    Description: "説明",
    "Media type": "メディアタイプ",
    "Example Value": "例の値",
    Schema: "スキーマ",
    "Copy": "コピー",
    "Download": "ダウンロード",
    "Expand all": "すべて展開",
    "Collapse all": "すべて折りたたむ",
    "Show/Hide": "表示/非表示",
    "Filter by tag": "タグで絞り込む",
    "Select a definition": "定義を選択",
    "Allowed values": "許可される値",
    Required: "必須",
    "Available authorizations": "利用可能な認証",
    "Authorized": "認証済み",
  };

  var PLACEHOLDER_MAP = {
    "Filter by tag": "タグで絞り込む",
  };

  var observer = null;

  function isJa() {
    return document.documentElement.lang === "ja";
  }

  function translateText(text) {
    var trimmed = text.trim();
    if (!trimmed) return text;
    if (Object.prototype.hasOwnProperty.call(MAP, trimmed)) {
      return text.replace(trimmed, MAP[trimmed]);
    }
    return text;
  }

  function walk(root) {
    if (!root) return;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var node;
    while ((node = walker.nextNode())) {
      var parent = node.parentElement;
      if (!parent || parent.closest("code, pre, .microlight, .highlight-code")) continue;
      var next = translateText(node.nodeValue);
      if (next !== node.nodeValue) node.nodeValue = next;
    }

    root.querySelectorAll("input[placeholder], textarea[placeholder]").forEach(function (el) {
      var ph = el.getAttribute("placeholder");
      if (ph && PLACEHOLDER_MAP[ph]) el.setAttribute("placeholder", PLACEHOLDER_MAP[ph]);
    });

    root.querySelectorAll("button[aria-label], [title]").forEach(function (el) {
      ["aria-label", "title"].forEach(function (attr) {
        var val = el.getAttribute(attr);
        if (val && MAP[val.trim()]) el.setAttribute(attr, MAP[val.trim()]);
      });
    });
  }

  function apply() {
    if (!isJa()) return;
    walk(document.getElementById("swagger-ui"));
  }

  window.NF_applySwaggerJa = function () {
    apply();
    var root = document.getElementById("swagger-ui");
    if (!root || !isJa()) {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      return;
    }
    if (observer) observer.disconnect();
    observer = new MutationObserver(function () {
      apply();
    });
    observer.observe(root, { childList: true, subtree: true, characterData: true });
  };

  document.addEventListener("nf-lang", function () {
    window.NF_applySwaggerJa();
  });
})();
