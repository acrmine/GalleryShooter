class Bullet extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame, bulletSpeed, group) 
    {        
        super(scene, x, y, texture, frame);
        this.textureName = texture;
        this.bulletSpeed = bulletSpeed;
        this.group = group;

        this.setScale(0.15);
        scene.add.existing(this);

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
                if (this.y < -(this.displayHeight/2)) 
                {
                    this.group.remove(this, true);
                }
            }
            if(this.textureName === "enemyShot")
            {
                this.y += this.bulletSpeed;
                if (this.y > game.config.height + (this.displayHeight/2)) 
                {
                    this.group.remove(this, true);
                }
            }
        }
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