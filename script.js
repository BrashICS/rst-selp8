/**
 * ICS4U - Final Project
 *
 * Description:
 * THINGS I LEARNT:
 * forEach(): https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_foreach
  func for EACH element in array
  arrow function : () => {}
  -sometimes, we use a prebuilt function that does something based on a function, we can incorporate that function right away!!! makes code smaller lowkey, cuz no need to go searching for the related funciton
  globalAlpha(): the transparency of something on da canvas...
  https://www.w3schools.com/tags/canvas_globalalpha.asp
  -save() and restore(): for the canvsa! you save a state, kinda storing it, then you can do something else, and then restore it back to the og!!

 * CURRENT BUGS:
 * -snorlax sometimes duplicates when hitting wall, but dissapears later, but is actual object, so can hit and wastes ammo basically : ill just say its part of the game to make it harder... it gonna be called snorlax taunt okay
 * -something about x being uncaught reference but it shouldnt work then but it does?
 *  -no it actually doesnt work: the pewpews are only spawning at the left half and not from snorlax
 *
 * THINGS I CAN TO ADD:
 * -explosions dots fade away
 * -cooler background like stars and stuff
 * -maybe randomize the number of rows and columns in the enemy grid??
 * -when snorlax is at nibbles.position.y, game.over = true
 * -button that refreshes the page so player can play again "try again", only visible when !game.active
 *
 * THINGS I NEED TO ADD:
 * -clean up the damn code wtf
 * -make better notes
 * -title screen
 * -instructional page
 * -picture of my pseuodocode/planning -> the one from my notebook
 *
 *
 *
 * Author: Selena
 */

'use strict';
//class for the targets
const myCanvas = document.getElementById("myCanvas");
const ctx = myCanvas.getContext("2d");
let scoreYea = document.getElementById("score");
scoreYea=0;

class Player{
  constructor(){
    //where is the object heading
    this.going = {
      x:0
    }

    this.opacity = 1;

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
        x: myCanvas.width/2,
        y: myCanvas.height - this.height
      }
    }
  }

  //method time
   //NIBBLES
  draw(){
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.drawImage(this.image,this.position.x,this.position.y, this.width, this.height);
    ctx.restore();
  }

  //update position
  update(){
    if(this.image){ //if image exists
      this.draw();
      this.position.x += this.going.x;
    }
  }
}

//the thing that comes out of the player? the shooting things? what are they called?
class Pewpew{
  constructor({position, going}){
    this.position = position;
    this.going = going;
    this.radius=4; //going to be circular so radius by default
  }

  //method time
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

//so snorlax can shoot back too!!!!!
class EnemyPewpew{
  constructor({position, going}){
    this.position = position;
    this.going = going;
    this.width = 3;
    this.height = 10;
  }

  //method time - similar to player but not exactly same so inheritance no thank you
  draw(){
    ctx.fillStyle = "blue";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(){
    this.draw();
    this.position.x+=this.going.x;
    this.position.y+=this.going.y;
  }
}

//the explosion that happens when enemy or player is hit
class Boom{
  constructor({position, going, radius, color}){
    this.position = position;
    this.going = going;
    this.radius=radius; //going to be circular so radius by default
    this.color = color;
  }

  //method time - similar to player but not exactly same so inheritance no thank you
  draw(){
    ctx.beginPath();
    ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI *2); //we use it to make full arc so a circle
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(){
    this.draw();
    this.position.x+=this.going.x;
    this.position.y+=this.going.y;
  }
}

//snorlax
class Enemy{
  constructor({position}){
    //where is the object heading
    this.going = {
      x:0,
      y:0
    }

    //pictures properties
    const image = new Image();
    image.src="snorlax.png";
    image.onload = () =>{
      this.image=image;
      this.width=image.width *0.3;
      this.height=image.height*0.2;

      this.position = { //setting position of player/nibbles to the middle:D
        x: position.x,
        y: position.y //wont be static anymore, dynamically being set/constructed
        //also so that it isnt like overlapping when i make more of them hehe for the grids HAHAHAHA :(
      }
    }
  }

