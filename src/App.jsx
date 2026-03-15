import { useState, useEffect, useRef, useCallback } from "react";

// ═══════════════════════════════════════════════════════════════
// YOUR FAMILY — edit names/avatars/colors
// ═══════════════════════════════════════════════════════════════
const FAMILY = [
  { id: "todd", name: "Todd", avatar: "👨🏻", color: "#c9a84c" },
  { id: "ilina", name: "Ilina", avatar: "👩🏾", color: "#b07cc3" },
  { id: "neal", name: "Neal", avatar: "👨🏽", color: "#4ab8a9" },
  { id: "carter", name: "Carter", avatar: "👨🏽", color: "#e0605d" },
  { id: "rory", name: "Rory", avatar: "👩🏼", color: "#e8a44a" },
];

// ═══════════════════════════════════════════════════════════════
// VOTES — fill in before the ceremony
// Each value must exactly match a nominee string from CATEGORIES
// ═══════════════════════════════════════════════════════════════
const VOTES = {
  todd: {
    best_picture: "One Battle after Another",
    best_director: "Ryan Coogler – Sinners",
    best_actor: "Leonardo DiCaprio – One Battle after Another",
    best_actress: "Jessie Buckley – Hamnet",
    best_supporting_actor: "Sean Penn – One Battle after Another",
    best_supporting_actress: "Amy Madigan – Weapons",
    best_adapted_screenplay: "One Battle after Another – Paul Thomas Anderson",
    best_original_screenplay: "Sinners – Ryan Coogler",
    best_animated: "Elio",
    best_international: "Sentimental Value – Norway",
    best_documentary: "Mr Nobody against Putin",
    best_score: "Hamnet – Max Richter",
    best_song: "Train Dreams – Train Dreams",
    best_cinematography: "Train Dreams",
    best_editing: "Marty Supreme",
    best_production_design: "Hamnet",
    best_costume: "Frankenstein",
    best_makeup: "Frankenstein",
    best_sound: "F1",
    best_vfx: "Avatar: Fire and Ash",
    best_casting: "One Battle after Another – Cassandra Kulukundis",
    best_animated_short: "The Girl Who Cried Pearls",
    best_live_action_short: "Two People Exchanging Saliva",
    best_documentary_short: "All the Empty Rooms",
  },
  ilina: {
    best_picture: "Sinners",
    best_director: "Ryan Coogler – Sinners",
    best_actor: "Michael B. Jordan – Sinners",
    best_actress: "Jessie Buckley – Hamnet",
    best_supporting_actor: "Sean Penn – One Battle after Another",
    best_supporting_actress: "Teyana Taylor – One Battle after Another",
    best_adapted_screenplay: "Hamnet – Chloé Zhao & Maggie O'Farrell",
    best_original_screenplay: "Sinners – Ryan Coogler",
    best_animated: "Little Amélie or the Character of Rain",
    best_international: "Sentimental Value – Norway",
    best_documentary: "The Alabama Solution",
    best_score: "Sinners – Ludwig Goransson",
    best_song: "Train Dreams – Train Dreams",
    best_cinematography: "Sinners",
    best_editing: "Sinners",
    best_production_design: "Sinners",
    best_costume: "Frankenstein",
    best_makeup: "Frankenstein",
    best_sound: "Sinners",
    best_vfx: "Avatar: Fire and Ash",
    best_casting: "Sinners – Francine Maisler",
    best_animated_short: "Butterfly",
    best_live_action_short: "Two People Exchanging Saliva",
    best_documentary_short: "All the Empty Rooms",
  },
  neal: {
    best_picture: "Sinners",
    best_director: "Paul Thomas Anderson – One Battle after Another",
    best_actor: "Wagner Moura – The Secret Agent",
    best_actress: "Jessie Buckley – Hamnet",
    best_supporting_actor: "Stellan Skarsgård – Sentimental Value",
    best_supporting_actress: "Amy Madigan – Weapons",
    best_adapted_screenplay: "One Battle after Another – Paul Thomas Anderson",
    best_original_screenplay: "Sinners – Ryan Coogler",
    best_animated: "KPop Demon Hunters",
    best_international: "The Secret Agent – Brazil",
    best_documentary: "Mr Nobody against Putin",
    best_score: "Sinners – Ludwig Goransson",
    best_song: "Golden – KPop Demon Hunters",
    best_cinematography: "One Battle after Another",
    best_editing: "F1",
    best_production_design: "Frankenstein",
    best_costume: "Marty Supreme",
    best_makeup: "Frankenstein",
    best_sound: "F1",
    best_vfx: "Avatar: Fire and Ash",
    best_casting: "Sinners – Francine Maisler",
    best_animated_short: "The Girl Who Cried Pearls",
    best_live_action_short: "Butcher's Stain",
    best_documentary_short: "Perfectly a Strangeness",
  },
  carter: {
    best_picture: "One Battle after Another",
    best_director: "Paul Thomas Anderson – One Battle after Another",
    best_actor: "Timothée Chalamet – Marty Supreme",
    best_actress: "Jessie Buckley – Hamnet",
    best_supporting_actor: "Sean Penn – One Battle after Another",
    best_supporting_actress: "Amy Madigan – Weapons",
    best_adapted_screenplay: "One Battle after Another – Paul Thomas Anderson",
    best_original_screenplay: "Sinners – Ryan Coogler",
    best_animated: "KPop Demon Hunters",
    best_international: "Sentimental Value – Norway",
    best_documentary: "The Perfect Neighbor",
    best_score: "Sinners – Ludwig Goransson",
    best_song: "Golden – KPop Demon Hunters",
    best_cinematography: "One Battle after Another",
    best_editing: "One Battle after Another",
    best_production_design: "Frankenstein",
    best_costume: "Frankenstein",
    best_makeup: "Frankenstein",
    best_sound: "F1",
    best_vfx: "Avatar: Fire and Ash",
    best_casting: "Sinners – Francine Maisler",
    best_animated_short: "Butterfly",
    best_live_action_short: "Two People Exchanging Saliva",
    best_documentary_short: "All the Empty Rooms",
  },
  rory: {
    best_picture: "One Battle after Another",
    best_director: "Paul Thomas Anderson – One Battle after Another",
    best_actor: "Timothée Chalamet – Marty Supreme",
    best_actress: "Jessie Buckley – Hamnet",
    best_supporting_actor: "Delroy Lindo – Sinners",
    best_supporting_actress: "Amy Madigan – Weapons",
    best_adapted_screenplay: "Hamnet – Chloé Zhao & Maggie O'Farrell",
    best_original_screenplay: "Sinners – Ryan Coogler",
    best_animated: "KPop Demon Hunters",
    best_international: "Sentimental Value – Norway",
    best_documentary: "The Alabama Solution",
    best_score: "Sinners – Ludwig Goransson",
    best_song: "I Lied to You – Sinners",
    best_cinematography: "Sinners",
    best_editing: "One Battle after Another",
    best_production_design: "Frankenstein",
    best_costume: "Frankenstein",
    best_makeup: "Frankenstein",
    best_sound: "Sinners",
    best_vfx: "Avatar: Fire and Ash",
    best_casting: "Sinners – Francine Maisler",
    best_animated_short: "The Girl Who Cried Pearls",
    best_live_action_short: "A Friend of Dorothy",
    best_documentary_short: "All the Empty Rooms",
  },
};

