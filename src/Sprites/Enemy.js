class Enemy extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame, enemySpeed, enemyGroup, 
                bulletGroup, bulletSpeed = 10, bulletTexture = "enemyShot") 
    {        
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.textureName = texture;
        this.enemySpeed = enemySpeed;
        this.enemyGroup = enemyGroup;
        this.bulletGroup = bulletGroup;
        this.bulletSpeed = bulletSpeed;
        this.bulletTexture = bulletTexture;

        this.y = -(this.displayHeight/2);
        if(x == 0)
            this.x = Util.getRndInteger((this.displayWidth/2), game.config.width - (this.displayWidth/2));
        this.flipY = true;

        if(this.textureName === "enemyJuke")
        {
            this.jukeAngle = 60;
            this.direction = true;

            this.setScale(0.22);
            if(Util.getRndInteger(1,2) == 1)
                this.direction = false;

            this.angle = (this.direction) ? -(this.jukeAngle) : this.jukeAngle;
            this.jukeSlope = Math.tan((this.jukeAngle * Math.PI) / 180);
            this.jukeYSpeed = this.enemySpeed / this.jukeSlope;
            this.jukeXSpeed = this.enemySpeed * this.jukeSlope;
        } else if(this.textureName === "enemyShoot")
        {
            this.setScale(0.2);
            this.setDepth(2);
            this.shootInterval = 1/4;
            this.travelingDown = true;
            this.travelingRight = true;
            this.bulletFired = false;
            this.travelGoal = (game.config.height-100) * this.shootInterval;
        } else
        {
            this.setScale(0.15);
        }
        
        scene.add.existing(this);

        this.leftBound = this.displayWidth/2;
        this.rightBound = game.config.width - (this.displayWidth/2);
        this.bottBound = game.config.height + (this.displayHeight/2);
        this.topBound = -(this.displayHeight/2);

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
            if(this.textureName === "enemyJuke")
            {
                this.y += this.jukeYSpeed;
                this.x += (this.direction) ? this.jukeXSpeed : -(this.jukeXSpeed);
                if (this.y > this.bottBound) 
                {
                    this.y = this.topBound;
                }
                if(this.x < this.leftBound || this.x > this.rightBound)
                {
                    this.direction = (this.direction) ? false : true;
                    this.angle = (this.direction) ? -(this.jukeAngle) : this.jukeAngle; 
                }
            }else if(this.textureName === "enemyShoot")
            {
                if(this.travelingDown)
                {
                    this.y += this.enemySpeed;
                    if(this.y >= this.travelGoal)
                    {
                        this.travelingDown = false;
                        if(this.x < this.leftBound)                           
                            this.travelingRight = true;
                        else if(this.x > this.rightBound)
                            this.travelingRight = false;
                        else
                            this.travelingRight = (Util.getRndInteger(1,2) == 1) ? true : false;
                        this.bulletFired = false;

                        if(this.travelingRight)
                        {
                            this.travelGoal = Util.getRndInteger(this.x, this.rightBound);
                            this.angle = -90;
                        }else
                        {
                            this.travelGoal = Util.getRndInteger(this.x, this.leftBound);
                            this.angle = 90;
                        }
                    }else if(this.y > this.travelGoal-100 && this.bulletFired == false)
                    {
                        this.bulletGroup.add(new Bullet(this.scene, this.x, this.y + (this.displayHeight/4),
                                                        this.bulletTexture, null, this.bulletSpeed, this.bulletGroup), 
                                                        true);
                        this.bulletFired = true;
                    }
                }else if(this.travelingRight)
                {
                    this.x += this.enemySpeed;
                    if(this.x >= this.travelGoal)
                    {
                        this.travelGoal = this.y + (game.config.height * this.shootInterval);
                        this.travelingDown = true;
                        this.angle = 0;
                    }
                }else
                {
                    this.x -= this.enemySpeed;
                    if(this.x <= this.travelGoal)
                    {
                        this.travelGoal = this.y + (game.config.height * this.shootInterval);
                        this.travelingDown = true;
                        this.angle = 0; 
                    }
                }

                if(this.y > this.bottBound)
                {
                    this.travelGoal = (game.config.height * this.shootInterval);
                    this.y = this.topBound;
                }
            }else 
            {
                this.y += this.enemySpeed;
                if (this.y > this.bottBound) 
                {
                    this.y = this.topBound;
                    this.x = Util.getRndInteger(this.leftBound, this.rightBound);
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