import { calculateHealth } from "../characters.js";
import { getSpells, clearOptions } from "./spells.js";

const classDescription = document.getElementById(`class-description`);

export function getClassInfo(className) {
    fetch(`https://www.dnd5eapi.co/api/classes/${className}`)
        .then(response => response.json())
        .then(data => {
            const hitDie = data.hit_die;
            const hitDieStat = document.getElementById("hit-die");
            hitDieStat.innerHTML = hitDie;
            calculateHealth();
            const level = document.getElementById("level").value;
            clearOptions();
            getSpells(level, className);
            const classInfo = data.subclasses[0].url;
            fetch(`https://www.dnd5eapi.co${classInfo}`)
                .then(responseRaw => responseRaw.json())
                .then(response => {
                    classDescription.innerHTML = response.desc[0];
        })
    })
};