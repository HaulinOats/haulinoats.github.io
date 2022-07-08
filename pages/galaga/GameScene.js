import Ship from './Ship.js';
import ShipLaser from './ShipLaser.js';
import Enemy from './Enemy.js';
import EnemyBullet from './EnemyBullet.js';
import Explosion from './Explosion.js';
import Text from './Text.js';

class GameScene extends Phaser.Scene {
  constructor(){
    super({scene:'GameScene'});
    this.isMobile = window.innerHeight > window.innerWidth ? true : false;
    this.enemyWidth = 0;
    this.enemyHeight = 0;
    this.enemyPadding = 10;
    this.enemyShiftDistance = 15;
    this.enemyLastFired = 2000;
    this.enemyBulletDelay = 1000;
    this.enemySpeed = 1;
    this.shipLaserBorn = 0;
    this.isShipDestroyed = false;
    this.enemiesMovingRight = true;
    this.enemiesMovingDown = true;
    this.score = 0;
    this.gameOver = false;
    this.highScores = [];
  }

  preload(){
    this.createMainContainer();
    this.getScores();

    this.load.image('background', 'assets/background.png');
    this.load.image('ship', 'assets/ship.png');
    this.load.spritesheet('blueEnemy', 'assets/blueEnemy.png', {
      frameWidth:15,
      frameHeight:16
    });
    this.load.spritesheet('greenEnemy', 'assets/greenEnemy.png', {
      frameWidth:15,
      frameHeight:15
    });
    this.load.image('shipLaser', 'assets/shipLaser.png');
    this.load.image('enemyBullet', 'assets/enemyBullet.png');
    this.load.spritesheet('explosion', 'assets/explosion.png', {
      frameWidth:100,
      frameHeight:100
    })
    this.load.image('shipExhaust', 'assets/shipExhaust.png');
    
    //sound icons
    this.load.image('mute', 'assets/mute.png');
    this.load.image('unmute', 'assets/unmute.png');
  }

