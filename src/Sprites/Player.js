class Player extends Phaser.GameObjects.Sprite 
{
    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    // leftKey - key for moving left
    // rightKey - key for moving right
    constructor(scene, x, y, texture, frame, leftKey, rightKey, playerSpeed, bulletTexture, shotAmnt) 
    {
        super(scene, x, y, texture, frame);

        this.left = leftKey;
        this.right = rightKey;
        this.playerSpeed = playerSpeed;
        this.bulletTexture = bulletTexture;
        this.shotAmnt = shotAmnt;

        scene.add.existing(this);

        return this;
    }

    static preload(scene)
    {
        scene.load.setPath("./assets/");

        scene.load.image("playerShip", "player_ship_std.png");
    }

    // amount must be an odd number
    createShootEvent(scene, fireKey, bulletSpeed, bulletGroup)
    {
        scene.input.keyboard.on('keydown-' + fireKey, (event) =>
        {
            bulletGroup.add(new Bullet(scene, this.x, this.y - (this.displayHeight/4),
                                       this.bulletTexture, null, bulletSpeed, bulletGroup), 
                                       true);
            
            let extrAmnt = Math.trunc(this.shotAmnt/2);
            let offset = 0;
            for(let i = 0; i < extrAmnt; i++)
            {
                offset = i * 10;
                bulletGroup.add(new Bullet(scene, this.x - (this.displayWidth/6) - offset, this.y,
                                           this.bulletTexture, null, bulletSpeed, bulletGroup), 
                                           true);
                bulletGroup.add(new Bullet(scene, this.x + (this.displayWidth/6) + offset, this.y,
                                           this.bulletTexture, null, bulletSpeed, bulletGroup), 
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
    }
}