var mario,MSLimg,MRGimg,MCBimg
var camx,wall
var sensor
var ground,groundimg,groundgroup
var que,queimg,quegroup
var brk,brkimg,brkgroup
var ppe,ppeimg,ppegroup
var hpe,hpeimg,hpegroup
var hrd,hrdimg,hrdgroup
var flagpole,flagpoleimg
var flag,flagimg
var castle,castleimg
var num
var sign,signimg
var dead=-1,playing=0,end=1,move=2,gamestate=playing
var vflag,vflagimg
var power
var time
function preload(){
  groundimg=loadImage("ground.png")
  MCBimg=loadAnimation("climb1.png","climb2.png")
  MSLimg=loadAnimation("run1.png")
  MRGimg=loadAnimation("run1.png","run2.png","run3.png","run4.png")
  queimg =loadImage("question mark.png")
  brkimg=loadImage("brick.png")
  ppeimg=loadImage("pipe.png")
  hpeimg=loadImage("half pipe.png")
  hrdimg=loadImage("hard block.png")
  flagpoleimg=loadImage("flag pole.png")
  castleimg=loadImage("castle.png")
  signimg=loadImage("sign.png")
  flagimg=loadImage("flag.png")
  vflagimg=loadImage("victory flag.png")
}






function setup(){
  createCanvas(700,500)
  time =0
  power=1
  groundgroup=createGroup()
  brkgroup=createGroup()
  fill("black")
  num =1
  num2=1
  camx =350
  camera.on()
  camera.zoom =1.2
  //camera.zoom =0.3
  sign =createSprite(350,200)
  sign.addImage(signimg)
  sign.scale=0.2
  wall= createSprite(camera.x-290,250,1,500)
  wall.visible=false
  vflag=createSprite(5250+13*25,280)
  vflag.addImage(vflagimg)
  vflag.scale=0.021
  createBrick(1,5275+13*25,375,50,0)
  castle=createSprite(5250+13*25,325)
  castle.addImage(castleimg)
  castle.scale=0.021
  
  mario = createSprite(350,350,25,25)
  mario.shapeColor ="red"
  mario.addAnimation("running",MRGimg)
  mario.scale=0.021
  sensor =createSprite(mario.x,mario.y,20,25)
  sensor.setCollider("rectangle",0,10,20,25,0)
  sensor.debug =true
  sensor.visible=false
  
  for(var v=0;v<2;v=v+1){
    createGround(40,25,400+v*25,25,0)//take away 43
  }
  quegroup=createGroup()
  createQuestionBlock(2,675,300,150,-100)
  createQuestionBlock(2,800,300,50,0)
  
  createBrick(3,775,300,50,0)
  ppegroup=createGroup()
  createPipe(2,987.5,362.5,200,-25)
  hpegroup=createGroup()
  createHalfPipe(1,1187.5,375,0,0)
  createHalfPipe(2,1362.5,375,0,-25)
  createPipe(1,1362.5,325.5,0,0)

  createHalfPipe(2,1762.5,375,0,-25)
  createPipe(1,1762.5,325.5,0,0)
  //for(var v=0;v<2;v=v+1){
    //createGround(15,2150,400+v*25,25,0)//done
  //}
  createBrick(2,2300,300,50,0)
  createQuestionBlock(1,2325,300,0,0)
  createBrick(8,2375,200,25,0)
  createBrick(3,2650,200,25,0)
  createQuestionBlock(1,2725,200,0,0)
  createBrick(1,2725,300,150,0)
  createBrick(2,2875,300,25,0)
  createQuestionBlock(3,3100,300,75,0)
  createQuestionBlock(1,3175,200,0,0)
  createBrick(1,3400,300,25,0)
  createBrick(3,3475,200,25,0)
  createBrick(2,3675,200,75,0)
  createQuestionBlock(2,3700,200,25,0)
  createBrick(2,3700,300,25,0)
  hrdgroup =createGroup()
  for(var v = 0;v<4;v=v+1){
  createHardBlock(4-v,3850+v*25,375-v*25,25,0)
  }
  
  for(var v = 0;v<4;v=v+1){
    createHardBlock(1+v,4000,300+v*25,25,0)
    }
  
  
  //for(var v=0;v<2;v=v+1){
    //createGround(69,2600,400+v*25,25,0)//done
  //}
  for(var v = 0;v<4;v=v+1){
    createHardBlock(5-v,4200+v*25,375-v*25,25,0)
  }
  for(var v = 0;v<4;v=v+1){
    createHardBlock(1+v,4375,300+v*25,25,0)
  }
  //for(var v=0;v<2;v=v+1){
    //createGround(40,4375,400+v*25,25,0)//done
  //}
  createPipe(1,4611.5,362,0,0)
  createBrick(2,4725,300,25,0)
  createQuestionBlock(1,4775,300,0,0)
  createBrick(1,4800,300,25,0)
  createPipe(1,4986.5,362,0,0)
  for(var v = 0;v<8;v=v+1){
    createHardBlock(9-v,5025+v*25,375-v*25,25,0)
  }
  flag=createSprite(5240.5+7*25,130)
  flag.addImage(flagimg)
  flag.scale=0.021
  createHardBlock(1,5250+7*25,375,0,0)
  flagpole=createSprite(5255+7*25,375-150)
  flagpole.addImage(flagpoleimg)
  flagpole.scale=0.021
}






