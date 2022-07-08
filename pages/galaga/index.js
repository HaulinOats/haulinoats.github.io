import GameScene from './GameScene.js';

if(window.innerHeight > window.innerWidth){
    console.log('on mobile');
} else {
    console.log('desktop (or horizontal)');
}

var config = {
    type: Phaser.AUTO,
    width: window.innerHeight > window.innerWidth ? window.innerWidth : 500,
    height: window.innerHeight > window.innerWidth ? window.innerHeight : 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [
        GameScene
    ]
}

var game = new Phaser.Game(config);