/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author: Selena
 */

'use strict';
//class for the targets
const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");
//setting the size in javascript?!
myCanvas.width=innerWidth;
myCanvas.height=innerHeight;

class Player{
  constructor(){
    //where is the object heading
    this.going = {
      x:0
    }

    //nibbles pictures properties
    const image = new Image();
    image.src="nibblesback.png";
    //make sure dimensions are set AFTER image finished loading
    //when the onload property invoked, function: (), => called NEW SYNTAX!! (arrow function)
    //https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event
    image.onload = () =>{
      this.image=image;
      this.width=image.width * 0.25;
      this.height=image.height * 0.25;

      this.position = { //setting position of player/nibbles to the middle:D
        x: myCanvas.width/2, y:myCanvas.height - this.height
      }
    }
  }

  //method time
   //NIBBLES
  draw(){
    ctx.drawImage(this.image,this.position.x,this.position.y, this.width, this.height);
  }

  //update position
  update(){
    if(this.image){ //if image exists
      this.draw();
      this.position.x += this.going.x;
    }
  }
}
const nibbles = new Player();
//object keys to detect keys up and down
//set false by default
const keys = {
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  space: {
    pressed:false
  }
}
//nibbles.draw();

//listen for A and D pressed so nibbles can move!!!!
addEventListener("keydown", move);
addEventListener("keyup", stop);

//i make function so it continueously shows up - recursion... no stopping tho.. keep calling.. nibbles should always be there
//i learn new thing:request for frame to animate, function called ...nibbles always being drawn
function plsshowup(){
  requestAnimationFrame(plsshowup);
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
  nibbles.update();

  //only animate when key is being pressed - determined by object
  //and not going off the damn screen
  if(keys.a.pressed && nibbles.position.x >=0){
    nibbles.going.x=-5;
  }
  //no idea why its + width but it doesnt work otherwise
  else if(keys.d.pressed && nibbles.position.x + nibbles.width <=myCanvas.width){
    nibbles.going.x=5;
  }
  else{
    //PISSED ME OFF OKAY IF NOTHING BEING PRESSED DONT MOVE OTHERWISE IT KEEPS MOVIGN SOFSNAODMODF
    nibbles.going.x=0;
  }
}
plsshowup();

function move(event){
  //console.log(event.key);
  if(event.key=='a'){
    console.log("left");
    keys.a.pressed=true;
  }
  if(event.key=='d'){
    console.log("right");
    keys.d.pressed=true;
  }
  if(event.key==' '){
    console.log("space");
    keys.space.pressed=true;
  }
}

function stop(event){
  //when key up, stop moving!!!!
  //console.log(event.key);
  if(event.key=='a'){
    console.log("left");
    keys.a.pressed=false;
  }
  if(event.key=='d'){
    console.log("right");
    keys.d.pressed=false;
  }
  if(event.key==' '){
    console.log("space");
    keys.space.pressed=false;
  }
}



