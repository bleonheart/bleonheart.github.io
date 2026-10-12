(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());

  programs.set("creations", {
    build(application, api) {
      return api.buildInternalFrame(application);
    }
  });
})();
