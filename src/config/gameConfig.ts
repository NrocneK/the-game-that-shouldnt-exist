import Phaser from 'phaser';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,

  width: 1280,
  height: 720,

  backgroundColor: '#1a1a1a',

  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        x: 0,
        y: 0,
      },
      debug: false,
    },
  },

  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },

  render: {
    antialias: true,
  },
};