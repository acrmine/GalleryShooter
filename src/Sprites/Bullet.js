class Bullet extends Phaser.GameObjects.Sprite 
{
    constructor(scene, x, y, texture, frame) 
    {        
        super(scene, x, y, texture, frame);
        
        this.setScale(0.15);
        scene.add.existing(this);

        return this;
    }

    static preload(scene)
    {
        scene.load.setPath("./assets/");

        scene.load.image("smallBullet", "player_sms.png");
    }

    update() 
    {
        if (this.active) 
        {
            this.y -= this.speed;
            if (this.y < -(this.displayHeight/2)) 
            {
                this.makeInactive();
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