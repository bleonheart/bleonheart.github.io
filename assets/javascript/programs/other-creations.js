(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());
  const creations = Array.isArray(window.PORTFOLIO_OTHER_CREATIONS) ? window.PORTFOLIO_OTHER_CREATIONS : [];

  const node = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  function build() {
    const app = node("div", "feature-app other-creations-app");
    const header = node("header", "feature-app__header");
    const copy = node("div");
    copy.append(
      node("span", "feature-eyebrow", "VIDEO ARCHIVE"),
      node("h1", "", "Other Creations"),
      node("p", "", "Additional creations and demonstrations outside the main module library.")
    );
    header.append(copy);

    const body = node("div", "feature-app__body other-creations-app__body");
    const list = node("div", "other-creations-list");
    if (!creations.length) {
      list.append(node("div", "feature-empty", "No other creations have been added yet."));
    } else {
      for (const creation of creations) {
        const item = node("article", "other-creation-item");
        const details = node("div", "other-creation-item__details");
        details.append(node("h2", "", creation.title || "Untitled Creation"));
        details.append(node("p", "", creation.description || "No description available."));
        const filename = node("span", "other-creation-item__filename", creation.video || "No video attached");
        details.append(filename);

        const media = node("div", "other-creation-item__media");
        if (creation.video) {
          const video = document.createElement("video");
          video.controls = true;
          video.preload = "metadata";
          video.src = creation.video;
          media.append(video);
        } else {
          media.append(node("span", "other-creation-item__no-video", "No video available"));
        }
        item.append(details, media);
        list.append(item);
      }
    }
    body.append(list);
    app.append(header, body);
    return app;
  }

  programs.set("other-creations", { build });
})();
