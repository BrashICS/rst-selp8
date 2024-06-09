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

class Pewpew{
  constructor({position, going}){
    this.position = position;
    this.going = going;
    this.radius=3; //going to be circular so radius by default
  }

  //method time - similar to player but not exactly same so inheritance no thank you
  draw(){
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2); //we use it to make full arc so a circle
    ctx.fillStyle = "pink";
    ctx.fill();
    ctx.closePath();
  }

  update(){
    this.draw();
    this.position.x+=this.going.x;
    this.position.y+=this.going.y;
  }

}
const nibbles = new Player();
//to make array of pewpews, so multiple
const pewpews = [];
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
};


//listen for A and D pressed so nibbles can move and when not pressed, nibbles stops moving
addEventListener("keydown", move);
addEventListener("keyup", stop);

//i make function so things continueously shows up - keep calling..
function plsshowup(){
  //i learn new thing:request for frame to animate, function called ..
  requestAnimationFrame(plsshowup);
  //bg
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
  nibbles.update();
  //new function learnt: foreach: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_foreach
  //func for EACH element in array
  pewpews.forEach((pewpew, index) => { //have to use arrow function so index provided from forEach can be used to remove pewpews
    //remove pewpew from array once off screen
    if(pewpew.position.y+pewpew.radius<=0){
      pewpews.splice(index, 1);
    }
    else{
      pewpew.update();
    }
    pewpew.update();

  });

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
   // console.log("left");
    keys.a.pressed=true;
  }
  if(event.key=='d'){
    //console.log("right");
    keys.d.pressed=true;
  }
  if(event.key==' '){
   // console.log("space");
    pewpews.push( //we are pushing a new object into the array created earlier, causing it to go up to screen
    new Pewpew({
      position: {
        //have the thingies shoot above nibbles head
        x:nibbles.position.x + nibbles.width /2,
        y:nibbles.position.y
      },
      going: {
        x:0, y:-8
      }
    })
  )
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




