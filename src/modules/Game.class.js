'use strict';

/**
 * This class represents the game.
 * Now it has a basic structure, that is needed for testing.
 * Feel free to add more props and methods if needed.
 */
class Game {
  /**
   * Creates a new game instance.
   *
   *
   * @param {number[][]} initialState
   * The initial state of the board.
   * @default
   * [[0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0],
   *  [0, 0, 0, 0]]
   *
   * If passed, the board will be initialized with the provided
   * initial state.
   */
  constructor(initialState) {
    this.size = 4;

    this.board = [];

    for (let i = 0; i < this.size; i++) {
      this.board.push(new Array(this.size).fill(0));
    }
    this.score = 0;
    this.status = 'idle';

    document
      .querySelector('.button.start')
      .addEventListener('click', () => this.start());

    document
      .querySelector('.button.restart')
      .addEventListener('click', () => this.restart());
    // eslint-disable-next-line no-console
    console.log(initialState);
  }

  moveLeft() {
    const oldBoard = this.board.map((row) => [...row]);
    let scoreThisMove = 0;

    for (let i = 0; i < this.size; i++) {
      let row = this.board[i].filter((num) => num !== 0);

      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          scoreThisMove += row[j];
          row[j + 1] = 0;
        }
      }

      row = row.filter((num) => num !== 0);

