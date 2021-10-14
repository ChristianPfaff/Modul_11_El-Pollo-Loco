class Endboss extends MovableObject {

  height = 400;
  width = 250;
  y = 55;


  IMAGES_WALKING = [
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G5.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G6.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G7.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G8.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G9.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G10.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G11.png',
    'img/4.Secuencias_Enemy_gigantón-Doña_Gallinota-/2.Ateción-ataque/1.Alerta/G12.png'
  ];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);//s. movable-objekt.class
    this.loadImages(this.IMAGES_WALKING);//s. movable-objekt.class;
    this.x = 2500;
    this.animate();
  }

  //Bilder sollen nacheinander ausgetauscht werden damit eine Bewegung simuliert wird
  animate() {
    setInterval(() => {
      // walk animation
      this.playAnimation(this.IMAGES_WALKING);
    }, 200);
  }

}