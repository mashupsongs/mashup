/* हिमाचल रोडवेज़ — one screen, one song.
   Audio is a hidden YouTube IFrame player; the UI below is ours. */

/* Titles and artists are cleaned up by hand. The raw YouTube titles are
   stuffed with pipes, credits and hashtags, none of which belong in a
   player pill that truncates at one line. */
const TRACKS = [
  {
    youtubeId: "4cw3x0tU-pk",
    title: "Gulabi Sharara",
    artist: "Inder Arya",
    cover: "/covers/4cw3x0tU-pk.jpg",
  },
  {
    youtubeId: "6jMJCe2_9Vk",
    title: "Fwa Bagha Re",
    artist: "Pappu Karki",
    cover: "/covers/6jMJCe2_9Vk.jpg",
  },
  {
    youtubeId: "PYmKIMwXsSg",
    title: "Delhi Se Manali",
    artist: "Badshah",
    cover: "/covers/PYmKIMwXsSg.jpg",
  },
  {
    youtubeId: "19DJruVcZdQ",
    title: "Chali Bhai Motar Chali",
    artist: "Ankit Rawat",
    cover: "/covers/19DJruVcZdQ.jpg",
  },
  {
    youtubeId: "wyxt4Foj9u0",
    title: "Ramm Jhama",
    artist: "Priyanka Meher & Vivek Nautiyal",
    cover: "/covers/wyxt4Foj9u0.jpg",
  },
  {
    youtubeId: "ZTXJTUGb2bM",
    title: "Cream Paudara",
    artist: "Harsh Gangola",
    cover: "/covers/ZTXJTUGb2bM.jpg",
  },
  {
    youtubeId: "JnLqkI-88Qo",
    title: "Thando Re Thando",
    artist: "Narendra Singh Negi",
    cover: "/covers/JnLqkI-88Qo.jpg",
  },
  {
    youtubeId: "q1FzkQqMgzQ",
    title: "Bhalu Lagdu Bhanuli",
    artist: "Narendra Singh Negi & Meena Rana",
    cover: "/covers/q1FzkQqMgzQ.jpg",
  },
  {
    youtubeId: "hsY70MX8kVY",
    title: "Maalu Gwiraalu Ka Bich",
    artist: "Narendra Singh Negi & Anuradha Nirala",
    cover: "/covers/hsY70MX8kVY.jpg",
  },
  {
    youtubeId: "WqYSpu0AbO8",
    title: "Khela Paanso",
    artist: "Narendra Singh Negi",
    cover: "/covers/WqYSpu0AbO8.jpg",
  },
  {
    youtubeId: "tpWtbPFHB1I",
    title: "Saruli",
    artist: "Preetam Bhartwan & Meena Rana",
    cover: "/covers/tpWtbPFHB1I.jpg",
  },
  {
    youtubeId: "eTCiC1VOt48",
    title: "Surma Sarela",
    artist: "Narendra Singh Negi & Meena Rana",
    cover: "/covers/eTCiC1VOt48.jpg",
  },
  {
    youtubeId: "1G00xtHUfm4",
    title: "Phulari",
    artist: "Pandavaas",
    cover: "/covers/1G00xtHUfm4.jpg",
  },
  {
    youtubeId: "GmJqs8hKl_0",
    title: "Otuwa Belena",
    artist: "Vivek Nautiyal",
    cover: "/covers/GmJqs8hKl_0.jpg",
  },
  {
    youtubeId: "HLhcsMMmqow",
    title: "Chhakna Baand",
    artist: "Gajendra Rana",
    cover: "/covers/HLhcsMMmqow.jpg",
  },
  {
    youtubeId: "kOVbL25Kf1Q",
    title: "Furki Baand",
    artist: "Gajendra Rana",
    cover: "/covers/kOVbL25Kf1Q.jpg",
  },
  {
    youtubeId: "tyyjqZUZTO4",
    title: "Haldi Baan Mangal Snan",
    artist: "Pandavaas",
    cover: "/covers/tyyjqZUZTO4.jpg",
  },
  {
    youtubeId: "qG8_SEtqbJs",
    title: "Lehenga 2",
    artist: "Inder Arya & Jyoti Arya",
    cover: "/covers/qG8_SEtqbJs.jpg",
  },
  {
    youtubeId: "V9u9ogqrpEs",
    title: "Bol Heera",
    artist: "Inder Arya",
    cover: "/covers/V9u9ogqrpEs.jpg",
  },
  {
    youtubeId: "1ipJZHXol-U",
    title: "Hey Madhu",
    artist: "Inder Arya",
    cover: "/covers/1ipJZHXol-U.jpg",
  },
  {
    youtubeId: "qhJ2htuDjlg",
    title: "Chaita Ki Chaitwali",
    artist: "Amit Saagar",
    cover: "/covers/qhJ2htuDjlg.jpg",
  },
  {
    youtubeId: "ijN3PK7j6PQ",
    title: "Thal Ki Bazar",
    artist: "B.K. Samant",
    cover: "/covers/ijN3PK7j6PQ.jpg",
  },
  {
    youtubeId: "Wgbl6E8zqV8",
    title: "Ghumai De",
    artist: "Priyanka Meher",
    cover: "/covers/Wgbl6E8zqV8.jpg",
  },
  {
    youtubeId: "2WhxpNHxuD0",
    title: "Sapna Syali",
    artist: "Sanjay Bhandari & Anisha Ranghar",
    cover: "/covers/2WhxpNHxuD0.jpg",
  },
  {
    youtubeId: "MpPgfg8BKuk",
    title: "Tara Lagure",
    artist: "Ruhaan Bhardwaj & Karishma Shah",
    cover: "/covers/MpPgfg8BKuk.jpg",
  },
  {
    youtubeId: "Tx2uEx5yxx4",
    title: "Ramdai Ka Hotel",
    artist: "Satyendra Gangola",
    cover: "/covers/Tx2uEx5yxx4.jpg",
  },
  {
    youtubeId: "MVYkoXd_KZA",
    title: "Dhai Hathe Dhameli",
    artist: "Manoj Arya & Priyanka Meher",
    cover: "/covers/MVYkoXd_KZA.jpg",
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
    album: "हिमाचल रोडवेज़",
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