  create(){
    //set background
    this.background = this.add.tileSprite(0,0, this.game.config.width, this.game.config.height, 'background').setOrigin(0,0);

    // The player and its settings. Send in game config variables for use by Ship
    this.playerShip = new Ship(this, 200, 550, 'ship');
    
    //create ship's exhaust particle animation
    this.shipExhaust = this.add.particles('shipExhaust');
    this.emitter = this.shipExhaust.createEmitter({
      x:15,
      y:40,
      speed:100,
      scale:{
        start:0.025,
        end:0
      },
      blendMode:'ADD',
      gravityY:700
    })
    this.emitter.startFollow(this.playerShip);

    this.shipLasers = this.physics.add.group({ 
      classType: ShipLaser, 
      runChildUpdate: true,
      maxSize:15
    });

    this.enemies = this.physics.add.group({
      classType:Enemy,
      runChildUpdate:true,
    });
    this.populateEnemies();

    this.enemyBullets = this.physics.add.group({
      classType:EnemyBullet,
      runChildUpdate:true,
      maxSize:10
    })

    this.explosions = this.add.group({
      classType:Explosion
    })

    // this.muteIcon = this.add.sprite(this.game.config.width - 30, 25, 'mute').setInteractive();
    // this.muteIcon.setScale(.05);
    // this.unmuteIcon = this.add.sprite(this.game.config.width - 30, 25, 'unmute').setInteractive();
    // this.unmuteIcon.setScale(.05);
    // this.unmuteIcon.setVisible(false);

    // this.muteIcon.on('pointerdown', e=>{
    //   this.muteIcon.setVisible(false);
    //   this.unmuteIcon.setVisible(true);
    // });

    // this.unmuteIcon.on('pointerdown', e=>{
    //   this.muteIcon.setVisible(true);
    //   this.unmuteIcon.setVisible(false);
    // })

    //create text objects
    this.scoreText = new Text(this, 10, 10, `Score: 0`, {fontSize:'20px'});

    //grab ui elements
    this.mainUIContainer = document.getElementById('main-ui-container');
    this.gameOverContainer = document.getElementById('game-over-container')
    this.nextLevelContainer = document.getElementById('next-level-container');
    this.highScoreBtn = document.getElementById('submit-high-score');
    this.yourScore = document.getElementById('your-score');
    this.yourNameInput = document.getElementById('score-name-input');
    this.checkHighScoresBtn = document.getElementById('check-high-scores');
    this.newHighScoreContainer = document.getElementById('new-high-score-container');
    this.highScoresContainer = document.getElementById('high-scores-container');

    //handle player input
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    
    //handle collisions
    this.physics.add.collider(this.enemies, this.shipLasers, this.enemyHit, null, this);
    this.physics.add.collider(this.playerShip, this.enemies, this.shipDestroyed, null, this);
    this.physics.add.collider(this.playerShip, this.enemyBullets, this.shipDestroyed, null, this);

    //event listeners
    if(this.isMobile){
      this.pointer = this.input.on('pointermove', (pointer)=>{
        if(pointer.x < this.game.config.width && pointer.x > 0 && pointer.y > 0 && pointer.y < this.game.config.height && !this.gameOver){
            this.playerFire();
            this.playerShip.setPosition(pointer.x - 10, pointer.y - 80)
        }
      })
    }
    this.gameOverContainer.addEventListener('pointerdown', this.actionHandler.bind(this));
    this.nextLevelContainer.addEventListener('pointerdown', this.actionHandler.bind(this));
    this.highScoreBtn.addEventListener('pointerdown', this.actionHandler.bind(this));
    this.yourNameInput.addEventListener('pointerdown', this.actionHandler.bind(this));
    this.highScoresContainer.addEventListener('pointerdown', this.actionHandler.bind(this));
    this.checkHighScoresBtn.addEventListener('pointerdown', this.actionHandler.bind(this));
  }

  clicky(e){
    console.log(e);
  }
  
  actionHandler(e){
    e.stopPropagation();
    let id = e.currentTarget.id;
    let classList = e.currentTarget.classList;
    //handle IDs
    switch(id){
      case "next-level-container":
        this.goToNextLevel();
        this.mainUIContainer.style.display = 'none';
        break;
      case "game-over-container":
        this.newHighScoreContainer.classList.remove('show-ui-container');
        this.mainUIContainer.style.display = 'none';
        this.resetGame();
        break;
      case "check-high-scores":
        this.buildHighScoresHTML();
        this.gameOverContainer.classList.remove('show-ui-container');
        this.highScoresContainer.classList.add('show-ui-container');
        break;
      case "high-scores-container":
        this.highScoresContainer.classList.remove('show-ui-container');
        this.mainUIContainer.style.display = 'none';
        this.resetGame();
        break;
      case "submit-high-score":
        if(this.yourNameInput.value.trim().length > 0){
          this.addNewHighScore();
          this.newHighScoreContainer.classList.remove('show-ui-container');
          this.gameOverContainer.classList.remove('show-ui-container');
          this.highScoresContainer.classList.add('show-ui-container');
        }
        break;
    }
    //handle classes
    classList.forEach(className=>{
      switch(className){

      }
    })
  }

  update(time, delta){
    //scroll background texture
    this.background.tilePositionY -= 1;

    if(!this.gameOver){
      this.moveEnemies();
      this.checkEnemyOutOfBounds();
      this.enemyFire();
    }
    
    if (this.upKey.isDown) {
      this.playerShip.moveUp();
    }

    if(this.downKey.isDown){
      this.playerShip.moveDown();
    }

    if(this.leftKey.isDown){
      this.playerShip.moveLeft();
    }

    if(this.rightKey.isDown){
      this.playerShip.moveRight();
    }

    //player shoot
    if(this.spaceKey.isDown){
      if(!this.gameOver){
        this.playerFire();
      }
    }

    if(this.enterKey.isDown){
      if(!this.enemies.getFirstAlive()){
        this.goToNextLevel();
      }
      if(this.gameOver){
        this.resetGame();
      }
    }
  }

