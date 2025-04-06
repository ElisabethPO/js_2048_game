'use strict';

// Uncomment the next lines to use your game instance in the browser
const Game = require('../modules/Game.class');
const game = new Game();

const startButton = document.querySelector('start-button');
const restartButton = document.createElement('restart-button');
// const gameMessage = document.querySelector('.message-container');
const messageLose = document.querySelector('.message-lose');
const messageWin = document.querySelector('.message-win');
// Write your code here

startButton.addEventListener('click', () => {
  game.start();
  render();
});

restartButton.addEventListener('click', () => {
  game.restart();
  render();
});

document.addEventListener('keydown', (e) => {
  switch (e.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;

    case 'ArrowRight':
      game.moveRight();
      break;

    case 'ArrowUp':
      game.moveUp();
      break;

    case 'ArrowDown':
      game.moveDown();
      break;

    default:
      return;
  }

  game.addRandomTile();
  render();
  updateGameMessage();
});

function updateGameMessage() {
  if (game.checkWin()) {
    messageWin.classList.remove('hidden');
    messageLose.classList.add('hidden');
  } else if (game.checkGameOver()) {
    messageLose.classList.remove('hidden');
    messageWin.classList.add('hidden');
  } else {
    messageLose.classList.add('hidden');
    messageWin.classList.add('hidden');
  }
}

function render() {
  const cells = document.querySelectorAll('.field-cell');

  for (let i = 0; i < game.size; i++) {
    for (let j = 0; j < game.size; j++) {
      const cell = cells[i * game.size + j];
      const value = game.board[i][j];

      cell.textContent = value === 0 ? '' : value;
      cell.className = `field-cell fielc-cell--${value}`;
    }
  }

  document.querySelector('.game-score').textContent = game.score;
}
