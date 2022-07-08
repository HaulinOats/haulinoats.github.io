class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, enemyType){
    super(scene, x, y);
    this.setScale(2);
    this.scene.anims.create({
      key: enemyType,
      frames: this.scene.anims.generateFrameNumbers(enemyType),
      frameRate: 1,
      repeat: -1
    });
    this.play(enemyType);
  }
}

export default Enemy;