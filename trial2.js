var nt1, nt2;
var plr, plrType;
var entityGroup;
var eProjectile, eProjectileGroup, projectileX, projectileY;
var mousePosX, mousePosY;
var entity1PosX, entity1PosY, entity2PosX, entity2PosY;
var spawns = 0;
var spawnLimit = 15;
var randomAngle;
var vlcX, vlcY;
var mapImg, invisImg;
var border1, border2, border3, border4;

function preload(){
    {
        char1 = {
            class:"gunner",
            level:1,
            weapon:"gun",
            health:100,
            shields:100,
            damage:10,
            width:30,
            height:30,
            color:"red"
        },
    

    char2 = {
            class:"wizard",
            level:1,
            weapon:"staff",
            health:100,
            shields:100,
            damage:20,
            width:30,
            height:30,
            color:"green"
        },
        
        entity1 = {
            class:"miniDragons",
            level:1,
            weapon:"fire",
            health:100,
            damage:20,
            width:15,
            height:15,
            color:"grey",  
        },
        entity2 = {
            class:"iceMiniDragons",
            level:1,
            weapon:"ice",
            health:100,
            damage:20,
            width:20,
            height:20,
            color:"blue",     
        }
    }

    // mapImg = loadImage("Images/default_preview.png");
    // invisImg = loadImage("default_preview.png");
}

function setup(){
    var canvas = createCanvas(500,500);  
    // cursor(invisImg)

    posX = random(400);
	posY = random(400);

    border1 = createSprite(width/2,500,500,10);
    border2 = createSprite(width/2,0,500,10);
    border3 = createSprite(0,height/2,10,500);
    border4 = createSprite(500,height/2,10,500);

    mousePosX = mouseX;
    mousePosX = mouseY;

     entityGroup = createGroup();
     eProjectileGroup = createGroup();

     var plrTypeArray = [char1.class,char2.class];
     plrType = random(plrTypeArray);  // change random() to selection by the player
     if(plrType === char1.class){  
         plr = createSprite(250,250,char1.width,char1.height);   
         plr.shapeColor = char1.color;
     }
     else{
         plr = createSprite(250,250,char2.width,char2.height);
         plr.shapeColor = char2.color;
     }
}

function draw(){
    background("black");

    // translate(width/2,height/2);

    plr.x = mouseX;
    plr.y = mouseY;

    entity1PosX = Math.round(random(40,490));
    entity1PosY = Math.round(random(40,490));
    entity2PosX = Math.round(random(50,480));
    entity2PosY = Math.round(random(50,480));

    randomAngle = Math.round(random(0,360));

    rngVelocity();
    checkKey();
    spawnRngEntities();
    entityProjectiles();
    drawSprites();
}

function rngVelocity(){
    vlcX = Math.cos(randomAngle/180 * Math.PI) * 5;
    vlcY = Math.sin(randomAngle/180 * Math.PI) * 5;
}




function spawnRngEntities(){
    if(spawns < spawnLimit){
        var type = [entity1.class, entity2.class];
        if(frameCount % 10 === 0){
            if(random(type) === entity1.class){
                nt1 = createSprite(entity1PosX,entity1PosY,20,20);
                nt1.shapeColor = entity1.color;
                spawns++
                entityGroup.add(nt1);
                // console.log("nt1.props "+nt1.x,nt1.y,nt1.width,nt1.height);
            }
           else{
               nt2 = createSprite(entity2PosX,entity2PosY,30,30);
               nt2.shapeColor = entity2.color;
               spawns++
               entityGroup.add(nt2);
            // console.log("nt2.props "+nt2.x,nt2.y,nt2.width,nt2.height); 
           }
        }
    }
    
    
    for(var i = 0; i < entityGroup.length; i++){
        entityGroup[i].attractionPoint(0.2,plr.x,plr.y);
        entityGroup[i].friction = 0.09; 
        entityGroup[i].debug = true;
        entityGroup[i].collide(entityGroup);
        entityGroup[i].collide(entityGroup);
        projectileX = entityGroup[i].x;
        projectileY = entityGroup[i].y;
    }
}

function entityProjectiles(){
     if(entityGroup.length > 0){
        if(frameCount % 24 === 0){
            for(var i = 0; i < 10; i++){
                    eProjectile = createSprite(projectileX,projectileY,12,12);
                    eProjectile.shapeColor = "purple"
                    eProjectileGroup.add(eProjectile);
                    // eProjectileGroup[i].attractionPoint(4,plr.x,plr.y);

                     if(spawnLimit % 1 === 0){
                        //tst attractionPoint alt
                        var angle = atan2(plr.x-eProjectile.y, plr.x-eProjectile.x);
                        eProjectile.velocity.x += cos(angle) * 5;
                        eProjectile.velocity.y += sin(angle) * 5;
                    }
            }
        }
    }
}


function checkKey(){
    if(keyDown("W")){
    //  translate(0,250);
    }
    if(keyDown("A")){
        
    }
    if(keyDown("S")){
        
    }
    if(keyDown("D")){
        
    }
}



/*function mousePressed(){
    if(plrType === char1.class){
        projectile = createSprite(mousePosX, mousePosY, 10,10);
        // projectile.depth = plr.depth - 1;
        projectile.shapeColor = "white";
      console.log("projectile "+ projectile.x,projectile.y);
    }
    else{
        console.log("el");
    }

}*/


/*function plrProjectiles(){
    mousePressed(plr);
}*/
