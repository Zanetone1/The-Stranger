/* The Stranger — interactive reading
   All text comes from content.js. This file only handles behaviour. */

const $ = (s) => document.querySelector(s);
const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

/* ---------- 1. Fill in the writing ---------- */
$("#byline").textContent = CONTENT.byline;
$("#intro-text").textContent = CONTENT.intro;
$("#intro-right").textContent = CONTENT.introRight;
$("#court-intro").textContent = CONTENT.courtIntro;
$("#closing-note").textContent = CONTENT.closingNote;
$("#knocks-intro").textContent = CONTENT.knocksIntro || "";
$("#part-two-line").textContent = CONTENT.partTwoLine || "";
$("#pull-text").textContent = `“${CONTENT.bigQuote}”`;
$("#pull-cite").textContent = CONTENT.bigQuoteCredit;

// Names marked [[id|Name]] in content.js become quiet links that open a small card
const linkRefs = (t) => t.replace(/\[\[(\w+)\|([^\]]+)\]\]/g,
  (m, id, label) => `<button type="button" class="ref" data-ref="${id}" aria-expanded="false">${label}</button>`);

function chapterHTML(ch, showHeat, id) {
  const heat = showHeat && ch.heat ? ` <span class="heat-tag">${ch.heat}°C</span>` : "";
  // "What happens": a plain plot summary, hidden until the reader asks for it
  const happens = ch.happens
    ? `<button class="happens-btn" type="button" aria-expanded="false" aria-controls="${id}-h">What happens</button>
       <p class="happens" id="${id}-h" hidden>${ch.happens}</p>`
    : "";
  return `<li class="chapter" id="${id}"${ch.heat ? ` data-heat="${ch.heat}"` : ""}>
    <div>
      <h3>${ch.title}</h3>
      <p class="place">${ch.place}${heat}</p>
      ${happens}
      <p class="body">${linkRefs(ch.text)}</p>
    </div>
  </li>`;
}

// Part One: the last chapter ("The beach") is shown in the bleached beach section instead
const beachChapter = CONTENT.partOne[CONTENT.partOne.length - 1];
$("#part-one").innerHTML = CONTENT.partOne.slice(0, -1).map((c, i) => chapterHTML(c, true, `ch-${i + 1}`)).join("");
$("#beach-text").textContent = beachChapter.text;
$("#beach-title").textContent = beachChapter.title;
$("#beach-place").innerHTML = `${beachChapter.place} <span>${beachChapter.heat}°C</span>`;
// The beach in four frames: each hotter, each with a smaller circle of shade
const ROMAN = ["I", "II", "III", "IV", "V", "VI"];
const SHADE = ["15rem", "12rem", "9.5rem", "7rem", "6rem", "5rem"];
$("#beach-frames").innerHTML = (beachChapter.frames || []).map((f, i) => `
  <article class="frame" data-heat="${f.heat}" style="--shade:${SHADE[i] || "5rem"}">
    <p class="frame-head"><span class="frame-num">${ROMAN[i] || i + 1}</span>${f.title}<span class="frame-heat">${f.heat}°C</span></p>
    <p class="frame-text">${f.text}</p>
    ${f.note ? `<p class="frame-note">${f.note}</p>` : ""}
  </article>`).join("");
// "Then the afternoon turned white." sits just before the last frame, The light
{
  const allFrames = document.querySelectorAll(".frame");
  const segueEl = document.createElement("p");
  segueEl.className = "segue";
  segueEl.id = "segue";
  if (allFrames.length) allFrames[allFrames.length - 1].before(segueEl);
  else $("#beach-frames").appendChild(segueEl);
}
// Sunday lunch
const L = CONTENT.lunch;
$("#lunch-title").textContent = L.title;
$("#lunch").dataset.heat = L.heat;
$("#beach").dataset.heat = beachChapter.heat;
$("#lunch-place").innerHTML = `${L.place} <span>${L.heat}°C</span>`;
// Each paragraph (split at \n\n) becomes one step down the page, left to right
$("#lunch-text").innerHTML = L.text.split("\n\n").map((t) => `<p>${t}</p>`).join("");

// Tuck the cigarette drawing in right after the word "cigarettes"
const cig = $(".sketch-cig");
const cigPara = [...$("#lunch-text").children].find((p) => p.textContent.includes("cigarettes"));
if (cig && cigPara) {
  const holder = document.createElement("span");
  holder.className = "cig-inline";
  holder.appendChild(cig);
  cigPara.appendChild(holder);
  // the small direction underneath: "Take a drag: click the cigarette."
  if (L.cigHint) {
    const hint = document.createElement("div");
    hint.className = "cig-hint";
    hint.textContent = L.cigHint;
    cigPara.after(hint);
  }
}

