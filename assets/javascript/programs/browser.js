(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());

  programs.set("ai-browser", {
    build(application, api) {
      return api.buildExternalBrowser(application);
    }
  });
})();
