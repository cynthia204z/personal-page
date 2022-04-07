listCollection.mod1 = {
    person: ['KAITO', '神代類', 'P助', '工讀生', '阿嬤'],
    place: ['草叢裡', '巨人肩上', '召喚峽谷', '國際太空站', '空無一人的世界裡', '天馬家', '紅樹林', '墾丁', '總統大選開票所', '三更半夜裡', '摩天輪包廂裡', '警車車底', '玫瑰浴池裡', '婦產科病房裡', '世界末日前一天'],
    action: ['寫程式', '飆高音', '開直播', 'PK', '跳PPAP', '打麻將', '舞龍舞獅', '種菜', '炎上', '召喚青眼白龍', '覆蓋一張陷阱卡', '吃滷味', '吹直笛', '居家隔離', '甩雙節棍', '划龍舟', '禱告', '肇事逃逸', '建立信賴關係']
};
let mod1Lists = listCollection.mod1;

let rowIndex = 0;
function mod1Sentence() {
    let mainBox = document.getElementById("main-box");
    if (!mod1Lists.person.length || !mod1Lists.place.length || !mod1Lists.action.length) {
      mainBox.innerHTML = 'Incomplete conditions, please add options.';
      return
    }
    if (rowIndex === 0) {
      mainBox.innerText = '';
    }
    let sentence = '';
    let personNum = document.getElementById('personNum').value;
    if (!personNum || personNum > mod1Lists.person.length) {
      personNum = mod1Lists.person.length
    }
    let personCount = getRandom(1, personNum);
    let person1 = getRandomItem(mod1Lists.person)
    sentence += person1;
    if (personCount > 1) {
      let hasWho = [person1]
      for (let i = 0; i < personCount - 1; i++) {
        let newperson = mod1Lists.person.filter(t => hasWho.indexOf(t) === -1);
        let person = getRandomItem(newperson);
        hasWho.push(person)
        sentence += '和' + person
      }
    }
    sentence += '在' + getRandomItem(mod1Lists.place)
    if (mod1Lists.action.length > 1) {
      let actionCount = getRandom(1, 2);
      if (actionCount > 1) {
        let action1 = getRandomItem(mod1Lists.action);
        let newaction = mod1Lists.action.filter(t => t !== action1);
        sentence += `邊${action1}邊${getRandomItem(newaction)}`
      } else {
        sentence += getRandomItem(mod1Lists.action);
      }
    } else {
      sentence += getRandomItem(mod1Lists.action);
    }
    let newRow = document.createElement('span');
    newRow.innerHTML = sentence + '<br>';
    mainBox.appendChild(newRow);
  }