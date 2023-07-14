
import { classSelect } from "./main.js";

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
        spellListContainer.id = `spell-list-container${i}`;
        spellListContainer.className = "spell-list-container";
        spellsContainer.appendChild(spellListContainer);
        spellListContainer.appendChild(spellListHeading);
        for (let j = 0; j < spellLevelArr[i]; j++) {
            const spellLabel = document.createElement("label");
            spellLabel.innerHTML = `Spell ${j + 1}`;
            spellLabel.className = "spell-label";
            spellLabel.htmlFor = `spell-list${i}`;
            spellLabel.addEventListener("mouseover", (event) => {
                const spellIndex = event.target.nextSibling.value;
                console.log(spellIndex);
                const spellPopup = document.getElementById(`spell-popup-${spellIndex}`);
                spellPopup.style.display = "block";
            });
            spellLabel.addEventListener("mouseout", (event) => {
                const spellIndex = event.target.nextSibling.value;
                const spellPopup = document.getElementById(`spell-popup-${spellIndex}`);
                spellPopup.style.display = "none";
            });
            spellListContainer.appendChild(spellLabel);
            const spellList = document.createElement("select");
            spellList.id = `spell-list${i}`;
            spellList.className = "spell-list";
            spellList.name = `spell-list${i}`;
            spellListContainer.appendChild(spellList);
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
    spellInfoPopup(spellIndex);
    parentDiv.appendChild(option);
}

export function clearOptions() {
    const spellContainer = document.getElementById("spell-container");
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

function spellInfoPopup(spell) {
    if (spell === "-") return;
    fetch(`https://www.dnd5eapi.co/api/spells/${spell}`)
        .then(response => response.json())
        .then(data => {
            createSpellPopup(data);
        })
}

function createSpellPopup(data) {
    const parentDiv = document.getElementById("spell-container");
    const spellPopup = document.createElement("div");
    spellPopup.id = `spell-popup-${data.index}`;
    spellPopup.className = "popup";
    const spellName = document.createElement("h2");
    spellName.innerHTML = data.name;
    const spellDescription = document.createElement("p");
    spellDescription.innerHTML = data.desc[0];
    const spellRange = document.createElement("p");
    spellRange.innerHTML = `Range: ${data.range}`;
    const spellDuration = document.createElement("p");
    spellDuration.innerHTML = `Duration: ${data.duration}`;
    spellPopup.appendChild(spellName);
    spellPopup.appendChild(spellDescription);
    spellPopup.appendChild(spellRange);
    spellPopup.appendChild(spellDuration);
    parentDiv.appendChild(spellPopup);

}