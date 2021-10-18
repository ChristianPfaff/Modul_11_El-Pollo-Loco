class MovableObject {
  x = 120; //Standartwert
  y = 280; //Standartwert
  img; //Aktuelles Bild laden
  height = 150; //Bildhöhe
  width = 100; //Bildbreite
  imageCache = {}; //Mehere Bilder speichern in Objekt "imageCache"
  currentImage = 0; //Zähler für die Funktion animate()
  speed = 0.15;//Geschwindigkeit
  otherDirection = false; //Bewegung nach Rechts. True nach Links
  speedY = 0;
  acceleration = 2.5;



  applyGravity() {
    setInterval(() => {

      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 180;
  }

  // loading('img/test.png');
  loadImage(path) {
    this.img = new Image(); // this.img = document.getElementById('image') <img id="image" src>
    this.img.src = path;
  }

  /**
   * This function stores all images of the array "arr" in the "imageCache"
   * @param {Array} arr - ['img/image1.png','img/image2.png',...] 
   */
  loadImages(arr) {//Bilder in dem Objet: imageCache laden
    arr.forEach((path) => {
      let img = new Image();//img wird innerhalb der Methode def. und ist auch nur da gültig und hat nichts mit img ausserhalb zu tun.
      img.src = path;
      this.imageCache[path] = img;//"path" ist gleichzeitig auch Key oder Schlüssel
    });

  }

  playAnimation(images) {
    let i = this.currentImage % images.length;// i= 0,1,2,3,4,5,6 dann wieder 0,1,2,3,4,5,6 usw.
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;//currentImage bei jedem Durchgang um eins erhöhen
  }

  moveRight() { //Das Wort "function" wird in modernen Programmierparadigmen wie objetorient. Prog. nicht mehr benötigt!!
    this.x += this.speed;
    this.otherDirection = false;// image not mirrored
    this.walking_sound.play();

  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 30;
  }

}