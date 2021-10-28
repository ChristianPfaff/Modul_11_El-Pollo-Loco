class MoneyObject extends MovableObject {

  constructor(x, y) {
    super().loadImage('img/8.Coin/Moneda1.png');
    this.height = 80;
    this.width = 80;
    this.x = x;
    this.y = y;
  }
}