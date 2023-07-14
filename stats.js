export const inputElements = document.querySelectorAll(".stat input");
let totalPoints = 0;
const maxPoints = 40;


// Add event listeners to each input element
inputElements.forEach((input) => {
  input.addEventListener("input", (event) => {
    updateStatPoints(event.target);
  });
});

export function updateStatPoints(input) {
  const value = parseInt(input.value);
  const maxValue = parseInt(input.max);

  // Check if the new value exceeds the maximum value
  if (value > maxValue) {
    input.value = maxValue;
  }

  // Calculate the total points
  totalPoints = 0;
  inputElements.forEach(function (input) {
    totalPoints += parseInt(input.value);
  });

  // Check if the total points exceed 40
  if (totalPoints > maxPoints) {
    // Calculate the remaining points
    const remainingPoints = maxPoints - (totalPoints - value);

    // Set the value of the input to the remaining points
    input.value = remainingPoints;
    totalPoints = maxPoints;
  }

  // Update the total points display
  document.getElementById("stat-points").textContent = `Points: ${
    maxPoints - totalPoints
  }`;
}

updateStatPoints(inputElements[0]);


