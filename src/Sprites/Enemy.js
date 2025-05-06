class Enemy extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame, enemySpeed, group) 
    {        
        super(scene, x, y, texture, frame);
        this.textureName = texture;
        this.enemySpeed = enemySpeed;
        this.group = group;
        this.y = -(this.displayHeight/2);
        this.x = Util.getRndInteger((this.displayWidth/2), game.config.width - (this.displayWidth/2));
        this.flipY = true;

        this.setScale(0.15);
        scene.add.existing(this);

        return this;
    }

    static preload(scene)
    {
        scene.load.setPath("./assets/");

        scene.load.image("enemySmall", "enemy_small.png");
        scene.load.image("enemyJuke", "enemy_juke.png");
        scene.load.image("enemyShoot", "enemy_shoot.png");
        scene.load.image("enemyBullet", "enemy_sms.png")
    }

    update() 
    {
        if(this.active) 
        {
            if(this.textureName === "enemySmall")
            {
                this.y += this.enemySpeed;
                if (this.y > (game.config.height + (this.displayHeight/2))) 
                {
                    this.y = -(this.displayHeight/2);
                    this.x = Util.getRndInteger((this.displayWidth/2), game.config.width - (this.displayWidth/2));
                }
            }else if(this.textureName === "enemyJuke")
            {
                this.y += this.enemySpeed;
                if (this.y > (game.config.height + (this.displayHeight/2))) 
                {
                    this.y = -(this.displayHeight/2);
                    this.x = Util.getRndInteger((this.displayWidth/2), game.config.width - (this.displayWidth/2));
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