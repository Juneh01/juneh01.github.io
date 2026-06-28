(function () {
  var ownerKey = "junhaoOwnerVisitExclusion";
  var counter = document.getElementById("busuanzi_container_site_pv");
  var ownerMessage = document.getElementById("owner-visit-mode");
  var divider = document.getElementById("footer-visit-divider");

  if (!counter) return;

  var query = new URLSearchParams(window.location.search);
  var ownerMode = query.get("owner_mode");

  try {
    if (ownerMode === "exclude") {
      window.localStorage.setItem(ownerKey, "true");
    } else if (ownerMode === "include") {
      window.localStorage.removeItem(ownerKey);
    }
  } catch (error) {
    // Storage can be unavailable in private browsing contexts.
  }

  if (ownerMode) {
    query.delete("owner_mode");
    var cleanQuery = query.toString();
    var cleanUrl =
      window.location.pathname +
      (cleanQuery ? "?" + cleanQuery : "") +
      window.location.hash;
    window.history.replaceState(null, "", cleanUrl);
  }

  var isLocal =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    window.location.hostname === "::1";
  var isOwner = false;

  try {
    isOwner = window.localStorage.getItem(ownerKey) === "true";
  } catch (error) {
    isOwner = false;
  }

  if (isLocal) return;

  if (isOwner) {
    if (divider) divider.style.display = "inline";
    if (ownerMessage) ownerMessage.style.display = "inline";
    return;
  }

  if (divider) divider.style.display = "inline";

  var script = document.createElement("script");
  script.async = true;
  script.src =
    "https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js";
  script.onerror = function () {
    if (divider) divider.style.display = "none";
    counter.style.display = "none";
  };
  document.body.appendChild(script);
})();
