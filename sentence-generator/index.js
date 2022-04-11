let currentModId;
let hasCreated = [];
function changeCurrentMod(id) {
    if (currentModId) {
        let oldBtn = document.getElementById(`top-btn-${currentModId}`);
        oldBtn.style.background = 'rgb(172, 172, 172)';
        oldBtn.className = 'top-btn';
        let oldBox = document.getElementById(`mod${currentModId}`);
        oldBox.style.opacity = '0';
        setTimeout(() => {
            oldBox.style.display = 'none';
        }, 150)
    }
    let btn = document.getElementById(`top-btn-${id}`);
    btn.style.background = "rgb(201, 165, 131)";
    btn.className = "top-btn current-top-btn";
    let box = document.getElementById(`mod${id}`);
    setTimeout(() => {
        box.style.display = 'block';
        box.style.opacity = '1';
    }, 150)
    currentModId = id;
    resetTextArea();
    if (hasCreated.indexOf(currentModId) === -1) {
        createLists();
    }
}


let modMap = new Map([
    ['1', mod1Sentence],
    ['2', mod2Sentence],
    ['3', mod3Sentence],
    ['self', selfSettingSentence],
]);
function makeSentence() {
    console.log(currentModId, 'currentModId')
    let motion = modMap.get(currentModId);
    motion();
}



function createNewItem(type) {
    let newItem = document.getElementById(`${type}Input`);
    let newValue = newItem.value;
    if (newValue) {
        listCollection[`mod${currentModId}`][`${type}`].push(newValue);
        appendNewItem(type, newValue);
    }
    newItem.value = '';
}
function appendNewItem(type, value) {
    let box = document.getElementById(`${type}-list`);
    if (box) {
        let newEl = document.createElement('span');
        newEl.className = 'list-item';
        newEl.innerText = value;
        let id = type + listCollection[`mod${currentModId}`][`${type}`].length;
        newEl.setAttribute("id", id);
        newEl.onclick = function (e) {
            console.log(this);
            listCollection[`mod${currentModId}`][`${type}`] = listCollection[`mod${currentModId}`][`${type}`].filter(t => t !== value);
            this.parentElement.removeChild(this);
        };
        box.appendChild(newEl);
    }
}


function createLists() {
    if (listCollection[`mod${currentModId}`]) {
        hasCreated.push(currentModId);
        let listArr = Object.keys(listCollection[`mod${currentModId}`]);
        for (let name of listArr) {
            let list = listCollection[`mod${currentModId}`][`${name}`]
            if (list.length) {
                for (let item of list) {
                    appendNewItem(name, item);
                }
            }
        }
    }
}

function clearList(name) {
    listCollection[`mod${currentModId}`][`${name}`] = []
    let box = document.getElementById(`${name}-list`);
    box.innerHTML = '';
}
function resetTextArea() {
    let box = document.getElementById('main-box');
    box.innerText = 'Click 🤟';
}

changeCurrentMod('1');

let currentTheme;
function changeTheme(theme) {
    if (currentTheme) {
        let oldBtn = document.getElementById(`theme-btn-${currentTheme}`);
        oldBtn.className = `theme-btn ${currentTheme}`
    }
    let newBtn = document.getElementById(`theme-btn-${theme}`)
    newBtn.className = `theme-btn ${theme} current`
    currentTheme = theme
    resetTheme()
}
changeTheme('light')
function resetTheme() {
    document.body.className = currentTheme
}
