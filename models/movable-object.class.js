class MovableObject extends DrawableObjekt {

  speed = 0.15;//Geschwindigkeit
  otherDirection = false; //Bewegung nach Rechts. True nach Links
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  offsetY = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {// Throwable Object should always fall
      return true;
    } else {
      return this.y < 180;
    }
  }

  //charctar.iscolliding(chicken);
  isColliding(mo) {
    return this.x + this.width > mo.x && (this.y + this.offsetY) + (this.height - this.offsetY) > mo.y && this.x < mo.x && (this.y + this.offsetY) < mo.y + mo.height
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
    return this.energy == 0;//This is an abbreviation for if-conditional
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