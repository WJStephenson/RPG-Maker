import { rollDice } from "./dice.js";
import { updateSkillValues } from "./skills.js";

const inputElements = document.querySelectorAll(".stat input");

// Function to generate random stats and roll dice
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

// Function to update modifier values based on random dice rolls
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

// Function to calculate and return modifier values
function calculateModifier(statValue) {
  return Math.floor((statValue - 10) / 2);
}

// Function to update health value based on user level, hit die and constitution
export function updateHealth() {
  const level = document.getElementById("level").value;
  const hitDie = document.getElementById("hit-die");
  const constitution = document.getElementById("constitution").value;
  const health = document.getElementById("health");
  const hitDieValue = parseInt(hitDie.innerHTML);
  const constitutionModifier = Math.floor((constitution - 10) / 2);
  let healthTotal = hitDieValue + constitutionModifier;
  for (let i = 1; i < level; i++) {
      const healthValue = hitDieValue + constitutionModifier;
      healthTotal += healthValue;
  }
  health.value = healthTotal;
}

// Function to update Proficiency Bonus based on user level
export function updateProficiency() {
  const level = document.getElementById("level").value;
  const proficiency = document.getElementById("proficiency");
  proficiency.innerHTML = `+${Math.ceil(level / 4) + 1}`;
}



