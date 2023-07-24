const diceResultContainer = document.getElementById("dice-result");
const clearButton = document.getElementById("clear-rolls");

//   function to generate random dice rolls
export function rollDice(forStats = false) {
  let diceQuantity = document.getElementById("dice-quantity").value;
  let diceType = document.getElementById("dice-select").value;
  let addition = document.getElementById("dice-addition").value;
  const resultDiv = document.createElement("div");
  const resultInfo = document.createElement("span");
  const diceResult = document.createElement("p");
  let total = 0;
  let color = colorSelector();
  const statRolls = [];

  if (forStats) {
    diceQuantity = 4;
    diceType = 6;
    addition = 0;
    const diceQ = document.querySelector('option[value="6"]');
    diceQ.selected = true;
    const diceT = document.getElementById("dice-quantity");
    diceT.value = 4;
    const diceA = document.getElementById("dice-addition");
    diceA.value = 0;
  }

  clearButton.style.display = "block";

  for (let i = 0; i < diceQuantity; i++) {

    const diceRoll = Math.floor(Math.random() * diceType) + 1;
    resultInfo.innerHTML += "<br>" + (i + 1) + ": " + diceRoll;
    total += diceRoll;
    statRolls.push(diceRoll);
  }
  resultDiv.id = "result-div";
  resultDiv.appendChild(resultInfo);
  resultDiv.appendChild(diceResult);
  diceResultContainer.insertBefore(resultDiv, diceResultContainer.firstChild);
  if (addition != 0) {
    if (addition > 0) {
      diceResult.innerHTML = total + " + " + parseInt(addition) + " = " + (total + parseInt(addition));
    } else {
      diceResult.innerHTML = total + "" + parseInt(addition) + " = " + (total + parseInt(addition));
    }
  } else {
    diceResult.innerHTML = total;
  }
  return statRolls;
}

//   function to clear dice rolls
export function clearRolls() {
  console.log("clearing rolls");
  while (diceResultContainer.firstChild) {
    diceResultContainer.removeChild(diceResultContainer.firstChild);
  }
  clearButton.style.display = "none";
}

let currentColor = 0;

//   function to select color for dice rolls to differentiate between rolls
function colorSelector() {
  switch (currentColor) {
    case 0:
      currentColor = 1;
      return "#eeeeee";
    case 1:
      currentColor = 2;
      return "#dddddd";
    case 2:
      currentColor = 3;
      return "#cccccc";
    case 3:
      currentColor = 4;
      return "#bbbbbb";
    case 4:
      currentColor = 0;
      return "#a3a3a3";
  }
}
