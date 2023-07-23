import { updateModifierValues, updateHealth, updateProficiency } from "./stats.js";
import { getRaceInfo } from "./race.js";
import { getClassInfo } from "./class.js";
import { updateSpells } from "./spells.js";
import { getEquipmentInfo, updateAC } from "./equipment.js";
import { raceSelect, classSelect } from "../main.js";

let characterSpellsArray = [];
let characterEquipmentSelected = [];
let characterEquipmentOptions = [];

class Character {
    constructor(name, level, spells, strength, dexterity, constitution, intelligence, wisdom, charisma, race, _class, equipSelection, equipOptions) {
        this.name = name;
        this.level = level;
        this.spells = spells;
        this.strength = strength;
        this.dexterity = dexterity;
        this.constitution = constitution;
        this.intelligence = intelligence;
        this.wisdom = wisdom;
        this.charisma = charisma;
        this.race = race;
        this._class = _class;
        this.equipSelection = equipSelection;
        this.equipOptions = equipOptions;
    }
}

export function getUrlParameters() {
    const myUrl = new URL(window.location.toLocaleString());
    const characterName = myUrl.searchParams.get("characterName");
    if (characterName !== null) {
        loadCharacter(characterName);
    }
}

async function loadCharacter(characterName) {
    const character = JSON.parse(localStorage.getItem(characterName));
    console.log(character);

    characterSpellsArray = [];
    characterEquipmentSelected = [];
    characterEquipmentOptions = [];

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
    characterSpellsArray = character.spells;
    characterEquipmentSelected = character.equipSelection;
    characterEquipmentOptions = character.equipOptions;
    getRaceInfo(race.value);
    getClassInfo(_class.value);
    getEquipmentInfo(_class.value);
    updateModifierValues();
    updateHealth();
    updateAC();
    updateProficiency();

    updateSpells(level.value, _class.value);
}

export function loadEquipment() {
    const equipmentSelected = document.querySelectorAll("input[type='radio']");
    const equipmentOptions = document.querySelectorAll(".equipment-div select");
    console.log(equipmentSelected);
    console.log(characterEquipmentSelected);
    console.log(equipmentOptions);
    console.log(characterEquipmentOptions);
    equipmentSelected.forEach((item, index) => {
        item.checked = characterEquipmentSelected[index];
    });
    equipmentOptions.forEach((item, index) => {
        console.log(item.value);
        item.value = characterEquipmentOptions[index];
    });
}

export function loadSpells() {
    const spellInputs = document.querySelectorAll(".spell-list");
    spellInputs.forEach((spell, index) => {
        spell.value = characterSpellsArray[index];
    });
}

export function saveCharacter() {
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

    const spellsArray = [];
    const spells = document.querySelectorAll(".spell-list");

    spells.forEach(spell => {
        spellsArray.push(spell.value);
    });

    const equipmentSelectedArray = [];
    const equipment = document.querySelectorAll(".equipment-div input");
    equipment.forEach(item => {
        equipmentSelectedArray.push(item.checked);
    });

    const equipmentOptionsArray = [];
    const equipmentOptions = document.querySelectorAll(".equipment-div select");
    equipmentOptions.forEach(item => {
        equipmentOptionsArray.push(item.value);
    });

    const character = new Character(name, level, spellsArray, strength, dexterity, constitution, intelligence, wisdom, charisma, race, _class, equipmentSelectedArray, equipmentOptionsArray);
    localStorage.setItem(name, JSON.stringify(character));
}