function draw(){
  
  background(52, 171, 235)
  text("Use arrow keys to move",300,270)
  text("Created by Nicky Cummings",290,280)
  //text(power ,camera.x-200,camera.y)
  if (gamestate===playing){
    if(power==2){
      mario.velocityY=0
    }
    if(keyWentDown("b")){
      power=0
    }
    if(keyWentDown("f")){
      power=2
    }
    if(power==1||power==0){
      marioPhishics(1.2,10,15,mario.velocityX*-0.4)
    }else{
      if(keyDown("down")){
        marioPhishics(10,15,15,mario.velocityX*-0.4)
      }else{
        marioPhishics(0,15,3,mario.velocityX*-0.4)
        
      }
    }
    loader()
    if(mario.y>425){
      gamestate=dead
    }
    if(mario.isTouching(flagpole)){
      mario.velocityX=0
      gamestate=1
      mario.x=mario.x+3
      mario.addAnimation("running",MCBimg)
    }
  }
  if(gamestate===dead){
    text("You died",camera.x,camera.y)
    mario.velocityX=0
    mario.velocityY=0
    mario.addAnimation("running",MRGimg)
  }
  if(gamestate===end){
    sensor.x=mario.x
    sensor.y=mario.y
    mario.velocityY=3
    mario.collide(hrdgroup)
    mario.collide(groundgroup)
    if(flag.isTouching(hrdgroup)){
      flag.velocityY=0
      
      if(sensor.isTouching(hrdgroup)){
        mario.velocityX=4
        mario.addAnimation("running",MRGimg)
        gamestate = move
      }
    }else{
      flag.velocityY=4
      
    }
  }
  if (gamestate===move){
    sensor.x=mario.x
    sensor.y=mario.y
    if(flag.isTouching(hrdgroup)){
      flag.velocityY=0
    }
    if(!time==0){
    text("Your time was "+time+" seconds",camera.x+100,camera.y-100)
    }
    mario.velocityY=4
    mario.velocityX=4
    mario.collide(groundgroup)
    if(power=-1){
    mario.collide(brkgroup)
    }
    if(mario.velocityX<1){
      
      if(mario.visible==true){
        time = frameCount/60
        time =Math.round(time*100)/100
        
      }
      
      mario.visible=false
    }
    if(vflag.y<250){
      vflag.velocityY=0
    }else{
      vflag.velocityY=-1
    }
  }

  drawSprites()
  
}
function loader(){
  if (num==1&&camx>725){
    num=2
    for(var v=0;v<2;v=v+1){
      createGround(43,1025,400+v*25,25,0)//adding43
    }
  }
  if(num==2&&camx>1825){
    mario.y=mario.y+10
    num=3
    groundgroup.destroyEach()
    for(var v=0;v<2;v=v+1){
      createGround(43,1025,400+v*25,25,0)//adding43
    }
    for(var v=0;v<2;v=v+1){
      createGround(15,2150,400+v*25,25,0)
    }
    for(var v=0;v<2;v=v+1){
      createGround(30,2600,400+v*25,25,0)-39
    }
    mario.y=mario.y-10
  }
  if(num==3&&camx>2825){
    mario.y=mario.y+10
    num=4
    groundgroup.destroyEach()
    
    for(var v=0;v<2;v=v+1){
      createGround(69,2600,400+v*25,25,0)
    }
  mario.y=mario.y-10
  }
  if(num==4&&camx>4050){
    mario.y=mario.y+10
    num=5
    groundgroup.destroyEach()
    
    for(var v=0;v<2;v=v+1){
      createGround(29,3600,400+v*25,25,0)
    }
    for(var v=0;v<2;v=v+1){
      createGround(40,4375,400+v*25,25,0)
    }
  mario.y=mario.y-10
  }
  if(num==5&&camx>5050){
    mario.y=mario.y+10
    num=6
    groundgroup.destroyEach()
    
    
    for(var v=0;v<2;v=v+1){
      createGround(55,4675,400+v*25,25,0)
    }
  mario.y=mario.y-10
  }
}









