/** @type {p5.SoundFile} */
let song = null;


let yoff = 0.0; // 2nd dimension of perlin noise
let speed = 4;
let y = 0;
let swi = 0
let x = 200;
let bgColor = 1;
var balls = [];
var numBalls = 24;
var playing = 0;
var myFrameCount =0;
var myFrameCount2 =0;
var sphereRadiusFirst = 0;
var sphereRadius = sphereRadiusFirst;
var mouseIs = false;
var keyIs = false;
var keyIs1 = 0;
var keyIs2 = false;
var keyIs3 = false;
var keyIs6 = 0;
var automode = false;
var randNum = 0;
var k_color = 100;
var angle = 0; // 角度
var r = 100; // 円周の半径
var i = 0;
var sensitivity = 2;
var i=0;
var vol = 0; //マイクボリューム
var volSum = 0;

let waveEffects = [];
const waveEffectMinInterval = 300;
let nextWaveEffectTime = 0;
const songAmp = new p5.Amplitude();

class WaveEffect {
  constructor(x, y, z, t, dt, dr, ddr, da) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.a = 1;
    this.r = r * 1.2;
    this.t = t;
    this.dt = dt;
    this.dr = dr;
    this.ddr = ddr;
    this.da = da;
  }

  step() {
    this.dr += this.ddr;
    this.r += this.dr;
    this.a += this.da;
    this.t += this.dt;
  }

  draw() {
    push();
    //resetMatrix();
    //translate(this.x, this.y, this.z);
    rotateX(this.t + Math.PI / 2);
    noStroke();
    fill(`rgba(127, 127, 127, ${this.a})`);
    cylinder(this.r, 10, 24, 1, false, false);
    pop();
  }

  alive() {
    return this.r < 1000;
  }
}

globalEventTarget.addEventListener('songload', () => {
  songAmp.setInput(song);
});


for (var i=0;i<numBalls;i++){
  var ball = new Ball();
  ball.x = 500 / 2;
  ball.y = 500 / 2;
  balls.push(ball);
}
function Ball(){
  var me = this;

  this.draw = function(){

//色
    if (keyIs3 == true){
      if (keyIs == true){
        fill(255, 255, 255);
      } else {
        fill(30, 30, 30);
      }
    }

//形状
    if(keyIs1 == 1) {
      box(10, 10, 10);
    }else if(keyIs1 == 2) {
      //fill(i+150);
      torus(100, 0.5);
    }else if(keyIs1 == 3) {
      cone(5,100,5,1,true);
    }else{
      sphere(2, 24,24);
    }

  }
}

function firstView() {
}
firstView();


function preload() {
  soundFormats('mp3', 'ogg');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight-200, WEBGL);
  canvas.parent('sketch');

  // Start the audio context on a click/touch event
  userStartAudio().then(function() {});

  windowResized();

  //マイクインプット開始
    mic = new p5.AudioIn();
    mic.start();

  fft = new p5.FFT();

  (function loop() {
    var rand = 100 + random(0,200);
    setTimeout(function () {
      if (song && song.isPlaying()) {
        automodeFunc();
      }
      loop();
    }, rand);
  }());

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight - 200);
  sphereRadiusFirst = 120 * Math.max(Math.min(windowWidth / (windowHeight - 200), 1), 0.8);
  sphereRadius = sphereRadiusFirst;
}

function mousePressed() {

if (mouseY<=0 || windowHeight-200<=mouseY){
//canvas外判定
  } else {
    mouseIs = true;
  }
}

function mouseReleased(){
  mouseIs = false;
}

function keyPressed() {
  if (key == 'a' || key == 'A') {
    if (keyIs == false) {
      keyIs = true;
    } else {
      keyIs = false;
    }
    document.body.classList.toggle('color-dark', keyIs);
  }else if(key == 'd' || key == 'D') {
    if(keyIs1 < 3){
      keyIs1 = keyIs1 + 1;
    }else {
      keyIs1 = 0;
    }
  }else if(key == 'd' || key == 'D') {
    if(keyIs2 == false){
      keyIs2 == true;
    }else {
      keyIs2 = false;
    }
  //  k_color = random() * 255 + 0;
} else if(key == 's' || key == 'S') {
      if(keyIs3 == false){
        keyIs3 = true;
      }else {
        keyIs3 = false;
      }
  } else if(key == 'z' || key == 'Z'){
        if(automode == false){
          automode = true;
        }else {
          automode = false;
        }
      } else if (key == 'u' || key == 'U') {
        if (sensitivity <= 15) {
          sensitivity = sensitivity + 1;
        }
      }else if (key == 'j' || key == 'J') {
        if (sensitivity >= 1) {
          sensitivity = sensitivity - 1;
        }
  } else if (key == 'n' || key == 'N') {
    if (keyIs6 == 0) {
      keyIs6 = 1;
    } else if(keyIs6 == 1){
      keyIs6 = 2;
    } else {
      keyIs6 = 0;
    }
  }

}

