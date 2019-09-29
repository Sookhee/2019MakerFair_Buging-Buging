var width = 1500, height = 720, range = 100;
var player = {x: 450, y: 225, width: 200, height: 200, val:2};
var enemy = {x: 0, y: 0, width: 200, height: 200, val:1};
var score = 0, count = 0, key = [];
var canvas = document.createElement("canvas");
canvas.width = width;
canvas.height = height;
canvas.style.border = "1px solid black";
var context = canvas.getContext("2d");

// 배경 이미지
var backgroundImg = new Image();
backgroundImg.src="./images/background.jpg";
var playerImg = new Image();

// Aim & 버그 이미지
playerImg.src="./images/aim.png";
var enemyImg1 = new Image();
enemyImg1.src="./images/bug1.png";
var enemyImg2 = new Image();
enemyImg2.src="./images/bug2.png";
var enemyImg3 = new Image();
enemyImg3.src="./images/bug3.png";
var enemyImg4 = new Image();
enemyImg4.src="./images/bug4.png";
var enemyImg5 = new Image();
enemyImg5.src="./images/bug5.png";
var enemyImg6 = new Image();
enemyImg6.src="./images/bug6.png";
var enemyImgs=[enemyImg1, enemyImg2, enemyImg3, enemyImg4, enemyImg5, enemyImg6];
var enemyName=["ArrayIndexOutOfBoundsException", "NumberFormatExcpeion", "NullPointException", "OutOfMemoryException"];

// 사운드
var deadSound = new Audio("sounds/shoot.mp3");
var audio = new Audio('./sounds/bgm.mp3');


var ranNum = 0;
var count = 0;
var timeCount = 300;
var timeConuter = setInterval(timer, 100);
document.body.appendChild(canvas);

// Main
setInterval(function(){
  audio.play(); 
  for(var i = 0; i < 20; i++){
    update();
    draw();
  }
},100)


//시간제한
function timer(){
  timeCount--;
  if(timeCount <= -1){
    alert("GAME OVER!");
    timeCount=100;
    score=0;
  }
}


// 난수 생성
function makeRandom(min, max){
    var RandVal = Math.floor(Math.random()*(max-min+1)) + min;
    return RandVal;
}


// 이미지 출력
function draw(){
  context.save();
  context.drawImage(backgroundImg, 0, 0, width, height);
  // context.fillRect(0,0,width,height);
  context.fillStyle = "red";
  // context.fillRect(enemy.x-enemy.width/2,enemy.y-enemy.height/2,enemy.width,player.height);
  // context.drawImage(playerImg, player.x, player.y, player.width, player.height);
  // context.fillRect(player.x-player.width/2,player.y-player.height/2,player.width,player.height);
  context.fillStyle = "rgba(140, 140, 200, 0.6)";
   context.fillRect(0,0,width,150);
  context.font = "40px Arial";
  context.fillStyle = "white";
  context.fillText("Score: "+score,30,60);
  context.font = "40px Arial";
  context.fillStyle = "white";
  context.fillText("Time: "+timeCount,30,120);
  context.font = "40px Arial";
  context.fillStyle = "white";
  context.fillText("mouseX: "+mouseX,1200,60);
  context.font = "40px Arial";
  context.fillStyle = "white";
  context.fillText("mouseY: "+mouseY,1200,120);
  context.font = "40px Arial";
  context.fillStyle = "white";
  context.fillText("bugX: "+enemy.x,500,60);
  context.font = "40px Arial";
  context.fillStyle = "white";
  context.fillText("bugY: "+enemy.y,500,120);
  context.restore();

  var r1 = makeRandom(-2, 2);
  context.drawImage(enemyImgs[ranNum], enemy.x+r1, enemy.y+r1, enemy.width+r1, enemy.height+r1);
  
  var r = makeRandom(-2, 2);
  context.strokeStyle = "white";
  context.lineWidth =3;
  context.strokeRect(enemy.x+range/2-2+r,enemy.y+range/2-2+r,range+r,range+r);
  context.strokeStyle = "red";
  context.lineWidth =3;
  context.strokeRect(enemy.x+range/2+r,enemy.y+range/2+r,range+r,range+r);
  context.font = "14px Arial";
  context.fillStyle = "white";
  context.fillText(enemyName[ranNum],enemy.x+range/2-20-1+r,enemy.y+range/2+120-1+r);
  context.font = "14px Arial";
  context.fillStyle = "red";
  context.fillText(enemyName[ranNum],enemy.x+range/2-20+r,enemy.y+range/2+120+r);
}

