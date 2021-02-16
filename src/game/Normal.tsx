import {START_BOARD} from "./index";
import {Game, GameUiProps} from "./base";
import {Side, Move, PieceType} from "./types";
import {useBoard} from "./useBoard";
import {Sides} from "./Sides";
import React from "react"

export class Normal extends Game {
    mode = "NORMAL"
    turn = Side.WHITE;
    board = START_BOARD
    history = []
    isValidMove(move: Move): boolean {
        return true
    }
    Ui = ({game, names}: GameUiProps) => {
        const {view, activeSide, highlighted, setHighlighted} = useBoard({
            game,
            onActiveSidePieceClick: () => {},
            onHighlightedPositionClick: () => {},
            allocatePieceIds: (board, prev, move) => {
                if (prev && move) {
                    let prevId = prev[move.start.y][move.start.x]?.id
                    return board.map((rank, y) => rank.map((p, x) => {
                        if (prevId && `${move.end.x}${move.end.y}` === `${x}${y}`) {
                            return p ? {...p, id: prevId} : null
                        }
                        return p ? {...p, id: prev[y][x]!.id} : null
                    }))
                } else {
                    let uid = 0;
                    return board.map(rank => rank.map(p => p ? {...p, id: uid++} : null))
                }
            }
        })
        React.useEffect(() => {
            setHighlighted([{x: 2, y: 4}])
            setTimeout(() => {
                console.log("timeout running")
                game.move({start: {x: 3, y: 6}, end: {x: 7, y: 0}})
            }, 3000)
        }, [])
        return <Sides active={{[activeSide === Side.WHITE ? "bottom" : "top"]: true}} names={{left: "HamishWHC"}}>
            {view}
        </Sides>
    }
}