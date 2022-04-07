
let listCollection = {
    mod1: undefined,
    mod2: undefined,
    mod3: undefined,
    modself: undefined,
}

function getRandomItem(list) {
    let index = Math.floor(Math.random() * list.length);
    return list[index];
}
function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}