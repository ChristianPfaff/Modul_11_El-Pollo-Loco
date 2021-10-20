class DrawableObjekt {
  img; //Aktuelles Bild laden
  imageCache = {}; //Mehere Bilder zwischenspeichern in Objekt "imageCache"
  currentImage = 0; //Zähler für die Funktion animate()
  x = 120; //Bildposition x Standartwert
  y = 280; //Bildposition y Standartwert
  height = 150; //Bildhöhe
  width = 100; //Bildbreite

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
}