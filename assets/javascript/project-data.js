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
      "id": "rune-wars",
      "name": "Rune Wars",
      "summary": "A Ren'Py game project focused on narrative progression, scripted gameplay systems and integrated visual and audio content.",
      "status": "games",
      "category": "Game · Ren'Py",
      "technologies": [
        "Ren'Py",
        "Python",
        "Game Scripting",
        "2D Assets"
      ],
      "lifecycle": "games",
      "work": [
        "Gameplay and narrative system development",
        "Scene, progression and game-state scripting",
        "Visual and audio asset integration",
        "Iteration on game logic and content delivery"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Rune-Wars"
        }
      ],
      "githubRepository": "bleonheart/Rune-Wars"
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
      "id": "glua-toolchain",
      "name": "GLua Toolchain",
      "summary": "A production-style static-analysis and developer-tooling suite for real Garry's Mod Lua projects.",
      "status": "tools",
      "category": "Tool · GLua Static Analysis",
      "technologies": [
        "Go",
        "GLua",
        "Lua",
        "AST",
        "SARIF",
        "LSP",
        "Graphviz",
        "GitHub Actions"
      ],
      "lifecycle": "tools",
      "work": [
        "GLua-aware lexer, parser and source-aware AST",
        "Project-wide semantic, realm and dependency analysis",
        "Networking and security diagnostics with control-flow analysis",
        "Formatting, documentation, LSP, SARIF and CI integration"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/GLua-Toolchain"
        }
      ],
      "githubRepository": "bleonheart/GLua-Toolchain"
    },
    {
      "id": "gmod-optimization-tool",
      "name": "Garry's Mod Optimization Tool",
      "summary": "A customized desktop utility for cleaning, compressing and reorganizing Garry's Mod addons, maps and content packs.",
      "status": "tools",
      "category": "Tool · Garry's Mod Content Optimization",
      "technologies": [
        "Python",
        "PySide6",
        "Pillow",
        "SourcePP",
        "Source Engine",
        "Garry's Mod"
      ],
      "lifecycle": "tools",
      "work": [
        "Customized and maintained the desktop optimization workflow",
        "Texture and audio compression pipelines",
        "Unused-content and missing-material discovery",
        "BSP dependency collection and addon cleanup utilities"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/GMod-Optimization-Tool"
        }
      ],
      "githubRepository": "bleonheart/GMod-Optimization-Tool"
    },
    {
      "id": "lilia-snippets",
      "name": "Lilia Snippets",
      "summary": "A Visual Studio Code extension providing framework-aware snippets and development shortcuts for Lilia and GLua.",
      "status": "tools",
      "category": "Tool · VS Code Extension",
      "technologies": [
        "TypeScript",
        "VS Code API",
        "JSON",
        "GLua",
        "Lua"
      ],
      "lifecycle": "tools",
      "work": [
        "Framework-aware snippets for classes, hooks, libraries and meta APIs",
        "Lua and GLua editor integration",
        "Extension commands for common development transformations",
        "Marketplace packaging and extension maintenance"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/LiliaFramework/Snippets"
        }
      ],
      "githubRepository": "LiliaFramework/Snippets"
    },
    {
      "id": "lilia-modules",
      "name": "Lilia Modules",
      "summary": "The maintained collection of optional gameplay, administration, presentation and utility modules for the Lilia ecosystem.",
      "status": "tools",
      "category": "Tool · Lilia Module Ecosystem",
      "technologies": [
        "GLua",
        "Lua",
        "Lilia",
        "Garry's Mod",
        "JavaScript"
      ],
      "lifecycle": "tools",
      "work": [
        "Reusable gameplay, administration and presentation modules",
        "Self-contained module architecture and framework conventions",
        "Server utilities, NPC systems, UI and interaction features",
        "Documentation and metadata generation tooling"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/LiliaFramework/Modules"
        }
      ],
      "githubRepository": "LiliaFramework/Modules"
    },
    {
      "id": "lilia-skeleton",
      "name": "Lilia Skeleton",
      "summary": "The official minimal Lilia schema foundation for starting custom roleplay projects with a clean structure.",
      "status": "tools",
      "category": "Tool · Lilia Schema Starter",
      "technologies": [
        "GLua",
        "Lua",
        "Lilia",
        "Garry's Mod"
      ],
      "lifecycle": "tools",
      "work": [
        "Minimal production-ready schema starter",
        "Baseline gamemode and schema structure",
        "Clean extension points for factions, classes and modules",
        "Reference foundation for new Lilia projects"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/LiliaFramework/Skeleton"
        }
      ],
      "githubRepository": "LiliaFramework/Skeleton"
    },
    {
      "id": "gluacheck",
      "name": "GLuaCheck",
      "summary": "A Lilia-oriented Luacheck-based static-analysis repository adapted for Garry's Mod and framework development workflows.",
      "status": "tools",
      "category": "Tool · Lua / GLua Static Analysis",
      "technologies": [
        "Lua",
        "Luacheck",
        "GLua",
        "Static Analysis",
        "CI"
      ],
      "lifecycle": "tools",
      "work": [
        "Maintained a Lilia-oriented static-analysis fork",
        "Adapted globals and warning behavior for Garry's Mod development",
        "Integrated framework-specific linting conventions",
        "Supported CI-oriented Lua and GLua quality checks"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/LiliaFramework/GluaCheck"
        }
      ],
      "githubRepository": "LiliaFramework/GluaCheck"
    },
    {
      "id": "lilia-documentation",
      "name": "Lilia Documentation Platform",
      "summary": "The documentation publishing platform for Lilia installation, configuration, APIs, hooks, modules and development workflows.",
      "status": "tools",
      "category": "Tool · Documentation Platform",
      "technologies": [
        "Python",
        "MkDocs",
        "Markdown",
        "JavaScript",
        "GitHub Pages"
      ],
      "lifecycle": "tools",
      "work": [
        "Framework guides and API/reference documentation",
        "MkDocs documentation-site architecture",
        "Generated reference and module metadata workflows",
        "Documentation publishing and maintenance pipeline"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/LiliaFramework/LiliaFramework.github.io"
        },
        {
          "label": "Documentation",
          "url": "https://liliaframework.github.io/"
        }
      ],
      "githubRepository": "LiliaFramework/LiliaFramework.github.io"
    },
    {
      "id": "gmod-globals-scraper",
      "name": "GMod Globals Scraper",
      "summary": "A customized scraper for generating Garry's Mod global-function and global-variable definitions for static-analysis workflows.",
      "status": "tools",
      "category": "Tool · GLua Developer Utility",
      "technologies": [
        "Lua",
        "GLua",
        "Luacheck",
        "Data Scraping"
      ],
      "lifecycle": "tools",
      "work": [
        "Customized Garry's Mod API scraping workflow",
        "Global function and variable extraction",
        "Luacheck-compatible definition generation",
        "Static-analysis support for Garry's Mod projects"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/gmod-globals-scraper"
        }
      ],
      "githubRepository": "bleonheart/gmod-globals-scraper"
    },
    {
      "id": "linux-infrastructure-lab",
      "name": "Linux Infrastructure Lab",
      "summary": "A reproducible production-style Linux infrastructure environment covering deployment, automation, observability and day-two operations.",
      "status": "labs",
      "category": "Lab · Linux / DevOps Infrastructure",
      "technologies": [
        "Linux",
        "Go",
        "Docker",
        "Kubernetes",
        "Terraform",
        "Ansible",
        "PostgreSQL",
        "Nginx",
        "Prometheus",
        "Grafana",
        "Loki",
        "GitHub Actions"
      ],
      "lifecycle": "labs",
      "work": [
        "Production-style Linux environment and service architecture",
        "Infrastructure as Code and configuration management",
        "Container and Kubernetes deployment workflows",
        "Observability, backups, hardening, CI validation and runbooks"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Linux-Infrastructure-Lab"
        }
      ],
      "githubRepository": "bleonheart/Linux-Infrastructure-Lab"
    },
    {
      "id": "game-server-control-plane",
      "name": "Game Server Control Plane",
      "summary": "A production-oriented API and worker control plane for provisioning, operating, updating, monitoring and recovering dedicated game servers.",
      "status": "labs",
      "category": "Lab · Backend / Game Infrastructure",
      "technologies": [
        "Go",
        "PostgreSQL",
        "Docker",
        "SteamCMD",
        "SRCDS",
        "Prometheus",
        "Kubernetes",
        "GitHub Actions"
      ],
      "lifecycle": "labs",
      "work": [
        "Dedicated-server provisioning and lifecycle API",
        "SteamCMD updates and desired/actual-state reconciliation",
        "Concurrency locking, scheduling and automated recovery",
        "RBAC, encrypted secrets, backups, metrics and CI/CD"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Game-Server-Control-Plane"
        }
      ],
      "githubRepository": "bleonheart/Game-Server-Control-Plane"
    },
    {
      "id": "production-troubleshooting-lab",
      "name": "Production Troubleshooting Lab",
      "summary": "A resettable incident-response environment covering Linux, networking, containers, databases and Kubernetes failures.",
      "status": "labs",
      "category": "Lab · Production Support / SRE",
      "technologies": [
        "Linux",
        "Bash",
        "Docker",
        "Kubernetes",
        "Nginx",
        "PostgreSQL",
        "Prometheus",
        "Grafana",
        "GitHub Actions"
      ],
      "lifecycle": "labs",
      "work": [
        "Reproducible production-support incident scenarios",
        "Linux, Nginx, networking and container troubleshooting",
        "PostgreSQL, TLS, permissions and Kubernetes failure labs",
        "Monitoring, reset workflows, runbooks and incident reports"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Production-Troubleshooting-Lab"
        }
      ],
      "githubRepository": "bleonheart/Production-Troubleshooting-Lab"
    },
    {
      "id": "postgresql-operations-lab",
      "name": "PostgreSQL Operations Lab",
      "summary": "A production-style PostgreSQL environment for SQL engineering, performance tuning, troubleshooting and operational reliability.",
      "status": "labs",
      "category": "Lab · PostgreSQL Operations",
      "technologies": [
        "PostgreSQL 16",
        "SQL",
        "PL/pgSQL",
        "Python",
        "Docker Compose",
        "Bash",
        "GitHub Actions"
      ],
      "lifecycle": "labs",
      "work": [
        "Normalized schemas, migrations and operational SQL",
        "CTE, window-function and JSONB workloads",
        "Query-plan analysis, indexing and transaction labs",
        "Monitoring, deterministic data generation and backup/restore verification"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/PostgreSQL-Operations-Lab"
        }
      ],
      "githubRepository": "bleonheart/PostgreSQL-Operations-Lab"
    },
    {
      "id": "titan-forge",
      "name": "Titan Forge",
      "summary": "A historical Garry's Mod server project combining custom gamemode and addon systems.",
      "status": "legacy",
      "category": "Garry's Mod · Server Project",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "Source Engine"
      ],
      "lifecycle": "legacy",
      "work": [
        "Custom gamemode and addon integration",
        "Server-side gameplay architecture",
        "Project-specific systems and mechanics",
        "Content and deployment maintenance"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Titan-Forge"
        }
      ],
      "githubRepository": "bleonheart/Titan-Forge"
    },
    {
      "id": "project-manhattan",
      "name": "Project Manhattan",
      "summary": "A complete Garry's Mod server project spanning gamemode logic, addon integration and Workshop-oriented content.",
      "status": "legacy",
      "category": "Garry's Mod · Server Project",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "Workshop Content"
      ],
      "lifecycle": "legacy",
      "work": [
        "Gamemode and addon integration",
        "Roleplay and gameplay systems",
        "Workshop content organization",
        "Server deployment structure"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Project-Manhattan"
        }
      ],
      "githubRepository": "bleonheart/Project-Manhattan"
    },
    {
      "id": "skyrim-incursion",
      "name": "Skyrim Incursion",
      "summary": "A Skyrim-inspired Garry's Mod project with custom gamemode systems, addons and supporting tooling.",
      "status": "legacy",
      "category": "Garry's Mod · Fantasy RP",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "Source Engine"
      ],
      "lifecycle": "legacy",
      "work": [
        "Fantasy-oriented gamemode systems",
        "Custom addon integration",
        "Gameplay and roleplay mechanics",
        "Supporting development tooling"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Skyrim-Incursion"
        }
      ],
      "githubRepository": "bleonheart/Skyrim-Incursion"
    },
    {
      "id": "zombie-wars",
      "name": "Zombie Wars",
      "summary": "A zombie-oriented Garry's Mod roleplay and gamemode project with custom gameplay loops and schema systems.",
      "status": "legacy",
      "category": "Garry's Mod · Zombie RP",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod"
      ],
      "lifecycle": "legacy",
      "work": [
        "Zombie-oriented gameplay loops",
        "Roleplay and schema systems",
        "Server and client mechanics",
        "Project-specific content integration"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Zombie-Wars"
        }
      ],
      "githubRepository": "bleonheart/Zombie-Wars"
    },
    {
      "id": "blackpowder-and-magic",
      "name": "Blackpowder and Magic",
      "summary": "A fantasy and historical roleplay schema with custom character, gameplay and setting-specific systems.",
      "status": "legacy",
      "category": "Garry's Mod · Fantasy / Historical RP",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod"
      ],
      "lifecycle": "legacy",
      "work": [
        "Roleplay schema development",
        "Character and gameplay systems",
        "Setting-specific mechanics",
        "Server-side project customization"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Blackpowder-and-Magic"
        }
      ],
      "githubRepository": "bleonheart/Blackpowder-and-Magic"
    },
    {
      "id": "partum-verse",
      "name": "Partum Verse",
      "summary": "A custom Garry's Mod universe built around a dedicated gamemode and supporting addon architecture.",
      "status": "legacy",
      "category": "Garry's Mod · Custom RP",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod"
      ],
      "lifecycle": "legacy",
      "work": [
        "Custom universe and gamemode architecture",
        "Project-specific gameplay systems",
        "Roleplay mechanics and server logic",
        "Addon integration and maintenance"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Partum-Verse"
        }
      ],
      "githubRepository": "bleonheart/Partum-Verse"
    },
    {
      "id": "lilia-scprp",
      "name": "Lilia SCPRP",
      "summary": "An SCP-oriented roleplay schema demonstrating a specialized project built on top of the Lilia framework.",
      "status": "legacy",
      "category": "Garry's Mod · Lilia SCP RP",
      "technologies": [
        "GLua",
        "Lua",
        "Lilia",
        "Garry's Mod"
      ],
      "lifecycle": "legacy",
      "work": [
        "SCP-oriented Lilia schema structure",
        "Project configuration, factions and classes",
        "Schema-specific modules and mechanics",
        "Isolation of project behavior from framework core"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/LiliaFramework/SCPRP"
        }
      ],
      "githubRepository": "LiliaFramework/SCPRP"
    },
    {
      "id": "improved-simfphys",
      "name": "Improved Simfphys",
      "summary": "A historical Garry's Mod vehicle project spanning Lua systems and Source-engine models, materials, particles and audio.",
      "status": "legacy",
      "category": "Garry's Mod · Vehicle Systems",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "Source Engine",
        "Models",
        "Materials"
      ],
      "lifecycle": "legacy",
      "work": [
        "Vehicle gameplay and integration work",
        "Lua-side system customization",
        "Model, material, particle and sound integration",
        "Source-engine content maintenance"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Improved-Simfphys"
        }
      ],
      "githubRepository": "bleonheart/Improved-Simfphys"
    },
    {
      "id": "fallout-alaska",
      "name": "Fallout Alaska / Alaskan Frontier",
      "summary": "A multi-generation Fallout-themed roleplay project developed across several repository iterations.",
      "status": "legacy",
      "category": "Garry's Mod · Fallout RP",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "SQL",
        "Source Engine"
      ],
      "lifecycle": "legacy",
      "work": [
        "Multiple generations of Fallout roleplay development",
        "Schemas, factions, items and gameplay systems",
        "Server-specific addon integration",
        "Architecture evolution across project iterations"
      ],
      "links": [
        {
          "label": "Alaska",
          "url": "https://github.com/bleonheart/Alaska"
        },
        {
          "label": "Fallout Alaska",
          "url": "https://github.com/bleonheart/Fallout-Alaska"
        }
      ]
    },
    {
      "id": "nevada-wastes",
      "name": "The Nevada Wastes",
      "summary": "A Fallout/Nevada roleplay project developed and later reworked through a dedicated revamped iteration.",
      "status": "legacy",
      "category": "Garry's Mod · Fallout RP",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "SQL"
      ],
      "lifecycle": "legacy",
      "work": [
        "Fallout-themed schema development",
        "Gameplay and roleplay module implementation",
        "Server-specific systems and content",
        "Major rework through the revamped iteration"
      ],
      "links": [
        {
          "label": "Original",
          "url": "https://github.com/bleonheart/TheNevadaWastes"
        },
        {
          "label": "Revamped",
          "url": "https://github.com/bleonheart/TheNevadaWastesRevamped"
        }
      ]
    },
    {
      "id": "flashpoint",
      "name": "Flashpoint",
      "summary": "A Garry's Mod roleplay project that progressed from an original implementation into a restructured 2.0 iteration.",
      "status": "legacy",
      "category": "Garry's Mod · Roleplay Project",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod"
      ],
      "lifecycle": "legacy",
      "work": [
        "Custom gameplay and roleplay systems",
        "Server-specific feature development",
        "Feature migration and restructuring",
        "Second-generation 2.0 project iteration"
      ],
      "links": [
        {
          "label": "Original",
          "url": "https://github.com/bleonheart/Flashpoint"
        },
        {
          "label": "2.0",
          "url": "https://github.com/bleonheart/Flashpoint-2.0"
        }
      ]
    },
    {
      "id": "project-rebirth",
      "name": "Project Rebirth",
      "summary": "A large historical Garry's Mod server codebase combining gamemode logic, addons and integrated content.",
      "status": "legacy",
      "category": "Garry's Mod · Server Project",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "Source Engine"
      ],
      "lifecycle": "legacy",
      "work": [
        "Large interconnected server codebase",
        "Custom gamemode and addon systems",
        "Gameplay and roleplay feature integration",
        "Content and project maintenance"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Project-Rebirth"
        }
      ],
      "githubRepository": "bleonheart/Project-Rebirth"
    },
    {
      "id": "modified-gaming-wwii",
      "name": "Modified Gaming WWII RP",
      "summary": "Historical-roleplay development across successive 1942 and 1943 server iterations.",
      "status": "legacy",
      "category": "Garry's Mod · WWII RP",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod"
      ],
      "lifecycle": "legacy",
      "work": [
        "Historical roleplay system development",
        "Factions and gameplay mechanics",
        "Administration and server-specific features",
        "Iteration across 1942 and 1943 projects"
      ],
      "links": [
        {
          "label": "1942",
          "url": "https://github.com/bleonheart/Modified-Gaming-1942RP"
        },
        {
          "label": "1943",
          "url": "https://github.com/bleonheart/Modified-Gaming-1943"
        }
      ]
    },
    {
      "id": "guynolie-hl2rp",
      "name": "Guynolie HL2RP",
      "summary": "A Half-Life 2 roleplay project with custom schema systems, addon integration and server-specific gameplay.",
      "status": "legacy",
      "category": "Garry's Mod · Half-Life 2 RP",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "HL2RP Systems"
      ],
      "lifecycle": "legacy",
      "work": [
        "Half-Life 2 roleplay schema development",
        "Faction and character systems",
        "Addon and content integration",
        "Server-specific gameplay mechanics"
      ],
      "links": [
        {
          "label": "Repository",
          "url": "https://github.com/bleonheart/Guynolie-HL2RP"
        }
      ],
      "githubRepository": "bleonheart/Guynolie-HL2RP"
    },
    {
      "id": "warhammer-40k-projects",
      "name": "Warhammer 40K Projects",
      "summary": "A collection of Warhammer-inspired roleplay projects and experiments across multiple historical repositories.",
      "status": "legacy",
      "category": "Garry's Mod · Warhammer 40K RP",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod"
      ],
      "lifecycle": "legacy",
      "work": [
        "Warhammer-inspired roleplay schemas",
        "Faction and character systems",
        "Setting-specific gameplay mechanics",
        "Iteration across multiple project concepts"
      ],
      "links": [
        {
          "label": "Warhammer40k",
          "url": "https://github.com/bleonheart/Warhammer40k"
        },
        {
          "label": "Anathema Imperalis",
          "url": "https://github.com/bleonheart/Anathema-Imperalis"
        }
      ]
    },
    {
      "id": "legacy-star-wars-rp",
      "name": "Star Wars RP Projects",
      "summary": "A consolidated archive of Star Wars and SWTOR roleplay projects developed for different communities and server requirements.",
      "status": "legacy",
      "category": "Garry's Mod · Star Wars RP Archive",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "SQL"
      ],
      "lifecycle": "legacy",
      "work": [
        "Multiple Star Wars roleplay schemas and server projects",
        "Faction, class and progression systems",
        "Custom gameplay and administration features",
        "Community-specific integration and maintenance"
      ],
      "links": [
        {
          "label": "StarWarsRP",
          "url": "https://github.com/bleonheart/StarWarsRP"
        },
        {
          "label": "Project Vindication",
          "url": "https://github.com/bleonheart/ProjectVindicationSWRP"
        }
      ]
    },
    {
      "id": "legacy-fallout-rp",
      "name": "Fallout RP Projects",
      "summary": "A consolidated archive of Fallout-themed Garry's Mod projects spanning multiple frameworks, settings and community servers.",
      "status": "legacy",
      "category": "Garry's Mod · Fallout RP Archive",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "SQL",
        "Lilia"
      ],
      "lifecycle": "legacy",
      "work": [
        "Multiple Fallout-themed schemas and server projects",
        "Inventory, faction and character systems",
        "Economy and wasteland gameplay mechanics",
        "Reusable server modules and project-specific integrations"
      ],
      "links": [
        {
          "label": "FalloutRP",
          "url": "https://github.com/bleonheart/FalloutRP"
        },
        {
          "label": "Mojave Reborn",
          "url": "https://github.com/bleonheart/MojaveReborn"
        }
      ]
    },
    {
      "id": "legacy-historical-rp",
      "name": "Historical RP Projects",
      "summary": "A consolidated archive of WWI, WWII, interwar and other historically themed Garry's Mod roleplay projects.",
      "status": "legacy",
      "category": "Garry's Mod · Historical RP Archive",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "SQL"
      ],
      "lifecycle": "legacy",
      "work": [
        "Historical roleplay schemas across multiple eras",
        "Faction and character structures",
        "Economy, progression and gameplay mechanics",
        "Administration and community-specific systems"
      ],
      "links": [
        {
          "label": "Elysium 1942RP",
          "url": "https://github.com/bleonheart/Elysium1942RP"
        },
        {
          "label": "Time Capsule Berlin",
          "url": "https://github.com/bleonheart/Time-Capsule-Berlin"
        }
      ]
    },
    {
      "id": "legacy-mafia-rp",
      "name": "Mafia RP Projects",
      "summary": "A consolidated archive of Mafia and organized-crime roleplay projects built for several Garry's Mod communities.",
      "status": "legacy",
      "category": "Garry's Mod · Mafia RP Archive",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "SQL"
      ],
      "lifecycle": "legacy",
      "work": [
        "Crime and Mafia roleplay systems",
        "Organization and economy mechanics",
        "Character progression and interactions",
        "Server administration and community customization"
      ],
      "links": [
        {
          "label": "MafiaRP",
          "url": "https://github.com/bleonheart/MafiaRP"
        },
        {
          "label": "Slayer MafiaRP",
          "url": "https://github.com/bleonheart/Slayer-MafiaRP"
        }
      ]
    },
    {
      "id": "legacy-hl2rp",
      "name": "Half-Life 2 RP Projects",
      "summary": "A consolidated archive of Half-Life 2 roleplay schemas and server projects across several communities and framework variants.",
      "status": "legacy",
      "category": "Garry's Mod · Half-Life 2 RP Archive",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "Helix",
        "HL2RP Systems"
      ],
      "lifecycle": "legacy",
      "work": [
        "Half-Life 2 roleplay schema customization",
        "Faction, class and character systems",
        "Combine, citizen and inventory mechanics",
        "Administration and server-specific integrations"
      ],
      "links": [
        {
          "label": "HL2RP",
          "url": "https://github.com/bleonheart/HL2RP"
        },
        {
          "label": "MG HL2RP",
          "url": "https://github.com/bleonheart/MG-HL2RP"
        }
      ]
    },
    {
      "id": "legacy-community-rp",
      "name": "General RP / Community Projects",
      "summary": "A consolidated archive of custom roleplay and community-server work covering city, DarkRP and bespoke server concepts.",
      "status": "legacy",
      "category": "Garry's Mod · Community Project Archive",
      "technologies": [
        "GLua",
        "Lua",
        "Garry's Mod",
        "SQL"
      ],
      "lifecycle": "legacy",
      "work": [
        "Custom schemas for multiple communities",
        "Economy and roleplay mechanics",
        "UI, administration and server utilities",
        "Deployment-specific integrations and maintenance"
      ],
      "links": [
        {
          "label": "Skyline CityRP",
          "url": "https://github.com/bleonheart/SkylineCityRP"
        },
        {
          "label": "HeadRush DarkRP",
          "url": "https://github.com/bleonheart/HeadRush-DarkRP"
        }
      ]
    },
    {
      id: "derma-creator",
      name: "Derma Creator",
      summary: "A visual Garry's Mod Derma UI builder with project import/export and Lua generation.",
      status: "tools",
      category: "Garry's Mod · Developer Tool",
      technologies: ["JavaScript", "React", "GLua", "Vite"],
      lifecycle: "tools",
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
