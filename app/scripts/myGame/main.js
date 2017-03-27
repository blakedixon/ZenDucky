var game;
    game = new Phaser.Game(1000, 600, Phaser.AUTO, '');    


game.state.add('bootState', bootState); 
game.state.add('preloadState', preloadState); 
game.state.add('mainMenu', mainMenu); 
//this.state.add('pauseState', this.pauseState); 
game.state.add('game', MyGame);  

game.state.start('bootState');    



