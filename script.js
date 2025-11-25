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

// Tiers order top → bottom
const TIER_ORDER = [
  "HT1", "LT1",
  "HT2", "LT2",
  "HT3", "LT3",
  "HT4", "LT4",
  "HT5", "LT5"
];

// ===============================
// TIER DATA (EDIT THIS PART)
// ===============================
//
// Each gamemode has its own block.
// Each tier is an array of { name: "PlayerName" }.
// Add/remove players by editing these arrays.
//

const TIER_DATA = {
  "vanilla-pvp": {
    HT1: [{ name: "Starified" }],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: [
  { name: "Volltrex" },
  { name: "AnotherGuy" }
  ],
},

  "mace-pvp": {
    HT1: [{ name: "Starified" }],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: []
  },

  "axe-pvp": {
    HT1: [{ name: "Starified" }],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: []
  },

  "sword-pvp": {
    HT1: [{ name: "Starified" }],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: []
  },

  "smp": {
    HT1: [{ name: "Starified" }],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: []
  },

  "diamond-smp": {
    HT1: [{ name: "Starified" }],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: []
  },

  "uhc": {
    HT1: [{ name: "Starified" }],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: []
  },

  "pot-pvp": {
    HT1: [{ name: "Starified" }],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: []
  },

  "neth-op": {
    HT1: [{ name: "Starified" }],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: [],
    LT4: [],
    HT5: [],
    LT5: []
  }
};


// ===============================
// RENDER LOGIC
// ===============================

const tabsRoot = document.getElementById("gamemodeTabs");
const tiersRoot = document.getElementById("tiersContainer");

// Create gamemode tabs at top
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

// Create all tier rows for a given gamemode
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

    // HT = stronger shading, LT = softer
    if (tierName.startsWith("HT")) row.classList.add("ht");
    else row.classList.add("lt");

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
      hint.style.fontSize = "0.7rem";
      hint.style.color = "var(--text-muted)";
      hint.textContent = "No players in this tier yet.";
      itemsWrap.appendChild(hint);
    } else {
      list.forEach(entry => {
        const pill = document.createElement("div");
        pill.className = "tier-item";

        const name = document.createElement("div");
        name.className = "tier-item-name";
        name.textContent = entry.name;

        pill.appendChild(name);
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

document.addEventListener("DOMContentLoaded", () => {
  const defaultId = GAMEMODES[0].id;
  renderTabs(defaultId);
  renderGamemode(defaultId);
});
