var hpbar;
var obj;
var health = 50;
var hp = 100;

function setup(){
    var canvas = createCanvas(displayWidth,displayHeight);
    obj = createSprite(displayWidth/2, displayHeight/2, 50, 50);  

}
function draw(){
    background("black");
    
    rectMode(CENTER);
    /*hpbar = createSprite*/ rect(obj.x, obj.y - 60, hp, 10);
    // hpbar.shapeColor = "green"

    /*if(keyWentDown("w")){
        hp -= 1;
     }*/

    if(keyDown("W")){
        hp = hp - 10;
    }

    if(health < 0){
        health = 0;
    }
    drawSprites();

    
}

