class World {
  //Hinweis: Innerhalb einer Klasse braucht man kein let, var, const, function
  // mit this wird immer auf die interne Variablen zugegriffen

  money = new MoneyObject();
  canvas;
  ctx; // Standartvariable Abk.: ctx für context
  keyboard;
  camera_x = 0;
  foreGround;
  gameInProgress = false;
  //chicken, clouds, endboss über das Objekt level1 geladen
  level = level1;//"level1" ist eine globale Variable und wurde schon, bevor "world" aufgerufen wurde, erzeugt.
  statusBar = new StatusBar();
  character = new Character(); //An Variable character wird ein Object zugewiesen, das alle Standartattribute beinhaltet.
  throwableObjects = [];
  moneyObjects = [
    new MoneyObject(),
    new MoneyObject(),
    new MoneyObject(),
    new MoneyObject()
  ];

  constructor(keyboard) {
    this.canvas = document.getElementById('canvas');
    this.ctx = canvas.getContext('2d');//Auf ctx wir letztendlich gemalt
    this.foreGround = new ForegroundObjekt(this.canvas.width, this.canvas.height);
    //this.startGame = new StartGameBtn();
    this.keyboard = keyboard;//Tastaturabfrage
    this.setWorld();
    this.run();
    this.draw();
  }

  setWorld() {
    this.character.world = this;//character und world sind jetzt miteinander gekoppelt
  }

  run() {
    setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D) {
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
      }
    });
  }

  draw() {

    //"Leinwand" sauber machen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    //if (this.gameInProgress) {
    this.drawGameInProgress();
    //}

    /* if (!this.gameInProgress) {
      this.drawGameStart();
    } */

    //draw(); Wird immer wieder aufgerufen(je nach Grafikarte 10 - 25 fps). Grund: Die load-Fkt braucht Zeit zum laden d. Bildes und draw() wird aber inzwischen aufgerufen, obwohl des Bild noch nicht geladen ist.
    let self = this; //Aus irgendwelchen Gründen, kann man nicht schreiben: this.self.draw() in der Funk "requestAnimationFrame"; Mit dem hack (techn. Kniff),also zuerst dem slef das Keywort "this" ausserhalb von requestAnimationFrame zuweisen funktioniert es! - Warum das so ist weiß niemand! Einfach so akzeptieren!
    requestAnimationFrame(function () {//Diese Funktion wird von der Grafikkarte ausgeführt.
      self.draw();
    });
  }

  drawGameStart() {
    this.addToMap(this.foreGround);//Startbild  
  }

  drawGameInProgress() {
    this.ctx.translate(this.camera_x, 0);//Ursprung von ctx wird verschoben,dann die Nachfolgenden Bilder gezeichnet

    //backgroundObjects
    this.addObjectsToMap(this.level.backgroundObjects);

    this.ctx.translate(-this.camera_x, 0);//Ursprung von ctx wieder zurück auf den vorherigen Stand usw.
    //statusbar 
    this.addToMap(this.statusBar);

    this.ctx.translate(this.camera_x, 0);//Ursprung von ctx wird verschoben,dann die Nachfolgenden Bilder gezeichnet

    //character
    this.addToMap(this.character); //Methode: drawImage(); Character auf Bildschirm mit Koord. verschieben
    //chickens
    this.addObjectsToMap(this.level.enemies);
    //clouds
    this.addObjectsToMap(this.level.clouds);
    //Wurfobjekt
    this.addObjectsToMap(this.throwableObjects);
    //money
    this.addObjectsToMap(this.moneyObjects);

    this.ctx.translate(-this.camera_x, 0);//Ursprung von ctx wieder zurück auf den vorherigen Stand usw.

  }

  addObjectsToMap(objects) {
    objects.forEach(o => { //Objekt auf Bildschirm verschieben
      this.addToMap(o);
    });
  }

  addToMap(mo) {//Objekt mo auf Canvas(Bildschirm ausgeben)
    if (mo.otherDirection) {// Wenn true dann nach Links laufen
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);//Recheck um Objekt

    //Wenn true dann urspr. canvas-Einstellungen wieder herstellen
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  flipImage(mo) {
    this.ctx.save();//Aktuelle Einstellungen von context
    this.ctx.translate(mo.width, 0);//translate bewegt den Ursprung
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();//Den Ursp. wieder an an den Anfang setzen
  }
}