// 충돌 검사
function update(){
  // if(mouseX >= enemy.x-range && mouseX <= enemy.x+range && mouseY >= enemy.y-range && mouseY <= enemy.y+range ){
  //   enemy.y = 0;
  //   deadSound.play();
  //   score++;
  //   ranNum = makeRandom(0, 3);
  // }
  if(enemy.y > height || enemy.y < -100){
    for(;;){
      enemy.x = Math.ceil(Math.random()*width);
      var diffX = enemy.x-mouseX;
      if(diffX < 0) diffX=diffX*(-1);
      if(diffX > 200 && enemy.x > 150 && enemy.x < width-150) break;
    }
    enemy.y = Math.ceil(Math.random()*height);
    if(enemy.y < height/2) {enemy.val = 0.5;
    }else {enemy.val = -0.7;}
  }
  if(key[37]&&player.x-player.width/2>0) player.x -= player.val;
  if(key[38]&&player.y-player.height/2>0) player.y -= player.val;
  if(key[39]&&player.x+player.width/2<width) player.x += player.val;
  if(key[40]&&player.y+player.height/2<height) player.y += player.val;
  enemy.y += enemy.val;
  enemy.val += 0.00001;
  enemy.y += makeRandom(-5, 5);
  enemy.x += makeRandom(-5, 5);
}


window.addEventListener("keydown", function(e){
  key[e.keyCode] = true;
});
window.addEventListener("keyup", function(e){
  key[e.keyCode] = false;
});

var mouseX = 0;
var mouseY = 0;

function getMousePosition(e){
    var eObj = window.event? window.event : e; // IE, FF 에 따라 이벤트 처리 하기
    mouseX = (eObj.clientX)-120;
    mouseY = (eObj.clientY + document.documentElement.scrollTop)-120; // 화면을 스크롤 했을때를 위한 처리 (스크롤 한 만큼 마우스 Y좌표에 + )
    // documentElement 가 안된다면 body 바꿔야 한다. 크롬의 경우.. (자동파악 로직 필요)
}

function moveImg(){
    // 이미지 위치 파악하기
    
    var m_x = parseInt(document.getElementById('img1').style.left.replace('px', ''));
    var m_y = parseInt(document.getElementById('img1').style.top.replace('px', ''));

    // 이미지 움직이기
    document.getElementById('img1').style.left = Math.round(m_x + ((mouseX - m_x) / 5))+makeRandom(-1, 1) + 'px';
    document.getElementById('img1').style.top = Math.round(m_y + ((mouseY - m_y) / 5))+makeRandom(-1, 1) + 'px';

    // 부드럽게 따라오는 공식 대략..
    // 현재 이미지위치 = 현재이미지 위치 + (이미지 위치기준 마우스 커서 위치 / 적절한 나누기 값)
    // 반복 처리 해주면 됩니다.
    
    // ※ 이미지 위치 기준 마우스 커서 위치란?
    // 이미지를 기준으로 그 이미지에서 커서가 얼마나 떨어져 있는지 여부
}

document.onmousemove = getMousePosition; // 마우스가 움직이면 getMousePosition 함수 실행
setInterval("moveImg()", 2); // moveImg 함수 반복 실행하여 이미지 움직이기