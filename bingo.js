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
//マックス値の初期値75を入れておく
var Max_num=75;
var bingo_num=numMax(Max_num);


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

var display_cout=0;
//ビンゴスタート後maxの値を変えれないようにするため
var start_count=0;

var app=new Vue({
    el:"#app",
    data:{
        num:initial,
        records:record_num,
        max:75,
        menu_name:"設定",
        displayChange:"none",
    },
    methods:{
        start:function(){
            start_count=1;
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
        },
        settingDisplay:function(){
            if(display_cout==0){
                this.displayChange="block";
                this.menu_name="閉じる";
                display_cout=1;
            }else{
                this.displayChange="none";
                this.menu_name="設定";
                display_cout=0;
            }
        },
        maxInput:function(){
            if(isNaN(this.max)){
                alert("半角の数値を入力してください");
                this.max=Max_num;
            }
            if(start_count==0){
                Max_num=this.max;
                bingo_num=numMax(Max_num);
                dev_console(this.max);
                //dev_console(bingo_num);
            }else{
                alert("ビンゴスタート後には変更できません");
                this.max=Max_num;
            }
            
        }
        
    }
});