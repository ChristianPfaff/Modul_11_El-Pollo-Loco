class World {
  //Hinweis: Innerhalb einer Klasse braucht man kein let, var, const, function
  // mit this wird immer auf die interne Variablen zugegriffen
  //Das habe ich hinzugefügt aus Testzwecken
  character = new Character(); //An Variable character wird ein Object zugewiesen, das alle Standartattribute beinhaltet.

  enemies = [//3 Chicken-Objekte in einem Array definiert:
    new Chicken(),
    new Chicken(),
    new Chicken()
  ];
  clouds = [
    new Cloud()
  ];
  backgroundObjects = [
    new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
    new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
    new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
    new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0)
  ];
  canvas;
  ctx; // Standartvariable Abk.: ctx für context
  keyboard;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas; //Also das canvas in World und nicht das, das im constructor steht!!
    this.keyboard = keyboard;//Tastaturabfrage
    this.draw();
    this.setWorld();
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    //"Leinwand" sauber machen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    //backgroundObjects
    this.addObjectsToMap(this.backgroundObjects);
    //character
    this.addToMap(this.character); //Methode: drawImage(); Character auf Bildschirm mit Koord. verschieben
    //chickens
    this.addObjectsToMap(this.enemies);
    //clouds
    this.addObjectsToMap(this.clouds);


    //draw(); Wird immer wieder aufgerufen(je nach Grafikarte 10 - 25 fps). Grund: Die load-Fkt braucht Zeit zum laden d. Bildes und draw() wird aber inzwischen aufgerufen, obwohl des Bild noch nicht geladen ist.
    let self = this; //Aus irgendwelchen Gründen, kann man nicht schreiben: this.self.draw() in der Funk "requestAnimationFrame"; Mit dem hack (techn. Kniff),also zuerst dem slef das Keywort "this" ausserhalb von requestAnimationFrame zuweisen funktioniert es! - Warum das so ist weiß niemand! Einfach so akzeptieren!
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addObjectsToMap(objects) {
    objects.forEach(o => {//enemies auf Bildschirm verschieben
      this.addToMap(o);
    });
  }
  addToMap(mo) {//Objekt mo auf Canvas(Bildschirm ausgeben)
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }

}


