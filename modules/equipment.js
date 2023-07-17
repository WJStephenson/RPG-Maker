const equipmentContainer = document.querySelector('.equipment-container');

export function getEquipmentInfo(classSelect) {
    fetch(`https://www.dnd5eapi.co/api/classes/${classSelect}/starting-equipment`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            equipmentContainer.innerHTML = "";
            const starting_equipment = data.starting_equipment;
            const starting_equipment_options = data.starting_equipment_options;
            let equipmentArray = [];

            starting_equipment.forEach(item => {
                equipmentArray.push(item.equipment.name);
            })
            
            starting_equipment_options.forEach(item => {
                equipmentArray.push(item.desc);
            })
            console.log(equipmentArray);
            const formattedEquipmentArr = splitItemsByABC(equipmentArray);
            console.log(formattedEquipmentArr);
            formattedEquipmentArr.forEach(item => {
                if (item.length === 1) {
                    const newListItem = document.createElement(`li`);
                    newListItem.innerHTML = item[0];
                    equipmentContainer.appendChild(newListItem);
                } else {
                    const equipmentChoiceDiv = document.createElement(`div`);
                    equipmentChoiceDiv.classList.add(`equipment-choice`);
                    item.forEach((choice, index) => {
                        const radioDiv = document.createElement(`div`);
                        const newRadio = document.createElement(`input`);
                        newRadio.type = `radio`;
                        newRadio.name = `equipment-choice-${index}`;
                        newRadio.value = choice;
                        newRadio.id = `equipment-choice-${index}`;
                        const newLabel = document.createElement(`label`);
                        newLabel.htmlFor = `equipment-choice-${index}`;
                        newLabel.innerHTML = choice;
                        radioDiv.appendChild(newRadio);
                        radioDiv.appendChild(newLabel);
                        equipmentChoiceDiv.appendChild(radioDiv);
                    })
                    equipmentContainer.appendChild(equipmentChoiceDiv);
                }
        })
    })
};

function createItemsList(item) {
    const newListItem = document.createElement(`li`);

    if (item.quantity > 1) {
        newListItem.innerHTML = item.equipment.name + ` x ` + item.quantity;
    } else {
        newListItem.innerHTML = item.equipment.name;
    }
    equipmentContainer.appendChild(newListItem);
}

function createStartingEquipmentOptions(item) {
    const newListItem = document.createElement(`li`);
    newListItem.innerHTML = item.desc;
    equipmentContainer.appendChild(newListItem);
}

function splitItemsByABC(stringsObject) {
    const newList = [];
  
    for (let i = 0; i < Object.keys(stringsObject).length; i++) {
      const item = stringsObject[i];
      const matches = item.match(/\([a-c]\)/gi);
  
      if (matches) {
        const splitItemsArray = [];
        let startIndex = 0;
        for (const match of matches) {
          const splitItems = item.slice(startIndex, item.indexOf(match)).trim();
          if (splitItems !== "") {
            splitItemsArray.push(splitItems);
          }
          startIndex = item.indexOf(match) + match.length;
        }
        const remainingItem = item.slice(startIndex).trim();
        if (remainingItem !== "") {
          splitItemsArray.push(remainingItem);
        }
        if (splitItemsArray.length > 0) {
          newList.push(splitItemsArray);
        }
      } else if (item.trim() !== "") {
        newList.push([item]);
      }
    }
  
    return newList;
  }
  
  