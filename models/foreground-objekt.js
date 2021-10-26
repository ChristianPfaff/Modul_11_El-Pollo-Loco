class ForegroundObjekt extends DrawableObjekt {
  canvas;
  constructor(canvas) {
    super().loadImage('img/9.Intro _ Outro Image/Start Screen/Opción 1.png');
    this.y = 0;
    this.x = 0;
    //this.canvas = canvas;
    this.height = canvas.height;
    this.width = canvas.width;
  }
}