(() => {
  "use strict";

  const storageKey = "samael.portfolio.language.v1";
  const translations = {
  "Booting portfolio system": "A iniciar o sistema do portefólio",
  "Pompompurin is starting your system...": "Pompompurin está a iniciar o teu sistema...",
  "Pompompurin is restarting your system...": "Pompompurin está a reiniciar o teu sistema...",
  "Initializing session": "A iniciar sessão",
  "Loading user profile": "A carregar perfil do utilizador",
  "Starting desktop services": "A iniciar serviços do ambiente de trabalho",
  "Preparing the workspace": "A preparar o espaço de trabalho",
  "System ready": "Sistema pronto",
  "Stopping desktop services": "A parar serviços do ambiente de trabalho",
  "Closing active sessions": "A fechar sessões ativas",
  "Restarting server": "A reiniciar servidor",
  "Reconnecting": "A restabelecer ligação",
  "Server restart complete": "Reinício do servidor concluído",
  "You must be fun at parties": "Deves ser divertido nas festas",
  "Start": "Iniciar",
  "Desktop shortcuts": "Atalhos do ambiente de trabalho",
  "Contact Me": "Contacta-me",
  "CONTACT ME": "CONTACTA-ME",
  "Contact links": "Ligações de contacto",
  "GitHub profile": "Perfil no GitHub",
  "Steam profile": "Perfil na Steam",
  "Discord profile": "Perfil no Discord",
  "Pivity profile": "Perfil na Pivity",
  "GitHub Stats": "Estatísticas do GitHub",
  "Open GitHub profile": "Abrir perfil no GitHub",
  "GitHub since 2017": "No GitHub desde 2017",
  "Projects": "Projetos",
  "Stars": "Estrelas",
  "Followers": "Seguidores",
  "Top project": "Projeto principal",
  "Recent activity": "Atividade recente",
  "Open ↗": "Abrir ↗",
  "Latest release": "Versão mais recente",
  "Public GitHub data": "Dados públicos do GitHub",
  "Latest client reviews": "Avaliações mais recentes de clientes",
  "LATEST REVIEWS": "AVALIAÇÕES RECENTES",
  "CLIENT FEEDBACK": "FEEDBACK DE CLIENTES",
  "RECENT": "RECENTES",
  "Positive": "Positiva",
  "Taskbar": "Barra de tarefas",
  "Running applications": "Aplicações em execução",
  "Settings": "Definições",
  "Current time": "Hora atual",
  "All Programs": "Todos os Programas",
  "Pinned Programs": "Programas Fixados",
  "Search programs": "Pesquisar programas",
  "Search programs and projects": "Pesquisar programas e projetos",
  "Restart": "Reiniciar",
  "Shut Down": "Desligar",
  "Desktop settings": "Definições do ambiente de trabalho",
  "SETTINGS": "DEFINIÇÕES",
  "Close settings": "Fechar definições",
  "Wallpaper": "Papel de parede",
  "Music": "Música",
  "Music Volume": "Volume da música",
  "Language": "Idioma",
  "Website soundtrack": "Banda sonora do site",
  "Play website soundtrack": "Reproduzir banda sonora do site",
  "Pause website soundtrack": "Pausar banda sonora do site",
  "Website soundtrack position": "Posição da banda sonora do site",
  "Mute website soundtrack": "Silenciar banda sonora do site",
  "Unmute website soundtrack": "Ativar som da banda sonora do site",
  "Website soundtrack volume": "Volume da banda sonora do site",
  "PORTFOLIO": "PORTEFÓLIO",
  "PROJECTS": "PROJETOS",
  "UTILITIES": "UTILITÁRIOS",
  "Portfolio program": "Programa do portefólio",
  "Back": "Anterior",
  "Forward": "Seguinte",
  "Refresh": "Atualizar",
  "Home": "Início",
  "Address": "Endereço",
  "Go": "Ir",
  "Launch Game": "Iniciar Jogo",
  "Open Program": "Abrir Programa",
  "Genre": "Género",
  "Players": "Jogadores",
  "Game": "Jogo",
  "Program": "Programa",
  "item": "item",
  "items": "itens",
  "Application content unavailable.": "Conteúdo da aplicação indisponível.",
  "About Me": "Sobre Mim",
  "Work With Me": "Trabalha Comigo",
  "Games": "Jogos",
  "Creations": "Criações",
  "Other Creations": "Outras Criações",
  "Reviews": "Avaliações",
  "Recycle Bin": "Reciclagem",
  "Terminal": "Terminal",
  "Portfolio sections": "Secções do portefólio",
  "Linux Systems Administrator · DevOps · IT Operations": "Administrador de Sistemas Linux · DevOps · Operações de TI",
  "View Full Project List": "Ver Lista Completa de Projetos",
  "Professional Summary": "Resumo Profissional",
  "Linux Systems Administration, DevOps and IT Operations professional with hands-on experience in production environments, automation, containers, cloud, CI/CD, Infrastructure as Code, databases and technical support. Experienced in troubleshooting, ticket and incident resolution, Docker/Kubernetes, Terraform/Ansible, scripting and SQL/MySQL/MariaDB, with a focus on stability, automation, diagnosis and continuous operational improvement.": "Profissional de Administração de Sistemas Linux, DevOps e Operações de TI com experiência prática em ambientes de produção, automação, contentores, cloud, CI/CD, Infrastructure as Code, bases de dados e suporte técnico. Experiência em diagnóstico de problemas, resolução de tickets e incidentes, Docker/Kubernetes, Terraform/Ansible, scripting e SQL/MySQL/MariaDB, com foco em estabilidade, automação, diagnóstico e melhoria operacional contínua.",
  "What I Work With": "Tecnologias e Áreas",
  "Systems & Infrastructure": "Sistemas e Infraestrutura",
  "DevOps & Automation": "DevOps e Automação",
  "Data & Troubleshooting": "Dados e Diagnóstico",
  "Production Support": "Suporte de Produção",
  "Ticket Resolution": "Resolução de Tickets",
  "Incident Resolution": "Resolução de Incidentes",
  "Technical Documentation": "Documentação Técnica",
  "Cloud & Networking": "Cloud e Redes",
  "Reverse Proxies": "Proxies Inversos",
  "Programming & Scripting": "Programação e Scripting",
  "Operations & Tools": "Operações e Ferramentas",
  "Requirements Management": "Gestão de Requisitos",
  "Process Improvement": "Melhoria de Processos",
  "Professional Experience": "Experiência Profissional",
  "2018 — Present": "2018 — Presente",
  "Technical Systems Administrator & Software Developer": "Administrador Técnico de Sistemas e Programador de Software",
  "Administration, troubleshooting and optimization of production systems; Docker and Kubernetes environments; backend applications with MySQL and MariaDB; automation and scripting in Python and Lua; deployments, testing, documentation and long-term client support.": "Administração, diagnóstico e otimização de sistemas de produção; ambientes Docker e Kubernetes; aplicações backend com MySQL e MariaDB; automação e scripting em Python e Lua; deployments, testes, documentação e suporte prolongado a clientes.",
  "Business Customer Consultant": "Consultor de Clientes Empresariais",
  "Management and resolution of business-customer requests, tickets and escalations, with prioritisation, SLA-aware follow-up, accurate case records and cross-team problem solving.": "Gestão e resolução de pedidos, tickets e escalamentos de clientes empresariais, com priorização, acompanhamento orientado a SLA, registos rigorosos e resolução de problemas entre equipas.",
  "Technical Systems & Online Communities Administrator": "Administrador de Sistemas Técnicos e Comunidades Online",
  "Technical services for three large North American communities across multiple games and servers, including server and database administration, production troubleshooting, code optimization, updates and recurring issue management.": "Serviços técnicos para três grandes comunidades norte-americanas em vários jogos e servidores, incluindo administração de servidores e bases de dados, diagnóstico em produção, otimização de código, atualizações e gestão de problemas recorrentes.",
  "Web Administrator & Digital Analyst": "Administrador Web e Analista Digital",
  "Technical administration of websites and digital platforms, availability, traffic and user-behaviour analysis, SEO improvements, data management, implementation, testing and maintenance.": "Administração técnica de websites e plataformas digitais, análise de disponibilidade, tráfego e comportamento de utilizadores, melhorias de SEO, gestão de dados, implementação, testes e manutenção.",
  "Operations Administrative Assistant": "Assistente Administrativo de Operações",
  "Data processing and validation, quality control, testing of client tools, results analysis, reporting, process improvement and requirements clarification across operational workflows.": "Processamento e validação de dados, controlo de qualidade, testes de ferramentas de cliente, análise de resultados, reporting, melhoria de processos e clarificação de requisitos em fluxos operacionais.",
  "Education": "Formação",
  "Bachelor's Degree in Anthropology": "Licenciatura em Antropologia",
  "NOVA FCSH · September 2019 — June 2022": "NOVA FCSH · setembro de 2019 — junho de 2022",
  "Languages": "Idiomas",
  "Portuguese": "Português",
  "English": "Inglês",
  "Spanish": "Espanhol",
  "PROJECT LIST": "LISTA DE PROJETOS",
  "Current and past work in a CV-style format. Maintained projects are separated from the legacy archive so the list can grow without changing the layout.": "Trabalho atual e anterior num formato semelhante a CV. Os projetos mantidos estão separados do arquivo legado para permitir que a lista cresça sem alterar o layout.",
  "Project lifecycle": "Ciclo de vida do projeto",
  "Work Done": "Trabalho Realizado",
  "No projects in this section": "Sem projetos nesta secção",
  "Add a project to PORTFOLIO_DATA with the matching lifecycle value and it will appear here automatically.": "Adiciona um projeto a PORTFOLIO_DATA com o ciclo de vida correspondente e será apresentado aqui automaticamente.",
  "David Barata / Samael": "David Barata / Samael",
  "Core Skills": "Competências Principais",
  "Production systems, containers, backend/database work, automation, deployments and international client support.": "Sistemas de produção, contentores, trabalho backend/base de dados, automação, deployments e suporte internacional a clientes.",
  "Ticket resolution, escalations, prioritisation, accurate case tracking and cross-team problem solving.": "Resolução de tickets, escalamentos, priorização, acompanhamento rigoroso de casos e resolução de problemas entre equipas.",
  "Multi-game server infrastructure, databases, production troubleshooting, updates and maintenance.": "Infraestrutura de servidores para vários jogos, bases de dados, diagnóstico em produção, atualizações e manutenção.",
  "Data processing, QA, testing, reporting, requirements and operational problem solving.": "Processamento de dados, QA, testes, reporting, requisitos e resolução de problemas operacionais.",
  "BA Anthropology · NOVA FCSH · 2019 — 2022": "Licenciatura em Antropologia · NOVA FCSH · 2019 — 2022",
  "Portuguese C2 · English C2 · Spanish B2": "Português C2 · Inglês C2 · Espanhol B2",
  "View Projects": "Ver Projetos",
  "OPPORTUNITIES": "OPORTUNIDADES",
  "Choose the context that fits: professional roles or game-related freelance work.": "Escolhe o contexto adequado: funções profissionais ou trabalho freelance relacionado com jogos.",
  "Job Recruiters": "Recrutadores",
  "Freelance Work": "Trabalho Freelance",
  "JOB RECRUITERS": "RECRUTADORES",
  "Linux · DevOps · IT Operations · Data / SQL · Support": "Linux · DevOps · Operações de TI · Dados / SQL · Suporte",
  "Roles I'm Looking For": "Funções que Procuro",
  "Linux Systems Administration": "Administração de Sistemas Linux",
  "DevOps / Infrastructure": "DevOps / Infraestrutura",
  "Ticket / Incident Resolution": "Resolução de Tickets / Incidentes",
  "SQL / Data Operations": "SQL / Operações de Dados",
  "Core Experience": "Experiência Principal",
  "Open to appropriate remote and on-site opportunities": "Disponível para oportunidades adequadas, remotas ou presenciais",
  "Email Me": "Enviar Email",
  "FREELANCE WORK": "TRABALHO FREELANCE",
  "Game Development · Server Infrastructure · Technical Support": "Desenvolvimento de Jogos · Infraestrutura de Servidores · Suporte Técnico",
  "I take game-related technical work where the scope and requirements can be clearly defined. This includes development, server setup, optimization and ongoing support. Pricing is based on the actual work required so rates remain fair to both sides.": "Aceito trabalho técnico relacionado com jogos quando o âmbito e os requisitos podem ser definidos com clareza. Inclui desenvolvimento, configuração de servidores, otimização e suporte contínuo. O preço baseia-se no trabalho efetivamente necessário para manter valores justos para ambas as partes.",
  "Garry's Mod Development": "Desenvolvimento para Garry's Mod",
  "GLua development": "Desenvolvimento GLua",
  "Framework and system work": "Trabalho em frameworks e sistemas",
  "Existing codebase work": "Trabalho em bases de código existentes",
  "Debugging and optimization": "Debugging e otimização",
  "Custom gameplay systems": "Sistemas de gameplay personalizados",
  "Server setup and configuration": "Instalação e configuração de servidores",
  "Modded environments": "Ambientes com mods",
  "Maintenance and updates": "Manutenção e atualizações",
  "Troubleshooting": "Diagnóstico de problemas",
  "Database and performance work": "Trabalho em bases de dados e desempenho",
  "Game Server Hosting": "Alojamento de Servidores de Jogos",
  "Linux server deployment": "Deployment de servidores Linux",
  "Docker / container environments": "Ambientes Docker / contentores",
  "Databases and backups": "Bases de dados e backups",
  "Networking and reverse proxies": "Redes e proxies inversos",
  "Custom Infrastructure": "Infraestrutura Personalizada",
  "Migrations and optimization": "Migrações e otimização",
  "Performance problems": "Problemas de desempenho",
  "Database issues": "Problemas de base de dados",
  "Automation and deployment": "Automação e deployment",
  "Ongoing technical support": "Suporte técnico contínuo",
  "Pricing": "Preços",
  "Quoted per project based on scope, complexity and expected support. I prefer work-specific pricing so the rate stays fair for both sides.": "Orçamento por projeto com base no âmbito, complexidade e suporte esperado. Prefiro preços ajustados ao trabalho para manter um valor justo para ambas as partes.",
  "Discuss a Project": "Falar sobre um Projeto",
  "Review page": "Página de avaliações",
  "No reviews found": "Nenhuma avaliação encontrada",
  "Sort": "Ordenar",
  "Filter": "Filtrar",
  "Newest": "Mais recentes",
  "Oldest": "Mais antigas",
  "All": "Todas",
  "Previous": "Anterior",
  "Next": "Seguinte",
  "Select a program to view its description.": "Seleciona um programa para ver a respetiva descrição.",
  "Status": "Estado",
  "Removed": "Removido",
  "EXTERNAL DESTINATION": "DESTINO EXTERNO",
  "This destination is integrated into the portfolio's shared navigation layer.": "Este destino está integrado na navegação partilhada do portefólio.",
  "Destination configured": "Destino configurado",
  "Destination not configured": "Destino não configurado",
  "No verified URL was present in the supplied repositories, so no URL has been guessed.": "Não foi encontrado um URL verificado nos repositórios fornecidos, por isso não foi inferido qualquer endereço.",
  "URL not configured": "URL não configurado",
  "Open project case study": "Abrir estudo de caso do projeto",
  "Search creations and documentation": "Pesquisar criações e documentação",
  "Close search": "Fechar pesquisa",
  "Search": "Pesquisar",
  "No results": "Sem resultados",
  "Samael Portfolio Terminal": "Terminal do Portefólio Samael",
  "Welcome to Samael's portfolio terminal.": "Bem-vindo ao terminal do portefólio de Samael.",
  "Welcome to Samael's portfolio terminal. Type 'help' to explore.": "Bem-vindo ao terminal do portefólio de Samael. Escreve 'help' para explorar.",
  "Action is unavailable.": "A ação não está disponível.",
  "Terminal command": "Comando do terminal",
  "Open": "Abrir",
  "Portfolio command palette": "Paleta de comandos do portefólio",
  "Search projects, apps, creations, games, skills, or commands": "Pesquisar projetos, aplicações, criações, jogos, competências ou comandos",
  "Search portfolio commands": "Pesquisar comandos do portefólio",
  "No matching portfolio item.": "Nenhum item correspondente no portefólio.",
  "Featured commands": "Comandos em destaque",
  "navigate": "navegar",
  "open": "abrir",
  "close": "fechar",
  "No matching creations found.": "Nenhuma criação correspondente encontrada.",
  "results": "resultados",
  "result": "resultado",
  "Copy code": "Copiar código",
  "Restart profile sound": "Reiniciar som do perfil",
  "Play profile sound": "Reproduzir som do perfil",
  "Portfolio page": "Página do portefólio",
  "Featured commands · ↑↓ navigate · Enter open · Esc close": "Comandos em destaque · ↑↓ navegar · Enter abrir · Esc fechar",
  "Project": "Projeto",
  "Application": "Aplicação",
  "Creation": "Criação",
  "External": "Externo",
  "Item": "Item",
  "Page": "Página",
  "Definitely deleted software": "Software definitivamente eliminado",
  "Professional profile, full resume, skills, experience, education, and contact": "Perfil profissional, CV completo, competências, experiência, formação e contacto",
  "Client feedback and reputation": "Feedback de clientes e reputação",
  "Visual Garry's Mod Derma UI builder and Lua generator": "Editor visual de interfaces Derma para Garry's Mod e gerador Lua",
  "Static Project Gutenberg reader": "Leitor estático do Project Gutenberg",
  "Browser-based voxel client": "Cliente voxel baseado no browser",
  "Generated development library": "Biblioteca de desenvolvimento gerada",
  "Video demonstrations and creations outside the main module library": "Demonstrações em vídeo e criações fora da biblioteca principal de módulos",
  "Maintained and legacy projects in CV format": "Projetos mantidos e legados em formato de CV",
  "Job recruiter information and game-related freelance services": "Informação para recrutadores e serviços freelance relacionados com jogos",
  "Lilia Framework documentation": "Documentação da Lilia Framework",
  "A folder containing the desktop game collection": "Pasta com a coleção de jogos do ambiente de trabalho",
};
  const reverseTranslations = Object.fromEntries(Object.entries(translations).map(([en, pt]) => [pt, en]));
  const textOrigins = new WeakMap();
  const attributeOrigins = new WeakMap();
  const supported = new Set(["en", "pt"]);
  const normalizeLanguage = (value) => String(value || "").toLowerCase().startsWith("pt") ? "pt" : "en";
  let language = normalizeLanguage(localStorage.getItem(storageKey) || "en");

  const translateBase = (source, targetLanguage) => {
    if (targetLanguage === "pt") return translations[source] || source;
    return reverseTranslations[source] || source;
  };

  const translatePattern = (source, targetLanguage) => {
    const exact = translateBase(source, targetLanguage);
    if (exact !== source) return exact;
    if (targetLanguage === "en") return source;

    let match = source.match(/^Open (.+): (.+)$/);
    if (match) return `Abrir ${translateBase(match[1], "pt")}: ${translateBase(match[2], "pt")}`;
    match = source.match(/^Open (.+)$/);
    if (match) return `Abrir ${translateBase(match[1], "pt")}`;
    match = source.match(/^Minimize (.+)$/);
    if (match) return `Minimizar ${translateBase(match[1], "pt")}`;
    match = source.match(/^Maximize (.+)$/);
    if (match) return `Maximizar ${translateBase(match[1], "pt")}`;
    match = source.match(/^Restore (.+)$/);
    if (match) return `Restaurar ${translateBase(match[1], "pt")}`;
    match = source.match(/^Close (.+)$/);
    if (match) return `Fechar ${translateBase(match[1], "pt")}`;
    match = source.match(/^(\d+) items$/);
    if (match) return `${match[1]} itens`;
    match = source.match(/^(\d+) item$/);
    if (match) return `${match[1]} item`;
    match = source.match(/^(\d+) RECENT$/);
    if (match) return `${match[1]} RECENTES`;
    match = source.match(/^Showing (.+) of (\d+) reviews$/);
    if (match) return `A mostrar ${match[1]} de ${match[2]} avaliações`;
    match = source.match(/^Review page (\d+)$/);
    if (match) return `Página de avaliações ${match[1]}`;
    match = source.match(/^(\d+) result(s?) · ↑↓ navigate · Enter open · Esc close$/);
    if (match) return `${match[1]} ${match[1] === "1" ? "resultado" : "resultados"} · ↑↓ navegar · Enter abrir · Esc fechar`;
    match = source.match(/^Open (.+) ↗$/);
    if (match) return `Abrir ${translateBase(match[1], "pt")} ↗`;
    match = source.match(/^Public GitHub data · (.+)$/);
    if (match) return `Dados públicos do GitHub · ${match[1]}`;
    match = source.match(/^GitHub since (.+)$/);
    if (match) return `No GitHub desde ${match[1]}`;
    return source;
  };

  const translate = (value, targetLanguage = language) => translatePattern(String(value ?? ""), normalizeLanguage(targetLanguage));

  const shouldSkip = (node) => {
    const parent = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
    if (!parent) return true;
    return Boolean(parent.closest("script, style, noscript, [data-i18n-skip], .desktop-latest-review-widget__item p"));
  };

  const localizeTextNode = (node) => {
    if (shouldSkip(node)) return;
    const value = node.nodeValue || "";
    if (!value.trim()) return;
    if (!textOrigins.has(node)) textOrigins.set(node, value);
    const original = textOrigins.get(node);
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    const core = original.slice(leading.length, original.length - trailing.length || undefined);
    const nextValue = `${leading}${translate(core)}${trailing}`;
    if (node.nodeValue !== nextValue) node.nodeValue = nextValue;
  };

  const localizeAttributes = (element) => {
    if (shouldSkip(element)) return;
    const names = ["aria-label", "placeholder", "title"];
    let originals = attributeOrigins.get(element);
    if (!originals) {
      originals = new Map();
      attributeOrigins.set(element, originals);
    }
    for (const name of names) {
      if (!element.hasAttribute(name)) continue;
      if (!originals.has(name)) originals.set(name, element.getAttribute(name) || "");
      element.setAttribute(name, translate(originals.get(name)));
    }
  };

  const localizeNode = (root) => {
    if (!root || shouldSkip(root)) return;
    if (root.nodeType === Node.TEXT_NODE) {
      localizeTextNode(root);
      return;
    }
    if (root.nodeType !== Node.ELEMENT_NODE && root.nodeType !== Node.DOCUMENT_NODE && root.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) return;
    if (root.nodeType === Node.ELEMENT_NODE) localizeAttributes(root);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT);
    let node = walker.nextNode();
    while (node) {
      if (node.nodeType === Node.TEXT_NODE) localizeTextNode(node);
      else localizeAttributes(node);
      node = walker.nextNode();
    }
  };

  const languageMeta = {
    en: { code: "ENG", label: "English (United States)" },
    pt: { code: "POR", label: "Português (Portugal)" }
  };

  const closeLanguagePickers = (except = null) => {
    for (const picker of document.querySelectorAll("[data-language-picker]")) {
      if (picker === except) continue;
      const toggle = picker.querySelector("[data-language-picker-toggle]");
      const menu = picker.querySelector("[data-language-menu]");
      if (menu) menu.hidden = true;
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      picker.classList.remove("is-open");
    }
  };

  const setLanguagePickerOpen = (picker, open) => {
    if (!picker) return;
    if (open) closeLanguagePickers(picker);
    const toggle = picker.querySelector("[data-language-picker-toggle]");
    const menu = picker.querySelector("[data-language-menu]");
    if (menu) menu.hidden = !open;
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    picker.classList.toggle("is-open", open);
  };

  const updateLanguageControls = () => {
    const meta = languageMeta[language] || languageMeta.en;
    for (const button of document.querySelectorAll("[data-portfolio-language]")) {
      const active = button.dataset.portfolioLanguage === language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
      if (button.hasAttribute("aria-pressed")) button.setAttribute("aria-pressed", String(active));
    }
    for (const element of document.querySelectorAll("[data-language-current-code]")) {
      if (element.textContent !== meta.code) element.textContent = meta.code;
    }
    for (const element of document.querySelectorAll("[data-language-current-label]")) {
      if (element.textContent !== meta.label) element.textContent = meta.label;
    }
  };

  const setLanguage = (nextLanguage, persist = true) => {
    const normalized = normalizeLanguage(nextLanguage);
    if (!supported.has(normalized)) return;
    language = normalized;
    if (persist) localStorage.setItem(storageKey, language);
    document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
    localizeNode(document.body);
    updateLanguageControls();
    window.dispatchEvent(new CustomEvent("portfolio:language-changed", { detail: { language } }));
  };

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const toggle = event.target.closest("[data-language-picker-toggle]");
    if (toggle) {
      const picker = toggle.closest("[data-language-picker]");
      setLanguagePickerOpen(picker, toggle.getAttribute("aria-expanded") !== "true");
      return;
    }
    const button = event.target.closest("[data-portfolio-language]");
    if (button) {
      setLanguage(button.dataset.portfolioLanguage || "en");
      closeLanguagePickers();
      return;
    }
    if (!event.target.closest("[data-language-picker]")) closeLanguagePickers();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeLanguagePickers();
  });

  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "characterData") {
        const original = textOrigins.get(mutation.target);
        const current = mutation.target.nodeValue || "";
        if (!original || current !== translate(original)) {
          textOrigins.set(mutation.target, current);
          localizeTextNode(mutation.target);
        }
        continue;
      }
      if (mutation.type === "attributes" && mutation.target instanceof Element) {
        const name = mutation.attributeName;
        if (!name) continue;
        let originals = attributeOrigins.get(mutation.target);
        if (!originals) {
          originals = new Map();
          attributeOrigins.set(mutation.target, originals);
        }
        const current = mutation.target.getAttribute(name) || "";
        const original = originals.get(name);
        if (original === undefined || current !== translate(original)) {
          originals.set(name, current);
          localizeAttributes(mutation.target);
        }
        continue;
      }
      for (const node of mutation.addedNodes) localizeNode(node);
    }
    updateLanguageControls();
  });

  window.PortfolioI18n = {
    get language() { return language; },
    t: translate,
    setLanguage,
    localizeNode
  };

  setLanguage(language, false);
  observer.observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["aria-label", "placeholder", "title"] });
})();
