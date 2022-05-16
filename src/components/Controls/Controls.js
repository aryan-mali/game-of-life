import React, {useState} from "react";
import Board from "../Board/Board";

const Controls = (props) => {
    const {board, setBoard} = props;
    const [iteration, setIteration] = useState(2);
  const handleClear = () => {
    let board = Array(props.ROWS)
      .fill(0)
      .map(() => new Array(props.COLUMNS).fill(0));
    setBoard(board);
  };

  const handleRandom = () => {
    let newBoard = [];
    for(let i=0;i<props.ROWS;i++) {
        newBoard[i] = board[i].slice(0);
    }
    for (var i = 0; i < props.ROWS; i++) {
      for (var j = 0; j < board[i].length; j++) {
        newBoard[i][j] = Math.random() >= 0.6 ? 1 : 0;
      }
    }
    setBoard(newBoard);
  };
  
  const handleRun = () => {
      console.log(board);
    let newBoard = [];
    for(let i=0;i<props.ROWS;i++) {
        newBoard[i] = board[i].slice(0);
    }
    console.log("here")
    board.map((x, i)=> {
        x.map((y, j)=>{
            let neighbors = countNeighbours(board, i, j);
            if(board[i][j] == 1 ) {
                if(neighbors == 2 || neighbors == 3) {
                    newBoard[i][j] = 1;
                }
                else {
                    newBoard[i][j] = 0;
                }
            } else if (board[i][j] == 0 && neighbors == 3) {
                newBoard[i][j] = 1;
            }
        })
    })
    console.log(newBoard);
    setBoard(newBoard);

    // let counter = iteration - 1;
    

    // setTimeout(() => {
    //     console.log(iteration)
    //     setIteration((iteration) => {
    //         return iteration - 1;
    //     });
    //     if(iteration > 0)
    //         handleRun()
    //     else
    //         return;
    // }, 2000);
  };
  
//   const loop = (counter) => {
//     while(counter--){
        
//     }
//   }
  const countNeighbours = (board, i, j) => {
    let neighbors = 0;
    const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    for (let r = 0; r < dirs.length; r++) {
        const dir = dirs[r];
        let x1 = i + dir[0];
        let y1 = j + dir[1];

        if (x1 >= 0 && x1 < props.ROWS && y1 >= 0 && y1 < props.COLUMNS && board[x1][y1] === 1) {
            neighbors++;
        }
    }

    return neighbors;
}

  return (
    <div>
      <button onClick={handleRun}>Run</button>
      <button onClick={handleClear}>Clear</button>
      <button onClick={handleRandom}>Random</button>
    </div>
  );
};

export default Controls;
