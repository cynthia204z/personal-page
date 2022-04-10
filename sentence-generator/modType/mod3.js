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

// jqAjaxRead({
//     method: 'read',
//     table: 'adjective'
// }).then(res => {
//     adjConfig = res
//     console.log('adjective', res)
// })
// jqAjaxRead({
//     method: 'read',
//     table: 'organ'
// }).then(res => {
//     organConfig = res
//     console.log('organ', res)
// })
// jqAjaxRead({
//     method: 'read',
//     table: 'action'
// }).then(res => {
//     actionConfig = res
//     console.log('action', res)
// })






// listCollection.mod3 = {
//     adjective: ['穿兔女郎裝的', '穿燕尾服的', '穿女僕裝的', '驕傲的', '充滿決心的', '困惑的', '痛苦的', '困擾的', '擔憂的', '臉色蒼白的', '疲倦的', '憂鬱的', '鬱悶的', '惱羞成怒的', '心情愉悅的', '歇斯底里的', '瘋狂的', '耍帥的', '裝可愛的', '認真的', '失落的', '無奈的', '酒測值超標的', '帶著迷人微笑的', '取得勝利的', '剛被阿嬤罵完的', '哄睡孩子後的', '內心的小宇宙大爆發的', '縮小的', '十年後的', '憔悴的', '滿臉笑容的', '嬌羞的', '冷漠的', '面無表情的', '喝醉的', '害羞的', '無聊的', '興奮的', '猶豫不決的', '神智不清的', '語無倫次的', '慵懶的', '手舞足蹈的', '開心的', '面露猙獰的', '忌妒的', '心情複雜的', '淚流滿面的', '大爆哭的', '悲傷的', '心疼的', '生氣的', '憤恨的', '性感的', '冷淡的', '通宵完的', '精神振奮的', '滿心期待的', '精力充沛的', '心狠手辣的', '內心小鹿亂撞的', '無動於衷的', '覺得未來充滿希望的', '絕望的', '做好覺悟的', '失去耐心的', '衝動的', '凶狠的', '狼狽的', '溫柔的', '很久很久以後的', '睡著了的', '滿腦子黃色廢料的', '激渴難耐的', '委屈的', '心不甘情不願的', '無言以對的', '衣衫不整的', '喘息不止的', '小心翼翼的', '失神的', '心不在焉的', '1'],
//     organs: ['手心', '指尖', '手背上', '頸側', '肩膀上', '臉頰上', '額頭上', '腳底', '腳背上', '背上', '頭頂', '後腦杓', '耳朵上', '鼻尖', '嘴唇上', '胸前', '肚臍上方', '大腿上', '腳踝上', '股間', '臀尖', '鎖骨上', '墓碑上', '下腹', '衣服上', '褲子上', '腰側', '床上', '內褲上', '枕頭上', '後頸', '下巴上', '髖骨上', '手腕上', '手臂上', '小腿上', '腳趾縫', '膝蓋上', '腋下', '鬢角', '腿根', '人魚線上', '牙齒上'],
//     actionCP: ['抹了點肥皂泡泡', '擦了藥膏', '加了點香菜和醬油膏', '貼了一塊撒隆巴斯', '寫上了自己的名字', '貼了一堆閃亮貼紙', '用指尖畫了一朵花', '留下一排牙印', '盯著看了很久', '摸了兩把', '揉了揉', '戳了一下', '拍了一掌', '咬了一口', '流口水', '滴下一滴淚水', '貼上查封封條', '捏了一下', '貼了OK繃', '舔了一口', '纏了一段紅線', '親了一下', '抹開剛沾上的液體', '留下記號', '抹了點精油', '埋頭猛聞', '深吸一口氣', '吹氣', '摩娑', '輕吻', '留下吻痕', '留下自己的氣味', '刺了個精忠報國', '打翻了一罐養樂多', '擠了一大坨奶油']
// };
// let mod3Lists = listCollection.mod3;

// function mod3Sentence() {
//     topPerson = document.getElementById('topPerson').value
//     bottomPerson = document.getElementById('bottomPerson').value
//     if(!topPerson || !bottomPerson) {
//       return
//     }

//     let mainBox = document.getElementById("main-box");
//     if (!mod3Lists.adjective.length || !mod3Lists.organs.length || !mod3Lists.actionCP.length) {
//       mainBox.innerHTML = 'Incomplete conditions, please add options.';
//       return
//     }
//     if (rowIndex === 0) {
//       mainBox.innerText = '';
//     }

//     let sentence = '';
//     let personList = [topPerson, bottomPerson];
//     let firstPerson = getRandomItem(personList);
//     let lastPerson = personList.find(t=>t!==firstPerson);
//     sentence += getRandomItem(mod3Lists.adjective)
//     + firstPerson + '在' + lastPerson + '的' + getRandomItem(mod3Lists.organs) + getRandomItem(mod3Lists.actionCP)
//     let newRow = document.createElement('span');
//     newRow.innerHTML = sentence;
//     mainBox.appendChild(newRow);
// }
