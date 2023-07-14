const raceDescription = document.getElementById(`race-description`);

export function getRaceInfo(race) {
    fetch(`https://www.dnd5eapi.co/api/races/${race}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            raceDescription.innerHTML = data.alignment;
        })
};