class Bullet extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame, bulletSpeed) 
    {        
        super(scene, x, y, texture, frame);
        this.textureName = texture;
        this.bulletSpeed = bulletSpeed;
        this.bulletGroup = scene.my.sprite.bulletGroup;
        this.collidePlayer = false;

        this.setScale(0.15);

        if(this.textureName === "enemyShot")
        {
            this.flipY = true;
            this.collidePlayer = true;
        }
        scene.add.existing(this);

        this.bottBound = game.config.height + (this.displayHeight/2);
        this.topBound = -(this.displayHeight/2);

        this.rx = this.displayWidth/2;
        this.ry = this.displayHeight/2;

        return this;
    }

    static preload(scene)
    {
        scene.load.setPath("./assets/");

        scene.load.image("smallBullet", "player_sms.png");
        scene.load.image("bigBullet", "player_bgs.png");
        scene.load.image("enemyShot", "enemy_sms.png");
    }

    update() 
    {
        if (this.active) 
        {
            if(this.textureName === "smallBullet" || this.textureName === "bigBullet")
            {
                this.y -= this.bulletSpeed;
                if (this.y < this.topBound) 
                {
                    this.destroySelf();
                }
            }
            if(this.textureName === "enemyShot")
            {
                this.y += this.bulletSpeed;
                if (this.y > this.bottBound) 
                {
                    this.destroySelf();
                }
            }
        }
    }

    destroySelf()
    {
        this.bulletGroup.remove(this, true);
        this.destroy();
    }

    makeActive() 
    {
        this.visible = true;
        this.active = true;
    }

    makeInactive() 
    {
        this.visible = false;
        this.active = false;
    }
}