function marioPhishics(gravity,vX,vY,drag){
  
  mario.collide(wall)
  
  
  if(power==1){
    mario.collide(ppegroup)
    mario.collide(quegroup)
    mario.collide(brkgroup)
    mario.collide(hpegroup)
    mario.collide(hrdgroup)
  }
  mario.collide(groundgroup)
  if(mario.isTouching(brkgroup)||mario.isTouching(groundgroup)||mario.isTouching(quegroup)||mario.isTouching(ppegroup)||mario.isTouching(hpegroup)||mario.isTouching(hrdgroup)){
    mario.velocityY=0
    mario.y=mario.y+1
    if(mario.isTouching(brkgroup)||mario.isTouching(quegroup)||mario.isTouching(groundgroup)||mario.isTouching(ppegroup)||mario.isTouching(hpegroup)||mario.isTouching(hrdgroup)){
      mario.y=mario.y-1
    }
  }else{
    mario.velocityY=mario.velocityY+gravity
  }
  
  if(sensor.isTouching(brkgroup)||sensor.isTouching(quegroup)||sensor.isTouching(groundgroup)||sensor.isTouching(ppegroup)||sensor.isTouching(hpegroup)||sensor.isTouching(hrdgroup)||power==2){
  if(keyWentDown("up")||power==2&&keyDown("up")){
    mario.velocityY=vY*-1
    mario.y=mario.y-5
  }}
  

  if(keyDown("right")){
    mario.velocityX=vX
    mario.mirrorX(1)
    
    
  }
  if(keyDown("left")){
    mario.velocityX=vX*-1
    mario.mirrorX(-1)
    
  }
  if(mario.velocityX<3&&mario.velocityX>-3){
    
    //mario.addAnimation("still",MSLimg)
    mario.addAnimation("running",MRGimg)
  }else{
    
    //mario.addAnimation("running",MRGimg)
    
  }
  mario.velocityX=mario.velocityX +drag
  if(camx>mario.x){
    camera.x= camx
  }else{
    camera.x= mario.x
    camx=mario.x
  }
  wall.x=camera.x-295
  camera.y= 225
  sensor.x=mario.x
  sensor.y=mario.y
  //console.log(mario.x)
}









function createGround(amount,startingX,startingY,vX,vY){
  for(var i=0;i<amount;i=i+1){
    var ground =createSprite(startingX+vX*i,startingY+vY*i,25,25)
    ground.shapeColor = "brown"
    ground.addImage(groundimg)
    ground.scale=0.021
    groundgroup.add(ground)
  }
}
function createQuestionBlock(amount,startingX,startingY,vX,vY){
  for(var i=0;i<amount;i=i+1){
    var que =createSprite(startingX+vX*i,startingY+vY*i,25,25)
    que.shapeColor = "brown"
    que.addImage(queimg)
    que.scale=0.021
    quegroup.add(que)
  }
}
function createBrick(amount,startingX,startingY,vX,vY){
  for(var i=0;i<amount;i=i+1){
    var brk =createSprite(startingX+vX*i,startingY+vY*i,25,25)
    brk.shapeColor = "brown"
    brk.addImage(brkimg)
    brk.scale=0.021
    brkgroup.add(brk)
  }
}
function createPipe(amount,startingX,startingY,vX,vY){
  for(var i=0;i<amount;i=i+1){
    var ppe =createSprite(startingX+vX*i,startingY+vY*i,25,25)
    ppe.shapeColor = "brown"
    ppe.addImage(ppeimg)
    ppe.scale=0.021
    ppegroup.add(ppe)
  }
}
function createHalfPipe(amount,startingX,startingY,vX,vY){
  for(var i=0;i<amount;i=i+1){
    var hpe =createSprite(startingX+vX*i,startingY+vY*i,25,25)
    hpe.shapeColor = "brown"
    hpe.addImage(hpeimg)
    hpe.scale=0.021
    hpegroup.add(hpe)
  }
}
function createHardBlock(amount,startingX,startingY,vX,vY){
  for(var i=0;i<amount;i=i+1){
    var hrd =createSprite(startingX+vX*i,startingY+vY*i,25,25)
    hrd.shapeColor = "brown"
    hrd.addImage(hrdimg)
    hrd.scale=0.021
    hrdgroup.add(hrd)
  }
}