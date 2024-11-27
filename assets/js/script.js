document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    const navLinks = document.querySelectorAll('nav ul li a');
    const sections = document.querySelectorAll('main section');
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const cursor = document.querySelector('.cursor');
    const viewWorkButton = document.querySelector('.cta-button[href="#plugins"]');
    const learnMoreButtons = document.querySelectorAll('.learn-more-button');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupContent = document.querySelector('.popup-content');
    const popupClose = document.querySelector('.popup-close');
    const videos = document.querySelectorAll('.plugin-video video');

    videos.forEach(video => {
        video.disablePictureInPicture = true;
        video.controlsList = "nodownload noremoteplayback";
    });

    learnMoreButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const plugin = button.getAttribute('data-plugin');
            showPopup(plugin);
        });
    });

    popupClose.addEventListener('click', () => {
        hidePopup();
    });

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            hidePopup();
        }
    });

    function showPopup(plugin) {
        const pluginInfo = getPluginInfo(plugin);
        popupContent.querySelector('h3').textContent = pluginInfo.title;
        popupContent.querySelector('p').innerHTML = pluginInfo.description;

        popupOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function hidePopup() {
        popupOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    function getPluginInfo(plugin) {
        const plugins = {
            'serial-number': {
                title: 'Serial Number',
                description: `
                    <p>A system for managing serial numbers on weapons.</p>
                    <ul>
                        <li>Serial numbers can be erased from weapons.</li>
                        <li>Certain weapons can be excluded from having serial numbers.</li>
                        <li>Weapons can be protected from serial number erasure.</li>
                        <li>Combine forces can check for fingerprints on weapons to identify specific characters.</li>
                    </ul>
                `
            },
            'fishing': {
                title: 'Fishing',
                description: `
                    <p>An engaging and customizable fishing system.</p>
                    <ul>
                        <li>Set up a detailed list of possible catches, including items, trash, or money.</li>
                        <li>Features a customizable "sweet spot" mechanic for precise fishing success.</li>
                        <li>Easily extendable to include new items and adjust catch probabilities.</li>
                    </ul>
                `
            },
            'rideable-pets': {
                title: 'Rideable Pets',
                description: `
                    <p>A fun system that allows players to ride pets.</p>
                    <ul>
                        <li>Ride your own pets for unique gameplay experiences.</li>
                        <li>Flying pets can take to the skies using the spacebar.</li>
                        <li>Non-flying pets can sprint faster by holding the shift key.</li>
                        <li>Your character model is displayed riding the pet for added immersion.</li>
                        <li>Includes customizable bone positions for unique or custom pets.</li>
                        <li>Comes with two pre-configured pets ready to use.</li>
                    </ul>
                `
            },
            'tying': {
                title: 'Tying',
                description: `
                    <p>A robust system for restraining mechanics.</p>
                    <ul>
                        <li>Allows players to blindfold others.</li>
                        <li>Enables gagging for added immersion and roleplay.</li>
                        <li>Drag restrained players around freely.</li>
                        <li>Move restrained players into vehicles for transport.</li>
                        <li>Search tied players or request to search them.</li>
                        <li>Includes custom animations for tied players.</li>
                    </ul>
                `
            },
            'food-system': {
                title: 'Food System',
                description: `
                    <p>An essential system for managing survival needs.</p>
                    <ul>
                        <li>Adds hunger and thirst mechanics to gameplay.</li>
                        <li>Thirst prevents stamina regeneration when depleted.</li>
                        <li>Hunger causes starvation, leading to health loss over time.</li>
                        <li>Simple integration for creating new food items.</li>
                        <li>Compatible with the Zero's MasterChef addon for extended functionality.</li>
                    </ul>
                `
            },
            'animation-system': {
                title: 'Animation System',
                description: `
                    <p>An immersive system for adding gestures and poses to enhance roleplay experiences.</p>
                    <ul>
                        <li>Enables players to perform a variety of animations and gestures.</li>
                        <li>Includes a large library of predefined animations:</li>
                        <ul>
                            <li>Surrender Animation</li>
                            <li>Salute Animation</li>
                            <li>Cross Arms Animation</li>
                            <li>At Ease Animation</li>
                            <li>Attention Animation</li>
                            <li>Arms Behind Head Animation</li>
                            <li>Pensive Pose Animation</li>
                            <li>Arms on Belt Animation</li>
                            <li>Typing Animation</li>
                            <li>Cross Arms Behind Back Animation</li>
                        </ul>
                        <li>Animations are customizable for unique roleplay scenarios.</li>
                        <li>Easy-to-use interface for triggering animations during gameplay.</li>
                    </ul>
                `
            },
            'housing-system': {
                title: 'Housing System',
                description: `
                    <p>An advanced system for creating and managing player-owned houses in-game.</p>
                    <ul>
                        <li>Allows designated players to assign door groups to others.</li>
                        <li>Rent can be configured and collected at customizable intervals.</li>
                        <li>Provides tools to easily manage house residents.</li>
                        <li>Data is saved in a database, ensuring optimization and persistence.</li>
                    </ul>
                `
            },
            'animation-wheel': {
                title: 'Animation Wheel',
                description: `
                    <p>An intuitive system for selecting and playing animations.</p>
                    <ul>
                        <li>Features a wheel menu for choosing animations.</li>
                        <li>Model-specific animations are supported.</li>
                        <li>Includes a built-in whitelist for allowed animations.</li>
                    </ul>
                `
            },
            'banking': {
                title: 'Banking',
                description: `
                    <p>A comprehensive banking system with advanced features.</p>
                    <ul>
                        <li>Deposit money into your bank account.</li>
                        <li>Transfer money to other players.</li>
                        <li>Utilize an item bank for secure storage.</li>
                        <li>Access account logs for detailed tracking.</li>
                    </ul>
                `
            },
            'fob': {
                title: 'FOB (Forward Operating Base)',
                description: `
                    <p>A lightweight system for managing forward operating bases.</p>
                    <ul>
                        <li>Allows players to set a custom respawn point.</li>
                        <li>Features customizable respawn cooldowns.</li>
                        <li>Extremely lightweight and optimized.</li>
                    </ul>
                `
            },
            'organizations': {
                title: 'Organizations',
                description: `
                    <p>A robust system for creating and managing player organizations.</p>
                    <ul>
                        <li>Create organizations with ranks and permissions.</li>
                        <li>Ranks include pre-set permissions adjustable in configurations.</li>
                        <li>Features an item bank and money bank for organizations.</li>
                        <li>Includes player management tools and money logs.</li>
                    </ul>
                `
            },
            'video-intro': {
                title: 'Video Intro',
                description: `
                    <p>An optimized system for adding video intros to Nutscript and Lilia.</p>
                    <ul>
                        <li>Plays videos hosted on a web server without client downloads.</li>
                        <li>Seamlessly integrates into gameplay.</li>
                        <li>Extremely lightweight and client-friendly.</li>
                    </ul>
                `
            },

            'cctv': {
                title: 'CCTV',
                description: `
                <p>Enhance your server's security with Nameable Cameras, a faction whitelist system, and a camera hacking feature.</p>
                <ul>
                    <li>Nameable Cameras for remote location viewing</li>
                    <li>Faction whitelist system to limit camera swapping</li>
                    <li>Camera hacking system for remote viewing access</li>
                </ul>
            `
            },

            'characterlist': {
                title: 'Character List',
                description: `
                <p>Manage your server's characters efficiently with comprehensive information and offline ban capabilities.</p>
                <ul>
                    <li>View all player characters' information</li>
                    <li>Offline ban and unban player characters</li>
                    <li>Perfect tool for server management</li>
                </ul>
            `
            },

            'controlpoints': {
                title: 'Control Points',
                description: `
                <p>Introduce dynamic territory control with controllable points that offer monetary rewards to factions.</p>
                <ul>
                    <li>Controllable points provide money rewards</li>
                    <li>Factions can claim points and earn money when members are nearby</li>
                    <li>Dynamic territory control system</li>
                </ul>
            `
            },

            'waypoints': {
                title: 'Waypoints',
                description: `
                <p>Customize and display waypoints easily to enhance navigation and gameplay experience.</p>
                <ul>
                    <li>Customizable and viewable waypoints</li>
                    <li>Easy setup and customization process</li>
                </ul>
            `
            },

            'carbomb': {
                title: 'Car Bomb',
                description: `
                <p>Add suspense to your gameplay with bombs that can be placed in cars, complete with defusal mechanics.</p>
                <ul>
                    <li>Placeable bombs in vehicles</li>
                    <li>Audible countdown indicating explosion timing</li>
                    <li>Defusal possible with the appropriate kit</li>
                </ul>
            `
            },

            'injuries': {
                title: 'Injuries',
                description: `
                <p>Introduce realistic injury mechanics with multiple injury types affecting gameplay and requiring specific treatments.</p>
                <ul>
                    <li><strong>Concussion:</strong> Blurry screen effect, healed with meds</li>
                    <li><strong>PTSD:</strong> Suffering hallucinations and other symptoms</li>
                    <li><strong>Broken Leg:</strong> Reduced movement speed, fixed with a splint</li>
                    <li><strong>Bleeding:</strong> Periodic damage, healable with bandages</li>
                </ul>
            `
            },
        };

        return plugins[plugin] || { title: 'Unknown Plugin', description: 'No information available.' };
    }

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    function switchSection(targetId) {
        navLinks.forEach(link => {
            if (link.getAttribute('href').substring(1) === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
                window.scrollTo(0, 0);
            } else {
                section.classList.remove('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            switchSection(targetId);
        });
    });

    if (viewWorkButton) {
        viewWorkButton.addEventListener('click', (e) => {
            e.preventDefault();
            switchSection('plugins');
        });
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.toggle('dark-mode', savedTheme === 'dark');
    }
    updateTheme();

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        updateTheme();
        const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
    });

    function updateTheme() {
        const isDarkMode = body.classList.contains('dark-mode');
        const root = document.documentElement;

        if (isDarkMode) {
            root.style.setProperty('--bg-color', '#1a1a1a');
            root.style.setProperty('--text-color', '#ffffff');
            root.style.setProperty('--nav-bg-color', '#2c2c2c');
            root.style.setProperty('--nav-text-color', '#ffffff');
            root.style.setProperty('--accent-color', '#4a90e2');
            root.style.setProperty('--accent-hover', '#3a7bc8');
            root.style.setProperty('--secondary-color', '#5cb85c');
            root.style.setProperty('--secondary-hover', '#4cae4c');
            root.style.setProperty('--cursor-color', '#ffffff');
            themeToggle.querySelector('.fa-sun').classList.remove('active');
            themeToggle.querySelector('.fa-moon').classList.add('active');
        } else {
            root.style.setProperty('--bg-color', '#ffffff');
            root.style.setProperty('--text-color', '#333333');
            root.style.setProperty('--nav-bg-color', '#f0f0f0');
            root.style.setProperty('--nav-text-color', '#333333');
            root.style.setProperty('--accent-color', '#4a90e2');
            root.style.setProperty('--accent-hover', '#3a7bc8');
            root.style.setProperty('--secondary-color', '#5cb85c');
            root.style.setProperty('--secondary-hover', '#4cae4c');
            root.style.setProperty('--cursor-color', '#333333');
            themeToggle.querySelector('.fa-sun').classList.add('active');
            themeToggle.querySelector('.fa-moon').classList.remove('active');
        }
    }

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'scale(0.8)';
    });

    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'scale(1)';
    });

    updateTheme();
});

window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});