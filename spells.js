
import { classSelect } from "./main.js";

const infoIcon = `<i class="fa-solid fa-scroll"></i>`;

export function getSpells(level, className) {
    fetch(`https://www.dnd5eapi.co/api/classes/${className}/levels/${level}`)
        .then(response => response.json())
        .then(data => {
            findSpellSlots(data);
        })
        .catch((error) => { console.log(error); });
};

function findSpellSlots(data) {
    getSpellList(classSelect.value, getSpellSlotDetail(data));
}

async function getSpellList(className, spellLevelArr) {
    const spellsContainer = document.getElementById("spell-container");
    if (spellLevelArr.length === 1) return;
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
    }
}

function createOption(spellName, parentDiv, spellIndex) {
    const option = document.createElement("option");
    option.classList.add("spell-option");
    option.value = spellIndex;
    option.text = spellName;
    parentDiv.appendChild(option);
}

export function clearOptions() {
    const spellContainer = document.getElementById("spell-container");
    spellContainer.innerHTML = "";
    while (spellContainer.firstChild) {
        spellContainer.removeChild(spellContainer.firstChild);
    }
}

function getSpellSlotDetail(data) {
    const slotArray = [];

    slotArray.push(data.spellcasting.cantrips_known);

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

async function getSpellNames(index, className) {
    try {
        const response = await fetch(`https://www.dnd5eapi.co/api/classes/${className}/levels/${index}/spells`);
        const data = await response.json();
        console.log(data.results);
        return data.results;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export function spellInfoPopup(spell) {
    if (spell === "-") return;
    fetch(`https://www.dnd5eapi.co/api/spells/${spell}`)
        .then(response => response.json())
        .then(data => {
            createSpellPopup(data);
        })
}

function createSpellPopup(data) {
    const popupHeading = document.getElementById("popup-heading");
    popupHeading.innerHTML = data.name;
    const popupDescription = document.getElementById("popup-desc");
    popupDescription.innerHTML = data.desc[0];
    const popupDesc2 = document.getElementById("popup-desc2");
    popupDesc2.innerHTML = data.desc[1];
    const popupRange = document.getElementById("popup-range");
    popupRange.innerHTML = `Range: ${data.range}`;
    const popusCastTime = document.getElementById("popup-cast-time");
    popusCastTime.innerHTML = `Casting Time: ${data.casting_time}`;
    const popupDuration = document.getElementById("popup-duration");
    popupDuration.innerHTML = `Duration: ${data.duration}`;
}