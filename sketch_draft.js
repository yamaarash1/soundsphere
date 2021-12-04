let yoff = 0.0; // 2nd dimension of perlin noise
let speed = 4;
let y = 0;
let swi = 0
let x = 200;
let bgColor = 1;
var monsters = [];
var numMonsters = 1;
var playing = 0;

for (var i=0;i<numMonsters;i++){
  var monster = new Monster();
  monster.x = 500 / 2;
  monster.y = 500 / 2;
  monster.que = 0;
  monsters.push(monster);
}
function Monster(){
  var me = this;
}

function wave(){
  beginShape();
  let xoff = 0; // Option #1: 2D Noise
  // let xoff = yoff; // Option #2: 1D Noise
  // Iterate over horizontal pixels
  for (let x = 0; x <= width; x += 10) {
    // Calculate a y value according to noise, map to
    // Option #1: 2D Noise
    let y = map(noise(xoff, yoff), 0, 1, 200, 300);
    // Option #2: 1D Noise
    // let y = map(noise(xoff), 0, 1, 200,300);
    // Set the vertex
    vertex(x, y);
    // Increment x dimension for noise
    xoff += 0.05;
  }
  // increment y dimension for noise
  yoff += 0.01;
  vertex(width, height);
  vertex(0, height);
  endShape(CLOSE);
}

function firstView() {
  /*
  var element = document.createElement('div');
  element.id = "bg";
  element.style.backgroundColor = rg;
  element.style.width = '710px';
  element.style.height = '400px';
  document.getElementById("p5_loading").appendChild(element);
  */
}

firstView();
var file;

function handleFileSelect(evt) {
  var files = evt.target.files; // FileList object

  // Loop through the FileList and render image files as thumbnails.
  for (var i = 0, f; f = files[i]; i++) {

    // Only process image files.
    if (!f.type.match('audio.*')) {
      continue;
    }
    song = loadSound(f);
  }
}

document.getElementById('files').addEventListener('change', handleFileSelect, false);

//console.log(reader);

function preload() {
  soundFormats('mp3', 'ogg');
  //song = loadSound('https://k.azma.work/assets/session.mp3');
  //song = loadSound('files');
}

function setup() {
  var cnv = createCanvas(710, 400);
  cnv.position(0,90);
  background(255,0,0);
  // Start the audio context on a click/touch event
  userStartAudio().then(function() {});
}

function mousePressed() {
  if (100<=mouseX && mouseX<=200 && 300<=mouseY&&mouseY<=400){
    if (song.isPlaying()) {
      song.pause();
      bgColor = 1;
      playing = 1;
    } else {
      song.play();
      bgColor = 2;
      playing = 2;
    }
  } else if (0<=mouseX && mouseX<=100 && 300<=mouseY&&mouseY<=400){
      if (song.isPlaying()) {
        song.stop();
        bgColor = 0;
        playing = 0;
      } else {
        if (playing == 1){
          song.stop();
          bgColor = 0;
          playing = 0;
        } else {
          song.play();
          bgColor = 2;
          playing = 2;
        }
      }
  }
}

function draw() {
  switch(bgColor){
    case 0:
      background(255,0,0);
      break;
    case 1:
      background(255, 255, 0);
      break;
    case 2:
      background(0, 255, 0);
      break;
  }

  if (mouseIsPressed === true) {
    line(mouseX, mouseY, pmouseX, pmouseY);
  }
  fill(255);
  // We are going to draw a polygon out of the wave points
  //ここから追加
  //noStroke();
  //ellipse(250,250,300,300);
  //quad(100,250,100,500,400,500,400,250);
  //stroke(0);
  //strokeWeight(10);
  //line(160,240,180,220);
  //line(320,220,340,240);
  //noStroke();
  //fill(239,100,15,100);
  //ellipse(120,270,40,20);
  //ellipse(380,270,40,20);

  if (playing == 2){

  for (var i=0;i<numMonsters;i++){
    var monster = monsters[i];
    if (monster.que == 0){
      setTimeout(function() {monster.que = 1;}, 500);
    }

      if(monster.que==1) {
        noStroke();
        fill(255);
        ellipse(monster.x, 350-monster.y-20, 30, 30);
        quad(monster.x-15, 350-monster.y-20, monster.x+15, 350-monster.y-20, monster.x+15, 350-monster.y-5, monster.x-15, 350-monster.y-5);
        quad(monster.x-10, 350-monster.y-5, monster.x-5, 350-monster.y-5, monster.x-5, 350-monster.y+5, monster.x-10, 350-monster.y+5);
        quad(monster.x+10, 350-monster.y-5, monster.x+5, 350-monster.y-5, monster.x+5, 350-monster.y+5, monster.x+10, 350-monster.y+5);
        stroke(0);
        line(monster.x-5, 350-monster.y-25, monster.x-10, 350-monster.y-20);
        line(monster.x+5, 350-monster.y-25, monster.x+10, 350-monster.y-20);
        //strokeWeight(1);
        //noStroke();
        //fill(255, 255, 255 ,100);
        monster.y=monster.y+speed;
        if(monster.y>350) {
          monster.que = 0;
          monster.y=0;
          monster.x = Math.random() * 450 + 50;
        }
    }
  }
}

  wave();
fill(255);
rect(0,300,100,100);
rect(100,300,100,100);
textSize(30);
fill(20);
text("stop", 0,350);
fill(100);
text("pause", 100,350);
}
