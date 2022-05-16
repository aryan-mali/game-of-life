import React,{useState} from 'react';
import './Game.css';


const CELL_SIZE = 20;
const WIDTH = 800;
const HEIGHT = 600;

const Cell = (props) => {
    const {x, y} = props;
    
    return (
        <div className="Cell" id={x+","+y} style={{
            left: `${CELL_SIZE * x + 1}px`,
            top: `${CELL_SIZE * y + 1}px`,
            width: `${CELL_SIZE - 1}px`,
            height: `${CELL_SIZE - 1}px`,
        }} />
    )
}

// class Cell extends React.Component {

//     render() {
//         const { x, y } = this.props;
//         return (
//             <div className="Cell" id={x+","+y} style={{
//                 left: `${CELL_SIZE * x + 1}px`,
//                 top: `${CELL_SIZE * y + 1}px`,
//                 width: `${CELL_SIZE - 1}px`,
//                 height: `${CELL_SIZE - 1}px`,
//             }} />
//         );
//     }
// }

const Game = () => {
    
    const [cells, setCells] = useState([]);
    const [isRunning, setIsRunning]= useState(false);
    const [interval, setInterval]= useState(100);
    const [iteration, setIteration]= useState(10);

    const makeEmptyBoard = () => {
        let board = [];
        for (let y = 0; y < this.rows; y++) {
            board[y] = [];
            for (let x = 0; x < this.cols; x++) {
                board[y][x] = false;
            }
        }

        return board;
    }

    const getElementOffset = () => {
        const rect = this.boardRef.getBoundingClientRect();
        const doc = document.documentElement;

        return {
            x: (rect.left + window.pageXOffset) - doc.clientLeft,
            y: (rect.top + window.pageYOffset) - doc.clientTop,
        };
    }

    const makeCells = () => {
        let cells = [];
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                if (this.board[y][x]) {
                    cells.push({ x, y });
                }
            }
        }

        return cells;
    }

    const handleClick = (event) => {

        const elemOffset = this.getElementOffset();
        const offsetX = event.clientX - elemOffset.x;
        const offsetY = event.clientY - elemOffset.y;
        
        const x = Math.floor(offsetX / CELL_SIZE);
        const y = Math.floor(offsetY / CELL_SIZE);

        if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
            this.board[y][x] = !this.board[y][x];
        }

        this.setState({ cells: this.makeCells() });
    }

    const runGame = () => {
        this.setState({ isRunning: true });
        this.runIteration();
    }

    const stopGame = () => {
        this.setState({ isRunning: false });
        if (this.timeoutHandler) {
            window.clearTimeout(this.timeoutHandler);
            this.timeoutHandler = null;
        }
    }

    const runIteration = () => {
        let newBoard = this.makeEmptyBoard();

        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                let neighbors = this.calculateNeighbors(this.board, x, y);
                if (this.board[y][x]) {
                    if (neighbors === 2 || neighbors === 3) {
                        newBoard[y][x] = true;
                    } else {
                        newBoard[y][x] = false;
                    }
                } else {
                    if (!this.board[y][x] && neighbors === 3) {
                        newBoard[y][x] = true;
                    }
                }
            }
        }

        this.board = newBoard;
        this.setState({ cells: this.makeCells() });

        this.state.iteration--;
        console.log(this.state.iteration);

        if(this.state.iteration == 0) {
            this.stopGame;
        } else {
            this.timeoutHandler = window.setTimeout(() => {
                this.runIteration();
            }, this.state.interval);
        }

        
    }

    const calculateNeighbors = (board, x, y) => {
        let neighbors = 0;
        const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            let y1 = y + dir[0];
            let x1 = x + dir[1];

            if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
                neighbors++;
            }
        }

        return neighbors;
    }

    const handleIntervalChange = (event) => {
        this.setState({ interval: event.target.value });
    }

    const handleInterations = (event) => {
        this.setState({ iteration: event.target.value });
    }

    const handleClear = () => {
        this.board = this.makeEmptyBoard();
        this.setState({ cells: this.makeCells() });
    }

    const handleRandom = () => {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.cols; x++) {
                this.board[y][x] = (Math.random() >= 0.4);
            }
        }

        this.setState({ cells: this.makeCells() });
    }

    return (
        <div>
                    <div className="Board"
                        style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
                        onClick={handleClick}
                        // ref={(n) => { this.boardRef = n; }}
                        >

                        {cells.map(cell => (
                            <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
                        ))}
                    </div>

                    <div className="controls">
                        speed <input value={interval} onChange={handleIntervalChange} /> 
                        iterations <input value={iteration} onChange={handleInterations} /> 
                        {isRunning ?
                            <button className="button" onClick={stopGame}>Stop</button> :
                            <button className="button" onClick={runGame}>Run</button>
                        }
                        <button className="button" onClick={handleRandom}>Random</button>
                        <button className="button" onClick={handleClear}>Clear</button>
                    </div>
                </div>
    )
}

// class Game extends React.Component {

//     constructor() {
//         super();
//         this.rows = HEIGHT / CELL_SIZE;
//         this.cols = WIDTH / CELL_SIZE;

