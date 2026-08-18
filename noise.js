/* Animated film grain over the artwork.

   Eight small noise tiles are generated ONCE at load, converted to data
   URLs, and then cycled as a repeating CSS background. After setup no
   canvas is rasterized again: each "frame" is one background-image swap
   of an already-decoded tile, which the browser tiles and blends on the
   GPU. The previous version repainted a full-viewport canvas every third
   frame, which quadrupled in cost when the grain went 1:1 and stuttered
   the video on large displays.

   The layer sits above the artwork but below the UI, and it does NOT ride
   the bus bounce. Grain belongs to the lens, not the landscape, so it
   stays locked to the viewport while the scene moves underneath. */

(() => {

const TILE = 256; // px; tiled across the viewport by CSS
const FRAMES = 8; // distinct noise frames in the cycle
const ALPHA = 12; // 0-255. 12 is barely there, 30 is a heavy print
const INTERVAL_MS = 125; // ~8fps: projected-film flicker, not TV static

const layer = document.createElement("div");
layer.className = "grain";
layer.setAttribute("aria-hidden", "true");

const tile = document.createElement("canvas");
tile.width = TILE;
tile.height = TILE;
const ctx = tile.getContext("2d");
const image = ctx.createImageData(TILE, TILE);

const frames = [];
for (let f = 0; f < FRAMES; f++) {
  const buf = image.data;
  for (let i = 0; i < buf.length; i += 4) {
    const v = Math.random() * 255;
    buf[i] = v;
    buf[i + 1] = v;
    buf[i + 2] = v;
    buf[i + 3] = ALPHA;
  }
  ctx.putImageData(image, 0, 0);
  frames.push(`url(${tile.toDataURL()})`);
}

layer.style.backgroundImage = frames[0];
layer.style.backgroundRepeat = "repeat";
document.body.appendChild(layer);

const still = window.matchMedia("(prefers-reduced-motion: reduce)");

let timer = null;
let index = 0;

function start() {
  if (timer !== null || still.matches) return;
  timer = setInterval(() => {
    index = (index + 1) % FRAMES;
    layer.style.backgroundImage = frames[index];
  }, INTERVAL_MS);
}

function stop() {
  if (timer === null) return;
  clearInterval(timer);
  timer = null;
}

start();

// No point swapping frames on a tab nobody is looking at.
document.addEventListener("visibilitychange", () => {
  if (document.hidden) stop();
  else start();
});

// Reduced motion keeps the texture, loses the flicker.
still.addEventListener("change", () => {
  stop();
  start();
});

})();
