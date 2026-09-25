(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());

  programs.set("lilia", {
    build(application, api) {
      return api.buildExternalBrowser(application);
    }
  });
})();