//         this.board = this.makeEmptyBoard();
//     }

    // state = {
    //     cells: [],
    //     isRunning: false,
    //     interval: 100,
    //     iteration: 10
    // }

    // makeEmptyBoard() {
    //     let board = [];
    //     for (let y = 0; y < this.rows; y++) {
    //         board[y] = [];
    //         for (let x = 0; x < this.cols; x++) {
    //             board[y][x] = false;
    //         }
    //     }

    //     return board;
    // }

    // getElementOffset() {
    //     const rect = this.boardRef.getBoundingClientRect();
    //     const doc = document.documentElement;

    //     return {
    //         x: (rect.left + window.pageXOffset) - doc.clientLeft,
    //         y: (rect.top + window.pageYOffset) - doc.clientTop,
    //     };
    // }

    // makeCells() {
    //     let cells = [];
    //     for (let y = 0; y < this.rows; y++) {
    //         for (let x = 0; x < this.cols; x++) {
    //             if (this.board[y][x]) {
    //                 cells.push({ x, y });
    //             }
    //         }
    //     }

    //     return cells;
    // }

    // handleClick = (event) => {

    //     const elemOffset = this.getElementOffset();
    //     const offsetX = event.clientX - elemOffset.x;
    //     const offsetY = event.clientY - elemOffset.y;
        
    //     const x = Math.floor(offsetX / CELL_SIZE);
    //     const y = Math.floor(offsetY / CELL_SIZE);

    //     if (x >= 0 && x <= this.cols && y >= 0 && y <= this.rows) {
    //         this.board[y][x] = !this.board[y][x];
    //     }

    //     this.setState({ cells: this.makeCells() });
    // }

    // runGame = () => {
    //     this.setState({ isRunning: true });
    //     this.runIteration();
    // }

    // stopGame = () => {
    //     this.setState({ isRunning: false });
    //     if (this.timeoutHandler) {
    //         window.clearTimeout(this.timeoutHandler);
    //         this.timeoutHandler = null;
    //     }
    // }

    // runIteration() {
    //     let newBoard = this.makeEmptyBoard();

    //     for (let y = 0; y < this.rows; y++) {
    //         for (let x = 0; x < this.cols; x++) {
    //             let neighbors = this.calculateNeighbors(this.board, x, y);
    //             if (this.board[y][x]) {
    //                 if (neighbors === 2 || neighbors === 3) {
    //                     newBoard[y][x] = true;
    //                 } else {
    //                     newBoard[y][x] = false;
    //                 }
    //             } else {
    //                 if (!this.board[y][x] && neighbors === 3) {
    //                     newBoard[y][x] = true;
    //                 }
    //             }
    //         }
    //     }

    //     this.board = newBoard;
    //     this.setState({ cells: this.makeCells() });

    //     this.state.iteration--;
    //     console.log(this.state.iteration);

    //     if(this.state.iteration == 0) {
    //         this.stopGame;
    //     } else {
    //         this.timeoutHandler = window.setTimeout(() => {
    //             this.runIteration();
    //         }, this.state.interval);
    //     }

        
    // }

    // calculateNeighbors(board, x, y) {
    //     let neighbors = 0;
    //     const dirs = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    //     for (let i = 0; i < dirs.length; i++) {
    //         const dir = dirs[i];
    //         let y1 = y + dir[0];
    //         let x1 = x + dir[1];

    //         if (x1 >= 0 && x1 < this.cols && y1 >= 0 && y1 < this.rows && board[y1][x1]) {
    //             neighbors++;
    //         }
    //     }

    //     return neighbors;
    // }

    // handleIntervalChange = (event) => {
    //     this.setState({ interval: event.target.value });
    // }

    // handleInterations = (event) => {
    //     this.setState({ iteration: event.target.value });
    // }

    // handleClear = () => {
    //     this.board = this.makeEmptyBoard();
    //     this.setState({ cells: this.makeCells() });
    // }

    // handleRandom = () => {
    //     for (let y = 0; y < this.rows; y++) {
    //         for (let x = 0; x < this.cols; x++) {
    //             this.board[y][x] = (Math.random() >= 0.4);
    //         }
    //     }

    //     this.setState({ cells: this.makeCells() });
    // }

    // render() {
    //     const { cells, interval, isRunning, iteration } = this.state;
    //     return (
    //         <div>
    //             <div class="Board"
    //                 style={{ width: WIDTH, height: HEIGHT, backgroundSize: `${CELL_SIZE}px ${CELL_SIZE}px`}}
    //                 onClick={this.handleClick}
    //                 ref={(n) => { this.boardRef = n; }}>

    //                 {cells.map(cell => (
    //                     <Cell x={cell.x} y={cell.y} key={`${cell.x},${cell.y}`}/>
    //                 ))}
    //             </div>

    //             <div class="controls">
    //                 speed <input value={this.state.interval} onChange={this.handleIntervalChange} /> 
    //                 iterations <input value={this.state.iteration} onChange={this.handleInterations} /> 
    //                 {isRunning ?
    //                     <button className="button" onClick={this.stopGame}>Stop</button> :
    //                     <button className="button" onClick={this.runGame}>Run</button>
    //                 }
    //                 <button className="button" onClick={this.handleRandom}>Random</button>
    //                 <button className="button" onClick={this.handleClear}>Clear</button>
    //             </div>
    //         </div>
    //     );
    // }
// }


export default Game;