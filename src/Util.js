class Util
{
    static playerScore = 0;

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

    static preloadAssets(scene)
    {
        scene.load.setPath("./assets/");

        scene.load.bitmapFont("pixelFont", "pixel_font_0.png", "pixel_font.fnt");
        scene.load.bitmapFont("blockFont", "block_font_0.png", "block_font.fnt");
        scene.load.image("starBackground", "star_background.gif");
        scene.load.image("nightSky", "8bit-pixel-art-night-sky.jpg");
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

    // requires a scene variable "timer"
    static maintainEnemies(scene, waveConfig, waitBetweenWaves)
    {
        scene.timer -= 1;
        if(scene.timer <= 0)
        {
            if(scene.my.sprite.enemyGroup.getLength() == 0)
            {
                let player = scene.my.sprite.player;
                if(player.currPhase == 3)
                {
                    scene.timer = waitBetweenWaves;
                    player.currPhase = 0;
                    player.currWave += 1;
                    player.updateWaveLabel();
                }
                if(player.currWave > waveConfig.length)
                {
                    player.transferToWin();
                }

                if(player.currWave-1 < waveConfig.length)
                {
                    for(let i = 0; i < waveConfig[player.currWave-1][0][player.currPhase]; i++)
                    {
                        scene.my.sprite.enemyGroup.add(new Enemy(scene, 0, 0, "enemySmall", null, 5));
                    }
                    for(let i = 0; i < waveConfig[player.currWave-1][1][player.currPhase]; i++)
                    {
                        scene.my.sprite.enemyGroup.add(new Enemy(scene, 0, 0, "enemyJuke", null, 5));
                    }
                    for(let i = 0; i < waveConfig[player.currWave-1][2][player.currPhase]; i++)
                    {
                        scene.my.sprite.enemyGroup.add(new Enemy(scene, 0, 0, "enemyShoot", null, 5));
                    }
                }

                player.currPhase += 1;
            }
        }
    }
}