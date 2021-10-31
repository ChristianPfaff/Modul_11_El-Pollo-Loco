class StatusBarCoin extends DrawableObjekt {
  percentage = 100;

  IMAGES = [
    'img/7.Marcadores/Barra/Marcador moneda/azul/0_.png',// Array 0;
    'img/7.Marcadores/Barra/Marcador moneda/azul/20_.png',
    'img/7.Marcadores/Barra/Marcador moneda/azul/40_.png',
    'img/7.Marcadores/Barra/Marcador moneda/azul/60_.png',
    'img/7.Marcadores/Barra/Marcador moneda/azul/80_.png',
    'img/7.Marcadores/Barra/Marcador moneda/azul/100_.png'// Array 5
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 30;
    this.y = 40;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  calcNewPercentage() {
    this.setPercentage(this.percentage -= 20);
  }

  //setPercentage(50); 
  setPercentage(percentage) {
    this.percentage = percentage;// => 0 ... 5 Bild im Array
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage > 80) {
      return 4;
    } else if (this.percentage > 60) {
      return 3;
    } else if (this.percentage > 40) {
      return 2;
    } else if (this.percentage > 20) {
      return 1;
    } else {
      return 0;
    }
  }
}