$("#after-table").textContent = L.afterTable;
$("#watchers-q").textContent = L.watchersQuestion;
$("#watchers-btn").textContent = L.watchersButton;
$("#outsider-text").textContent = L.watchersReveal;
$("#segue").textContent = L.segue;
$("#part-two").innerHTML = CONTENT.partTwo.map((c, i) => chapterHTML(c, false, `ch-${i + 5}`)).join("");

// "What happens" buttons open and close their summary
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".happens-btn");
  if (!btn) return;
  const panel = document.getElementById(btn.getAttribute("aria-controls"));
  const open = btn.getAttribute("aria-expanded") === "true";
  btn.setAttribute("aria-expanded", String(!open));
  btn.textContent = open ? "What happens" : "Hide summary";
  panel.hidden = open;
});

// Reference cards: click a name to open, click it again (or anywhere else, or Esc) to close
const refCard = $("#ref-card");
let refOpen = null;
function closeRef() {
  refCard.classList.remove("open");
  if (refOpen) refOpen.setAttribute("aria-expanded", "false");
  refOpen = null;
}
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".ref");
  if (!btn) { if (!e.target.closest(".ref-card")) closeRef(); return; }
  if (refOpen === btn) { closeRef(); return; }
  closeRef();
  refCard.innerHTML = (CONTENT.refs || {})[btn.dataset.ref] || "";
  const r = btn.getBoundingClientRect();
  const para = btn.closest("p").getBoundingClientRect();
  const width = Math.min(304, window.innerWidth - 32);
  let left, top;
  if (window.innerWidth - para.right > width + 80) {
    // wide screens: in the empty margin beside the paragraph, level with the name, so the text stays clear
    left = para.right + 40;
    top = r.top - 6;
  } else {
    // narrow screens: just under the name
    left = Math.min(Math.max(16, r.left), window.innerWidth - width - 16);
    top = r.bottom + 8;
  }
  refCard.style.width = width + "px";
  refCard.style.left = left + window.scrollX + "px";
  refCard.style.top = top + window.scrollY + "px";
  refCard.classList.add("open");
  btn.setAttribute("aria-expanded", "true");
  refOpen = btn;
});
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeRef(); });

// Afterword: your closing words
$("#afterword-title").textContent = CONTENT.afterwordTitle || "";
$("#afterword-text").textContent = CONTENT.afterword || "";

// About this reading
$("#about-text").textContent = CONTENT.about || "";
$("#about-links").innerHTML = (CONTENT.links || [])
  .filter((l) => l.url)
  .map((l) => `<li><a href="${l.url}" target="_blank" rel="noopener">${l.label}</a></li>`)
  .join("");

// Ending: highlight the French phrase
const phrase = "la tendre indifférence du monde";
$("#ending").innerHTML = CONTENT.ending.replace(phrase, `<em class="fr" lang="fr">${phrase}</em>`);

requestAnimationFrame(() => document.body.classList.add("loaded"));

// Reading time: counts the words actually on the page (not the hidden summaries)
// at about 230 words a minute, plus a couple of minutes for the interactive moments.
{
  const words = ($("main").innerText.match(/\S+/g) || []).length;
  const minutes = Math.max(1, Math.round(words / 230) + 2);
  $("#read-time").textContent = `About ${minutes} minutes to read`;
}

/* Click the opening line to switch between French and English */
const openingBtn = $("#opening");
const openingText = $("#opening-text");
const openingHint = $("#opening-hint");
let inEnglish = false;
openingBtn.addEventListener("click", () => {
  inEnglish = !inEnglish;
  openingText.classList.add("swapping");
  setTimeout(() => {
    openingText.textContent = `« ${inEnglish ? CONTENT.openingEnglish : CONTENT.openingFrench} »`;
    openingText.lang = inEnglish ? "en" : "fr";
    openingHint.textContent = inEnglish ? "Lire en français" : "Read in English";
    openingText.classList.remove("swapping");
  }, reduceMotion ? 0 : 350);
});

/* ---------- 2. Heat: rises from the intro to the beach ---------- */
const MIN_T = 24, MAX_T = 34;   // the gauge climbs to 34 by the beach; the frames take it to 42
const tempEl = $("#temp");
const beach = $("#beach");
const partTwo = $("#part-two-section");
const intro = $("#intro");

