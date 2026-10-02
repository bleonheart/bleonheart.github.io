(() => {
  "use strict";

  const statusLabels = {
    "active-development": "Active Development",
    maintained: "Maintained",
    experimental: "Experimental",
    completed: "Completed",
    "on-hold": "On Hold",
    legacy: "Legacy",
    labs: "Labs",
    games: "Games",
    tools: "Tools",
    archived: "Archived"
  };

  const destinations = {
    github: { label: "GitHub", url: "https://github.com/bleonheart" },
    steam: { label: "Steam", url: "https://steamcommunity.com/id/samaelleonheart/" },
    discord: { label: "Discord", url: "https://discord.com/users/245205823909789706" },
    pivity: { label: "Pivity", url: "https://www.gmodstore.com/users/liliaplayer" },
    linkedin: { label: "LinkedIn", url: "https://linkedin.com/in/davidmpbarata" },
    lilia: { label: "Lilia Framework", url: "https://github.com/LiliaFramework/" },
    "lilia-repository": { label: "Lilia Repository", url: "https://github.com/LiliaFramework/Lilia" },
    portfolio: { label: "Portfolio", url: "https://bleonheart.github.io/" }
  };

  const projects = [
    {
      id: "lilia",
      name: "Lilia Framework",
      summary: "A modular roleplay framework for Garry's Mod designed around extensibility, maintainability, reusable systems and long-term server development.",
      status: "maintained",
      category: "Garry's Mod · Framework",
      technologies: ["GLua", "Lua", "SQL", "Garry's Mod", "GitHub Actions"],
      lifecycle: "maintained",
      work: [
        "Framework architecture and core development",
        "Modular systems and developer APIs",
        "Database persistence and data handling",
        "Networking and server/client systems",
        "CI/CD and release workflows",
        "Documentation and long-term maintenance"
      ],
      links: [
        { label: "Repository", destination: "lilia-repository" },
        { label: "Documentation", destination: "lilia" }
      ]
    },
    {
      id: "project-fantasia",
      name: "Project Fantasia",
      summary: "A game-development project built with Unity 6.6 and focused on custom gameplay systems.",
      status: "games",
      category: "Game · Unity",
      technologies: ["Unity 6.6", "Game Systems"],
      lifecycle: "games",
      work: [
        "Unity 6.6 project development",
        "Gameplay systems and mechanics"
      ],
      links: []
    },
    {
      id: "deploy-or-die",
      name: "Deploy or Die",
      summary: "A browser-based DevOps and SRE strategy game built around production operations, incident response, reliability, automation and deployment engineering.",
      status: "games",
      category: "Game · DevOps / SRE Simulation",
      technologies: ["JavaScript", "HTML", "CSS", "GitHub Actions", "GitHub Pages"],
      lifecycle: "games",
      githubRepository: "bleonheart/Deploy-Or-Die",
      work: [
        "Production traffic, capacity and reliability simulation",
        "Incident response, deployment health and rollback mechanics",
        "Automation, CI/CD maturity and operational upgrade systems",
        "Static browser deployment through GitHub Actions and GitHub Pages"
      ],
      links: [
        { label: "Repository", url: "https://github.com/bleonheart/Deploy-Or-Die" },
        { label: "Play", url: "https://bleonheart.github.io/Deploy-Or-Die/" }
      ]
    },
    {
      id: "voxelith",
      name: "Voxelith",
      summary: "An actively developed browser-based voxel client distributed as a self-contained static build with its own launcher and branding.",
      status: "games",
      category: "Game · Browser Voxel Client",
      technologies: ["HTML", "Browser Runtime", "Static Hosting", "GitHub Pages"],
      lifecycle: "games",
      githubRepository: "bleonheart/Voxelith",
      work: [
        "Voxelith-branded browser launcher",
        "Automatic startup and packaged browser runtime",
        "Self-contained static deployment with no runtime backend",
        "Portable hosting through GitHub Pages or conventional web servers"
      ],
      links: [
        { label: "Repository", url: "https://github.com/bleonheart/Voxelith" },
        { label: "Play", url: "https://bleonheart.github.io/Voxelith/" }
      ]
    },
    {
      id: "codex",
      name: "Codex",
      summary: "A deploy-time Project Gutenberg digital library and reader built for static hosting, offline-friendly reading and automated catalog generation.",
      status: "tools",
      category: "Tool · Static Digital Library",
      technologies: ["Python", "HTML", "JavaScript", "GitHub Actions", "GitHub Pages", "IndexedDB"],
      lifecycle: "tools",
      githubRepository: "bleonheart/Codex",
      work: [
        "Automated Gutenberg catalog and book ingestion during deployment",
        "Searchable static library with compressed book storage",
        "Offline-capable reader with local progress and saved books",
        "Scheduled GitHub Actions builds and GitHub Pages deployment"
      ],
      links: [
        { label: "Repository", url: "https://github.com/bleonheart/Codex" },
        { label: "Open Tool", url: "https://bleonheart.github.io/Codex/" }
      ]
    },
    {
      id: "assemblia",
      name: "Assemblia",
      summary: "A desktop utility for merging, cleaning, benchmarking and splitting large Garry's Mod addon collections into deployment-ready content packs.",
      status: "tools",
      category: "Tool · Garry's Mod Content Pipeline",
      technologies: ["Python", "PySide6", "Garry's Mod", "Source Engine"],
      lifecycle: "tools",
      githubRepository: "bleonheart/Assemblia",
      work: [
        "Addon collection merge and duplicate handling",
        "Content cleanup and Lua separation workflows",
        "Size-limited deployment pack generation",
        "Collection benchmarking and persistent desktop settings"
      ],
      links: [
        { label: "Repository", url: "https://github.com/bleonheart/Assemblia" }
      ]
    },
    {
      id: "codexia",
      name: "Codexia",
      summary: "A collection of standalone GLua and Garry's Mod developer utilities for code analysis, cleanup, documentation, localization and asset-processing workflows.",
      status: "tools",
      category: "Tool · GLua Developer Toolkit",
      technologies: ["Python", "GLua", "Lua", "Garry's Mod", "Source Engine"],
      lifecycle: "tools",
      githubRepository: "bleonheart/Codexia",
      work: [
        "GLua code analysis, cleanup and transformation utilities",
        "Hook and documentation discovery and maintenance",
        "Localization and networking workflow automation",
        "Source-engine asset and addon content processing"
      ],
      links: [
        { label: "Repository", url: "https://github.com/bleonheart/Codexia" }
      ]
    },
    {
      id: "samael-assets",
      name: "Samael Assets",
      summary: "A centralized shared media library and browser for images, audio, interface resources, documentation assets and reusable static project content.",
      status: "tools",
      category: "Tool · Shared Asset Library",
      technologies: ["HTML", "JavaScript", "GitHub Pages", "Static Assets"],
      lifecycle: "tools",
      githubRepository: "bleonheart/Samael-Assets",
      work: [
        "Shared image and audio library for multiple projects",
        "Browser-based media discovery and navigation",
        "Stable direct-link asset hosting through GitHub Pages",
        "Reusable branding, documentation and interface resources"
      ],
      links: [
        { label: "Repository", url: "https://github.com/bleonheart/Samael-Assets" },
        { label: "Asset Browser", url: "https://bleonheart.github.io/Samael-Assets/" }
      ]
    },
    {
      id: "derma-creator",
      name: "Derma Creator",
      summary: "A visual Garry's Mod Derma UI builder with project import/export and Lua generation.",
      status: "legacy",
      category: "Garry's Mod · Developer Tool",
      technologies: ["JavaScript", "React", "GLua", "Vite"],
      lifecycle: "legacy",
      work: [
        "Component-based visual interface editor",
        "Project serialization and import/export workflows",
        "Lua import parsing",
        "Generated GLua output",
        "Portfolio integration and deployment"
      ],
      links: [{ label: "Open Tool", action: { type: "open-app", target: "derma-creator" } }]
    },
    {
      id: "legacy-creations",
      name: "Garry's Mod Modules & Creations",
      summary: "An archive of Garry's Mod modules, systems and experiments built across previous projects and communities.",
      status: "legacy",
      category: "Garry's Mod · Archive",
      technologies: ["GLua", "Lua", "SQL", "Garry's Mod"],
      lifecycle: "legacy",
      work: [
        "Gameplay and roleplay systems",
        "Reusable modules and server-side tooling",
        "Database-backed features",
        "Maintenance of historical work for reference"
      ],
      links: [{ label: "Browse Creations", action: { type: "open-app", target: "creations" } }]
    }
  ];

  const games = [
    ["tetris", "Tetris", "Puzzle"], ["pong", "Pong", "Arcade"], ["minesweeper", "Minesweeper", "Puzzle"],
    ["solitaire", "Solitaire", "Card"], ["snake", "Snake", "Arcade"], ["breakout", "Breakout", "Arcade"],
    ["asteroids", "Asteroids", "Arcade"], ["sokoban", "Sokoban", "Puzzle"], ["chess", "Chess", "Strategy"],
    ["pinball", "Pinball", "Arcade"], ["memory", "Memory", "Puzzle"], ["lunar-lander", "Lunar Lander", "Arcade"],
    ["epoch-siege", "Epoch Siege", "Strategy"]
  ].map(([id, name, genre]) => ({ id, name, genre, icon: `/assets/games/${id}/logo.svg` }));

  const applications = [
    { id: "terminal", label: "Terminal", windowTitle: "Portfolio Terminal", description: "Keyboard-first portfolio navigation", category: "system", icon: { type: "local", src: "/assets/icons/terminal.svg" }, kind: "program", initial: { width: 980, height: 680, x: 260, y: 90 }, minWidth: 560, minHeight: 420, resizable: true, defaultOpen: false, desktopShortcut: true, desktopGroup: "utilities", desktopOrder: 1, startMenu: true },
  ];

  const conversations = {
    root: { message: "What would you like to see?", choices: [
      { label: "My best work", next: "best-work" }, { label: "Maintained projects", next: "current" }, { label: "Older projects", next: "legacy" },
      { label: "About Samael", next: "about" }, { label: "Garry's Mod / GLua", next: "gmod" }, { label: "Games", next: "games" },
      { label: "Tools", next: "tools" }, { label: "Labs", action: { type: "open-projects-filter", target: "labs" } }, { label: "Skills", next: "skills" }, { label: "Links and destinations", next: "destinations" }, { label: "Work with Samael", action: { type: "open-app", target: "work-with-me" } },
      { label: "Something fun", next: "fun" }
    ] },
    "best-work": { message: "These are the projects highlighted first in the portfolio.", choices: [
      { label: "Lilia Framework", action: { type: "open-project", target: "lilia" } }, { label: "Project Fantasia", action: { type: "open-project", target: "project-fantasia" } },
      { label: "Derma Creator", action: { type: "open-project", target: "derma-creator" } }, { label: "Back", next: "root" }
    ] },
    current: { message: "Maintained work is separated from the historical archive.", choices: [{ label: "Browse maintained projects", action: { type: "open-projects-filter", target: "maintained" } }, { label: "Back", next: "root" }] },
    legacy: { message: "Older work stays available without crowding the main project list.", choices: [{ label: "Browse legacy projects", action: { type: "open-projects-filter", target: "legacy" } }, { label: "Creations archive", action: { type: "open-app", target: "creations" } }, { label: "Back", next: "root" }] },
    about: { message: "David Barata's CV focuses on Linux Systems Administration, DevOps and IT Operations, with hands-on production experience across automation, containers, cloud, CI/CD, Infrastructure as Code, databases, networking, troubleshooting and technical support.", choices: [{ label: "About Me", action: { type: "open-app", target: "about-me" } }, { label: "Reviews", action: { type: "open-app", target: "about" } }, { label: "Infrastructure / DevOps", next: "infrastructure" }, { label: "Back", next: "root" }] },
    infrastructure: { message: "The CV highlights Linux and Windows administration, Docker and Kubernetes, Terraform and Ansible, AWS/Azure/GCP, CI/CD, SQL/MySQL/MariaDB, networking, security, troubleshooting, incident resolution and production support.", choices: [{ label: "Work With Me", action: { type: "open-app", target: "work-with-me" } }, { label: "About Me", action: { type: "open-app", target: "about-me" } }, { label: "Back", next: "about" }] },
    gmod: { message: "The strongest Garry's Mod work centers on Lilia, Derma tooling, and the larger creation library.", choices: [{ label: "Lilia", action: { type: "open-project", target: "lilia" } }, { label: "Derma Creator", action: { type: "open-app", target: "derma-creator" } }, { label: "Creations", action: { type: "open-app", target: "creations" } }, { label: "Back", next: "root" }] },
    games: { message: "Game projects include Project Fantasia, Deploy or Die and Voxelith, alongside the desktop collection of playable portfolio games.", choices: [{ label: "Browse game projects", action: { type: "open-projects-filter", target: "games" } }, { label: "Project Fantasia", action: { type: "open-project", target: "project-fantasia" } }, { label: "Deploy or Die", action: { type: "open-project", target: "deploy-or-die" } }, { label: "Voxelith", action: { type: "open-project", target: "voxelith" } }, { label: "Open desktop games", action: { type: "open-app", target: "games-folder" } }, { label: "Back", next: "root" }] },
    tools: { message: "Standalone tools cover reading and content delivery, Garry's Mod collection processing, GLua development automation and shared project assets.", choices: [{ label: "Browse tools", action: { type: "open-projects-filter", target: "tools" } }, { label: "Codex", action: { type: "open-project", target: "codex" } }, { label: "Assemblia", action: { type: "open-project", target: "assemblia" } }, { label: "Codexia", action: { type: "open-project", target: "codexia" } }, { label: "Samael Assets", action: { type: "open-project", target: "samael-assets" } }, { label: "Back", next: "root" }] },
    skills: { message: "The CV emphasizes Linux systems, DevOps, CI/CD and IaC, cloud infrastructure, SQL and data operations, networking and security, production support, troubleshooting, Python/Lua scripting and technical documentation.", choices: [{ label: "About Me", action: { type: "open-app", target: "about-me" } }, { label: "About Samael", next: "about" }, { label: "Back", next: "root" }] },
    destinations: { message: "These destinations are wired through the same trusted configuration used by the rest of the desktop.", choices: [{ label: "Lilia Framework ↗", action: { type: "open-external", target: "lilia" } }, { label: "GitHub ↗", action: { type: "open-external", target: "github" } }, { label: "Back", next: "root" }] },
    fun: { message: "You found the pudding route.", choices: [{ label: "Play a random game", action: { type: "random-game" } }, { label: "Open Terminal", action: { type: "open-app", target: "terminal" } }, { label: "Back", next: "root" }] }
  };

  const data = { version: "3.0", statusLabels, destinations, projects, games, applications, conversations };
  window.PORTFOLIO_DATA = data;

  const commandEntries = [
    ...applications.map((app) => ({ id: `app-${app.id}`, type: "Application", title: app.label, description: app.description, keywords: [app.category, app.id], icon: app.icon, action: { type: "open-app", target: app.id } })),
    ...projects.map((project) => ({ id: `project-${project.id}`, type: "Project", title: project.name, description: project.summary, keywords: [project.category, project.lifecycle, statusLabels[project.status], ...project.technologies], icon: { type: "image", src: project.logo || "/assets/icons/projects.svg" }, action: { type: "open-project", target: project.id } })),
    ...games.map((game) => ({ id: `game-${game.id}`, type: "Game", title: game.name, description: `${game.genre} desktop game`, keywords: [game.genre, "game", game.id], icon: { type: "image", src: game.icon }, action: { type: "launch-game", target: game.id } })),
    { id: "app-about-me", type: "Application", title: "About Me", description: "Linux Systems Administration, DevOps and IT Operations CV and technical background", keywords: ["cv", "resume", "linux", "devops", "it operations", "systems administration", "production support", "skills", "david barata", "samael"], action: { type: "open-app", target: "about-me" } },
    { id: "app-reviews", type: "Application", title: "Reviews", description: "Client feedback and reputation", keywords: ["testimonials", "pivity"], action: { type: "open-app", target: "about" } },
    { id: "app-creations", type: "Application", title: "Creations", description: "Generated development library", keywords: ["modules", "glua", "archive"], action: { type: "open-app", target: "creations" } },
    { id: "app-games", type: "Application", title: "Games", description: "Playable desktop game collection", keywords: ["arcade", "puzzle"], action: { type: "open-app", target: "games-folder" } },
    { id: "app-lilia", type: "Application", title: "Lilia Documentation", description: "Open Lilia Framework documentation", keywords: ["framework", "docs", "glua"], action: { type: "open-app", target: "lilia" } },
    
  ];
  window.PORTFOLIO_COMMAND_ENTRIES = commandEntries;
})();
