let game_scene = new Phaser.Scene("Game");


game_scene.preload = function () {
    this.load.image("background", "images/background.png");
    this.load.image("player", "images/player.png");
    this.load.image("enemy", "images/enemy.png");
    this.load.image("pras", "images/pras.png");
};

game_scene.create = function () {
    let bg = this.add.sprite(0, 0, "background");
    bg.setPosition(640 / 2, 360 / 2);

    

    this.player = this.add.sprite(50, 180, "player");
    this.player.setScale(0.5, 2);

    

    this.enemies = [
        this.add.sprite(250, 180, "enemy").setScale(2),
        this.add.sprite(450, 100, "enemy").setScale(1.5),
    ];
    this.enemies.forEach((enemy) => {
        enemy.speed = 1.2
        enemy.flipX = true;
    });
    this.playerLives = 3;
    this.livesText = this.add.text(10, 10, `Lives: ${this.playerLives}`, { font: '20px Arial', fill: '#ffffff' });

    this.isGameStarted = false;
  let startButton = this.add.text(this.game.renderer.width / 2, this.game.renderer.height / 2, 'Start Game', { fontSize: '32px', fill: '#FFF' });
  startButton.setOrigin(0.5, 0.5);
  startButton.setInteractive();
  startButton.on('pointerdown', function () {
    this.isGameStarted = true;
    startButton.visible = false;
  }, this);

    // יצירת אובייקט עם מאפייני הכפתורים של הקלדת החצים
    this.cursors = this.input.keyboard.createCursorKeys();

    // מיקום הפרס בצד התחתון של המסך
    this.pras = this.add.sprite(580, 190, "pras");
    this.pras.setScale(1);
    this.pras.setOrigin(0.5, 1); // הגדרת נקודת המוצא של הפרס להיות בתחתית התמונה
  
};

const PLAYER_MOVEMENT_AMOUNT = 60;

game_scene.update = function (time, delta) {
  if (this.isGameStarted) {
    // לוגיקה של המשחק
    if (this.input.keyboard.keys[Phaser.Input.Keyboard.KeyCodes.RIGHT]?.isDown) {
      this.player.x += PLAYER_MOVEMENT_AMOUNT * (delta / 1000);
    }
  
    this.enemies.forEach((enemy) => {
      enemy.y += enemy.speed;
  
      if (enemy.y >= 300 || enemy.y <= 100) {
        enemy.speed = -enemy.speed;
      }
  
      // בדיקה האם השחקן התנגש עם האויב
      if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.getBounds())) {
        // הורדת חיים ועדכון הטקסט
        this.playerLives--;
        this.livesText.setText("Lives: " + this.playerLives);
  
        // בדיקה האם החיים נגמרו
        if (this.playerLives <= 0) {
          alert("Game Over");
          this.scene.restart();
        } else {
          // אם יש חיים נותרים, השחקן מועבר למקום ההתחלתי
          this.player.setPosition(50, 180);
        }
      }
  
      // בדיקה האם השחקן נגע בפרס
      if (Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), this.pras.getBounds())) {
        this.scene.restart();
        alert("נצחתת!");
       
      }
    });
}
    
  };
  

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: game_scene,
};

let game = new Phaser.Game(config);
