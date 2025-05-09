// Jim Whitehead
// Created: 4/14/2024
// Phaser: 3.70.0
//
// BuildAMonster
//
// A template for building a monster using a series of assets from
// a sprite atlas.
// 
// Art assets from Kenny Assets "Monster Builder Pack" set:
// https://kenney.nl/assets/monster-builder-pack

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    fps: { 
        forceSetTimeOut: true, 
        target: 30 
    },
    physics: {
        default: "matter",
        matter: {
            debug: true
        }
    },
    width: 600,
    height: 800,
    scene: [TitleScreen, MainStage, WinScreen, DeathScreen]
}

const game = new Phaser.Game(config);