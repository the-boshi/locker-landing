(function () {
  const form = document.getElementById("waitlistForm");
  const successMsg = document.getElementById("successMsg");
  const formHint = document.getElementById("formHint");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    const action = (form.getAttribute("action") || "").trim();

    // If you didn't connect Formspree (or any endpoint), keep it demo-safe:
    // store locally + show success message without navigating away.
    if (action === "" || action === "#") {
      e.preventDefault();

      const data = new FormData(form);
      const payload = {
        name: String(data.get("name") || ""),
        email: String(data.get("email") || ""),
        category: String(data.get("category") || ""),
        createdAt: new Date().toISOString(),
      };

      try {
        const key = "locker_waitlist_submissions";
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.push(payload);
        localStorage.setItem(key, JSON.stringify(prev));
      } catch (_) {
        // ignore storage errors
      }

      form.reset();
      if (formHint) formHint.hidden = true;
      if (successMsg) successMsg.hidden = false;
    }
    // If action points to a real endpoint (Formspree), the browser submits normally.
  });

  const demoVideo = document.getElementById("demoVideo");
  if (demoVideo) {
    const seekToFirstFrame = () => {
      try {
        demoVideo.currentTime = 0.01;
        demoVideo.pause();
      } catch (_) {
        // ignore seek errors (e.g., not enough data yet)
      }
    };

    if (demoVideo.readyState >= 2) {
      seekToFirstFrame();
    } else {
      demoVideo.addEventListener("loadedmetadata", seekToFirstFrame, { once: true });
      demoVideo.addEventListener("loadeddata", seekToFirstFrame, { once: true });
    }
  }
})();
