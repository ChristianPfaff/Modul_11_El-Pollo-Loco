class Level {
  enemies;
  clouds;
  backgroundObjects;
  money;
  level_end_x = 2200;

  constructor(enemies, clouds, backgroundObjects, moneys) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.moneys = moneys;
  }
}