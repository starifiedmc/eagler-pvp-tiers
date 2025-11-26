// CHANGE THIS TO YOUR REAL API URL
const API_URL = "https://eagler-tiers-api.onrender.com/tiers";

let TIER_DATA = {};
let currentGamemode = "vanilla-pvp";

// All gamemodes
const GAMEMODES = [
    "vanilla-pvp", "mace-pvp", "axe-pvp", "sword-pvp", "smp", "diamond-smp",
    "uhc", "pot-pvp", "neth-op"
];

// Build gamemode buttons
const gamemodeButtons = document.getElementById("gamemodeButtons");
GAMEMODES.forEach(mode => {
    const btn = document.createElement("div");
    btn.className = "gamemode-btn";
    if (mode === currentGamemode) btn.classList.add("active");
    btn.textContent = mode.replace("-", " ").toUpperCase();

    btn.onclick = () => {
        document.querySelectorAll(".gamemode-btn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentGamemode = mode;
        renderTiers();
    };

    gamemodeButtons.appendChild(btn);
});

// Fetch data from API
async function loadTiers() {
    try {
        const response = await fetch(API_URL);
        TIER_DATA = await response.json();
        renderTiers();
    } catch (err) {
        document.getElementById("tiers").innerHTML = "<p>Failed to load data.</p>";
        console.error(err);
    }
}

// Render tiers to website
function renderTiers() {
    const container = document.getElementById("tiers");
    container.innerHTML = "";

    const modeData = TIER_DATA[currentGamemode];
    if (!modeData) {
        container.innerHTML = "<p>No data for this gamemode.</p>";
        return;
    }

    const TIERS = ["HT1", "LT1", "HT2", "LT2", "HT3", "LT3", "HT4", "LT4", "HT5", "LT5"];

    TIERS.forEach(tier => {
        const row = document.createElement("div");
        row.className = "tier-row";

        const title = document.createElement("div");
        title.className = "tier-title";
        title.textContent = tier;

        row.appendChild(title);

        const players = modeData[tier] || [];

        if (players.length === 0) {
            row.innerHTML += "<div>No players in this tier yet.</div>";
        } else {
            players.forEach(player => {
                const badge = document.createElement("span");
                badge.className = "player-badge";

                badge.textContent = player.name;

                // Tooltip with last update info
                badge.setAttribute(
                    "data-tooltip",
                    `Last updated by ${player.updatedBy}\n${player.updatedAt}`
                );

                row.appendChild(badge);
            });
        }

        container.appendChild(row);
    });
}

loadTiers();
