import {START_BOARD} from "./index";
import {Game, GameUiProps} from "./base";
import {Side, Move, PieceType, Board} from "./types";
import {BoardWithIds, useBoard} from "./useBoard";
import {Sides} from "./Sides";
import React from "react"

const allocatePieceIds = (board: Board, prev?: BoardWithIds, move?: Move): BoardWithIds => {
    if (prev && move) {
        let prevId = prev[move.start.y][move.start.x]!.id
        return board.map((rank, y) => rank.map((p, x) => {
            if (`${move.end.x}${move.end.y}` === `${x}${y}`) {
                return p ? {...p, id: prevId} : null
            }
            return p ? {...p, id: prev[y][x]!.id} : null
        }))
    } else {
        let uid = 0;
        return board.map(rank => rank.map(p => p ? {...p, id: uid++} : null))
    }
}

export class Normal extends Game {
    mode = "NORMAL"
    turn = Side.WHITE;
    board = START_BOARD
    history = []
    isValidMove(move: Move): boolean {
        return true
    }
    Ui = ({game, names}: GameUiProps) => {
        const {view, activeSide, highlighted, setHighlighted, setBoard, setActiveSide} = useBoard({
            initialBoard: allocatePieceIds(game.board),
            initialTurn: game.turn,
            onActiveSidePieceClick: (pos, _) => {
                setHighlighted([pos])
            },
            onHighlightedPositionClick: () => {}
        })

        React.useEffect(() => {
            const handleBoardChange = (move: Move) => {
                setBoard(prev => allocatePieceIds(game.board, prev, move))
                setActiveSide(game.turn)
            }
            game.events.on("move", handleBoardChange)
            return () => {
                game.events.off("move", handleBoardChange)
            }
        }, [game])

        React.useEffect(() => {
            setTimeout(() => {
                game.move({start: {x: 4, y: 6}, end: {x: 4, y: 4}})
            }, 3000)
        }, [])
    
        return <Sides active={{[activeSide === Side.WHITE ? "bottom" : "top"]: true}} names={{left: "HamishWHC"}}>
            {view}
        </Sides>
    }
}