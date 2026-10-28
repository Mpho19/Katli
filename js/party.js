/* Floating balloons, gifts and party emojis behind the magazine. */
(function () {
  const party = document.getElementById("party");
  if (!party) return;
  const items = ["🎈", "🎈", "🎈", "🎁", "🎁", "🎉", "🥳", "💖", "🎂", "✨", "🎈", "💝"];
  const count = window.innerWidth < 700 ? 10 : 22;

  for (let i = 0; i < count; i++) {
    const wrap = document.createElement("div");
    wrap.className = "float";
    const inner = document.createElement("span");
    inner.textContent = items[i % items.length];

    const size = 26 + Math.random() * 34;            // 26–60px
    const duration = 16 + Math.random() * 14;         // 16–30s to float up
    wrap.style.left = (Math.random() * 96) + "vw";
    wrap.style.fontSize = size + "px";
    wrap.style.opacity = (0.55 + Math.random() * 0.4).toFixed(2);
    wrap.style.animationDuration = duration + "s";
    wrap.style.animationDelay = (-Math.random() * duration) + "s";   // start mid-air
    inner.style.animationDuration = (2.5 + Math.random() * 2.5) + "s";

    wrap.appendChild(inner);
    party.appendChild(wrap);
  }
})();
