/* Looping drive footage behind the bus interior.

   The still (bg.jpg) is always painted underneath, so this layer is purely
   additive. If anything here declines to play, the page still looks right.

   The source is attached from JS rather than sitting in the markup so that
   phones on Data Saver, or anyone who asked for reduced motion, never spend
   the download at all. A <source> tag in the HTML would fetch regardless. */

(() => {

const ENABLED = true;

/* Portrait phones get artwork and footage composed for a vertical frame;
   everything else gets the wide originals. Chosen once at load - the still
   underneath covers the rare mid-session rotation.

   The filename carries the version. When the video bytes change, the file
   gets a NEW NAME - never new bytes under an old name. Edge caches fetch
   ranges of these files and some ignore query strings in their cache key,
   so query-based versioning is not enough: viewers near a poisoned node
   kept receiving ranges mixed from two different encodes, which decodes
   as glitches, freezes and restarts. A fresh path misses every cache. */
const portrait = window.matchMedia("(orientation: portrait)").matches;
const SRC = portrait ? "/bg-portrait-v3.mp4" : "/bg-v4.mp4";

const video = document.querySelector(".hero-video");
if (video && portrait) video.poster = "/bg-portrait.jpg";

const still = window.matchMedia("(prefers-reduced-motion: reduce)");
const saveData = navigator.connection && navigator.connection.saveData;

function wanted() {
  return ENABLED && video && !still.matches && !saveData;
}

function tryPlay() {
  const attempt = video.play();
  if (attempt) {
    attempt.catch(() => {
      /* Autoplay refused, e.g. iOS Low Power Mode. Keep the still and try
         again on the first interaction the user makes anyway. */
      const retry = () => {
        video.play().catch(() => {});
      };
      document.addEventListener("pointerdown", retry, { once: true });
    });
  }
}

function load() {
  if (!wanted() || video.src) return;

  video.preload = "auto";
  video.src = SRC;
  video.load();

  // Only reveal once frames are actually rendering. Reacting to 'playing'
  // rather than 'canplay' avoids fading up onto a black first frame.
  video.addEventListener("playing", () => video.classList.add("is-playing"), {
    once: true,
  });

  video.addEventListener("error", () => {
    // Nothing to do; the still underneath is already correct.
    video.classList.remove("is-playing");
  });

  /* Do NOT start on first frames. Starting while the file still streams
     means playback races the network; every buffer underrun is a visible
     stutter and reads like the loop restarting. The files are ~2MB, so we
     wait for canplaythrough (browser projects an uninterrupted run) and
     the still covers us until then. The fallback timer starts anyway on a
     connection so slow the event never fires. */
  video.addEventListener("canplaythrough", tryPlay, { once: true });
  setTimeout(() => {
    if (video.paused) tryPlay();
  }, 12000);
}

/* Start the 2-4MB download only after everything else has finished: the
   still paints first, the player becomes usable, and the video fades in
   whenever it is ready. On a slow connection this is the difference
   between the site appearing instantly and staring at black. */
if (document.readyState === "complete") {
  load();
} else {
  window.addEventListener("load", () => setTimeout(load, 300), { once: true });
}

// Decoding video for a tab nobody is looking at is pure battery cost.
document.addEventListener("visibilitychange", () => {
  if (!video || !video.src) return;
  if (document.hidden) video.pause();
  else video.play().catch(() => {});
});

still.addEventListener("change", () => {
  if (still.matches) {
    video.pause();
    video.classList.remove("is-playing");
  } else {
    load();
    video.play().catch(() => {});
  }
});

})();
