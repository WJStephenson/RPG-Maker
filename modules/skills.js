const strengthSkills = ['athletics'];
const dexteritySkills = ['acrobatics', 'sleight-of-hand', 'stealth'];
const intelligenceSkills = ['arcana', 'history', 'investigation', 'nature', 'religion'];
const wisdomSkills = ['animal-handling', 'insight', 'medicine', 'perception', 'survival'];
const charismaSkills = ['deception', 'intimidation', 'performance', 'persuasion'];



export function updateSkillValues(strength, dexterity, intelligence, wisdom, charisma) {
    for (let skill of strengthSkills) {
        updateSkill(skill, strength);
    }
    for (let skill of dexteritySkills) {
        updateSkill(skill, dexterity);
    }
    for (let skill of intelligenceSkills) {
        updateSkill(skill, intelligence);
    }
    for (let skill of wisdomSkills) {
        updateSkill(skill, wisdom);
    }
    for (let skill of charismaSkills) {
        updateSkill(skill, charisma);
    }
    setinitiative(dexterity);
}

function updateSkill(skill, value) {
    const skillElement = document.querySelector(`#${skill}-total`);
    skillElement.innerHTML = value;
}

function setinitiative(value) {
    const initiative = document.getElementById("initiative");
    initiative.innerHTML = value;
}