  createMainContainer(){
    this.mainContainer = document.getElementById('main-container');
    this.mainContainer.style.width = this.game.config.width + 'px';
    this.mainContainer.style.height = this.game.config.height + 'px';
    document.body.appendChild(this.mainContainer);
    this.mainContainer.appendChild(this.game.context.canvas);
  }

  populateEnemies(){
    //create first enemy to get actual width and height due to scaling then destroy it
    let enemyRef = this.enemies.create(0 , 0, 'blueEnemy');
    this.enemyWidth = enemyRef.body.width;
    this.enemyHeight = enemyRef.body.height;
    enemyRef.destroy();

    //3 rows
    for(var i = 1; i < 4; i++){
      //8 columns
      for(var j = 1; j < 9; j++){
        if(j % 2){
          this.enemies.create(j * (this.enemyWidth + this.enemyPadding) , i * (this.enemyHeight + this.enemyPadding), 'blueEnemy');
        } else {
          this.enemies.create(j * (this.enemyWidth + this.enemyPadding) , i * (this.enemyHeight + this.enemyPadding), 'greenEnemy');
        }
      }
    }
  }

  checkEnemyOutOfBounds(){
    for(var i = 0; i < this.enemies.getChildren().length; i++){
      var enemy = this.enemies.getChildren()[i];
      //if any enemies overlap right side of screen
      if(this.game.config.width < enemy.x + enemy.width){
        this.enemiesMovingRight = false;
        this.shiftEnemies();
        return;
      }
      //if any enemies overlap left side of screen
      if(enemy.x < 0 + enemy.width){
        this.enemiesMovingRight = true;
        this.shiftEnemies();
        return;
      }
      //if enemies touch bottom of screen
      if(enemy.y + enemy.height > this.game.config.height){
        this.enemiesMovingDown = false;
        this.shiftEnemies();
        return;
      }
      //if enemies touch top of screen
      if(enemy.y < 0){
        this.enemiesMovingDown = true;
        this.shiftEnemies();
        return;
      }
    }
  }

  shiftEnemies(){
    for(var i = 0; i < this.enemies.getChildren().length; i++){
      var enemy = this.enemies.getChildren()[i];
      if(this.enemiesMovingDown){
        enemy.y += this.enemyShiftDistance;
      } else {
        enemy.y -= this.enemyShiftDistance;
      }
    }
  }

  moveEnemies(){
    for(var i = 0; i < this.enemies.getChildren().length; i++){
      let enemy = this.enemies.getChildren()[i];
      if(this.enemiesMovingRight){
        enemy.x += this.enemySpeed;
      } else {
        enemy.x -= this.enemySpeed;
      }
    }
  }

  enemyHit(bullet, enemy){
    this.score += 10;
    this.scoreText.setText(`Score: ${this.score}`);
    this.explosions.create(enemy.x, enemy.y);
    bullet.destroy();
    enemy.destroy();
    if(!this.enemies.getFirstAlive()){
      this.destroyAllBullets();
      this.mainUIContainer.style.display = 'flex';
      this.nextLevelContainer.classList.add('show-ui-container');
    }
  }

  destroyAllBullets(){
    this.enemyBullets.clear(true, true);
    this.shipLasers.clear(true, true);
  }

  shipDestroyed(){
    if(!this.isShipDestroyed){
      this.isShipDestroyed = true;
      this.mainUIContainer.style.display = 'flex';
      this.checkHighScores();
      this.explosions.create(this.playerShip.x, this.playerShip.y);
      this.destroyAllBullets();
      this.playerShip.setVisible(false);
      this.emitter.stop();
      this.gameOver = true;
      this.gameOverContainer.classList.add('show-ui-container');
      this.yourScore.innerHTML = this.score;
    }
  }

