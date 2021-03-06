class Endboss extends MovableObject {

  height = 400;
  width = 250;
  y = 55;

  IMAGES_ARLAM = [
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png'
  ];

  IMAGES_DEATH = [
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G24.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G25.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/4.Muerte/G26.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_ARLAM[0]);//s. movable-objekt.class
    this.loadImages(this.IMAGES_ARLAM);//s. movable-objekt.class;
    this.loadImages(this.IMAGES_DEATH);
    this.x = 2500;
  }

  //Bilder sollen nacheinander ausgetauscht werden damit eine Bewegung simuliert wird
  animate() {
    setInterval(() => {
      if (this.isDead()) {
        //death
        this.playAnimation(this.IMAGES_DEATH);
      } else {
        //walk animation       
        this.playAnimation(this.IMAGES_ARLAM);
      }
    }, 200);
  }
}