import { rollDice, clearRolls } from "./dice.js";
import { updateStatPoints, inputElements } from "./stats.js";
import { getRaceInfo } from "./race.js";
import { generateRandomName } from "./name.js";
import { getClassInfo } from "./class.js";
import { clearOptions, getSpells } from "./spells.js";

const rollButton = document.getElementById('roll-dice');
const clearButton = document.getElementById('clear-rolls');
const raceSelect = document.getElementById('race-selection');
export const classSelect = document.getElementById('class-selection');
const randomButton = document.getElementById("random-name");
const level = document.getElementById("level");

classSelect.addEventListener('change', () => {
    getClassInfo(classSelect.value);
    clearOptions();
    getSpells(level.value, classSelect.value);
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

randomButton.addEventListener("click", () => {
  generateRandomName();
});

inputElements.forEach((input) => {
  input.addEventListener("input", (event) => {
    updateStatPoints(event.target);
  });
});