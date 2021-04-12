//嘗試從box.js整理成一個函式
var bri = ["box1", "box2", "box3", "box4", "box5", "box6", "box7", "box8", "box9", "box10", "box11", "box12", "box13", "box14", "box15"];
var box_red = ["#box1", "#box2", "#box3", "#box4", "#box5", "#box6", "#box7", "#box8", "#box9", "#box10", "#box11", "#box12", "#box13", "#box14", "#box15"];





//遊戲開始時方塊位置隨機  
function boxsLeft() {
    var brLength = box_red.length;
    for (let i = 0; i < brLength; i++) {
        $(box_red[i]).css("left", parseInt(100 * Math.random()) + "%");
    }

    // $(box_red).each(function(){
    //     $(this).css("left", parseInt(100 * Math.random())+"%");          
    // });
    
    // $.each((box_red, function(){    
    //     console.log($(this));
    //     $(this).css("left", parseInt(100 * Math.random())+"%"); 
    // }));
}



//random最大最小值
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}




//掉落、碰撞、改rgb
function moveBoxRed(boxid, bri) {
    var y = parseInt($(boxid).css("top"));
    var box = document.getElementById(bri);
    if (s == 1) {
        y = y + 10;
        $(boxid).css("top", y + "px");

        if (y > 1000) {
            $(boxid).css("top", "-100px");
            $(boxid).css("left", parseInt(100 * Math.random()) + '%');
        }
        if (div1_plate.offsetLeft < box.offsetLeft + box.offsetWidth &&
            div1_plate.offsetLeft + div1_plate.offsetWidth > box.offsetLeft &&
            div1_plate.offsetTop < box.offsetTop + box.offsetHeight &&
            div1_plate.offsetHeight + div1_plate.offsetTop > box.offsetTop
        ) {
            $(boxid).css("top", "-100px");
            $(boxid).css("left", parseInt(100 * Math.random()) + '%');
            if ($(boxid).hasClass("red")) {
                r = r + parseInt(getRandomInt(10, 25));
                b = b - parseInt(10 * Math.random());
                g = g - parseInt(10 * Math.random());
            }
            if ($(boxid).hasClass("green")) {
                r = r - parseInt(10 * Math.random());
                b = b - parseInt(10 * Math.random());
                g = g + parseInt(getRandomInt(10, 25));
            }
            if ($(boxid).hasClass("blue")) {
                r = r - parseInt(10 * Math.random());
                b = b + parseInt(getRandomInt(10, 25));
                g = g - parseInt(10 * Math.random());
            }
            if ($(boxid).hasClass("black")) {
                r = r - parseInt(30 * Math.random());
                b = b - parseInt(30 * Math.random());
                g = g - parseInt(30 * Math.random());
            }
            if ($(boxid).hasClass("white")) {
                r = r + parseInt(30 * Math.random());
                b = b + parseInt(30 * Math.random());
                g = g + parseInt(30 * Math.random());
            }
            if ($(boxid).hasClass("gray")) {
                r = r + parseInt(20 * Math.random()) - parseInt(20 * Math.random());
                b = b + parseInt(20 * Math.random()) - parseInt(20 * Math.random());
                g = g + parseInt(20 * Math.random()) - parseInt(20 * Math.random());
            }
        }
    }
    if (s == 0) {
        $(boxid).css("top", "-100px");
        x = 300;
    }
}



function MoveBoxFor() {
    boxsLeft();
    setInterval("moveBoxRed(box_red[0],bri[0])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[1],bri[1])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[2],bri[2])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[3],bri[3])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[4],bri[4])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[5],bri[5])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[6],bri[6])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[7],bri[7])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[8],bri[8])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[9],bri[9])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[10],bri[10])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[11],bri[11])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[12],bri[12])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[13],bri[13])", parseInt(getRandomInt(20, 60)));
    setInterval("moveBoxRed(box_red[14],bri[14])", parseInt(getRandomInt(20, 60)));

}

