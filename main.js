const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  backgroundColor: "#2d2d2d",
  physics: {
    default: "arcade",
    arcade: { debug: false }
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let player;
let cursors;
let pointer;

function preload() {}

function create() {
  const graphics = this.add.graphics();
  graphics.fillStyle(0x00ff00, 1);
  graphics.fillRect(0, 0, 50, 50);
  graphics.generateTexture("player", 50, 50);
  graphics.destroy();

  player = this.physics.add.sprite(400, 300, "player");
  player.setCollideWorldBounds(true);

  cursors = this.input.keyboard.createCursorKeys();

  pointer = this.input.activePointer;
}

function update() {
  const speed = 200;
  player.setVelocity(0);

  // キーボード操作
  if (cursors.left.isDown) player.setVelocityX(-speed);
  else if (cursors.right.isDown) player.setVelocityX(speed);

  if (cursors.up.isDown) player.setVelocityY(-speed);
  else if (cursors.down.isDown) player.setVelocityY(speed);

  // タッチ操作
  if (pointer.isDown) {
    const angle = Phaser.Math.Angle.Between(
      player.x,
      player.y,
      pointer.worldX,
      pointer.worldY
    );

    player.setVelocity(
      Math.cos(angle) * speed,
      Math.sin(angle) * speed
    );
  }
}
