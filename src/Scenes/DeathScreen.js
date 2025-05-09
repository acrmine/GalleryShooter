class DeathScreen extends Phaser.Scene
{
    constructor()
    {
        super("deathScreen");
        this.my = {sprite: {}};

        this.restartKey = "SPACE";
        this.menuKey = "ESC";
    }

    preload()
    {
        this.load.setPath("./assets/");
    }

    create()
    {
        this.deathMessage = this.add.bitmapText(game.config.width/2, game.config.height * 0.4, "pixelFont", "YOU\nDIED", 240);
        this.deathMessage.setOrigin(0.5).setCenterAlign();
        this.restartMessage = this.add.bitmapText(game.config.width/2, game.config.height * 0.8, "pixelFont", "Press  " + this.restartKey + "  to restart", 40);
        this.restartMessage.setOrigin(0.5).setCenterAlign();
        this.titleMessage = this.add.bitmapText(game.config.width/2, game.config.height * 0.9, "pixelFont", "Press  " + this.menuKey + "  to return to menu", 40);
        this.titleMessage.setOrigin(0.5).setCenterAlign();

        this.input.keyboard.on('keydown-' + this.restartKey, (event) =>
        {
            this.scene.start("mainStage");
        });

        this.input.keyboard.on('keydown-' + this.menuKey, (event) =>
        {
            this.scene.start("titleScreen");
        });
    }

    update()
    {

    }
}