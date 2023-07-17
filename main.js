import { rollDice, clearRolls } from "./modules/dice.js";
import { generateRandomStats } from "./modules/stats.js";
import { getRaceInfo } from "./modules/race.js";
import { generateRandomName } from "./modules/name.js";
import { getClassInfo } from "./modules/class.js";
import { clearOptions } from "./modules/spells.js";
import { getEquipmentInfo } from "./modules/equipment.js";

const rollButton = document.getElementById('roll-dice');
const clearButton = document.getElementById('clear-rolls');
const raceSelect = document.getElementById('race-selection');
export const classSelect = document.getElementById('class-selection');
const randomNameButton = document.getElementById("random-name");
const randomStatsButton = document.getElementById("random-stats");
const level = document.getElementById("level");
const closeButton = document.getElementById("close-button");

classSelect.addEventListener('change', () => {
    getEquipmentInfo(classSelect.value);
    getClassInfo(classSelect.value);
    clearOptions();
});

raceSelect.addEventListener('change', () => {
    getRaceInfo(raceSelect.value);
});

rollButton.addEventListener('click', () => {
    rollDice();
});

clearButton.addEventListener('click', () => {
    clearRolls();
});

randomNameButton.addEventListener("click", () => {
  generateRandomName();
});

randomStatsButton.addEventListener("click", () => {
  generateRandomStats();
});

level.addEventListener('input', () => {
    clearOptions();
});

closeButton.addEventListener("click", () => {
  const popupContainer = document.getElementById("popup-container");
  const overlay = document.getElementById("popup-overlay");
  popupContainer.style.display = "none";
  overlay.style.display = "none";
});

function preventUpDown(event) {
  event.preventDefault();
}

function preventScroll(event) {
  event.preventDefault();
}