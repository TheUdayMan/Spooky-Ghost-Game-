var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"


function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  ghostJumpingImg = loadImage("ghost-jumping.png");
  spookySound = loadSound("spooky.wav");

}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;

  ghost = createSprite(300,300);
  ghost.scale = 0.4;
  ghost.addImage("standing",ghostImg);
  ghost.addImage("jumping",ghostJumpingImg);
  ghost.velocityY=(5);
    
  doorsGroup= new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();

}

function draw() {
  background(200);
  drawSprites();
  if(gameState=="play"){
    if(tower.y > 400){
      tower.y = 300
    }
  if(keyDown("left_arrow")){
    ghost.x=ghost.x-6;
  }
  if(keyDown("right_arrow")){
    ghost.x=ghost.x+6;
  }
  if(keyDown("space")){
    ghost.velocityY=-6;
    ghost.changeImage("jumping");
  }
  ghost.velocityY+=0.5;
  spawnObstacles();

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost) || ghost.y>=600){
    ghost.destroy();
    gameState = "end";
  } 
  }

    if(gameState == "end"){
    fill("Black");
    textSize(50);
    text("Game Over!",180,310);
    tower.velocityY=0;

  }


  }

  function spawnObstacles(){
  if(frameCount%120==0){
  door=createSprite(10,50,10,10); 
  door.addImage(doorImg);
  door.x=Math.round(random(100,500))
  door.velocityY=2.5;
  
  climber=createSprite(10,10,10,10);
  climber.addImage(climberImg);
  climber.x=door.x;
  climber.y=door.y+60;
  climber.velocityY=2.5;

  invisibleBlock = createSprite(climber.x,climber.y+10,85,10);
  invisibleBlock.velocityY=2.5;
  invisibleBlock.visible=false;

  door.lifetime=600/2.5;
  climber.lifetime=600/2.5;

  ghost.depth=door.depth+1;
  door.depth=1;
  climber.depth=1;
  
  invisibleBlockGroup.add(invisibleBlock);
  climbersGroup.add(climber);
  doorsGroup.add(door);

  spookySound.play();
  spookySound.setVolume(0.1);

}
}