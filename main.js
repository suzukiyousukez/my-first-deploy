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
  input: {
    activePointers: 3
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
let debugText;

function preload() {}

function create() {

  // 🔥 入力を明示的に有効化
  this.input.addPointer(3);
  this.input.mouse.enabled = true;
  this.input.touch.enabled = true;

  // 四角テクスチャ作成
  const graphics = this.add.graphics();
  graphics.fillStyle(0x00ff00, 1);
  graphics.fillRect(0, 0, 50, 50);
  graphics.generateTexture("player", 50, 50);
  graphics.destroy();

  // プレイヤー生成
  player = this.physics.add.sprite(400, 300, "player");
  player.setCollideWorldBounds(true);

  // キーボード
  cursors = this.input.keyboard.createCursorKeys();

  // デバッグ表示
  debugText = this.add.text(10, 10, "no touch", {
    fontSize: "20px",
    fill: "#ffffff"
  });

  // 🔥 タッチイベント確認
  this.input.on("pointerdown", () => {
    debugText.setText("touching");
  });

  this.input.on("pointerup", () => {
    debugText.setText("no touch");
  });
}

function update() {
  const speed = 200;
  player.setVelocity(0);

  // キーボード移動
  if (cursors.left.isDown) player.setVelocityX(-speed);
  else if (cursors.right.isDown) player.setVelocityX(speed);

  if (cursors.up.isDown) player.setVelocityY(-speed);
  else if (cursors.down.isDown) player.setVelocityY(speed);

  // 🔥 タッチ中ならその方向へ移動
  if (this.input.activePointer.isDown) {

    const pointer = this.input.activePointer;

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
