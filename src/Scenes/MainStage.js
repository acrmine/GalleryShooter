class MainStage extends Phaser.Scene
{
    constructor()
    {
        super("mainStage");
        this.my = {sprite: {}};

        this.playerSpeed = 10;
        this.bulletSpeed = 10;
    }

    preload()
    {
        Player.preload(this);
        Bullet.preload(this);
        Enemy.preload(this);
    }

    create()
    {
        let my = this.my;

        this.left = this.input.keyboard.addKey("LEFT");
        this.right = this.input.keyboard.addKey("RIGHT");

        Util.createBackground(this, "starBackground");

        my.sprite.bulletGroup = this.add.group({
            active: true,
            maxSize: -1,
            runChildUpdate: true
        });

        my.sprite.enemyGroup = this.add.group({
            active: true,
            maxSize: -1,
            runChildUpdate: true
        });

        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 100, "playerShip", 
                                      null, this.left, this.right, this.playerSpeed, "smallBullet", 1);

        my.sprite.enemyGroup.add(new Enemy(this, 0, 0, "enemySmall", null, 5));
        my.sprite.enemyGroup.add(new Enemy(this, 0, 0, "enemyJuke", null, 5));
        my.sprite.enemyGroup.add(new Enemy(this, 0, 0, "enemyShoot", null, 5));

        my.sprite.player.createShootEvent('SPACE', this.bulletSpeed);
    }

    // enemySpawner()
    // {
    //     let my = this.my;

    // }

    update()
    {
        this.my.sprite.player.update();

        Util.updateBackground(this, 9);
    }
}