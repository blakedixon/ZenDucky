var begin;
var dead=false;

//myParameters
var music;
var sploosh;
var splash1;
var splash2;
var splash3;
var splooshArray;
var countGround=false;
var splashEmitter;
var leafEmitter;
var cashEmitter;

var slash;

var dashSound;
var dashArray;
var dash1;
var dash2;
var boom;
var ching;
var dash3;

//seasons
var max = 0;
var front_emitter;
var back_emitter;
var update_interval = 4 * 60;
var i = 0;

var speedup;
var timestar;
var allowthrow;

var diesound;
var xIndex = 0;

var timestoll=true;
var secondstoll=true;

var lavacount=100;
var lavaexist=false;
var lavagoing=false;

var ss;

var infernoPowered=false;
var goldenPowered=false;
var cloudPowered=false;

var transformtime=0;
var meep;
var newSpot=0;
var freeze = false;
var kabuki;

var nameTransformation;
var powerUpInfo;
var powerUpInfoFade;

var popUpScore;
var pauseButton;
var pauseButton1;
var w = 1000;
var h = 600;
var menu;
var pauseMenuButton;
var restartMenuButton;
var quit;
var restart;
var mute;
var mute1;

var MyGame;

//----------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------

MyGame =
{
    create: function()
    {

        kabuki=this.add.audio('kabuki',0.4);
        meep=this.add.audio('meep', 1);
        boom = this.add.audio('boom', 0.3);
        ching= this.add.audio('gold', 0.5 );

        music = this.add.audio('zen', 0.3);
        music.play();

        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.gameSpeed = 435;

        //  a simple background                //
        this.backG = this.add.tileSprite(0, 0, 1000, 600, "backG");
        this.middleG = this.add.tileSprite(0, 0, 1000, 600, "middleG");
        this.frontG = this.add.tileSprite(0, 0, 1000, 600, "frontG");
        this.clouds = this.add.tileSprite(0, 420, 1000, 600, "wave");
        this.clouds.alpha = 0.2;
        this.clouds2 = this.add.tileSprite(0, 500, 1000, 600, "wave");
        this.clouds2.alpha = 0.6;
        this.pointB = this.add.tileSprite(680, 0, 325, 52, "pointbar");
        this.pointB.zIndex = 3;

        this.transformB=this.add.sprite(0,0,"transform",6);
        this.transformB.animations.add('flash', [6,0], 10, true);
        this.transformB.animations.add('full', [6], true);
        this.transformB.animations.add('6', [5], true);
        this.transformB.animations.add('5', [4], true);
        this.transformB.animations.add('4', [3], true);
        this.transformB.animations.add('3', [2], true);
        this.transformB.animations.add('2', [1], true);
        this.transformB.animations.add('1', [0], true);

        this.transformB.alpha=0.75;


        this.frontG.zIndex = 2;
        this.middleG.zIndex = 1;

        this.tori = this.add.physicsGroup();
        this.trees = this.add.physicsGroup();
        this.characters= this.add.physicsGroup();
        this.platforms = this.add.physicsGroup();
        this.land = this.add.physicsGroup();
        this.cloud=this.add.physicsGroup();
        this.edge=this.add.physicsGroup();
        this.leftedge= this.add.physicsGroup();
        this.rightedge= this.add.physicsGroup();

        this.platforms.create(xIndex + 300, this.world.height / 2, 'ground');
        this.land.create(xIndex - 26 + 300, this.world.height / 2 - 68, 'ground1');
        this.tori.create(xIndex + 725, this.world.height / 2 - 200, 'tori');
        this.tori.create(xIndex + 450, this.world.height / 2 - 185, 'tori');
        this.characters.create(xIndex +940, this.world.height/2 - 85, 'old');
        this.cloud.create(xIndex-200,this.world.height-720, 'cloud');
        this.cloud.create(xIndex-100, this.world.height/2-160, 'cloud');
        this.cloud.scale.setTo(1.75,1.75);
        this.cloud.create(xIndex+225, this.world.height/2-75, 'cloud');
        this.cloud.create(xIndex+850, this.world.height/2-50, 'cloud');
        this.cloud.alpha=0.9;
        this.edge.create(this.world.width+42, 0, 'wb');
        this.edge.create(0,this.world.height,'hb');
        this.edge.create(298,0,'wb');

        this.rightedge.create(500, 0, 'wb');
        this.rightedge.alpha=0;

        this.edge.alpha=0;
        this.leftedge.create(-1000,0,'wb');

        xIndex += 256;
        for (var i = 0; i < 5; i++)
        {
            this.buildIsland();
        }
        this.platforms.setAll('body.allowGravity', false);
        this.platforms.setAll('body.immovable', true);
        this.platforms.setAll('body.velocity.x', -this.gameSpeed);

        this.land.setAll('body.allowGravity', false);
        this.land.setAll('body.immovable', true);
        this.land.setAll('body.velocity.x', -this.gameSpeed);

        this.tori.setAll('body.allowGravity', false);
        this.tori.setAll('body.immovable', true);
        this.tori.setAll('body.velocity.x', -this.gameSpeed);

        this.trees.setAll('body.allowGravity', false);
        this.trees.setAll('body.immovable', true);
        this.trees.setAll('body.velocity.x', -this.gameSpeed);

        this.characters.setAll('body.allowGravity', false);
        this.characters.setAll('body.immovable', true);
        this.characters.setAll('body.velocity.x', -this.gameSpeed);

        this.cloud.setAll('body.allowGravity', false);
        this.cloud.setAll('body.immovable', true);
        this.cloud.setAll('body.velocity.x', -this.gameSpeed+100);

        this.edge.setAll('body.allowGravity', false);
        this.edge.setAll('body.immovable', true);

        this.leftedge.setAll('body.allowGravity', false);
        this.leftedge.setAll('body.immovable', true);

        // the player and its settings         //
        this.player = this.add.sprite(300, 200, 'dude');
        this.player.scale.setTo(.5, .5);
        this.player.zIndex = 4;
        this.player.animations.add('swim', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
        this.player.animations.add('slash', [0,4], 10, false);
        this.player.smoothed=false;

        // enable physics on the player        //
        this.physics.arcade.enable(this.player);
        this.player.body.gravity.y=2600;
        this.player.body.collideWorldBounds = false;

        //                                                         constants       //
        this.MAX_SPEED = 3000;
        this.JUMP_SPEED = -800;

        this.player.body.maxVelocity.setTo(this.MAX_SPEED, this.MAX_SPEED * 10);
        this.physics.arcade.gravity.y = 0;
        this.jumping = false;

        // the controls                        //
        this.game.input.keyboard.addKeyCapture([
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.DOWN
        ]);

        splashEmitter = this.add.emitter(0, 0, 10);
        splashEmitter.makeParticles('drop');

        leafEmitter = this.add.emitter(0, 0, 100);
        leafEmitter.makeParticles('cherry', [0, 1, 2, 3, 4, 5, 6]);
        leafEmitter.gravity = 150;

        cashEmitter = this.add.emitter(0, 0, 100);
        cashEmitter.makeParticles('cash', [0, 1, 2, 3, 4, 5, 6]);
        cashEmitter.gravity = 150;

        splashEmitter.gravity = 2600;
        this.world.bringToTop(this.land);
        this.world.bringToTop(this.cloud);

        back_emitter = this.add.emitter(this.world.centerX, 0, 600);
        back_emitter.makeParticles('cherry', [0, 1, 2, 3, 4, 5, 6]);
        back_emitter.gravity = 0;
        back_emitter.maxParticleScale = 1.5;
        back_emitter.minParticleScale = 0.5;

        back_emitter.setYSpeed(40, 150);

        back_emitter.width = this.world.width * 1.5;
        back_emitter.minRotation = 0;
        back_emitter.maxRotation = 40;

        front_emitter = this.add.emitter(this.world.centerX, 0, 50);
        front_emitter.makeParticles('cherry', [0, 1, 2, 3, 4, 5, 6]);
        front_emitter.gravity = 0;
        front_emitter.maxParticleScale = 1.5;
        front_emitter.minParticleScale = 0.75;

        front_emitter.setYSpeed(75, 250);

        front_emitter.width = this.world.width * 1.5;
        front_emitter.minRotation = 0;
        front_emitter.maxRotation = 40;

        this.changeWindDirection();

        back_emitter.start(false, 14000, 1200);
        front_emitter.start(false, 6000, 1200);
        this.world.bringToTop(this.pointB);
        this.world.bringToTop(this.transformB);

        this.score = 0.0;
        this.scoreText = this.add.text(750, 10, '0.0 点数', {fontSize: '32px', fill: '#000'});
        speedup=800;
        timestar=20;

        this.transform= 6;
        this.transformText= this.add.text(16, 8, '6', {fontSize: '34px', fill: '#000'});
        this.elbow= this.add.text (65, 8, 'Transformation', {fontSize: '26px', fill: "#000"});

        pauseButton = this.add.text(w/2,0,'pause', {fontSize: '34px', fill: "#000"});
        pauseButton.anchor.setTo(0.5,0);
        pauseButton.inputEnabled = true;
        pauseButton.events.onInputUp.add(function ()
        {
            game.paused = true;

            //pause menu
            menu = game.add.sprite(w/2, h/2, 'menu');
            menu.anchor.setTo(0.5, 0.5);
            menu.inputEnabled = true;

            pauseMenuButton = game.add.text(w/2, h-400, 'resume', {fontSize: '34px', fill: "#000"});
            pauseMenuButton.anchor.setTo(0.5,0,5);
            pauseMenuButton.inputEnabled = true;

            restartMenuButton = game.add.text(w/2, h-300, 'restart', {fontSize: '34px', fill: "#000"});
            restartMenuButton.anchor.setTo(0.5,0,5);
            restartMenuButton.inputEnabled = true;

            quit = game.add.text(w/2, h-200, 'quit', {fontSize: '34px', fill: "#000"});
            quit.anchor.setTo(0.5,0,5);
            quit.inputEnabled = true;
        });

        this.input.onDown.add(unpause, self);

        function unpause()
        {
            if(game.paused)
            {
                var x1 = w / 2 - 800 / 2, x2 = w / 2 + 800 / 2,
                    y1 = h / 2 - 400 / 2, y2 = h / 2 + 400 / 2;
                //w = 1000, h= 600

                if (event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2)
                {
                    //local coordinates
                    var x = event.x - x1,
                        y = event.y - y1;

                    if (x >= pauseMenuButton.x-200 && x <= pauseMenuButton.x +200 && y >= pauseMenuButton.y-100 && y <= pauseMenuButton.y-50)
                    {
                        menu.destroy();
                        pauseMenuButton.destroy();
                        restartMenuButton.destroy();
                        quit.destroy();
                        game.paused = false;
                    }
                    if (x >= restartMenuButton.x-200 && x <= restartMenuButton.x +200 && y >= restartMenuButton.y-100 && y <= restartMenuButton.y-50)
                    {
                        /*game.state.kill(this);
                        game.state.start('game');
                        game.paused = false;*/
                    }
                    if (x >= quit.x-200 && x <= quit.x +200 && y >= quit.y-100 && y <= quit.y-50)
                    {
                        //game.state.start('mainMenu');
                        //game.state.start('gameOver', true, false, game.scoreText);
                    }
                }
            }
        }


        mute = this.add.button(0, 550, '', this.toggleMute, this, {fontSize: '34px', fill: "#000"});
        mute1 = this.add.text(0, 550, 'M', {fontSize: '34px', fill: "#000"});
    },

    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
    update: function()
    {
        xIndex -= this.time.physicsElapsed * this.gameSpeed;

        this.player.body.gravity.y = 2600;

        if (!goldenPowered) {
            this.scoreText.addColor('#000', 0);
        }
        else if (goldenPowered) {
            this.scoreText.addColor('#006400',0);
        }

        this.physics.arcade.overlap(this.player, this.characters, this.lol, null, this);
        this.physics.arcade.overlap(this.player, this.edge, this.die, null, this);
        this.physics.arcade.overlap(this.platforms, this.leftedge, this.starKill, null, this);
        this.physics.arcade.overlap(this.trees, this.leftedge, this.starKill, null, this);
        this.physics.arcade.overlap(this.land, this.leftedge, this.recyclePlatform, null, this);
        this.physics.arcade.overlap(this.tori, this.leftedge, this.starKill, null, this);
        this.physics.arcade.overlap(this.characters, this.leftedge, this.starKill, null, this);
        this.physics.arcade.overlap(this.cloud, this.leftedge, this.starKill, null, this);
       // this.physics.arcade.overlap(this.neutral, this.leftedge, this.starKill, null, this);


        if (!dead) {


            this.platforms.setAll('body.velocity.x', -this.gameSpeed);
            this.land.setAll('body.velocity.x', -this.gameSpeed);
            this.tori.setAll('body.velocity.x', -this.gameSpeed);
            this.characters.setAll('body.velocity.x', -this.gameSpeed);
            this.trees.setAll('body.velocity.x', -this.gameSpeed);
            this.cloud.setAll('body.velocity.x', -this.gameSpeed);
         //  this.neutral.setAll('body.velocity.x', -this.gameSpeed);


            if (!infernoPowered) {
                    this.physics.arcade.overlap(this.player, this.trees, this.die, null, this);
                if (!goldenPowered && !cloudPowered) {
                    this.elbow.text = 'Transformation';
                    if (this.transform == 6) {
                        this.transformB.animations.play('full');
                    }
                    if (this.transform == 5) {
                        this.transformB.animations.play('6');
                    }
                    if (this.transform == 4) {
                        this.transformB.animations.play('5');
                    }
                    if (this.transform == 3) {
                        this.transformB.animations.play('4');
                    }
                    if (this.transform == 2) {
                        this.transformB.animations.play('3');
                    }
                    if (this.transform == 1) {
                        this.transformB.animations.play('2');
                    }
                }
            }

            else if (infernoPowered) {
                this.physics.arcade.overlap(this.rightedge, this.trees, this.collectTree2, null, this);
                if (lavagoing) {
                    this.add.tween(this.lava).to( {alpha:0}, 250, Phaser.Easing.Linear.None, true, 0, 0, false);
                    lavagoing=false;
                }

                if (lavaexist) {
                    lavacount--;
                }
                if (lavacount==0) {
                    lavaexist=false;
                    lavacount=100;
                }
            }

            transformtime--;
            if (transformtime==1250) {
                this.transformB.animations.play('2');
            }
            if (transformtime==1000) {
                this.transformB.animations.play('3');
                this.flashingScreen.kill();
            }
            if (transformtime==750) {
                this.transformB.animations.play('4');
            }
            if (transformtime==500) {
                this.transformB.animations.play('5');
            }
            if (transformtime==250) {
                this.transformB.animations.play('6');
            }
            if (transformtime==200) {
                this.player.loadTexture('dude');
            }
            if (transformtime==175) {
                this.player.loadTexture(nameTransformation);
            }
            if (transformtime==150) {
                this.player.loadTexture('dude');
            }
            if (transformtime==125) {
                this.player.loadTexture(nameTransformation);
            }
            if (transformtime==100) {
                this.player.loadTexture('dude');
            }
            if (transformtime==75) {
                this.player.loadTexture(nameTransformation);
            }
            if (transformtime==50) {
                this.player.loadTexture('dude');
            }
            if (transformtime==40) {
                this.player.loadTexture(nameTransformation);
            }
            if (transformtime==30) {
                this.player.loadTexture('dude');
            }
            if (transformtime==20) {
                this.player.loadTexture(nameTransformation);
            }
            if (transformtime==10) {
                this.player.loadTexture('dude');
            }
            if (transformtime==0) {
                this.transformB.animations.play('full');
                this.transformText.text='6';
                this.player.loadTexture('dude');
                //this.gameSpeed-=250;
                infernoPowered=false;
                goldenPowered=false;
                cloudPowered=false;
                var fader = this.add.tween(this.overlay).to({alpha: 0}, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
                this.transformText.addColor('#000',0);
                secondstoll=true;
            }

            if (this.transform<=0) {
                this.transformText.text='←';
                this.elbow.text= "Activate Power";
                this.transformB.animations.play('flash');
                if (timestoll==true) {
                    var gong = this.add.audio('gong', 0.9);
                    gong.play();
                    timestoll=false;
                }
            }

            if ((this.transform<=0&&(!infernoPowered&&!goldenPowered)&&this.input.keyboard.downDuration(Phaser.Keyboard.LEFT,1))||(this.input.keyboard.downDuration(Phaser.Keyboard.SPACEBAR,1))) {
                
                var powerUpNumber=Math.floor(Math.random()*3);

                //Set Inferno Duck
                if (powerUpNumber==0) {
                    if (secondstoll == true) {
                        nameTransformation='fire';
                        //this.gameSpeed += 250;
                        var activate = this.add.audio('activate', 1);
                        activate.play();
                        this.flashingScreen=this.add.tileSprite(0,0,1000,600,"white");

                        secondstoll = false;
                        this.powerUpInfo=this.add.text(500,280, 'Automatic Invulnerability!', {fontSize: '50px', fill:'#FFFFFF'});
                        this.powerUpInfo.anchor.setTo(0.5,0.5);
                        var powerUpInfoFade= this.add.tween(this.powerUpInfo).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                    }
                    this.elbow.text = 'Inferno Duck';
                    this.transformB.animations.play('1');
                    infernoPowered = true;

                    this.player.loadTexture('fire');
                    this.transform = 6;
                    this.transformText.text = '火';
                    this.transformText.addColor('#ff0000', 0);
                    this.overlay = this.add.tileSprite(0, 0, 1000, 600, "red");
                    this.world.bringToTop(this.clouds);
                    this.world.bringToTop(this.tori);
                    this.world.bringToTop(this.characters);
                    this.world.bringToTop(this.trees);
                    this.world.bringToTop(this.platforms);
                    this.world.bringToTop(this.player);
                    this.world.bringToTop(splashEmitter);
                    this.world.bringToTop(leafEmitter);
                    this.world.bringToTop(this.land);
                    this.world.bringToTop(this.cloud);
                    this.world.bringToTop(back_emitter);
                    this.world.bringToTop(front_emitter);
                    this.world.bringToTop(this.pointB);
                    this.world.bringToTop(this.transformB);
                    this.world.bringToTop(this.scoreText);
                    this.world.bringToTop(this.transformText);
                    this.world.bringToTop(this.elbow);
                    this.world.bringToTop(this.flashingScreen);
                    this.world.bringToTop(this.powerUpInfo);
                    var flashingScreenFader = this.add.tween(this.flashingScreen).to({alpha: 0}, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
                    transformtime = 1500;
                    timestoll = true;
                    
                }

                //Set Golden Duck
                if (powerUpNumber==1) {
                    if (secondstoll == true) {
                        nameTransformation='dude';
                        //this.gameSpeed += 250;
                        var activate = this.add.audio('activate2', 1);
                        activate.play();
                        this.flashingScreen=this.add.tileSprite(0,0,1000,600,"white");

                        secondstoll = false;
                        this.powerUpInfo=this.add.text(500,280, 'Double Points!', {fontSize: '50px', fill:'#FFFFFF'});
                        this.powerUpInfo.anchor.setTo(0.5,0.5);
                        var powerUpInfoFade= this.add.tween(this.powerUpInfo).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                    }
                    this.elbow.text = 'Golden Duck';
                    this.transformB.animations.play('1');
                    goldenPowered = true;

                    //this.player.loadTexture('fire');
                    this.transform = 6;
                    this.transformText.text = '金';
                    this.transformText.addColor('#FFD700', 0);
                    this.overlay = this.add.tileSprite(0, 0, 1000, 600, "golden");
                    this.world.bringToTop(this.clouds);
                    this.world.bringToTop(this.tori);
                    this.world.bringToTop(this.characters);
                    this.world.bringToTop(this.trees);
                    this.world.bringToTop(this.platforms);
                    this.world.bringToTop(this.player);
                    this.world.bringToTop(splashEmitter);
                    this.world.bringToTop(leafEmitter);
                    this.world.bringToTop(this.land);
                    this.world.bringToTop(this.cloud);
                    this.world.bringToTop(back_emitter);
                    this.world.bringToTop(front_emitter);
                    this.world.bringToTop(this.pointB);
                    this.world.bringToTop(this.transformB);
                    this.world.bringToTop(this.scoreText);
                    this.world.bringToTop(this.transformText);
                    this.world.bringToTop(this.elbow);
                    this.world.bringToTop(this.flashingScreen);
                    this.world.bringToTop(this.powerUpInfo);
                    var flashingScreenFader = this.add.tween(this.flashingScreen).to({alpha: 0}, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
                    transformtime = 1500;
                    timestoll = true;
                }

                //Cloudy Duck
                if (powerUpNumber==2) {
                    if (secondstoll == true) {
                        nameTransformation='dude';
                        //this.gameSpeed += 250;
                        var activate = this.add.audio('activate3', 1);
                        activate.play();
                        this.flashingScreen=this.add.tileSprite(0,0,1000,600,"white");

                        secondstoll = false;
                        this.powerUpInfo=this.add.text(500,280, 'Unlimited Jumping!', {fontSize: '50px', fill:'#FFFFFF'});
                        this.powerUpInfo.anchor.setTo(0.5,0.5);
                        var powerUpInfoFade= this.add.tween(this.powerUpInfo).to({alpha:0}, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
                    }
                    this.elbow.text = 'Flying Duck';
                    this.transformB.animations.play('1');
                    cloudPowered=true;

                    //this.player.loadTexture('fire');
                    this.transform = 6;
                    this.transformText.text = '雲';
                    this.transformText.addColor('#3BB9FF', 0);
                    this.overlay = this.add.tileSprite(0, 0, 1000, 600, "skyOverlay");
                    this.world.bringToTop(this.clouds);
                    this.world.bringToTop(this.tori);
                    this.world.bringToTop(this.characters);
                    this.world.bringToTop(this.trees);
                    this.world.bringToTop(this.platforms);
                    this.world.bringToTop(this.player);
                    this.world.bringToTop(splashEmitter);
                    this.world.bringToTop(leafEmitter);
                    this.world.bringToTop(this.land);
                    this.world.bringToTop(this.cloud);
                    this.world.bringToTop(back_emitter);
                    this.world.bringToTop(front_emitter);
                    this.world.bringToTop(this.pointB);
                    this.world.bringToTop(this.transformB);
                    this.world.bringToTop(this.scoreText);
                    this.world.bringToTop(this.transformText);
                    this.world.bringToTop(this.elbow);
                    this.world.bringToTop(this.flashingScreen);
                    this.world.bringToTop(this.powerUpInfo);
                    var flashingScreenFader = this.add.tween(this.flashingScreen).to({alpha: 0}, 600, Phaser.Easing.Linear.None, true, 0, 0, false);
                    transformtime = 1500;
                    timestoll = true;
                }

            }

            timestar--;
            if (timestar==0) {
                allowthrow=true;
            }

            speedup--;
            if (speedup==0) {
                this.gameSpeed++;
                speedup=20;
            }

            i++;

            if (i === update_interval) {
                this.changeWindDirection();
                update_interval = Math.floor(Math.random() * 20) * 60; // 0 - 20sec @ 60fps
                i = 0;
            }

            this.physics.arcade.collide(this.player, this.platforms);

            if (!goldenPowered) {
                this.physics.arcade.overlap(this.star, this.trees, this.collectTree, null, this);
                this.physics.arcade.overlap(this.star, this.edge, this.starKill, null, this);
            }
            else if (goldenPowered) {
                this.physics.arcade.overlap(this.star, this.trees, this.collectTree3, null, this);
                this.physics.arcade.overlap(this.star, this.edge, this.starKill, null, this);
            }


            this.frontG.autoScroll(-40, 0);
            this.middleG.autoScroll(-30, 0);
            this.backG.autoScroll(-20, 0);
            this.clouds.autoScroll(-80, 0);
            this.clouds2.autoScroll(-100, 0);

            if (this.player.body.touching.down) {
                this.player.body.velocity.x = this.gameSpeed;
            }
            else {
                this.player.body.velocity.x = 0;
            }

            var onTheGround = this.player.body.touching.down;


            if (onTheGround) {
                this.player.animations.play('swim');

                this.jumps = 2;
                this.dash = 2;
                this.jumping = false;
                if (countGround) {
                    splash1 = this.add.audio('splash1', 0.25);
                    splash2 = this.add.audio('splash2', 0.25);
                    splash3 = this.add.audio('splash3', 0.25);
                    splooshArray = [splash1, splash2, splash3];
                    sploosh = splooshArray[Math.floor(Math.random() * 3)];
                    sploosh.play();
                    splashEmitter.x = this.player.x + 44;
                    splashEmitter.y = this.player.y + 90;
                    splashEmitter.start(true, 75, null, 10);
                    countGround = false;
                }
            }

        if (!cloudPowered) {
            if (this.jumps > 0 && this.input.keyboard.downDuration(Phaser.Keyboard.UP, 5)) {

                this.player.body.velocity.y = this.JUMP_SPEED;
                this.player.body.gravity.y = -100;
                this.jumping = true;
                this.player.animations.stop();

            }

            if (this.jumping && this.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
                this.jumps--;
                this.jumping = false;
                countGround = true;
            }
        }

            else if (cloudPowered) {
                if (this.input.keyboard.downDuration(Phaser.Keyboard.UP, 5)) {
                    this.player.body.velocity.y = -600;
                    this.jumping = true;
                    this.player.animations.stop();

                }

                if (this.jumping && this.input.keyboard.upDuration(Phaser.Keyboard.UP)) {
                    this.jumping = false;
                    countGround = true;
                }
            }

            if (this.dash > 0 && allowthrow && (!infernoPowered&&!goldenPowered) && this.input.keyboard.downDuration(Phaser.Keyboard.RIGHT,1)) {
                this.player.animations.play('slash');

                this.star=this.add.sprite(this.player.x+44, this.player.y+40, 'star');
                this.physics.arcade.enable(this.star);
                this.star.body.velocity.x=this.gameSpeed + 500;
                this.star.animations.add('toss', [4,3,2,1,0], 120, true);
                this.star.animations.play('toss');
                dash1 = this.add.audio('dash1', 0.1);
                dash2 = this.add.audio('dash2', 0.1);
                dash3 = this.add.audio('dash3', 0.1);
                dashArray = [dash1, dash2, dash3];
                dashSound = dashArray[Math.floor(Math.random() * 3)];
                dashSound.play();
                if (!cloudPowered) {
                    this.dash--;
                }
                allowthrow=false;
                timestar=20;
            }

            //Golden Ducky Star
            if (this.dash > 0 && allowthrow && !infernoPowered && this.input.keyboard.downDuration(Phaser.Keyboard.RIGHT,1)) {
                this.player.animations.play('slash');

                this.star=this.add.sprite(this.player.x+44, this.player.y+40, 'gstar');
                this.physics.arcade.enable(this.star);
                this.star.body.velocity.x=this.gameSpeed + 500;
                this.star.animations.add('toss', [4,3,2,1,0], 120, true);
                this.star.animations.play('toss');
                dash1 = this.add.audio('dash1', 0.1);
                dash2 = this.add.audio('dash2', 0.1);
                dash3 = this.add.audio('dash3', 0.1);
                dashArray = [dash1, dash2, dash3];
                dashSound = dashArray[Math.floor(Math.random() * 3)];
                dashSound.play();
                this.dash--;
                allowthrow=false;
                timestar=20;
            }

            if (infernoPowered&&this.input.keyboard.downDuration(Phaser.Keyboard.RIGHT,1)) {
                meep.play();
            }

            this.score += 0.01 + this.gameSpeed/10000;
            this.scoreText.text = this.score.toFixed(1) + ' 点数';
        }

        else {
            this.frontG.autoScroll(0, 0);
            this.middleG.autoScroll(0, 0);
            this.backG.autoScroll(0, 0);
            this.clouds.autoScroll(-20, 0);
            this.clouds2.autoScroll(-25, 0);
        }
    },

    buildIsland: function()
    {
        xIndex += 1250;  //976
        var yChange = (Math.random() * 200) + 200;
        this.platforms.create(xIndex, yChange, 'ground');
        var platformChance= Math.floor(Math.random()*3);
        var lanternChance=Math.floor(Math.random()*9);
        var randomxlan= Math.floor(Math.random()*545 + 25);

        if (platformChance==0) {
            this.land.create(xIndex - 26, yChange - 68, 'ground1');
        }
        else if (platformChance==1){
            this.land.create(xIndex - 26, yChange - 50, 'land2');
        }
        else if (platformChance==2) {
            this.land.create(xIndex-26, yChange-28, 'land3');
        }
        var chance = Math.floor(Math.random() * 2);
        var cloudChance= Math.floor(Math.random()*2);
        var toriChance= Math.floor(Math.random()*18);
        var oldChance= Math.floor(Math.random()*75);
        var randomx = Math.floor(Math.random() * 600);
        var randomxtori = Math.floor(Math.random() * 520+ 50);
        var randomxcloud= Math.floor(Math.random()*1450+200);
        var randomycloud= Math.floor(Math.random()*5+50);
        var whichTree= Math.floor(Math.random()*3);

        if (oldChance==0) {
            this.characters.create(xIndex + randomxtori, yChange - 85, 'old');
        }

        if (toriChance==0) {
            this.tori.create(xIndex + randomxtori, yChange-200, 'tori');
        }
        if (chance == 0) {
            if (whichTree==0) {
                this.trees.create(xIndex + 50 + randomx, yChange - 175-600, 'tree1');
            }
            else if (whichTree==1) {
                this.trees.create(xIndex + 50 + randomx, yChange - 150-600, 'tree2');
            }
            else if (whichTree==2) {
                this.trees.create(xIndex + 50 + randomx, yChange - 150-600, 'tree3');
            }
        }
        if (lanternChance==0) {
            this.tori.create(xIndex+ randomxlan, yChange-70, 'lantern');
        }
        if (cloudChance==0) {
            this.cloud.create(xIndex + randomxcloud, yChange-randomycloud, 'cloud');
        }
        this.platforms.setAll('body.immovable', true);
    },
//----------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
    collectTree: function(star, tree)
{
    if (star.y>tree.y+575 && star.y<tree.y+775&& tree.alpha==1) {
        star.kill();
        var fade = this.add.tween(tree).to({alpha: 0}, 80, Phaser.Easing.Linear.None, true, 0, 0, false);


        boom.play();

        leafEmitter.x = tree.x + 44;
        leafEmitter.y = tree.y + 675;
        leafEmitter.minParticleSpeed.setTo(-this.gameSpeed - 400, -200);
        leafEmitter.maxParticleSpeed.setTo(-200, 200);
        leafEmitter.start(true, 1800, null, 70);

        this.score += 100;
        this.scoreText.text = this.score.toFixed(1) + ' 点数';
        this.scoreText.addColor('#ff0000', 0);

        this.popUpScore = this.add.text(tree.x - 64, tree.y + 675, '+100', {fontSize: '32px', fill: '#FFFFFF'});
        this.add.tween(this.popUpScore).to({alpha: 0}, 450, Phaser.Easing.Linear.None, true, 0, 0, false);

        if (!infernoPowered && !goldenPowered && !cloudPowered) {
            this.transform--;
            this.transformText.text = this.transform;
        }
    }
},

    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
    collectTree2: function(star, tree)
    {
        if (tree.alpha==1) {
            tree.kill();
            ss = this.add.audio('sunstrike', 0.3);
            ss.play();
            boom.play();

            this.lava = this.add.tileSprite(newSpot + 450, 0, 200, 600, "lava");

            newSpot = Math.floor(Math.random() * 350);
            this.rightedge.x = newSpot;

            lavaexist = true;
            lavagoing = true;

            leafEmitter.x = tree.x + 44;
            leafEmitter.y = tree.y + 675;
            leafEmitter.minParticleSpeed.setTo(-this.gameSpeed - 400, -200);
            leafEmitter.maxParticleSpeed.setTo(-200, 200);
            leafEmitter.start(true, 1800, null, 70);

            this.popUpScore = this.add.text(tree.x - 64, tree.y + 675, '+100', {fontSize: '32px', fill: '#FFFFFF'});
            this.add.tween(this.popUpScore).to({alpha: 0}, 450, Phaser.Easing.Linear.None, true, 0, 0, false);

            this.score += 100;
            this.scoreText.text = this.score.toFixed(1) + ' 点数';
            this.scoreText.addColor('#ff0000', 0);
        }
    },

    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
    collectTree3: function(star, tree)
    {
        if (star.y>tree.y+575 && star.y<tree.y+775&& tree.alpha==1) {
            star.kill();
            var fade = this.add.tween(tree).to({alpha: 0}, 80, Phaser.Easing.Linear.None, true, 0, 0, false);
            boom.play();
            ching.play();

            cashEmitter.x = tree.x + 44;
            cashEmitter.y = tree.y + 675;
            cashEmitter.minParticleSpeed.setTo(-this.gameSpeed - 400, -200);
            cashEmitter.maxParticleSpeed.setTo(-200, 200);
            cashEmitter.start(true, 1800, null, 70);

            this.score += 200;
            this.scoreText.text = this.score.toFixed(1) + ' 点数';
            this.scoreText.addColor('#ff0000', 0);

            this.popUpScore = this.add.text(tree.x - 64, tree.y + 675, '+200', {fontSize: '56px', fill: '#006400'});
            this.add.tween(this.popUpScore).to({alpha: 0}, 450, Phaser.Easing.Linear.None, true, 0, 0, false);

            if (!infernoPowered && !goldenPowered && !cloudPowered) {
                this.transform--;
                this.transformText.text = this.transform;
            }
        }
    },
    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
starKill: function(star, edge)
{
    star.kill();
},

recyclePlatform: function(star, edge)
{
    this.starKill(star, edge);
    this.buildIsland();
},
    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
lol: function(player, character)
{
    kabuki.play();
},
    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------

    die: function(player,tree)
{
    if ((tree.alpha==1 && player.y>tree.y+600)||(player.y>400||(this.player.x<300 && tree.alpha==1))) {
        this.player.kill();
        leafEmitter.x = this.player.x + 44;
        leafEmitter.y = this.player.y + 75;
        leafEmitter.minParticleSpeed.setTo(-100, -100);
        leafEmitter.maxParticleSpeed.setTo(100, 100);
        leafEmitter.start(true, 6400, null, 70);

        diesound = this.add.audio('die', 0.4);
        diesound.play();

        this.platforms.setAll('body.velocity.x', 0);
        this.land.setAll('body.velocity.x', 0);
        this.trees.setAll('body.velocity.x', 0);
        this.tori.setAll('body.velocity.x', 0);
        this.cloud.setAll('body.velocity.x', -125);
        this.characters.setAll('body.velocity.x', 0);
        // this.neutral.setAll('body.velocity.x', 0);

        music.destroy();
        this.cache.removeSound('zen');

        dead = true;

        this.hahaPooPoo=this.add.tileSprite(0, 0, 1000, 600, "white");

        restart = this.add.text(500, 300, "Press ⌘R to replay", {fontSize: '32px', fill: '#000'});
        restart.anchor.setTo(0.5,0.5);
    }
},
    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
changeWindDirection: function()
{

    var multi = Math.floor((max + 200) / 4),
        frag = (Math.floor(Math.random() * 100) - multi);
    max = max + frag;

    if (max > 200) max = 150;
    if (max < -200) max = -150;

    this.setXSpeed(back_emitter, max);
    this.setXSpeed(front_emitter, max);

},
    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
setXSpeed: function(emitter, max) {

    emitter.setXSpeed(max - 20, max);
    emitter.forEachAlive(this.setParticleXSpeed, this, max);

},
    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
setParticleXSpeed: function(particle, max)
{

    particle.body.velocity.x = max - Math.floor(Math.random() * 30);

},
    //------------------------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------------------------
toggleMute: function()
{
    if (!this.game.sound.mute) {
        this.game.sound.mute = true;
        mute1.text = 'W';
    } else
    {
        this.game.sound.mute = false;
        mute1.text = 'M';
    }
}


};