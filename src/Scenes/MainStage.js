class MovementTest extends Phaser.Scene
{
    constructor()
    {
        super("movementTest");
        this.my = {sprite: {}};

        this.playerSpeed = 5;
        this.bulletSpeed = 10;
    }

    preload()
    {
        Player.preload(this);
        Bullet.preload(this);
    }

    create()
    {
        let my = this.my;

        this.left = this.input.keyboard.addKey("LEFT");
        this.right = this.input.keyboard.addKey("RIGHT");

        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 100, "playerShip", null, this.left, this.right, this.playerSpeed);
        my.sprite.player.setScale(0.2);
        my.sprite.player.setDepth(1);

        my.sprite.bulletGroup = this.add.group({
            active: true,
            maxSize: -1,
            runChildUpdate: true
        });

        my.sprite.player.createShootEvent(this, 'SPACE', "smallBullet", 3, this.bulletSpeed, my.sprite.bulletGroup);
    }

    update()
    {
        let my = this.my;

        my.sprite.player.update();
    }
}