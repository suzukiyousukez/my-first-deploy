let debugText;

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

  debugText = this.add.text(10, 10, "no touch", { color: "#ffffff" });
}

function update() {
  player.setVelocity(0);

  if (pointer.isDown) {
    debugText.setText("touching");
  } else {
    debugText.setText("no touch");
  }
}
