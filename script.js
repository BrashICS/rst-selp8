/**
 * ICS4U - Final Project
 *
 * Description:
 *
 * Author: Selena
 */

'use strict';
//class for the targets
class Target{

}

//dragging and stuff functions so nibbles can move position
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


//collision function


