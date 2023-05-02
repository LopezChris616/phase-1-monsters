document.addEventListener("DOMContentLoaded", () => {
    getMonsters();
    monsterSubmit();
})

function getMonsters() {
    fetch("http://localhost:3000/monsters?_limit=50")
        .then(res => res.json())
        .then(monsters => monsters.forEach(monster => displayMonsters(monster)))
        .catch(err => console.log(err))
}

function displayMonsters(monster) {
    const monsterContainer = document.getElementById("monster-container");
    const monsterName = document.createElement("h2");
    const monsterAge = document.createElement("h4");
    const monsterBio = document.createElement("p");
    const monsterInfo = document.createElement("div");

    monsterName.textContent = monster.name;
    monsterAge.textContent = `Age: ${monster.age}`;
    monsterBio.textContent = `Bio: ${monster.description}`;

    monsterInfo.append(monsterName, monsterAge, monsterBio);

    monsterContainer.appendChild(monsterInfo);
}

function monsterSubmit() {
    const monsterForm = document.getElementById("monster-form");
    monsterForm.addEventListener("submit", event => {
        event.preventDefault();

        const monsterObj = {
            name: event.target[0].value,
            age: event.target[1].value,
            description: event.target[2].value
        }

        console.log("click");

        fetch("http://localhost:3000/monsters", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json" 
            },
            body: JSON.stringify(monsterObj)
        })
            .then(res => res.json())
            .then(monster => console.log(monster))
            .catch(err => console.log(err));
        
        displayMonsters(monsterObj);

    });
}