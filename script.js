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
const ctx = myCanvas.getContext("2d"); //to draw and utilize other stuff

class Player{
  constructor(){
    this.position = { //setting position of player/nibbles :D
      x: 50, y:50
    }

    //where is the object heading
   //?? this.going = 0; maybe ??

    //nibbles pictures properties i think??
    this.image= new Image();
    this.width=50;
    this.height=50;
  }
  //?? why is this not working
  this.image.src = "./nibbles.jpg";

  //method time
   //NIBBLES YAYYAYYAYY
   draw(){
   /* ctx.fillStyle='pink';
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height); //using previous position idk*/
    ctx.drawImage(this.image,this.position.x,this.position.y); //image, width, height

  }
}

const nibbles = new Player();
nibbles.draw();

class Target{
  //set properties such as: hp, visible (bool), size,
  //size will be randomly generated later
  #hp = 50;
  #size;
  #visible = true;
  #posx;
  #posy;

  constructor(size, posx,posy){
    this.#size=size;
    this.#posx=posx;
    this.#posy=posy;
  }

  get visible(){
    return this.#visible;
  }

  set size(yaySize){
    this.#size = yaySize;
    return this.#size;
  }

  set hp(dmg){
    if(hp-dmg<=0){
      this.#visible=false;
    }
    this.#hp-=dmg;
    return this.#hp;
  }
}

//dragging and stuff functions so nibbles can move position
/*function drag(event){
  event.preventDefault();
  let data = event.dataTransfer.getData("image");
  event.target.appendChild(document.getElementById(data));
}

function allow(event){
  event.preventDefault();
}

function dragStart(event){
  event.dataTransfer.setData("image", event.target.id);
}*/

//cannon? released? object to hit things
function fire(event){
  //what the hell
}

//collision function
function detectCol(){

}

