class MoneyObject extends MovableObject {

  constructor() {
    super();
    this.height = 80;
    this.width = 80;
    this.randomXY();
  }

  randomXY() {
    this.x = 100 + Math.random() * 50;
    this.y = 100 + Math.random() * 50;
  }

}