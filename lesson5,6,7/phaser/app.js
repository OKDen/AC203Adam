console.log("test")

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});
var score = 0;
var life = 3;

function preload(){
  game.load.image('sky', 'assets/sky.png');
  game.load.image('ground', 'assets/platform.png');
  game.load.image('platform','assets/platform.png');
  game.load.image('star', 'assets/star.png');
  game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);
}

function create(){
  game.physics.startSystem(Phaser.Physics.ARCADE);
  // Create the sky
  game.add.sprite(0, 0, 'sky');
  // Create group of platforms
  platforms = game.add.physicsGroup();
  platforms.enableBody = true;
  // Create the ground
  var ground = platforms.create(0, 550, 'ground');
  ground.scale.setTo(2, 2);
  ground.body.immovable = true;
  // Create the ledges
  ledge1 = platforms.create(400, 400, 'platform');
  ledge1.scale.setTo(0.5,0.5);
  ledge1.body.immovable = true;
  ledge1.body.velocity.x = 100;
  ledge2 = platforms.create(-150, 250, 'platform');
  ledge2.scale.setTo(0.5,0.5);
  ledge2.body.immovable = true;
  ledge2.body.velocity.x = 100;
  // Creating the player sprite
  player = game.add.sprite(32, 400, 'dude');
    // Animating the player sprite
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);
    game.physics.arcade.enable(player);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
  // Create the enemies
  enemy1 = game.add.sprite(760, 20, 'baddie');
    // Animate the enemy1
    enemy1.animations.add('left', [0,1], 10, true);
    enemy1.animations.add('right', [2,3], 10, true);
    game.physics.arcade.enable(enemy1);
    enemy1.body.bounce.y = 0.2;
    enemy1.body.gravity.y = 500;
    enemy1.body.collideWorldBounds = false;

  enemy2 = game.add.sprite(10, 20, 'baddie');
    // Animate the enemy2
    enemy2.animations.add('left', [0,1], 10, true);
    enemy2.animations.add('right', [2,3], 10, true);
    game.physics.arcade.enable(enemy2);
    enemy2.body.bounce.y = 0.2;
    enemy2.body.gravity.y = 500;
    enemy2.body.collideWorldBounds = false;

  enemy3 = game.add.sprite(780, 20, 'baddie');
    // Animate the enemy3
    enemy3.animations.add('left', [0,1], 10, true);
    enemy3.animations.add('right', [2,3], 10, true);
    game.physics.arcade.enable(enemy3);
    enemy3.body.bounce.y = 0.2;
    enemy3.body.gravity.y = 500;
    enemy3.body.collideWorldBounds = false;

  // Create keyboard entries
  cursors = game.input.keyboard.createCursorKeys();
  space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  // game.input.keyboard.addKeyCapture(Phaser.Keyboard.SPACEBAR);

  // Create the stars
  stars = game.add.physicsGroup();
  stars.enableBody = true;
  // We will create 12 stars evenly spaced
  for(var i = 0; i < 12; i++){
    var star = stars.create(i * 70, 0, 'star');
    star.body.gravity.y = 200;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
  }


  //set text style
  var style = {font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
  //positioning the score
  scorelabel = game.add.text(-60,0, "Your score is: ", style);
  scoretext = game.add.text(70, 0, score,style);
  scorelabel.setShadow(3,3,'rgba(0,0,0,0.5)',2);
  scoretext.setShadow(3,3,'rgba(0,0,0,0.5)',2);

  //set the text bounds x0, y520, x800, y100
  scorelabel.setTextBounds(0,520,800,100);
  scoretext.setTextBounds(0,520,800,100);

  //Doing the same for lives
  lifelabel = game.add.text(-300,0,"Lives: ", style);
  lifetext = game.add.text(-240,0,life,style);
  lifelabel.setShadow(3,3,'rgba(0,0,0,0.5)',2);
  lifetext.setShadow(3,3,'rgba(0,0,0,0.5)',2);
  lifelabel.setTextBounds(0,0,800,100);
  lifetext.setTextBounds(0,0,800,100);

  //Game Over 
  goText = game.add.text(0,0,' ',style);
  goText.setShadow(3,3,'rgba(0,0,0,0.5)',2)
  goText.setTextBounds(0,200,800,100)
  goText.anchor.setTo(0.5, 0.5);
  goText.font = 'Press Start 2P';
  goText.visible = false;
  goText.fixedToCamera = true;
}

