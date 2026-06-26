(function () {
  var profile = document.querySelector(".academic-profile[data-about-i18n]");
  if (!profile) return;

  var intro = document.querySelector(".about-intro");
  var buttons = profile.querySelectorAll("[data-about-lang-button]");
  var introText = {
    en: "M.Eng. Student, Institute of Computing Technology, Chinese Academy of Sciences | Efficient LLM Inference, Agent Memory, and GPU Systems",
    zh: "中国科学院计算技术研究所硕士研究生 | 高效大模型推理、Agent Memory 与 GPU 系统"
  };

  function normalizeLanguage(lang) {
    return lang === "zh" ? "zh" : "en";
  }

  function setLanguage(lang) {
    var nextLang = normalizeLanguage(lang);
    document.documentElement.setAttribute("data-about-lang", nextLang);
    profile.setAttribute("data-current-lang", nextLang);

    buttons.forEach(function (button) {
      var isActive = button.getAttribute("data-about-lang-button") === nextLang;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive ? "true" : "false");
    });

    if (intro && introText[nextLang]) {
      intro.textContent = introText[nextLang];
    }

    try {
      window.localStorage.setItem("aboutLang", nextLang);
    } catch (error) {
      // Ignore private browsing or storage-disabled environments.
    }
  }

  function getInitialLanguage() {
    var query = new URLSearchParams(window.location.search);
    var queryLang = query.get("lang");
    if (queryLang) return normalizeLanguage(queryLang);

    try {
      var storedLang = window.localStorage.getItem("aboutLang");
      if (storedLang) return normalizeLanguage(storedLang);
    } catch (error) {
      // Ignore private browsing or storage-disabled environments.
    }

    return "en";
  }

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      setLanguage(button.getAttribute("data-about-lang-button"));
    });
  });

  setLanguage(getInitialLanguage());
})();
