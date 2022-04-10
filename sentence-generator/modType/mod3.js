let adjConfig = [], organConfig = [], actionConfig = [];

let gender = ['M', 'F', 'A'];
let position = ['T', 'B', 'S'];
let attribute = [
    { id: 1, val: '正經' },
    { id: 2, val: '溫柔' },
    { id: 3, val: '銅牆鐵壁' },
    { id: 4, val: '威嚴' },
    { id: 5, val: '外向' },
    { id: 6, val: '內向' },
    { id: 7, val: 'ㄎㄧㄤ' },
    { id: 8, val: '成熟' },
    { id: 9, val: '童趣' },
    { id: 10, val: '機車' },
    { id: 11, val: '冷漠' },
    { id: 12, val: '厚臉皮' },
    { id: 13, val: '天然' },
    { id: 14, val: '元氣' },
    { id: 15, val: '驕傲' },
    { id: 16, val: '木頭' },
    { id: 99, val: '無限制' },
];
let sentenceType = [
    { id: 1, val: '正常' },
    { id: 2, val: 'R18' },
    { id: 3, val: '特殊' },
    { id: 99, val: '全部' },
]
let currentSentenceType;



let topPerson = {
    name: '',
    gender: 'M',
    position: 'T',
    attribute: ['2', '8']
}
let bottomPerson = {
    name: '',
    gender: 'M',
    position: 'B',
    attribute: ['2', '8']
}


function mod3Sentence() {
    topPerson.name = document.getElementById('topPerson').value
    bottomPerson.name = document.getElementById('bottomPerson').value
    if (!topPerson || !bottomPerson) {
        return
    }

    let mainBox = document.getElementById("main-box");
    mainBox.innerText = '';
    if (!adjConfig.length || !organConfig.length || !actionConfig.length) {
        mainBox.innerHTML = 'Incomplete conditions, please add options.';
        return
    }

    let sentence = '';
    let personList = [topPerson, bottomPerson];
    let firstPerson = getRandomItem(personList);
    let lastPerson = personList.find(t => t !== firstPerson);
    let adjList = filterAdj(firstPerson, adjConfig);
    console.log('adjList', adjList)
    let adjObj = getRandomItem(adjList);
    let organList = filterOrgan(lastPerson, organConfig);
    console.log('organList', organList)
    let organObj = getRandomItem(organList);
    let actionList = filterAction(firstPerson, actionConfig, organObj);
    console.log('actionList', actionList)
    let actionObj = getRandomItem(actionList);
    let newRow = document.createElement('span');
    sentence = adjObj.adjective + firstPerson.name + actionObj.adposition + lastPerson.name + '的' +  organObj.organ + actionObj.action
    newRow.innerHTML = sentence;
    mainBox.appendChild(newRow);
}

function filterAdj(person, config) {
    return config.filter(t =>
        filterSentenceType(t.sentenceType)
        && (!t.gender || t.gender === person.gender || person.gender === 'A')
        && (!t.position || t.position === person.position || person.position === 'S')
        && filterAdjAttributes(person, t.attribute)
    )
}

function filterOrgan(person, config) {
    return config.filter(t =>
        filterSentenceType(t.sentenceType)
        && (!t.gender || t.gender === person.gender || person.gender === 'A')
        && (!t.position || t.position === person.position || person.position === 'S')
    )
}

function filterAction(person, config, organObj) {
    return config.filter(t =>
        filterSentenceType(t.sentenceType)
        && (!t.gender || t.gender === person.gender || person.gender === 'A')
        && (!t.position || t.position === person.position || person.position === 'S')
        && (getOrganFilterConfigList(t.organ, organObj.organ_id))
    )
}

function filterSentenceType(consult) {
    if (currentSentenceType === '99' || !consult) {
        return true
    } else {
        consult = consult.toString()
        return consult.indexOf(currentSentenceType) !== -1
    }
}

function filterAdjAttributes(person, config) {
    if (!config || person.attribute === '99') {
        return true
    } else if (config.indexOf('not') !== -1) {
        config = config.replace("not ", "");
        let list = config.split(",");
        let filterList = []
        filterList = list.filter(x => person.attribute.includes(x))
        return !filterList.length
    } else if (config.length) {
        let list = config.split(",");
        let filterList = []
        filterList = list.filter(x => person.attribute.includes(x))
        return !!filterList.length
    } else {
        return true
    }
}

function getOrganFilterConfigList(data, consult) {
    if (data.indexOf('not') !== -1) {
        data = data.replace("not ", "");
        let list = data.split(",");
        return !list.find(t => t == consult)
    } else if (data.length) {
        let list = data.split(",");
        return !!list.find(t => t == consult)
    } else {
        return true
    }
}

function changeCurrentSentenceType(index) {
    if(currentSentenceType){
        let oldBtn = document.getElementById(`sentence-btn-${currentSentenceType}`);
        oldBtn.className = 'btn sentence-type-btn';
    }
    let newBtn = document.getElementById(`sentence-btn-${index}`);
    newBtn.className = 'btn sentence-type-btn current';
    currentSentenceType = index;
}
changeCurrentSentenceType('1');

function changeCurrentGender(position, gender){
    if(position === 'top'){
        let oldBtn = document.getElementById(`gender-btn-top-${topPerson.gender}`);
        oldBtn.className = 'btn gender-btn';
        let newBtn = document.getElementById(`gender-btn-top-${gender}`);
        newBtn.className = 'btn gender-btn current';
        topPerson.gender = gender;
    }else{
        let oldBtn = document.getElementById(`gender-btn-bottom-${bottomPerson.gender}`);
        oldBtn.className = 'btn gender-btn';
        let newBtn = document.getElementById(`gender-btn-bottom-${gender}`);
        newBtn.className = 'btn gender-btn current';
        bottomPerson.gender = gender;
    }
}

changeCurrentGender('top', topPerson.gender);
changeCurrentGender('bottom', bottomPerson.gender);

jqAjaxRead({
    method: 'read',
    table: 'adjective'
}).then(res => {
    adjConfig = res
    console.log('adjective', res)
})
jqAjaxRead({
    method: 'read',
    table: 'organ'
}).then(res => {
    organConfig = res
    console.log('organ', res)
})
jqAjaxRead({
    method: 'read',
    table: 'action'
}).then(res => {
    actionConfig = res
    console.log('action', res)
})

