class ShipLaser extends Phaser.GameObjects.Image {
  constructor(scene, x, y){
    super(scene, x, y);
    this.setTexture('shipLaser');
    this.bulletDelta = 5;
  }

  fire(shooter){
    this.setPosition(shooter.x + shooter.width/2, shooter.y - shooter.height/2);
    this.timeBorn = 0;
  }

  update(time, delta){
    this.y -= this.bulletDelta;
    if(this.y < 0){
      this.destroy();
    }
  }
}

export default ShipLaser;