function automodeFunc(){
  if (automode == true){
    randNum = random([0,1,3]);
    if (randNum == 0){
      if(keyIs == false){
        keyIs = true;
      }else {
        keyIs = false;
      }
      document.body.classList.toggle('color-dark', keyIs);
    } else if (randNum == 1) {
      if(keyIs1 < 3){
        keyIs1 = keyIs1 + 1;
      }else {
        keyIs1 = 0;
      }
    } else if (randNum == 3) {
      if(keyIs3 == false){
        keyIs3 = true;
      }else {
        keyIs3 = false;
      }
    }
  }
}

function draw() {
  window.drawUI();
  var viewTheta = -(mouseX / width - 0.5) * Math.PI/6;
  var viewPhi = -(mouseY / height - 0.5) * Math.PI / 6;

  camera(Math.sin(viewTheta) * Math.cos(viewPhi) * 400 , Math.sin(viewTheta) * Math.sin(viewPhi) * 400, Math.cos(viewTheta) * 400, 0, 0, 0, 0, 1, 0);
  push();

  ambientLight(255, 255, 255);

  if (keyIs == true) {
    background(0, 0, 0);
  }else {
    background(248, 248, 248);
  }

  push();

  if (song != null){
    if (song.isPlaying()){
      myFrameCount = myFrameCount + 1;
    }
  }
  myFrameCount = myFrameCount + 0.2;
  rotateX(myFrameCount * 0.012);
  rotateY(myFrameCount * 0.01);

  for (const waveEffect of waveEffects) {
    //waveEffect.draw();
  }


  vol = Math.min(mic.getLevel() * 500, 100);
  volSum = volSum + vol/3;
  if (volSum >= 0){
    volSum = volSum - 5;
  }
  if (volSum < 0) {
    volSum = 0;
  }

    let spectrum = fft.analyze();
    noStroke();

  for (var j = 0; j < numBalls / 2; j++) {
    ambientMaterial(200* j / (numBalls/2) + 0,0,200* ((numBalls/2) - j) / (numBalls/2) + 0);
    rotateX(2 * PI / numBalls);
    for (var i = 0; i < numBalls; i++) {
      var ball = balls[i];
      push();
      rotateZ((2 * i * PI + j * 2.7) / numBalls);
      let h = 0.7 * spectrum[floor(spectrum.length*j/(numBalls/2))];
      translate(sphereRadius+h+volSum, 0, 0);
      rotateZ(PI/2);//級の中心を向かせる
      ball.draw();
      pop();
    }
  }
  if (keyIs6 == 1) {
    for (var j = 0; j < numBalls / 2; j++) {
      ambientMaterial(200 * j / (numBalls / 2) + 0, 0, 200 * ((numBalls / 2) - j) / (numBalls / 2) + 0);
      rotateX(2 * PI / numBalls);
      for (var i = 0; i < numBalls; i++) {
        var ball = balls[i];
        push();
        rotateZ((2 * i * PI + j * 2.7) / numBalls);
        let h = 0.7 * spectrum[floor(spectrum.length * j / (numBalls / 2))];
        translate(sphereRadius + h + volSum + 100, 0, 0);
        rotateZ(PI / 2);//級の中心を向かせる
        ball.draw();
        pop();
      }
    }
  }

  if (keyIs6 == 2) {
    for (var j = 0; j < numBalls / 2; j++) {
      ambientMaterial(255, 100, 255);
      for (var i = 0; i < numBalls; i++) {
        var ball = balls[i];
        push();
        rotateZ((i * PI + j * 2.7) / numBalls);
        rotateY((myFrameCount/1200 * 2 * i * PI + j * 2.7) / numBalls);
        let h = 0.7 * spectrum[floor(spectrum.length * j / (numBalls / 2))];
        translate(sphereRadius + h + volSum + 100, 0, 0);
        rotateZ(PI / 2);//級の中心を向かせる
        ball.draw();
        pop();
      }
    }
  }
  if (mouseIs == true){
    if (sphereRadius > 5){
      sphereRadius = sphereRadius - sensitivity;
      myFrameCount = myFrameCount + 1;
    }
  } else if (mouseIs == false) {
    if (sphereRadius < sphereRadiusFirst){
      sphereRadius = sphereRadius + 20;
    }
  }

  if (Date.now() >= nextWaveEffectTime && song) {
    if (songAmp.getLevel() > 0.3) {
      waveEffects.push(new WaveEffect(0, 0, 0, Math.PI / 2 * (Math.random() - 0.5), 0, 10, 2, -0.01));
      nextWaveEffectTime = Date.now() + waveEffectMinInterval;
    }
  }

  for (const waveEffect of waveEffects) {
    waveEffect.step();
  }
  waveEffects = waveEffects.filter(waveEffect => waveEffect.alive());

  pop();
}
