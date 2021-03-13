//vue.jsのでバックをchromeで使えるように
Vue.config.devtools = true;

//ビンゴで使う数字のマックスを設定
function numMax(Max_num){
    var bingo_num=[];
    for(var i=1;i<=Max_num;i++){
        bingo_num.push(i);
    }
    return bingo_num;
}
//console.log(numMax(75));
var bingo_num=numMax(75);


//変数のデバッグに使う関数
function dev_console(variable){
    console.log(variable);
}

var initial="?";
var record_num=[];
var interval;

//music設定
var audio_drm=new Audio();
audio_drm.src="music/doramuroll.mp3";
var audio_kti=new Audio();
audio_kti.src="music/ketteionn.mp3";

var app=new Vue({
    el:"#app",
    data:{
        num:initial,
        records:record_num
    },
    methods:{
        start:function(){
            //数字が変わる演出
            audio_kti.pause();
            audio_kti.currentTime=0;
            audio_drm.play();
            interval=setInterval(()=>{
            this.num=bingo_num[Math.floor(Math.random()*bingo_num.length)];
            },400);
        },
        stop:function(){
            clearInterval(interval); 

            audio_drm.pause();
            audio_kti.play();
            audio_drm.currentTime=0;

            this.num=bingo_num[Math.floor(Math.random()*bingo_num.length)];
            record_num.push(this.num);
            var delete_index=bingo_num.indexOf(this.num);
            bingo_num.splice(delete_index,1);
            //dev_console(bingo_num);
        }
    }
});