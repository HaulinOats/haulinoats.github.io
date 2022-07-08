class Explosion extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y){
    super(scene, x, y);
    scene.anims.create({
      key: "explosion",
      frames: this.scene.anims.generateFrameNumbers('explosion'),
      frameRate: 60,
      repeat: 0,
      hideOnComplete:true
    });
    this.play('explosion');
  }
}

export default Explosion;