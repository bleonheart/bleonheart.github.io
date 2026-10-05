(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());

  const content = {
    en: {
      eyebrow: "ABOUT ME",
      name: "David Barata",
      profileTitle: "PROFILE",
      role: "Linux Systems Administrator | DevOps",
      location: "Matosinhos, Porto, Portugal",
      availability: "Open to opportunities",
      summaryTitle: "Professional Summary",
      summary: "Linux Systems Administration, DevOps and IT Operations professional experienced in production systems, automation, containers, cloud, CI/CD, IaC, databases and technical support. Focused on troubleshooting, reliability, automation and continuous improvement.",
      targetRolesTitle: "Roles I'm Looking For",
      targetRoles: ["Linux Systems Administrator", "DevOps Engineer", "IT Operations Engineer", "IT Support Technician"],
      targetRolesNote: "These are examples, not limits. If my broader skill set fits another role, even if it is not listed here, feel free to get in touch.",
      skillsTitle: "Technical Skills",
      skills: [
        ["Linux & Systems", "Linux (Ubuntu, Debian, Rocky Linux, CentOS Stream) | Windows Server | Windows 10/11 | SSH | SFTP | systemd | cron"],
        ["DevOps, CI/CD & IaC", "Docker | Docker Compose | Kubernetes | Git | GitHub Actions | GitLab CI/CD | Jenkins | Terraform | Ansible | Bash/Shell | PowerShell"],
        ["Cloud & Infrastructure", "AWS | Microsoft Azure | Google Cloud Platform | Proxmox | Cloudflare | Cloudflare Workers"],
        ["Data & SQL", "SQL | MySQL | MariaDB | Excel | Power BI"],
        ["Networking & Security", "FortiGate | Wireshark | iptables | nftables | VLANs | NAT | Port Forwarding | Subnetting | CIDR | Routing | Load Balancing | Reverse Proxies"],
        ["Operations & Support", "Production Support | Troubleshooting | Ticket Resolution | Incident Resolution | Systems Administration | Technical Support | QA/Testing | Technical Documentation | Requirements Management | Process Improvement"],
        ["Programming & Scripting", "Python | Lua | HTML | CSS"],
        ["Corporate Tools", "Jira | Trello | Microsoft 365 | Google Workspace | Slack"]
      ],
      experienceTitle: "Professional Experience",
      experience: [
        {
          title: "Business Customer Consultant",
          company: "Concentrix",
          period: "January 2025 - October 2025 | Porto, Portugal",
          bullets: [
            "Management and resolution of business customer requests, tickets and escalations according to defined procedures and service levels.",
            "Prioritisation and simultaneous follow-up of multiple processes while maintaining quality, productivity and deadlines.",
            "Accurate registration and updating of customers, requests and cases in internal systems, ensuring complete and traceable information.",
            "Collaboration with different teams to resolve problems and identify improvements in procedures and workflows."
          ]
        },
        {
          title: "Systems Administrator & Online Infrastructure Manager",
          company: "Freelance",
          period: "January 2024 - May 2025 | Parallel freelance project",
          bullets: [
            "Technical services for three large North American communities integrated into infrastructures with multiple games and servers.",
            "Administration and maintenance of servers and databases, focused on availability, stability and technical problem resolution.",
            "Diagnosis, correction and optimization of production code, focused on performance, stability and maintainability.",
            "Management of updates, features and production changes, including recurring issue follow-up and priority definition with project owners."
          ]
        },
        {
          title: "Web Administrator & Digital Operations Analyst",
          company: "Freelance",
          period: "January 2024 - December 2024 | Parallel freelance project",
          bullets: [
            "Technical administration and maintenance of websites and digital platforms, ensuring operation, updates and availability.",
            "Analysis of traffic, user behaviour and digital metrics, with implementation of SEO improvements.",
            "Data management and processing, requirements gathering, implementation, testing and maintenance of digital experiences."
          ]
        },
        {
          title: "Operations Administrative Assistant",
          company: "Accenture Portugal",
          period: "November 2022 - October 2024 | Lisbon, Portugal",
          bullets: [
            "Reception, processing and validation of data in multiple formats, ensuring compliance with guidelines, priorities and quality standards.",
            "Management of tasks and data according to priorities, deadlines and operational requirements, focused on accuracy, security and information integrity.",
            "Quality control, identification of inconsistencies and reporting of relevant situations to support problem resolution.",
            "Experimentation and validation of client tools, including test planning, result analysis and report preparation.",
            "Collaboration on process improvement and with different stakeholders to clarify requirements and align priorities."
          ]
        },
        {
          title: "Linux Systems Administrator & Software Developer",
          company: "Freelance",
          period: "August 2018 - Present",
          bullets: [
            "Administration, troubleshooting and optimization of production systems and services, focused on availability, performance, stability, security and maintenance.",
            "Creation and management of containerized environments with Docker and Kubernetes for applications and services.",
            "Development and maintenance of backend applications integrated with MySQL and MariaDB, including data structure, queries, processing and persistence.",
            "Development of systems, automations and scripts in Python, Lua and web technologies for international clients and large-scale projects.",
            "Version management, updates, functional testing, technical documentation and deployment of solutions to production.",
            "Simultaneous management of projects and clients, balancing requirements, priorities, deadlines, technical support and continuous evolution of solutions."
          ]
        }
      ],
      educationTitle: "Education",
      education: "Bachelor's Degree in Anthropology | NOVA FCSH",
      educationPeriod: "September 2019 - June 2022",
      languagesTitle: "Languages",
      localizationTitle: "Languages",
      languages: [["Portuguese", "C2"], ["English", "C2"], ["Spanish", "B2"]],
      tabs: { about: "About Me", projects: "Projects" },
      actions: { email: "Email", emailCopied: "Email copied to clipboard.", emailCopiedShort: "Copied ✓", emailCopyFailed: "Could not copy the email address.", linkedin: "LinkedIn ↗", discord: "Discord ↗", steam: "Steam ↗", pivity: "Pivity ↗", projects: "View Projects" }
    },
    pt: {
      eyebrow: "SOBRE MIM",
      name: "David Barata",
      profileTitle: "PERFIL",
      role: "Administrador de Sistemas Linux | DevOps",
      location: "Matosinhos, Porto, Portugal",
      availability: "Disponível para oportunidades",
      summaryTitle: "Resumo Profissional",
      summary: "Profissional de Administração de Sistemas Linux, DevOps e Operações de TI com experiência em sistemas de produção, automação, contentores, cloud, CI/CD, IaC, bases de dados e suporte técnico. Focado em troubleshooting, fiabilidade, automação e melhoria contínua.",
      targetRolesTitle: "Funções que Procuro",
      targetRoles: ["Linux Systems Administrator", "DevOps Engineer", "IT Operations Engineer", "IT Support Technician"],
      targetRolesNote: "Estes são exemplos, não limites. Se o meu conjunto de competências se adequar a outra função, mesmo que não esteja listada aqui, sinta-se à vontade para me contactar.",
      skillsTitle: "Competências Técnicas",
      skills: [
        ["Linux e Sistemas", "Linux (Ubuntu, Debian, Rocky Linux, CentOS Stream) | Windows Server | Windows 10/11 | SSH | SFTP | systemd | cron"],
        ["DevOps, CI/CD e IaC", "Docker | Docker Compose | Kubernetes | Git | GitHub Actions | GitLab CI/CD | Jenkins | Terraform | Ansible | Bash/Shell | PowerShell"],
        ["Cloud e Infraestrutura", "AWS | Microsoft Azure | Google Cloud Platform | Proxmox | Cloudflare | Cloudflare Workers"],
        ["Dados e SQL", "SQL | MySQL | MariaDB | Excel | Power BI"],
        ["Redes e Segurança", "FortiGate | Wireshark | iptables | nftables | VLANs | NAT | Port Forwarding | Subnetting | CIDR | Routing | Load Balancing | Reverse Proxies"],
        ["Operações e Suporte", "Production Support | Troubleshooting | Ticket Resolution | Incident Resolution | Administração de Sistemas | Suporte Técnico | QA/Testes | Documentação Técnica | Gestão de Requisitos | Melhoria de Processos"],
        ["Programação e Scripting", "Python | Lua | HTML | CSS"],
        ["Ferramentas Corporativas", "Jira | Trello | Microsoft 365 | Google Workspace | Slack"]
      ],
      experienceTitle: "Experiência Profissional",
      experience: [
        {
          title: "Consultor de Clientes Empresariais",
          company: "Concentrix",
          period: "Janeiro de 2025 - Outubro de 2025 | Porto, Portugal",
          bullets: [
            "Gestão e resolução de pedidos, tickets e escalamentos de clientes empresariais, de acordo com procedimentos e níveis de serviço definidos.",
            "Priorização e acompanhamento simultâneo de múltiplos processos, mantendo qualidade, produtividade e cumprimento de prazos.",
            "Registo e atualização rigorosa de clientes, pedidos e ocorrências em sistemas internos, assegurando informação completa e rastreável.",
            "Colaboração com diferentes equipas na resolução de problemas e identificação de melhorias em procedimentos e fluxos de trabalho."
          ]
        },
        {
          title: "Administrador de Sistemas e Gestor de Infraestrutura Online",
          company: "Freelance",
          period: "Janeiro de 2024 - Maio de 2025 | Projeto freelance em paralelo",
          bullets: [
            "Prestação de serviços técnicos a três comunidades norte-americanas de grande dimensão, integradas em infraestruturas com múltiplos jogos e servidores.",
            "Administração e manutenção de servidores e bases de dados, com foco em disponibilidade, estabilidade e resolução de problemas técnicos.",
            "Diagnóstico, correção e otimização de código em produção, com foco em desempenho, estabilidade e manutenção dos sistemas.",
            "Gestão de atualizações, funcionalidades e alterações em produção, incluindo acompanhamento de problemas recorrentes e definição de prioridades com os responsáveis pelos projetos."
          ]
        },
        {
          title: "Administrador Web e Analista de Operações Digitais",
          company: "Freelance",
          period: "Janeiro de 2024 - Dezembro de 2024 | Projeto freelance em paralelo",
          bullets: [
            "Administração e manutenção técnica de websites e plataformas digitais, assegurando funcionamento, atualização e disponibilidade.",
            "Análise de tráfego, comportamento dos utilizadores e métricas digitais, com implementação de melhorias de SEO.",
            "Gestão e tratamento de dados, levantamento de requisitos, implementação, testes e manutenção de experiências digitais."
          ]
        },
        {
          title: "Assistente Administrativo de Operações",
          company: "Accenture Portugal",
          period: "Novembro de 2022 - Outubro de 2024 | Lisboa, Portugal",
          bullets: [
            "Receção, processamento e validação de dados em múltiplos formatos, assegurando cumprimento de diretrizes, prioridades e padrões de qualidade.",
            "Gestão de tarefas e dados segundo prioridades, prazos e requisitos operacionais, com foco em precisão, segurança e integridade da informação.",
            "Controlo de qualidade, identificação de inconsistências e reporte de situações relevantes para suporte à resolução de problemas.",
            "Experimentação e validação de ferramentas do cliente, incluindo planeamento de testes, análise de resultados e elaboração de relatórios.",
            "Colaboração na melhoria de processos e com diferentes intervenientes para clarificação de requisitos e alinhamento de prioridades."
          ]
        },
        {
          title: "Administrador de Sistemas Linux e Programador de Software",
          company: "Freelance",
          period: "Agosto de 2018 - Presente",
          bullets: [
            "Administração, troubleshooting e otimização de sistemas e serviços em produção, com foco em disponibilidade, desempenho, estabilidade, segurança e manutenção.",
            "Criação e gestão de ambientes containerizados com Docker e Kubernetes para aplicações e serviços.",
            "Desenvolvimento e manutenção de aplicações backend integradas com MySQL e MariaDB, incluindo estruturação, consultas, tratamento e persistência de dados.",
            "Desenvolvimento de sistemas, automações e scripts em Python, Lua e tecnologias web para clientes internacionais e projetos de grande dimensão.",
            "Gestão de versões, atualizações, testes funcionais, documentação técnica e implementação de soluções em produção.",
            "Gestão simultânea de projetos e clientes, conciliando requisitos, prioridades, prazos, suporte técnico e evolução contínua das soluções."
          ]
        }
      ],
      educationTitle: "Formação Académica",
      education: "Licenciatura em Antropologia | NOVA FCSH",
      educationPeriod: "Setembro de 2019 - Junho de 2022",
      languagesTitle: "Idiomas",
      localizationTitle: "Idiomas",
      languages: [["Português", "C2"], ["Inglês", "C2"], ["Espanhol", "B2"]],
      tabs: { about: "Sobre Mim", projects: "Projetos" },
      actions: { email: "Email", emailCopied: "Email copiado para a área de transferência.", emailCopiedShort: "Copiado ✓", emailCopyFailed: "Não foi possível copiar o endereço de email.", linkedin: "LinkedIn ↗", discord: "Discord ↗", steam: "Steam ↗", pivity: "Pivity ↗", projects: "Ver Projetos" }
    }
  };

  const create = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  const actionIcons = {
    email: "https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_48dp.png",
    linkedin: "https://www.google.com/s2/favicons?domain=linkedin.com&sz=128",
    discord: "https://www.google.com/s2/favicons?domain=discord.com&sz=128",
    steam: "https://www.google.com/s2/favicons?domain=steampowered.com&sz=128",
    pivity: "https://www.google.com/s2/favicons?domain=pivity.com&sz=128"
  };

  const createActionIcon = (name) => {
    const image = create("img", `full-cv__action-icon full-cv__action-icon--${name}`);
    image.src = actionIcons[name];
    image.alt = "";
    image.setAttribute("aria-hidden", "true");
    image.referrerPolicy = "no-referrer";
    return image;
  };

  const action = (name, label, value, primary = false) => {
    const button = create("button", `feature-button full-cv__icon-button${primary ? " feature-button--primary" : ""}`);
    button.type = "button";
    button.title = label;
    button.setAttribute("aria-label", label);
    button.append(createActionIcon(name));
    button.addEventListener("click", () => window.PortfolioActions?.execute?.(value));
    return button;
  };

  const link = (label, href, className = "feature-button") => {
    const anchor = create("a", className, label);
    anchor.href = href;
    if (!href.startsWith("mailto:")) {
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
    }
    return anchor;
  };

  const emailAddress = "baratoxis@gmail.com";

  const copyToClipboard = async (value) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        return true;
      }
    } catch {}

    const textarea = create("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    textarea.style.pointerEvents = "none";
    document.body.append(textarea);
    textarea.select();
    textarea.setSelectionRange(0, value.length);

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {}
    textarea.remove();
    return copied;
  };

  const emailButton = (copy) => {
    const button = create("button", "feature-button feature-button--primary full-cv__icon-button full-cv__icon-button--email");
    button.type = "button";
    button.title = copy.actions.email;
    button.setAttribute("aria-label", copy.actions.email);
    button.append(createActionIcon("email"));
    button.addEventListener("click", async () => {
      const copied = await copyToClipboard(emailAddress);
      const message = copied ? copy.actions.emailCopied : copy.actions.emailCopyFailed;
      window.dispatchEvent(new CustomEvent("portfolio:notice", { detail: { message } }));
      if (!copied) return;

      clearTimeout(button.emailResetTimer);
      button.classList.add("is-copied");
      button.title = copy.actions.emailCopied;
      button.setAttribute("aria-label", copy.actions.emailCopied);
      button.emailResetTimer = setTimeout(() => {
        if (!button.isConnected) return;
        button.classList.remove("is-copied");
        button.title = copy.actions.email;
        button.setAttribute("aria-label", copy.actions.email);
      }, 1800);
    });
    return button;
  };

  const getLanguage = () => window.PortfolioI18n?.language === "pt" ? "pt" : "en";

  const sectionTabs = (copy, active, onSelect) => {
    const tabs = create("nav", "about-me-tabs");
    tabs.setAttribute("aria-label", copy.tabs.about);
    for (const [id, label] of [["about", copy.tabs.about], ["projects", copy.tabs.projects]]) {
      const button = create("button", `about-me-tab${id === active ? " is-active" : ""}`, label);
      button.type = "button";
      button.dataset.aboutTab = id;
      button.setAttribute("aria-current", id === active ? "page" : "false");
      button.addEventListener("click", () => onSelect(id));
      tabs.append(button);
    }
    return tabs;
  };

  const buildAboutView = (language = getLanguage()) => {
    const copy = content[language] || content.en;
    const body = create("div", "feature-app__body full-cv about-me-subtab");
    const sheet = create("article", "full-cv__sheet");

    const actions = create("div", "feature-actions full-cv__actions full-cv__profile-actions");
    actions.append(
      emailButton(copy),
      action("linkedin", copy.actions.linkedin, { type: "open-external", target: "linkedin" }),
      action("discord", copy.actions.discord, { type: "open-external", target: "discord" }),
      action("steam", copy.actions.steam, { type: "open-external", target: "steam" }),
      action("pivity", copy.actions.pivity, { type: "open-external", target: "pivity" })
    );

    const identity = create("section", "full-cv__identity full-cv__top-cell full-cv__top-cell--profile");
    const initials = copy.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("");
    const profileHeader = create("div", "full-cv__profile-header");
    const avatar = create("div", "full-cv__profile-avatar");
    avatar.setAttribute("aria-hidden", "true");
    avatar.append(create("span", "", initials));
    const profileCopy = create("div", "full-cv__profile-copy");
    profileCopy.append(
      create("h1", "", copy.name),
      create("p", "full-cv__profile-role", copy.role.replace(" | ", " · ")),
      create("p", "full-cv__location", copy.location)
    );
    profileHeader.append(avatar, profileCopy);
    const availability = create("div", "full-cv__availability", copy.availability);
    identity.append(create("span", "feature-eyebrow full-cv__profile-eyebrow", copy.profileTitle), profileHeader, actions, availability);

    const localization = create("section", "full-cv__section full-cv__localization-card");
    localization.append(create("h2", "", copy.localizationTitle));
    const localizationList = create("div", "cv-language-list full-cv__localization-list");
    for (const [languageName, level] of copy.languages) {
      const row = create("div", "cv-language-row");
      const meter = create("span", "cv-language-meter");
      const fill = create("span", "cv-language-meter__fill");
      fill.style.setProperty("--language-level", level === "C2" ? "92%" : level === "C1" ? "84%" : level === "B2" ? "72%" : "60%");
      meter.append(fill);
      row.append(create("span", "", languageName), meter, create("strong", "", level));
      localizationList.append(row);
    }
    localization.append(localizationList);

    const github = buildGitHubSummary();
    github.classList.add("full-cv__profile-github");

    const hero = create("header", "full-cv__hero full-cv__top-cell full-cv__top-cell--hero");
    hero.dataset.cvSection = "overview";
    const heroCopy = create("div", "full-cv__hero-copy");
    heroCopy.append(create("span", "feature-eyebrow", copy.eyebrow), create("h2", "", copy.role), create("p", "", copy.summary));

    hero.append(heroCopy);

    const experience = create("section", "full-cv__section full-cv__experience-section");
    experience.dataset.cvSection = "experience";
    experience.append(create("h2", "", copy.experienceTitle));
    const experienceList = create("div", "full-cv__experience");
    for (const job of copy.experience) {
      const item = create("article", "full-cv__job");
      const marker = create("span", "full-cv__timeline-marker");
      marker.setAttribute("aria-hidden", "true");
      const jobBody = create("div", "full-cv__job-body");
      const header = create("header", "full-cv__job-header");
      const heading = create("h3");
      heading.append(document.createTextNode(job.title), create("span", "", job.company));
      header.append(heading, create("p", "", job.period));
      const bullets = create("ul", "full-cv__bullets");
      for (const bullet of job.bullets) bullets.append(create("li", "", bullet));
      jobBody.append(header, bullets);
      item.append(marker, jobBody);
      experienceList.append(item);
    }
    experience.append(experienceList);

    const roles = create("section", "full-cv__section full-cv__sidebar-section full-cv__card full-cv__roles-card");
    roles.append(create("h2", "", copy.targetRolesTitle));
    const roleTags = create("div", "full-cv__skill-tags");
    for (const role of copy.targetRoles) roleTags.append(create("span", "", role));
    roles.append(roleTags, create("p", "full-cv__roles-note", copy.targetRolesNote));

    const skills = create("section", "full-cv__section full-cv__skills-section full-cv__card");
    skills.dataset.cvSection = "skills";
    skills.append(create("h2", "", copy.skillsTitle));
    const skillsList = create("div", "full-cv__skills");
    for (const [title, value] of copy.skills) {
      const group = create("div", "full-cv__skill-group");
      group.append(create("h3", "", title));
      const tags = create("div", "full-cv__skill-tags");
      for (const skill of value.split("|").map((item) => item.trim()).filter(Boolean)) tags.append(create("span", "", skill));
      group.append(tags);
      skillsList.append(group);
    }
    skills.append(skillsList);

    const education = create("section", "full-cv__section full-cv__sidebar-section full-cv__card");
    education.dataset.cvSection = "education";
    education.append(create("h2", "", copy.educationTitle), create("strong", "", copy.education), create("p", "", copy.educationPeriod));

    roles.classList.add("full-cv__top-cell", "full-cv__top-cell--roles");

    const topRow = create("div", "full-cv__top-row");
    topRow.append(identity, hero, roles);

    const profileBody = create("aside", "full-cv__profile-body");
    profileBody.append(localization, github);

    const main = create("main", "full-cv__main");
    main.append(experience);

    const sidebarBody = create("aside", "full-cv__sidebar-body");
    sidebarBody.append(skills, education);

    const bodyRow = create("div", "full-cv__body-row");
    bodyRow.append(profileBody, main, sidebarBody);

    sheet.append(topRow, bodyRow);
    body.append(sheet);
    return body;
  };

  const stat = (label, attribute) => {
    const item = create("div", "about-github-stat");
    item.dataset.githubMetricItem = "";
    const value = create("strong", "", "…");
    value.setAttribute(attribute, "");
    item.append(value, create("span", "", label));
    return item;
  };

  const statGroup = (title, entries) => {
    const group = create("section", "about-github-stat-group");
    group.dataset.githubStatGroup = "";
    group.append(create("h3", "", title));
    const list = create("div", "about-github-stat-list");
    for (const [label, attribute] of entries) list.append(stat(label, attribute));
    group.append(list);
    return group;
  };


  const metricSection = (title, attribute) => {
    const section = create("section", "desktop-github-widget__scope about-github-metric-section");
    const heading = create("div", "desktop-github-widget__scope-heading");
    heading.append(create("strong", "", title));
    const metrics = create("div", "about-github-metric-grid");
    metrics.setAttribute(attribute, "");
    section.append(heading, metrics);
    return section;
  };

  const contentSection = (title, attribute, className = "") => {
    const section = create("section", `desktop-github-widget__scope about-github-content-section${className ? ` ${className}` : ""}`);
    const heading = create("div", "desktop-github-widget__scope-heading");
    heading.append(create("strong", "", title));
    const content = create("div", "about-github-dynamic-content");
    content.setAttribute(attribute, "");
    section.append(heading, content);
    return section;
  };

  const buildGitHubSummary = () => {
    const section = create("section", "full-cv__section about-github-summary");
    const heading = create("div", "about-github-summary__heading");
    const headingCopy = create("div", "about-github-summary__heading-copy");
    headingCopy.append(create("h2", "", "GitHub Statistics"), create("p", "", "Repository, reach and account overview."));
    heading.append(headingCopy);

    const widget = create("div", "desktop-github-widget about-github-summary__widget");
    widget.dataset.githubStats = "";
    widget.dataset.githubUser = "bleonheart";
    widget.dataset.githubOrg = "LiliaFramework";
    widget.dataset.githubStatic = "false";

    const groups = create("div", "about-github-summary__groups");
    groups.append(
      statGroup("Repositories", [
        ["Public repos", "data-github-public-repos"],
        ["Private repos", "data-github-private-repos"],
        ["Owned private", "data-github-owned-private-repos"],
        ["Total repos", "data-github-total-repos"],
        ["Original repos", "data-github-repos"],
        ["Forked repos", "data-github-forked-repos"],
        ["Active repos", "data-github-active-repos"],
        ["Archived", "data-github-archived-repos"]
      ]),
      statGroup("Reach", [
        ["Stars received", "data-github-stars"],
        ["Forks received", "data-github-forks"],
        ["Followers", "data-github-followers"],
        ["Following", "data-github-following"],
        ["Organizations", "data-github-organizations"],
        ["Public gists", "data-github-public-gists"]
      ]),
      statGroup("Repository Activity", [
        ["Open issues / PRs", "data-github-open-issues"],
        ["Public releases", "data-github-releases"],
        ["Release downloads", "data-github-release-downloads"],
        ["Repository size", "data-github-repository-size"],
        ["Active · 30d", "data-github-active-30d"],
        ["Account age", "data-github-account-age"]
      ]),
      statGroup("Recent Activity", [
        ["Public events", "data-github-public-events"],
        ["Push events", "data-github-push-events"],
        ["Commits pushed", "data-github-push-commits"],
        ["PR events", "data-github-pr-events"],
        ["Active days", "data-github-active-days"],
        ["Repos touched", "data-github-repos-touched"]
      ])
    );

    widget.append(groups);
    section.append(heading, widget);
    return section;
  };

  const buildGitHubView = () => {
    const body = create("div", "feature-app__body about-me-subtab about-github-tab");
    const widget = create("section", "desktop-github-widget about-github-widget");
    widget.dataset.githubStats = "";
    widget.dataset.githubUser = "bleonheart";
    widget.dataset.githubOrg = "LiliaFramework";
    widget.dataset.githubStatic = "false";

    const header = create("header");
    header.append(create("span", "", "GITHUB"), link("@bleonheart ↗", "https://github.com/bleonheart", "about-github-link"));

    const personal = create("section", "desktop-github-widget__scope");
    const personalHeading = create("div", "desktop-github-widget__scope-heading");
    const since = create("span", "", "Loading public profile…");
    since.dataset.githubSince = "";
    personalHeading.append(create("strong", "", "SAMAEL"), since);
    const personalStats = create("div", "desktop-github-widget__stats desktop-github-widget__stats--personal");
    personalStats.append(stat("Projects", "data-github-repos"), stat("Stars", "data-github-stars"), stat("Forks", "data-github-forks"), stat("Followers", "data-github-followers"));
    const top = create("div", "desktop-github-widget__detail");
    const topValue = create("strong", "", "—");
    topValue.setAttribute("data-github-top", "");
    top.append(create("span", "", "Top project"), topValue);
    const recent = create("div", "desktop-github-widget__detail");
    const recentValue = create("strong", "", "—");
    recentValue.setAttribute("data-github-recent", "");
    recent.append(create("span", "", "Recent activity"), recentValue);
    personal.append(personalHeading, personalStats, top, recent);

    const profileMetrics = metricSection("PROFILE", "data-github-profile-metrics");
    const repositoryMetrics = metricSection("REPOSITORY HEALTH", "data-github-repository-metrics");
    const activityMetrics = metricSection("RECENT PUBLIC ACTIVITY", "data-github-activity-metrics");
    const activityEvents = contentSection("LATEST PUBLIC EVENTS", "data-github-recent-events", "about-github-content-section--events");
    const languages = contentSection("LANGUAGES", "data-github-languages", "about-github-content-section--languages");
    const repositories = contentSection("TOP REPOSITORIES", "data-github-repositories", "about-github-content-section--repositories");
    const labsCount = create("strong", "", "—");
    const framework = create("section", "desktop-github-widget__scope desktop-github-widget__scope--framework");
    const frameworkHeading = create("div", "desktop-github-widget__scope-heading");
    frameworkHeading.append(create("strong", "", "LILIA FRAMEWORK"), link("Open ↗", "https://github.com/LiliaFramework", "about-github-link"));
    const frameworkStats = create("div", "desktop-github-widget__stats");
    frameworkStats.append(stat("Projects", "data-github-lilia-repos"), stat("Stars", "data-github-lilia-stars"), stat("Forks", "data-github-lilia-forks"));
    const release = create("div", "desktop-github-widget__detail");
    const releaseValue = create("strong", "", "—");
    releaseValue.setAttribute("data-github-lilia-release", "");
    release.append(create("span", "", "Latest release"), releaseValue);
    const frameworkMetrics = create("div", "about-github-metric-grid about-github-metric-grid--framework");
    frameworkMetrics.setAttribute("data-github-lilia-metrics", "");
    const frameworkLanguages = create("div", "about-github-dynamic-content");
    frameworkLanguages.setAttribute("data-github-lilia-languages", "");
    framework.append(frameworkHeading, frameworkStats, release, frameworkMetrics, frameworkLanguages);

    const status = create("div", "desktop-github-widget__status", "Loading public GitHub activity…");
    status.dataset.githubStatus = "";
    widget.append(header, personal, profileMetrics, repositoryMetrics, activityMetrics, activityEvents, languages, repositories, framework, status);
    body.append(widget);
    return body;
  };

  const buildEmbeddedProgram = (id) => {
    const program = programs.get(id);
    if (!program?.build) return { view: create("div", "feature-empty", "Section unavailable"), initialize: null };
    const view = program.build();
    view.querySelector?.(":scope > .portfolio-section-tabs")?.remove();
    view.classList?.add("about-me-embedded-program");
    return { view, initialize: typeof program.initialize === "function" ? () => program.initialize(view) : null };
  };

  const refreshGitHubStats = (scope) => {
    requestAnimationFrame(() => window.PortfolioDesktop?.initializeGitHubStats?.(scope));
  };

  const buildProgram = (root, language = getLanguage()) => {
    let currentLanguage = language === "pt" ? "pt" : "en";
    let active = "about";
    let cleanup = null;
    const pane = create("div", "about-me-subtab-host");

    const renderTabs = () => {
      const existing = root.querySelector(":scope > .about-me-tabs");
      const tabs = sectionTabs(content[currentLanguage] || content.en, active, setTab);
      if (existing) existing.replaceWith(tabs);
      else root.prepend(tabs);
    };

    const clearCurrent = () => {
      if (typeof cleanup === "function") cleanup();
      cleanup = null;
    };

    function setTab(target) {
      const next = ["about", "projects"].includes(target) ? target : "about";
      clearCurrent();
      active = next;
      renderTabs();

      if (next === "about") {
        const view = buildAboutView(currentLanguage);
        pane.replaceChildren(view);
        refreshGitHubStats(view);
        return;
      }

      const embedded = buildEmbeddedProgram("projects");
      pane.replaceChildren(embedded.view);
      cleanup = embedded.initialize?.() || null;
    }

    root.replaceChildren(pane);
    root.className = "feature-app about-profile-app about-cv-app";
    root.dataset.i18nSkip = "";
    root.__setAboutTab = setTab;
    root.__setAboutLanguage = (nextLanguage) => {
      currentLanguage = nextLanguage === "pt" ? "pt" : "en";
      if (active === "about") {
        clearCurrent();
        const view = buildAboutView(currentLanguage);
        pane.replaceChildren(view);
        refreshGitHubStats(view);
      }
      renderTabs();
    };
    root.__destroyAboutProgram = clearCurrent;
    setTab("about");
  };

  programs.set("about-me", {
    build(application, api) {
      const fragment = api.buildTemplateContent(application);
      const app = fragment.querySelector("[data-github-about]");
      if (!app) return fragment;
      buildProgram(app);
      return fragment;
    },
    initialize(container) {
      const app = container.querySelector?.(".about-profile-app") || container.closest?.(".about-profile-app");
      if (!app?.__setAboutTab) return null;
      const onTab = (event) => app.__setAboutTab(String(event.detail?.target || "about"));
      window.addEventListener("portfolio:about-tab", onTab);
      return () => {
        window.removeEventListener("portfolio:about-tab", onTab);
        app.__destroyAboutProgram?.();
      };
    }
  });

  window.addEventListener("portfolio:language-changed", (event) => {
    const language = event.detail?.language === "pt" ? "pt" : "en";
    for (const root of document.querySelectorAll(".about-profile-app[data-i18n-skip]")) root.__setAboutLanguage?.(language);
  });
})();
