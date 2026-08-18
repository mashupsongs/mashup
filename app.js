/* हिमाचल रोडवेज़ — one screen, one song.
   Audio is a hidden YouTube IFrame player; the UI below is ours. */

/* Titles and artists are cleaned up by hand. The raw YouTube titles are
   stuffed with pipes, credits and hashtags, none of which belong in a
   player pill that truncates at one line. */
const TRACKS = [
  {
    youtubeId: "A85MhlsZDZs",
    title: "Paro x Maand (Mashup)",
    artist: "Shubhadip Dey & Vibevik",
    cover: "https://i.ytimg.com/vi/A85MhlsZDZs/mqdefault.jpg",
  },
  {
    youtubeId: "feT46ZhuO_8",
    title: "Hua Main x Finding Her (Mashup)",
    artist: "Shubhadip Dey",
    cover: "https://i.ytimg.com/vi/feT46ZhuO_8/mqdefault.jpg",
  },
  {
    youtubeId: "hse0guB6BgU",
    title: "Lutt Le Gaya x Vaari Jaavan (Mashup)",
    artist: "Shubhadip Dey & Vibevik",
    cover: "https://i.ytimg.com/vi/hse0guB6BgU/mqdefault.jpg",
  },
  {
    youtubeId: "J1L7D15DQoY",
    title: "For A Reason x Boyfriend (Mashup)",
    artist: "Shubhadip Dey & Vibevik",
    cover: "https://i.ytimg.com/vi/J1L7D15DQoY/mqdefault.jpg",
  },
  {
    youtubeId: "c8ysr9e8HZ4",
    title: "Arz Kiya Hai x Jo Tum Mere Ho (Mashup)",
    artist: "Shubhadip Dey & Vibevik",
    cover: "https://i.ytimg.com/vi/c8ysr9e8HZ4/mqdefault.jpg",
  },
  {
    youtubeId: "q7aM44xM58M",
    title: "Die With A Smile x Teri Deewani (Mashup)",
    artist: "Shubhadip Dey",
    cover: "https://i.ytimg.com/vi/q7aM44xM58M/mqdefault.jpg",
  },
  {
    youtubeId: "8xO6p8qXQ40",
    title: "Awarapan x Saiyaara (Mashup)",
    artist: "Shubhadip Dey",
    cover: "https://i.ytimg.com/vi/8xO6p8qXQ40/mqdefault.jpg",
  },
  {
    youtubeId: "9wJ4E7r5x7A",
    title: "Khat X Meri Banogi Kya (Mashup)",
    artist: "Shubhadip Dey",
    cover: "https://i.ytimg.com/vi/9wJ4E7r5x7A/mqdefault.jpg",
  },
  {
    youtubeId: "7f34R7Lq0P0",
    title: "Majboor x Sadqay (Mashup)",
    artist: "Shubhadip Dey",
    cover: "https://i.ytimg.com/vi/7f34R7Lq0P0/mqdefault.jpg",
  },
  {
    youtubeId: "N7qG171H4a8",
    title: "Raabta x Tum Ho Toh (Mashup)",
    artist: "Shubhadip Dey",
    cover: "https://i.ytimg.com/vi/N7qG171H4a8/mqdefault.jpg",
  },
  {
    youtubeId: "2c42E4M60Q0",
    title: "Finding Her x Dooron Dooron (Mashup)",
    artist: "Shubhadip Dey",
    cover: "https://i.ytimg.com/vi/2c42E4M60Q0/mqdefault.jpg",
  },
];

/* ---------- clock ---------- */

const el = (id) => document.getElementById(id);

function tickClock() {
  const now = new Date();
  let h = now.getHours();
  const ap = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  el("clock-h").textContent = String(h);
  el("clock-m").textContent = String(now.getMinutes()).padStart(2, "0");
  el("clock-ap").textContent = ap;
}

tickClock();
setInterval(tickClock, 1000);

/* ---------- player ---------- */

const card = el("player-card");
const seek = el("seek");
const playBtn = el("play");
const prevBtn = el("prev");
const nextBtn = el("next");

let player = null;
let ready = false;
let scrubbing = false;
let index = 0;

