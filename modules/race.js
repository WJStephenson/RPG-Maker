const raceDescription = document.getElementById(`race-description`);
const languageList = document.getElementById(`languages-list`);
const languageDescription = document.getElementById(`language-description`);

// function to get info based on suer selected race from API
export function getRaceInfo(race) {
    fetch(`https://www.dnd5eapi.co/api/races/${race}`)
        .then(response => response.json())
        .then(data => {
            raceDescription.innerHTML = data.alignment;
            languageList.innerHTML = "";
            data.languages.forEach(language => {
                const newListItem = document.createElement(`li`);
                newListItem.innerHTML = language.name;
                languageList.appendChild(newListItem);
            });
            setSpeed(data.speed);
            languageDescription.innerHTML = data.language_desc;
        })
};

// set speed stat based on data returned from API
function setSpeed(speed) {
    const speedStat = document.getElementById("speed");
    speedStat.innerHTML = speed;
}