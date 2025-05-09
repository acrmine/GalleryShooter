class TitleScreen extends Phaser.Scene
{
    constructor()
    {
        super("titleScreen");
        this.my = {sprite: {}};

        this.startKey = "SPACE";
        this.controlToggle = "SHIFT"
    }

    preload()
    {
        this.load.setPath("./assets/");

        this.load.bitmapFont("pixelFont", "pixel_font_0.png", "pixel_font.fnt");
        this.load.image("starBackground", "star_background.gif");
    }

    create()
    {
        Util.createBackground(this, "starBackground");

        this.titleMessage = this.add.bitmapText(game.config.width/2, game.config.height * 0.4, "pixelFont", "Space\nshooty\ntime", 160);
        this.titleMessage.setOrigin(0.5).setCenterAlign();
        this.startMessage = this.add.bitmapText(game.config.width/2, game.config.height * 0.8, "pixelFont", "Press " + this.startKey + " to begin", 40);
        this.startMessage.setOrigin(0.5).setCenterAlign();
        this.controlPrompt = this.add.bitmapText(game.config.width/2, game.config.height * 0.9, "pixelFont", "Hold " + this.controlToggle + " to show controls", 40);
        this.controlPrompt.setOrigin(0.5).setCenterAlign();

        this.controls = this.add.bitmapText(game.config.width/2, game.config.height * 0.4, "pixelFont", "Left and right arrows to move\n\nSpace to fire", 40);
        this.controls.setOrigin(0.5).setCenterAlign();
        this.controls.visible = false;

        this.input.keyboard.on('keydown-' + this.startKey, (event) =>
        {
            this.scene.start("mainStage");
        });
        this.input.keyboard.on('keydown-' + this.controlToggle, (event) =>
        {
            this.titleMessage.visible = false;
            this.startMessage.visible = false;
            this.controlPrompt.visible = false;

            this.controls.visible = true;
        });
        this.input.keyboard.on('keyup-' + this.controlToggle, (event) =>
        {
            this.titleMessage.visible = true;
            this.startMessage.visible = true;
            this.controlPrompt.visible = true;

            this.controls.visible = false;
        });
    }

    update()
    {
        Util.updateBackground(this, 3);
    }
}