// Distance from the very top of the page to an element
const pageTop = (el) => el.getBoundingClientRect().top + window.scrollY;

function updateHeat() {
  const y = window.scrollY + window.innerHeight * 0.5;
  const start = pageTop(intro);
  const end = pageTop(beach) + beach.offsetHeight * 0.5;
  let heat = Math.min(1, Math.max(0, (y - start) / (end - start)));

  const indoors = y > pageTop(partTwo);
  document.body.classList.toggle("indoors", indoors);
  if (indoors) heat = 0.15; // the cell: the sun is a rectangle now

  root.style.setProperty("--heat", heat.toFixed(3));
  let temp = Math.round(MIN_T + heat * (MAX_T - MIN_T));
  // the gauge shows the exact temperature of each chapter, the lunch, the beach and each frame as you reach it
  if (!indoors) document.querySelectorAll("[data-heat]").forEach((f) => {
    if (f.getBoundingClientRect().top < window.innerHeight * 0.6) temp = Number(f.dataset.heat);
  });
  tempEl.textContent = temp;
}
window.addEventListener("scroll", updateHeat, { passive: true });
window.addEventListener("resize", updateHeat);
updateHeat();

/* ---------- 2c. Part Two clock: runs from the start of Part Two to his last night, then disappears ---------- */
const clockEl = $("#clock");
const nightEl = $("#night");
function updateClock() {
  const y = window.scrollY + window.innerHeight * 0.5;
  const start = pageTop(partTwo);
  const end = pageTop(nightEl) + nightEl.offsetHeight * 0.7;   // his time runs out by the end of the last night
  const t = (y - start) / (end - start);
  root.style.setProperty("--time", Math.min(1, Math.max(0, t)).toFixed(4));
  clockEl.classList.toggle("on", t > 0 && t < 1);
}
window.addEventListener("scroll", updateClock, { passive: true });
window.addEventListener("resize", updateClock);
updateClock();

/* ---------- 2b. The whiteout: everything turns white at "Then the afternoon turned white." ---------- */
// Rises as the line comes up the screen, peaks when it's centred, stays pale through The light,
// then clears as you reach the knocks.
const clamp01 = (v) => Math.min(1, Math.max(0, v));
function updateWhiteout() {
  const seg = $("#segue"), knock = $(".knocks");
  if (!seg || !knock) return;
  const vh = window.innerHeight;
  const s = seg.getBoundingClientRect(), k = knock.getBoundingClientRect();
  const sc = (s.top + s.bottom) / 2 / vh;          // where the line is on screen: 1 = bottom, 0 = top
  const kc = (k.top + k.bottom) / 2 / vh;
  let white;
  if (sc > 0.5) white = clamp01((1 - sc) / 0.5) * 0.95;                 // fading in
  else white = sc > 0.2 ? 0.6 + ((sc - 0.2) / 0.3) * 0.35 : 0.6;        // easing to a pale glare
  if (sc <= 0.5 && kc < 0.9) white *= clamp01((kc - 0.5) / 0.4);        // clearing at the knocks
  root.style.setProperty("--white", white.toFixed(3));
}
window.addEventListener("scroll", updateWhiteout, { passive: true });
window.addEventListener("resize", updateWhiteout);
updateWhiteout();

/* ---------- 3. The sun drifts toward the cursor ---------- */
let sunX = window.innerWidth * 0.7, sunY = window.innerHeight * 0.25;
let targetX = sunX, targetY = sunY;
if (finePointer) {
  window.addEventListener("pointermove", (e) => { targetX = e.clientX; targetY = e.clientY; });
}
function moveSun() {
  sunX += (targetX - sunX) * 0.04;
  sunY += (targetY - sunY) * 0.04;
  root.style.setProperty("--sx", sunX + "px");
  root.style.setProperty("--sy", sunY + "px");
  if (!reduceMotion) requestAnimationFrame(moveSun);
}
moveSun();

/* ---------- 3b. Sunday lunch: tap a guest; the watchers come into focus as you scroll ---------- */
const guestsEl = $("#guests");
const guestNote = $("#guest-note");
const threadsEl = $("#threads");
const spot = Object.fromEntries(L.guests.map((g) => [g.name, g]));

// Draw every thread faintly first
const lines = L.threads.map(([a, b, kind]) => {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", spot[a].x); line.setAttribute("y1", spot[a].y);
  line.setAttribute("x2", spot[b].x); line.setAttribute("y2", spot[b].y);
  if (kind === "one-sided") line.classList.add("one-sided");
  threadsEl.appendChild(line);
  return { a, b, line };
});

