class Level {
  enemies;
  clouds;
  backgroundObjects;
  moneys;
  bottles;
  level_end_x = 2200;

  constructor(enemies, clouds, backgroundObjects, moneys, bottles) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.moneys = moneys;
    this.bottles = bottles;
  }

  animate() {
    this.enemies.forEach(e => e.animate());
    this.clouds.forEach(c => c.animate());
  }
}