class MovementTest extends Phaser.Scene
{
    constructor()
    {
        super("movementTest");
        this.my = {sprite: {}};
        this.bullets = [];

        this.playerStartX = 400;
        this.playerStartY = 500;

        this.playerSpeed = 5;
        this.bulletSpeed = 10;

        this.aKey = null;
        this.dKey = null;
    }

    preload()
    {
        this.load.setPath("./assets/");

        this.load.image("playerShip", "player_Ship.png");
        this.load.image("bullet", "player_sms.png");
    }

    create()
    {
        let my = this.my;

        my.sprite.player = this.add.sprite(this.playerStartX, this.playerStartY, "playerShip");
        my.sprite.player.scale = 2;
        my.sprite.player.setDepth(1);

        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

        this.input.keyboard.on('keydown-SPACE', (event) =>
        {
            this.bullets.push(this.add.sprite(my.sprite.player.x, my.sprite.player.y, "bullet"));
        });
    }

    update()
    {
        let my = this.my;

        if(this.dKey.isDown)
        {
            if(my.sprite.player.x < (game.config.width - (my.sprite.player.displayWidth / 2)))
            {
                my.sprite.player.x += this.playerSpeed;
            }
        }

        if(this.aKey.isDown)
        {
            if(my.sprite.player.x > (my.sprite.player.displayWidth / 2))
            {
                my.sprite.player.x -= this.playerSpeed;
            }
        }

        for(let bullet of this.bullets)
        {
            if(bullet.y < -50)
            {
                bullet.destroy();
            } else
            {
                bullet.y -= this.bulletSpeed;
            }
        }
    }
}