// Place the names; tapping one lights up its threads
L.guests.forEach((g) => {
  const li = document.createElement("li");
  li.className = g.gold ? "person gold" : "person";
  li.style.setProperty("--x", g.x);
  li.style.setProperty("--y", g.y);
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = g.name;
  b.setAttribute("aria-pressed", "false");
  b.addEventListener("click", () => {
    // Tapping the name that's already selected resets the web
    if (b.getAttribute("aria-pressed") === "true") {
      lines.forEach((t) => t.line.classList.remove("on"));
      guestsEl.querySelectorAll(".person").forEach((p) => {
        p.classList.remove("dim");
        p.querySelector("button").setAttribute("aria-pressed", "false");
      });
      guestNote.textContent = "Tap a name to see who they are tied to.";
      return;
    }
    const linked = new Set([g.name]);
    lines.forEach((t) => {
      const on = t.a === g.name || t.b === g.name;
      t.line.classList.toggle("on", on);
      if (on) { linked.add(t.a); linked.add(t.b); }
    });
    guestsEl.querySelectorAll(".person").forEach((p) => {
      const name = p.querySelector("button").textContent;
      p.classList.toggle("dim", !linked.has(name));
      p.querySelector("button").setAttribute("aria-pressed", name === g.name ? "true" : "false");
    });
    guestNote.textContent = g.note;
  });
  li.appendChild(b);
  guestsEl.appendChild(li);
});

const lunch = $("#lunch");
function updateWatchers() {
  const r = lunch.getBoundingClientRect();
  // 0 when the lunch first appears, 1 when you reach the bottom of it
  const p = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (r.height + window.innerHeight * 0.2)));
  root.style.setProperty("--watch", (0.06 + p * 0.8).toFixed(3));
  root.style.setProperty("--watch-text", p > 0.6 ? "1" : "0");
}
window.addEventListener("scroll", updateWatchers, { passive: true });
updateWatchers();

/* ---------- 3c. Cigarette smoke: soft ribbons that drift slowly upward, widening as they rise ---------- */
const plume = $("#plume");
let burn = 0;           // 0 = fresh cigarette, 1 = finished (set by the scroll, see 3d)
let plumeSize = null;   // { W, H } once placed
let plumePaths = [];

// four layers, from a thin thread near the ember to a faint wide haze
//   amp: how far it sways   freq: how many curls   speed: how fast the curls rise (keep small = calm)
//   base / grow: width at the cigarette, and how much wider it gets by the top   opacity: how visible
const wisps = [
  { amp: 18, freq: 0.012, speed: 0.00045, phase: 0.0, base: 1.0, grow: 7,  opacity: 0.42, haze: false },
  { amp: 32, freq: 0.009, speed: 0.00034, phase: 1.9, base: 1.6, grow: 16, opacity: 0.22, haze: false },
  { amp: 50, freq: 0.007, speed: 0.00026, phase: 3.4, base: 2.4, grow: 30, opacity: 0.12, haze: false },
  { amp: 64, freq: 0.005, speed: 0.00018, phase: 0.8, base: 4.0, grow: 80, opacity: 0.08, haze: true }
];

function placePlume() {
  const ash = document.querySelector(".sketch-cig .ash");
  if (!ash || window.innerWidth <= 720) { plume.innerHTML = ""; plumeSize = null; return; } // phones keep the small smoke
  const tip = ash.getBoundingClientRect();
  const box = lunch.getBoundingClientRect();
  const W = 480;
  const H = Math.max(200, tip.top + tip.height / 2 - box.top);
  plume.style.left = tip.right - box.left - W / 2 + "px";
  plume.style.width = W + "px";
  plume.style.height = H + "px";
  plume.setAttribute("viewBox", `0 0 ${W} ${H}`);
  plume.innerHTML = `
    <defs>
      <linearGradient id="plume-fade" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity=".9"/>
        <stop offset=".7" stop-color="#fff" stop-opacity=".5"/>
        <stop offset="1" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <mask id="plume-mask"><rect width="${W}" height="${H}" fill="url(#plume-fade)"/></mask>
      <filter id="plume-soft" x="-50%" y="-5%" width="200%" height="110%"><feGaussianBlur stdDeviation="2.2"/></filter>
      <filter id="plume-haze" x="-50%" y="-5%" width="200%" height="110%"><feGaussianBlur stdDeviation="9"/></filter>
    </defs>
    <g mask="url(#plume-mask)">
      ${wisps.map((w) => `<path class="wisp" filter="url(#${w.haze ? "plume-haze" : "plume-soft"})"/>`).join("")}
    </g>`;
  plumePaths = [...plume.querySelectorAll(".wisp")];
  plumeSize = { W, H };
  drawPlume(performance.now());
}

