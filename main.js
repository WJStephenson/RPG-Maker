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
const saveButton = document.getElementById("save-button");

class Character {
  constructor(name, level, strength, dexterity, constitution, intelligence, wisdom, charisma, race, _class, item1, item2, item3, item4, item5) {
    this.name = name;
    this.level = level;
    this.strength = strength;
    this.dexterity = dexterity;
    this.constitution = constitution;
    this.intelligence = intelligence;
    this.wisdom = wisdom;
    this.charisma = charisma;
    this.race = race;
    this._class = _class;
    this.item1 = item1;
    this.item2 = item2;
    this.item3 = item3;
    this.item4 = item4;
    this.item5 = item5;
  }
}

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

saveButton.addEventListener("click", () => {
  saveCharacter();
  const saveMessage = document.getElementById("save-message");
  saveMessage.innerHTML = "Character saved!";
});



function saveCharacter() {
  const name = document.getElementById("character-name").value;
  if (name === "") {
    alert("Please enter a name for your character.");
    return;
  }
  if (localStorage.getItem(name) !== null) {
    alert("A character with that name already exists. Please choose a different name.");
    return;
  }
  const level = document.getElementById("level").value;
  const strength = document.getElementById("strength").value;
  const dexterity = document.getElementById("dexterity").value;
  const constitution = document.getElementById("constitution").value;
  const intelligence = document.getElementById("intelligence").value;
  const wisdom = document.getElementById("wisdom").value;
  const charisma = document.getElementById("charisma").value;
  const race = raceSelect.value;
  const _class = classSelect.value;

  const character = new Character(name, level, strength, dexterity, constitution, intelligence, wisdom, charisma, race, _class, "", "", "", "", "");

  localStorage.setItem(name, JSON.stringify(character));
}

window.onload = function () {
  getUrlParameters();
}

function getUrlParameters() {
  const myUrl = new URL(window.location.toLocaleString());
  const characterName = myUrl.searchParams.get("characterName");
  if (characterName !== null) {
    loadCharacter(characterName);
  }
}

function loadCharacter(characterName) {
  const character = JSON.parse(localStorage.getItem(characterName));

  let name = document.getElementById("character-name");
  let level = document.getElementById("level");
  let strength = document.getElementById("strength");
  let dexterity = document.getElementById("dexterity");
  let constitution = document.getElementById("constitution");
  let intelligence = document.getElementById("intelligence");
  let wisdom = document.getElementById("wisdom");
  let charisma = document.getElementById("charisma");
  let race = raceSelect;
  let _class = classSelect;

  name.value = character.name;
  level.value = character.level;
  strength.value = character.strength;
  dexterity.value = character.dexterity;
  constitution.value = character.constitution;
  intelligence.value = character.intelligence;
  wisdom.value = character.wisdom;
  charisma.value = character.charisma;
  race.value = character.race;
  _class.value = character._class;
  getClassInfo(_class.value);
  getRaceInfo(race.value);
}