  //method time
  draw(){
    ctx.drawImage(this.image,this.position.x,this.position.y, this.width, this.height);
  }

  //update position
  update({going}){
    if(this.image){ //if image exists
      this.draw();
      this.position.x += going.x;
      this.position.y += going.y;
    }
  }

  //array for the pewpews for the enemy
  pew(enemyPewpews){
    enemyPewpews.push(new EnemyPewpew({
      position: {
        x: (this.position.x + this.width) /2, //WE GETTING THE MIDDLE OF THE ENEMY PEWPEW
        y: this.position.y + this.height
      },
      going: {
        x: 0,y:5
      }
    }))
  }
}

class Grid{
  //class for grids of enemies
  constructor(){
    this.position={
      x:0,y:0
    }

    this.going={
      x:3,y:0
    }
    //whenever we create a grid, we are making a new invader and storing in array
    this.enemies = [];

    //to create multiple rows and cols of enemies next to each other
    this.width=300; //rows * 60
    for(let i=0;i<5;i++){//for the cols
      for(let j=0;j<5;j++){ //for the rows
        this.enemies.push(new Enemy({position:{
          x:i * 60,
          y:j* 60
        }}));
      }

    }
  }

  //methods
  //move da enemies side to side
  update() {
    this.position.x+=this.going.x;
    this.position.y+=this.going.y;
    //set to 0 as default so wehn it hits wall it doesnt keep flying downward it was actualy funny seeing it
    this.going.y=0;
    //need to condition that when its greater, go other way, and back
    if(this.position.x + this.width >= myCanvas.width || this.position.x <=0){
      this.going.x= -this.going.x;
      //everytime the snorlax army hits a wall, goes down to make harder
      this.going.y=30;
    }
  }
}


const nibbles = new Player();
//to make array of pewpews, so multiple
const pewpews = [];
const grids = [new Grid()]; //for the enemies
const enemyPewpews = []; //array for the pewpews of enemies
const booms = [];
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

let frames=0;
let ranInterval = Math.floor((Math.random()*500)+500);
let game = {
  over: false,
  active: true
}
//console.log(ranInterval);
//i make function so things continueously shows up - keep calling..
function plsshowup(){
  if(!game.active){
    //dont return any of the code, we done, stop the damn game
    return;
  }
  //i learn new thing:request for frame to animate, function called ..
  requestAnimationFrame(plsshowup);
  //bg
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,myCanvas.width,myCanvas.height);
  nibbles.update();

  booms.forEach(boom => {
    boom.update();
  })

  //for every enemy's pew, if it leaves screen, remove it from array
  enemyPewpews.forEach((enemyPew, index) => {
    if(enemyPew.position.y + enemyPew.height >= myCanvas.height){
      enemyPewpews.splice(index, 1);
    }
    else{
      enemyPew.update();
    }

    //detect collision
    //when snorlax shoots nibbles, game ends!!!!!
      if(enemyPew.position.y + enemyPew.height >=nibbles.position.y && enemyPew.position.x + enemyPew.width >=nibbles.position.x && enemyPew.position.x <= nibbles.position.x + nibbles.width /*or if snorlax position greater than mycanvas size*/){
        setTimeout(() => { //avoid glitches with the timeout AND remove the enemiespewpew from the array for efficiency lwk , like not rlly but yea
          enemyPewpews.splice(index,1)
          //once hit, nibbles gone, game over
          nibbles.opacity =0;
          game.over = true;
        },0)
        setTimeout(() => { //about 2 seconds later, stop the game
          game.active = false;
        },2000)
        createBoom({
          object: nibbles,
          color: "brown"
        });
      }
  })

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
    //set to 0 so nibbles doesnt move when nothing is being pressed
    nibbles.going.x=0;
  }

