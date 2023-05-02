function init() {
    getMonsters();
}

init();

function getMonsters() {
    const monsterContainer = document.getElementById("monster-container");
    fetch("http://localhost:3000/monsters?_limit=20")
        .then(res => res.json())
        .then(monsters => {
            monsters.forEach(monster => {
                const monsterName = document.createElement("h2");
                const monsterAge = document.createElement("h4");
                const monsterBio = document.createElement("p");
                const monsterInfo = document.createElement("div");

                monsterName.textContent = monster.name;
                monsterAge.textContent = monster.age;
                monsterBio.textContent = monster.description;

                monsterInfo.append(monsterName, monsterAge, monsterBio);

                monsterContainer.appendChild(monsterInfo);
            })
        })
}