class EnemyBullet extends Phaser.GameObjects.Image {
  constructor(scene, x, y){
    super(scene, x, y);
    this.setTexture('enemyBullet');
    this.speed = .25;
    this.direction = 0;
    this.xSpeed = 0;
    this.ySpeed = 0;
  }

  fire(shooter, target){
    this.setPosition(shooter.x, shooter.y);
    this.direction = Math.atan( (target.x-this.x) / (target.y-this.y));

    if (target.y >= this.y) {
        this.xSpeed = this.speed*Math.sin(this.direction);
        this.ySpeed = this.speed*Math.cos(this.direction);
    } else {
        this.xSpeed = -this.speed*Math.sin(this.direction);
        this.ySpeed = -this.speed*Math.cos(this.direction);
    }
  }

  update(time, delta){
    this.x += this.xSpeed * delta;
    this.y += this.ySpeed * delta;
    if(this.y > this.scene.game.config.height){
      this.destroy();
    }
  }
}

export default EnemyBullet;