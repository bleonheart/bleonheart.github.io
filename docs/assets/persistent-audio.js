(() => {
  "use strict";

  const embedded = window.self !== window.top;
  const player = document.querySelector("[data-site-audio-player]");
  const profileTriggers = [...document.querySelectorAll("[data-pfp-audio-trigger]")];
  const stateKey = "portfolio.soundtrack.state";
  let soundtrack = null;
  let profileSound = null;

  const formatTime = (value) => {
    const seconds = Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
    return Math.floor(seconds / 60) + ":" + String(seconds % 60).padStart(2, "0");
  };

  const setProfileState = (playing) => {
    for (const trigger of profileTriggers) trigger.setAttribute("aria-label", playing ? "Restart profile sound" : "Play profile sound");
  };

  const notifyParent = () => {
    if (!embedded) return;
    window.parent.postMessage({
      type: "portfolio-page-ready",
      url: window.location.href,
      title: document.title
    }, "*");
  };

  if (embedded) {
    player?.remove();
    notifyParent();
    window.addEventListener("pageshow", notifyParent);
    window.addEventListener("popstate", notifyParent);
    window.addEventListener("hashchange", notifyParent);
  }

  if (typeof Audio === "function" && !embedded && player?.dataset.audioFile) {
    soundtrack = new Audio(player.dataset.audioFile);
    soundtrack.preload = "metadata";
    window.__portfolioSoundtrack = soundtrack;

    const toggle = player.querySelector("[data-site-audio-toggle]");
    const progress = player.querySelector("[data-site-audio-progress]");
    const current = player.querySelector("[data-site-audio-current]");
    const duration = player.querySelector("[data-site-audio-duration]");
    const mute = player.querySelector("[data-site-audio-mute]");
    const volume = player.querySelector("[data-site-audio-volume]");
    let isSeeking = false;
    let seekInteractionActive = false;
    let pendingSeekRatio = null;
    let seekFallbackTimer = 0;
    let restoredTime = 0;
    let restorePlaying = false;

    const readState = () => {
      try {
        const value = JSON.parse(sessionStorage.getItem(stateKey) || "null");
        if (!value || typeof value !== "object") return;
        if (Number.isFinite(value.currentTime) && value.currentTime >= 0) restoredTime = value.currentTime;
        if (Number.isFinite(value.volume)) soundtrack.volume = Math.min(1, Math.max(0, value.volume));
        soundtrack.muted = Boolean(value.muted);
        restorePlaying = Boolean(value.playing);
      } catch {}
    };

    const saveState = () => {
      try {
        sessionStorage.setItem(stateKey, JSON.stringify({
          currentTime: Number.isFinite(soundtrack.currentTime) ? soundtrack.currentTime : 0,
          volume: soundtrack.volume,
          muted: soundtrack.muted,
          playing: !soundtrack.paused && !soundtrack.ended
        }));
      } catch {}
    };

    const setRange = (input, value) => {
      if (!input) return;
      const minimum = Number(input.min) || 0;
      const maximum = Number(input.max) || 100;
      const percent = maximum > minimum ? (value - minimum) / (maximum - minimum) * 100 : 0;
      input.style.setProperty("--range-progress", Math.min(100, Math.max(0, percent)) + "%");
    };

    const setPlaying = (playing) => {
      if (!toggle) return;
      toggle.setAttribute("aria-pressed", String(playing));
      toggle.setAttribute("aria-label", playing ? "Pause website soundtrack" : "Play website soundtrack");
    };

    const getDuration = () => {
      if (Number.isFinite(soundtrack.duration) && soundtrack.duration > 0) return soundtrack.duration;
      if (soundtrack.seekable.length) {
        const end = soundtrack.seekable.end(soundtrack.seekable.length - 1);
        if (Number.isFinite(end) && end > 0) return end;
      }
      return 0;
    };

    const getProgressValue = () => progress ? Math.min(100, Math.max(0, Number(progress.value) || 0)) : 0;

    const setProgressValue = (value) => {
      if (!progress) return;
      const clamped = Math.min(100, Math.max(0, Number(value) || 0));
      progress.value = String(clamped);
      setRange(progress, clamped);
    };

    const updateTimeline = () => {
      const total = getDuration();
      if (duration) duration.textContent = formatTime(total);
      if (isSeeking || soundtrack.seeking) return;
      const elapsed = Number.isFinite(soundtrack.currentTime) ? soundtrack.currentTime : 0;
      if (current) current.textContent = formatTime(elapsed);
      setProgressValue(total > 0 ? elapsed / total * 100 : 0);
    };

    const setSeekPreview = (ratio) => {
      const value = Math.min(1, Math.max(0, Number(ratio) || 0));
      pendingSeekRatio = value;
      setProgressValue(value * 100);
      const total = getDuration();
      if (current) current.textContent = formatTime(total > 0 ? total * value : 0);
    };

    const finishSeek = () => {
      isSeeking = false;
      pendingSeekRatio = null;
      if (seekFallbackTimer) {
        clearTimeout(seekFallbackTimer);
        seekFallbackTimer = 0;
      }
      updateTimeline();
      saveState();
    };

    const commitSeek = (ratio = pendingSeekRatio) => {
      if (ratio === null || ratio === undefined) return;
      const value = Math.min(1, Math.max(0, Number(ratio) || 0));
      const total = getDuration();
      if (total <= 0) {
        isSeeking = true;
        pendingSeekRatio = value;
        setSeekPreview(value);
        return;
      }

      const target = Math.min(total, Math.max(0, total * value));
      isSeeking = true;
      pendingSeekRatio = null;
      setProgressValue(value * 100);
      if (current) current.textContent = formatTime(target);

      try {
        soundtrack.currentTime = target;
      } catch {
        finishSeek();
        return;
      }

      if (seekFallbackTimer) clearTimeout(seekFallbackTimer);
      seekFallbackTimer = window.setTimeout(finishSeek, 1000);
    };

    const updateMute = () => {
      if (!mute) return;
      const muted = soundtrack.muted || soundtrack.volume === 0;
      mute.setAttribute("aria-pressed", String(muted));
      mute.setAttribute("aria-label", muted ? "Unmute website soundtrack" : "Mute website soundtrack");
    };

    readState();
    if (volume) {
      volume.value = String(soundtrack.volume);
      setRange(volume, soundtrack.volume);
      volume.addEventListener("input", () => {
        soundtrack.volume = Number(volume.value);
        soundtrack.muted = false;
        setRange(volume, soundtrack.volume);
        updateMute();
        saveState();
      });
    }

    toggle?.addEventListener("click", async () => {
      if (soundtrack.paused) {
        if (profileSound && !profileSound.paused) profileSound.pause();
        try {
          await soundtrack.play();
        } catch {
          setPlaying(false);
        }
      } else {
        soundtrack.pause();
      }
    });

    if (progress) {
      progress.addEventListener("pointerdown", () => {
        seekInteractionActive = true;
        isSeeking = true;
      });
      progress.addEventListener("input", () => {
        isSeeking = true;
        setSeekPreview(getProgressValue() / 100);
      });
      progress.addEventListener("change", () => {
        seekInteractionActive = false;
        commitSeek(getProgressValue() / 100);
      });
      progress.addEventListener("pointerup", () => {
        window.setTimeout(() => {
          if (!seekInteractionActive) return;
          seekInteractionActive = false;
          if (pendingSeekRatio !== null) commitSeek(pendingSeekRatio);
          else finishSeek();
        }, 0);
      });
      progress.addEventListener("pointercancel", () => {
        seekInteractionActive = false;
        finishSeek();
      });
    }

    mute?.addEventListener("click", () => {
      soundtrack.muted = !soundtrack.muted;
      updateMute();
      saveState();
    });

    soundtrack.addEventListener("play", () => { setPlaying(true); saveState(); });
    soundtrack.addEventListener("pause", () => { setPlaying(false); saveState(); });
    soundtrack.addEventListener("ended", () => {
      setPlaying(false);
      soundtrack.currentTime = 0;
      updateTimeline();
      saveState();
    });
    soundtrack.addEventListener("loadedmetadata", async () => {
      const total = getDuration();
      if (pendingSeekRatio !== null && total > 0) {
        commitSeek(pendingSeekRatio);
      } else if (restoredTime > 0 && total > 0) {
        soundtrack.currentTime = Math.min(restoredTime, total);
        restoredTime = 0;
      }
      updateTimeline();
      if (restorePlaying) {
        restorePlaying = false;
        try { await soundtrack.play(); } catch {}
      }
    });
    soundtrack.addEventListener("durationchange", updateTimeline);
    soundtrack.addEventListener("timeupdate", () => { updateTimeline(); saveState(); });
    soundtrack.addEventListener("seeked", finishSeek);
    soundtrack.addEventListener("volumechange", updateMute);
    soundtrack.addEventListener("error", () => {
      player.classList.add("has-error");
      for (const control of player.querySelectorAll("button,input")) control.disabled = true;
    });
    window.addEventListener("pagehide", saveState);
    updateTimeline();
    updateMute();
  }

  const profileSource = profileTriggers.find((trigger) => trigger.dataset.pfpAudioFile)?.dataset.pfpAudioFile;
  if (typeof Audio === "function" && profileSource) {
    profileSound = new Audio(profileSource);
    profileSound.preload = "auto";
    for (const trigger of profileTriggers) {
      trigger.addEventListener("click", async () => {
        if (embedded) window.parent.postMessage({ type: "portfolio-profile-sound" }, "*");
        if (soundtrack && !soundtrack.paused) soundtrack.pause();
        profileSound.currentTime = 0;
        try {
          await profileSound.play();
        } catch {
          setProfileState(false);
        }
      });
    }
    profileSound.addEventListener("play", () => setProfileState(true));
    profileSound.addEventListener("pause", () => setProfileState(false));
    profileSound.addEventListener("ended", () => setProfileState(false));
    profileSound.addEventListener("error", () => {
      for (const trigger of profileTriggers) trigger.disabled = true;
    });
  }

  if (!embedded) {
    const initialUrl = window.location.href;
    const initialTitle = document.title;
    let frame = null;
    let expectedUrl = "";
    let applyingHistory = false;

    const cleanUrl = (value) => {
      const url = new URL(value, window.location.href);
      url.searchParams.delete("portfolio-embed");
      return url.href;
    };

    const isInternalLink = (anchor, event) => {
      if (!anchor || anchor.hasAttribute("download") || anchor.target && anchor.target !== "_self") return false;
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
      const raw = anchor.getAttribute("href");
      if (!raw || raw.startsWith("#") || raw.startsWith("mailto:") || raw.startsWith("tel:") || raw.startsWith("javascript:")) return false;
      const url = new URL(anchor.href, window.location.href);
      if (url.protocol !== "http:" && url.protocol !== "https:" && url.protocol !== "file:") return false;
      if (url.origin !== window.location.origin && !(url.protocol === "file:" && window.location.protocol === "file:")) return false;
      return true;
    };

    const ensureFrame = () => {
      if (frame?.isConnected) return frame;
      frame = document.createElement("iframe");
      frame.className = "persistent-page-frame";
      frame.name = "portfolio-content";
      frame.title = "Portfolio page";
      document.body.append(frame);
      document.body.classList.add("has-persistent-page-frame");
      return frame;
    };

    const closeFrame = () => {
      if (!frame) return;
      frame.remove();
      frame = null;
      expectedUrl = "";
      applyingHistory = false;
      document.body.classList.remove("has-persistent-page-frame");
      document.title = initialTitle;
    };

    const openFrame = (value, push) => {
      const target = cleanUrl(value);
      const activeFrame = ensureFrame();
      expectedUrl = target;
      applyingHistory = true;
      activeFrame.src = target;
      if (push && cleanUrl(window.location.href) !== target) history.pushState({ portfolioFrame: true }, "", target);
    };

    document.addEventListener("click", (event) => {
      const anchor = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (!isInternalLink(anchor, event)) return;
      const target = cleanUrl(anchor.href);
      const current = cleanUrl(window.location.href);
      const targetUrl = new URL(target);
      const currentUrl = new URL(current);
      if (!frame && targetUrl.pathname === currentUrl.pathname && targetUrl.search === currentUrl.search && targetUrl.hash) return;
      event.preventDefault();
      openFrame(target, true);
    }, true);

    window.addEventListener("message", (event) => {
      if (event.data?.type === "portfolio-profile-sound") {
        if (frame && event.source === frame.contentWindow && soundtrack && !soundtrack.paused) soundtrack.pause();
        return;
      }
      if (!frame || event.source !== frame.contentWindow || event.data?.type !== "portfolio-page-ready") return;
      let target;
      try {
        target = cleanUrl(event.data.url);
      } catch {
        return;
      }
      const targetUrl = new URL(target);
      if (targetUrl.origin !== window.location.origin && !(targetUrl.protocol === "file:" && window.location.protocol === "file:")) return;
      if (typeof event.data.title === "string" && event.data.title) {
        document.title = event.data.title;
        frame.title = event.data.title;
      }
      if (applyingHistory && target === expectedUrl) {
        applyingHistory = false;
        return;
      }
      if (cleanUrl(window.location.href) !== target) history.pushState({ portfolioFrame: true }, "", target);
    });

    window.addEventListener("popstate", () => {
      const target = cleanUrl(window.location.href);
      if (target === cleanUrl(initialUrl)) {
        closeFrame();
        return;
      }
      openFrame(target, false);
    });
  }
})();
