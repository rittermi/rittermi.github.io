let font;
let points;
let bounds;
let r = 0;
let g = 0;
let b = 0;
let message = "The future feels a little fuzzy...";
let mySound;

function preload() {
  font = loadFont('./assets/Avenir.otf');
    soundFormats('mp3', 'ogg');
  mySound = loadSound('assets/bgmus.mp3');
}

function setup() {
  let cnv =createCanvas(windowWidth, windowHeight);
  cnv.mousePressed(canvasPressed);

  points = font.textToPoints(
    message, 0, 0, 50, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });

  bounds = font.textBounds(
    message, 0, 0, 50);

  cursor(CROSS);
  fill(255, 127);
  noStroke();
  
  // bg button
  color_button = createButton("Change Background");
  color_button.position(15,20);
  color_button.mouseClicked(change_background);
  
  // input button
  
  input = createInput();
  input.position(20, 65);

  button = createButton('Choose Your Future');
  button.position(input.x + input.width, 65);
  button.mousePressed(change_secret);
}

function draw() {
  background(r,g,b);
  textSize(48);

  
  let centerDist = dist(mouseX, mouseY, width / 2, height / 2);

  let transparency = map(centerDist, 0, width / 2, 200, 50);
  transparency = constrain(transparency, 50, 200);
	fill(255, transparency);
  
  let jiggle = map(centerDist, 0, width, 1, 300);

  translate((width - abs(bounds.w)) / 2, 
            (height + abs(bounds.h)) / 2);
  
  
  for (let i = 0; i < points.length; i++) {
    let p = points[i];
    ellipse(p.x + jiggle * randomGaussian(), 
      p.y + jiggle * randomGaussian(), 5, 5);
  }

}

function change_background() {
    // Pick a random number for r value
    r = random(255);
    // Pick a random number for g value
    g = random(255);
    // Pick a random number for b value
    b = random(255);
    // Set a random background-color
    background(r, g, b);
}

function change_secret() {
  message = input.value();
  
  points = font.textToPoints(
    message, 0, 0, 50, {
      sampleFactor: 1,
      simplifyThreshold: 0
    });

  bounds = font.textBounds(
    message, 0, 0, 50);
}


function canvasPressed() {
  if (mySound.isPlaying()) {
    // .isPlaying() returns a boolean
    mySound.stop();
  } else {
    mySound.play();
    mySound.loop();
  }
}