function fmt(seconds) {
  if (!isFinite(seconds) || seconds < 0) seconds = 0;
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

function setProgress(ratio) {
  const pct = Math.max(0, Math.min(1, ratio)) * 100;
  seek.style.setProperty("--progress", `${pct}%`);
  if (!scrubbing) seek.value = String(Math.round(pct * 10));
}

function renderTrack() {
  const t = TRACKS[index];
  el("track-title").textContent = t.title;
  el("track-artist").textContent = t.artist;
  el("cover").src = t.cover;
  document.title = `Mashup Songs - ${t.title}`;

  // The pill follows whatever is playing rather than pointing at a fixed video.
  el("yt-link").href = `https://www.youtube.com/watch?v=${t.youtubeId}`;

  publishMediaSession(t);

  const solo = TRACKS.length < 2;
  prevBtn.disabled = solo;
  nextBtn.disabled = solo;
}

/* Lock screen and hardware keys. The audio lives inside a YouTube iframe,
   so the browser has no idea what is playing; without this the lock screen
   shows the page title and the headphone buttons do nothing. */
function publishMediaSession(t) {
  if (!("mediaSession" in navigator)) return;

  navigator.mediaSession.metadata = new MediaMetadata({
    title: t.title,
    artist: t.artist,
    album: "Mashup Songs",
    artwork: [
      { src: t.cover, sizes: "640x640", type: "image/jpeg" },
    ],
  });

  const bind = (action, fn) => {
    try {
      navigator.mediaSession.setActionHandler(action, fn);
    } catch {
      /* not every action is supported everywhere */
    }
  };

  bind("play", () => ready && player.playVideo());
  bind("pause", () => ready && player.pauseVideo());
  bind("previoustrack", () => prevBtn.click());
  bind("nexttrack", () => nextBtn.click());
}

function loadTrack(i) {
  index = (i + TRACKS.length) % TRACKS.length;
  renderTrack();
  if (ready) player.loadVideoById(TRACKS[index].youtubeId);
}

renderTrack();

/* YouTube IFrame API */

/* Built by hand so the iframe keeps the allow list set in the markup.
   Passing an id string to YT.Player instead makes the API replace the
   element with its own iframe, which re-grants picture-in-picture. */
function embedUrl(youtubeId) {
  const params = new URLSearchParams({
    enablejsapi: "1",
    controls: "0",
    disablekb: "1",
    playsinline: "1",
    rel: "0",
    modestbranding: "1",
    origin: location.origin,
  });
  return `https://www.youtube.com/embed/${youtubeId}?${params}`;
}

window.onYouTubeIframeAPIReady = function () {
  const iframe = document.getElementById("yt-player");
  iframe.src = embedUrl(TRACKS[index].youtubeId);

  player = new YT.Player(iframe, {
    events: {
      onReady: () => {
        ready = true;
        el("duration").textContent = fmt(player.getDuration());
      },
      onStateChange: (e) => {
        const S = YT.PlayerState;
        if (e.data === S.PLAYING) {
          card.classList.add("is-playing");
          playBtn.setAttribute("aria-label", "Pause");
          el("duration").textContent = fmt(player.getDuration());
        } else {
          card.classList.remove("is-playing");
          playBtn.setAttribute("aria-label", "Play");
        }

        if ("mediaSession" in navigator) {
          navigator.mediaSession.playbackState =
            e.data === S.PLAYING ? "playing" : "paused";
        }
        if (e.data === S.ENDED) {
          if (TRACKS.length > 1) loadTrack(index + 1);
          else player.seekTo(0, true);
          player.playVideo();
        }
      },
    },
  });
};

const ytTag = document.createElement("script");
ytTag.src = "https://www.youtube.com/iframe_api";
document.head.appendChild(ytTag);

/* progress loop */

setInterval(() => {
  if (!ready || scrubbing) return;
  const dur = player.getDuration();
  const cur = player.getCurrentTime();
  if (!dur) return;
  el("elapsed").textContent = fmt(cur);
  el("duration").textContent = fmt(dur);
  setProgress(cur / dur);
}, 250);

/* controls */

playBtn.addEventListener("click", () => {
  if (!ready) return;
  const S = YT.PlayerState;
  if (player.getPlayerState() === S.PLAYING) player.pauseVideo();
  else player.playVideo();
});

prevBtn.addEventListener("click", () => {
  if (!ready) return;
  if (player.getCurrentTime() > 3) player.seekTo(0, true);
  else loadTrack(index - 1);
});

nextBtn.addEventListener("click", () => loadTrack(index + 1));

seek.addEventListener("input", () => {
  scrubbing = true;
  setProgress(Number(seek.value) / 1000);
});

seek.addEventListener("change", () => {
  if (ready) {
    const dur = player.getDuration();
    if (dur) player.seekTo((Number(seek.value) / 1000) * dur, true);
  }
  scrubbing = false;
});

/* Keyboard: space play/pause, arrows for tracks. No UI for this on purpose;
   it just works like a music app. Skipped when focus is on a control so the
   browser's own key handling (activating buttons, nudging the seek slider)
   stays intact. */
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, button, a")) return;

  if (e.code === "Space") {
    e.preventDefault();
    playBtn.click();
  } else if (e.code === "ArrowRight") {
    nextBtn.click();
  } else if (e.code === "ArrowLeft") {
    prevBtn.click();
  }
});
