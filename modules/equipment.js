const equipmentContainer = document.querySelector('.equipment-container');
const infoIcon = `<i class="fa-solid fa-shield-halved"></i>`;
export let armorAC = false;

export function getEquipmentInfo(classSelect) {
  fetch(`https://www.dnd5eapi.co/api/classes/${classSelect}/starting-equipment`)
    .then(response => response.json())
    .then(data => {
      equipmentContainer.innerHTML = "";
      const optionsArray = recursiveSearch(data.starting_equipment_options);
      const startArray = recursiveSearch(data.starting_equipment);

      optionsArray.forEach((option, index) => {
        const newForm = document.createElement('form');

        newForm.classList.add('equipment-form');
        newForm.innerHTML = `<h3>Choose 1</h3>`;
        for (let i = 0; i < option.names.length; i++) {
          if (option.indexes[i] === 'simple-weapons' || option.indexes[i] === 'martial-weapons') {
            createWeaponsDropdown(option.indexes[i], newForm, index);
          } else {
            const newLabel = document.createElement('label');
            newLabel.innerHTML = option.names[i];
            newLabel.htmlFor = option.indexes[i];
            const newInput = document.createElement('input');
            newInput.setAttribute('type', 'radio');
            newInput.setAttribute('name', `option-${index}`);
            newInput.setAttribute('value', option.indexes[i]);
            const newIcon = addIcon(newLabel);
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
            newLabel.appendChild(newInput);
            newForm.appendChild(newLabel);
          }
        }
        equipmentContainer.appendChild(newForm);
      });
      loadRadioButtonValues();
    })
}

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

function createWeaponsDropdown(weaponType, form, index) {
  fetch(`https://www.dnd5eapi.co/api/equipment-categories/${weaponType}`)
    .then(response => response.json())
    .then(data => {
      const newLabel = document.createElement('label');
      newLabel.htmlFor = data.index;
      form.appendChild(newLabel);
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
      newLabel.appendChild(newSelect);
      const newIcon = addIcon(newLabel);
      newIcon.addEventListener('click', (event) => {
        const equipmentIndex = event.target.parentNode.previousSibling.value;
        if (equipmentIndex === 'undefined' || equipmentIndex === '-') return;
        const popupContainer = document.getElementById('popup-container');
        const overlay = document.getElementById('popup-overlay');
        equipmentInfoPopup(equipmentIndex);
        overlay.style.display = 'block';
        popupContainer.style.display = 'block';
        popupContainer.focus();
      });
      newLabel.appendChild(newInput);
    })
}

function addIcon(parent) {
  const newIcon = document.createElement('span');
  newIcon.className = 'info-icon';
  newIcon.innerHTML = infoIcon;
  parent.appendChild(newIcon);
  return newIcon;
}

function equipmentInfoPopup(equipmentIndex) {
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
    });
}

function loadRadioButtonValues() {
  const radioButtons = document.querySelectorAll('input[type="radio"]');
  radioButtons.forEach(button => {
    button.addEventListener('change', function () {
      if (this.checked) {
        fetch(`https://www.dnd5eapi.co/api/equipment/${this.value}`)
          .then(response => response.json())
          .then(data => {
            const dexterity = document.getElementById('dexterity');
            const armorClass = document.getElementById('armorClass');
            if (data.equipment_category.name === "Armor" && data.armor_class.dex_bonus === true) {
              armorClass.innerHTML = data.armor_class.base + Math.floor((dexterity.value - 10) / 2);
              armorAC = true;
            } else if (data.equipment_category.name === "Armor" && data.armor_class.dex_bonus === false) {
              armorClass.innerHTML = data.armor_class.base;
              armorAC = true;
            } else {
              armorClass.innerHTML = 10 + Math.floor((dexterity.value - 10) / 2);
              armorAC = false;
            }
          })
          .catch(error => {
            console.log("Error fetching equipment data:", error);
          });
      }
    });
  });
}








