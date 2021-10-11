class MovableObject {
  x = 120; //Standartwert
  y = 280; //Standartwert
  img; //Aktuelles Bild laden
  height = 150; //Bildhöhe
  width = 100; //Bildbreite
  imageCache = {}; //Mehere Bilder speichern in Objekt "imageCache"
  currentImage = 0; //Zähler für die Funktion animate()
  speed = 0.15;//Geschwindigkeit

  // loading('img/test.png');
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  /**
   * This function stores all images of the array "arr" in the "imageCache"
   * @param {Array} arr - ['img/image1.png','img/image2.png',...] 
   */
  loadImages(arr) {//Bilder in dem Obket: imageCache laden
    arr.forEach((path) => {
      let img = new Image();//img wird innerhalb der Methode def. und ist auch nur da gültig und hat nichts mit img ausserhalb zu tun.
      img.src = path;
      this.imageCache[path] = img;//"path" ist gleichzeitig auch Key oder Schlüssel
    });

  }

  moveRight() { //Das Wort "function" wird in modernen Programmierparadigmen wie objetorient. Prog. nicht mehr benötigt!!
    console.log('Moving right');

  }

  moveLeft() {
    setInterval(() => {//Wiederholt sich dauernt
      this.x -= this.speed; //immer 0,15px/Frame weniger bei jedem Bildaufruf
    }, 1000 / 60);//60 fps
  }

}