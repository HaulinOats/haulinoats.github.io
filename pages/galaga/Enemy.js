class Enemy extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y){
    super(scene, x, y);
    this.setScale(2);
    this.scene.anims.create({
      key: "enemy",
      frames: this.scene.anims.generateFrameNumbers('enemy'),
      frameRate: 1,
      repeat: -1
    });
    this.play('enemy');
  }
}

export default Enemy;