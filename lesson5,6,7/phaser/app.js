console.log('"Egotistical Quote"');

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload:preload, create:create, update:update});
var score = 0;
var life = 3;

function preload(){
	game.load.image('sky', 'assets/sky.png');
	game.load.image('ground', 'assets/platform.png');
	game.load.image('star', 'assets/star.png')
	game.load.spritesheet('dude', 'assets/dude.png', 32, 48)
	game.load.spritesheet('bad_dude', 'assets/baddie.png', 32, 32)


}

function create(){
	game.physics.startSystem(Phaser.Physics.ARCADE);
	// Make Sky
	game.add.sprite(0, 0, 'sky');
	// Create group of platforms that are all affected
	platforms = game.add.physicsGroup();
	platforms.enableBody = true;
	// Ground
	var ground = platforms.create(0, 550, 'ground');
	ground.scale.setTo(2, 2)
	ground.body.immovable = true;
	// Ledges
	var ledge = platforms.create(400, 400, 'ground');
	ledge.body.immovable = true;
	ledge = platforms.create(-150, 250, 'ground');
	ledge.body.immovable = true;
	// Creating da PLAYA
	player = game.add.sprite(32, 400, 'dude',);
		// animating da PLAYA
		player.animations.add('left', [0, 1, 2, 3], 10, true)
		player.animations.add('right', [5, 6, 7, 8], 10, true)
		game.physics.arcade.enable(player);
		player.body.bounce.y = 0.2;
		player.body.gravity.y = 300;
		player.body.collideWorldBounds = true;

	enemy1 = game.add.sprite(760, 20, 'baddie');
	enemy1.animations.add('left', [0,1], 10, true);
	enemy1.animations.add('right',[2,3], 10, true);
	game.physics.arcade.enable(enemy1);
	enemy1.body.bounce.y = 0.2;
	enemy1.body.gravity.y = 500;
	enemy1.body.collideWorldBounds = true;

	enemy2 = game.add.sprite(760, 20, 'baddie');
	enemy2.animations.add('left', [0,1], 10, true);
	enemy2.animations.add('right',[2,3], 10, true);
	game.physics.arcade.enable(enemy2);    
	enemy2.body.bounce.y = 0.2;
	enemy2.body.gravity.y = 500;
	enemy2.body.collideWorldBounds = true;

	// Create keyboard entries
	cursors = game.input.keyboard.createCursorKeys();

	//Create the stars
	stars = game.add.physicsGroup();
	stars.enableBody = true;
	// We make 12 stars evenly spaced
	for(var i = 0; i < 12; i++){
		var star = stars.create(i * 70, 0, 'star');
		star.body.gravity.y= 200;
		star.body.bounce.y = 0.7 + Math.random() * 0.2;
	//text style
	var style = {font: "bold 25px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle"};
	//positioning the score
	scorelabel = game.add.text(-60, 0, "Score: ", style);
	scoretext = game.add.text(70, 0 , score, style);
	scorelabel.setShadow(3,3,'rgba(0,0,0,0.5)');
	scoretext.setShadow(3,3,'rgba(0,0,0,0.5)');

	//set text bounds x0, y520, x800, y100
	scorelabel.setTextBounds(0,520,800,100);
	scoretext.setTextBounds(0,520,800,100);

	//doing the same for lives
	lifelabel = game.add.text(-300, 0, "Lives: ", style);
	lifetext = game.add.text(-240, 0, life, style);
	lifelabel.setShadow(3,3,'rgba(0,0,0,0.5)');
	lifetext.setShadow(3,3,'rgba(0,0,0,0.5)');

	// set di bounds 
	lifelabel.setTextBounds(0,0,800,100);
	lifetext.setTextBounds(0,0,800,100);

	}
}

function update(){
	//add collide player and enemies with platforms
	game.physics.arcade.collide(player, platforms);
	game.physics.arcade.collide(enemy1, platforms);
	game.physics.arcade.collide(enemy2, platforms);

	// reset payers speed before stuff happens
	player.body.velocity.x = 0

	// player movement
	if(cursors.left.isDown){
		//move left
		player.body.velocity.x = -150;
		player.animations.play('left')
	}else if(cursors.right.isDown){
		//move right
		player.body.velocity.x = 150;
		player.animations.play('right')
	}else {
		player.animations.stop();
		player.frame = 4;
	}

	// aloow player to jump if touching the ground
	if(cursors.up.isDown && player.body.touching.down){
		player.body.velocity.y = -300
	}
	//enemy movement
	if(enemy1.x > 759){
		enemy.animations.play('left');
		enemy.body.velocity.x = -1700;
	}else if(enemy1.x < 405){
		enemy.animations.play('right');
		enemy.body.velocity.x = 1700;
	}

	if(enemy2.x > 200){
		enemy.animations.play('left');
		enemy.body.velocity.x = -1700;
	}else if(enemy2.x < 21){
		enemy.animations.play('right');
		enemy.body.velocity.x = 1700;
	}

//collide stars with platfroms
game.physics.arcade.collide(stars, platforms)
game.physics.arcade.overlap(player, star, collectStar, null, this);
game.physics.arcade.overlaps(player, enemy1, loseLifeLeft, null, this);
game.physics.arcade.overlaps(player, enemy2, loseLife, null, this);
}

// define collectStar function
function collectStar(player, star){
	// remove star
	star.kill();
	//update score
	score =score + 1;
	//reflect in text
	scoretext.setText(score);

	//create new star
	star = stars.create(Math.floor(Math.random()* 750),0, 'star');
	star.body.gravity.y= 200;
	star.body.bounce.y = 0.7 + Math.random() * 0.2;
}

// define loseLife
function loseLife(player, enemy){
	life -= 1;
	lifetext.setText(life);
	//remove enemy
	enemy.kill();
	enemy.reset(760, 20);
}

function loseLifeLeft(player, enemy){
	life -= 1;
	lifetext.setText(life);
	//remove enemy
	enemy.kill();
	enemy.reset(10, 20);
}





















