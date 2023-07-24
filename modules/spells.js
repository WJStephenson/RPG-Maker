
import { classSelect } from "../main.js";
import { loadSpells } from "./memory.js";

const infoIcon = `<i class="fa-solid fa-wand-sparkles"></i>`;
const spellsContainer = document.querySelector(".spell-container");

// Function to get spell info from API based on user selected class and level
export async function updateSpells(level, className) {
    clearOptions();
    fetch(`https://www.dnd5eapi.co/api/classes/${className}/levels/${level}`)
        .then(response => response.json())
        .then(data => {
            createSpellList(classSelect.value, getSpellSlotDetail(data));
        })
        .catch((error) => { console.log(error); });
};

// Function to create spell list based on data returned from API
async function createSpellList(className, spellLevelArr) {
    if (spellLevelArr.length === 0) {
        spellsContainer.style.display = "none";
        console.log("No spells for this class");
        return;
    }
    spellsContainer.style.display = "grid";
    for (let i = 0; i < spellLevelArr.length; i++) {
        const spellListContainer = document.createElement("div");
        const spellListHeading = document.createElement("h3");
        spellListHeading.innerHTML = `Level ${i + 1} Spells`;
        spellListContainer.className = "spell-list-container";
        spellsContainer.appendChild(spellListContainer);
        spellListContainer.appendChild(spellListHeading);
        for (let j = 0; j < spellLevelArr[i]; j++) {
            const spellLabel = document.createElement("label");
            const infoIconDiv = document.createElement("span");
            infoIconDiv.className = "info-icon";
            infoIconDiv.innerHTML = infoIcon;
            spellLabel.innerHTML = `Spell ${j + 1}`;
            spellLabel.className = "spell-label";
            spellLabel.htmlFor = `spell-list${i}`;
            infoIconDiv.addEventListener("click", (event) => {
                const spellIndex = event.target.parentNode.nextSibling.value;
                if (spellIndex === "undefined" || spellIndex === "-") return;
                const popupContainer = document.getElementById("popup-container");
                const overlay = document.getElementById("popup-overlay");
                spellInfoPopup(spellIndex);
                overlay.style.display = "block";
                popupContainer.style.display = "block";
                popupContainer.focus();
            });
            const iconSelectContainer = document.createElement("div");
            iconSelectContainer.className = "icon-select-container";
            spellListContainer.appendChild(iconSelectContainer);
            const spellList = document.createElement("select");
            spellList.id = `spell-list${i}`;
            spellList.className = "spell-list";
            spellList.name = `spell-list${i}`;
            spellList.place
            iconSelectContainer.appendChild(infoIconDiv);
            iconSelectContainer.appendChild(spellList);
            iconSelectContainer.appendChild(spellLabel);
            createOption("-", spellList);
            const spellNames = await getSpellNames(i, className);
            for (let k = 0; k < spellNames.length; k++) {
                createOption(spellNames[k].name, spellList, spellNames[k].index);
            }
        }
        const myUrl = new URL(window.location.toLocaleString());
        const characterName = myUrl.searchParams.get("characterName");
        if (characterName !== null) {
            loadSpells();
        }
    }
}

// Function to create spell options
function createOption(spellName, parentDiv, spellIndex) {
    const option = document.createElement("option");
    option.classList.add("spell-option");
    option.value = spellIndex;
    option.text = spellName;
    parentDiv.appendChild(option);
}

// Function to clear spell options
function clearOptions() {
    const spellContainer = document.getElementById("spell-container");
    spellContainer.innerHTML = "";
};

// Function to get spell slot details from API data that has been returned
function getSpellSlotDetail(data) {
    const slotArray = [];
    if ("spellcasting" in data === false) {
        return slotArray;
    }

    if (data.spellcasting.spell_slots_level_1 > 0) {
        slotArray.push(data.spellcasting.spell_slots_level_1);
    }
    if (data.spellcasting.spell_slots_level_2 > 0) {
        slotArray.push(data.spellcasting.spell_slots_level_2);
    }
    if (data.spellcasting.spell_slots_level_3 > 0) {
        slotArray.push(data.spellcasting.spell_slots_level_3);
    }
    if (data.spellcasting.spell_slots_level_4 > 0) {
        slotArray.push(data.spellcasting.spell_slots_level_4);
    }
    if (data.spellcasting.spell_slots_level_5 > 0) {
        slotArray.push(data.spellcasting.spell_slots_level_5);
    }
    if (data.spellcasting.spell_slots_level_6 > 0) {
        slotArray.push(data.spellcasting.spell_slots_level_6);
    }
    if (data.spellcasting.spell_slots_level_7 > 0) {
        slotArray.push(data.spellcasting.spell_slots_level_7);
    }
    if (data.spellcasting.spell_slots_level_8 > 0) {
        slotArray.push(data.spellcasting.spell_slots_level_8);
    }
    if (data.spellcasting.spell_slots_level_9 > 0) {
        slotArray.push(data.spellcasting.spell_slots_level_9);
    }
    return slotArray;
}

// Function to get spell names from API based on user selected class
async function getSpellNames(index, className) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/classes/${className}/levels/${index}/spells`);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// Function to get spell info from API based on user selected spell and call createSpellPopup function
export function spellInfoPopup(spell) {
    if (spell === "-") return;
    fetch(`https://www.dnd5eapi.co/api/spells/${spell}`)
        .then(response => response.json())
        .then(data => {
            createSpellPopup(data);
        })
}

// Function to create spell popup based on data returned from API
function createSpellPopup(data) {
    const popupHeading = document.getElementById("popup-heading");
    const popupDescription = document.getElementById("popup-desc");
    const popusCastTime = document.getElementById("popup-p2");
    const popupRange = document.getElementById("popup-p1");
    const popupDuration = document.getElementById("popup-p3");

    popupDescription.innerHTML = "";
    popupHeading.innerHTML = "";
    popusCastTime.innerHTML = "";
    popupRange.innerHTML = "";
    popupDuration.innerHTML = "";

    popupHeading.innerHTML = data.name;
    data.desc.forEach(desc => {
        popupDescription.innerHTML += `<p>${desc}</p>`;
    });
    popupDescription.innerHTML = data.desc[0];
    popupRange.innerHTML = `Range: ${data.range}`;
    popusCastTime.innerHTML = `Casting Time: ${data.casting_time}`;
    popupDuration.innerHTML = `Duration: ${data.duration}`;
}