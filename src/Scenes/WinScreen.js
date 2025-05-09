class WinScreen extends Phaser.Scene
{
    constructor()
    {
        super("winScreen");
        this.my = {sprite: {}};

        this.menuKey = "SPACE";
    }

    preload()
    {
        Util.preloadAssets(this);
    }

    create()
    {
        Util.createBackground(this, "nightSky");

        this.deathMessage = this.add.bitmapText(game.config.width/2, game.config.height * 0.25, "pixelFont", "YOU\nWIN!!", 200);
        this.deathMessage.setOrigin(0.5).setCenterAlign();
        this.scoreReport = this.add.bitmapText(game.config.width/2, game.config.height * 0.58, "pixelFont", "Final score: " + Util.playerScore, 50);
        this.scoreReport.setOrigin(0.5).setCenterAlign();
        this.titleMessage = this.add.bitmapText(game.config.width/2, game.config.height * 0.7, "pixelFont", "Press  " + this.menuKey + "  to return to menu", 30);
        this.titleMessage.setOrigin(0.5).setCenterAlign();

        this.input.keyboard.on('keydown-' + this.menuKey, (event) =>
        {
            this.scene.start("titleScreen");
        });
    }

    update()
    {

    }
}