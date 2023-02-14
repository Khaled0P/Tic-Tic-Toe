const game = (() => {
  let playerTurn = false;
  let currentClass = 'X'; //sets default

  const winCases = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //check win
  const checkWin = function (cell) {
    return winCases.some((comb) => {
      return comb.every((ele) => {
        return cell[ele].classList.contains(currentClass);
      });
    });
  };

  //match resul
  const matchResult = function (message) {
    message.textContent = `${currentClass}'s Wins`;
  };

  const setPlayerTurn = (cell) => {
    cell.addEventListener('click', function () {
      //add class to cell on click(X,O)
      if (playerTurn === false) {
        cell.classList.add('X');
      } else {
        cell.classList.add('O');
      }

      currentClass = playerTurn ? 'O' : 'X';
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

  const restart = function (button, board, container, endScreen) {
    button.addEventListener('click', () => {
      playerTurn = false;
      currentClass = 'X';
      container.classList.remove('X');
      container.classList.remove('O');
      container.classList.add('X');
      board.forEach((cell) => {
        cell.classList.remove('X');
        cell.classList.remove('O');
      });
      endScreen.classList.remove('show');
    });
  };

  return {
    setPlayerTurn,
    setHover,
    checkWin,
    matchResult,
    restart,
  };
})();

const boardHandle = (() => {
  const board = [];
  const container = document.querySelector('.container');
  const endGameScreen = document.querySelector('.endGameScreen');
  const message = document.querySelector('.message');
  const button = document.getElementById('restartBtn');

  //create board
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
    });
    container.addEventListener('click', () => {
      if (game.checkWin(board)) {
        endGameScreen.classList.add('show');
        game.matchResult(message);
      } else if (
        board.every(
          (cell) => cell.classList.contains('X') || cell.classList.contains('O')
        )
      ) {
        endGameScreen.classList.add('show');
        message.textContent = "It's a tie!";
      }
    });
  };
  game.restart(button, board, container, endGameScreen);
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
