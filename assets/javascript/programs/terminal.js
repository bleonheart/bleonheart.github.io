(() => {
  "use strict";

  const programs = window.PortfolioPrograms instanceof Map ? window.PortfolioPrograms : (window.PortfolioPrograms = new Map());
  const data = window.PORTFOLIO_DATA || { projects: [], games: [], applications: [], destinations: {} };
  const version = `portfolio-desktop ${data.version || "3.0"}`;
  const homePath = "/home/samael/portfolio";
  const commandGroups = {
    portfolio: ["about", "apps", "creations", "current", "discord", "docs", "featured", "game", "games", "github", "legacy", "lilia", "links", "modules", "open", "pivity", "play", "portfolio", "project", "projects", "random", "repo", "reviews", "search", "skills", "stats", "status", "tech"],
    shell: ["alias", "cat", "cd", "clear", "cls", "commands", "dir", "echo", "env", "find", "grep", "head", "help", "history", "ls", "man", "printenv", "printf", "pwd", "tail", "tree", "type", "wc", "whereis", "which"],
    system: ["cal", "date", "df", "fastfetch", "free", "groups", "hostname", "id", "languages", "neofetch", "online", "platform", "ps", "time", "top", "uname", "uptime", "version", "whoami"],
    utilities: ["fortune", "length", "lower", "motd", "pudding", "purin", "rand", "repeat", "reverse", "upper", "uuid"]
  };
  const linuxCommandGroups = {
    filesystem: "basename dirname realpath readlink stat file touch mkdir rmdir cp mv rm ln unlink mktemp truncate install sync du mount umount lsblk blkid findmnt pwdx tree lsattr chattr namei pathchk rename locate updatedb pushd popd dirs chroot pivot_root mkfifo mknod",
    text: "sort uniq cut paste join comm split csplit tr sed awk rev tac nl fold fmt expand unexpand column pr od hexdump xxd strings iconv dos2unix unix2dos base64 base32 basenc sha256sum sha1sum md5sum b2sum cksum sum shuf seq yes factor numfmt printf tee sponge more less most diff diff3 sdiff cmp patch grep egrep fgrep rg perl jq yq xmlstarlet tidy recode",
    processes: "pstree pgrep pidof pkill kill killall nice renice nohup timeout wait jobs bg fg disown watch sleep usleep xargs parallel ionice taskset chrt strace ltrace lsof fuser vmstat iostat mpstat sar htop atop btop dmesg journalctl systemctl service systemd-analyze loginctl timedatectl localectl hostnamectl sysctl ulimit prlimit uptime w who last lastlog users tty stty reset tput clear screen tmux byobu",
    networking: "ip ifconfig iw iwconfig nmcli nmtui resolvectl networkctl hostname dig nslookup host ping ping6 tracepath traceroute traceroute6 mtr route ss netstat arp arping iperf iperf3 ethtool tcpdump tshark nmap nc netcat ncat socat telnet ssh ssh-keygen ssh-copy-id scp sftp rsync curl wget httpie http openssl nft iptables ufw firewall-cmd fail2ban-client wg wg-quick openvpn nm-connection-editor whois ftp lftp links lynx w3m",
    packages: "apt apt-get apt-cache apt-mark dpkg dpkg-query snap flatpak dnf yum rpm pacman yay paru zypper apk emerge ebuild nix nix-env nix-shell brew pip pip3 pipx poetry uv npm npx pnpm yarn bun cargo rustup gem composer go gradle mvn make cmake ninja meson autotools autoreconf",
    development: "git gh git-lfs svn hg fossil gcc g++ clang clang++ cc ld nm objdump readelf strip ar as gdb lldb valgrind cppcheck shellcheck shfmt bash zsh fish dash python python3 node ruby lua php java javac kotlin go rustc cargo docker podman kubectl helm minikube kind terraform ansible ansible-playbook vagrant packer nginx apache2 httpd mysql mariadb psql sqlite3 redis-cli mongosh systemd-run",
    accounts: "useradd usermod userdel adduser deluser passwd chpasswd chage groupadd groupmod groupdel gpasswd groups getent id su sudo visudo whoami umask chmod chown chgrp setfacl getfacl lsmod modprobe insmod rmmod modinfo udevadm login ssh-agent ssh-add gpg gpgconf openssl certbot passwdqc",
    archives: "tar gzip gunzip zcat bzip2 bunzip2 bzcat xz unxz xzcat zstd unzstd zip unzip zipinfo 7z 7za rar unrar cpio ar pax lz4 brotli pigz rsync dd shred wipe fallocate mkfs fsck fdisk parted gdisk sfdisk tune2fs resize2fs e2fsck mkswap swapon swapoff cryptsetup losetup smartctl hdparm badblocks",
    hardware: "lscpu lsmem lspci lsusb lshw lsscsi dmidecode hwinfo sensors fancontrol inxi nvidia-smi glxinfo vulkaninfo upower acpi acpid lsinitramfs lslocks lsns findmnt df free numactl dstat iotop iftop nethogs powertop perf stress stress-ng speedtest test uname arch nproc getconf ldd ltrace etime"
  };
  Object.entries(linuxCommandGroups).forEach(([group, items]) => {
    commandGroups[group] = items.split(/\s+/).filter(Boolean);
  });
  const commands = [...new Set(Object.values(commandGroups).flat())].sort();
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
  const linuxManual = {
    mkdir: "mkdir [-p] <path> — create a directory in the virtual filesystem",
    touch: "touch <file> — create an empty virtual file",
    cp: "cp <source> <target> — copy a virtual file",
    mv: "mv <source> <target> — move a virtual file",
    rm: "rm <file> — remove an in-memory virtual file only",
    rmdir: "rmdir <path> — delete an empty virtual directory",
    stat: "stat <path> — show metadata for a virtual entry",
    file: "file <path> — identify a virtual file type",
    du: "du [path] — estimate virtual file sizes",
    sort: "sort <file|text> — sort text lines",
    uniq: "uniq <file|text> — remove consecutive repeated lines",
    seq: "seq <end> | seq <start> <end> — generate a numeric sequence",
    base64: "base64 [-d] <text> — encode or decode UTF-8 text",
    sha256sum: "sha256sum <file|text> — compute a browser SHA-256 hash",
    sha1sum: "sha1sum <file|text> — compute a browser SHA-1 hash",
    ip: "ip addr|route|link — display simulated virtual network interfaces",
    ping: "ping <host> — show a browser-sandbox limitation; packets are not sent",
    systemctl: "systemctl [status] — display simulated service information; never changes host services",
    git: "git status|log|branch|version — inspect the simulated portfolio repository",
    docker: "docker ps|images|version — show simulated container information",
    apt: "apt list|search <term>|--version — package manager demo; cannot install packages",
    curl: "curl <url> — browser terminal cannot make arbitrary network requests",
    sudo: "sudo <command> — privilege escalation is disabled in this browser terminal"
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
    const virtualFiles = new Map();
    const virtualDirectories = new Set([homePath, ...["projects", "creations", "games", "reviews", "terminal"].map((name) => `${homePath}/${name}`)]);
    const directoryStack = [];
    const aliases = new Map([["ll", "ls"], ["la", "ls"], ["cls", "clear"]]);
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

    const isDirectory = (path) => virtualDirectories.has(path);

    const listDirectory = (path) => {
      if (!isDirectory(path)) return null;
      const base = path === homePath ? ["projects/", "creations/", "games/", "reviews/", "terminal/", "README.md", "skills.txt", "version.txt"]
        : path === `${homePath}/projects` ? projects.map((project) => project.id)
        : path === `${homePath}/games` ? games.map((game) => game.id)
        : path === `${homePath}/terminal` ? ["commands.txt", "motd.txt"] : [];
      for (const directory of virtualDirectories) {
        if (directory !== path && directory.slice(0, directory.lastIndexOf("/")) === path) base.push(`${directory.split("/").pop()}/`);
      }
      for (const file of virtualFiles.keys()) {
        if (file.slice(0, file.lastIndexOf("/")) === path) base.push(file.split("/").pop());
      }
      return [...new Set(base)];
    };

    const readVirtualFile = (path) => {
      const resolved = normalizePath(path);
      const fixedFiles = {
        [`${homePath}/README.md`]: "Samael Portfolio Terminal\nA browser-based command interface for navigating projects, games, creations, reviews, and portfolio information.\nUse 'help' for command groups.\nUse 'commands' for the complete command list.",
        [`${homePath}/skills.txt`]: "GLua, Python, Bash/Shell, PowerShell, GDScript, JavaScript, TypeScript, Java, Go, Unity, Godot, web, SQL, Linux/Windows, Docker, Kubernetes, CI/CD, game-server infrastructure.",
        [`${homePath}/version.txt`]: version,
        [`${homePath}/terminal/commands.txt`]: commands.join("\n"),
        [`${homePath}/terminal/motd.txt`]: "Welcome to Samael's portfolio terminal."
      };
      if (virtualFiles.has(resolved)) return virtualFiles.get(resolved);
      if (Object.hasOwn(fixedFiles, resolved)) return fixedFiles[resolved];
      if (resolved.startsWith(`${homePath}/projects/`)) {
        const project = projectById(resolved.slice(`${homePath}/projects/`.length));
        if (project) return `${project.name}\n${project.summary}\nYears: ${project.years || "Not listed"}\nStatus: ${data.statusLabels?.[project.status] || project.status}\nLifecycle: ${project.lifecycle}\nTechnologies: ${(project.technologies || []).join(", ")}`;
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
        print(manual[target] || linuxManual[target] || `${target} — Linux command (${Object.entries(linuxCommandGroups).find(([, names]) => names.split(/\s+/).includes(target))?.[0] || "utility"}). Available as a documented command in this browser simulator; host execution is disabled.`);
        return;
      }
      print(`Portfolio Linux terminal: ${commands.length} known commands. Files are virtual; host execution is disabled.`);
      print("Command groups:");
      Object.entries(commandGroups).forEach(([group, items]) => print(`${group.padEnd(12)} ${items.length} commands — ${items.slice(0, 9).join(" ")}${items.length > 9 ? " ..." : ""}`));
      print("Use 'commands [group]', 'man <command>', or 'help <command>' for more.");
    };

    const handlers = {
      help(argument) {
        printHelp(argument);
      },
      commands(argument) {
        const group = argument.trim().toLowerCase();
        if (group && !commandGroups[group]) {
          print(`commands: unknown group '${group}'`, "error");
          return;
        }
        if (group) {
          print(`${group} (${commandGroups[group].length}): ${commandGroups[group].join("  ")}`);
          return;
        }
        Object.entries(commandGroups).forEach(([name, items]) => print(`${name}: ${items.join("  ")}`));
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
        featured.forEach((project) => print(`${project.name}${project.years ? ` (${project.years})` : ""} — ${project.summary}`));
      },
      status() {
        if (!projects.length) {
          print("No projects are indexed.");
          return;
        }
        projects.forEach((project) => print(`${project.name}: ${data.statusLabels?.[project.status] || project.status} (${project.lifecycle})${project.years ? ` · ${project.years}` : ""}`));
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

    const tokens = (text) => (text.match(/"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\S+/g) || []).map((part) => {
      if ((part.startsWith('"') && part.endsWith('"')) || (part.startsWith("'") && part.endsWith("'"))) return part.slice(1, -1);
      return part;
    });
    const withinHome = (path) => path === homePath || path.startsWith(`${homePath}/`);
    const writablePath = (path, command) => {
      const full = normalizePath(path);
      if (!withinHome(full)) {
        print(`${command}: access outside the virtual portfolio filesystem is denied`, "error");
        return null;
      }
      return full;
    };
    const parentPath = (path) => path.slice(0, path.lastIndexOf("/")) || "/";
    const fileExists = (path) => readVirtualFile(path) !== null;
    const writeFile = (path, value, command = "write") => {
      const full = writablePath(path, command);
      if (!full) return false;
      if (!isDirectory(parentPath(full))) {
        print(`${command}: parent directory does not exist`, "error");
        return false;
      }
      if (isDirectory(full) || (fileExists(full) && !virtualFiles.has(full))) {
        print(`${command}: protected virtual entry`, "error");
        return false;
      }
      if (String(value).length > 65536 || (virtualFiles.size >= 250 && !virtualFiles.has(full))) {
        print(`${command}: virtual filesystem limit reached`, "error");
        return false;
      }
      virtualFiles.set(full, String(value));
      return true;
    };
    const readArg = (argument) => {
      const path = argument.trim();
      const content = path ? readVirtualFile(path) : null;
      return content === null ? path : content;
    };
    const virtualPaths = () => [...virtualDirectories, ...virtualFiles.keys()];
    const details = (name, description) => print(`${name}: ${description} [virtual browser environment]`);
    const lines = (text) => String(text).split("\n");
    const listSafe = (items, limit = 100) => {
      items.slice(0, limit).forEach((item) => print(item));
      if (items.length > limit) print(`... ${items.length - limit} more entries (output limited)`);
    };
    const resolveArguments = (argument) => tokens(argument).filter((part) => !part.startsWith("-"));

    Object.assign(handlers, {
      ls(argument) {
        const args = resolveArguments(argument);
        const requested = args[0] || ".";
        const full = normalizePath(requested);
        const entries = listDirectory(full);
        if (!entries) {
          if (fileExists(full)) print(requested);
          else print(`ls: cannot access '${requested}': No such file or directory`, "error");
          return;
        }
        const all = /(^|\s)-[^\s]*a/.test(argument);
        const detailed = /(^|\s)-[^\s]*l/.test(argument);
        const visible = all ? ["./", "../", ...entries] : entries.filter((item) => !item.startsWith("."));
        if (!detailed) {
          print(visible.join("  "));
          return;
        }
        listSafe(visible.map((item) => `${item.endsWith("/") ? "drwxr-xr-x" : "-rw-r--r--"}  1 samael samael ${String(virtualFiles.get(`${full}/${item}`)?.length || 0).padStart(6)} ${item}`));
      },
      dir(argument) { handlers.ls(argument); },
      mkdir(argument) {
        const recursive = /(^|\s)-p(\s|$)/.test(argument);
        const paths = resolveArguments(argument);
        if (!paths.length) return print("mkdir: missing operand", "error");
        paths.forEach((path) => {
          const full = writablePath(path, "mkdir");
          if (!full) return;
          if (fileExists(full)) return print(`mkdir: ${path}: File exists`, "error");
          if (isDirectory(full)) {
            if (!recursive) print(`mkdir: ${path}: File exists`, "error");
            return;
          }
          if (recursive) {
            const missing = [];
            for (let dir = full; !isDirectory(dir) && withinHome(dir); dir = parentPath(dir)) missing.unshift(dir);
            if (!isDirectory(parentPath(missing[0] || full))) return print(`mkdir: cannot create ${path}`, "error");
            missing.forEach((dir) => virtualDirectories.add(dir));
          } else if (isDirectory(parentPath(full))) virtualDirectories.add(full);
          else print(`mkdir: ${path}: No such directory`, "error");
        });
      },
      touch(argument) {
        const names = resolveArguments(argument);
        if (!names.length) return print("touch: missing file operand", "error");
        names.forEach((name) => {
          const full = writablePath(name, "touch");
          if (!full) return;
          if (isDirectory(full)) return;
          if (fileExists(full) && !virtualFiles.has(full)) return;
          if (!virtualFiles.has(full)) writeFile(name, "", "touch");
        });
      },
      cp(argument) {
        const args = resolveArguments(argument);
        if (args.length !== 2) return print("usage: cp <source> <target>", "error");
        const content = readVirtualFile(args[0]);
        if (content === null) return print(`cp: cannot stat '${args[0]}'`, "error");
        const destination = normalizePath(args[1]);
        writeFile(isDirectory(destination) ? `${args[1]}/${args[0].split("/").pop()}` : args[1], content, "cp");
      },
      mv(argument) {
        const args = resolveArguments(argument);
        if (args.length !== 2) return print("usage: mv <source> <target>", "error");
        const source = writablePath(args[0], "mv");
        if (!source) return;
        if (!virtualFiles.has(source)) return print("mv: source is not a writable virtual file", "error");
        const destPath = normalizePath(args[1]);
        const target = isDirectory(destPath) ? `${args[1]}/${args[0].split("/").pop()}` : args[1];
        if (writeFile(target, virtualFiles.get(source), "mv")) virtualFiles.delete(source);
      },
      rm(argument) {
        const names = resolveArguments(argument);
        if (!names.length) return print("rm: missing operand", "error");
        for (const name of names) {
          const full = writablePath(name, "rm");
          if (!full) continue;
          if (virtualFiles.has(full)) virtualFiles.delete(full);
          else if (isDirectory(full)) print(`rm: ${name}: Is a directory (use rmdir for empty virtual directories)`, "error");
          else if (fileExists(full)) print(`rm: ${name}: read-only portfolio file`, "error");
          else if (!/(^|\s)-f/.test(argument)) print(`rm: ${name}: No such file`, "error");
        }
      },
      unlink(argument) { handlers.rm(argument); },
      rmdir(argument) {
        const args = resolveArguments(argument);
        if (!args.length) return print("rmdir: missing operand", "error");
        for (const name of args) {
          const full = writablePath(name, "rmdir");
          if (!full) continue;
          if (full === homePath || !virtualDirectories.has(full)) return print(`rmdir: ${name}: Not removable`, "error");
          if ([...virtualPaths()].some((path) => path.startsWith(`${full}/`))) return print(`rmdir: ${name}: Directory not empty`, "error");
          if (["projects", "games", "terminal", "creations", "reviews"].some((part) => full === `${homePath}/${part}`)) return print(`rmdir: ${name}: protected directory`, "error");
          virtualDirectories.delete(full);
        }
      },
      mktemp() {
        const name = `tmp-${Math.random().toString(36).slice(2, 10)}`;
        if (writeFile(name, "", "mktemp")) print(`${currentPath}/${name}`);
      },
      truncate(argument) {
        const parts = tokens(argument);
        const index = parts.indexOf("-s");
        const size = Number(parts[index + 1]);
        const name = parts[index + 2];
        if (index < 0 || !Number.isInteger(size) || size < 0 || size > 65536 || !name) return print("usage: truncate -s <0..65536> <file>", "error");
        const existing = readVirtualFile(name) || "";
        writeFile(name, existing.slice(0, size).padEnd(size, "\0"), "truncate");
      },
      stat(argument) {
        const name = resolveArguments(argument)[0];
        if (!name) return print("usage: stat <file>", "error");
        const path = normalizePath(name);
        const content = readVirtualFile(name);
        if (!isDirectory(path) && content === null) return print(`stat: ${name}: No such file`, "error");
        print(`File: ${path}\nSize: ${isDirectory(path) ? 4096 : new TextEncoder().encode(content).length}  Type: ${isDirectory(path) ? "directory" : "regular file"}\nAccess: ${isDirectory(path) ? "0755" : "0644"}  Owner: samael (virtual)`);
      },
      file(argument) {
        const name = resolveArguments(argument)[0];
        if (!name) return print("usage: file <file>", "error");
        const path = normalizePath(name);
        if (isDirectory(path)) return print(`${name}: directory`);
        const value = readVirtualFile(name);
        print(value === null ? `${name}: cannot open (No such file)` : `${name}: Unicode text, UTF-8 (virtual)`);
      },
      du(argument) {
        const path = normalizePath(resolveArguments(argument)[0] || ".");
        const files = [...virtualFiles.entries()].filter(([name]) => name === path || name.startsWith(`${path}/`));
        const total = files.reduce((sum, [, content]) => sum + new TextEncoder().encode(content).length, 0);
        print(`${Math.ceil(total / 1024) || 0}K\t${path} (virtual writable files)`);
      },
      basename(argument) { print((tokens(argument)[0] || "").replace(/\/+$/, "").split("/").pop() || "/"); },
      dirname(argument) {
        const value = tokens(argument)[0] || "";
        const parts = value.replace(/\/+$/, "").split("/");
        parts.pop();
        print(parts.join("/") || (value.startsWith("/") ? "/" : "."));
      },
      realpath(argument) { print(normalizePath(tokens(argument)[0] || ".")); },
      readlink(argument) { print(`readlink: ${(tokens(argument)[0] || "")}: not a symbolic link in the virtual filesystem`, "error"); },
      pwdx() { print(`2: ${currentPath}`); },
      pushd(argument) {
        if (!argument.trim()) return print("pushd: directory required", "error");
        const full = normalizePath(argument);
        if (!isDirectory(full)) return print(`pushd: ${argument}: No such directory`, "error");
        directoryStack.push(currentPath);
        currentPath = full;
        updatePrompt();
        print([currentPath, ...directoryStack.slice().reverse()].join(" "));
      },
      popd() {
        if (!directoryStack.length) return print("popd: directory stack empty", "error");
        currentPath = directoryStack.pop();
        updatePrompt();
        print([currentPath, ...directoryStack.slice().reverse()].join(" "));
      },
      dirs() { print([currentPath, ...directoryStack.slice().reverse()].join(" ")); },
      find(argument) {
        const parts = tokens(argument);
        if (parts.length && [".", "~"].some((prefix) => parts[0] === prefix || parts[0].startsWith(`${prefix}/`)) || parts[0]?.startsWith("/")) {
          const dir = normalizePath(parts[0]);
          const nameIndex = parts.indexOf("-name");
          const expression = nameIndex < 0 ? "" : (parts[nameIndex + 1] || "").replaceAll("*", "").toLowerCase();
          const found = virtualPaths().filter((path) => (path === dir || path.startsWith(`${dir}/`)) && path.toLowerCase().includes(expression));
          listSafe(found.map((path) => path.replace(homePath, "~")));
          return;
        }
        const query = argument.toLowerCase().trim();
        if (!query) return print("usage: find <term> or find . -name <pattern>", "error");
        listSafe(entries().filter((entry) => `${entry.title} ${entry.id}`.toLowerCase().includes(query)).slice(0, 30).map((entry) => `${entry.id}  ${entry.title}`));
      },
      locate(argument) {
        const term = argument.trim().toLowerCase();
        if (!term) return print("usage: locate <name>", "error");
        listSafe(virtualPaths().filter((path) => path.toLowerCase().includes(term)));
      },
      cat(argument) {
        const args = resolveArguments(argument);
        if (!args.length) return print("usage: cat <file> [file ...]", "error");
        args.forEach((path) => {
          const value = readVirtualFile(path);
          if (value === null) print(`cat: ${path}: No such file`, "error");
          else printBlock(value.slice(0, 65536));
        });
      },
      wc(argument) {
        const value = readArg(argument);
        if (!value) return print("usage: wc <file|text>", "error");
        print(`${value.split("\n").length}  ${value.trim().split(/\s+/).filter(Boolean).length}  ${new TextEncoder().encode(value).length}${fileExists(argument) ? `  ${argument}` : ""}`);
      },
      sort(argument) {
        if (!argument.trim()) return print("usage: sort <file|text>", "error");
        const list = lines(readArg(resolveArguments(argument).join(" ")));
        const numeric = /(^|\s)-n(\s|$)/.test(argument);
        list.sort(numeric ? (a, b) => Number(a) - Number(b) : (a, b) => a.localeCompare(b));
        if (/(^|\s)-r(\s|$)/.test(argument)) list.reverse();
        listSafe(list);
      },
      uniq(argument) {
        if (!argument.trim()) return print("usage: uniq <file|text>", "error");
        const value = lines(readArg(argument));
        listSafe(value.filter((item, index) => index === 0 || item !== value[index - 1]));
      },
      tac(argument) { listSafe(lines(readArg(argument)).reverse()); },
      rev(argument) { listSafe(lines(readArg(argument)).map((item) => [...item].reverse().join(""))); },
      nl(argument) { listSafe(lines(readArg(argument)).map((line, index) => `${String(index + 1).padStart(6)}  ${line}`)); },
      seq(argument) {
        const args = tokens(argument).map(Number);
        if (!args.length || args.length > 3 || args.some((item) => !Number.isFinite(item))) return print("usage: seq [start [step]] end", "error");
        const start = args.length === 1 ? 1 : args[0];
        const step = args.length === 3 ? args[1] : 1;
        const end = args[args.length - 1];
        if (!step || Math.abs((end - start) / step) > 5000) return print("seq: step invalid or output too large", "error");
        const outputLines = [];
        for (let value = start; step > 0 ? value <= end : value >= end; value += step) {
          outputLines.push(Number(value.toFixed(9)).toString());
          if (outputLines.length >= 150) break;
        }
        listSafe(outputLines);
      },
      factor(argument) {
        let value = Number(argument.trim());
        if (!Number.isSafeInteger(value) || value <= 0 || value > 100000000) return print("usage: factor <integer 1..100000000>", "error");
        const result = [];
        const original = value;
        for (let divisor = 2; divisor * divisor <= value; divisor++) while (value % divisor === 0) {
          result.push(divisor);
          value /= divisor;
        }
        if (value > 1) result.push(value);
        print(`${original}: ${result.join(" ")}`);
      },
      yes(argument) { listSafe(Array(8).fill(argument || "y")); print("yes: output limited to eight lines in the browser simulator"); },
      shuf(argument) {
        const list = lines(readArg(argument));
        for (let i = list.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [list[i], list[j]] = [list[j], list[i]];
        }
        listSafe(list);
      },
      cut(argument) {
        const match = argument.match(/-d\s+(\S+)\s+-f\s+(\d+)\s+(.+)/) || argument.match(/-f\s+(\d+)\s+(.+)/);
        if (!match) return print("usage: cut -d <delimiter> -f <field> <file|text>", "error");
        const separator = match.length === 4 ? match[1] : "\t";
        const field = Number(match.length === 4 ? match[2] : match[1]) - 1;
        const body = match.length === 4 ? match[3] : match[2];
        listSafe(lines(readArg(body)).map((line) => line.split(separator)[field] || ""));
      },
      tr(argument) {
        const args = tokens(argument);
        if (args.length !== 3) return print("usage: tr <characters> <replacements> <text>", "error");
        const [from, to, value] = args;
        print([...value].map((c) => {
          const index = from.indexOf(c);
          return index < 0 ? c : (to[Math.min(index, to.length - 1)] || "");
        }).join(""));
      },
      diff(argument) {
        const args = tokens(argument);
        if (args.length !== 2) return print("usage: diff <file1> <file2>", "error");
        const a = readVirtualFile(args[0]);
        const b = readVirtualFile(args[1]);
        if (a === null || b === null) return print("diff: missing virtual file", "error");
        if (a === b) return print("Files are identical");
        const first = lines(a);
        const second = lines(b);
        listSafe([`--- ${args[0]}`, `+++ ${args[1]}`, ...first.filter((v) => !second.includes(v)).map((v) => `- ${v}`), ...second.filter((v) => !first.includes(v)).map((v) => `+ ${v}`)]);
      },
      cmp(argument) {
        const args = tokens(argument);
        if (args.length !== 2) return print("usage: cmp <file1> <file2>", "error");
        const a = readVirtualFile(args[0]);
        const b = readVirtualFile(args[1]);
        if (a === null || b === null) return print("cmp: missing virtual file", "error");
        print(a === b ? "Files are identical" : `${args[0]} ${args[1]} differ`);
      },
      base64(argument) {
        const decode = /^(-d|--decode)\s+/.test(argument);
        const value = readArg(argument.replace(/^(-d|--decode)\s+/, ""));
        try {
          if (decode) {
            const bytes = Uint8Array.from(atob(value.replace(/\s+/g, "")), (letter) => letter.charCodeAt(0));
            print(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
          } else {
            const bytes = new TextEncoder().encode(value);
            if (bytes.length > 65536) return print("base64: input too large", "error");
            print(btoa(Array.from(bytes, (byte) => String.fromCharCode(byte)).join("")));
          }
        } catch {
          print("base64: invalid encoded data", "error");
        }
      },
      sha256sum(argument) { hash("SHA-256", argument); },
      sha1sum(argument) { hash("SHA-1", argument); },
      cksum(argument) { print(`cksum: try sha256sum <file|text> for a verified browser hash`); },
      printf(argument) { printBlock(argument.replace(/\\n/g, "\n").replace(/\\t/g, "\t")); },
      tee(argument) { print("tee: interactive stdin and shell pipes are unavailable; use touch and cp in the virtual filesystem", "error"); },
      less(argument) { handlers.cat(argument); },
      more(argument) { handlers.cat(argument); },
      watch(argument) { print(`watch: periodic host execution is unavailable. Command requested: ${argument}`); },
      sleep(argument) {
        const n = Number(argument);
        if (!Number.isFinite(n) || n < 0) return print("sleep: invalid interval", "error");
        print("sleep: no blocking delay in this interactive browser terminal");
      },
      nproc() { print(navigator.hardwareConcurrency || 1); },
      arch() { print(navigator.userAgentData?.architecture || "browser-virtual"); },
      tty() { print("/dev/pts/0 (virtual)"); },
      users() { print("samael"); },
      who() { print("samael   pts/0   browser (virtual)"); },
      w() { handlers.who(); },
      hostnamectl() { print(`Static hostname: portfolio\nOperating System: PortfolioOS (browser simulator)\nKernel: Browser runtime\nArchitecture: ${navigator.userAgentData?.platform || navigator.platform || "browser"}`); },
      timedatectl() { print(`Local time: ${new Date().toString()}\nTime zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\nRTC time: simulated`); },
      lscpu() { print(`Architecture: ${navigator.userAgentData?.platform || "browser"}\nCPU(s): ${navigator.hardwareConcurrency || "not available"}\nVirtualization: Browser Sandbox`); },
      lsmem() { print("Memory blocks: not accessible from browser JavaScript"); },
      lsblk() { print("NAME  TYPE MOUNTPOINT\nvirtual disk /home/samael/portfolio (in-memory)"); },
      mount() { print(`portfolio://virtual on ${homePath} type virtual (rw,in-memory)`); },
      findmnt() { handlers.mount(); },
      df() { print(`Filesystem         Size Used Avail Mounted on\nportfolio://virtual 64KiB 0KiB 64KiB ${homePath} (per file)`); },
      ip(argument) {
        const target = argument.trim();
        if (!target || /^(a|addr|address|link|l)/.test(target)) return print("1: lo: <LOOPBACK,UP> mtu 65536\n    inet 127.0.0.1/8 scope host lo\n2: web0: <BROWSER,SANDBOX> (no host network interface access)");
        if (/^(r|route)/.test(target)) return print("default via browser-managed network (not directly accessible)");
        print("usage: ip addr | ip link | ip route (simulated)");
      },
      ifconfig() { handlers.ip("addr"); },
      route() { handlers.ip("route"); },
      ss(argument) { print(`Netid State  Local Address  Peer Address\n${argument.includes("l") ? "tcp   LISTEN browser-managed (sockets not observable)" : "No inspectable host sockets in this sandbox"}`); },
      netstat(argument) { handlers.ss(argument); },
      arp() { print("ARP table is not accessible from the browser sandbox."); },
      resolvectl() { print("DNS resolution is controlled by the browser and operating system."); },
      networkctl() { print("Host network management is unavailable in the browser sandbox."); },
      ping(argument) { print(`ping: ${argument.trim() || "host"}: raw ICMP sockets are unavailable in browsers; no packets sent.`); },
      ping6(argument) { handlers.ping(argument); },
      traceroute(argument) { print(`traceroute: ${argument.trim() || "host"}: raw packet tracing is unavailable in browsers.`); },
      tracepath(argument) { handlers.traceroute(argument); },
      dig(argument) { print(`dig: cannot query DNS directly in the browser terminal (${argument.trim() || "no domain"}).`); },
      nslookup(argument) { handlers.dig(argument); },
      host(argument) { handlers.dig(argument); },
      curl() { print("curl: arbitrary network requests are disabled in the virtual portfolio terminal."); },
      wget() { handlers.curl(); },
      ssh() { print("ssh: remote shell connections are disabled in the browser sandbox."); },
      scp() { handlers.ssh(); },
      sftp() { handlers.ssh(); },
      sudo() { print("sudo: no elevated permissions or host command execution are available."); },
      su() { handlers.sudo(); },
      passwd() { print("passwd: accounts are simulated; system passwords cannot be changed here."); },
      chmod() { print("chmod: virtual files use fixed in-memory permissions; nothing on your device was changed."); },
      chown() { print("chown: virtual files are owned by samael; host ownership cannot be changed."); },
      chgrp() { handlers.chown(); },
      umask() { print("0022"); },
      systemctl(argument) {
        const args = tokens(argument);
        if (!args.length || args[0] === "status") return print("● portfolio.service - Portfolio Desktop\n   Loaded: simulated\n   Active: active (running)\n   Unit changes are unavailable in the browser.");
        if (["list-units", "list-unit-files"].includes(args[0])) return print("portfolio.service    loaded active running  Portfolio Desktop (virtual)");
        print(`systemctl ${args[0]}: host service management is disabled in the browser sandbox.`);
      },
      service(argument) { handlers.systemctl(argument); },
      journalctl(argument) { print(`-- Virtual portfolio journal --\n${new Date().toISOString()} portfolio: terminal ready\nNo host journal access.`); },
      dmesg() { print("[0.000000] PortfolioOS virtual terminal started\nHost kernel ring buffer is not accessible from browsers."); },
      sysctl() { print("sysctl: reading or changing host kernel settings is unavailable in a browser."); },
      ps(argument) { print("PID TTY       STAT CMD\n  1 web       Ss   portfolio-desktop (virtual)\n  2 pts/0     R+   terminal (virtual)"); },
      pstree() { print("portfolio-desktop───terminal (virtual)"); },
      pgrep(argument) { if (/portfolio|terminal/.test(argument)) print("2"); else print("No matching virtual process"); },
      pidof(argument) { handlers.pgrep(argument); },
      kill() { print("kill: host process signals are disabled; virtual terminal remains running."); },
      pkill() { handlers.kill(); },
      killall() { handlers.kill(); },
      top() { print(`PortfolioOS (virtual) - up ${formatUptime()}, 2 tasks\nPID USER    CPU COMMAND\n  1 samael  0.0 portfolio-desktop\n  2 samael  0.0 terminal`); },
      htop() { handlers.top(); },
      btop() { handlers.top(); },
      git(argument) {
        const [sub] = tokens(argument);
        if (!sub || sub === "--help") return print("usage: git <status|branch|log|remote|--version> (virtual read-only repository)");
        if (sub === "--version" || sub === "version") return print("git version 2.x (portfolio simulation)");
        if (sub === "status") return print("On branch main\nnothing to commit, working tree clean (virtual snapshot)");
        if (sub === "branch") return print("* main");
        if (sub === "log") return print("Commit history is not loaded into the browser terminal.");
        if (sub === "remote") return print("No Git remote is connected to the virtual terminal.");
        print(`git ${sub}: real repository operations are unavailable in the browser terminal.`);
      },
      gh(argument) {
        if (argument.trim() === "--version") return print("GitHub CLI (portfolio simulation)");
        print("gh: GitHub authentication and CLI access are not available in the browser terminal.");
      },
      docker(argument) {
        const [sub] = tokens(argument);
        if (sub === "--version" || sub === "version") return print("Docker (portfolio command simulation, no engine attached)");
        if (sub === "ps") return print("CONTAINER ID   IMAGE   COMMAND   STATUS\nNo containers: browser has no Docker daemon.");
        if (sub === "images" || sub === "image") return print("REPOSITORY  TAG  IMAGE ID\nNo local Docker images visible in browser.");
        print("docker: commands are for demonstration only; no container runtime is connected.");
      },
      podman(argument) { handlers.docker(argument); },
      kubectl(argument) {
        const args = tokens(argument);
        if (args[0] === "get") return print(`No Kubernetes cluster is connected; cannot list ${args[1] || "resources"}.`);
        print("kubectl: no cluster configuration is available in this browser.");
      },
      helm() { print("helm: Kubernetes charts cannot be managed from this browser sandbox."); },
      terraform() { print("terraform: infrastructure operations are disabled in the portfolio terminal."); },
      ansible() { print("ansible: remote hosts cannot be managed from the portfolio terminal."); },
      "ansible-playbook"() { handlers.ansible(); },
      apt(argument) {
        if (argument.trim().startsWith("list")) return print("Package installation and installed package lists are not available in browser mode.");
        if (argument.trim().startsWith("search")) return print(`apt: cannot access host package indexes (${argument.slice(6).trim()})`);
        print("apt: package management requires Linux OS access; no changes were made.");
      },
      "apt-get"(argument) { handlers.apt(argument); },
      dnf(argument) { handlers.apt(argument); },
      yum(argument) { handlers.apt(argument); },
      pacman(argument) { handlers.apt(argument); },
      npm(argument) { print(`npm ${argument.trim()}: Node package execution is disabled in the browser terminal.`); },
      npx(argument) { handlers.npm(argument); },
      pip(argument) { print(`pip ${argument.trim()}: Python packages cannot be installed from this browser.`); },
      pip3(argument) { handlers.pip(argument); },
      python() { print("python: code execution is disabled; this is a portfolio command simulator."); },
      python3() { handlers.python(); },
      node() { handlers.python(); },
      bash() { handlers.python(); },
      zsh() { handlers.python(); },
      fish() { handlers.python(); },
      sh() { handlers.python(); },
      shutdown() { print("shutdown: this browser terminal cannot control device power."); },
      reboot() { handlers.shutdown(); },
      poweroff() { handlers.shutdown(); },
      halt() { handlers.shutdown(); },
      fdisk() { print("fdisk: physical disks are inaccessible in the browser; no changes were made."); },
      dd() { handlers.fdisk(); },
      mkfs() { handlers.fdisk(); },
      shred() { print("shred: no host files can be accessed; use rm only for temporary virtual files."); },
      alias(argument) {
        if (!argument.trim()) return listSafe([...aliases].map(([name, command]) => `alias ${name}='${command}'`));
        const match = argument.match(/^([\w-]+)=(['"]?)([\w-]+)\2$/);
        if (!match || !commands.includes(match[3])) return print("usage: alias name=known_command", "error");
        aliases.set(match[1], match[3]);
      },
      unalias(argument) { aliases.delete(argument.trim()); },
      type(argument) {
        const cmd = tokens(argument)[0] || "";
        print(commands.includes(cmd) || aliases.has(cmd) ? `${cmd} is a ${aliases.has(cmd) ? "virtual alias" : "recognized portfolio/Linux command"}` : `${cmd}: not found`);
      },
      which(argument) {
        const cmd = tokens(argument)[0] || "";
        if (!commands.includes(cmd) && !aliases.has(cmd)) return print(`${cmd}: command not found`, "error");
        print(`/usr/bin/${cmd} (virtual)`);
      },
      whereis(argument) {
        const cmd = tokens(argument)[0] || "";
        print(commands.includes(cmd) ? `${cmd}: /usr/bin/${cmd} (virtual)` : `${cmd}:`);
      }
    });

    const hash = async (algorithm, argument) => {
      const text = readArg(argument);
      if (!text) return print(`usage: ${algorithm.toLowerCase().replace("-", "")}sum <file|text>`, "error");
      if (!crypto.subtle) return print("Web Crypto is unavailable in this browser.", "error");
      try {
        const digest = await crypto.subtle.digest(algorithm, new TextEncoder().encode(text));
        const hex = [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
        print(`${hex}  ${fileExists(argument) ? argument : "(text)"}`);
      } catch {
        print(`${algorithm}: hashing failed`, "error");
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

      const redirect = value.match(/^(echo|printf)\s+(.+?)\s*(>>?)\s*(\S+)$/i);
      if (redirect) {
        const target = redirect[4].replace(/^["']|["']$/g, "");
        const source = redirect[2].replace(/^(["'])(.*)\1$/, "$2");
        const content = redirect[1].toLowerCase() === "printf" ? source.replace(/\\n/g, "\n").replace(/\\t/g, "\t") : `${source}\n`;
        const existing = redirect[3] === ">>" ? readVirtualFile(target) || "" : "";
        writeFile(target, `${existing}${content}`, redirect[1].toLowerCase());
        return;
      }
      if (/[;&|`]|\$\(|[<>]/.test(value)) {
        print("Shell operators and command substitution are not available in this browser sandbox.", "error");
        return;
      }
      if (actionAliases[name] && !argument) {
        executeAction(actionAliases[name]);
        return;
      }
      const resolvedName = aliases.get(name) || name;
      const handler = handlers[resolvedName];
      if (handler) {
        handler(argument);
        return;
      }
      if (commands.includes(resolvedName)) {
        print(`${resolvedName}: recognized Linux command, but host execution is unavailable in this browser. Use 'man ${resolvedName}' for its purpose.`, "error");
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
    print(`${commands.length} Linux and portfolio commands indexed. Filesystem operations are simulated in memory; no host shell access.`);
    print("Try: help, commands filesystem, ls, mkdir sandbox, touch sandbox/note.txt, ip addr, git status, docker ps.");
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
