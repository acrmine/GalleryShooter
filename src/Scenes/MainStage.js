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

        this.load.image("starBackground", "star_background.gif");
    }

    createBackground(textureName)
    {
        this.backgroundSprites = [];
        this.backgroundSprites.push(this.add.tileSprite(game.config.width/2, game.config.height/2, 
                                                        game.config.width, game.config.height, textureName));
        this.backgroundSprites.push(this.add.tileSprite(game.config.width/2, -(game.config.height/2), 
                                                        game.config.width, game.config.height, textureName));
    }

    updateBackground(speed)
    {
        let backgroundSprite1 = this.backgroundSprites[0];
        let backgroundSprite2 = this.backgroundSprites[1];
        backgroundSprite1.y += speed;
        backgroundSprite2.y += speed;
        if(backgroundSprite1.y > game.config.height * 1.5)
            backgroundSprite1.y = backgroundSprite2.y - game.config.height;
        if(backgroundSprite2.y > game.config.height * 1.5)
            backgroundSprite2.y = backgroundSprite1.y - game.config.height;
    }

    create()
    {
        let my = this.my;

        this.left = this.input.keyboard.addKey("LEFT");
        this.right = this.input.keyboard.addKey("RIGHT");

        this.createBackground("starBackground");

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

        this.updateBackground(9);
    }
}