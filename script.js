// ===============================
// CONFIG
// ===============================

// Gamemodes for tabs
const GAMEMODES = [
  { id: "vanilla-pvp", name: "Vanilla PvP" },
  { id: "mace-pvp", name: "Mace PvP" },
  { id: "axe-pvp", name: "Axe PvP" },
  { id: "sword-pvp", name: "Sword PvP" },
  { id: "smp", name: "SMP" },
  { id: "diamond-smp", name: "Diamond SMP" },
  { id: "uhc", name: "UHC" },
  { id: "pot-pvp", name: "Pot PvP" },
  { id: "neth-op", name: "Neth OP" }
];

// Tier order top → bottom
const TIER_ORDER = [
  "HT1", "LT1",
  "HT2", "LT2",
  "HT3", "LT3",
  "HT4", "LT4",
  "HT5", "LT5"
];

// 🔗 Your live API endpoint that returns tiers JSON:
const TIERS_URL = "https://eagler-tiers-api.onrender.com/tiers"; // change if your URL is different

// Will be filled by API response
let TIER_DATA = {};

// ===============================
// DOM ELEMENTS
// ===============================

const tabsRoot = document.getElementById("gamemodeTabs");
const tiersRoot = document.getElementById("tiersContainer");

// ===============================
// DATA LOADING
// ===============================

async function loadTiers() {
  const res = await fetch(TIERS_URL);
  if (!res.ok) {
    throw new Error("Failed to load tiers: HTTP " + res.status);
  }
  TIER_DATA = await res.json();
}

// ===============================
// RENDER TABS
// ===============================

function renderTabs(activeId) {
  tabsRoot.innerHTML = "";

  GAMEMODES.forEach(gm => {
    const btn = document.createElement("button");
    btn.className = "gamemode-tab";
    if (gm.id === activeId) btn.classList.add("active");
    btn.textContent = gm.name;

    btn.addEventListener("click", () => {
      renderTabs(gm.id);
      renderGamemode(gm.id);
    });

    tabsRoot.appendChild(btn);
  });
}

// ===============================
// RENDER A SINGLE GAMEMODE
// ===============================

function renderGamemode(gamemodeId) {
  const gmData = TIER_DATA[gamemodeId];
  tiersRoot.innerHTML = "";

  if (!gmData) {
    tiersRoot.textContent = "No data for this gamemode yet.";
    return;
  }

  TIER_ORDER.forEach(tierName => {
    const row = document.createElement("div");
    row.className = "tier-row";

    // side label (HT1 / LT1 etc.)
    const label = document.createElement("div");
    label.className = "tier-label";

    const main = document.createElement("div");
    main.className = "tier-label-main";
    main.textContent = tierName;

    const sub = document.createElement("div");
    sub.className = "tier-label-sub";
    sub.textContent = tierName.startsWith("HT")
      ? "Higher " + tierName.slice(2)
      : "Lower " + tierName.slice(2);

    label.appendChild(main);
    label.appendChild(sub);

    const itemsWrap = document.createElement("div");
    itemsWrap.className = "tier-items";

    const list = gmData[tierName] || [];

    if (list.length === 0) {
      const hint = document.createElement("span");
      hint.style.fontSize = "0.8rem";
      hint.style.color = "var(--text-muted, #6b7280)";
      hint.textContent = "No players in this tier yet.";
      itemsWrap.appendChild(hint);
    } else {
      list.forEach(entry => {
        const pill = document.createElement("div");
        pill.className = "tier-item";

        const nameEl = document.createElement("div");
        nameEl.className = "tier-item-name";
        nameEl.textContent = entry.name;

        // Tooltip with last updated info (shown only on hover)
        if (entry.lastModifiedBy) {
          let prettyDate = "";
          if (entry.lastModifiedAt) {
            try {
              const d = new Date(entry.lastModifiedAt);
              prettyDate = d.toLocaleString();
            } catch {
              // ignore parse errors
            }
          }

          let tooltip = `Last updated by ${entry.lastModifiedBy}`;
          if (prettyDate) {
            tooltip += ` on ${prettyDate}`;
          }

          // Use browser's native tooltip
          pill.title = tooltip;
        }

        pill.appendChild(nameEl);
        itemsWrap.appendChild(pill);
      });
    }

    row.appendChild(label);
    row.appendChild(itemsWrap);
    tiersRoot.appendChild(row);
  });
}

// ===============================
// INIT
// ===============================

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await loadTiers();
    const defaultId = GAMEMODES[0].id; // Vanilla PvP
    renderTabs(defaultId);
    renderGamemode(defaultId);
  } catch (err) {
    console.error(err);
    tiersRoot.textContent = "Failed to load tier data from the server.";
  }
});
