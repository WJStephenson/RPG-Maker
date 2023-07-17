import { rollDice } from "./dice.js";

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
};


