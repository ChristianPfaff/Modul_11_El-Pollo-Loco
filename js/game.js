//let canvas;
let world;
let keyboard = new Keyboard(); // Eine Instanz von Keyboard wird angelegt
let level1;


function init() {
  level1 = getLevel1();
  world = new World(keyboard);//Hier ist eine neue Variable (Objekt) world in der eine "neue Welt" angelegt werden kann und bei der Erstellung des Objektes wird keyboard gleich mit gegeben.
}

function startGame() {//Startet Methode in world
  //world.gameInProgress = true;
  init();
  world.startGame();
}

function fullScreen() {
  world.fullScreen = true;
}

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }

  if (e.keyCode == 38) {
    keyboard.UP = true;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }

  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener('keyup', (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }

  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }

  if (e.keyCode == 38) {
    keyboard.UP = false;
  }

  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }

  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }

  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});