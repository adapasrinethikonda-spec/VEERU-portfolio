/* ==========================================================================
   VEERU PORTFOLIO — SITE SCRIPT
   You do not need to edit this file. Everything you can change is in
   config.js. This file reads those settings and builds the pages.
   ========================================================================== */

(function () {
  "use strict";

  var C = window.SITE_CONFIG;
  document.documentElement.classList.remove("no-js");

  if (!C) {
    // config.js did not load (wrong path or a typo in the file).
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<p class="noscript-note">Settings file not found. Check that assets/js/config.js exists.</p>'
    );
    return;
  }

  /* ---------- Small helpers ---------- */

  function $(selector, root) { return (root || document).querySelector(selector); }
  function $all(selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); }

  function el(tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  // Build a file address from a folder + file name.
  // - Full links (https://...) are used as they are.
  // - Spaces and special characters in file names are made safe.
  function fileUrl(folder, name) {
    if (/^https?:\/\//i.test(name)) return name;
    var base = folder || "";
    if (base && !/\/$/.test(base)) base += "/";
    var safeName = name.split("/").map(encodeURIComponent).join("/");
    return base + safeName;
  }

  // Readable version of the path, used in error messages.
  function readablePath(folder, name) {
    if (/^https?:\/\//i.test(name)) return name;
    var base = folder || "";
    if (base && !/\/$/.test(base)) base += "/";
    return base + name;
  }

  /* ---------- Mobile menu ---------- */

  var toggle = $(".nav-toggle");
  var nav = $("#site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    // Close the menu after choosing a link, or with the Escape key.
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Simple text from config ---------- */
  // Any element with data-config="name" gets C.name as its text.

  $all("[data-config]").forEach(function (node) {
    var value = C[node.getAttribute("data-config")];
    if (typeof value === "string") node.textContent = value;
  });

  $all("[data-year]").forEach(function (node) {
    node.textContent = new Date().getFullYear();
  });

  /* ---------- Video player ---------- */

  var allVideos = [];

  function buildPlayer(item, folderImg, folderVid) {
    var videoSrc = fileUrl(folderVid, item.video);
    var posterSrc = item.poster ? fileUrl(folderImg, item.poster) : "";
    var shownPath = readablePath(folderVid, item.video);

    var frame = el("div", "video-frame");
    var video = document.createElement("video");
    video.controls = true;
    video.setAttribute("playsinline", "");
    video.preload = "metadata";
    video.setAttribute("aria-label", item.label || "Video");
    frame.appendChild(video);

    // Poster: only use it if the image really exists.
    if (posterSrc) {
      var test = new Image();
      test.onload = function () { video.poster = posterSrc; };
      test.src = posterSrc;
    }

    // Use the real shape of the video (horizontal or vertical).
    video.addEventListener("loadedmetadata", function () {
      if (video.videoWidth && video.videoHeight) {
        frame.style.setProperty("--ratio", (video.videoWidth / video.videoHeight).toFixed(4));
      }
    });

    // Helpful message when the file cannot be loaded.
    video.addEventListener("error", function () {
      if (frame.querySelector(".video-error")) return;
      video.hidden = true;
      var box = el("div", "video-error");
      box.setAttribute("role", "alert");
      box.appendChild(el("strong", "", "This video could not be loaded"));
      box.appendChild(el("span", "", "Expected file:"));
      box.appendChild(el("code", "", shownPath));
      box.appendChild(el("span", "", "Check the file name and that the file was uploaded."));
      frame.appendChild(box);
    });

    // Only one video plays at a time.
    video.addEventListener("play", function () {
      allVideos.forEach(function (other) { if (other !== video) other.pause(); });
    });

    allVideos.push(video);

    // Lazy loading: the video address is set only when the player is
    // close to the screen. With preload="metadata" the browser then
    // downloads just a small part (not the full 100 MB file).
    function load() { if (!video.getAttribute("src")) video.src = videoSrc; }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) { load(); io.disconnect(); }
        });
      }, { rootMargin: "300px 0px" });
      io.observe(frame);
    } else {
      load();
    }

    return frame;
  }

  /* ---------- Home page: showreel ---------- */

  var showreel = $("#showreel");
  if (showreel && C.showreel) {
    showreel.appendChild(
      buildPlayer(
        { video: C.showreel.video, poster: C.showreel.poster, label: C.showreel.label },
        C.imageFolder, C.videoFolder
      )
    );
  }

  /* ---------- Previous Work page: the 5 videos ---------- */

  var workList = $("#work-list");
  if (workList && Array.isArray(C.videos)) {
    C.videos.forEach(function (item) {
      var figure = el("figure", "work-item reveal");
      figure.appendChild(buildPlayer(item, C.imageFolder, C.videoFolder));
      workList.appendChild(figure);
    });
  }

  /* ---------- About page ---------- */

  var aboutText = $("#about-text");
  if (aboutText && Array.isArray(C.about)) {
    C.about.forEach(function (paragraph) { aboutText.appendChild(el("p", "", paragraph)); });
  }

  function fillList(id, items) {
    var list = $(id);
    if (list && Array.isArray(items)) {
      items.forEach(function (text) { list.appendChild(el("li", "", text)); });
    }
  }
  fillList("#skills-list", C.skills);
  fillList("#software-list", C.software);

  var emailLink = $("#contact-email");
  if (emailLink && C.email) {
    emailLink.href = "mailto:" + C.email;
    emailLink.textContent = C.email;
  }

  var phoneLink = $("#contact-phone");
  if (phoneLink && C.phone) {
    phoneLink.href = "tel:+" + (C.whatsappNumber || C.phone).replace(/\D/g, "");
    phoneLink.textContent = C.phone;
  }

  var whatsappBtn = $("#contact-whatsapp");
  if (whatsappBtn && C.whatsappNumber) {
    whatsappBtn.href = "https://wa.me/" + C.whatsappNumber.replace(/\D/g, "");
    whatsappBtn.hidden = false;
  }

  var emailBtn = $("#contact-email-btn");
  if (emailBtn && C.email) {
    emailBtn.href = "mailto:" + C.email;
  }

  // Resume button: shown only when the PDF file really exists.
  var resumeBtn = $("#resume-btn");
  if (resumeBtn && C.resume && window.fetch) {
    fetch(C.resume, { method: "HEAD" })
      .then(function (res) {
        var type = res.headers.get("content-type") || "";
        if (res.ok && type.indexOf("text/html") === -1) {
          resumeBtn.href = C.resume;
          resumeBtn.hidden = false;
        }
      })
      .catch(function () { /* no resume file: keep the button hidden */ });
  }

  /* ---------- Gentle reveal on scroll ---------- */

  var revealItems = $all(".reveal");
  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }
})();
