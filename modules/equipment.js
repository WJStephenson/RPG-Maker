import { loadEquipment } from "./memory.js";

const equipmentContainer = document.querySelector('.equipment-container');
const infoIcon = `<i class="fa-solid fa-shield-halved"></i>`;
export let armorAC = false;
let baseAC = 10;

// Get equipment info from API based on class
export async function getEquipmentInfo(classSelect) {
  try {
    await getEquipInfo(classSelect);
    const myUrl = new URL(window.location.toLocaleString());
    const characterName = myUrl.searchParams.get("characterName");
    if (characterName !== null) {
      // All operations in getEquipmentInfo have completed, now call loadEquipment()
      loadEquipment();
    }
  } catch (error) {
    console.log("Error fetching equipment data:", error);
  }
}

// Get strating equipment info from API based on class
export function getEquipInfo(classSelect) {
  return fetch(`https://www.dnd5eapi.co/api/classes/${classSelect}/starting-equipment`)
    .then(response => response.json())
    .then(data => {
      equipmentContainer.innerHTML = "";
      const optionsArray = recursiveSearch(data.starting_equipment_options);

      const dropdownPromises = optionsArray.map(async (option, index) => {
        const newForm = document.createElement('form');
        newForm.classList.add('equipment-form');
        if (option.indexes[index] === 'simple-weapons' || option.indexes[index] === 'martial-weapons') {
          newForm.innerHTML = `<h3>Choose 1 Weapon</h3>`;
        } else {
          newForm.innerHTML = `<h3>Choose 1 Item</h3>`;
        }
        for (let i = 0; i < option.names.length; i++) {
          if (option.indexes[i] === 'simple-weapons' || option.indexes[i] === 'martial-weapons') {
            await createWeaponsDropdown(option.indexes[i], newForm, index);
          } else {
            const equipmentDiv = document.createElement('div');
            equipmentDiv.classList.add('equipment-div');
            const newLabel = document.createElement('label');
            newLabel.innerHTML = option.names[i];
            newLabel.htmlFor = option.indexes[i];
            const newInput = document.createElement('input');
            newInput.setAttribute('type', 'radio');
            newInput.setAttribute('name', `option-${index}`);
            newInput.setAttribute('value', option.indexes[i]);
            const newIcon = addIcon(equipmentDiv);
            newIcon.addEventListener('click', (event) => {
              const equipmentIndex = event.target.parentNode.nextSibling.nextSibling.value;
              if (equipmentIndex === 'undefined' || equipmentIndex === '-') return;
              const popupContainer = document.getElementById('popup-container');
              const overlay = document.getElementById('popup-overlay');
              equipmentInfoPopup(equipmentIndex);
              overlay.style.display = 'block';
              popupContainer.style.display = 'block';
              popupContainer.focus();
            });
            equipmentDiv.appendChild(newLabel);
            equipmentDiv.appendChild(newInput);
            newForm.appendChild(equipmentDiv);
          }
        }
        equipmentContainer.appendChild(newForm);
        return Promise.resolve();
      });

      return Promise.all(dropdownPromises);
    })
    .catch(error => {
      console.log("Error fetching equipment data:", error);
    });
}

// Recursive search function to find all names and indexes in the starting equipment options
function recursiveSearch(obj) {
  const results = [];

  function search(obj, currentResult = { names: [], indexes: [] }, optionIndex) {
    if (typeof obj !== "object" || obj === null) {
      return;
    }

    if (!currentResult.names) {
      currentResult.names = [];
    }
    if (!currentResult.indexes) {
      currentResult.indexes = [];
    }

    if ("name" in obj && obj.name !== undefined) {
      const nameValue = obj.name;
      if (!currentResult.names.includes(nameValue)) {
        currentResult.names.push(nameValue);
      }
    }

    if ("index" in obj && obj.index !== undefined) {
      const indexValue = obj.index;
      if (!currentResult.indexes.includes(indexValue)) {
        currentResult.indexes.push(indexValue);
      }
    }

    if (Array.isArray(obj)) {
      for (const item of obj) {
        search(item, { ...currentResult }, optionIndex);
      }
    } else {
      for (const key in obj) {
        const value = obj[key];
        if (typeof value === "object" && value !== null) {
          search(value, { ...currentResult }, optionIndex);
        }
      }
    }

    if (optionIndex !== undefined && (currentResult.names.length > 0 || currentResult.indexes.length > 0)) {
      results[optionIndex] = currentResult;
    }
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      const option = obj[i];
      search(option, {}, i);
    }
  }

  return results;
}

