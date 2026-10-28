/* =========================================================
   KATLI — The Birthday Issue
   Photos live in the "photos" folder:
     cover.jpg                        → the front cover
     photo-01.jpg ... photo-32.jpg    → the 32 photos, in order
   .jpeg / .png and names like "1.jpg" or "photo (1).jpg" also work.
   ========================================================= */

const PHOTO_FOLDER = "photos/";
const EXTENSIONS = ["jpg", "jpeg", "png", "JPG", "JPEG", "PNG", "webp"];

function candidates(key) {
  const names = key === "cover"
    ? ["cover", "Cover", "COVER"]
    : [`photo-${String(key).padStart(2, "0")}`, `photo-${key}`, key, `photo (${key})`, `photo${key}`, `photo ${key}`, `Photo (${key})`];
  const list = [];
  names.forEach(n => EXTENSIONS.forEach(e => list.push(`${PHOTO_FOLDER}${encodeURI(n)}.${e}`)));
  // also accept accidental double extensions like "photo-01.jpg.jpeg"
  names.forEach(n => EXTENSIONS.forEach(e => list.push(`${PHOTO_FOLDER}${encodeURI(n)}.jpg.${e}`)));
  return list;
}

/* Find which filename exists for each photo, once, and remember it. */
const resolved = {};
function resolvePhoto(key) {
  if (resolved[key]) return resolved[key];
  resolved[key] = new Promise(resolve => {
    const list = candidates(key);
    let i = 0;
    const tryNext = () => {
      if (i >= list.length) return resolve(null);
      const probe = new Image();
      const src = list[i++];
      probe.onload = () => resolve(src);
      probe.onerror = tryNext;
      probe.src = src;
    };
    tryNext();
  });
  return resolved[key];
}

function fillPhotos(root) {
  root.querySelectorAll(".ph[data-photo]").forEach(el => {
    const key = el.dataset.photo;
    el.dataset.label = key === "cover" ? "Cover photo" : `Photo ${key}`;
    resolvePhoto(key).then(src => {
      if (!src) { el.classList.add("missing"); return; }
      el.classList.remove("missing");
      if (!el.querySelector("img")) {
        const img = document.createElement("img");
        img.alt = key === "cover" ? "Katli" : "";
        img.decoding = "async";
        img.src = src;
        el.appendChild(img);
      }
    });
  });
}

/* ---------- Book sizing ---------- */
const RATIO = 3 / 4;                     // page width : height
const wrap = document.querySelector(".book-wrap");
const stage = document.querySelector(".stage");
const bookTemplate = document.getElementById("book").innerHTML;

let pageFlip = null;
let currentOrientation = null;

function layout() {
  const sw = stage.clientWidth - 24;
  const sh = stage.clientHeight - 12;
  const fitH = sh * RATIO;                       // widest page that fits the height
  const landscapeW = Math.min(sw / 2, fitH);
  const portraitW = Math.min(sw, fitH);
  const orientation = landscapeW >= portraitW * 0.82 ? "landscape" : "portrait";
  const pw = Math.floor(orientation === "landscape" ? landscapeW : portraitW);
  return { orientation, pw };
}

function build(startPage = 0) {
  const { orientation, pw } = layout();
  currentOrientation = orientation;
  wrap.style.width = (orientation === "landscape" ? pw * 2 : pw) + "px";

  if (pageFlip) {
    pageFlip.destroy();
    const fresh = document.createElement("div");
    fresh.id = "book";
    fresh.innerHTML = bookTemplate;
    wrap.innerHTML = "";
    wrap.appendChild(fresh);
  }
  const bookEl = document.getElementById("book");
  fillPhotos(bookEl);

  pageFlip = new St.PageFlip(bookEl, {
    width: 600,
    height: 800,
    size: "stretch",
    minWidth: orientation === "portrait" ? Math.ceil(pw * 0.6) : Math.floor(pw * 0.5),
    maxWidth: 2000,
    minHeight: 100,
    maxHeight: 4000,
    showCover: true,
    usePortrait: true,
    maxShadowOpacity: 0.45,
    mobileScrollSupport: false,
    flippingTime: 900,
    startPage
  });
  pageFlip.loadFromHTML(bookEl.querySelectorAll(".page"));
  pageFlip.on("flip", updateCounter);
  updateCounter();
}

/* ---------- Controls ---------- */
const counter = document.getElementById("counter");
function updateCounter() {
  if (!pageFlip) return;
  const i = pageFlip.getCurrentPageIndex();
  const total = pageFlip.getPageCount();
  if (i === 0) counter.textContent = "Cover";
  else if (i === total - 1) counter.textContent = "Back cover";
  else if (currentOrientation === "landscape" && i + 1 < total - 1) counter.textContent = `Pages ${i + 1}–${i + 2}`;
  else counter.textContent = `Page ${i + 1} of ${total}`;
  if (i > 0) document.getElementById("hint").style.opacity = 0;
}

document.getElementById("prev").addEventListener("click", () => pageFlip && pageFlip.flipPrev());
document.getElementById("next").addEventListener("click", () => pageFlip && pageFlip.flipNext());
document.addEventListener("keydown", e => {
  if (!pageFlip) return;
  if (e.key === "ArrowRight") pageFlip.flipNext();
  if (e.key === "ArrowLeft") pageFlip.flipPrev();
});

let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    const keep = pageFlip ? pageFlip.getCurrentPageIndex() : 0;
    build(keep);
  }, 200);
});

/* Wait for fonts so text measures correctly, then open the magazine. */
(document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve())
  .then(() => build(0));
