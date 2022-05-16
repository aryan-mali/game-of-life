import React, {useState, useEffect} from 'react'
import "./Board.css";
const Board = (props) => {
    const {board, setBoard} = props;
    // let board = Array(10).fill(0).map(row => new Array(10).fill(0));
    // const [board, setBoard] = useState(Array(10).fill(0).map(row => new Array(10).fill(0)))
    
    const handleClick = ({idx, index}) => {
        let newBoard = [...board];
        newBoard[idx][index] = 1;
        setBoard(newBoard);
    }
    
    return (
        <div className="Board">
            {board? board.map((item, idx) => {
                return (
                    <div key={idx} className="rows">
                        {item.map((it, index)=>{
                            return (
                                <button onClick={handleClick.bind(null,{idx, index})} key={index} className="cell" style={{backgroundColor: board[idx][index] != 1? "black":"white"}}/>
                            )
                        })}
                    </div>
                )
            }): null}
        </div>
    )
}

export default Board;