// ═══════════════════════════════════════════════════════════════
// CATEGORIES + NOMINEES (all 24 for the 98th Academy Awards)
// ═══════════════════════════════════════════════════════════════
const CATEGORIES = [
  { id: "best_picture", name: "Best Picture", emoji: "🏆", nominees: ["Bugonia", "F1", "Frankenstein", "Hamnet", "Marty Supreme", "One Battle after Another", "The Secret Agent", "Sentimental Value", "Sinners", "Train Dreams"] },
  { id: "best_director", name: "Best Director", emoji: "🎬", nominees: ["Chloé Zhao – Hamnet", "Josh Safdie – Marty Supreme", "Paul Thomas Anderson – One Battle after Another", "Joachim Trier – Sentimental Value", "Ryan Coogler – Sinners"] },
  { id: "best_actor", name: "Best Actor", emoji: "🎭", nominees: ["Timothée Chalamet – Marty Supreme", "Leonardo DiCaprio – One Battle after Another", "Ethan Hawke – Blue Moon", "Michael B. Jordan – Sinners", "Wagner Moura – The Secret Agent"] },
  { id: "best_actress", name: "Best Actress", emoji: "👑", nominees: ["Jessie Buckley – Hamnet", "Rose Byrne – If I Had Legs I'd Kick You", "Kate Hudson – Song Sung Blue", "Renate Reinsve – Sentimental Value", "Emma Stone – Bugonia"] },
  { id: "best_supporting_actor", name: "Supporting Actor", emoji: "🌟", nominees: ["Benicio Del Toro – One Battle after Another", "Jacob Elordi – Frankenstein", "Delroy Lindo – Sinners", "Sean Penn – One Battle after Another", "Stellan Skarsgård – Sentimental Value"] },
  { id: "best_supporting_actress", name: "Supporting Actress", emoji: "✨", nominees: ["Elle Fanning – Sentimental Value", "Inga Ibsdotter Lilleaas – Sentimental Value", "Amy Madigan – Weapons", "Wunmi Mosaku – Sinners", "Teyana Taylor – One Battle after Another"] },
  { id: "best_adapted_screenplay", name: "Adapted Screenplay", emoji: "📝", nominees: ["Bugonia – Will Tracy", "Frankenstein – Guillermo del Toro", "Hamnet – Chloé Zhao & Maggie O'Farrell", "One Battle after Another – Paul Thomas Anderson", "Train Dreams – Clint Bentley & Greg Kwedar"] },
  { id: "best_original_screenplay", name: "Original Screenplay", emoji: "✍️", nominees: ["Blue Moon – Robert Kaplow", "It Was Just an Accident – Jafar Panahi", "Marty Supreme – Ronald Bronstein & Josh Safdie", "Sentimental Value – Eskil Vogt & Joachim Trier", "Sinners – Ryan Coogler"] },
  { id: "best_animated", name: "Animated Feature", emoji: "🎨", nominees: ["Arco", "Elio", "KPop Demon Hunters", "Little Amélie or the Character of Rain", "Zootopia 2"] },
  { id: "best_international", name: "International Feature", emoji: "🌍", nominees: ["The Secret Agent – Brazil", "It Was Just an Accident – France", "Sentimental Value – Norway", "Sirāt – Spain", "The Voice of Hind Rajab – Tunisia"] },
  { id: "best_documentary", name: "Documentary Feature", emoji: "📽️", nominees: ["The Alabama Solution", "Come See Me in the Good Light", "Cutting through Rocks", "Mr Nobody against Putin", "The Perfect Neighbor"] },
  { id: "best_score", name: "Original Score", emoji: "🎵", nominees: ["Bugonia – Jerskin Fendrix", "Frankenstein – Alexandre Desplat", "Hamnet – Max Richter", "One Battle after Another – Jonny Greenwood", "Sinners – Ludwig Goransson"] },
  { id: "best_song", name: "Original Song", emoji: "🎤", nominees: ["Dear Me – Diane Warren: Relentless", "Golden – KPop Demon Hunters", "I Lied to You – Sinners", "Sweet Dreams of Joy – Viva Verdi!", "Train Dreams – Train Dreams"] },
  { id: "best_cinematography", name: "Cinematography", emoji: "📸", nominees: ["Frankenstein", "Marty Supreme", "One Battle after Another", "Sinners", "Train Dreams"] },
  { id: "best_editing", name: "Film Editing", emoji: "✂️", nominees: ["F1", "Marty Supreme", "One Battle after Another", "Sentimental Value", "Sinners"] },
  { id: "best_production_design", name: "Production Design", emoji: "🏛️", nominees: ["Frankenstein", "Hamnet", "Marty Supreme", "One Battle after Another", "Sinners"] },
  { id: "best_costume", name: "Costume Design", emoji: "👗", nominees: ["Avatar: Fire and Ash", "Frankenstein", "Hamnet", "Marty Supreme", "Sinners"] },
  { id: "best_makeup", name: "Makeup & Hairstyling", emoji: "💄", nominees: ["Frankenstein", "Kokuho", "Sinners", "The Smashing Machine", "The Ugly Stepsister"] },
  { id: "best_sound", name: "Sound", emoji: "🔊", nominees: ["F1", "Frankenstein", "One Battle after Another", "Sinners", "Sirāt"] },
  { id: "best_vfx", name: "Visual Effects", emoji: "💥", nominees: ["Avatar: Fire and Ash", "F1", "Jurassic World Rebirth", "The Lost Bus", "Sinners"] },
  { id: "best_casting", name: "Casting", emoji: "🎯", nominees: ["Hamnet – Nina Gold", "Marty Supreme – Jennifer Venditti", "One Battle after Another – Cassandra Kulukundis", "The Secret Agent – Gabriel Domingues", "Sinners – Francine Maisler"] },
  { id: "best_animated_short", name: "Animated Short", emoji: "🦋", nominees: ["Butterfly", "Forevergreen", "The Girl Who Cried Pearls", "Retirement Plan", "The Three Sisters"] },
  { id: "best_live_action_short", name: "Live Action Short", emoji: "🎞️", nominees: ["Butcher's Stain", "A Friend of Dorothy", "Jane Austen's Period Drama", "The Singers", "Two People Exchanging Saliva"] },
  { id: "best_documentary_short", name: "Documentary Short", emoji: "🎥", nominees: ["All the Empty Rooms", "Armed Only with a Camera", "Children No More: Were and Are Gone", "The Devil Is Busy", "Perfectly a Strangeness"] },
];

