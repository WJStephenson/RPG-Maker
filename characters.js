const container = document.querySelector(".saved-characters-container");
const health = document.getElementById("health");

// On page load get all saved characters from local storage and display them
window.onload = function () {
    for (let i = 0; i < localStorage.length; i++) {
        const characters = localStorage.getItem(localStorage.key(i));
        const character = JSON.parse(characters);
        console.log(character);
        const characterName = character.name;
        const characterLevel = character.level;
        const characterClass = character._class;
        const characterRace = character.race;
        const characterContainer = document.createElement("div");
        const characterP = document.createElement("p");
        characterContainer.classList.add("character");
        const buttonContainer = document.createElement("div");
        const loadButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        loadButton.innerHTML = "Load";
        deleteButton.innerHTML = "Delete";
        loadButton.addEventListener("click", () => {
            loadCharacter(character);
        });
        deleteButton.addEventListener("click", () => {
            console.log(`Deleting`)
            deleteCharacter(character.name);
        });

        characterP.innerHTML += `<div class="character-info">${characterName.charAt(0).toUpperCase() + characterName.slice(1)} is a level ${characterLevel} ${characterClass.charAt(0).toUpperCase() + characterClass.slice(1)} ${characterRace.charAt(0).toUpperCase() + characterRace.slice(1)}</div>`;


        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(loadButton);
        characterContainer.appendChild(buttonContainer);
        characterContainer.appendChild(characterP);
        container.appendChild(characterContainer);
    }
};

// Function to delete character from local storage
function deleteCharacter(characterName) {
    console.log(characterName);
    localStorage.removeItem(characterName);
    location.reload();
}

// Function to load character from local storage
function loadCharacter(character) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("characterName", character.name);

    window.open(`index.html?${urlParams.toString()}`, "_self");
}