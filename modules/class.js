const classDescription = document.getElementById(`class-description`);

export function getClassInfo(className) {
    fetch(`https://www.dnd5eapi.co/api/classes/${className}`)
        .then(response => response.json())
        .then(data => {
            const classInfo = data.subclasses[0].url;
            fetch(`https://www.dnd5eapi.co${classInfo}`)
                .then(responseRaw => responseRaw.json())
                .then(response => {
                    console.log(response);
                    classDescription.innerHTML = response.desc[0];
        })
    })
};