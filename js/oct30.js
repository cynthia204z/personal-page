
var s = 0;

var btnStart = document.getElementById("btn-start");
var startbox = document.getElementById("startBox");
var mytimeline = document.getElementById("TimeLine");
var plate = document.getElementById("plate");
var tlb = document.getElementById("tlb");
var ready = document.getElementById("ready");
var go = document.getElementById("go");
var timeup = document.getElementById("timeup");
var myname = document.getElementById("myname");
var div1_plate = document.getElementById("div1");;






//↓跟隨鼠標移動
function move() {
    function getPos(ev) {
        // var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
        return {
            x: ev.clientX + scrollLeft,
            // y:ev.clientY+scrollTop
        }
    }
    var ddiv = document.getElementsByClassName("div");
    document.onmousemove = function (ev) {
        let ddEvent = ev;
        let pos = getPos(ddEvent);
        for (let i = ddiv.length - 1; i > 0; i--) {
            ddiv[i].style.left = ddiv[i - 1].offsetLeft + 'px';
        }
        ddiv[0].style.left = pos.x + 'px';
    }
   
}



// var link_col = $(changeColor[k]).css("color"); 
// alert(link_col); 

//跳過遊戲
function gotoIntro() {
    s = 0;
    // $(".mcb-btn").css("color","#353F66");
    $("#goto-intro, #startBox, #goto-intro, .rg, .menuContentBox").css("display", "none");
    $(".mcb-btn").css("display", "block");
    // $("#skip").css("display","none");
    $(function () {
        $(".content").animate({ "height": "100%" }, 500);
        $("#startBox").animate({ "height": "0%" }, 500);
        $(".mcb-btn").animate({ "opacity": "1" }, 500);
    });
    $(function () {
        $(".content").delay(300).animate({ "width": "80%" }, 500);
        $(".mcb-btn").delay(300).animate({ "width": "25%" }, 500);

    });
    // alert("uwu");
    // CB.style.display="none";
}
function STOP() {
    s = 0;
    $("#goto-intro").css("display", "none");
    $("#skip").css("display", "none");
    timeup.style.display = "inline-block";
    anime.timeline()//Time's up動畫
        .add({
            targets: '.ml15 #timeup',
            scale: [5, 1],
            opacity: [0, 1],
            easing: "easeOutCirc",
            duration: 800,
            delay: (el, i) => 800 * i
        })
        .add({
            targets: '#timeup, #tlb, #plate',
            opacity: 0,
            duration: 800,
            easing: "easeOutExpo",
            delay: 800
        });
    clearInterval(timer);

    var clearRG = setInterval(function () {
        $(".rg").css("display", "none");
        clearInterval(clearRG);
        anime.timeline()
            .add({
                targets: '.ml16 .letter',
                translateY: [-200, 0],
                easing: "easeOutExpo",
                duration: 1400,
                delay: (el, i) => 30 * i
            });
        $("#myname").css("display", "block");
    }, 1600);
    // document.getElementById("menutitle").style.top = "-10%";
    // document.getElementById("menutitle").style.height = "41%";
    $(".menuContentBox").css("display", "none");
    $(".mcb-btn").css("display", "block");
    $("#startBox").css("display", "none");
    // $("#skip").css("display","none");
    // $("#retry").css("display","block");

    $(function () {
        $(".content").animate({ "height": "100%" }, 500);
        $("#startBox").animate({ "height": "0%" }, 500);
        $(".mcb-btn").animate({ "opacity": "1" }, 500);
    });
    $(function () {
        $(".content").delay(500).animate({ "width": "80%" }, 500);
        $(".mcb-btn").delay(500).animate({ "width": "25%" }, 500);
        // $("#retry").delay(500).animate({ "left": "0%" }, 500);
    });

    // alert("uwu");
    // CB.style.display="none";
}


$("#skip").mouseup(function () {
    STOP();
})






$(function () {
    if (s == 0) {
        $("#btn-start").mouseover(function () {
            $("#startBox").animate({ "height": "25%" }, 400);
            startbox.style.backgroundColor = "rgb(222,80,4)";
            $("#btn-start").css("color", "rgb(236,215,168)");
        })
        $("#btn-start").mouseout(function () {
            $("#startBox").animate({ "height": "10%" }, 100);
            startbox.style.backgroundColor = "rgb(222,80,4)";
            $("#btn-start").css("color", "rgb(255,162,23)");
        })
        $("#btn-start").mousedown(function () {
            startbox.style.backgroundColor = "rgb(53,62,101)";
            startbox.style.height = "25%";
            $("#btn-start").css("color", "rgb(98,108,37)");
        })
        $("#goto-intro-btn").mouseover(function () {
            $("#goto-intro").animate({ "height": "25%" }, 400);
            $("#goto-intro").css("backgroundColor", "rgb(98,108,37)");
            // $("#btn-start").css("color", "#ECD7A9");
        })
        $("#goto-intro-btn").mouseout(function () {
            $("#goto-intro").animate({ "height": "10%" }, 100);
            $("#goto-intro").css("backgroundColor", "rgb(98,108,37)");
            // $("#btn-start").css("color", "#FFA218");
        })
        $("#goto-intro-btn").mousedown(function () {
            $("#goto-intro").css("backgroundColor", "rgb(255,162,23)");
            $("#goto-intro").css("height", "25%");
            // $("#btn-start").css("color", "#636C24");
        })
        $("#goto-intro-btn").mouseup(function () {
            gotoIntro();
        })
    }
})

