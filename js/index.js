document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    let page = 1;

    getMonsters(page, monsterContainer);
    monsterSubmit();
    paginateHandler(page, monsterContainer);
});

function getMonsters(page, container) {
    fetch(`http://localhost:3000/monsters?_limit=50&_page=${page}`)
        .then(res => res.json())
        .then(monsters => monsters.forEach(monster => displayMonsters(monster, container)))
        .catch(err => console.log(err));
}

function displayMonsters(monster, container) {
    const monsterName = document.createElement("h2");
    const monsterAge = document.createElement("h4");
    const monsterBio = document.createElement("p");
    const monsterInfo = document.createElement("div");

    monsterName.textContent = monster.name;
    monsterAge.textContent = `Age: ${monster.age}`;
    monsterBio.textContent = `Bio: ${monster.description}`;

    monsterInfo.append(monsterName, monsterAge, monsterBio);

    container.appendChild(monsterInfo);
}

function monsterSubmit() {
    const monsterForm = document.getElementById("monster-form");
    monsterForm.addEventListener("submit", event => {
        event.preventDefault();
        const monsterObj = {
            name: event.target[0].value,
            age: event.target[1].value,
            description: event.target[2].value
        };

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

function paginateHandler(pageNum, container) {
    const pageForward = document.getElementById("forward");
    const pageBack = document.getElementById("back");
    const pageNumDisplay = document.getElementById("page-num");

    backDisable(pageNumDisplay, pageBack);
    
    pageForward.addEventListener("click", () => {
        pageNum += 1;
        paginatePages(pageNum, container, pageNumDisplay, pageForward, pageBack);
    });

    pageBack.addEventListener("click", () => {
        pageNum -= 1;
        paginatePages(pageNum, container, pageNumDisplay, pageForward, pageBack);
    });
}

function backDisable(pageNum, pageBack) {
    pageNum.textContent === "1" ? pageBack.disabled = true : pageBack.disabled = false;
}

function paginatePages(pageNum, container, pageDisplay, pageForward, pageBack) {
    container.textContent = "";
    pageDisplay.textContent = pageNum;
    getMonsters(pageNum, container);

    setTimeout(() => {
        if(container.childElementCount < 50) {
            pageForward.disabled = true;
        } else {
            pageForward.disabled = false;
        }
    }, 400);
    
    backDisable(pageDisplay, pageBack);
}

