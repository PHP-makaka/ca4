var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image(50,50);
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

bird.src = "img/w2.png" ;

bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeUp.src = "img/pipeUp.png";
pipeBottom.src = "img/pipeBottom.png";
score=0;
var grav=1.5;
var gap=120;

var fly = new Audio();
var dio = new Audio();

fly.src = "audio/fly.mp3";
dio.src = "audio/00227.mp3";

// создание блоков

var pipe = [];
pipe[0]={
	x:cvs.width, 
	y:0
};
//при нажатии на какую нить копку
document.addEventListener("keydown", moveUp );
	function moveUp(){
		yPos-=35;
	}

//позиция птицы

var xPos=10;
var yPos=150;
function drow() {
	ctx.drawImage (bg, 0, 0);
	 for( var i=0;i <pipe.length;i++ ){
		ctx.drawImage (pipeUp, pipe[i].x, pipe[i].y);
		ctx.drawImage (pipeBottom, pipe[i].x,pipe[i].y + pipeUp.height+ gap);
	 	pipe[i].x--;
	 	 if(pipe[i].x==125){
	 	 	pipe.push({
	 	 		x:cvs.width,
	 	 		y:Math.floor(Math.random()*pipeUp.height)-pipeUp.height
	 	 	})
	 	 }
	 	 	if(xPos + bird.width >= pipe[i].x
 				&& xPos <= pipe[i].x + pipeUp.width&& 
 				(yPos <= pipe[i].y + pipeUp.height|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
 				|| yPos + bird.height >= cvs.height - fg.height) 
	 	 		{

	 	 			fly.pause();
	 	 			dio.play();
	 	 			location.reload();
	 			 	alert("ВЫ ДАУН! СО СЧЁТОМ СЫЧА= "+score)
	 	 			break;
				};
				if(pipe[i].x==5){
					
					score++;
					
				}

	 }
	ctx.drawImage (fg, 0, cvs.height - fg.height );
	ctx.drawImage (bird, xPos, yPos,50,50);
	yPos += grav;
	ctx.font="24px Veranda";
	ctx.fillText("СЫЧ СЧЁТ= "+score,10,cvs.height - 20);
	fly.play();
	requestAnimationFrame(drow)
};
pipeBottom.onload = drow;
