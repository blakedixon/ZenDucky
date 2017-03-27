var bootState =
{
    init: function ()
    {
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
        //this.scale.pageAlignHorizontally = true; 
        //this.scale.pageAlignVertically = true; 
    },

    preload: function()
    {
        this.load.image('page','images/TOITOI.png');
        this.load.audio('san', 'images/zen.mp3');
    },

    create: function()
    {
        this.state.start('mainMenu');
    }
}; 
