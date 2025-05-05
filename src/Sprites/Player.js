class Player extends Phaser.GameObjects.Sprite 
{
    // x,y - starting sprite location
    // spriteKey - key for the sprite image asset
    // leftKey - key for moving left
    // rightKey - key for moving right
    constructor(scene, x, y, texture, frame, leftKey, rightKey, playerSpeed) 
    {
        super(scene, x, y, texture, frame);

        this.left = leftKey;
        this.right = rightKey;
        this.playerSpeed = playerSpeed;

        scene.add.existing(this);

        return this;
    }

    static preload(scene)
    {
        scene.load.setPath("./assets/");

        scene.load.image("playerShip", "player_ship_std.png");
    }

    createShootEvent(scene, fireKey, bulletGroup)
    {
        let bullet = null;
        scene.input.keyboard.on('keydown-' + fireKey, (event) =>
        {
            bullet = bulletGroup.getFirstDead();

            if(bullet != null)
            {
                bullet.makeActive();
                bullet.x = this.x;
                bullet.y = this.y - (this.displayHeight/4);
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