      while (row.length < this.size) {
        row.push(0);
      }
      this.board[i] = row;
    }

    if (!this.areBoardsEqual(oldBoard, this.board)) {
      this.addRandomTile();
      this.score += scoreThisMove;
      this.render();
    }
  }

  moveRight() {
    const oldBoard = this.board.map((row) => [...row]);
    let scoreThisMove = 0;

    for (let i = 0; i < this.size; i++) {
      let row = this.board[i].filter((num) => num !== 0);

      row.reverse();

      for (let j = 0; j < row.length - 1; j++) {
        if (row[j] === row[j + 1]) {
          row[j] *= 2;
          scoreThisMove += row[j];
          row[j + 1] = 0;
        }
      }

      row = row.filter((num) => num !== 0);

      while (row.length < this.size) {
        row.push(0);
      }

      row.reverse();
      this.board[i] = row;
    }

    if (!this.areBoardsEqual(oldBoard, this.board)) {
      this.addRandomTile();
      this.score += scoreThisMove;
      this.render();
    }
  }

  moveUp() {
    const oldBoard = this.board.map((row) => [...row]);
    let scoreThisMove = 0;

    for (let j = 0; j < this.size; j++) {
      let column = [];

      for (let i = 0; i < this.size; i++) {
        if (this.board[i][j] !== 0) {
          column.push(this.board[i][j]);
        }
      }

      for (let i = 0; i < column.length - 1; i++) {
        if (column[i] === column[i + 1]) {
          column[i] *= 2;
          scoreThisMove += column[i];
          column[i + 1] = 0;
        }
      }

      column = column.filter((num) => num !== 0);

      while (column.length < this.size) {
        column.push(0);
      }

      for (let i = 0; i < this.size; i++) {
        this.board[i][j] = column[i];
      }
    }

    if (!this.areBoardsEqual(oldBoard, this.board)) {
      this.addRandomTile();
      this.score += scoreThisMove;
      this.render();
    }
  }

  moveDown() {
    const oldBoard = this.board.map((row) => [...row]);
    let scoreThisMove = 0;

    for (let j = 0; j < this.size; j++) {
      let column = [];

      for (let i = 0; i < this.size; i++) {
        if (this.board[i][j] !== 0) {
          column.push(this.board[i][j]);
        }
      }

      column.reverse();

      for (let i = 0; i < column.length - 1; i++) {
        if (column[i] === column[i + 1]) {
          column[i] *= 2;
          scoreThisMove += column[i];
          column[i + 1] = 0;
        }
      }

      column = column.filter((num) => num !== 0);

      while (column.length < this.size) {
        column.push(0);
      }

      column.reverse();

      for (let i = 0; i < this.size; i++) {
        this.board[i][j] = column[i];
      }
    }

    if (!this.areBoardsEqual(oldBoard, this.board)) {
      this.addRandomTile();
      this.score += scoreThisMove;
      this.render();
    }
  }

  /**
   * @returns {number}
   */
  getScore() {
    return this.score;
  }

  /**
   * @returns {number[][]}
   */
  getState() {
    return this.board;
  }

  /**
   * Returns the current game status.
   *
   * @returns {string} One of: 'idle', 'playing', 'win', 'lose'
   *
   * `idle` - the game has not started yet (the initial state);
   * `playing` - the game is in progress;
   * `win` - the game is won;
   * `lose` - the game is lost
   */
  getStatus() {
    return this.status;
  }

  /**
   * Starts the game.
   */
  start() {
    this.board = [];

    for (let i = 0; i < this.size; i++) {
      this.board.push(new Array(this.size).fill(0));
    }
    this.score = 0;
    this.status = 'playing';

    document.querySelector('.game-score').textContent = this.score;
    document.querySelector('.message-container').classList.add('hidden');

    const startButton = document.querySelector('.button.start');

    startButton.textContent = 'Restart';
    startButton.classList.remove('start');
    startButton.classList.add('restart');

    this.addRandomTile();
    this.render();
  }

  /**
   * Resets the game.
   */
  restart() {
    this.board = [];

    for (let i = 0; i < this.size; i++) {
      this.board.push(new Array(this.size).fill(0));
    }
    this.score = 0;
    this.status = 'idle';

    document.querySelector('.game-score').textContent = this.score;
    document.querySelector('.message-container').classList.add('hidden');

    this.addRandomTile();
    this.render();

    const startButton = document.querySelector('.button.restart');

    startButton.textContent = 'Start';
    startButton.classList.remove('restart');
    startButton.classList.add('start');

    this.addRandomTile();
    this.render();
  }

  render() {
    const cells = document.querySelectorAll('.field-cell');

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        const cell = cells[i * this.size + j];
        const value = this.board[i][j];

        cell.classList.remove(...cell.classList);
        cell.classList.add('field-cell');

        if (value === 0) {
          cell.textContent = '';
        } else {
          cell.textContent = value;
          cell.classList.add(`field-cell--${value}`);
        }
      }
    }

    if (this.checkWin()) {
      document.querySelector('.message-win').classList.remove('hidden');
      document.querySelector('.message-lose').classList.add('hidden');
    }

    if (this.checkGameOver()) {
      document.querySelector('.message-lose').classList.remove('hidden');
      document.querySelector('.message-win').classList.add('hidden');
    }

    document.querySelector('.game-score').textContent = this.score;
  }

  addRandomTile() {
    const emptyCells = [];

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === 0) {
          emptyCells.push({ i, j });
        }
      }
    }

    if (emptyCells.length > 0) {
      const randomCell =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
      const newValue = Math.random() < 0.9 ? 2 : 4;

      this.board[randomCell.i][randomCell.j] = newValue;
    }

    this.render();
  }

  handleKeyPress(e) {
    switch (e.key) {
      case 'ArrowLeft':
        this.moveLeft();
        break;
      case 'ArrowRight':
        this.moveRight();
        break;
      case 'ArrowUp':
        this.moveUp();
        break;
      case 'ArrowDown':
        this.moveDown();
        break;
      default:
        return;
    }

    this.addRandomTile();
    this.render();
  }

  mergeCells(i, j, value) {
    this.score += value;
  }

  checkWin() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === 2048) {
          return true;
        }
      }
    }

    return false;
  }

  checkGameOver() {
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (this.board[i][j] === 0) {
          return false;
        }
      }
    }

    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        if (i < this.size - 1 && this.board[i][j] === this.board[i + 1][j]) {
          return false;
        }

        if (j < this.size - 1 && this.board[i][j] === this.board[j + 1]) {
          return false;
        }
      }

      return true;
    }

    document.querySelector('.message-lose').classList.remove('hidden');
  }
}

module.exports = Game;
