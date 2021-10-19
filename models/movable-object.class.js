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
  energy = 100;
  lastHit = 0;



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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);//Bild auf Bildschirm ausgeben. Img lauft nach Rechts.
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken) {
      //Rechteck um Objekt
      ctx.beginPath();
      ctx.lineWidth = '5';
      ctx.strokeStyle = 'blue';
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
  //charctar.iscolliding(chicken);
  isColliding(mo) {
    return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;//Differenz in ms
    timepassed = timepassed / 1000; //Differenz in s
    //console.log(timepassed);
    return timepassed < 1; //Wird als "true" bewertet (truthy)
  }

  isDead() {
    return this.energy == 0;
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