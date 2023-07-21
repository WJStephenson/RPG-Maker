import { rollDice } from "./dice.js";
import { updateSkillValues } from "./skills.js";
import { armorAC } from "./equipment.js";

const inputElements = document.querySelectorAll(".stat input");

export function generateRandomStats() {
  const statValues = [];
  inputElements.forEach((input) => {
    input.value = "";
  });
  for (let i = 0; i < inputElements.length; i++) {
    const statRolls = rollDice(true);
    const lowestRoll = Math.min(...statRolls);
    const statValue = statRolls.reduce((a, b) => a + b, 0) - lowestRoll;
    statValues.push(statValue);
  };
  for (let i = 0; i < inputElements.length; i++) {
    inputElements[i].value = statValues[i];
  }
  updateModifierValues();
};

export function updateModifierValues() {
  const modifierElements = document.querySelectorAll(".stat p");
  modifierElements.forEach((modifierElement) => {
    const statValue = parseInt(modifierElement.previousElementSibling.value);
    if (calculateModifier(statValue) >= 0) {
      modifierElement.innerHTML = `+ ${calculateModifier(statValue)}`;
    } else {
      modifierElement.innerHTML = `${calculateModifier(statValue)}`;
    }
  });
  updateSkillValues(modifierElements[0].innerHTML, modifierElements[1].innerHTML, modifierElements[3].innerHTML, modifierElements[4].innerHTML, modifierElements[5].innerHTML);
}


function calculateModifier(statValue) {
  return Math.floor((statValue - 10) / 2);
}

