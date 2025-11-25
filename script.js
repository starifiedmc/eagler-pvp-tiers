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

// This is where you put your players/icons.
// Each gamemode has an object of tiers.
// Each tier is an array of { name, img } items.
//
// 1) Put all your 256x256 PNGs into the "images" folder in your repo.
// 2) Set img: "images/your-file.png"
// 3) Name can be the player's IGN or whatever you want to display.

const TIER_DATA = {
  "vanilla-pvp": {
    HT1: [
      // Example:
      // { name: "Player1", img: "images/vanilla_player1.png" }
    ],
    LT1: [],
    HT2: [],
    LT2: [],
    HT3: [],
    LT3: [],
    HT4: []
