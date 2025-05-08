class Player extends Phaser.GameObjects.Sprite 
{
    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    // leftKey - key for moving left
    // rightKey - key for moving right
    constructor(scene, x, y, texture, frame, leftKey, rightKey, playerSpeed, bulletTexture, shotAmnt,
                startHealth = 3) 
    {
        super(scene, x, y, texture, frame);
        this.setScale(0.2);
        this.setDepth(1);

        this.scene = scene
        this.left = leftKey;
        this.right = rightKey;
        this.playerSpeed = playerSpeed;
        this.bulletTexture = bulletTexture;
        this.bulletGroup = scene.my.sprite.bulletGroup;
        this.shotAmnt = shotAmnt;
        this.health = startHealth;
        this.healthIcons = [];

        let healthTexture = scene.textures.get("healthIcon").getSourceImage();
        this.healthIconScale = 0.13;
        this.healthWidth = healthTexture.width * this.healthIconScale;
        this.healthHeight = healthTexture.height * this.healthIconScale;

        this.renderHealth();

        this.rx = this.displayWidth/2;
        this.ry = this.displayHeight/2;

        scene.add.existing(this);

        return this;
    }

    static preload(scene)
    {
        scene.load.setPath("./assets/");

        scene.load.image("playerShip", "player_ship_std.png");
        scene.load.image("healthIcon", "health_icon.png");
    }

    // amount must be an odd number
    createShootEvent(fireKey, bulletSpeed)
    {
        this.scene.input.keyboard.on('keydown-' + fireKey, (event) =>
        {
            this.bulletGroup.add(new Bullet(this.scene, this.x, this.y - (this.displayHeight/4),
                                       this.bulletTexture, null, bulletSpeed), 
                                       true);
            
            let extrAmnt = Math.trunc(this.shotAmnt/2);
            let offset = 0;
            for(let i = 0; i < extrAmnt; i++)
            {
                offset = i * 10;
                this.bulletGroup.add(new Bullet(this.scene, this.x - (this.displayWidth/6) - offset, this.y,
                                           this.bulletTexture, null, bulletSpeed), 
                                           true);
                this.bulletGroup.add(new Bullet(this.scene, this.x + (this.displayWidth/6) + offset, this.y,
                                           this.bulletTexture, null, bulletSpeed), 
                                           true);
            }
        });
    }

    update() 
    {
        // Moving left
        if (this.left.isDown) 
        {
            // Check to make sure the sprite can actually move left
            if (this.x > (this.displayWidth/2)) 
            {
                this.x -= this.playerSpeed;
            }
        }

        // Moving right
        if (this.right.isDown) 
        {
            // Check to make sure the sprite can actually move right
            if (this.x < (game.config.width - (this.displayWidth/2))) 
            {
                this.x += this.playerSpeed;
            }
        }

        for(let bullet of this.bulletGroup.getChildren())
        {
            if(bullet.collidePlayer)
            {
                if(Util.collides(this, bullet))
                {
                    bullet.destroySelf();
                    this.health -= 1;
                    this.renderHealth();
                }
            }
        }
    }

    renderHealth()
    {
        let offset = 6;
        for(let heart of this.healthIcons)
        {
            heart.visible = false;
            heart.active = false;
        }
        this.healthIcons = [];

        let xPos = 0;
        let yPos = 0;
        for(let i = 1; i <= this.health; i++)
        {
            xPos = (i * offset) + (this.healthWidth/2) + ((i-1) * this.healthWidth);
            yPos = game.config.height - (offset + this.healthHeight/2);
            if(i <= this.healthIcons.length)
            {
                this.healthIcons[i - 1].active = true;
                this.healthIcons[i - 1].visible = true;
            }else
            {
                this.healthIcons.push(this.scene.add.sprite(xPos, yPos, "healthIcon").setScale(this.healthIconScale));
            }
        }
    }
}