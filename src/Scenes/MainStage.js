class MainStage extends Phaser.Scene
{
    constructor()
    {
        super("mainStage");
        this.my = {sprite: {}};

        this.playerSpeed = 10;
        this.bulletSpeed = 10;

        this.waitBetweenWaves = 30;
        this.timer = 0;

        this.waveConfig = [
            [
                [1, 1, 2],
                [0, 1, 1],
                [0, 0, 0]
            ],
            [
                [0, 1, 1],
                [0, 0, 1],
                [1, 1, 1]
            ],
            [
                [1, 2, 2],
                [2, 0, 1],
                [1, 2, 3]
            ],
            [
                [4, 6, 8],
                [0, 0, 0],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [3, 6, 9],
                [0, 0, 0]
            ],
            [
                [0, 0, 0],
                [0, 0, 0],
                [2, 4, 6]
            ]
        ];
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

        my.sprite.player.createShootEvent('SPACE', this.bulletSpeed);
    }

    update()
    {
        this.my.sprite.player.update();

        Util.updateBackground(this, 9);

        Util.maintainEnemies(this, this.waveConfig, 30)
    }
}