// Create dropdowns for weapons
async function createWeaponsDropdown(weaponType, form, index) {
  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/equipment-categories/${weaponType}`);
    const data = await response.json();

    const equipmentDiv = document.createElement('div');
    equipmentDiv.classList.add('equipment-div');
    form.appendChild(equipmentDiv);
    const newInput = document.createElement('input');
    newInput.setAttribute('type', 'radio');
    newInput.setAttribute('name', `option-${index}`);
    newInput.setAttribute('value', data.index);
    const newSelect = document.createElement('select');
    data.equipment.forEach(weapon => {
      const newOption = document.createElement('option');
      newOption.innerHTML = weapon.name;
      newOption.value = weapon.index;
      newSelect.appendChild(newOption);
    })
    const newIcon = addIcon(equipmentDiv);
    equipmentDiv.appendChild(newSelect);
    newIcon.addEventListener('click', (event) => {
      const equipmentIndex = event.target.parentNode.nextSibling.value;
      if (equipmentIndex === 'undefined' || equipmentIndex === '-') return;
      const popupContainer = document.getElementById('popup-container');
      const overlay = document.getElementById('popup-overlay');
      equipmentInfoPopup(equipmentIndex);
      overlay.style.display = 'block';
      popupContainer.style.display = 'block';
      popupContainer.focus();
    });
    equipmentDiv.appendChild(newInput);
    const event = new Event('optionsLoaded');
    equipmentDiv.dispatchEvent(event);
  } catch (error) {
    console.log("Error fetching equipment data:", error);
  }
}

// Add info icon to equipment divs
function addIcon(parent) {
  const newIcon = document.createElement('span');
  newIcon.className = 'info-icon';
  newIcon.innerHTML = infoIcon;
  parent.appendChild(newIcon);
  return newIcon;
}

// Get equipment info from API based on equipment index
async function equipmentInfoPopup(equipmentIndex) {
  const popupHeading = document.getElementById('popup-heading');
  fetch(`https://www.dnd5eapi.co/api/equipment/${equipmentIndex}`)
    .then(response => response.json())
    .then(data => {
      const popupDescription = document.getElementById('popup-desc');
      const popupInfo = document.getElementById('popup-p1');
      const popupInfo2 = document.getElementById('popup-p2');
      const popupInfo3 = document.getElementById('popup-p3');

      popupHeading.innerHTML = "";
      popupDescription.innerHTML = "";
      popupInfo.innerHTML = "";
      popupInfo2.innerHTML = "";
      popupInfo3.innerHTML = "";

      if (data.equipment_category.name === "Armor") {
        popupHeading.innerHTML = data.name;
        popupDescription.innerHTML = `Armor Class: ${data.armor_class.base}, Dex Bonus: ${data.armor_class.dex_bonus}`;
        popupInfo.innerHTML = `Cost: ${data.cost.quantity} ${data.cost.unit}`;
        popupInfo2.innerHTML = `Weight: ${data.weight}lb`;
        popupInfo3.innerHTML = `Stealth Disadvantage: ${data.stealth_disadvantage}`;
      } else if (data.equipment_category.name === "Weapon") {
        popupHeading.innerHTML = data.name;
        popupDescription.innerHTML = `Damage: ${data.damage.damage_dice}, ${data.damage.damage_type.name}`;
        popupInfo.innerHTML = `Cost: ${data.cost.quantity} ${data.cost.unit}`;
        popupInfo2.innerHTML = `Weight: ${data.weight}lb`;
        popupInfo3.innerHTML = `Properties: ${data.properties.map(property => property.name).join(", ")}`;
      } else if (data.equipment_category.name === "Adventuring Gear") {
        popupHeading.innerHTML = data.name;
        data.contents.forEach(item => {
          popupDescription.innerHTML += `${item.item.name}: ${item.quantity}<br>`;
        })
      } else if (data.equipment_category.name === "Tools") {
        popupHeading.innerHTML = data.name;
        popupDescription.innerHTML = `Description: ${data.desc}`;
        popupInfo.innerHTML = `Cost: ${data.cost.quantity} ${data.cost.unit}`;
        popupInfo2.innerHTML = `Weight: ${data.weight}lb`;
      } else if (data.equipment_category.name === "Mounts and Vehicles") {
        popupHeading.innerHTML = data.name;
        popupDescription.innerHTML = `Description: ${data.desc}`;
        popupInfo.innerHTML = `Cost: ${data.cost.quantity} ${data.cost.unit}`;
        popupInfo2.innerHTML = `Weight: ${data.weight}lb`;
      } else if (data.equipment_category.name === "Trade Goods") {
        popupHeading.innerHTML = data.name;
        popupDescription.innerHTML = `Description: ${data.desc}`;
        popupInfo.innerHTML = `Cost: ${data.cost.quantity} ${data.cost.unit}`;
        popupInfo2.innerHTML = `Weight: ${data.weight}lb`;
      } else if (data.equipment_category.name === "Other") {
        popupHeading.innerHTML = data.name;
        popupDescription.innerHTML = `Description: ${data.desc}`;
        popupInfo.innerHTML = `Cost: ${data.cost.quantity} ${data.cost.unit}`;
        popupInfo2.innerHTML = `Weight: ${data.weight}lb`;
      } else {
        popupHeading.innerHTML = `Sorry, no info has been found for this item!`;
      }
    })
    .catch((error) => {
      console.log(error);
      popupHeading.innerHTML = `Sorry, no info has been found for this item!`;
    })
}

