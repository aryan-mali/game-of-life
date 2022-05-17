import React, { useState, useEffect } from "react";

const Controls = (props) => {
  const { board, setBoard } = props;
  const [isRunning, setIsRunning] = useState();
  const [period, setPeriod] = useState(100);
  const [iteration, setIteration] = useState(100);

  function getCurrentBoard(props, board) {
    let newBoard = [];
    for (let i = 0; i < props.ROWS; i++) {
      newBoard[i] = board[i].slice(0);
    }
    return newBoard;
  }

  const handleClear = () => {
    let board = props.generateBoard();
    setBoard(board);
  };

  const handleRandom = () => {
    let newBoard = getCurrentBoard(props, board);
    for (var i = 0; i < props.ROWS; i++) {
      for (var j = 0; j < board[i].length; j++) {
        newBoard[i][j] = Math.round(Math.random());
      }
    }
    setBoard(newBoard);
  };
  const getNextGeneration = (board) => {
    let newBoard = getCurrentBoard(props, board);
    board.map((x, i) => {
      x.map((y, j) => {
        let neighbors = countNeighbours(board, i, j);
        if (y == 1) {
          if (neighbors == 2 || neighbors == 3) {
            newBoard[i][j] = 1;
          } else {
            newBoard[i][j] = 0;
          }
        } else if (y == 0 && neighbors == 3) {
          newBoard[i][j] = 1;
        }
      });
    });
    return newBoard;
  };
  const countNeighbours = (board, i, j) => {
    let neighbors = 0;
    const dirs = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1],
    ];
    for (let r = 0; r < dirs.length; r++) {
      const dir = dirs[r];
      let x1 = i + dir[0];
      let y1 = j + dir[1];

      if (
        x1 >= 0 &&
        x1 < props.ROWS &&
        y1 >= 0 &&
        y1 < props.COLUMNS &&
        board[x1][y1] === 1
      ) {
        neighbors++;
      }
    }

    return neighbors;
  };

  useEffect(() => {
    let intervalHandler;
    if (iteration <= 0) setIsRunning(false);
    if (isRunning) {
      intervalHandler = setInterval(() => {
        let newBoard = getNextGeneration(board);
        setBoard(newBoard);
        setIteration((pre) => pre - 1);
      }, period);
    }
    return () => {
      clearInterval(intervalHandler);
    };
  }, [board, isRunning]);

  return (
    <div>
      <div>
        <input
          placeholder="Iterations"
          value={iteration}
          onChange={(e) => {
            setIteration(e.target.value);
          }}
        ></input>
        <input
          placeholder="Interval"
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
          }}
        ></input>
      </div>
      <button
        onClick={() => {
          isRunning ? setIsRunning(false) : setIsRunning(true);
        }}
      >
        {isRunning ? "Stop" : "Run"}
      </button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleRandom}>Random</button>
    </div>
  );
};

export default Controls;