function update(){

  if (ledge1.body.velocity.x > 0 && ledge1.x >= 800)
            {
                ledge1.x = -160;
                enemy1.x = -140;
            }

  if (ledge2.body.velocity.x > 0 && ledge2.x >= 800)
            {
                ledge2.x = -160;
                enemy2.x = -140;
            }
	//collide player and enemies with platforms
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(enemy1, platforms);
	game.physics.arcade.collide(enemy2, platforms);
	game.physics.arcade.collide(enemy3, platforms);


  var standing = player.body.blocked.down || player.body.touching.down;

	//reset the player's velocity if no events.
	player.body.velocity.x = 0;

	//player movement by keys
	if(cursors.left.isDown){
		//move left
		player.body.velocity.x = -150;
		player.animations.play('left');
	} else if(cursors.right.isDown){
		//move right
		player.body.velocity.x = 150;
		player.animations.play('right');
	} else {
		player.animations.stop();
		player.frame = 4;
	}

	//allow the player to jump if touching the ground
	if(cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -300;
	}
  }


	//Enemy AI
	if(enemy1.x > ledge1.x + 200){
		enemy1.animations.play('left');
		enemy1.body.velocity.x = -120;
	}else if(enemy1.x < ledge1.x + 40){
		enemy1.animations.play('right');
		enemy1.body.velocity.x = 120;
	}
	if(enemy2.x > ledge2.x + 200){
		enemy2.animations.play('left');
		enemy2.body.velocity.x = -80;
	}else if(enemy2.x < ledge2.x + 40){
		enemy2.animations.play('right');
		enemy2.body.velocity.x = 80;
	}
	if(enemy3.x > 759){
		enemy3.animations.play('left');
		enemy3.body.velocity.x = -80;
	}else if(enemy3.x < 30){
		enemy3.animations.play('right');
		enemy3.body.velocity.x = 80;
	}

	//collide stars with platform
	game.physics.arcade.collide(stars, platforms, ground);
	game.physics.arcade.overlap(player, stars, collectStar, null, this);
	game.physics.arcade.overlap(player, enemy1, loseLife, null, this);
	game.physics.arcade.overlap(player, enemy2, loseLifeLeft, null, this);
	game.physics.arcade.overlap(player, enemy3, loseLife, null, this);

  if(life < 0){
    endGame();
  }

//define collectStar function
function collectStar(player,star){
	//remove the star
	star.kill();
	//update score variable
	score =score +1;
	//reflect in text
	scoretext.setText(score);

	//create new star
	star = stars.create(Math.floor(Math.random()*750),0,'star');
	star.body.gravity.y = 200;
    star.body.bounce.y = 0.7 + Math.random() * 0.2;
}

//define loseLife
function loseLife(player, enemy){
	//lose life
	life -= 1;
	lifetext.setText(life);

  if(life >= 0){
	//remove and respawn enemy
	enemy.kill();
	enemy.reset(ledge2.x, 20);
   } else{
     player.kill()
     goText.text="GAME OVER! \n You scored " + score //\nPress Enter to try again...";
     goText.visible = true;

       var restartButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
       restartButton.onDown.addOnce(restartGame);
   }
}

//define loseLifeLeft
function loseLifeLeft(player, enemy){
	//lose life
	life -= 1;
	lifetext.setText(life);

	//remove and respawn enemy
	enemy.kill();
	enemy.reset(ledge1.x, 20);
}

function endGame(){
  player.kill();
  goText.text="GAME OVER! \n You scored " + score + "\nPress Enter to try again...";
  goText.visible = true;
   enemy1.kill();
   enemy2.kill();
   enemy3.kill();
  scorelabel.visible = false;
  scoretext.visible = false;
  lifelabel.visible = false;
  lifetext.visible = false;

  var restartButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
  restartButton.onDown.addOnce(restartGame);


}
}
function restartGame(){
  player.reset(32,400);
  life = 3;
  score = 0;
  lifetext.setText(life);
  scoretext.setText(score);
  scorelabel.visible = true;
  scoretext.visible = true;
  lifelabel.visible = true;
  lifetext.visible = true;
  goText.visible = false;
}
