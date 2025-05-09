class Util
{
    static getRndInteger(min, max) 
    {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }

    static collides(objectA, objectB)
    {
        if (Math.abs(objectA.x - objectB.x) > (objectA.rx + objectB.rx))
            return false;
        if (Math.abs(objectA.y - objectB.y) > (objectA.ry + objectB.ry)) 
            return false;
        return true;
    }

    static createBackground(scene, textureName)
    {
        scene.backgroundSprites = [];
        scene.backgroundSprites.push(scene.add.tileSprite(game.config.width/2, game.config.height/2, 
                                                        game.config.width, game.config.height, textureName));
        scene.backgroundSprites.push(scene.add.tileSprite(game.config.width/2, -(game.config.height/2), 
                                                        game.config.width, game.config.height, textureName));
    }

    static updateBackground(scene, speed)
    {
        let backgroundSprite1 = scene.backgroundSprites[0];
        let backgroundSprite2 = scene.backgroundSprites[1];
        backgroundSprite1.y += speed;
        backgroundSprite2.y += speed;
        if(backgroundSprite1.y > game.config.height * 1.5)
            backgroundSprite1.y = backgroundSprite2.y - game.config.height;
        if(backgroundSprite2.y > game.config.height * 1.5)
            backgroundSprite2.y = backgroundSprite1.y - game.config.height;
    }
}