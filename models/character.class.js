class Character extends MovableObject {

  height = 250; //Bildhöhe
  width = 150; //Bildbreite
  x = 120; //Standartwert
  y = 180; //Standartwert
  speed = 10;

  IMAGES_WALKING = [//Bildersequenzen von El Pollo
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
  ];
  world;//Enthält Referenz zur Klasse world
  walking_sound = new Audio('audio/el_pollo_loco.mp3');

  constructor() {//Funktion, die es in jeder Klasse gibt. Wird immer als allererstes ausgeführt wenn ein neues Objekt erstellt wird.
    super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');//s. movable-objekt.class
    this.loadImages(this.IMAGES_WALKING);//s. movable-objekt.class
    this.animate();
  }

  //Bilder sollen nacheinander ausgetauscht werden
  animate() {

    //Nach Rechts oder Links maschieren
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.x += this.speed;
        this.otherDirection = false;// image not mirrored
        this.walking_sound.play();
      }
      console.log(this.world.level.level_end_x);
      if (this.world.keyboard.LEFT && this.x > 0) {
        this.x -= this.speed;
        this.otherDirection = true;// image mirrored
        this.walking_sound.play();
      }
      this.world.camera_x = -this.x + 100;//Kamera schwenkt entgegen der Laufrichtung

    }, 1000 / 60);

    //Hände und Füße bewegen
    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        // walk animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 50);
  }

  jump() {

  }

}
