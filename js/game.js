let canvas;
let world;
let keyboard = new Keyboard();


function init() {
  canvas = document.getElementById('canvas');
  world = new World(canvas);//Hier ist eine neue Variable (Objekt) world in der eine "neue Welt" angelegt werden kann und bei der Erstellung des Objektes wird die Variable canvas gleich mit gegeben.

  console.log('My Character is', world.character);



}


window.addEventListener('keypress', (e) => {
  console.log(e);
});