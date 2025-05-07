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
        Enemy.preload(this);
    }

    create()
    {
        let my = this.my;

        this.left = this.input.keyboard.addKey("LEFT");
        this.right = this.input.keyboard.addKey("RIGHT");

        my.sprite.player = new Player(this, game.config.width/2, game.config.height - 100, "playerShip", 
                                      null, this.left, this.right, this.playerSpeed, "smallBullet", 1);
        my.sprite.player.setScale(0.2);
        my.sprite.player.setDepth(1);

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

        my.sprite.enemyGroup.add(new Enemy(this, 0, 0, "enemySmall", null, 5, 
                                           my.sprite.enemyGroup, my.sprite.bulletGroup));
        my.sprite.enemyGroup.add(new Enemy(this, 0, 0, "enemyJuke", null, 5, 
                                           my.sprite.enemyGroup, my.sprite.bulletGroup));
        my.sprite.enemyGroup.add(new Enemy(this, 0, 0, "enemyShoot", null, 5, 
                                           my.sprite.enemyGroup, my.sprite.bulletGroup));

        my.sprite.player.createShootEvent('SPACE', this.bulletSpeed, my.sprite.bulletGroup);
    }

    // enemySpawner()
    // {
    //     let my = this.my;

    // }

    update()
    {
        let my = this.my;

        my.sprite.player.update();
    }
}