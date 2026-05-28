const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    width: 800,
    height: 600,
    backgroundColor: '#87CEEB',

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },

    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

let player;
let platforms;
let cursors;

function preload() {
    
    this.load.image('idle', 'assets/idle.png');

    this.load.image('walk1', 'assets/walk1.png');

    this.load.image('walk2', 'assets/walk2.png');

    this.load.image('walk3', 'assets/walk3.png');



}

function create() {

    // plataformas
    platforms = this.physics.add.staticGroup();

    // chão
    platforms.create(400, 590).setDisplaySize(800, 20).refreshBody();

    // plataforma no meio
    platforms.create(400, 450).setDisplaySize(200, 20).refreshBody();

    // jogador
    player = this.physics.add.sprite(100, 300, 'idle');

    player.setScale(2);

    player.setBounce(0.1);

    player.setCollideWorldBounds(true);

    // colisão
    this.physics.add.collider(player, platforms);

    // teclado
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {

    // esquerda
    if (cursors.left.isDown) {
        player.setVelocityX(-200);
    }

    // direita
    else if (cursors.right.isDown) {
        player.setVelocityX(200);
    }

    // parado
    else {
        player.setVelocityX(0);
    }

    // pulo
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-500);
    }
}