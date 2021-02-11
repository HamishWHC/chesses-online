import "./Board.css"
import React from "react"
import bb from "./pieces/bb.svg"
import type {Board} from "./game/types"

interface BoardUiProps {
    board: Board
}

export const BoardUi = ({}: BoardUiProps) => {
    return <div className="board">
        {[...Array(8)].flatMap((_, x) => [...Array(8)].map(
            (_, y) => <div key={`${x}${y}`} className="square"
                style={{
                    gridRow: `${x + 1}`,
                    gridColumn: `${y + 1}`,
                    backgroundColor: x % 2 ^ y % 2 ? "#b58863" : "#f0d9b5"
                }}>
                <img className="piece" src={bb} />
            </div>
        ))}
    </div>
}