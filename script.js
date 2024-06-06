/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author: Selena
 */

'use strict';
//class for the targets
let canvas = document.getElementById("myCanvas");
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

//dragging and stuff functions so nibbles can move position - DONE
function drag(event){
  event.preventDefault();
  let data = event.dataTransfer.getData("image");
  event.target.appendChild(document.getElementById(data));
}

function allow(event){
  event.preventDefault();
}

function dragStart(event){
  event.dataTransfer.setData("image", event.target.id);
}

//cannon? released? object to hit things
function fire(event){
  //what the hell
}

//collision function
function detectCol(){

}

