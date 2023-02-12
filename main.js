const game = (() => {
  let playerTurn = false;
  const setPlayerTurn = (cell) => {
    cell.addEventListener('click', function () {
      //add class to cell on click(X,O)
      if (playerTurn === false) {
        cell.classList.add('X');
      } else {
        cell.classList.add('O');
      }
      //check for win or tie

      playerTurn = !playerTurn; //switch turn
    });
  };

  //add hover state

  function setHover(board) {
    board.classList.add('X');
    board.addEventListener('click', () => {
      board.classList.remove('O');
      board.classList.remove('X');
      if (playerTurn === false) {
        board.classList.add('X');
      } else {
        board.classList.add('O');
      }
    });
  }
  return {
    setPlayerTurn,
    setHover,
  };
})();

const boardHandle = (() => {
  //create board
  const board = [];
  const container = document.querySelector('.container');

  const createBoard = function () {
    for (let i = 0; i < 9; i++) {
      board.push(document.createElement('div'));
    }
  };

  const appendCells = function () {
    board.forEach((cell) => {
      cell.classList.add('cell');
      container.append(cell);
    });
  };

  const playTurn = function () {
    board.forEach((cell) => {
      game.setPlayerTurn(cell);
      game.setHover(container);

      //set hover state
    });
  };

  return {
    createBoard,
    appendCells,
    playTurn,
  };
})();

const main = (() => {
  boardHandle.createBoard();
  boardHandle.appendCells();
  boardHandle.playTurn();
})();