  pewpews.forEach((pewpew, index) => { //have to use arrow function so index provided from forEach can be used to remove pewpews
    //remove pewpew from array once off screen
    if(pewpew.position.y+pewpew.radius<=0){
      pewpews.splice(index, 1);
    }
    else{
      pewpew.update();
    }
  });

  grids.forEach((grid) => {
    grid.update();

    // spawn pewpews of enemies
    if(frames % 100 ==0 && grid.enemies.length >0) {
      grid.enemies[Math.floor(Math.random() * grid.enemies.length)].pew(enemyPewpews); //choose a random snorlax
    }


    grid.enemies.forEach((enemy, index
     ) => {
      enemy.update({going: grid.going});

      //actually shoot the enemies
      //keeping track of each element in pewpews
      pewpews.forEach((pewpew, index2) =>{
        //detect for collisions
        //hit when top of pewpew is less than bottom of the enemy
        //bottom of pewpew <= bottom of enemy AND it is between enemy, not just going past
        //right side of projectile >=left side of enemy
        if(pewpew.position.y - pewpew.radius <=enemy.position.y +enemy.height && pewpew.position.x+pewpew.radius >= enemy.position.x && pewpew.position.x - pewpew.radius<= enemy.position.x + enemy.width&& pewpew.position.y + pewpew.radius >= enemy.position.y) {
          createBoom({
            object: enemy,
            color: "white"
          });

          setTimeout(()=>{ //a little bit of delay otherwise it starts flashing and glitching
            //it keeps hitting random enemies, we want to start at the bottom, so we first make sure an enemy actually exists
            //only if enemy found, then get rid of the enemy and pewpew after hit
            let enemyFound = grid.enemies.find((enemyWoah) => {
              return enemyWoah== enemy;
            })
            let pewpewHit = pewpews.find((pewpewFound) => {
              return pewpewFound == pewpew;
            })

            if(enemyFound && pewpewHit) {
              scoreYea+=100;
              score.innerHTML=scoreYea;
             // console.log(score);
              grid.enemies.splice(index, 1)
              pewpews.splice(index2,1);

              //somehow update length so grid of enemies can continue hitting edge of screen

            }

          },0)
        }
      })
    })
  })

 // spawn enemies
  if(frames%ranInterval == 0){
    //make new grids/more snorlaxs so the game isnt done after one round
    grids.push(new Grid());
    frames=0; //reset num otherwise we'd have to expect HUGE numbers to spawn more sorlaxs
    //change this interval everytime
    ranInterval = Math.floor((Math.random()*500)+500)
  }

  frames++;

}
plsshowup();

function createBoom({object, color}){
  for(let i=0;i<15;i++){ // to create multiple booms
    booms.push(
      new Boom({
      position: {
        x: object.position.x + object.width/2,
        y: object.position.y + object.height /2
      },
      going: {
        //randomize where its going, so they dont overlap and create the uh explosion effect yknow
        //i do subtraction so they can disperse upwards too HELL YEA
        x: (Math.random()-1) *2, y: (Math.random()-1) *2
      },
      //get some randomized size too yeeeaaaaa
      radius: Math.random() *3,
      color:color
    }))
}
}

function move(event){
  if(game.over) {
    //stop fr
    return;
  }
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
        //why is there error in console?
        x:nibbles.position.x + nibbles.width /2,
        y:nibbles.position.y
      },
      going: {
        x:0, y:-8
      }
    }))
  }
}

function stop(event){
  //when key up, stop moving!!!!
  //console.log(event.key);
  if(event.key=='a'){
   // console.log("left");
    keys.a.pressed=false;
  }
  if(event.key=='d'){
   // console.log("right");
    keys.d.pressed=false;
  }
  if(event.key==' '){
   // console.log("space");
    keys.space.pressed=false;
  }
}




