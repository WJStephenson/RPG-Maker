import { rollDice, clearRolls } from "./modules/dice.js";
import { generateRandomStats, updateModifierValues, updateHealth, updateProficiency } from "./modules/stats.js";
import { getRaceInfo } from "./modules/race.js";
import { generateRandomName } from "./modules/name.js";
import { getClassInfo } from "./modules/class.js";
import { updateSpells } from "./modules/spells.js";
import { getEquipmentInfo, updateAC } from "./modules/equipment.js";
import { getUrlParameters, saveCharacter } from "./modules/memory.js";

const rollButton = document.getElementById('roll-dice');
const clearButton = document.getElementById('clear-rolls');
export const raceSelect = document.getElementById('race-selection');
export const classSelect = document.getElementById('class-selection');
const randomNameButton = document.getElementById("random-name");
const randomStatsButton = document.getElementById("random-stats");
const level = document.getElementById("level");
const closeButton = document.getElementById("close-button");
const saveButton = document.getElementById("save-button");
const statInputs = document.querySelectorAll(".stat input");



statInputs.forEach((input) => {
  input.addEventListener('change', () => {
    updateModifierValues();
    updateHealth();
    updateAC();
  });
});

classSelect.addEventListener('change', () => {
  getEquipmentInfo(classSelect.value);
  getClassInfo(classSelect.value);
  updateSpells(level.value, classSelect.value);
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
  updateHealth();
  updateAC();
});

level.addEventListener('input', () => {
  updateSpells(level.value, classSelect.value);
  updateHealth();
  updateProficiency();
});

closeButton.addEventListener("click", () => {
  const popupContainer = document.getElementById("popup-container");
  const overlay = document.getElementById("popup-overlay");
  popupContainer.style.display = "none";
  overlay.style.display = "none";
});

saveButton.addEventListener("click", () => {
  saveCharacter();
  const saveMessage = document.getElementById("save-message");
  saveMessage.innerHTML = "Character saved!";
});

window.onload = function () {
  getUrlParameters();
}


