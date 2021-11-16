class World {
  //Hinweis: Innerhalb einer Klasse braucht man kein let, var, const, function
  // mit this wird immer auf die interne Variablen zugegriffen

  canvas;
  ctx; // Standartvariable Abk.: ctx für context
  keyboard;
  camera_x = 0;
  foreGround;
  gameOverImg;
  lostGameImg;
  gameInProgress = false;
  gameLost = false;
  gameWin = false;

  //chicken, clouds, endboss über das Objekt level1 geladen
  level = level1;//"level1" ist eine globale Variable und wurde schon, bevor "world" aufgerufen wurde, erzeugt.  
  statusBar = new StatusBar();
  statusBarCoin = new StatusBarCoin();
  statusBarBottle = new StatusBarBottle();
  character = new Character(); //An Variable character wird ein Object zugewiesen, das alle Standartattribute beinhaltet.
  throwableObjects = [];
  numberOfbottle = 5;
  flag = 0;
  fullScreen = false;
  score_sound = new Audio('audio/score.mp3');
  shot_sound = new Audio('audio/shot.mp3');
  gameReq;

  constructor(keyboard) {
    this.canvas = document.getElementById('canvas');//Achtung: Hier ist canvas der ID Name vom Div-Element   
    this.ctx = canvas.getContext('2d');//Auf ctx wir letztendlich gemalt
    this.foreGround = new ForegroundObjekt(this.canvas.width, this.canvas.height);//Für Startbild
    this.gameOverImg = new GameOverImg(this.canvas.width, this.canvas.height);
    this.lostGameImg = new LostGameImg(this.canvas.width, this.canvas.height);
    this.keyboard = keyboard;//Tastaturabfrage
    this.setWorld();
    this.draw();

  }

  startGame() {
    this.level.animate();
    this.run();
    this.gameInProgress = true;
    this.character.animate();
    this.character.applyGravity();

  }

  setWorld() {
    this.character.world = this;//character und world sind jetzt miteinander gekoppelt
  }

  run() {
    this.checkInterval = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
    }, 200);
  }

  checkThrowObjects() {
    if (this.keyboard.D && !this.character.isDead()) {
      if (this.statusBarBottle.getCurrentPercentage() == 0) {
        console.log('No bottle left', this.statusBarBottle.getCurrentPercentage());
        return 0;//Keine Flaschen mehr da zum werfen
      }
      if (this.throwableObjects.length == 5) {
        this.statusBarBottle.calcNewPercentage('r');//r: Um 20% reduzieren
        this.throwableObjects = [];//Array leeren
        console.log('getCurrentPercentage', this.statusBarBottle.getCurrentPercentage());
      }
      let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.shot_sound.play();
    }
  }

  checkCollisions() {
    //Is character dead?
    if (this.character.isDead()) {//lost game
      this.gameInProgress = false;
      this.gameLost = true;
      console.log('this.gameLost', this.gameLost);
      this.clearAllInterval();
    }

    //Is character hit?
    for (let i = 0; i < this.level.enemies.length; i++) {
      let enemy = this.level.enemies[i];
      if (this.character.isColliding(enemy) && !this.character.isDead()) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.energy);
        console.log("this.character.energy", this.character.energy);
      }
    };

    //enemy scored?     
    this.throwableObjects.forEach((bottle) => {
      this.level.enemies.forEach((enemy) => {
        if (!enemy.isDead() && !enemy.isHurt() && bottle.isColliding(enemy)) {
          if (enemy instanceof Endboss) {//Endboss is scored
            enemy.kill();//Energy of Endboss is set to zero
            this.gameWin = enemy.isDead();//(boolean) Switch PlayAnimation in Endboss
            if (this.gameWin) {
              setTimeout(() => {
                this.drawGameInProgress = false;
              }, 2000);
            }
          } else {
            this.level.enemies.splice(this.level.enemies.indexOf(enemy), 1);
          }
        }
      });
    });

    //collect coins
    this.level.moneys.forEach((coin) => {
      if (this.character.isColliding(coin)) {
        let z = this.level.moneys.indexOf(coin);
        this.level.moneys.splice(z, 1);
        this.statusBarCoin.calcNewPercentage('r');//r: reduce
      }

      if (this.level.moneys == '') {
        this.character.energy = 100;
        this.statusBar.setPercentage(this.character.energy)
      }
    });

    //collect bottles    
    this.level.bottles.forEach((bottle) => {
      if ((this.statusBarBottle.percentage >= 0 && this.statusBarBottle.percentage < 100)) {
        if (this.character.isColliding(bottle)) {
          let z = this.level.bottles.indexOf(bottle);
          this.level.bottles.splice(z, 1);
          this.statusBarBottle.calcNewPercentage('a');//a: add
        }
      }
    });
  }

  clearAllInterval() {
    clearInterval(this.checkInterval);
  }

  draw() {
    //full sreen
    if (this.fullScreen) {
      document.getElementById('contentOfcanvas').requestFullscreen();
      this.fullScreen = false;
    }

    //"Leinwand" sauber machen
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.gameInProgress) {
      this.drawGameInProgress();
    } else if (this.gameLost) {
      this.drawGameLost();
    } else if (this.gameWin) {
      this.drawGameWin();
    } else {
      this.drawGameStart();
    }

    //draw(); Wird immer wieder aufgerufen(je nach Grafikarte 10 - 25 fps). Grund: Die load-Fkt braucht Zeit zum laden d. Bildes und draw() wird aber inzwischen aufgerufen, obwohl des Bild noch nicht geladen ist.
    let self = this; //Aus irgendwelchen Gründen, kann man nicht schreiben: this.self.draw() in der Funk "requestAnimationFrame"; Mit dem hack (techn. Kniff),also zuerst dem slef das Keywort "this" ausserhalb von requestAnimationFrame zuweisen funktioniert es! - Warum das so ist weiß niemand! Einfach so akzeptieren!
    this.gameReq = requestAnimationFrame(function () {//Diese Funktion wird von der Grafikkarte ausgeführt.
      self.draw();
    });
  }

  drawGameWin() {
    this.addToMap(this.gameOverImg);//If game is win    
  }

  drawGameLost() {
    this.addToMap(this.lostGameImg);//If game is lost
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
    //statusbarCoin
    this.addToMap(this.statusBarCoin);
    //statusBarBottle
    this.addToMap(this.statusBarBottle);

    this.ctx.translate(this.camera_x, 0);//Ursprung von ctx wird verschoben,dann die Nachfolgenden Bilder gezeichnet

    //character
    this.addToMap(this.character); //Methode: drawImage(); Character auf Bildschirm mit Koord. verschieben
    //chickens
    this.addObjectsToMap(this.level.enemies);
    //clouds
    this.addObjectsToMap(this.level.clouds);
    //Wurfobjekt
    this.addObjectsToMap(this.throwableObjects);
    //moneys
    this.addObjectsToMap(this.level.moneys);
    //bottle
    this.addObjectsToMap(this.level.bottles);

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


