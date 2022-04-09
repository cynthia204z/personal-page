
const API_URL = 'https://script.google.com/macros/s/AKfycbypeQ8Gx2Hyh_GjuM8V3zkXZU6v-pWvuCbMv4QH30_aAEzbvFJ2/exec';

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

function jqAjaxRead(data) {
    return $.ajax({
        type: 'post',
        url: API_URL,
        data: data,
    })
}
