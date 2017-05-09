# Game Development - Phaser.io tutorial

## Lecture 8

Group up in teams. Every team will work on a different challenge.

### Challenge 1 - Game over.

```javascript
// PLAYER IS FALLING TOO MUCH
// have a variable this.dead = false
if (this.player.body.velocity.y >= 500) { this.dead = true }

// DIE ON TOUCHING A PLATFORM
if ( this.player.body.blocked.down || this.player.body.touching.down ) { gameOver(this) }
function gameOver (t) {
  if (t.dead) { SOMETHING HAPPENS! }
}

// SHAKE THE CAMERA
this.camera.shake(0.5, 500)
```

### Challenge 2 - Next level.

```javascript
// IF PLAYER IS CLOSE TO THE TOP
if (this.player.body.position.y < 100) { nextLevel() }

function nextLevel () {
  // CHANGE SOME SETTINGS... (e.g. platform speed)
  this.game.state.start('Game')
}
```

### Challenge 3 - Add items to collect.

```javascript
// LOAD DIAMOND
this.load.image('diamond', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/diamond.png');

// PLACE ITEM ON PLATFORM
this.diamonds = this.add.physicsGroup();
this.diamonds.setAll('body.allowGravity', false);
this.diamonds.setAll('body.immovable', true);
var diamond = this.diamonds.create(x+55, y-32, 'diamond');
diamond.body.velocity.x = platform.body.velocity.x

// CONSUME ITEM
this.physics.arcade.overlap(this.player, this.item, eatItem)
// OR (IF IT IS A GROUP) use this.items instead of this.item!!
function eatItem(player, item) {
	 item.kill();
	 // If you have a score: update the score: "score++" and "scoreText.text = score"
}

// MORE ITEMS:
this.load.image('diamond', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/????????????');
carrot.png, firstaid.png, master.png, melon.png, mushroom2.png, mushroom.png, pangball.png, pineapple.png
spinObj_01.png, spinObj_02.png, spinObj_03.png, spinObj_04.png, spinObj_05.png, spinObj_06.png, spinObj_07.png, spinObj_08.png
```
