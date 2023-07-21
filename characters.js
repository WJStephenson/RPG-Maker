const container = document.querySelector(".saved-characters-container");
const health = document.getElementById("health");

window.onload = function() {
    for (let i = 0; i < localStorage.length; i++){
        const characters = localStorage.getItem(localStorage.key(i));
        const character = JSON.parse(characters);
        console.log(character);
        const characterName = character.name;
        const characterLevel = character.level;
        const characterClass = character._class;
        const characterRace = character.race;
        const characterContainer = document.createElement("div");
        characterContainer.classList.add("character");
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
        
        characterContainer.innerHTML += `<div class="character-info">${characterName.charAt(0).toUpperCase() + characterName.slice(1)} is a level ${characterLevel} ${characterClass.charAt(0).toUpperCase() + characterClass.slice(1)} ${characterRace.charAt(0).toUpperCase() + characterRace.slice(1)}</div>`;
        characterContainer.appendChild(loadButton);
        characterContainer.appendChild(deleteButton);
        container.appendChild(characterContainer);
    }
};

function deleteCharacter(characterName) {
    console.log(characterName);
    localStorage.removeItem(characterName);
    location.reload();
}

function loadCharacter(character) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("characterName", character.name);

    window.open(`index.html?${urlParams.toString()}`, "_self");
}

export function calculateHealth() {
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

export function calculateProficiency() {
    const level = document.getElementById("level").value;
    const proficiency = document.getElementById("proficiency");
    proficiency.innerHTML = `+${Math.ceil(level / 4) + 1}`;
}

function setArmorClass(armorClass) {
    const armorClassStat = document.getElementById("armor-class");
    armorClassStat.innerHTML = armorClass;
}