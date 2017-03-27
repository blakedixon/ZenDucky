var resp1;
var resp2;
var resp3;
var resp4;
var randomresp;
var resp;


var preloadState =
{

    preload: function()
    {
        menuMusic.destroy();
        this.cache.removeSound('san');

        this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'old');
        this.logo.anchor.setTo(0.5);
        this.stage.backgroundColor = '#6495ED';
        resp1=this.add.audio('road',0.25);
        resp2=this.add.audio('wary', 0.25);
        resp3=this.add.audio('journey',0.25);
        resp4=this.add.audio('serenity',0.25);

        randomresp = [resp1, resp2, resp3, resp4];
        resp = randomresp[Math.floor(Math.random() * 4)];
        resp.play();

        this.load.image('backG', 'images/Background.png');
        this.load.image('middleG', 'images/Middleground.png');
        this.load.image('frontG', 'images/Frontground.png');
        this.load.image('ground2', 'images/platform.png');
        this.load.image('ground', 'images/Platform-Water.png');
        this.load.image('ground1', 'images/Platform-Land.png');
        this.load.image('tree1', 'images/tree1.png');
        this.load.image('tree2', 'images/tree2.png');
        this.load.image('tree3', 'images/tree3.png');
        this.load.spritesheet('dude', 'images/newDucky.png', 195, 180, 8);
        this.load.spritesheet('fire', 'images/duckyflame.png', 195, 180, 8);
        this.load.image('pointbar', 'images/PointBar.png');
        this.load.audio('zen', 'images/zen.ogg');
        this.load.audio('splash1', 'images/sploosh.ogg');
        this.load.audio('splash2', 'images/Splash2.ogg');
        this.load.audio('splash3', 'images/Splash3.ogg');
        this.load.audio('begin', 'images/Begin.mp3');
        this.load.image('drop', 'images/Water_Element.gif');
        this.load.audio('dash1', 'images/dash1.ogg');
        this.load.audio('dash2', 'images/dash2.ogg');
        this.load.audio('dash3', 'images/dash3.ogg');
        this.load.audio('boom', 'images/boom.ogg');
        this.load.spritesheet('cherry', 'images/cherry.png', 32, 20, 7);
        this.load.image('tori', 'images/tori.png');
        this.load.image('cloud', 'images/cloud.png');
        this.load.image('wave', 'images/waves.png');
        this.load.spritesheet('star', 'images/ninStar.png', 44,45, 5);
        this.load.image('wb', 'images/white_bar.jpg');
        this.load.audio('die', 'images/player_die.mp3');
        this.load.image('land2', 'images/land2.png');
        this.load.image('lantern', 'images/lantern.png');
        this.load.image('hb', 'images/hb.png');
        this.load.image('red','images/red.png');
        this.load.image('land3', 'images/land3.png');
        this.load.spritesheet('transform', 'images/transform.png',320,55,7);
        this.load.audio('gong', 'images/gong.mp3');
        this.load.audio('activate', 'images/activate.ogg');
        this.load.image('lava', 'images/Explode.png');
        this.load.audio('sunstrike','images/sunstrike.mp3');
        this.load.image('golden', 'images/golden.png');
        this.load.audio('meep', 'images/meep.mp3');
        this.load.image('white','images/white.png');
        this.load.audio('activate2', 'images/activate2.ogg');
        this.load.spritesheet('gstar', 'images/goldenStar.png', 44,45,5);
        this.load.audio('gold', 'images/gold.ogg');
        this.load.spritesheet('cash', 'images/cash.png', 32, 20, 7);
        this.load.image('hit', 'images/danger!.png');
        this.load.audio('activate3', 'images/activate3.ogg');
        this.load.image('skyOverlay', 'images/skyOverlay.png');
        this.load.audio('kabuki', 'images/kabuki.ogg');
        this.load.image('menu', 'images/tempPauseMenu.png');
    },

    create: function()
    {
        //game.state.destroy('mainMenu');
        this.state.start('game');
    }

};

