const name = document.getElementById("character-name");
const randomButton = document.getElementById("random-name");
randomButton.addEventListener("click", () => {
  generateRandomName();
});

export function generateRandomName() {
    fetch(`https://chartopia.d12dev.com/api/charts/19/roll/`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      })
    .then((response) => response.json())
    .then((data) => {
        const result = data.results[0];
        name.value = result.charAt(0).toUpperCase() + result.slice(1);;
    })
    .catch((error) => {console.log(error);});
}