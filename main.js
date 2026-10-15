/* ------------------------------------------------------------------
   PROJECTS: edit this list to change the cards and the pop-ups.

   Media rule (every project, see _internal/README.md):
     assets/projects/<id>/1.jpg   card image + first screenshot
     assets/projects/<id>/2.jpg   second step of the main flow
     assets/projects/<id>/3.jpg   third step
     assets/projects/<id>/demo.mp4  10 to 20 s demo (optional, set video: true)
     assets/projects/<id>/proof.jpg one extra non-app image (optional, set proof: true)

   tags: "ios" | "ai" | "backend" (used by the filter chips)
------------------------------------------------------------------- */
const PROJECTS = [
  {
    id: "glozi",
    name: "Glozi",
    tagLabel: "iOS",
    tags: ["ios"],
    video: true,
    line: "Look up any Chinese word on any screen, in any app.",
    desc: "Most Chinese on a phone can't be selected: manga, game menus, other apps' interfaces. Glozi makes it tappable. One gesture from any app sends the screen to Glozi; tap the word you're stuck on and get pinyin and meanings, fully offline.",
    role: "Solo iOS developer",
    meta: "Solo iOS developer · Sep 2026",
    built: [
      "Designed the whole app around a custom App Intent. iOS doesn't let an app capture other apps, so a Shortcut takes the screenshot and hands it to Glozi. It runs from anywhere: the Action Button, Back Tap, AssistiveTouch, Control Center or Siri",
      "A programmatic UIKit reader that maps each tap to the exact character at any zoom, using Vision's per-character boxes, NaturalLanguage word boundaries and a 125,000-entry offline dictionary in SQLite",
      "Tested assumptions before building: two spikes showed Apple's tokenizer beats the greedy matching common in reader apps, and that Vision's per-character boxes work for Chinese. Core logic covered by Swift Testing"
    ],
    stack: ["Swift", "UIKit", "App Intents", "Vision", "NaturalLanguage", "SQLite", "Swift Testing"],
    links: [{ label: "Code", href: "https://github.com/jesslyntrixie/glozi" }]
  },
  {
    id: "dear-ducky",
    name: "Dear Ducky",
    tagLabel: "iOS",
    tags: ["ios"],
    video: true,
    line: "An offline journaling app with a paper-plane ritual.",
    desc: "An offline journaling app. Write a letter to your future self, fold it into a paper plane, then throw your phone to send it.",
    role: "Solo iOS developer",
    meta: "Solo iOS developer · Mar 2026",
    built: [
      "An eight-step paper-plane fold drawn in code as a custom SwiftUI Shape, driven by drag gestures",
      "Custom Core Haptics patterns for each fold, and throw detection with Core Motion",
      "Private on-device storage with SwiftData"
    ],
    stack: ["Swift", "SwiftUI", "SwiftData", "Core Haptics", "Core Motion"],
    links: [{ label: "Code", href: "https://github.com/jesslyntrixie/DearDucky" }]
  },
  {
    id: "pro-potion",
    name: "Pro-Potion",
    tagLabel: "iOS",
    tags: ["ios"],
    line: "Helps beginner artists learn face proportions.",
    desc: "A team iOS app that helps beginner artists learn face proportions. It finds the face in a reference photo and draws guide lines over it to sketch on.",
    role: "iOS developer · Team of 6",
    meta: "Product Owner & iOS developer · Team of 6 · Apr to May 2026",
    built: [
      "About 60% of the code: most screens, navigation and saving, built around a teammate's face-detection model",
      "App-wide navigation with one NavigationStack owned by an @Observable router",
      "Scan saving with SwiftData, and a UIKit camera wrapped for SwiftUI"
    ],
    stack: ["Swift", "SwiftUI", "SwiftData", "Observation"],
    links: [{ label: "Code", href: "https://github.com/jennyelena12/aesthera" }]
  },
  {
    id: "bookpark",
    name: "BookPark",
    tagLabel: "Backend",
    tags: ["backend"],
    video: true,
    proof: true,
    line: "Book a parking spot, and a physical flap holds it for you.",
    desc: "A smart parking system built by a team of 6. Drivers book a spot in an iOS app, and a physical flap holds the spot until they arrive.",
    role: "Backend developer · Team of 6",
    meta: "Product Owner & backend developer · Team of 6 · Jun to Jul 2026",
    built: [
      "The entire backend: a Node.js REST API for users, vehicles and bookings, on SQLite",
      "Real-time flap control over MQTT with TLS, re-locking the spot when the car leaves",
      "Bookings that end themselves on time, deployed with Docker behind nginx"
    ],
    stack: ["Node.js", "Express", "SQLite", "MQTT", "Docker", "nginx"],
    links: [
      { label: "Code", href: "https://github.com/jesslyntrixie/bookpark-server" },
      { label: "Hardware demo", href: "https://youtube.com/shorts/F142TTkJwcg" }
    ]
  },
  {
    id: "tb-detection",
    name: "TB Bacilli Detection",
    tagLabel: "AI & Research",
    tags: ["ai"],
    line: "Counts tuberculosis bacteria in microscope images.",
    desc: "A model that counts tuberculosis bacteria in microscope images, so a lab can grade a sample from the count. Built in a team of 5 as NexScope, where teammates made the iOS app.",
    role: "ML researcher · Team of 5",
    meta: "ML researcher & developer · Team of 5 · Jul to Aug 2026",
    built: [
      "The research and the model: data pipeline (contrast enhancement, 640 px tiling, slide-level splits) and all experiments",
      "YOLO detectors judged on counting error, the number that decides the grade. Best: 1.19 bacilli average count error per field, mAP@50 0.91 (validation)",
      "My YOLO11 model runs on-device in the team's iOS app, NexScope, through Core ML"
    ],
    stack: ["Python", "PyTorch", "Ultralytics YOLO", "OpenCV", "Core ML"],
    links: [{ label: "Code", href: "https://github.com/jesslyntrixie/tbchal5" }]
  }
];

