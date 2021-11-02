const level1 = new Level(//Hier werden die Obekte an den Konstruktor übergeben. Außerdem ist level1 eine globale Variable.
  [//3 Chicken-Objekte in einem Array definiert:
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Endboss()
  ],
  [
    new Cloud()
  ],
  [
    new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', -719),
    new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', -719),
    new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', -719),
    new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', -719),

    new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 0),
    new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 0),
    new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 0),
    new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 0),
    new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719),
    new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 719),
    new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 719),
    new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719),

    new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 2),
    new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/1.png', 719 * 2),
    new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/1.png', 719 * 2),
    new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/1.png', 719 * 2),
    new BackgroundObject('img/5.Fondo/Capas/5.cielo_1920-1080px.png', 719 * 3),
    new BackgroundObject('img/5.Fondo/Capas/3.Fondo3/2.png', 719 * 3),
    new BackgroundObject('img/5.Fondo/Capas/2.Fondo2/2.png', 719 * 3),
    new BackgroundObject('img/5.Fondo/Capas/1.suelo-fondo1/2.png', 719 * 3)

  ],
  [
    new MoneyObject(300, 350),
    new MoneyObject(500, 300),
    new MoneyObject(700, 350),
    new MoneyObject(900, 300)
  ],
  [
    new StatusBarBottle(300, 600),
    new StatusBarBottle(500, 500),
    new StatusBarBottle(700, 500),
    new StatusBarBottle(900, 500)
  ]
);
