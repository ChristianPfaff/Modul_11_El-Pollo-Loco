class Chicken extends MovableObject {

  y = 350;//Bildpos. in y-Richtung
  height = 80; //Bildhöhe
  width = 80; //Bildbreite
  IMAGES_WALKING = [//Für Bewegungssimulation der Hühner
    'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png',
    'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/2-Ga_centro.png',
    'img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/3.Ga_paso izquierdo.png'
  ];


  constructor() {//Funktion, die es in jeder Klasse gibt. Wird immer als allererstes ausgeführt wenn ein neues Objekt erstellt wird.

    //Mit super() kann auf Methoden der übergeordneten Klasse (hier MovableObject) zugegriffen werden
    super().loadImage('img/3.Secuencias_Enemy_básico/Versión_Gallinita (estas salen por orden de la gallina gigantona)/1.Ga_paso_derecho.png');//s. movable-objekt.class
    this.loadImages(this.IMAGES_WALKING);//s. movable-objekt.class

    this.x = 200 + Math.random() * 500;//Zufällige Pos. in x-Richtung. Mit Math.random wird zufällig eine Zahl zwischen 0...1 ausgewält. Zahl ist hier also zwischen 200 und 700.
    this.speed = 0.15 + Math.random() * 0.25;//Zufällige Geschwindigkeit
    //this.animate();

  }



  //Bilder sollen nacheinander ausgetauscht werden damit eine Bewegung simuliert wird
  animate() {
    setInterval(() => {//Wiederholt sich dauernt
      this.moveLeft();
    }, 1000 / 60);//60 fps nach Links bewegen

    let chiInterv2 = setInterval(() => {
      // walk animation
      this.playAnimation(this.IMAGES_WALKING);//s. movable-objekt.class
    }, 200);
  }



}