// Each wisp is a filled ribbon: thin at the ember, slowly widening as it climbs
function drawPlume(t) {
  if (!plumeSize) return;
  const { W, H } = plumeSize;
  // follow the burning tip as it moves down the cigarette
  const tip = cig.querySelector(".ember").getBoundingClientRect();
  plume.style.left = (tip.left + tip.right) / 2 - lunch.getBoundingClientRect().left - W / 2 + "px";
  const fade = 1 - Math.min(1, Math.max(0, (burn - 0.9) / 0.1)); // smoke dies away as it finishes
  wisps.forEach((w, i) => {
    const left = [], right = [];
    for (let y = H; y >= 0; y -= 4) {
      const rise = (H - y) / H;                              // 0 at the cigarette, 1 at the top
      const spread = 0.06 + rise;                             // the sway opens up as it rises
      const drift = -rise * 30;                               // just a touch of lean to the left
      const a = y * w.freq + t * w.speed + w.phase;
      const curl = Math.sin(a) + 0.3 * Math.sin(a * 2.1 - t * w.speed); // soft, unhurried curls
      const x = W / 2 + drift + curl * w.amp * spread;
      const half = (w.base + Math.pow(rise, 1.6) * w.grow) / 2; // widens slowly at first, more near the top
      left.push(`${(x - half).toFixed(1)} ${y}`);
      right.push(`${(x + half).toFixed(1)} ${y}`);
    }
    plumePaths[i].setAttribute("d", "M" + left.join(" L") + " L" + right.reverse().join(" L") + " Z");
    // a slow breath in the opacity
    plumePaths[i].style.opacity = (fade * w.opacity * (0.85 + 0.15 * Math.sin(t * 0.0004 + i * 1.3))).toFixed(3);
  });
}

// Animate only while Sunday lunch is on screen
let plumeOn = false;
function plumeLoop(t) { if (!plumeOn) return; drawPlume(t); requestAnimationFrame(plumeLoop); }
if (!reduceMotion && "IntersectionObserver" in window) {
  new IntersectionObserver(([e]) => {
    const was = plumeOn; plumeOn = e.isIntersecting;
    if (plumeOn && !was) requestAnimationFrame(plumeLoop);
  }).observe(lunch);
}
placePlume();
window.addEventListener("load", placePlume);
window.addEventListener("resize", placePlume);
if (document.fonts) document.fonts.ready.then(placePlume);

/* ---------- 3d. The cigarette burns down like a real one as you read through Sunday lunch ---------- */
// The ember eats the paper toward the filter; ash builds up past the ember, and every so often
// the ash column gets too long, breaks off and falls. When it reaches the filter, it goes out.
const paper = cig.querySelector(".paper");
const ashEl = cig.querySelector(".ash");
const ember = cig.querySelector(".ember");
const charEl = cig.querySelector(".char");
const ashFall = cig.querySelector(".ash-fall");
const smallSmoke = [...cig.querySelectorAll(".smoke")];
const BURNABLE = 184;   // length of paper that can burn (stops just above the filter)
const ASH_BREAK = 26;   // ash falls off each time it grows this long (smaller = falls more often)
let lastBreaks = 0;

function dropAsh(x, len) {
  if (reduceMotion) return;
  const pieces = [{ dx: 0, w: len * 0.7, h: 11 }, { dx: len * 0.75, w: 5, h: 5 }, { dx: len * 0.4, w: 3, h: 3 }];
  pieces.forEach((p, i) => {
    const r = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    r.setAttribute("class", "ash-flake");
    r.setAttribute("x", x + p.dx); r.setAttribute("y", 140.5 + (11 - p.h) / 2);
    r.setAttribute("width", p.w); r.setAttribute("height", p.h); r.setAttribute("rx", 2);
    r.style.animationDelay = i * 0.08 + "s";
    r.addEventListener("animationend", () => r.remove());
    ashFall.appendChild(r);
  });
}

