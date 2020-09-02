class Text extends Phaser.GameObjects.Text {
  constructor(scene, x, y, text, styles){
    super(scene, x, y, text, styles);
    this.scene.add.existing(this);
  }
}

export default Text;