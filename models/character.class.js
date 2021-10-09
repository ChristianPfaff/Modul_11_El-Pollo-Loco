class Character extends MovableObject {
  //hoehe
  height = 250; //Bildhöhe
  width = 150; //Bildbreite
  x = 120; //Standartwert
  y = 180; //Standartwert
  IMAGES_WALKING = [//Bildersequenzen von El Pollo
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-22.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-23.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-24.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-25.png',
    'img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-26.png'
  ];
  currentImage = 0;


  constructor() {//Funktion, die es in jeder Klasse gibt. Wird immer als allererstes ausgeführt wenn ein neues Objekt erstellt wird.
    super().loadImage('img/2.Secuencias_Personaje-Pepe-corrección/2.Secuencia_caminata/W-21.png');//s. movable-objekt.class
    this.loadImages(this.IMAGES_WALKING);//s. movable-objekt.class

    this.animate();
  }

  //Bilder sollen nacheinander ausgetauscht werden
  animate() {
    setInterval(() => {
      let i = this.currentImage % this.IMAGES_WALKING.length;// i= 0,1,2,3,4,5,6 dann wieder 0,1,2,3,4,5,6 usw.
      let path = this.IMAGES_WALKING[i];
      this.img = this.imageCache[path];
      this.currentImage++;//currentImage bei jedem Durchgang um eins erhöhen
    }, 100);
  }

  jump() {

  }

}
