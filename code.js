var game = new Phaser.Game(640, 480, Phaser.CANVAS, 'game');

var PhaserGame = function () {

  // Set initial jumpTimer
  this.jumpTimer = 0

};

PhaserGame.prototype = {

  init: function () {

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.world.resize(640, 2000);

    // Set gravity
    this.physics.arcade.gravity.y = 800;

  },

  
  preload: function () {

    this.load.baseURL = 'http://files.phaser.io.s3.amazonaws.com/codingtips/issue003/';
    this.load.crossOrigin = 'anonymous';

    this.load.image('trees', 'assets/trees.png');
    this.load.image('clouds', 'assets/clouds.png');

    this.load.image('platform', 'assets/platform.png');
    this.load.image('ice-platform', 'assets/ice-platform.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);

  },

  
  create: function () {

    // Add background
    this.stage.backgroundColor = '#2f9acc';
    this.sky = this.add.tileSprite(0, 0, 640, 480, 'clouds');
    this.sky.fixedToCamera = true;

    this.add.sprite(0, 1906, 'trees');

    // ADD PLATFORMS
    this.platforms = this.add.physicsGroup();

    var x = 0;
    var y = 64;

    for (var i = 0; i < 19; i++)
    {
        var type = i % 2 === 1 ? 'platform' : 'ice-platform';
        var platform = this.platforms.create(x, y, type);

        //  Set a random speed between 50 and 150
        platform.body.velocity.x = this.rnd.between(100, 150);

        //  Inverse it?
        if (Math.random() > 0.5)
        {
            platform.body.velocity.x *= -1;
        }

        x += 200;

        if (x >= 600)
        {
            x = 0;
        }

        y+= 104;
    }

    this.platforms.setAll('body.allowGravity', false);
    this.platforms.setAll('body.immovable', true);


    // ADD Player
    this.player = this.add.sprite(320, 1952, 'dude');

    // Add physics for the player
    this.physics.arcade.enable(this.player);
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(20, 32, 5, 16);

    // Camera follows the player
    this.camera.follow(this.player);

    // Add Animations
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('turn', [4], 20, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    // Activate Keyboard
    this.cursors = this.input.keyboard.createCursorKeys();

  },

  
  update: function () {
    this.sky.tilePosition.y = -(this.camera.y * 0.7)

    this.platforms.forEach(wrapPlatform);

    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown)
    {
        this.player.body.velocity.x = -200;

        if (this.facing !== 'left')
        {
            this.player.play('left');
            this.facing = 'left';
        }
    }
    else if (this.cursors.right.isDown)
    {
        this.player.body.velocity.x = 200;

        if (this.facing !== 'right')
        {
            this.player.play('right');
            this.facing = 'right';
        }
    }
    else
    {
        if (this.facing !== 'idle')
        {
            this.player.animations.stop();

            if (this.facing === 'left')
            {
                this.player.frame = 0;
            }
            else
            {
                this.player.frame = 5;
            }

            this.facing = 'idle';
        }
    }

    // Collide player and platforms
    this.physics.arcade.collide(this.player, this.platforms)
    var standing = this.player.body.blocked.down || this.player.body.touching.down;
    // Jump up
    if (standing && this.cursors.up.isDown && this.time.time > this.jumpTimer)
    {
        this.player.body.velocity.y = -500;
        this.jumpTimer = this.time.time + 750;
    }

  }

};


game.state.add('Game', PhaserGame, true);


function wrapPlatform (platform) {

  if (platform.body.velocity.x < 0 && platform.x <= -160)
  { platform.x = 640; }
  else if (platform.body.velocity.x > 0 && platform.x >= 640)
  { platform.x = -160; }

}