function updateBurn() {
  // starts burning as the cigarette comes on screen, and is finished by the time it nears the top
  const start = pageTop(cig) - window.innerHeight * 0.9;
  const end = pageTop(cig) - window.innerHeight * 0.15;
  burn = Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));

  const burned = burn * BURNABLE;
  const tipX = 250 - burned;                              // where the ember is now
  const breaks = Math.floor(burned / ASH_BREAK);
  const ashLen = 4 + (burned % ASH_BREAK);                // ash grows, then resets after it falls
  if (breaks > lastBreaks) dropAsh(tipX + 6, ASH_BREAK - 4); // the piece that just broke off
  lastBreaks = breaks;

  paper.setAttribute("width", tipX - 10);
  charEl.setAttribute("x", tipX - 8);
  ember.setAttribute("x", tipX - 1.5);
  ashEl.setAttribute("x", tipX + 2);
  ashEl.setAttribute("width", ashLen);

  const done = burn >= 1;
  cig.classList.toggle("out", done);
  smallSmoke.forEach((s) => {                            // the small phone smoke follows the ember too
    s.style.transform = `translateX(${tipX - 258}px)`;
    s.style.opacity = done ? "0" : "";
  });
  if (!plumeOn) drawPlume(performance.now());            // keep the plume in step when it isn't animating
}
window.addEventListener("scroll", updateBurn, { passive: true });
window.addEventListener("resize", updateBurn);
updateBurn();

/* ---------- 3e. Click the cigarette for a smoke screen: each drag thickens it (5 at most), then it clears ---------- */
const fogEl = $("#fog");
const MAX_DRAGS = 5;
let fog = 0, fogHoldUntil = 0, fogLast = 0, fogRunning = false;

cig.removeAttribute("aria-hidden");
cig.setAttribute("role", "button");
cig.setAttribute("tabindex", "0");
cig.setAttribute("aria-label", "Take a drag");

function fogLoop(now) {
  const dt = now - fogLast; fogLast = now;
  if (now > fogHoldUntil) fog = Math.max(0, fog - dt * 0.0012);   // clears in a few seconds
  root.style.setProperty("--fog", (fog / MAX_DRAGS).toFixed(3));
  if (fog > 0) requestAnimationFrame(fogLoop); else fogRunning = false;
}
function takeDrag() {
  if (burn >= 1) return;                                          // nothing left to smoke
  fog = Math.min(MAX_DRAGS, Math.floor(fog) + 1);
  fogHoldUntil = performance.now() + 900;                         // hangs for a moment before thinning
  cig.classList.add("drag");
  const hint = $(".cig-hint");
  if (hint) hint.classList.add("used");                           // they found it; the direction fades
  setTimeout(() => cig.classList.remove("drag"), 450);
  if (!fogRunning) { fogRunning = true; fogLast = performance.now(); requestAnimationFrame(fogLoop); }
}
cig.addEventListener("click", takeDrag);
cig.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") { e.preventDefault(); takeDrag(); }
});

// "Did you notice the two men on the beach?" — back up to the horizon, then to the two dots by the web
$("#watchers-btn").addEventListener("click", () => {
  const behavior = reduceMotion ? "auto" : "smooth";
  lunch.classList.add("spot");
  $(".horizon").scrollIntoView({ behavior, block: "center" });
  setTimeout(() => {
    $("#web").classList.add("reveal");
    $("#web").scrollIntoView({ behavior, block: "center" });
  }, 2600);
  setTimeout(() => lunch.classList.remove("spot"), 6000);
  // ...then carry on down to the beach
  setTimeout(() => beach.scrollIntoView({ behavior, block: "start" }), 6500);
});

/* ---------- 4. Beach: your pointer casts the shade that lets you read ---------- */
const field = $("#beach-field");
const beachText = $("#beach-text");
const shaded = [beachText, ...document.querySelectorAll(".frame-text")];
function shade(e) {
  const f = field.getBoundingClientRect();
  field.style.setProperty("--fx", e.clientX - f.left + "px");
  field.style.setProperty("--fy", e.clientY - f.top + "px");
  shaded.forEach((el) => {                               // the lead text and every frame read through your shade
    const t = el.getBoundingClientRect();
    el.style.setProperty("--mx", e.clientX - t.left + "px");
    el.style.setProperty("--my", e.clientY - t.top + "px");
  });
}
if (finePointer) {
  // Track the cursor across the whole beach section, so the shade works even beside the text
  beach.addEventListener("pointermove", shade);
} else {
  field.classList.add("touch");
}

