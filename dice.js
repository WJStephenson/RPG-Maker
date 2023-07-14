const diceResultContainer = document.getElementById("dice-result");
const clearButton = document.getElementById("clear-rolls");

export function rollDice() {
  const diceQuantity = document.getElementById("dice-quantity").value;
  const diceType = document.getElementById("dice-select").value;
  const addition = document.getElementById("dice-addition").value;
  const resultDiv = document.createElement("div");
  const resultInfo = document.createElement("span");
  const diceResult = document.createElement("p");
  let total = 0;
  let color = colorSelector();

  clearButton.style.display = "block";
  diceResultContainer.style.display = "block";

  if (diceQuantity == 1) {
    resultInfo.innerHTML = "Roll: ";
  } else {
    resultInfo.innerHTML = "Rolls: ";
  }

  for (let i = 0; i < diceQuantity; i++) {

    const diceRoll = Math.floor(Math.random() * diceType) + 1;
    resultInfo.innerHTML += "<br>" + (i + 1) + ": " + diceRoll;
    total += diceRoll;
  }
  resultDiv.id = "result-div";
  resultDiv.appendChild(resultInfo);
  resultDiv.appendChild(diceResult);
  resultDiv.style.backgroundColor = color;
  resultInfo.classList.add("popup");
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
}

export function clearRolls() {
  console.log("clearing rolls");
  while (diceResultContainer.firstChild) {
    diceResultContainer.removeChild(diceResultContainer.firstChild);
  }
  clearButton.style.display = "none";
  diceResultContainer.style.display = "none";
}

let currentColor = 0;

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