const WIKI_CAT_MAP = {
  "Best Picture": "best_picture", "Best Directing": "best_director",
  "Best Actor in a Leading Role": "best_actor", "Best Actress in a Leading Role": "best_actress",
  "Best Actor in a Supporting Role": "best_supporting_actor", "Best Actress in a Supporting Role": "best_supporting_actress",
  "Best Writing (Original Screenplay)": "best_original_screenplay", "Best Writing (Adapted Screenplay)": "best_adapted_screenplay",
  "Best Animated Feature Film": "best_animated", "Best International Feature Film": "best_international",
  "Best Documentary Feature Film": "best_documentary", "Best Music (Original Score)": "best_score",
  "Best Music (Original Song)": "best_song", "Best Cinematography": "best_cinematography",
  "Best Film Editing": "best_editing", "Best Production Design": "best_production_design",
  "Best Costume Design": "best_costume", "Best Makeup and Hairstyling": "best_makeup",
  "Best Sound": "best_sound", "Best Visual Effects": "best_vfx",
  "Best Short Film (Live Action)": "best_live_action_short", "Best Live Action Short Film": "best_live_action_short",
  "Best Animated Short Film": "best_animated_short",
  "Best Documentary Short Film": "best_documentary_short",
  "Achievement in Casting": "best_casting", "Best Casting": "best_casting",
};

const TOTAL = CATEGORIES.length;

