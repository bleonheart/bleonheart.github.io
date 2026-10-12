(() => {
  "use strict";

  if (window.__visitorAssistantInitialized) return;
  window.__visitorAssistantInitialized = true;

  const definitions = {
    systems: {
      terms: ["linux", "rhel", "red hat", "ubuntu", "debian", "windows server", "server administration", "systemd", "ssh", "proxmox", "network", "infrastructure", "hosting", "dns", "firewall", "troubleshooting", "fortigate", "wireshark", "virtualization"],
      en: "I work with Linux and Windows infrastructure, production servers, troubleshooting, networking and system reliability.",
      pt: "Trabalho com infraestrutura Linux e Windows, servidores de produção, diagnóstico, redes e fiabilidade de sistemas."
    },
    devops: {
      terms: ["devops", "docker", "kubernetes", "ci/cd", "github actions", "gitlab ci", "jenkins", "terraform", "ansible", "automation", "deployment", "cloud", "bash", "prometheus", "grafana", "nginx", "git", "pipeline", "containers"],
      en: "I build and maintain deployment workflows, automation and containerized infrastructure, with a focus on reliable production operations.",
      pt: "Desenvolvo e mantenho fluxos de deployment, automação e infraestrutura em contentores, com foco em operações fiáveis."
    },
    gameDev: {
      terms: ["garry's mod", "gmod", "glua", "lua", "source engine", "lilia", "helix", "game server", "game systems", "steamcmd", "srcds", "derma", "roleplay", "addon", "framework"],
      en: "I develop Garry's Mod systems, GLua addons, frameworks and multiplayer server features, including long-term framework maintenance.",
      pt: "Desenvolvo sistemas Garry's Mod, addons GLua, frameworks e funcionalidades para servidores multijogador."
    },
    gameManagement: {
      terms: ["game server", "server hosting", "gmod", "garry's mod", "lilia", "helix", "steamcmd", "srcds", "linux", "server administration", "hosting", "database", "mysql", "monitor", "maintenance", "deployment"],
      en: "I support independent game communities with server administration, updates, troubleshooting and ongoing technical maintenance.",
      pt: "Apoio comunidades independentes de jogos com administração de servidores, atualizações, diagnóstico e manutenção técnica contínua."
    },
    freelanceInfrastructure: {
      terms: ["linux", "windows server", "server", "ssh", "docker", "proxmox", "hosting", "network", "database", "mysql", "nginx", "deployment", "troubleshooting", "automation", "infrastructure"],
      en: "I provide Linux and infrastructure support for deployments, hosting, troubleshooting and ongoing maintenance.",
      pt: "Presto apoio em Linux e infraestrutura para deployments, alojamento, diagnóstico e manutenção contínua."
    }
  };

  const translations = {
    en: {
      title: "Visitor Assistant", subtitle: "Portfolio guide", opening: "What brings you to my portfolio?",
      recruiter: "I'm recruiting", freelance: "I need freelance work", exploring: "I'm exploring",
      recruiterQuestion: "What kind of professional are you looking for?", freelanceQuestion: "What kind of project do you need help with?",
      systems: "Systems & Infrastructure", devops: "DevOps & Cloud", gameDev: "Game Server Development",
      gameManagement: "Game Server Management", freelanceInfrastructure: "Linux & Infrastructure", unsure: "Something Else / Not Sure", other: "Something Else",
      intro: "How I can help", skills: "Matching technical skills", projects: "Matching projects", noSkills: "Skill ratings are temporarily unavailable.",
      noProjects: "No matching projects have been documented for this category yet.",
      browse: "What would you like to explore?", tour: "Take a Guided Tour", cv: "View CV", allSkills: "Technical Skills", allProjects: "View Projects",
      email: "Email", linkedin: "LinkedIn", contact: "Get in touch", back: "Back", restart: "Restart", minimize: "Minimize", close: "Close", reopen: "Open Visitor Assistant",
      next: "Next", exit: "Exit Tour", experience: "Experience", tourExperience: "Experience", tourSkills: "Technical Skills", tourProjects: "Projects",
      tourExperienceText: "Explore my professional CV, including Linux administration, DevOps, client operations and independent technical work.",
      tourSkillsText: "Browse all published skill ratings, including Linux, automation, systems administration, databases and development tools.",
      tourProjectsText: "Explore documented work and filter projects by technology, topic and lifecycle.",
      showSkills: "Open all skills", showProjects: "Open all projects", all: "Showing all documented matches", loading: "Loading technical skills…"
    },
    pt: {
      title: "Visitor Assistant", subtitle: "Guia do portefólio", opening: "O que o traz ao meu portefólio?",
      recruiter: "Estou a recrutar", freelance: "Preciso de trabalho freelance", exploring: "Estou a explorar",
      recruiterQuestion: "Que tipo de profissional procura?", freelanceQuestion: "Que tipo de projeto precisa de ajuda?",
      systems: "Sistemas e Infraestrutura", devops: "DevOps e Cloud", gameDev: "Desenvolvimento de servidores de jogo",
      gameManagement: "Gestão de servidores de jogo", freelanceInfrastructure: "Linux e Infraestrutura", unsure: "Outra área / Não sei", other: "Outro tipo de projeto",
      intro: "Como posso ajudar", skills: "Competências relevantes", projects: "Projetos relevantes", noSkills: "As avaliações técnicas estão temporariamente indisponíveis.",
      noProjects: "Ainda não existem projetos documentados para esta categoria.",
      browse: "O que gostaria de explorar?", tour: "Visita guiada", cv: "Ver CV", allSkills: "Competências técnicas", allProjects: "Ver projetos",
      email: "Email", linkedin: "LinkedIn", contact: "Entrar em contacto", back: "Voltar", restart: "Reiniciar", minimize: "Minimizar", close: "Fechar", reopen: "Abrir Visitor Assistant",
      next: "Seguinte", exit: "Sair da visita", experience: "Experiência", tourExperience: "Experiência", tourSkills: "Competências técnicas", tourProjects: "Projetos",
      tourExperienceText: "Explore o meu CV, incluindo administração Linux, DevOps, operações e trabalho técnico independente.",
      tourSkillsText: "Consulte os níveis publicados de competências Linux, automação, administração de sistemas, bases de dados e desenvolvimento.",
      tourProjectsText: "Explore projetos documentados e filtre por tecnologia, tema e estado.",
      showSkills: "Abrir competências", showProjects: "Abrir projetos", all: "A apresentar todas as correspondências documentadas", loading: "A carregar competências…"
    }
  };

  const make = (tag, className, value) => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (value !== undefined) element.textContent = value;
    return element;
  };

  const normalized = (value) => String(value ?? "").toLocaleLowerCase("en");
  const includesTerm = (text, term) => {
    const haystack = normalized(text);
    const needle = normalized(term);
    if (!needle) return false;
    if (needle.length < 4) return new RegExp(`(^|[^a-z0-9])${needle.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}([^a-z0-9]|$)`, "i").test(haystack);
    return haystack.includes(needle);
  };

  const findProjects = (terms) => {
    const projects = Array.isArray(window.PORTFOLIO_DATA?.projects) ? window.PORTFOLIO_DATA.projects : [];
    return projects.map((project) => {
      const title = `${project.name || ""} ${project.category || ""}`;
      const technologies = [...(Array.isArray(project.technologies) ? project.technologies : []), ...(Array.isArray(project.tags) ? project.tags : [])].join(" ");
      const details = `${project.summary || ""} ${(project.work || []).join(" ")}`;
      const score = terms.reduce((total, term) => total + (includesTerm(title, term) ? 6 : 0) + (includesTerm(technologies, term) ? 5 : 0) + (includesTerm(details, term) ? 1 : 0), 0);
      return { project, score };
    }).filter((item) => item.score > 0).sort((first, second) => second.score - first.score || String(first.project.name).localeCompare(String(second.project.name)));
  };

  const findSkills = (ratings, terms) => Object.entries(ratings || {}).filter(([name, rating]) =>
    Number.isFinite(Number(rating)) && Number(rating) > 0 && terms.some((term) => includesTerm(name, term))
  ).sort((first, second) => Number(second[1]) - Number(first[1]) || first[0].localeCompare(second[0]));

  const start = () => {
    if (!document.querySelector("[data-desktop-shell]")) return;
    if (document.querySelector("[data-visitor-assistant]")) return;

    const language = () => document.documentElement.lang.toLowerCase().startsWith("pt") ? "pt" : "en";
    const t = (key) => translations[language()][key] || translations.en[key] || key;
    const history = [];
    let scene = { type: "opening" };
    let tourIndex = 0;
    let ratings = null;
    let ratingsFailed = false;
    let skillRequest = null;

    const panel = make("aside", "visitor-assistant");
    panel.hidden = true;
    panel.dataset.visitorAssistant = "";
    panel.setAttribute("aria-label", "Visitor Assistant");
    const header = make("div", "visitor-assistant__header");
    const brand = make("div", "visitor-assistant__brand");
    const mark = make("span", "visitor-assistant__mark", "✦");
    mark.setAttribute("aria-hidden", "true");
    const heading = make("div", "visitor-assistant__heading");
    const name = make("strong", "", t("title"));
    const caption = make("small", "", t("subtitle"));
    heading.append(name, caption);
    brand.append(mark, heading);
    const controls = make("div", "visitor-assistant__controls");
    const control = (symbol, key, action) => {
      const button = make("button", "visitor-assistant__icon-button", symbol);
      button.type = "button";
      button.title = t(key);
      button.setAttribute("aria-label", t(key));
      button.addEventListener("click", action);
      controls.append(button);
      return button;
    };
    const restart = control("↻", "restart", () => { history.length = 0; scene = { type: "opening" }; render(); });
    const minimize = control("−", "minimize", () => setExpanded(false));
    const close = control("×", "close", () => setExpanded(false));
    header.append(brand, controls);
    const body = make("div", "visitor-assistant__body");
    body.setAttribute("aria-live", "polite");
    const footer = make("div", "visitor-assistant__footer");
    const back = make("button", "visitor-assistant__back", "← " + t("back"));
    back.type = "button";
    back.addEventListener("click", () => {
      if (!history.length) return;
      scene = history.pop();
      if (scene.type === "tour") openTab(["about", "proficiency", "projects"][scene.index]);
      render();
    });
    const progress = make("span", "visitor-assistant__progress");
    footer.append(back, progress);
    panel.append(header, body, footer);
    const launcher = make("button", "visitor-assistant__launcher", "✦ " + t("title"));
    launcher.type = "button";
    launcher.setAttribute("aria-label", t("reopen"));
    launcher.hidden = true;
    launcher.addEventListener("click", () => {
      window.PortfolioDesktop?.minimizeAllApplications?.();
      setExpanded(true);
    });
    document.body.append(panel, launcher);

    const setExpanded = (expanded) => {
      panel.hidden = !expanded;
      launcher.hidden = expanded;
      if (expanded) body.scrollTop = 0;
    };
    const advance = (next) => {
      history.push({ ...scene });
      scene = next;
      render();
    };
    const openTab = (tab) => {
      if (!window.PortfolioDesktop?.openApplication?.("about-me")) return;
      const path = { about: "/cv/", proficiency: "/skills/", projects: "/projects/" }[tab];
      if (path && location.pathname.replace(/\/index\.html$/i, "").replace(/\/?$/, "/") !== path) {
        window.history.pushState({ portfolioTab: tab }, "", path);
      }
      window.dispatchEvent(new CustomEvent("portfolio:about-tab", { detail: { target: tab } }));
    };
    const openProject = (project) => {
      if (!project?.id) return;
      window.PortfolioActions?.execute?.({ type: "open-project", target: project.id });
      const path = "/projects/";
      if (location.pathname.replace(/\/?$/, "/") !== path) historyPush(path);
    };
    const historyPush = (path) => window.history.pushState({ portfolioTab: "projects" }, "", path);

    const text = (value, className = "") => body.append(make("p", className || "visitor-assistant__text", value));
    const title = (value) => body.append(make("h3", "visitor-assistant__section-title", value));
    const button = (label, action, className = "") => {
      const element = make("button", `visitor-assistant__choice ${className}`, label);
      element.type = "button";
      element.addEventListener("click", action);
      body.append(element);
      return element;
    };
    const navigation = () => {
      const actions = make("div", "visitor-assistant__links");
      for (const [label, tab] of [[t("cv"), "about"], [t("allSkills"), "proficiency"], [t("allProjects"), "projects"]]) {
        const item = make("button", "visitor-assistant__link", label);
        item.type = "button";
        item.addEventListener("click", () => openTab(tab));
        actions.append(item);
      }
      body.append(actions);
    };
    const contacts = () => {
      title(t("contact"));
      const links = make("div", "visitor-assistant__links");
      const email = make("a", "visitor-assistant__link visitor-assistant__link--gold", t("email"));
      email.href = "mailto:baratoxis@gmail.com";
      const linkedin = make("a", "visitor-assistant__link", t("linkedin"));
      linkedin.href = "https://linkedin.com/in/davidmpbarata";
      linkedin.target = "_blank";
      linkedin.rel = "noopener noreferrer";
      const cv = make("button", "visitor-assistant__link", t("cv"));
      cv.type = "button";
      cv.addEventListener("click", () => openTab("about"));
      links.append(email, linkedin, cv);
      body.append(links);
    };
    const renderResults = () => {
      const category = definitions[scene.key];
      if (!category) return;
      title(t("intro"));
      text(category[language()]);
      const terms = category.terms;
      const matchingSkills = findSkills(ratings, terms);
      title(`${t("skills")} (${matchingSkills.length})`);
      if (!ratings) text(ratingsFailed ? t("noSkills") : t("loading"), "visitor-assistant__hint");
      if (matchingSkills.length) {
        const list = make("div", "visitor-assistant__skill-list");
        for (const [skill, rating] of matchingSkills) {
          const item = make("button", "visitor-assistant__skill");
          item.type = "button";
          item.append(make("span", "", skill), make("strong", "", `${rating}/5`));
          item.addEventListener("click", () => openTab("proficiency"));
          list.append(item);
        }
        body.append(list);
      }
      button(t("showSkills") + " ↗", () => openTab("proficiency"), "visitor-assistant__choice--secondary");
      const matches = findProjects(terms);
      title(`${t("projects")} (${matches.length})`);
      if (!matches.length) text(t("noProjects"), "visitor-assistant__hint");
      const list = make("div", "visitor-assistant__project-list");
      const fragment = document.createDocumentFragment();
      for (const { project } of matches) {
        const item = make("button", "visitor-assistant__project");
        item.type = "button";
        item.append(make("strong", "", project.name || project.id), make("small", "", (project.technologies || []).slice(0, 4).join(" · ") || project.category || ""));
        item.addEventListener("click", () => openProject(project));
        fragment.append(item);
      }
      list.append(fragment);
      body.append(list);
      button(t("showProjects") + " ↗", () => openTab("projects"), "visitor-assistant__choice--secondary");
      contacts();
    };
    const renderTour = () => {
      const tabs = ["about", "proficiency", "projects"];
      const keys = ["tourExperience", "tourSkills", "tourProjects"];
      const descriptions = ["tourExperienceText", "tourSkillsText", "tourProjectsText"];
      title(`${scene.index + 1}/3 — ${t(keys[scene.index])}`);
      text(t(descriptions[scene.index]));
      button(scene.index < 2 ? t("next") + " →" : t("exit"), () => {
        if (scene.index === 2) return advance({ type: "browse" });
        history.push({ ...scene });
        scene = { type: "tour", index: scene.index + 1 };
        openTab(tabs[scene.index]);
        render();
      });
      button(t("exit"), () => advance({ type: "browse" }), "visitor-assistant__choice--secondary");
    };
    const tour = () => {
      tourIndex = 0;
      advance({ type: "tour", index: tourIndex });
      openTab("about");
    };
    const render = () => {
      body.replaceChildren();
      name.textContent = t("title");
      caption.textContent = t("subtitle");
      for (const [element, key] of [[restart, "restart"], [minimize, "minimize"], [close, "close"]]) {
        element.title = t(key);
        element.setAttribute("aria-label", t(key));
      }
      launcher.textContent = "✦ " + t("title");
      launcher.setAttribute("aria-label", t("reopen"));
      back.textContent = "← " + t("back");
      back.hidden = history.length === 0;
      progress.textContent = scene.type === "tour" ? `${scene.index + 1} / 3` : "";
      if (scene.type === "opening") {
        text(t("opening"), "visitor-assistant__question");
        button(t("recruiter"), () => advance({ type: "recruiter" }));
        button(t("freelance"), () => advance({ type: "freelance" }));
        button(t("exploring"), () => advance({ type: "browse" }));
      } else if (scene.type === "recruiter") {
        text(t("recruiterQuestion"), "visitor-assistant__question");
        for (const key of ["systems", "devops", "gameDev"]) button(t(key), () => advance({ type: "results", key }));
        button(t("unsure"), () => advance({ type: "browse" }));
      } else if (scene.type === "freelance") {
        text(t("freelanceQuestion"), "visitor-assistant__question");
        for (const key of ["gameDev", "gameManagement", "freelanceInfrastructure"]) button(t(key), () => advance({ type: "results", key }));
        button(t("other"), () => advance({ type: "browse" }));
      } else if (scene.type === "browse") {
        text(t("browse"), "visitor-assistant__question");
        button(t("tour"), tour);
        button(t("cv"), () => openTab("about"));
        button(t("allSkills"), () => openTab("proficiency"));
        button(t("allProjects"), () => openTab("projects"));
        contacts();
      } else if (scene.type === "results") {
        renderResults();
      } else if (scene.type === "tour") {
        renderTour();
      }
      body.scrollTop = 0;
    };

    const loadSkills = () => {
      if (skillRequest) return skillRequest;
      skillRequest = fetch("/.jsons/technology-proficiency.json", { cache: "no-store" })
        .then((response) => { if (!response.ok) throw new Error("Skill ratings unavailable"); return response.json(); })
        .then((payload) => { if (!payload?.ratings || typeof payload.ratings !== "object") throw new Error("Invalid skill data"); ratings = payload.ratings; })
        .catch(() => { ratingsFailed = true; })
        .finally(() => { if (scene.type === "results") render(); });
      return skillRequest;
    };
    window.addEventListener("portfolio:language-changed", render);
    loadSkills();
    render();

    let openedOnStartup = false;
    const openOnStartup = () => {
      if (openedOnStartup) return;
      openedOnStartup = true;
      window.PortfolioDesktop?.minimizeAllApplications?.();
      setExpanded(true);
    };
    window.addEventListener("portfolio:desktop-ready", openOnStartup, { once: true });
    if (document.querySelector("[data-desktop-shell]")?.dataset.startupComplete === "true") openOnStartup();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
})();