// Calculates AC based on equipment selected
export function calculateAC(selectedEquipment) {
  if (selectedEquipment == 'shield') {
    const armorClass = document.getElementById('armorClass');
    armorClass.innerHTML = baseAC + 2 + Math.floor((dexterity.value - 10) / 2);
    baseAC = 12;
    return;
  } else {
    const armorClass = document.getElementById('armorClass');
    baseAC = 10;
    armorClass.innerHTML = baseAC + Math.floor((dexterity.value - 10) / 2);
  }
  fetch(`https://www.dnd5eapi.co/api/equipment/${selectedEquipment}`)
    .then(response => response.json())
    .then(data => {
      const dexterity = document.getElementById('dexterity');
      const armorClass = document.getElementById('armorClass');
      if (data.equipment_category.name === "Armor" && data.armor_class.dex_bonus === true) {
        armorClass.innerHTML = data.armor_class.base + Math.floor((dexterity.value - 10) / 2);
        baseAC = data.armor_class.base;
        armorAC = true;
      } else if (data.equipment_category.name === "Armor" && data.armor_class.dex_bonus === false) {
        armorClass.innerHTML = data.armor_class.base;
        baseAC = 10;
        armorAC = true;
      } else {
        armorClass.innerHTML = 10 + Math.floor((dexterity.value - 10) / 2);
        baseAC = 10;
        armorAC = false;
      }
    })
    .catch(error => {
      console.log("Error fetching equipment data:", error);
    });
}

// Update AC based on dexterity modifier
export function updateAC() {
  const armorClass = document.getElementById('armorClass');
  if (armorAC) {
    armorClass.innerHTML = baseAC + Math.floor((dexterity.value - 10) / 2);
  }
}