// ═══════════════════════════════════════════════════════════════
// WIKIPEDIA PARSER
// ═══════════════════════════════════════════════════════════════
async function fetchWikipediaWinners() {
  const ts = new Date().toLocaleTimeString();
  console.log(`[${ts}] 🎬 Fetching Wikipedia 98th Academy Awards...`);
  const params = new URLSearchParams({ action: "parse", page: "98th_Academy_Awards", format: "json", origin: "*", prop: "text" });
  const resp = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
  console.log(`[${ts}] 📡 Response status: ${resp.status}`);
  const data = await resp.json();
  if (data.error) throw new Error(data.error.info);
  const html = data.parse.text["*"];
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const winners = {};
  let categoriesFound = 0;
  doc.querySelectorAll("div").forEach(div => {
    if (!(div.getAttribute("style") || "").toLowerCase().includes("f9efaa")) return;
    const link = div.querySelector("b a");
    if (!link) return;
    const wikiName = link.textContent.trim();
    const appId = WIKI_CAT_MAP[wikiName];
    if (!appId) {
      console.log(`[${ts}] ⚠️  Unrecognized category header: "${wikiName}"`);
      return;
    }
    categoriesFound++;
    let ul = div.nextElementSibling;
    let s = 0;
    while (ul && ul.tagName !== "UL" && s < 5) { ul = ul.nextElementSibling; s++; }
    if (!ul || ul.tagName !== "UL") {
      console.log(`[${ts}] ⚠️  No <ul> found for ${appId}`);
      return;
    }
    const li = ul.querySelector(":scope > li");
    if (!li) return;
    if (li.textContent.includes("\u2021") && li.querySelector(":scope > b")) {
      let raw = li.querySelector(":scope > b").textContent.replace(/\u2021/g, "").replace(/\s+/g, " ").trim();
      const cat = CATEGORIES.find(c => c.id === appId);
      if (cat) {
        const norm = (s) => s.toLowerCase()
          .replace(/[\u2013\u2014\u2012\u2015—–-]/g, "-")
          .replace(/[""''\"\']/g, "")
          .replace(/\s+/g, " ")
          .trim();
        const rawNorm = norm(raw);
        const match = cat.nominees.find(n => {
          const nNorm = norm(n);
          return rawNorm.includes(nNorm) ||
                 nNorm.includes(rawNorm) ||
                 rawNorm.includes(nNorm.split("-")[0].trim()) ||
                 nNorm.includes(rawNorm.split("-")[0].trim());
        });
        winners[appId] = match || raw;
        if (match) {
          console.log(`[${ts}] 🏆 ${cat.name}: "${match}"`);
        } else {
          console.log(`[${ts}] 🏆 ${cat.name}: "${raw}" (⚠️ no nominee match — using raw)`);
        }
      } else {
        winners[appId] = raw;
        console.log(`[${ts}] 🏆 ${appId}: "${raw}" (no category obj)`);
      }
    }
  });
  console.log(`[${ts}] 📊 Categories scanned: ${categoriesFound} | Winners found: ${Object.keys(winners).length}/${TOTAL}`);
  return winners;
}

// ═══════════════════════════════════════════════════════════════
// STARTUP VALIDATION — check all picks against Wikipedia nominees
// ═══════════════════════════════════════════════════════════════
async function validatePicksAgainstWikipedia() {
  const ts = new Date().toLocaleTimeString();
  console.log(`\n[${ts}] 🔍 VALIDATING PICKS AGAINST WIKIPEDIA NOMINEES...`);
  try {
    const params = new URLSearchParams({ action: "parse", page: "98th_Academy_Awards", format: "json", origin: "*", prop: "text" });
    const resp = await fetch(`https://en.wikipedia.org/w/api.php?${params}`);
    const data = await resp.json();
    if (data.error) throw new Error(data.error.info);
    const html = data.parse.text["*"];
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract all nominees from Wikipedia per category
    const wikiNominees = {};
    doc.querySelectorAll("div").forEach(div => {
      if (!(div.getAttribute("style") || "").toLowerCase().includes("f9efaa")) return;
      const link = div.querySelector("b a");
      if (!link) return;
      const appId = WIKI_CAT_MAP[link.textContent.trim()];
      if (!appId) return;
      let ul = div.nextElementSibling;
      let s = 0;
      while (ul && ul.tagName !== "UL" && s < 5) { ul = ul.nextElementSibling; s++; }
      if (!ul || ul.tagName !== "UL") return;
      const nominees = [];
      ul.querySelectorAll(":scope > li").forEach(li => {
        // Get text, strip footnotes/refs, clean up
        let text = li.textContent.replace(/\u2021/g, "").replace(/\[.*?\]/g, "").replace(/\s+/g, " ").trim();
        nominees.push(text);
      });
      wikiNominees[appId] = nominees;
    });

    // Normalize function for fuzzy matching
    const norm = (s) => s.toLowerCase()
      .replace(/[\u2013\u2014\u2012\u2015—–-]/g, "-")
      .replace(/[""''\"\']/g, "")
      .replace(/\s+/g, " ")
      .trim();

    let totalErrors = 0;

    // Check each person's picks
    FAMILY.forEach(member => {
      const picks = VOTES[member.id];
      if (!picks) {
        console.warn(`[${ts}] ⚠️  ${member.name}: No votes found!`);
        return;
      }
      let memberErrors = 0;

      CATEGORIES.forEach(cat => {
        const pick = picks[cat.id];
        if (!pick) {
          console.warn(`[${ts}] ⚠️  ${member.name} → ${cat.name}: No pick!`);
          memberErrors++;
          return;
        }

        // Check against our local CATEGORIES nominees
        const localMatch = cat.nominees.includes(pick);

        // Check against Wikipedia nominees (fuzzy)
        const wikiNoms = wikiNominees[cat.id] || [];
        const pickNorm = norm(pick);
        const wikiMatch = wikiNoms.some(wn => {
          const wnNorm = norm(wn);
          return wnNorm.includes(pickNorm) ||
                 pickNorm.includes(wnNorm) ||
                 wnNorm.includes(pickNorm.split("-")[0].trim()) ||
                 pickNorm.includes(wnNorm.split("-")[0].trim());
        });

        if (!localMatch) {
          console.error(`[${ts}] ❌ ${member.name} → ${cat.name}: "${pick}" NOT in local nominees: [${cat.nominees.join(", ")}]`);
          memberErrors++;
          totalErrors++;
        } else if (!wikiMatch) {
          console.warn(`[${ts}] ⚠️  ${member.name} → ${cat.name}: "${pick}" matches local but NOT found in Wikipedia nominees`);
        }
      });

      if (memberErrors === 0) {
        console.log(`[${ts}] ✅ ${member.name}: All ${CATEGORIES.length} picks valid`);
      } else {
        console.warn(`[${ts}] ⚠️  ${member.name}: ${memberErrors} issue(s) found`);
      }
    });

    // Also check local CATEGORIES against Wikipedia
    console.log(`\n[${ts}] 🔍 CROSS-CHECKING LOCAL CATEGORIES VS WIKIPEDIA...`);
    let catIssues = 0;
    CATEGORIES.forEach(cat => {
      const wikiNoms = wikiNominees[cat.id];
      if (!wikiNoms) {
        console.warn(`[${ts}] ⚠️  ${cat.name} (${cat.id}): Not found on Wikipedia`);
        catIssues++;
        return;
      }
      if (wikiNoms.length !== cat.nominees.length) {
        console.warn(`[${ts}] ⚠️  ${cat.name}: Local has ${cat.nominees.length} nominees, Wikipedia has ${wikiNoms.length}`);
      }
      // Check each local nominee exists in wiki
      cat.nominees.forEach(n => {
        const nNorm = norm(n);
        const found = wikiNoms.some(wn => {
          const wnNorm = norm(wn);
          return wnNorm.includes(nNorm) || nNorm.includes(wnNorm) ||
                 wnNorm.includes(nNorm.split("-")[0].trim()) ||
                 nNorm.includes(wnNorm.split("-")[0].trim());
        });
        if (!found) {
          console.warn(`[${ts}] ⚠️  ${cat.name}: Local nominee "${n}" not matched in Wikipedia`);
          catIssues++;
        }
      });
    });
    if (catIssues === 0) {
      console.log(`[${ts}] ✅ All local categories & nominees match Wikipedia`);
    }

    console.log(`\n[${ts}] 🏁 Validation complete. ${totalErrors === 0 ? "All picks are valid! 🎉" : `${totalErrors} error(s) found — check above.`}`);
  } catch (e) {
    console.error(`[${ts}] ❌ Validation failed:`, e.message);
  }
}

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════
const fontLink = document.createElement("link");
fontLink.href = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap";
fontLink.rel = "stylesheet";
document.head.appendChild(fontLink);

const style = document.createElement("style");
style.textContent = `
  :root {
    --gold:#c9a84c; --gold-light:#f0dda0; --gold-dim:#8a7232;
    --bg:#08080c; --card:#101018; --surface:#1a1a26;
    --text:#e8e4db; --mid:#8d8a82; --dim:#4a4844;
    --green:#5cd97f; --red:#e05252; --border:#222230;
    color-scheme: dark;
  }
  *{margin:0;padding:0;box-sizing:border-box}
  html,body{background:var(--bg) !important;color:var(--text) !important;font-family:'Outfit',sans-serif;-webkit-font-smoothing:antialiased}
  body::before{content:'';position:fixed;inset:0;pointer-events:none;z-index:1;opacity:.02;
    background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")}
  @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
  @keyframes pop{0%{transform:scale(0)}60%{transform:scale(1.2)}100%{transform:scale(1)}}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:.35}}
  @keyframes popIn{0%{transform:scale(0);opacity:0}60%{transform:scale(1.3);opacity:1}100%{transform:scale(1);opacity:1}}
  @keyframes tooltipIn{from{opacity:0;transform:translate(-50%,-100%) translateY(4px)}to{opacity:1;transform:translate(-50%,-100%) translateY(0)}}
  @keyframes riseUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}
  @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
  #tooltip-root{position:fixed;top:0;left:0;width:0;height:0;z-index:999999;pointer-events:none}
`;
document.head.appendChild(style);

// Create a root element for tooltips so they escape all clipping/overflow
const tooltipRoot = document.createElement("div");
tooltipRoot.id = "tooltip-root";
document.body.appendChild(tooltipRoot);

// ═══════════════════════════════════════════════════════════════
// TOOLTIP COMPONENT — renders via portal to body level
// The tooltip IS the element — pass style to make it the circle.
// Works on desktop (hover) and mobile (tap to toggle, tap elsewhere to dismiss)
// ═══════════════════════════════════════════════════════════════
let activeTooltipHide = null;

function dismissAllTooltips() {
  if (activeTooltipHide) {
    activeTooltipHide();
    activeTooltipHide = null;
  }
}

function Tooltip({ text, children, style: passedStyle }) {
  const [show, setShow] = useState(false);
  const ref = useRef(null);
  const [tooltipContainer] = useState(() => document.createElement("div"));

  const hideTip = useCallback(() => {
    setShow(false);
    tooltipContainer.innerHTML = "";
    if (activeTooltipHide === hideTipStable.current) activeTooltipHide = null;
  }, [tooltipContainer]);

  // Stable ref so the global dismissAllTooltips can call it
  const hideTipStable = useRef(hideTip);
  hideTipStable.current = hideTip;

  useEffect(() => {
    tooltipRoot.appendChild(tooltipContainer);
    return () => {
      if (tooltipRoot.contains(tooltipContainer)) tooltipRoot.removeChild(tooltipContainer);
    };
  }, [tooltipContainer]);

  const showTip = useCallback(() => {
    if (!ref.current) return;
    // Dismiss any other open tooltip
    if (activeTooltipHide && activeTooltipHide !== hideTipStable.current) {
      activeTooltipHide();
    }
    activeTooltipHide = hideTipStable.current;

    const rect = ref.current.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top - 8;
    setShow(true);

    tooltipContainer.innerHTML = "";
    const tip = document.createElement("div");
    Object.assign(tip.style, {
      position: "fixed",
      left: `${x}px`,
      top: `${y}px`,
      transform: "translate(-50%, -100%)",
      background: "#1a1a2a",
      border: "1px solid #3a3a4a",
      borderRadius: "8px",
      padding: "7px 12px",
      fontSize: "11px",
      fontWeight: "500",
      fontFamily: "'Outfit', sans-serif",
      color: "#e8e4db",
      whiteSpace: "nowrap",
      pointerEvents: "none",
      boxShadow: "0 6px 24px rgba(0,0,0,.6)",
      animation: "tooltipIn .15s ease",
      zIndex: "999999",
      maxWidth: "280px",
      overflow: "hidden",
      textOverflow: "ellipsis",
    });
    tip.textContent = text;
    tooltipContainer.appendChild(tip);

    requestAnimationFrame(() => {
      const tipRect = tip.getBoundingClientRect();
      if (tipRect.left < 4) tip.style.left = `${x + (4 - tipRect.left)}px`;
      if (tipRect.right > window.innerWidth - 4) tip.style.left = `${x - (tipRect.right - window.innerWidth + 4)}px`;
    });
  }, [text, tooltipContainer]);

  useEffect(() => {
    if (!show) return;
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        hideTip();
      }
    };
    const timer = setTimeout(() => {
      document.addEventListener("touchstart", handleOutside, { passive: true });
      document.addEventListener("mousedown", handleOutside);
    }, 50);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [show, hideTip]);

  // If style is passed, render as the element itself (circle mode)
  // If children are passed, render as a wrapper around children
  if (passedStyle) {
    return (
      <div
        ref={ref}
        onMouseEnter={showTip}
        onMouseLeave={hideTip}
        onTouchStart={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (show) hideTip(); else showTip();
        }}
        style={{ ...passedStyle, cursor: "pointer", touchAction: "manipulation" }}
      />
    );
  }

  return (
    <span
      ref={ref}
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onTouchStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (show) hideTip(); else showTip();
      }}
      style={{ position: "relative", display: "inline-flex", cursor: "pointer", touchAction: "manipulation" }}
    >
      {children}
    </span>
  );
}

