# Game Development - Phaser.io tutorial

## Lecture 8

Group up in teams. Every team will work on a different challenge.

### Challenge 1 - Game over.

If the player is falling too far, the game should be over.

Questions:
- What is a good distance, the player should be able to fall?
- How to say weather the player is falling on the ground or a platform (check: this.player.body.blocked.down || this.player.body.touching.down)

Ideas:
- [x] Shake the camera
- [x] Kill the player
- [ ] Show some text
- [ ] Have three life

```javascript

// FIRST: Check if player is falling too much
// 1. In "var PhaserGame = function () { ..."
// put a variable to save if player is dead.
this.dead = false
// 2. The actual check is happening in the update function.
if (this.player.body.velocity.y >= 500) { this.dead = true }

// SECOND: If player is touching a platform. GameOver.
// This check must be after the "this.physics.arcade.collide(this.player, this.platforms)". Otherwise it will not work on platforms.
// This goes in the update function.
if ( this.player.body.blocked.down || this.player.body.touching.down ) { gameOver(this) }
// This goes in no function. Outside everything.
// "this" is "t" here.
function gameOver (t) {
  if (t.dead) {
    // SOMETHING HAPPENS! 
  }
}

// Shake the camera
this.camera.shake(0.5, 500)
// Kill the player
this.player.kill()

// For a button to restart after dying:
// Put this into the gameOver function.
this.text = this.add.text(100, 100, 'some text')
this.text.fixedToCamera = true;
text.inputEnabled = true;
text.events.onInputDown.add(someFunction, this);
// Heads up: someFunction is not defined. It must be a function at the very end of the code.
// Talk to the people fro Challenge 2. They can explain, how it works.


```

### Challenge 2 - Next level.

If the player reaches the top of the level, he should get to the next level.

Questions:
- What is a good height to switch to the next level?

Ideas:
- [x] Change to the next level
- [x] Make the next level more difficult (change setting like platform speed, ...)
- [ ] Show some message before starting the next level.

```javascript

// If player is close to the top:
// This goes into the update function.
if (this.player.body.position.y < 100) { nextLevel() }

// This goes in no function. Outside everything.
function nextLevel () {
  // CHANGE SOME SETTINGS... (e.g. platform speed)
  this.game.state.start('Game')
}

// How to change platform speed?
// find this line in the create function: "platform.body.velocity.x = this.rnd.between(100, 150);"
// Add a variable at the very top!
var plfSpeedMax = 150
// Change the line in the create function:
platform.body.velocity.x = this.rnd.between(100, plfSpeedMax);
// Change the value in the nextLevel function;
plfSpeedMax = 450
// You could also always add some value. So everytime, you change the level, it gets more:
plfSpeedMax += 20

// How to show some message between the levels?
// FYI: This line takes our game that we define here "PhaserGame.prototype = {..."
// and adds it to the "state manager" with the name "Game": "game.state.add('Game', PhaserGame, true);"
// If the last argument is "true", the game will direclty start.
// Everytime we call "this.game.state.start('Game')", we start the "Game" again.

// This is how you can add another game.
// Put that outside everything.
var NextGame = {
  init: function () {},
  preload: function () {},
  update: function () {},
  create: function () {
    text = this.add.text(100, 100, '- Hello Rosenberg -')
    text.fill = '#fff'
  }
}
game.state.add('Game Next Level', NextGame, false);

// See: Here we have "false" so the game does not start directly. We can start it, using:
this.game.state.start('Game Next Level')

```

### Challenge 3 - Add items to collect.

Place some items on the platforms to collect.

Questions:
- How many items should be there? One on every platform?

Ideas:
- [x] Place Diamonds
- [x] Make them stay
- [ ] Add some more Items
- [ ] Count collected items

```javascript

// Example Diamonds:
// FIRST: Load the diamond
// This goes into the preload function.
this.load.image('diamond', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/diamond.png');

// SECOND: Place the items on the platforms
// This goes into the create funtion.
// Before the loop.
this.diamonds = this.add.physicsGroup();
// In the loop.
var diamond = this.diamonds.create(x+55, y-32, 'diamond');
diamond.body.velocity.x = platform.body.velocity.x
platform.diamond = diamond
// After the loop
this.diamonds.setAll('body.allowGravity', false);
this.diamonds.setAll('body.immovable', true);
// In the warpPlatform function:
platform.diamond.x = 640+55
// and
platform.diamond.x = -160+55


// THIRD: Consume item
// This goes into the update function
this.physics.arcade.overlap(this.player, this.diamonds, eatItem)

// This goes outside everything (very end of the file)
function eatItem(player, item) {
  item.kill();
}

// MORE ITEMS:
// Load them in the preload function.
this.load.image('someNAME', 'https://raw.githubusercontent.com/photonstorm/phaser-examples/master/examples/assets/sprites/FILENAME');
// Put some name for "someNAME" and one of the filenames below for "FILENAME".
// Possible Filenames:
// carrot.png, firstaid.png, master.png, melon.png, mushroom2.png, mushroom.png, pangball.png, pineapple.png
// spinObj_01.png, spinObj_02.png, spinObj_03.png, spinObj_04.png, spinObj_05.png, spinObj_06.png, spinObj_07.png, spinObj_08.png

// Add a score for the items.
// Add text like that:
this.text = this.add.text(100, 100, '- Some score -')
this.text.fill = '#fff'
// You can change the text for display the score like that:
this.text.text = "Your score: " + score
// Heads up! "score" must be a global variable. Put it outside everything.
score = 0

// If you have a score: update the score in the eatItem function:
score++
text.text = score
// Does that work? Why (not)?

```
