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
      skillsTitle: "Main Technical Skills",
      skillsLoading: "Loading rated skills…",
      skillsUnavailable: "Skill ratings are temporarily unavailable.",
      skillsEmpty: "No skills are currently rated 4 or higher.",
      skills: [
        ["Linux & Systems", "Linux | Red Hat Enterprise Linux (RHEL) | Fedora | Ubuntu | Debian | Arch Linux | Linux Mint | Kali Linux | Windows Server | Windows 10/11 | SSH | SFTP | systemd | cron"],
        ["Windows Administration & Virtualization", "VirtualBox | VMware | Active Directory | Group Policy | DNS Server | DHCP Server | winget | Chocolatey"],
        ["DevOps, CI/CD & IaC", "Docker | Docker Compose | Kubernetes | Git | GitHub Actions | GitLab CI/CD | Jenkins | GitHub Desktop | Terraform | Ansible | Bash/Shell | PowerShell | CI"],
        ["Cloud & Infrastructure", "AWS | Microsoft Azure | Google Cloud Platform | Proxmox | Cloudflare | Cloudflare Workers"],
        ["Data & SQL", "SQL | MySQL | MariaDB | Excel | Power BI | PostgreSQL | phpMyAdmin | PostgreSQL 16 | PL/pgSQL | IndexedDB"],
        ["Networking & Security", "FortiGate | Wireshark | iptables | nftables | VLANs | NAT | Port Forwarding | Subnetting | CIDR | Routing | Load Balancing | Reverse Proxies | HTTP/HTTPS"],
        ["Operations & Support", "Production Support | Troubleshooting | Ticket Resolution | Incident Resolution | Systems Administration | Technical Support | QA/Testing | Technical Documentation | Requirements Management | Process Improvement | Server Administration | Zendesk"],
        ["Programming & Scripting", "Python | Lua | HTML | CSS | JavaScript | TypeScript | Go | GLua | Bash | JSON"],
        ["Web Development & Hosting", "React | Vite | Nginx | XAMPP | GitHub Pages | Browser Runtime | Static Hosting | Static Assets | Web Hosting | MkDocs | Markdown | Data Scraping"],
        ["Monitoring & Observability", "Prometheus | Grafana | Loki"],
        ["Game Development & Servers", "Garry's Mod | Source Engine | Unity 6.6 | Ren'Py | Game Scripting | Game Systems | Game Servers | SteamCMD | SRCDS | Lilia | Helix"],
        ["Development Tools & Libraries", "PySide6 | Pillow | AST | SARIF | LSP | Graphviz | VS Code API | Luacheck | Static Analysis | pytest | npm | Ollama"],
        ["Corporate Tools", "Jira | Trello | Microsoft 365 | Google Workspace | Slack"],
        ["Microsoft Office & Applications", "Microsoft Word | Microsoft PowerPoint | Microsoft Outlook | Microsoft Teams | Microsoft OneNote | Microsoft Access | Microsoft Publisher | Microsoft OneDrive | Microsoft SharePoint | Microsoft Visio | Microsoft Project | Microsoft Forms | Microsoft Planner | Microsoft To Do | Microsoft Power Automate | Microsoft Power Apps | Microsoft Loop | Microsoft Whiteboard | Microsoft Copilot"]
      ],
      overviewSkills: [
        ["Linux & Systems", "Linux | RHEL | Windows Server | Proxmox | SSH"],
        ["DevOps & Cloud", "Docker | Kubernetes | GitHub Actions | Terraform | AWS"],
        ["Programming & Scripting", "Python | Lua | GLua | Bash | JavaScript"],
        ["Databases & Web", "MySQL | MariaDB | PostgreSQL | Nginx"],
        ["Networking & Security", "FortiGate | Wireshark | VLANs | iptables"],
        ["Operations & Support", "Troubleshooting | Incident Resolution | Production Support | Technical Documentation"]
      ],
      experienceTitle: "Professional Experience",
      experience: [
        {
          title: "Linux Systems Administrator & Software Developer",
          icon: "server",
          teaser: "Production infrastructure, backend systems and automations.",
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
        },
        {
          title: "Business Customer Consultant",
          icon: "headset",
          teaser: "Management and resolution of business customer requests, tickets and escalations. Coordination across teams to maintain service quality.",
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
          icon: "server",
          teaser: "Technical services for large North American communities with multiple game servers. Server administration, monitoring and production optimization.",
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
          icon: "globe",
          teaser: "Technical administration of websites and digital platforms. Traffic analysis, digital metrics and search visibility improvements.",
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
          icon: "file",
          teaser: "Processing and validation of data across multiple formats. Quality assurance, reporting and operational support.",
          company: "Accenture Portugal",
          period: "November 2022 - October 2024 | Lisbon, Portugal",
          bullets: [
            "Reception, processing and validation of data in multiple formats, ensuring compliance with guidelines, priorities and quality standards.",
            "Management of tasks and data according to priorities, deadlines and operational requirements, focused on accuracy, security and information integrity.",
            "Quality control, identification of inconsistencies and reporting of relevant situations to support problem resolution.",
            "Experimentation and validation of client tools, including test planning, result analysis and report preparation.",
            "Collaboration on process improvement and with different stakeholders to clarify requirements and align priorities."
          ]
        }
      ],
      educationTitle: "Education",
      education: "Bachelor's Degree in Anthropology | NOVA FCSH",
      educationPeriod: "September 2019 - June 2022",
      languagesTitle: "Languages",
      localizationTitle: "Languages",
      languages: [["Portuguese", "C2"], ["English", "C2"], ["Spanish", "B2"]],
      tabs: { about: "About Me", proficiency: "Technology Proficiency", projects: "Projects" },
      proficiency: {
        title: "Technology Proficiency",
        description: "My self-assessed proficiency across the technologies and skills I work with.",
        unrated: "Not rated",
        notPublished: "Proficiency ratings have not been set yet.",
        loadError: "Could not load the published ratings. Showing unrated technologies.",
        loading: "Loading proficiency ratings...",
        edit: "Edit ratings",
        done: "Finish editing",
        download: "Download ratings JSON",
        editNote: "This editor only previews changes in your browser. Download the JSON, replace .jsons/technology-proficiency.json in the project, then regenerate and publish the site to make them public.",
        levels: ["Not rated", "Beginner", "Familiar", "Intermediate", "Advanced", "Expert"]
      },
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
      skillsTitle: "Principais Competências Técnicas",
      skillsLoading: "A carregar competências avaliadas…",
      skillsUnavailable: "As avaliações das competências estão temporariamente indisponíveis.",
      skillsEmpty: "Não há competências avaliadas com nível 4 ou superior.",
      skills: [
        ["Linux e Sistemas", "Linux | Red Hat Enterprise Linux (RHEL) | Fedora | Ubuntu | Debian | Arch Linux | Linux Mint | Kali Linux | Windows Server | Windows 10/11 | SSH | SFTP | systemd | cron"],
        ["Administração Windows e Virtualização", "VirtualBox | VMware | Active Directory | Group Policy | DNS Server | DHCP Server | winget | Chocolatey"],
        ["DevOps, CI/CD e IaC", "Docker | Docker Compose | Kubernetes | Git | GitHub Actions | GitLab CI/CD | Jenkins | GitHub Desktop | Terraform | Ansible | Bash/Shell | PowerShell | CI"],
        ["Cloud e Infraestrutura", "AWS | Microsoft Azure | Google Cloud Platform | Proxmox | Cloudflare | Cloudflare Workers"],
        ["Dados e SQL", "SQL | MySQL | MariaDB | Excel | Power BI | PostgreSQL | phpMyAdmin | PostgreSQL 16 | PL/pgSQL | IndexedDB"],
        ["Redes e Segurança", "FortiGate | Wireshark | iptables | nftables | VLANs | NAT | Port Forwarding | Subnetting | CIDR | Routing | Load Balancing | Reverse Proxies | HTTP/HTTPS"],
        ["Operações e Suporte", "Production Support | Troubleshooting | Ticket Resolution | Incident Resolution | Administração de Sistemas | Suporte Técnico | QA/Testes | Documentação Técnica | Gestão de Requisitos | Melhoria de Processos | Administração de Servidores | Zendesk"],
        ["Programação e Scripting", "Python | Lua | HTML | CSS | JavaScript | TypeScript | Go | GLua | Bash | JSON"],
        ["Desenvolvimento Web e Alojamento", "React | Vite | Nginx | XAMPP | GitHub Pages | Ambiente de Execução no Navegador | Alojamento Estático | Recursos Estáticos | Alojamento Web | MkDocs | Markdown | Extração de Dados"],
        ["Monitorização e Observabilidade", "Prometheus | Grafana | Loki"],
        ["Desenvolvimento de Jogos e Servidores", "Garry's Mod | Source Engine | Unity 6.6 | Ren'Py | Programação de Jogos | Sistemas de Jogos | Servidores de Jogos | SteamCMD | SRCDS | Lilia | Helix"],
        ["Ferramentas e Bibliotecas de Desenvolvimento", "PySide6 | Pillow | AST | SARIF | LSP | Graphviz | VS Code API | Luacheck | Análise Estática | pytest | npm | Ollama"],
        ["Ferramentas Corporativas", "Jira | Trello | Microsoft 365 | Google Workspace | Slack"],
        ["Microsoft Office e Aplicações", "Microsoft Word | Microsoft PowerPoint | Microsoft Outlook | Microsoft Teams | Microsoft OneNote | Microsoft Access | Microsoft Publisher | Microsoft OneDrive | Microsoft SharePoint | Microsoft Visio | Microsoft Project | Microsoft Forms | Microsoft Planner | Microsoft To Do | Microsoft Power Automate | Microsoft Power Apps | Microsoft Loop | Microsoft Whiteboard | Microsoft Copilot"]
      ],
      overviewSkills: [
        ["Linux e Sistemas", "Linux | RHEL | Windows Server | Proxmox | SSH"],
        ["DevOps e Cloud", "Docker | Kubernetes | GitHub Actions | Terraform | AWS"],
        ["Programação e Scripting", "Python | Lua | GLua | Bash | JavaScript"],
        ["Bases de Dados e Web", "MySQL | MariaDB | PostgreSQL | Nginx"],
        ["Redes e Segurança", "FortiGate | Wireshark | VLANs | iptables"],
        ["Operações e Suporte", "Troubleshooting | Resolução de Incidentes | Suporte de Produção | Documentação Técnica"]
      ],
      experienceTitle: "Experiência Profissional",
      experience: [
        {
          title: "Administrador de Sistemas Linux e Programador de Software",
          icon: "server",
          teaser: "Infraestruturas de produção, sistemas backend e automações.",
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
        },
        {
          title: "Consultor de Clientes Empresariais",
          icon: "headset",
          teaser: "Gestão e resolução de pedidos, tickets e escalamentos de clientes empresariais. Colaboração entre equipas para assegurar a qualidade do serviço.",
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
          icon: "server",
          teaser: "Serviços técnicos para grandes comunidades norte-americanas com múltiplos servidores. Administração, monitorização e otimização de sistemas em produção.",
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
          icon: "globe",
          teaser: "Administração de websites e plataformas digitais. Análise de tráfego, métricas e melhorias de visibilidade nos motores de pesquisa.",
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
          icon: "file",
          teaser: "Processamento e validação de dados em vários formatos. Controlo de qualidade, relatórios e apoio operacional.",
          company: "Accenture Portugal",
          period: "Novembro de 2022 - Outubro de 2024 | Lisboa, Portugal",
          bullets: [
            "Receção, processamento e validação de dados em múltiplos formatos, assegurando cumprimento de diretrizes, prioridades e padrões de qualidade.",
            "Gestão de tarefas e dados segundo prioridades, prazos e requisitos operacionais, com foco em precisão, segurança e integridade da informação.",
            "Controlo de qualidade, identificação de inconsistências e reporte de situações relevantes para suporte à resolução de problemas.",
            "Experimentação e validação de ferramentas do cliente, incluindo planeamento de testes, análise de resultados e elaboração de relatórios.",
            "Colaboração na melhoria de processos e com diferentes intervenientes para clarificação de requisitos e alinhamento de prioridades."
          ]
        }
      ],
      educationTitle: "Formação Académica",
      education: "Licenciatura em Antropologia | NOVA FCSH",
      educationPeriod: "Setembro de 2019 - Junho de 2022",
      languagesTitle: "Idiomas",
      localizationTitle: "Idiomas",
      languages: [["Português", "C2"], ["Inglês", "C2"], ["Espanhol", "B2"]],
      tabs: { about: "Sobre Mim", proficiency: "Proficiência Tecnológica", projects: "Projetos" },
      proficiency: {
        title: "Proficiência Tecnológica",
        description: "A minha avaliação de proficiência nas tecnologias e competências com que trabalho.",
        unrated: "Por avaliar",
        notPublished: "Os níveis de proficiência ainda não foram definidos.",
        loadError: "Não foi possível carregar os níveis publicados. As tecnologias aparecem por avaliar.",
        loading: "A carregar os níveis de proficiência...",
        edit: "Editar níveis",
        done: "Terminar edição",
        download: "Transferir JSON dos níveis",
        editNote: "Esta edição serve apenas para pré-visualização no navegador. Transfira o JSON, substitua .jsons/technology-proficiency.json no projeto e volte a gerar e publicar o site para tornar os níveis públicos.",
        levels: ["Por avaliar", "Iniciante", "Familiarizado", "Intermédio", "Avançado", "Especialista"]
      },
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
    for (const [id, label] of [["about", copy.tabs.about], ["proficiency", copy.tabs.proficiency], ["projects", copy.tabs.projects]]) {
      const button = create("button", `about-me-tab${id === active ? " is-active" : ""}`, label);
      button.type = "button";
      button.dataset.aboutTab = id;
      button.setAttribute("aria-current", id === active ? "page" : "false");
      button.addEventListener("click", () => onSelect(id));
      tabs.append(button);
    }
    return tabs;
  };

  const iconPaths = {
    mail: [["rect", { x: 2, y: 4, width: 20, height: 16, rx: 2 }], ["path", { d: "m3 6 9 7 9-7" }]],
    linkedin: [["rect", { x: 2, y: 2, width: 20, height: 20, rx: 2 }], ["path", { d: "M7 10v7M7 7h.01M11 17v-7M11 13a3 3 0 0 1 6 0v4" }]],
    message: [["path", { d: "M21 11a8 8 0 0 1-8 8H8l-5 3 1.5-5A8 8 0 1 1 21 11Z" }], ["path", { d: "M8 11h.01M12 11h.01M16 11h.01" }]],
    gamepad: [["path", { d: "M6 9h12a4 4 0 0 1 3.9 3.1l.9 4a3 3 0 0 1-4.8 3L15 16H9l-3 3.1a3 3 0 0 1-4.8-3l.9-4A4 4 0 0 1 6 9Z" }], ["path", { d: "M6 13h5M8.5 10.5v5M16 12h.01M19 14h.01" }]],
    external: [["rect", { x: 3, y: 3, width: 18, height: 18, rx: 2 }], ["path", { d: "M10 14 21 3M14 3h7v7" }]],
    star: [["path", { d: "m12 2 3.1 6.3 7 1-5.05 4.9 1.2 6.9L12 17.8l-6.25 3.3 1.2-6.9L1.9 9.3l7-1z" }]],
    server: [["rect", { x: 3, y: 3, width: 18, height: 8, rx: 2 }], ["rect", { x: 3, y: 13, width: 18, height: 8, rx: 2 }], ["path", { d: "M7 7h.01M7 17h.01M11 7h6M11 17h6" }]],
    headset: [["path", { d: "M3 14v-3a9 9 0 0 1 18 0v3M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5ZM21 14h-3a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-5Z" }]],
    globe: [["circle", { cx: 12, cy: 12, r: 9 }], ["path", { d: "M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" }]],
    file: [["path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 13h8M8 17h8" }]],
    settings: [["circle", { cx: 12, cy: 12, r: 3 }], ["path", { d: "M19.4 15a1.7 1.7 0 0 0 .34 1.87l.06.06-2.12 2.12-.06-.06A1.7 1.7 0 0 0 15.75 19a1.7 1.7 0 0 0-1 1.55V21h-3v-.45a1.7 1.7 0 0 0-1-1.55 1.7 1.7 0 0 0-1.87.34l-.06.06-2.12-2.12.06-.06A1.7 1.7 0 0 0 7 15.35a1.7 1.7 0 0 0-1.55-1H5v-3h.45a1.7 1.7 0 0 0 1.55-1A1.7 1.7 0 0 0 6.66 8.5L6.6 8.44l2.12-2.12.06.06A1.7 1.7 0 0 0 10.65 6a1.7 1.7 0 0 0 1-1.55V4h3v.45a1.7 1.7 0 0 0 1 1.55 1.7 1.7 0 0 0 1.87-.34l.06-.06 2.12 2.12-.06.06A1.7 1.7 0 0 0 19.3 9.65a1.7 1.7 0 0 0 1.55 1h.45v3h-.45A1.7 1.7 0 0 0 19.4 15Z" }]],
    package: [["path", { d: "m12 2 9 5-9 5-9-5 9-5ZM3 7v10l9 5 9-5V7M12 12v10" }]],
    code: [["path", { d: "m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" }]],
    calendar: [["rect", { x: 3, y: 5, width: 18, height: 16, rx: 2 }], ["path", { d: "M7 3v4M17 3v4M3 10h18" }]],
    pin: [["path", { d: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" }], ["circle", { cx: 12, cy: 10, r: 2.4 }]],
    briefcase: [["rect", { x: 3, y: 7, width: 18, height: 14, rx: 2 }], ["path", { d: "M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12a20 20 0 0 0 18 0M12 12v3" }]],
    chevron: [["path", { d: "m6 9 6 6 6-6" }]],
    quote: [["path", { d: "M10 11H5a1 1 0 0 1-1-1V8a4 4 0 0 1 4-4M20 11h-5a1 1 0 0 1-1-1V8a4 4 0 0 1 4-4M4 11h6v8H4zM14 11h6v8h-6z" }]]
  };

  const icon = (name, className = "") => {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", `cv-icon${className ? ` ${className}` : ""}`);
    svg.setAttribute("width", "20");
    svg.setAttribute("height", "20");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.8");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    for (const [tag, attributes] of iconPaths[name] || []) {
      const shape = document.createElementNS("http://www.w3.org/2000/svg", tag);
      for (const [attribute, value] of Object.entries(attributes)) shape.setAttribute(attribute, String(value));
      svg.append(shape);
    }
    return svg;
  };

  const renderMainSkills = (list, language, ratings, loaded, error) => {
    const copy = content[language] || content.en;
    list.replaceChildren();
    if (!loaded || error) {
      const status = create("p", "full-cv__skills-status", error ? copy.skillsUnavailable : copy.skillsLoading);
      status.setAttribute("role", "status");
      list.append(status);
      return;
    }

    let count = 0;
    for (const [groupIndex, group] of technologyGroups.entries()) {
      const selected = group.names.map((name, index) => ({
        name,
        label: language === "pt" ? group.translations[index] || name : name,
        level: normalizeRating(ratings[name])
      })).filter((skill) => skill.level >= 4);
      if (!selected.length) continue;
      count += selected.length;
      const section = create("div", "full-cv__skill-group");
      section.append(create("h3", "", copy.skills[groupIndex][0]));
      const tags = create("div", "full-cv__skill-tags");
      for (const skill of selected) {
        const tag = create("span", "", skill.label);
        tag.title = `${skill.name}: ${skill.level}/5`;
        tags.append(tag);
      }
      section.append(tags);
      list.append(section);
    }
    if (!count) list.append(create("p", "full-cv__skills-status", copy.skillsEmpty));
  };

  const buildAboutView = (language = getLanguage(), ratings = {}, loaded = false, error = false, onOpenProjects = null) => {
    const copy = content[language] || content.en;
    const body = create("div", "feature-app__body full-cv about-me-subtab");
    const sheet = create("article", "full-cv__sheet full-cv__sheet--showcase");

    const actions = create("div", "feature-actions full-cv__actions full-cv__profile-actions");
    actions.append(
      emailButton(copy),
      action("linkedin", copy.actions.linkedin, { type: "open-external", target: "linkedin" }),
      action("discord", copy.actions.discord, { type: "open-external", target: "discord" }),
      action("steam", copy.actions.steam, { type: "open-external", target: "steam" }),
      action("pivity", copy.actions.pivity, { type: "open-external", target: "pivity" })
    );

    const identity = create("section", "full-cv__identity full-cv__left-card");
    const initials = copy.name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase() || "").join("");
    const profileHeader = create("div", "full-cv__profile-header");
    const avatar = create("div", "full-cv__profile-avatar");
    avatar.setAttribute("aria-hidden", "true");
    avatar.append(create("span", "", initials));
    const profileCopy = create("div", "full-cv__profile-copy");
    profileCopy.append(create("h1", "", copy.name), create("p", "full-cv__location", copy.location));
    profileHeader.append(avatar, profileCopy);
    const availability = create("div", "full-cv__availability", copy.availability);
    identity.append(profileHeader, actions, availability);

    const localization = create("section", "full-cv__section full-cv__localization-card full-cv__left-card");
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

    const github = buildGitHubSummary(copy, onOpenProjects);
    github.classList.add("full-cv__profile-github", "full-cv__left-card");
    const leftRail = create("aside", "full-cv__left-rail");
    leftRail.append(identity, localization, github);

    const career = create("main", "full-cv__career");
    career.dataset.cvSection = "experience";

    const experienceList = create("div", "experience-showcase__list");
    for (const job of copy.experience) {
      const entry = create("details", "experience-showcase__entry");
      entry.open = true;
      const summary = create("summary", "experience-showcase__entry-summary");
      const symbol = create("div", "experience-showcase__entry-icon");
      symbol.append(icon(job.icon));
      const info = create("div", "experience-showcase__entry-info");
      info.append(create("h4", "", job.title), create("strong", "", job.company), create("p", "", job.teaser));
      const metadata = create("div", "experience-showcase__entry-meta");
      const [period, location] = job.period.split(" | ");
      const dates = create("span");
      dates.append(icon("calendar"), document.createTextNode(period.replace(" - ", " – ")));
      metadata.append(dates);
      if (location) {
        const place = create("span");
        place.append(icon("pin"), document.createTextNode(location));
        metadata.append(place);
      }
      summary.append(symbol, info, metadata, icon("chevron", "experience-showcase__entry-chevron"));
      const panel = create("div", "experience-showcase__entry-panel");
      const bullets = create("ul", "experience-showcase__bullets");
      for (const bullet of job.bullets) bullets.append(create("li", "", bullet));
      panel.append(bullets);
      entry.append(summary, panel);
      experienceList.append(entry);
    }
    career.append(experienceList);


    const skills = create("section", "full-cv__section full-cv__skills-section full-cv__right-card");
    skills.dataset.cvSection = "skills";
    const skillsHeading = create("h2", "experience-showcase__skills-heading");
    skillsHeading.append(icon("settings"), document.createTextNode(copy.skillsTitle));
    skills.append(skillsHeading);
    const skillsList = create("div", "full-cv__skills");
    renderMainSkills(skillsList, language, ratings, loaded, error);
    skills.append(skillsList);

    const education = create("section", "full-cv__section full-cv__left-card full-cv__education-card");
    education.dataset.cvSection = "education";
    education.append(create("h2", "", copy.educationTitle), create("strong", "", copy.education), create("p", "", copy.educationPeriod));

    const rightRail = create("aside", "full-cv__right-rail");
    rightRail.append(skills);
    leftRail.insertBefore(education, github);
    sheet.append(leftRail, career, rightRail);
    body.append(sheet);
    return body;
  };

  const technologyGroups = content.en.skills.map(([category, technologies], index) => ({
    category,
    names: technologies.split("|").map((name) => name.trim()).filter(Boolean),
    translations: content.pt.skills[index][1].split("|").map((name) => name.trim()).filter(Boolean)
  }));

  const technologyNames = technologyGroups.flatMap((group) => group.names);

  const createEmptyRatings = () => Object.fromEntries(technologyNames.map((name) => [name, null]));

  const normalizeRating = (level) => Number.isInteger(level) && level >= 1 && level <= 5 ? level : null;

  const downloadRatings = (ratings) => {
    const payload = { scale: 5, ratings: Object.fromEntries(technologyNames.map((name) => [name, normalizeRating(ratings[name])])) };
    const blob = new Blob([`${JSON.stringify(payload, null, 2)}\n`], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = create("a");
    anchor.href = url;
    anchor.download = "technology-proficiency.json";
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  const buildProficiencyView = (language, ratings, loaded, error, editing, onToggleEditing, onUpdate) => {
    const copy = content[language] || content.en;
    const labels = copy.proficiency;
    const body = create("div", "feature-app__body about-me-subtab technology-proficiency");
    const sheet = create("section", "technology-proficiency__sheet");
    const header = create("header", "technology-proficiency__header");
    const heading = create("div", "technology-proficiency__heading");
    heading.append(create("span", "feature-eyebrow", copy.eyebrow), create("h1", "", labels.title), create("p", "", labels.description));
    const headerActions = create("div", "technology-proficiency__actions");
    const toggle = create("button", "feature-button technology-proficiency__edit", editing ? labels.done : labels.edit);
    toggle.type = "button";
    toggle.disabled = !loaded;
    toggle.addEventListener("click", onToggleEditing);
    headerActions.append(toggle);
    if (editing) {
      const download = create("button", "feature-button feature-button--primary", labels.download);
      download.type = "button";
      download.addEventListener("click", () => downloadRatings(ratings));
      headerActions.append(download);
    }
    header.append(heading, headerActions);
    sheet.append(header);

    if (!loaded) {
      sheet.append(create("p", "technology-proficiency__notice", labels.loading));
      body.append(sheet);
      return body;
    }

    if (error) sheet.append(create("p", "technology-proficiency__notice", labels.loadError));
    if (editing) sheet.append(create("p", "technology-proficiency__notice technology-proficiency__notice--editing", labels.editNote));

    const groups = create("div", "technology-proficiency__groups");
    let ratedCount = technologyNames.filter((name) => normalizeRating(ratings[name]) !== null).length;

    for (const [index, group] of technologyGroups.entries()) {
      const section = create("section", "technology-proficiency__group");
      const title = create("h2", "", copy.skills[index][0]);
      const grid = create("div", "technology-proficiency__grid");
      section.append(title, grid);
      for (const [techIndex, name] of group.names.entries()) {
        const displayName = language === "pt" ? group.translations[techIndex] || name : name;
        const card = create("div", "technology-proficiency__item");
        const itemHeader = create("div", "technology-proficiency__item-heading");
        const label = create("strong", "", displayName);
        const grade = create("span", "technology-proficiency__grade");
        itemHeader.append(label, grade);
        const track = create("div", "technology-proficiency__track");
        track.setAttribute("aria-hidden", "true");
        const fill = create("span", "technology-proficiency__fill");
        track.append(fill);
        card.append(itemHeader, track);

        const setGrade = (value) => {
          const level = normalizeRating(value);
          grade.textContent = level === null ? labels.unrated : `${level}/5 · ${labels.levels[level]}`;
          fill.style.width = `${(level || 0) * 20}%`;
          card.classList.toggle("is-unrated", level === null);
        };

        setGrade(ratings[name]);

        if (editing) {
          const picker = create("select", "technology-proficiency__picker");
          picker.setAttribute("aria-label", `${displayName}: ${labels.title}`);
          for (let level = 0; level <= 5; level++) {
            const option = create("option", "", level === 0 ? labels.levels[0] : `${level}/5 · ${labels.levels[level]}`);
            option.value = String(level);
            picker.append(option);
          }
          picker.value = String(normalizeRating(ratings[name]) || 0);
          picker.addEventListener("change", () => {
            const before = normalizeRating(ratings[name]);
            const after = normalizeRating(Number(picker.value));
            onUpdate(name, after);
            if (before === null && after !== null) ratedCount++;
            if (before !== null && after === null) ratedCount--;
            setGrade(after);
            notice.hidden = ratedCount > 0;
          });
          card.append(picker);
        }
        grid.append(card);
      }
      groups.append(section);
    }

    const notice = create("p", "technology-proficiency__notice", labels.notPublished);
    notice.hidden = ratedCount > 0;
    sheet.append(notice, groups);
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

  const buildGitHubSummary = (copy, onOpenProjects) => {
    const section = create("section", "full-cv__section about-github-summary");
    const heading = create("div", "about-github-summary__heading");
    const headingCopy = create("div", "about-github-summary__heading-copy");
    headingCopy.append(create("h2", "", "GitHub Statistics"), create("p", "", "Repository and recent activity overview."));
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
    const projectsButton = create("button", "about-cv__projects-button", copy.actions.projects);
    projectsButton.type = "button";
    projectsButton.addEventListener("click", () => onOpenProjects?.());
    section.append(heading, widget, projectsButton);
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
    let ratings = createEmptyRatings();
    let ratingsLoaded = false;
    let ratingsError = false;
    let ratingsRequest = null;
    let editingRatings = false;
    const pane = create("div", "about-me-subtab-host");

    const renderTabs = () => {
      const existing = root.querySelector(":scope > .about-me-tabs");
      const tabs = sectionTabs(content[currentLanguage] || content.en, active, (target) => setTab(target, true));
      if (existing) existing.replaceWith(tabs);
      else root.prepend(tabs);
    };

    const clearCurrent = () => {
      if (typeof cleanup === "function") cleanup();
      cleanup = null;
    };

    const renderProficiency = () => {
      if (active !== "proficiency") return;
      pane.replaceChildren(buildProficiencyView(
        currentLanguage,
        ratings,
        ratingsLoaded,
        ratingsError,
        editingRatings,
        () => {
          editingRatings = !editingRatings;
          renderProficiency();
        },
        (name, level) => {
          ratings[name] = level;
        }
      ));
    };

    const loadRatings = () => {
      if (ratingsRequest) return;
      ratingsRequest = fetch("/.jsons/technology-proficiency.json", { cache: "no-store" })
        .then((response) => {
          if (!response.ok) throw new Error("Unable to load technology proficiency data");
          return response.json();
        })
        .then((payload) => {
          if (!payload || payload.scale !== 5 || !payload.ratings || typeof payload.ratings !== "object" || Array.isArray(payload.ratings)) {
            throw new Error("Invalid technology proficiency data");
          }
          ratings = Object.fromEntries(technologyNames.map((name) => [name, normalizeRating(payload.ratings[name])]));
        })
        .catch(() => {
          ratingsError = true;
        })
        .finally(() => {
          ratingsLoaded = true;
          renderProficiency();
          if (active === "about") {
            const list = pane.querySelector(".full-cv__skills");
            if (list) renderMainSkills(list, currentLanguage, ratings, ratingsLoaded, ratingsError);
          }
        });
    };

    function setTab(target, updateHistory = false) {
      const next = ["about", "proficiency", "projects"].includes(target) ? target : "about";
      if (updateHistory) {
        const path = { about: "/cv", proficiency: "/skills", projects: "/projects" }[next];
        if (location.pathname.replace(/\/$/, "") !== path) history.pushState({ portfolioTab: next }, "", path);
      }
      clearCurrent();
      active = next;
      renderTabs();

      if (next === "about") {
        const view = buildAboutView(currentLanguage, ratings, ratingsLoaded, ratingsError, () => setTab("projects", true));
        pane.replaceChildren(view);
        refreshGitHubStats(view);
        loadRatings();
        return;
      }

      if (next === "proficiency") {
        renderProficiency();
        loadRatings();
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
        const view = buildAboutView(currentLanguage, ratings, ratingsLoaded, ratingsError, () => setTab("projects", true));
        pane.replaceChildren(view);
        refreshGitHubStats(view);
      } else if (active === "proficiency") {
        renderProficiency();
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