// ═══════════════════════════════════════════════════════════════
// CATEGORIES VIEW
// ═══════════════════════════════════════════════════════════════
function CategoriesView({ winners }) {
  // Sort: announced categories first (most recent at top), then unannounced in original order
  const announcedIds = Object.keys(winners);
  const sorted = [
    // Announced: reverse order so most recent is first
    ...announcedIds.slice().reverse().map(id => CATEGORIES.find(c => c.id === id)).filter(Boolean),
    // Unannounced: original order
    ...CATEGORIES.filter(c => !winners[c.id]),
  ];

  return (
    <div style={{ display: "grid", gap: 6 }}>
      {sorted.map(cat => {
        const w = winners[cat.id];
        return (
          <div key={cat.id} style={{
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 10, padding: "12px 16px",
            borderLeft: w ? "3px solid var(--gold)" : "3px solid var(--border)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 15 }}>{cat.emoji}</span>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 15 }}>{cat.name}</span>
              </div>
              {w && <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 8, background: "rgba(201,168,76,.12)", color: "var(--gold)", textTransform: "uppercase", letterSpacing: .5 }}>Winner</span>}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {cat.nominees.map(n => {
                const isWinner = w && n === w;
                return (
                  <span key={n} style={{
                    fontSize: 11, padding: "4px 10px", borderRadius: 6,
                    background: isWinner ? "rgba(201,168,76,.15)" : "var(--surface)",
                    color: isWinner ? "var(--gold-light)" : (w ? "var(--dim)" : "var(--mid)"),
                    fontWeight: isWinner ? 700 : 400,
                    border: isWinner ? "1px solid rgba(201,168,76,.3)" : "1px solid transparent",
                    transition: "all .3s ease",
                  }}>
                    {isWinner && "🏆 "}{n}
                  </span>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// PICKS VIEW — each person's full ballot with correct/wrong markers
// ═══════════════════════════════════════════════════════════════
function PicksView({ winners }) {
  const announced = Object.keys(winners).length;
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {FAMILY.map(member => {
        const isOpen = expanded === member.id;
        let correct = 0;
        CATEGORIES.forEach(cat => {
          if (winners[cat.id] && VOTES[member.id]?.[cat.id] === winners[cat.id]) correct++;
        });

        return (
          <div key={member.id} style={{
            background: "var(--card)", border: "1px solid var(--border)",
            borderRadius: 12, overflow: "hidden",
          }}>
            {/* Header — tap to expand */}
            <div
              onClick={() => setExpanded(isOpen ? null : member.id)}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "14px 16px", cursor: "pointer",
              }}
            >
              <span style={{ fontSize: 24 }}>{member.avatar}</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 17 }}>
                {member.name}
              </span>
              {announced > 0 && (
                <span style={{ marginLeft: "auto", fontSize: 13, color: "var(--mid)" }}>
                  <span style={{ fontWeight: 700, fontSize: 18, color: "var(--text)" }}>{correct}</span>
                  <span style={{ color: "var(--dim)" }}> / {announced} correct</span>
                </span>
              )}
              <span style={{
                color: "var(--dim)", fontSize: 16,
                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform .2s",
                marginLeft: announced > 0 ? 8 : "auto",
              }}>▾</span>
            </div>

            {/* Expanded ballot */}
            {isOpen && (
              <div style={{ padding: "0 16px 14px" }}>
                {CATEGORIES.map(cat => {
                  const pick = VOTES[member.id]?.[cat.id];
                  const w = winners[cat.id];
                  const isCorrect = w && pick === w;
                  const isWrong = w && pick !== w;

                  return (
                    <div key={cat.id} style={{
                      display: "flex", alignItems: "flex-start", gap: 8,
                      padding: "8px 0",
                      borderBottom: "1px solid var(--border)",
                    }}>
                      {/* Category */}
                      <span style={{ fontSize: 13, minWidth: 20, textAlign: "center", flexShrink: 0, paddingTop: 1 }}>
                        {cat.emoji}
                      </span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 11, color: "var(--dim)", marginBottom: 2 }}>{cat.name}</div>
                        <div style={{
                          fontSize: 13,
                          fontWeight: isCorrect ? 700 : 400,
                          color: isCorrect ? "var(--green)" : isWrong ? "var(--red)" : "var(--text)",
                          textDecoration: isWrong ? "line-through" : "none",
                          opacity: isWrong ? 0.6 : 1,
                        }}>
                          {pick || "—"}
                        </div>
                        {isWrong && (
                          <div style={{ fontSize: 11, color: "var(--gold)", marginTop: 2 }}>
                            🏆 {w}
                          </div>
                        )}
                      </div>
                      {/* Status icon */}
                      <span style={{ fontSize: 12, flexShrink: 0, paddingTop: 14 }}>
                        {isCorrect ? "✅" : isWrong ? "❌" : ""}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RACE LANE — single person's track with animated circles
// ═══════════════════════════════════════════════════════════════
function RaceLane({ person, winners, announced, topScore }) {
  const isLeader = person.correct === topScore && person.correct > 0;
  const barPct = topScore > 0 ? (person.correct / topScore) * 100 : 0;
  const trackRef = useRef(null);
  const [trackWidth, setTrackWidth] = useState(0);
  const prevCountRef = useRef(0);

  // Dynamic dot size: fit all circles within the bar with some spacing
  // barPixels is how wide the colored region is
  const barPixels = trackWidth * (barPct / 100);
  const count = person.correct;
  // Each dot needs its width + a minimum gap of 3px between them
  // Solve: count * dotSize + (count - 1) * minGap <= barPixels
  const MIN_GAP = 3;
  const maxDotFromBar = count > 0 ? (barPixels + MIN_GAP) / count - MIN_GAP : 24;
  // Clamp between 8px and 22px
  const DOT = Math.max(8, Math.min(22, Math.floor(maxDotFromBar)));

  // Measure track width
  useEffect(() => {
    if (!trackRef.current) return;
    const measure = () => setTrackWidth(trackRef.current.offsetWidth);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(trackRef.current);
    return () => ro.disconnect();
  }, []);

  // Detect if a new circle was just added
  const isNewDot = person.correct > prevCountRef.current;
  useEffect(() => { prevCountRef.current = person.correct; }, [person.correct]);

  // Calculate pixel positions for each dot within the bar
  const getPos = (i, total) => {
    if (total === 1) return barPixels - DOT / 2; // single dot at right edge
    const usable = barPixels - DOT;
    return Math.max(0, (usable * i) / (total - 1));
  };

  // Track height adapts to dot size
  const trackHeight = DOT + 8;

  return (
    <div style={{
      background: "var(--card)",
      border: "1px solid var(--border)",
      borderRadius: 12, padding: "14px 16px",
      transition: "border-color .4s ease",
    }}>
      {/* Name + score */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 22 }}>{person.avatar}</span>
        <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 17 }}>
          {person.name}
        </span>
        <div style={{ marginLeft: "auto", textAlign: "right" }}>
          <span style={{
            fontSize: 22, fontWeight: 700,
            color: "var(--text)",
          }}>{person.correct}</span>
          <span style={{ fontSize: 11, color: "var(--dim)", fontWeight: 400 }}> / {announced || "—"}</span>
        </div>
      </div>

      {/* Track */}
      <div ref={trackRef} style={{ position: "relative", height: trackHeight, display: "flex", alignItems: "center" }}>
        {/* Background rail */}
        <div style={{
          position: "absolute", left: 0, right: 0, top: "50%", height: 3,
          background: "var(--surface)", borderRadius: 2, transform: "translateY(-50%)",
        }} />

        {/* Colored progress bar */}
        <div style={{
          position: "absolute", left: 0, top: "50%", height: 3,
          width: `${barPct}%`,
          background: person.color, borderRadius: 2, transform: "translateY(-50%)",
          transition: "width .7s cubic-bezier(.25,.1,.25,1)",
          opacity: .55,
        }} />

        {/* Absolutely positioned circles — each transitions its `left` */}
        {trackWidth > 0 && person.correctCats.map((cat, i) => {
          const leftPx = getPos(i, person.correct);
          const isNewest = isNewDot && i === person.correct - 1;

          return (
            <Tooltip key={cat.id} text={`${cat.emoji} ${cat.name} — ${winners[cat.id]}`}
              style={{
                position: "absolute",
                left: leftPx,
                top: "50%",
                width: DOT, height: DOT,
                marginTop: -DOT / 2,
                borderRadius: "50%",
                background: person.color,
                border: "2.5px solid var(--card)",
                cursor: "pointer",
                zIndex: 2,
                transition: isNewest
                  ? "box-shadow .15s ease"
                  : "left .7s cubic-bezier(.25,.1,.25,1), box-shadow .15s ease",
                animation: isNewest ? "popIn .35s cubic-bezier(.34,1.56,.64,1) forwards" : "none",
                transform: isNewest ? "scale(0)" : "scale(1)",
              }}
            />
          );
        })}

        {/* Finish flag */}
        <div style={{
          position: "absolute", right: -2, top: "50%", transform: "translateY(-50%)",
          fontSize: 13, opacity: .2,
        }}>🏁</div>
      </div>

      {/* Accuracy label */}
      {announced > 0 && (
        <div style={{ marginTop: 6, fontSize: 11, color: "var(--dim)" }}>
          {Math.round(announced > 0 ? (person.correct / announced) * 100 : 0)}% accuracy
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RACE VIEW — with FLIP animation for lane reordering
// ═══════════════════════════════════════════════════════════════
function RaceView({ winners }) {
  const announced = Object.keys(winners).length;
  const remaining = TOTAL - announced;
  const announcedIds = Object.keys(winners);

  const raceData = FAMILY.map(m => {
    const correctCats = announcedIds
      .filter(catId => VOTES[m.id]?.[catId] === winners[catId])
      .map(catId => CATEGORIES.find(c => c.id === catId))
      .filter(Boolean);
    // Tiebreak: sum of 1-indexed announcement positions for each correct pick
    // e.g. getting awards #20, #22, #24 right = 66, vs #1, #2, #3 = 6
    const positionSum = correctCats.reduce((sum, cat) => {
      return sum + announcedIds.indexOf(cat.id) + 1;
    }, 0);
    return { ...m, correct: correctCats.length, correctCats, positionSum };
  }).sort((a, b) => b.correct - a.correct || b.positionSum - a.positionSum);

  const topScore = raceData[0]?.correct || 0;

  // FLIP animation: track previous positions of each lane
  const laneRefs = useRef({});
  const prevPositions = useRef({});

  // Before React commits the new render, snapshot current positions
  // We do this in a layout effect so it runs synchronously after DOM mutation
  useEffect(() => {
    // After render: compare new positions to saved ones, animate the delta
    const lanes = laneRefs.current;
    Object.entries(lanes).forEach(([id, el]) => {
      if (!el) return;
      const prev = prevPositions.current[id];
      const curr = el.getBoundingClientRect();
      if (prev && Math.abs(prev.top - curr.top) > 1) {
        const deltaY = prev.top - curr.top;
        // Invert: move to old position
        el.style.transition = "none";
        el.style.transform = `translateY(${deltaY}px)`;
        // Play: animate to new position
        requestAnimationFrame(() => {
          el.style.transition = "transform .5s cubic-bezier(.25,.1,.25,1)";
          el.style.transform = "translateY(0)";
        });
      }
      // Save current position for next time
      prevPositions.current[id] = { top: curr.top };
    });
  });

  // Snapshot positions before re-render
  const snapshotPositions = useCallback(() => {
    const lanes = laneRefs.current;
    Object.entries(lanes).forEach(([id, el]) => {
      if (!el) return;
      prevPositions.current[id] = { top: el.getBoundingClientRect().top };
    });
  }, []);

  // Snapshot before each render by hooking into the sorted data changing
  useEffect(() => {
    snapshotPositions();
  });
  // Also snapshot on winners change (runs before the render with new data triggers layout effect)
  const prevWinnersRef = useRef(winners);
  if (prevWinnersRef.current !== winners) {
    // Synchronous snapshot before React updates DOM
    const lanes = laneRefs.current;
    Object.entries(lanes).forEach(([id, el]) => {
      if (!el) return;
      prevPositions.current[id] = { top: el.getBoundingClientRect().top };
    });
    prevWinnersRef.current = winners;
  }

  const isComplete = announced === TOTAL;

  return (
    <div>
      {/* Status bar */}
      <div style={{
        display: "flex", justifyContent: "center", gap: 24, marginBottom: 28,
        padding: "14px 20px", background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: 10, fontSize: 13,
      }}>
        <div><span style={{ color: "var(--gold)", fontWeight: 700, fontSize: 20 }}>{announced}</span> <span style={{ color: "var(--mid)" }}>announced</span></div>
        <div style={{ width: 1, background: "var(--border)" }} />
        <div><span style={{ color: "var(--mid)", fontWeight: 700, fontSize: 20 }}>{remaining}</span> <span style={{ color: "var(--dim)" }}>remaining</span></div>
      </div>

      {isComplete ? (
        /* ═══ PODIUM VIEW ═══ */
        <div>
          {/* Podium: 2nd, 1st, 3rd in classic layout */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            alignItems: "end",
            marginBottom: 20,
            padding: "0 10px",
          }}>
            {/* 2nd place — left */}
            {raceData[1] && (
              <div style={{
                animation: "riseUp .6s ease .3s both",
              }}>
                <div style={{
                  textAlign: "center", paddingBottom: 12,
                }}>
                  <div style={{ fontSize: 36, marginBottom: 4 }}>{raceData[1].avatar}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 16 }}>{raceData[1].name}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#C0C0C0", marginTop: 2 }}>{raceData[1].correct}<span style={{ fontSize: 11, color: "var(--dim)", fontWeight: 400 }}> / {TOTAL}</span></div>
                </div>
                <div style={{
                  background: "linear-gradient(180deg, #C0C0C0 0%, #8a8a8a 100%)",
                  borderRadius: "10px 10px 0 0",
                  height: 100,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, fontWeight: 800, color: "rgba(0,0,0,.3)",
                  fontFamily: "'Cormorant Garamond',serif",
                }}>2</div>
              </div>
            )}

            {/* 1st place — center, tallest */}
            {raceData[0] && (
              <div style={{
                animation: "riseUp .6s ease .1s both",
              }}>
                <div style={{
                  textAlign: "center", paddingBottom: 12,
                }}>
                  <div style={{ fontSize: 20, marginBottom: -2 }}>👑</div>
                  <div style={{ fontSize: 44, marginBottom: 4 }}>{raceData[0].avatar}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 20 }}>{raceData[0].name}</div>
                  <div style={{
                    fontSize: 24, fontWeight: 700, marginTop: 2,
                    background: "linear-gradient(90deg, #c9a84c, #f0dda0, #c9a84c)",
                    backgroundSize: "200% 100%",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    animation: "shimmer 3s linear infinite",
                  }}>{raceData[0].correct}<span style={{ fontSize: 12, fontWeight: 400, opacity: .6 }}> / {TOTAL}</span></div>
                </div>
                <div style={{
                  background: "linear-gradient(180deg, #D4AF37 0%, #8a7232 100%)",
                  borderRadius: "10px 10px 0 0",
                  height: 140,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 32, fontWeight: 800, color: "rgba(0,0,0,.3)",
                  fontFamily: "'Cormorant Garamond',serif",
                }}>1</div>
              </div>
            )}

            {/* 3rd place — right */}
            {raceData[2] && (
              <div style={{
                animation: "riseUp .6s ease .5s both",
              }}>
                <div style={{
                  textAlign: "center", paddingBottom: 12,
                }}>
                  <div style={{ fontSize: 36, marginBottom: 4 }}>{raceData[2].avatar}</div>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 16 }}>{raceData[2].name}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#CD7F32", marginTop: 2 }}>{raceData[2].correct}<span style={{ fontSize: 11, color: "var(--dim)", fontWeight: 400 }}> / {TOTAL}</span></div>
                </div>
                <div style={{
                  background: "linear-gradient(180deg, #CD7F32 0%, #8B4513 100%)",
                  borderRadius: "10px 10px 0 0",
                  height: 70,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 24, fontWeight: 800, color: "rgba(0,0,0,.3)",
                  fontFamily: "'Cormorant Garamond',serif",
                }}>3</div>
              </div>
            )}
          </div>

          {/* 4th and 5th */}
          {raceData.slice(3).map((person, i) => (
            <div key={person.id} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "12px 16px", marginBottom: 6,
              background: "var(--card)", border: "1px solid var(--border)", borderRadius: 10,
              animation: `fadeUp .4s ease ${0.7 + i * 0.1}s both`,
            }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--dim)", minWidth: 24, textAlign: "center" }}>
                {i + 4}th
              </span>
              <span style={{ fontSize: 24 }}>{person.avatar}</span>
              <span style={{ fontFamily: "'Cormorant Garamond',serif", fontWeight: 700, fontSize: 16 }}>
                {person.name}
              </span>
              <span style={{ marginLeft: "auto", fontSize: 18, fontWeight: 700, color: "var(--mid)" }}>
                {person.correct}
                <span style={{ fontSize: 11, color: "var(--dim)", fontWeight: 400 }}> / {TOTAL}</span>
              </span>
            </div>
          ))}
        </div>
      ) : (
        /* ═══ RACE LANES ═══ */
        <>
          <div style={{ display: "grid", gap: 10 }}>
            {raceData.map((person) => (
              <div
                key={person.id}
                ref={el => { laneRefs.current[person.id] = el; }}
              >
                <RaceLane
                  person={person}
                  winners={winners}
                  announced={announced}
                  topScore={topScore}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("race");
  const [winners, setWinners] = useState({});
  const [fetchOk, setFetchOk] = useState(true);
  const intervalRef = useRef(null);

  const winnersRef = useRef(winners);
  useEffect(() => { winnersRef.current = winners; }, [winners]);

  const doPoll = useCallback(async () => {
    const ts = new Date().toLocaleTimeString();
    console.log(`\n[${ts}] ⏱️  Poll triggered`);
    try {
      const w = await fetchWikipediaWinners();
      const prev = winnersRef.current;
      const prevCount = Object.keys(prev).length;
      const newCount = Object.keys(w).length;
      if (newCount > prevCount) {
        const newKeys = Object.keys(w).filter(k => !prev[k]);
        console.log(`[${ts}] 🆕 NEW WINNERS DETECTED: ${newKeys.map(k => {
          const cat = CATEGORIES.find(c => c.id === k);
          return cat ? `${cat.name}: ${w[k]}` : `${k}: ${w[k]}`;
        }).join(", ")}`);
      } else if (newCount === prevCount && newCount > 0) {
        console.log(`[${ts}] ✅ No change — still ${newCount}/${TOTAL} winners`);
      } else if (newCount === 0) {
        console.log(`[${ts}] ⏳ No winners yet — ceremony may not have started`);
      }
      setWinners(w);
      setFetchOk(true);
    } catch (e) {
      console.error(`[${ts}] ❌ Poll error:`, e.message);
      setFetchOk(false);
    }
  }, []);

  // Fetch on mount, then poll every 30 seconds
  useEffect(() => {
    validatePicksAgainstWikipedia(); // one-time startup check
    doPoll();
    intervalRef.current = setInterval(doPoll, 5000);
    return () => clearInterval(intervalRef.current);
  }, [doPoll]);

  // Dismiss tooltips during layout shifts
  useEffect(() => {
    dismissAllTooltips();
  }, [winners]);

  const announced = Object.keys(winners).length;

  return (
    <div style={{ maxWidth: 880, margin: "0 auto", padding: "20px 16px 40px" }}>
      {/* Header */}
      <header style={{ textAlign: "center", padding: "44px 0 36px", position: "relative" }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',serif", fontWeight: 700,
          fontSize: "clamp(30px, 7vw, 48px)", letterSpacing: -1,
          color: "var(--gold-light)", lineHeight: 1.1,
        }}>
          Oscar Night 2026
        </h1>
        <div style={{ marginTop: 8, fontSize: 11, letterSpacing: 4, textTransform: "uppercase", color: "var(--mid)", fontWeight: 500 }}>
          Family Predictions
        </div>
        {announced > 0 && announced < TOTAL ? (
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6, marginTop: 14,
            padding: "5px 16px", border: "1px solid var(--red)", borderRadius: 20,
            fontSize: 11, color: "var(--red)", fontWeight: 600, letterSpacing: 1.5,
            textTransform: "uppercase",
          }}>
            <span style={{ width: 7, height: 7, background: "var(--red)", borderRadius: "50%", animation: "pulse 1.5s ease infinite" }} />
            LIVE
          </div>
        ) : announced === TOTAL ? (
          <div style={{ marginTop: 14, fontSize: 12, color: "var(--gold)", fontWeight: 600, letterSpacing: 1 }}>
            🏆 Final Results
          </div>
        ) : (
          <div style={{ marginTop: 14, fontSize: 12, color: "var(--dim)", letterSpacing: 1 }}>
            Waiting for the ceremony to begin...
          </div>
        )}
        {!fetchOk && (
          <div style={{ marginTop: 6, fontSize: 10, color: "#aa8800", letterSpacing: 1 }}>
            connection issue — retrying...
          </div>
        )}
        <div style={{
          position: "absolute", bottom: 0, left: "15%", right: "15%", height: 1,
          background: "linear-gradient(90deg, transparent, var(--gold-dim), transparent)",
        }} />
      </header>

      {/* Tabs */}
      <div style={{ display: "flex", justifyContent: "center", gap: 4, margin: "24px 0 20px" }}>
        {[["race", "🏁 Race"], ["categories", "📋 Categories"], ["picks", "👥 Picks"]].map(([key, label]) => (
          <button key={key} onClick={() => setTab(key)} style={{
            padding: "8px 20px", borderRadius: 8, fontSize: 13, fontWeight: 600,
            cursor: "pointer", border: tab === key ? "1px solid var(--gold-dim)" : "1px solid transparent",
            background: tab === key ? "var(--card)" : "transparent",
            color: tab === key ? "var(--gold)" : "var(--mid)",
            fontFamily: "'Outfit',sans-serif", transition: "all .2s",
          }}>
            {label}
          </button>
        ))}
      </div>

      {/* Content */}
      {tab === "race" ? <RaceView winners={winners} /> : tab === "categories" ? <CategoriesView winners={winners} /> : <PicksView winners={winners} />}
    </div>
  );
}