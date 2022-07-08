class Ship extends Phaser.GameObjects.Image {
  constructor(scene, x, y, texture){
    super(scene, x, y, texture);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setTexture(texture);
    this.setScale(0.035);
    this.setOrigin(0,0);
    this.deltaX = 8;
    this.deltaY = 5;
    this.width = this.getBounds().width;
    this.height = this.getBounds().height;
    this.gameHeight = this.scene.game.config.height;
    this.gameWidth = this.scene.game.config.width;
  }

  moveLeft(){
    if(this.x > 0){
      this.x -= this.deltaX;
    }
  }

  moveRight(){
    if(this.x < this.gameWidth - this.width){
      this.x += this.deltaX;
    }
  }

  moveUp(){
    if(this.y > 0){
      this.y -= this.deltaY;
    }
  }

  moveDown(){
    if(this.y < this.gameHeight - this.height){
      this.y += this.deltaY;
    }
  }
}

export default Ship;