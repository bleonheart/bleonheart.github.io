(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());
  const data = window.PORTFOLIO_DATA || { projects: [], games: [], applications: [], destinations: {} };
  const version = `portfolio-desktop ${data.version || "3.0"}`;
  const homePath = "/home/samael/portfolio";
  const commandGroups = {
    portfolio: ["about", "apps", "contact", "creations", "current", "discord", "docs", "featured", "game", "games", "github", "hire", "legacy", "lilia", "links", "modules", "open", "pivity", "play", "portfolio", "project", "projects", "random", "repo", "reviews", "search", "skills", "stats", "status", "tech"],
    shell: ["alias", "cat", "cd", "clear", "cls", "commands", "dir", "echo", "env", "find", "grep", "head", "help", "history", "ls", "man", "printenv", "printf", "pwd", "tail", "tree", "type", "wc", "whereis", "which"],
    system: ["cal", "date", "df", "fastfetch", "free", "groups", "hostname", "id", "languages", "neofetch", "online", "platform", "ps", "time", "top", "uname", "uptime", "version", "whoami"],
    utilities: ["fortune", "length", "lower", "motd", "pudding", "purin", "rand", "repeat", "reverse", "upper", "uuid"]
  };
  const commands = [...new Set(Object.values(commandGroups).flat())].sort();
  const smartCommandPatterns = [
    /^sudo(?:\s|$)/,
    /^(?:su|rm|rmdir|shred|fdisk|mkfs(?:\.[a-z0-9]+)?|dd|chmod|chown|kill|pkill)(?:\s|$)/,
    /^(?:format|del|erase|rd|diskpart)(?:\s|$)/,
    /^(?:shutdown|reboot|halt|poweroff|stop-computer|restart-computer)(?:\s|$)/,
    /^remove-item\b/i,
    /^:\(\)\s*\{/,
    /^(?:curl|wget)\b.*\|\s*(?:sh|bash|zsh)\b/,
    /^(?:irm|iwr|invoke-restmethod|invoke-webrequest)\b.*\|\s*(?:iex|invoke-expression)\b/
  ];
  const actionAliases = {
    projects: { type: "open-app", target: "projects" },
    current: { type: "open-projects-filter", target: "maintained" },
    legacy: { type: "open-projects-filter", target: "legacy" },
    creations: { type: "open-app", target: "creations" },
    games: { type: "open-app", target: "games-folder" },
    github: { type: "open-external", target: "github" },
    discord: { type: "open-external", target: "discord" },
    pivity: { type: "open-external", target: "pivity" },
    lilia: { type: "open-project", target: "lilia" },
    docs: { type: "open-external", target: "lilia" },
    repo: { type: "open-external", target: "lilia-repository" },
    portfolio: { type: "open-external", target: "portfolio" },
    reviews: { type: "open-app", target: "about" },
    contact: { type: "open-app", target: "work-with-me" },
    hire: { type: "open-app", target: "work-with-me" },
    random: { type: "random-game" }
  };
  const manual = {
    help: "help [command] - show command groups or help for one command",
    commands: "commands - list every available command",
    man: "man <command> - show a short manual entry",
    open: "open <name> - open a matching portfolio item",
    search: "search <query> - open the portfolio command palette with a query",
    project: "project <name> - open a matching project",
    game: "game <name> - show information about a game",
    play: "play <game> - launch a matching desktop game",
    find: "find <query> - find matching portfolio entries in the terminal",
    grep: "grep <query> - search portfolio titles and descriptions",
    cat: "cat <file> - read a virtual terminal file",
    head: "head [-n count] <file> - show the first lines of a virtual file",
    tail: "tail [-n count] <file> - show the last lines of a virtual file",
    wc: "wc <text> - count lines, words, and characters in text",
    cd: "cd [path] - change the virtual terminal directory",
    ls: "ls [path] - list a virtual directory",
    tree: "tree - display the virtual portfolio filesystem",
    echo: "echo <text> - print text",
    printf: "printf <text> - print text",
    date: "date - show the browser's current local date and time",
    time: "time - show the browser's current local time",
    uptime: "uptime - show how long this terminal page has been running",
    uname: "uname [-a|-s|-n|-r|-m] - show virtual system information",
    env: "env - show the terminal environment",
    printenv: "printenv [name] - show environment variables",
    which: "which <command> - locate a terminal command",
    whereis: "whereis <command> - locate a terminal command",
    type: "type <command> - describe a terminal command",
    stats: "stats - show portfolio project, game, app, and search-entry counts",
    status: "status - show project lifecycle and status information",
    featured: "featured - list featured projects",
    apps: "apps - list application entries",
    modules: "modules - show indexed module/documentation count",
    links: "links - list configured external destinations",
    neofetch: "neofetch - show portfolio terminal system information",
    fastfetch: "fastfetch - show compact portfolio terminal system information",
    ps: "ps - show virtual browser processes",
    top: "top - show a compact virtual process snapshot",
    free: "free - show browser memory information when available",
    df: "df - show virtual filesystem usage",
    cal: "cal - show the current month calendar",
    uuid: "uuid - generate a UUID when the browser supports it",
    rand: "rand [max] - generate a random integer from 0 through max",
    upper: "upper <text> - convert text to uppercase",
    lower: "lower <text> - convert text to lowercase",
    reverse: "reverse <text> - reverse text",
    length: "length <text> - print text length",
    repeat: "repeat <count> <text> - print text repeatedly, up to 20 times"
  };
  const fortunes = [
    "Ship small, verify often.",
    "The fastest bug is the one reproduced reliably.",
    "Good tools turn repeated work into one command.",
    "Readable code survives longer than clever code.",
    "Measure first. Optimize second."
  ];
  const create = (tag, className = "", text = "") => {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text) element.textContent = text;
    return element;
  };

  function initialize(container) {
    const app = container.querySelector("[data-terminal-app]");
    const output = app?.querySelector("[data-terminal-output]");
    const form = app?.querySelector("[data-terminal-form]");
    const input = app?.querySelector("[data-terminal-input]");
    const prompt = app?.querySelector("[data-terminal-prompt]");
    if (!app || !output || !form || !input || !prompt) return null;

    const history = [];
    const startedAt = performance.now();
    let historyIndex = 0;
    let currentPath = homePath;

    const projects = Array.isArray(data.projects) ? data.projects : [];
    const games = Array.isArray(data.games) ? data.games : [];
    const destinations = data.destinations && typeof data.destinations === "object" ? data.destinations : {};

    const print = (text, kind = "output") => {
      const line = create("div", `terminal-line terminal-line--${kind}`, String(text));
      output.append(line);
      output.scrollTop = output.scrollHeight;
    };

    const printBlock = (text, kind = "output") => {
      String(text).split("\n").forEach((line) => print(line, kind));
    };

    const executeAction = (action) => {
      const result = window.PortfolioActions?.execute?.(action);
      if (result === false) print("Action is unavailable.", "error");
      return result;
    };

    const entries = () => Array.isArray(window.PORTFOLIO_COMMAND_ENTRIES) ? window.PORTFOLIO_COMMAND_ENTRIES : [];
    const searchEntries = () => Array.isArray(window.PORTFOLIO_SEARCH_DATA) ? window.PORTFOLIO_SEARCH_DATA : [];

    const findEntry = (query, predicate = () => true) => {
      const normalized = query.trim().toLowerCase();
      if (!normalized) return null;
      const available = entries().filter(predicate);
      return available.find((entry) => entry.title.toLowerCase() === normalized || entry.id.replace(/^(app|project|game)-/, "") === normalized)
        || available.find((entry) => entry.title.toLowerCase().includes(normalized));
    };

    const normalizePath = (path = "") => {
      const value = path.trim();
      if (!value || value === "~") return value ? homePath : currentPath;
      let source;
      if (value.startsWith("~/")) source = `${homePath}/${value.slice(2)}`;
      else if (value.startsWith("/")) source = value;
      else source = `${currentPath}/${value}`;
      const parts = [];
      source.split("/").forEach((part) => {
        if (!part || part === ".") return;
        if (part === "..") parts.pop();
        else parts.push(part);
      });
      return `/${parts.join("/")}`;
    };

    const projectById = (id) => projects.find((project) => project.id === id);
    const gameById = (id) => games.find((game) => game.id === id);

    const isDirectory = (path) => {
      if (path === homePath) return true;
      return ["projects", "creations", "games", "reviews", "terminal"].some((directory) => path === `${homePath}/${directory}`);
    };

    const listDirectory = (path) => {
      if (path === homePath) return ["projects/", "creations/", "games/", "reviews/", "terminal/", "README.md", "contact.txt", "skills.txt", "version.txt"];
      if (path === `${homePath}/projects`) return projects.map((project) => project.id);
      if (path === `${homePath}/games`) return games.map((game) => game.id);
      if (path === `${homePath}/creations`) return ["Use 'creations' to open the full generated creation library."];
      if (path === `${homePath}/reviews`) return ["Use 'reviews' to open client reviews."];
      if (path === `${homePath}/terminal`) return ["commands.txt", "motd.txt"];
      return null;
    };

    const readVirtualFile = (path) => {
      const resolved = normalizePath(path);
      const fixedFiles = {
        [`${homePath}/README.md`]: "Samael Portfolio Terminal\nA browser-based command interface for navigating projects, games, creations, reviews, and portfolio information.\nUse 'help' for command groups.\nUse 'commands' for the complete command list.",
        [`${homePath}/skills.txt`]: "GLua, Python, Bash/Shell, PowerShell, GDScript, JavaScript, TypeScript, Java, Go, Unity, Godot, web, SQL, Linux/Windows, Docker, Kubernetes, CI/CD, game-server infrastructure.",
        [`${homePath}/contact.txt`]: "Use 'contact' or 'hire' to open the Work With Me section.",
        [`${homePath}/version.txt`]: version,
        [`${homePath}/terminal/commands.txt`]: commands.join("\n"),
        [`${homePath}/terminal/motd.txt`]: "Welcome to Samael's portfolio terminal."
      };
      if (fixedFiles[resolved]) return fixedFiles[resolved];
      if (resolved.startsWith(`${homePath}/projects/`)) {
        const project = projectById(resolved.slice(`${homePath}/projects/`.length));
        if (project) return `${project.name}\n${project.summary}\nStatus: ${data.statusLabels?.[project.status] || project.status}\nLifecycle: ${project.lifecycle}\nTechnologies: ${(project.technologies || []).join(", ")}`;
      }
      if (resolved.startsWith(`${homePath}/games/`)) {
        const game = gameById(resolved.slice(`${homePath}/games/`.length));
        if (game) return `${game.name}\nGenre: ${game.genre}\nLaunch with: play ${game.id}`;
      }
      return null;
    };

    const promptPath = () => currentPath === homePath ? "~" : `~${currentPath.slice(homePath.length)}`;
    const updatePrompt = () => {
      prompt.textContent = `samael@portfolio:${promptPath()}$`;
    };

    const environment = () => ({
      USER: "samael",
      HOME: homePath,
      PWD: currentPath,
      SHELL: "/bin/portfolio",
      TERM: "portfolio-terminal",
      PORTFOLIO_VERSION: data.version || "3.0"
    });

    const formatUptime = () => {
      const seconds = Math.floor((performance.now() - startedAt) / 1000);
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const remainder = seconds % 60;
      return `${hours}h ${minutes}m ${remainder}s`;
    };

    const calendar = () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const days = new Date(year, month + 1, 0).getDate();
      const title = now.toLocaleDateString(undefined, { month: "long", year: "numeric" });
      const rows = [title, "Su Mo Tu We Th Fr Sa"];
      let row = "   ".repeat(firstDay);
      for (let day = 1; day <= days; day += 1) {
        row += `${String(day).padStart(2, " ")} `;
        if ((firstDay + day) % 7 === 0) {
          rows.push(row.trimEnd());
          row = "";
        }
      }
      if (row) rows.push(row.trimEnd());
      return rows.join("\n");
    };

    const printHelp = (command = "") => {
      const target = command.trim().toLowerCase();
      if (target) {
        if (!commands.includes(target)) {
          print(`help: no help topic '${target}'`, "error");
          return;
        }
        print(manual[target] || `${target} - built-in portfolio terminal command`);
        return;
      }
      print("Portfolio commands:");
      Object.entries(commandGroups).forEach(([group, items]) => print(`${group.padEnd(10)} ${items.join(" ")}`));
      print("Use 'man <command>' or 'help <command>' for details.");
    };

    const handlers = {
      help(argument) {
        printHelp(argument);
      },
      commands() {
        print(commands.join("  "));
      },
      man(argument) {
        if (!argument) {
          print("usage: man <command>", "error");
          return;
        }
        printHelp(argument);
      },
      about() {
        print("Samael — Developer & Systems Administrator. Opening the full profile.");
        executeAction({ type: "open-app", target: "about-me" });
      },
      skills() {
        print(readVirtualFile("~/skills.txt"));
      },
      tech() {
        const technologies = [...new Set(projects.flatMap((project) => project.technologies || []))].sort();
        print(technologies.length ? technologies.join(", ") : "No project technologies are indexed.");
      },
      languages() {
        print("GLua/Lua, Python, Bash/Shell, PowerShell, GDScript, JavaScript, TypeScript, Java, Go, SQL.");
      },
      whoami() {
        print("samael");
      },
      id() {
        print("uid=1000(samael) gid=1000(samael) groups=1000(samael),27(dev),998(portfolio)");
      },
      groups() {
        print("samael dev portfolio");
      },
      hostname() {
        print("portfolio");
      },
      uname(argument) {
        const platform = navigator.userAgentData?.platform || navigator.platform || "Browser";
        const values = {
          "-s": "PortfolioOS",
          "-n": "portfolio",
          "-r": data.version || "3.0",
          "-m": platform,
          "-a": `PortfolioOS portfolio ${data.version || "3.0"} ${platform} browser`
        };
        print(values[argument.trim()] || "PortfolioOS");
      },
      version() {
        print(version);
      },
      pwd() {
        print(currentPath);
      },
      cd(argument) {
        const target = normalizePath(argument || "~");
        if (!target.startsWith(homePath) || !isDirectory(target)) {
          print(`cd: ${argument || target}: No such directory`, "error");
          return;
        }
        currentPath = target;
        updatePrompt();
      },
      ls(argument) {
        const target = normalizePath(argument || "");
        const items = listDirectory(target);
        if (!items) {
          const file = readVirtualFile(argument);
          if (file !== null) print(argument.trim());
          else print(`ls: cannot access '${argument}': No such file or directory`, "error");
          return;
        }
        print(items.join("  "));
      },
      dir(argument) {
        handlers.ls(argument);
      },
      tree() {
        const projectLines = projects.map((project, index) => `${index === projects.length - 1 ? "    └──" : "    ├──"} ${project.id}`);
        const gameLines = games.map((game, index) => `${index === games.length - 1 ? "    └──" : "    ├──"} ${game.id}`);
        printBlock(["portfolio", "├── projects/", ...projectLines, "├── games/", ...gameLines, "├── creations/", "├── reviews/", "├── terminal/", "├── README.md", "├── contact.txt", "├── skills.txt", "└── version.txt"].join("\n"));
      },
      history() {
        history.forEach((entry, index) => print(`${String(index + 1).padStart(3, " ")}  ${entry}`));
      },
      clear() {
        output.replaceChildren();
      },
      cls() {
        output.replaceChildren();
      },
      echo(argument) {
        print(argument);
      },
      printf(argument) {
        print(argument.replace(/\\n/g, "\n").replace(/\\t/g, "\t"));
      },
      date() {
        print(new Date().toString());
      },
      time() {
        print(new Date().toLocaleTimeString());
      },
      uptime() {
        print(`up ${formatUptime()}`);
      },
      env() {
        Object.entries(environment()).forEach(([key, value]) => print(`${key}=${value}`));
      },
      printenv(argument) {
        const variables = environment();
        const key = argument.trim();
        if (!key) {
          handlers.env();
          return;
        }
        if (!(key in variables)) {
          print(`printenv: '${key}' is not set`, "error");
          return;
        }
        print(variables[key]);
      },
      which(argument) {
        const target = argument.trim().toLowerCase();
        if (!target || !commands.includes(target)) {
          print(`${target || "which"}: command not found`, "error");
          return;
        }
        print(`/usr/local/bin/${target}`);
      },
      whereis(argument) {
        const target = argument.trim().toLowerCase();
        if (!target || !commands.includes(target)) {
          print(`${target || "whereis"}:`, "error");
          return;
        }
        print(`${target}: /usr/local/bin/${target}`);
      },
      type(argument) {
        const target = argument.trim().toLowerCase();
        if (!target || !commands.includes(target)) {
          print(`${target || "type"}: not found`, "error");
          return;
        }
        print(`${target} is a portfolio terminal built-in`);
      },
      alias() {
        print("cls='clear'  dir='ls'  docs='lilia documentation'  repo='lilia repository'  random='random game'");
      },
      cat(argument) {
        if (!argument) {
          print("usage: cat <file>", "error");
          return;
        }
        const content = readVirtualFile(argument);
        if (content === null) {
          print(`cat: ${argument}: No such file`, "error");
          return;
        }
        printBlock(content);
      },
      head(argument) {
        const match = argument.match(/^(?:-n\s+(\d+)\s+)?(.+)$/);
        if (!match) {
          print("usage: head [-n count] <file>", "error");
          return;
        }
        const count = Math.min(100, Math.max(1, Number(match[1] || 10)));
        const content = readVirtualFile(match[2]);
        if (content === null) {
          print(`head: ${match[2]}: No such file`, "error");
          return;
        }
        printBlock(content.split("\n").slice(0, count).join("\n"));
      },
      tail(argument) {
        const match = argument.match(/^(?:-n\s+(\d+)\s+)?(.+)$/);
        if (!match) {
          print("usage: tail [-n count] <file>", "error");
          return;
        }
        const count = Math.min(100, Math.max(1, Number(match[1] || 10)));
        const content = readVirtualFile(match[2]);
        if (content === null) {
          print(`tail: ${match[2]}: No such file`, "error");
          return;
        }
        printBlock(content.split("\n").slice(-count).join("\n"));
      },
      wc(argument) {
        if (!argument) {
          print("usage: wc <text>", "error");
          return;
        }
        const lines = argument.split("\n").length;
        const words = argument.trim() ? argument.trim().split(/\s+/).length : 0;
        print(`${lines} ${words} ${argument.length}`);
      },
      grep(argument) {
        const query = argument.trim().toLowerCase();
        if (!query) {
          print("usage: grep <query>", "error");
          return;
        }
        const matches = entries().filter((entry) => `${entry.title} ${entry.description || ""} ${(entry.keywords || []).join(" ")}`.toLowerCase().includes(query)).slice(0, 20);
        if (!matches.length) {
          print(`grep: no matches for '${argument}'`);
          return;
        }
        matches.forEach((entry) => print(`${entry.type || "Item"}: ${entry.title}`));
      },
      find(argument) {
        const query = argument.trim().toLowerCase();
        if (!query) {
          print("usage: find <query>", "error");
          return;
        }
        const matches = entries().filter((entry) => entry.title.toLowerCase().includes(query) || entry.id.toLowerCase().includes(query)).slice(0, 20);
        if (!matches.length) {
          print(`find: no matches for '${argument}'`);
          return;
        }
        matches.forEach((entry) => print(`${entry.id}  ${entry.title}`));
      },
      search(argument) {
        if (!argument) {
          print("usage: search <query>", "error");
          return;
        }
        executeAction({ type: "search", target: argument });
      },
      open(argument) {
        if (!argument) {
          print("usage: open <name>", "error");
          return;
        }
        const entry = findEntry(argument);
        if (!entry) {
          print(`No portfolio item matched '${argument}'.`, "error");
          return;
        }
        print(`Opening ${entry.title}…`);
        executeAction(entry.action);
      },
      project(argument) {
        if (!argument) {
          print("usage: project <name>", "error");
          return;
        }
        const entry = findEntry(argument, (item) => item.id.startsWith("project-"));
        if (!entry) {
          print(`No project matched '${argument}'.`, "error");
          return;
        }
        print(`Opening ${entry.title}…`);
        executeAction(entry.action);
      },
      game(argument) {
        const query = argument.trim().toLowerCase();
        if (!query) {
          print("usage: game <name>", "error");
          return;
        }
        const game = games.find((item) => item.id === query || item.name.toLowerCase() === query || item.name.toLowerCase().includes(query));
        if (!game) {
          print(`No game matched '${argument}'.`, "error");
          return;
        }
        print(`${game.name} — ${game.genre}. Launch with 'play ${game.id}'.`);
      },
      play(argument) {
        const query = argument.trim().toLowerCase();
        if (!query) {
          print("usage: play <game>", "error");
          return;
        }
        const game = games.find((item) => item.id === query || item.name.toLowerCase() === query || item.name.toLowerCase().includes(query));
        if (!game) {
          print(`No game matched '${argument}'.`, "error");
          return;
        }
        print(`Launching ${game.name}…`);
        executeAction({ type: "launch-game", target: game.id });
      },
      featured() {
        const featured = projects.filter((project) => project.featured);
        if (!featured.length) {
          print("No featured projects are indexed.");
          return;
        }
        featured.forEach((project) => print(`${project.name} — ${project.summary}`));
      },
      status() {
        if (!projects.length) {
          print("No projects are indexed.");
          return;
        }
        projects.forEach((project) => print(`${project.name}: ${data.statusLabels?.[project.status] || project.status} (${project.lifecycle})`));
      },
      stats() {
        const appCount = entries().filter((entry) => entry.id.startsWith("app-")).length;
        print(`Projects: ${projects.length} | Games: ${games.length} | Apps: ${appCount} | Search entries: ${searchEntries().length}`);
      },
      apps() {
        const appEntries = entries().filter((entry) => entry.id.startsWith("app-"));
        if (!appEntries.length) {
          print("No applications are indexed.");
          return;
        }
        appEntries.forEach((entry) => print(`${entry.title} — ${entry.description || entry.id}`));
      },
      modules() {
        const indexed = searchEntries();
        const moduleEntries = indexed.filter((entry) => entry.path && entry.path !== "" && !["creations/", "reviews/"].includes(entry.path));
        print(`${moduleEntries.length || indexed.length} indexed portfolio documentation entries.`);
      },
      links() {
        const items = Object.entries(destinations);
        if (!items.length) {
          print("No external destinations are configured.");
          return;
        }
        items.forEach(([id, destination]) => print(`${id.padEnd(18)} ${destination.label || id}`));
      },
      neofetch() {
        const platform = navigator.userAgentData?.platform || navigator.platform || "Browser";
        printBlock(["samael@portfolio", "----------------", `OS: PortfolioOS ${data.version || "3.0"}`, `Host: ${platform}`, "Shell: /bin/portfolio", `Projects: ${projects.length}`, `Games: ${games.length}`, `Uptime: ${formatUptime()}`].join("\n"));
      },
      fastfetch() {
        const platform = navigator.userAgentData?.platform || navigator.platform || "Browser";
        print(`samael@portfolio | PortfolioOS ${data.version || "3.0"} | ${platform} | ${projects.length} projects | ${games.length} games | ${formatUptime()}`);
      },
      ps() {
        print("PID TTY      TIME CMD");
        print("  1 web   00:00:00 portfolio-desktop");
        print("  2 web   00:00:00 terminal");
      },
      top() {
        print(`PortfolioOS ${data.version || "3.0"} | uptime ${formatUptime()} | tasks: 2 | terminal: active`);
      },
      free() {
        const memory = performance.memory;
        if (!memory) {
          print("Browser memory metrics are unavailable in this browser.");
          return;
        }
        const mb = (bytes) => `${Math.round(bytes / 1048576)} MiB`;
        print(`used ${mb(memory.usedJSHeapSize)} | total ${mb(memory.totalJSHeapSize)} | limit ${mb(memory.jsHeapSizeLimit)}`);
      },
      df() {
        print("Filesystem            Size  Used Avail Use% Mounted on");
        print("portfolio://virtual      ∞     0     ∞   0% /home/samael/portfolio");
      },
      cal() {
        printBlock(calendar());
      },
      uuid() {
        if (crypto.randomUUID) {
          print(crypto.randomUUID());
          return;
        }
        print("UUID generation is unavailable in this browser.", "error");
      },
      rand(argument) {
        const parsed = Number.parseInt(argument.trim() || "100", 10);
        if (!Number.isFinite(parsed) || parsed < 0 || parsed > 1000000000) {
          print("usage: rand [max], where max is 0..1000000000", "error");
          return;
        }
        const max = parsed + 1;
        if (crypto.getRandomValues) {
          const values = new Uint32Array(1);
          crypto.getRandomValues(values);
          print(values[0] % max);
          return;
        }
        print(Math.floor(Math.random() * max));
      },
      upper(argument) {
        print(argument.toUpperCase());
      },
      lower(argument) {
        print(argument.toLowerCase());
      },
      reverse(argument) {
        print([...argument].reverse().join(""));
      },
      length(argument) {
        print([...argument].length);
      },
      repeat(argument) {
        const match = argument.match(/^(\d+)\s+(.+)$/);
        if (!match) {
          print("usage: repeat <count> <text>", "error");
          return;
        }
        const count = Math.min(20, Math.max(0, Number(match[1])));
        for (let index = 0; index < count; index += 1) print(match[2]);
      },
      platform() {
        print(navigator.userAgentData?.platform || navigator.platform || "Browser");
      },
      online() {
        print(navigator.onLine ? "online" : "offline");
      },
      motd() {
        print("Welcome to Samael's portfolio terminal. Type 'help' to explore.");
      },
      fortune() {
        print(fortunes[Math.floor(Math.random() * fortunes.length)]);
      },
      pudding() {
        print("Pompompurin says: the pudding files are organized.");
      },
      purin() {
        handlers.pudding();
      }
    };

    const run = (raw) => {
      const value = raw.trim();
      if (!value) return;
      print(`${prompt.textContent} ${value}`, "command");
      history.push(value);
      historyIndex = history.length;
      const [nameRaw, ...args] = value.split(/\s+/);
      const name = nameRaw.toLowerCase();
      const argument = args.join(" ");
      const normalizedValue = value.toLowerCase().replace(/\s+/g, " ");

      if (smartCommandPatterns.some((pattern) => pattern.test(normalizedValue))) {
        print("you are really smart");
        return;
      }
      if (actionAliases[name] && !argument) {
        executeAction(actionAliases[name]);
        return;
      }
      const handler = handlers[name];
      if (handler) {
        handler(argument);
        return;
      }
      print(`${name}: command not found. Type 'help'.`, "error");
    };

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = input.value;
      input.value = "";
      run(value);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!history.length) return;
        historyIndex = Math.max(0, historyIndex - 1);
        input.value = history[historyIndex] || "";
        input.setSelectionRange(input.value.length, input.value.length);
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!history.length) return;
        historyIndex = Math.min(history.length, historyIndex + 1);
        input.value = history[historyIndex] || "";
        input.setSelectionRange(input.value.length, input.value.length);
      } else if (event.key === "Tab") {
        event.preventDefault();
        const current = input.value.trim().toLowerCase();
        if (!current || current.includes(" ")) return;
        const matches = commands.filter((command) => command.startsWith(current));
        if (matches.length === 1) input.value = `${matches[0]} `;
        else if (matches.length > 1) print(matches.join("  "));
      }
    });

    app.addEventListener("pointerdown", () => input.focus({ preventScroll: true }));
    updatePrompt();
    print("Samael Portfolio Terminal");
    print(`Type 'help' for command groups or 'commands' for all ${commands.length} commands. No shell or JavaScript evaluation is available.`);
    requestAnimationFrame(() => input.focus({ preventScroll: true }));
    return null;
  }

  programs.set("terminal", {
    build() {
      const app = create("div", "terminal-app");
      app.dataset.terminalApp = "";
      const output = create("div", "terminal-output");
      output.dataset.terminalOutput = "";
      output.setAttribute("role", "log");
      output.setAttribute("aria-live", "polite");
      const form = create("form", "terminal-form");
      form.dataset.terminalForm = "";
      const prompt = create("span", "terminal-prompt", "samael@portfolio:~$");
      prompt.dataset.terminalPrompt = "";
      const input = create("input", "terminal-input");
      input.dataset.terminalInput = "";
      input.type = "text";
      input.autocomplete = "off";
      input.spellcheck = false;
      input.setAttribute("aria-label", "Terminal command");
      form.append(prompt, input);
      app.append(output, form);
      return app;
    },
    initialize,
    focus(container) {
      container.querySelector("[data-terminal-input]")?.focus({ preventScroll: true });
    }
  });
})();