function PLAY() {
    s = 1;
    // function START() {
    // startbox.style.backgroundColor = "#353F66"
    // startbox.style.height = "0%";
    $("#goto-intro-btn").css("display", "none");
    $("#goto-intro").css("z-index", "1");
    btnStart.style.display = "none";
    startbox.style.zIndex = "1";
    startbox.style.height = "25%";
    $(function () {
        $(".content").delay(400).animate({ "height": "100%" }, 500);
    });
    $(function () {
        $(".content").delay(800).animate({ "width": "100%" }, 500);
        // $("#startBox").delay(800).animate({ "height": "100%" }, 500);
    });
    myname.style.display = "none";
    ready.style.display = "inline-block";
    anime.timeline()//ready動畫
        .add({
            targets: '.ml15 #ready',
            scale: [5, 1],
            opacity: [0, 1],
            easing: "easeOutCirc",
            duration: 700,
            delay: (el, i) => 700 * i
        })
        .add({
            targets: '.ml15 #ready',
            opacity: 0,
            duration: 700,
            easing: "easeOutExpo",
            delay: 700
        });

    var WW = setInterval(function () {//Go動畫
        go.style.display = "inline-block";
        anime.timeline()
            .add({
                targets: '.ml15 #go',
                scale: [5, 1],
                opacity: [0, 1],
                easing: "easeOutCirc",
                duration: 700,
                delay: (el, i) => 700 * i
            })
            .add({
                targets: '.ml15 #go',
                opacity: 0,
                duration: 700,
                easing: "easeOutExpo",
                delay: 700
            });
        clearInterval(WW);


        var all = setInterval(function () {
            MoveBoxFor();

            plate.style.display = "block";//進度條與盤子出現
            move();
            tlb.style.display = "block";
            let w = 100;//倒計時進度條
            let timelineTimer = setInterval(function () {
                w -= 0.25;
                mytimeline.style.width = w + "%";
                if (s == 0) clearInterval(timelineTimer);
                if (w == 0) clearInterval(timelineTimer);
            }, 40);

            timer = setInterval("STOP()", 16500);//計時時間
            clearInterval(all);
            $("#skip").css("display", "block");
        }, 1700)
    }, 1700);
    // CB.innerHTML=combo;
    // }
    changeRGB();
}

$("#btn-start").mouseup(function () {
    PLAY();
});




//選單選像跳出視窗
$("#btn-box1").mouseup(function () {
    $("#back").css("display", "block");
    $("#intro-content-1").css("display", "block");
    $("#close-btn").css("display", "block");
    anime.timeline()
        .add({
            targets: '#intro-title-1',
            translateX: [-200, 0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        });
});
$("#btn-box2").mouseup(function () {
    $("#intro-content-2").css("display", "block");
    $("#back").css("display", "block");
    $("#close-btn").css("display", "block");
    anime.timeline()
        .add({
            targets: '#intro-title-2',
            translateX: [-200, 0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        });
});
$("#btn-box3").mouseup(function () {
    $("#intro-content-3").css("display", "block");
    $("#back").css("display", "block");
    $("#close-btn").css("display", "block");
    anime.timeline()
        .add({
            targets: '#intro-title-3',
            translateX: [-200, 0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        });
});
$("#btn-box4").mouseup(function () {
    $("#intro-content-4").css("display", "block");
    $("#back").css("display", "block");
    $("#close-btn").css("display", "block");
    anime.timeline()
        .add({
            targets: '#intro-title-4',
            translateX: [-200, 0],
            easing: "easeOutExpo",
            duration: 1400,
            delay: (el, i) => 30 * i
        });
});
//關閉
$("#close-btn").mousedown(function () {
    $(".intro-content").css("display", "none");
    $("#back").css("display", "none");
    $("#close-btn").css("display", "none");
});
function closeIntroContent() {
    $(".intro-content").css("display", "none");
    $("#back").css("display", "none");
    $("#close-btn").css("display", "none");
};
//{loop: true}
var textWrapper = document.querySelector('.ml16');  //名字
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
anime.timeline()
    .add({
        targets: '.ml16 .letter',
        translateY: [-200, 0],
        easing: "easeOutExpo",
        duration: 1400,
        delay: (el, i) => 30 * i
    });




var r = 0, g = 0, b = 0;





var changeBGcolor = ["#all-content", "#div1", "#TimeLine", "#tlb", ".content", "#menutitle", ".mcb-btn", "#skip", ".mcb-btn:hover"];//9
var changeBGcolor_r = [255, 255, 222, 236, 53, 53, 53, 98, 98];
var changeBGcolor_g = [162, 162, 80, 215, 62, 62, 62, 108, 108];
var changeBGcolor_b = [23, 23, 4, 168, 101, 101, 101, 37, 37];
var changeColor = [".letter", ".mcb", ".mcb-btn", "#skip", ".aboutme-info", ".mcb-btn:hover", "p font"];//7
var changeColor_r = [255, 53, 255, 236, 236, 236, 255];
var changeColor_g = [162, 62, 162, 215, 215, 215, 162];
var changeColor_b = [23, 101, 23, 168, 168, 168, 23];

//換顏色
var rr, gg, bb, rrr, ggg, bbb;
setInterval("changeRGB()", 50);
function changeRGB() {
    var cbgc = changeBGcolor.length;
    for (let i = 0; i < cbgc; i++) {
        rr = changeBGcolor_r[i] + r;
        gg = changeBGcolor_g[i] + g;
        bb = changeBGcolor_b[i] + b;
        var RGBNow = "rgb(" + rr + "," + gg + "," + bb + ")";


        $(changeBGcolor[i]).css("backgroundColor", RGBNow);
    };

    var cc = changeColor.length;
    for (let k = 0; k < cc; k++) {
        rrr = changeColor_r[k] + r;
        ggg = changeColor_g[k] + g;
        bbb = changeColor_b[k] + b;
        var RGBNow = "rgb(" + rrr + "," + ggg + "," + bbb + ")";

        $(changeColor[k]).css("color", RGBNow);
    }

};