  playerFire(){
    if(this.game.getTime() > this.shipLaserBorn){
      var bullet = this.shipLasers.get();
      if(bullet){
        this.shipLaserBorn = this.game.getTime() + 250;
        bullet.setActive(true).fire(this.playerShip);
      }
    }
  }

  enemyFire(){
    if(this.game.getTime() > this.enemyLastFired){
      if(this.enemies.getFirstAlive()){
        var randomEnemyIdx = Math.floor(Math.random() * this.enemies.getChildren().length) + 1;
        var randomEnemy = this.enemies.getChildren()[randomEnemyIdx - 1];
        var enemyBullet = this.enemyBullets.get();
        if(enemyBullet){
          this.enemyLastFired = this.game.getTime() + this.enemyBulletDelay;
          enemyBullet.fire(randomEnemy, this.playerShip);
        }
      }
    }
  }

  resetGame(){
    this.isShipDestroyed = false;
    this.score = 0;
    this.scoreText.setText('Score: 0');
    this.enemySpeed = 1;
    this.gameOver = false;
    this.enemyLastFired = this.game.getTime() + this.enemyBulletDelay;
    this.enemies.clear(true, true);
    this.gameOverContainer.classList.remove('show-ui-container');
    this.playerShip.setVisible(true).setPosition(200, 550);
    this.emitter.start();
    this.populateEnemies();
  }

  goToNextLevel(){
    this.enemySpeed += 0.5;
    this.enemyLastFired = this.game.getTime() + this.enemyBulletDelay;
    this.nextLevelContainer.classList.remove('show-ui-container');
    this.enemyLastFired += 2000;
    this.populateEnemies();
    this.playerShip.setPosition(200, 550);
    this.destroyAllBullets();
    this.scene.resume();
  }

  checkHighScores(){
    //if score is not greater than zero, don't do anything
    if(this.score > 0){
      let isHighScore = false;

      //if there's less than 12 high scores, automatically add 
      //current user to high score list, otherwise, check if user's
      //score beats anyone else on the list
      if(this.highScores.length < 12){
        isHighScore = true;
      } else {
        this.highScores.forEach(scoreObj=>{
          if(this.score > scoreObj.score){
            isHighScore = true;
            return;
          }
        })
      }
      if(isHighScore){
        this.newHighScoreContainer.classList.add('show-ui-container');
      }
    }
  }
  
  addNewHighScore(){
    let newHighScore = {
      name:this.yourNameInput.value,
      score:this.score
    }
    this.highScores.push(newHighScore);
    this.highScores.sort(this.sortByScore);
    this.highScores = this.highScores.slice(0, 12);
    this.buildHighScoresHTML();

    axios.post('/galaga/high-scores', {
      newHighScore
    }).then(resp=>{
      console.log(resp.data);
    }).catch(err=>{
      console.log(err);
    })
  }

  getScores(){
    axios.get('/galaga/high-scores').then(resp=>{
      this.highScores = resp.data || [];
      this.highScores.sort(this.sortByScore);
      console.log(this.highScores);
    }).catch(err=>{
      console.log(err);
    })
  }

  buildHighScoresHTML(){
    let scoresHTML = "";
    if(this.highScores.length){
      this.highScores.forEach(scoreObj => {
        scoresHTML += `<div><span class="score-name">${scoreObj.name}</span><span class="score-score">${scoreObj.score}</span></div>`;
      });
    } else {
      scoresHTML += `<div>No Scores</div>`;
    }
    document.getElementById('high-scores-inner').innerHTML = scoresHTML;
  }
  
  sortByScore(a,b){
    if(a.score > b.score) return -1;
    if(a.score < b.score) return 1;
    else return 0;
  }
}

export default GameScene;