import React, { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import Controls from "./components/Controls/Controls";

const ROWS = 30;
const COLUMNS = 40;

function generateBoard() {
  return Array(ROWS)
    .fill(0)
    .map(() => new Array(COLUMNS).fill(0));
}

const App = () => {
  const [board, setBoard] = useState(generateBoard());

  return (
    <div className="App">
      <h1></h1>
      <Board board={board} setBoard={setBoard} />
      <Controls
        board={board}
        setBoard={setBoard}
        ROWS={ROWS}
        COLUMNS={COLUMNS}
        generateBoard={generateBoard}
      />
    </div>
  );
};

export default App;
