class DeathScreen extends Phaser.Scene
{
    constructor()
    {
        super("deathScreen");
        this.my = {sprite: {}};

        
    }

    preload()
    {
        this.load.setPath("./assets/");

        this.load.bitmapFont("pixel_font", "pixel_mini_font_0.png", "pixel_mini_font.fnt");
    }

    create()
    {
        this.add.bitmapText(game.config.width/2, game.config.height/2, "pixel_font", " YOU\nDIED", 160).setOrigin(0.5);
    }

    update()
    {

    }
}