/* Fill in each project's media from its folder, following the rule above. */
PROJECTS.forEach((p) => {
  const dir = `assets/projects/${p.id}/`;
  p.card = dir + "1.jpg";
  p.gallery = [
    ...(p.video ? [dir + "demo.mp4"] : []),
    dir + "1.jpg", dir + "2.jpg", dir + "3.jpg",
    ...(p.proof ? [dir + "proof.jpg"] : [])
  ];
});

/* ------------------------------------------------------------------ */
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

/* cards */
const grid = $("#project-grid");
grid.innerHTML = PROJECTS.map((p, i) => `
  <a class="card${i === 0 ? " featured" : ""}" href="#${p.id}" data-id="${p.id}" data-tags="${p.tags.join(" ")}" aria-haspopup="dialog">
    <div class="card-body">
      <div class="card-title"><h3>${esc(p.name)}</h3><span class="tag">${esc(p.tagLabel)}</span></div>
      <p class="card-line">${esc(p.line)}</p>
      <p class="card-role">${esc(p.role)}</p>
    </div>
    <div class="visual"><img src="${p.card}" alt="" loading="lazy"></div>
  </a>`).join("");

/* filter chips (also ?focus=ai | ios | backend) */
function setFilter(f) {
  $$(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === f)));
  $$(".card").forEach((card) => { card.hidden = f !== "all" && !card.dataset.tags.split(" ").includes(f); });
}
$$(".chip").forEach((c) => c.addEventListener("click", () => setFilter(c.dataset.filter)));
try {
  const focus = new URLSearchParams(location.search).get("focus");
  if (focus && ["ios", "ai", "backend"].includes(focus)) setFilter(focus);
} catch (e) { /* ignore */ }

/* project sheet */
const sheet = $("#sheet");
const body = $("#sheet-body");
let lastCard = null;

function render(p) {
  body.innerHTML = `
    <h2 id="sheet-title">${esc(p.name)}</h2>
    <p class="meta">${esc(p.meta)}</p>
    <div class="gallery${p.wide ? " wide" : ""}">${p.gallery.map((g) => g.endsWith(".mp4") ? `<video src="${g}" poster="${p.card}" autoplay muted loop playsinline aria-label="${esc(p.name)} demo"></video>` : `<img src="${g}" alt="${esc(p.name)} screenshot" loading="lazy">`).join("")}</div>
    <p class="desc">${esc(p.desc)}</p>
    <h4>What I built</h4>
    <ul>${p.built.map((b) => `<li>${esc(b)}</li>`).join("")}</ul>
    <h4>Stack</h4>
    <div class="stack">${p.stack.map((s) => `<span>${esc(s)}</span>`).join("")}</div>
    <div class="sheet-links">${p.links.map((l, i) => `<a class="btn ${i === 0 ? "btn-primary" : ""}" href="${l.href}" target="_blank" rel="noopener">${esc(l.label)}</a>`).join("")}</div>`;
}

function openProject(id, push = true) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  render(p);
  if (!sheet.open) sheet.showModal();
  $(".sheet-inner").scrollTop = 0;
  if (push && location.hash !== "#" + id) history.pushState({ project: id }, "", "#" + id);
}
function closeProject() {
  if (sheet.open) sheet.close();
}
sheet.addEventListener("close", () => {
  if (PROJECTS.some((p) => "#" + p.id === location.hash)) history.replaceState(null, "", location.pathname + location.search);
  if (lastCard) lastCard.focus();
});
grid.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (!card) return;
  e.preventDefault();
  lastCard = card;
  openProject(card.dataset.id);
});
$(".close").addEventListener("click", closeProject);
sheet.addEventListener("click", (e) => { if (e.target === sheet) closeProject(); }); // click on backdrop
window.addEventListener("popstate", () => {
  const id = location.hash.slice(1);
  if (PROJECTS.some((p) => p.id === id)) openProject(id, false); else closeProject();
});
if (PROJECTS.some((p) => "#" + p.id === location.hash)) openProject(location.hash.slice(1), false);

/* nav: border after scrolling + highlight the current section */
const nav = $(".nav");
const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 8);
window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
const links = $$(".nav-links a");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + en.target.id));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["work", "publications", "about", "contact"].forEach((id) => io.observe(document.getElementById(id)));
}

/* copy email */
const toast = $("#toast");
function showToast(msg) { toast.textContent = msg; toast.classList.add("show"); clearTimeout(showToast.t); showToast.t = setTimeout(() => toast.classList.remove("show"), 1800); }
$("#copy-email").addEventListener("click", () => {
  const email = "jtedvilie@gmail.com";
  const fallback = () => { const r = document.createRange(); r.selectNodeContents($(".email")); const s = getSelection(); s.removeAllRanges(); s.addRange(r); showToast("Selected. Press Cmd+C to copy"); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(email).then(() => showToast("Email copied"), fallback);
  else fallback();
});

/* the duck in the footer says hi */
$("#peek").addEventListener("click", (e) => {
  const b = e.currentTarget; b.classList.add("said"); clearTimeout(b.t); b.t = setTimeout(() => b.classList.remove("said"), 1600);
});