/* ---------- 5. Four knocks close Part One ---------- */
let knocks = 0;
const knockBtn = $("#knock");
const knockLine = $("#knock-line");
knockBtn.addEventListener("click", () => {
  if (knocks >= CONTENT.knocks.length) return;
  knockLine.textContent = CONTENT.knocks[knocks];
  knocks++;
  if (!reduceMotion) {
    const flash = document.createElement("div");
    flash.className = "flash";
    document.body.appendChild(flash);
    flash.addEventListener("animationend", () => flash.remove());
  }
  if (navigator.vibrate) navigator.vibrate(30);
  if (knocks === CONTENT.knocks.length) {
    knockBtn.disabled = true;
    const behavior = reduceMotion ? "auto" : "smooth";
    // after the fourth knock: the big quote, a pause to read it, then Part Two's title page
    setTimeout(() => $(".pull").scrollIntoView({ behavior, block: "center" }), 1600);
    setTimeout(() => partTwo.scrollIntoView({ behavior, block: "start" }), 6000);
  }
});

/* ---------- 5b. Chapter index: dots down the left; hover to see names, click to jump ---------- */
const tocItems = [
  ["I", CONTENT.partOne[0].title, "#ch-1"],
  ["II", CONTENT.partOne[1].title, "#ch-2"],
  ["III", CONTENT.partOne[2].title, "#ch-3"],
  ["IV", L.title, "#lunch"],
  ["", beachChapter.title, "#beach"],
  ["V", CONTENT.partTwo[0].title, "#ch-5"],
  ["VI", CONTENT.partTwo[1].title, "#ch-6"],
  ["VII", CONTENT.partTwo[2].title, "#ch-7"],
  ["", "The jury", "#court"],
  ["", "The last night", "#night"]
].filter(([, , sel]) => document.querySelector(sel));
const toc = $("#toc");
toc.innerHTML = tocItems.map(([num, title, sel]) =>
  `<a href="${sel}"><span class="dot" aria-hidden="true"></span><span class="label">${num ? num + ". " : ""}${title}</span></a>`
).join("");
const tocLinks = [...toc.querySelectorAll("a")];
function updateToc() {
  toc.classList.toggle("show", window.scrollY > pageTop(intro) - window.innerHeight * 0.3);
  let active = -1;
  tocItems.forEach(([, , sel], i) => {
    if (document.querySelector(sel).getBoundingClientRect().top < window.innerHeight * 0.4) active = i;
  });
  tocLinks.forEach((a, i) => a.classList.toggle("active", i === active));
}
window.addEventListener("scroll", updateToc, { passive: true });

// Thin brass progress line along the top of the screen
const progressFill = $(".progress-fill");
function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  progressFill.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
}
window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();
updateToc();

/* ---------- 5c. Sea sound: soft waves made in the browser (no audio file), off until switched on ---------- */
const soundBtn = $("#sound");
let sea = null;
function buildSea() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const sr = ctx.sampleRate, len = sr * 8, fade = sr * 0.5;
  const buf = ctx.createBuffer(1, len, sr);
  const d = buf.getChannelData(0);
  let last = 0;
  for (let i = 0; i < len; i++) {                 // brown noise: the low rush of water
    last = (last + 0.02 * (Math.random() * 2 - 1)) / 1.02;
    d[i] = last * 3.5;
  }
  for (let k = 0; k < fade; k++) {                // smooth the loop point so there's no click
    const t = k / fade;
    d[len - fade + k] = d[len - fade + k] * (1 - t) + d[k] * t;
  }
  const src = ctx.createBufferSource();
  src.buffer = buf; src.loop = true; src.loopStart = fade / sr; src.loopEnd = len / sr;
  const filter = ctx.createBiquadFilter(); filter.type = "lowpass"; filter.frequency.value = 600;
  const swell = ctx.createGain(); swell.gain.value = 0.55;
  const master = ctx.createGain(); master.gain.value = 0;
  const lfo = ctx.createOscillator(); lfo.frequency.value = 0.09;          // waves rolling in and out
  const lfoDepth = ctx.createGain(); lfoDepth.gain.value = 0.35;
  const lfo2 = ctx.createOscillator(); lfo2.frequency.value = 0.06;        // brighter as each wave breaks
  const lfo2Depth = ctx.createGain(); lfo2Depth.gain.value = 250;
  lfo.connect(lfoDepth).connect(swell.gain);
  lfo2.connect(lfo2Depth).connect(filter.frequency);
  src.connect(filter).connect(swell).connect(master).connect(ctx.destination);
  src.start(); lfo.start(); lfo2.start();
  return { ctx, master };
}
soundBtn.addEventListener("click", () => {
  const on = soundBtn.getAttribute("aria-pressed") !== "true";
  if (on && !sea) sea = buildSea();
  const now = sea.ctx.currentTime;
  sea.master.gain.cancelScheduledValues(now);
  sea.master.gain.setValueAtTime(sea.master.gain.value, now);
  if (on) { sea.ctx.resume(); sea.master.gain.linearRampToValueAtTime(0.5, now + 2); }
  else { sea.master.gain.linearRampToValueAtTime(0, now + 0.8); setTimeout(() => sea.ctx.suspend(), 900); }
  soundBtn.setAttribute("aria-pressed", String(on));
  soundBtn.textContent = on ? "Sea sound: on" : "Sea sound: off";
});

/* ---------- 6. The jury ---------- */
const evidenceEl = $("#evidence");
CONTENT.evidence.forEach((ev, i) => {
  const b = document.createElement("button");
  b.className = "card";
  b.type = "button";
  b.textContent = ev.text;
  b.setAttribute("aria-pressed", "false");
  b.dataset.i = i;
  b.addEventListener("click", () => {
    if (evidenceEl.classList.contains("judged")) return;
    b.setAttribute("aria-pressed", b.getAttribute("aria-pressed") === "true" ? "false" : "true");
  });
  evidenceEl.appendChild(b);
});

$("#verdict-btn").addEventListener("click", () => {
  const cards = [...evidenceEl.children];
  let correct = 0, mistakes = 0;
  cards.forEach((c) => {
    const ev = CONTENT.evidence[c.dataset.i];
    const picked = c.getAttribute("aria-pressed") === "true";
    if (ev.aboutCrime) { c.classList.add("right"); if (picked) correct++; }
    else if (picked) { c.classList.add("wrong"); mistakes++; }
    c.setAttribute("aria-pressed", "false");
  });
  evidenceEl.classList.add("judged");

  let score;
  if (correct && !mistakes) score = "You judged the crime.";
  else if (mistakes) score = `You judged the man — ${mistakes} of your cards were about his character.`;
  else score = "You judged nothing at all. Meursault might have liked you.";

  $("#verdict-score").textContent = score;
  $("#verdict-text").textContent = CONTENT.verdict;
  $("#verdict").hidden = false;
  $("#verdict-btn").textContent = "Judge again";
  $("#verdict-btn").onclick = resetJury;
});

function resetJury(e) {
  e.stopImmediatePropagation();
  [...evidenceEl.children].forEach((c) => c.classList.remove("right", "wrong"));
  evidenceEl.classList.remove("judged");
  $("#verdict").hidden = true;
  $("#verdict-btn").textContent = "Deliver verdict";
  $("#verdict-btn").onclick = null;
}

/* ---------- 7. The last night: tap to add stars ---------- */
const sky = $("#sky");
const ctx = sky.getContext("2d");
let stars = [];
function sizeSky() {
  const dpr = window.devicePixelRatio || 1;
  sky.width = sky.offsetWidth * dpr;
  sky.height = sky.offsetHeight * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
function addStar(x, y, born = performance.now()) {
  stars.push({ x, y, r: 0.6 + Math.random() * 1.6, phase: Math.random() * Math.PI * 2, born, brass: Math.random() < 0.3 });
}
sizeSky();
for (let i = 0; i < 70; i++) addStar(Math.random() * sky.offsetWidth, Math.random() * sky.offsetHeight, 0);
window.addEventListener("resize", sizeSky);

sky.addEventListener("pointerdown", (e) => {
  const r = sky.getBoundingClientRect();
  addStar(e.clientX - r.left, e.clientY - r.top);
  if (reduceMotion) drawSky(performance.now());
});

function drawSky(t) {
  ctx.clearRect(0, 0, sky.offsetWidth, sky.offsetHeight);
  for (const s of stars) {
    const age = Math.min(1, (t - s.born) / 900);
    const twinkle = reduceMotion ? 1 : 0.55 + 0.45 * Math.sin(t / 900 + s.phase);
    const grow = s.born ? 1 + (1 - age) * 5 : 1;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r * grow, 0, Math.PI * 2);
    ctx.fillStyle = s.brass ? `rgba(156,124,60,${twinkle})` : `rgba(28,38,48,${0.55 * twinkle})`;
    ctx.fill();
  }
}
function loop(t) { drawSky(t); requestAnimationFrame(loop); }
if (reduceMotion) drawSky(performance.now()); else requestAnimationFrame(loop);