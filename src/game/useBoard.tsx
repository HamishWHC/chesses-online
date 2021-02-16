import React from "react"
import {getPieceImgSrc} from "../pieces"
import type {Board, Move, Piece, Position, Side} from "./types"
import styles from "./Board.module.css"
import {Flipped, Flipper} from "react-flip-toolkit"
import type {Game} from "./base"

interface UseBoardOptions {
    game: Game
    onActiveSidePieceClick: (position: Position, piece: Piece) => void
    onHighlightedPositionClick: (position: Position) => void
    allocatePieceIds: (board: Board, prev?: BoardWithIds, move?: Move) => BoardWithIds
}

type BoardWithIds = (Piece & {id: number} | null)[][]

export const useBoard = (options: UseBoardOptions) => {
    let [board, setBoard] = React.useState(options.allocatePieceIds(options.game.board))
    let [activeSide, setActiveSide] = React.useState(options.game.turn)

    React.useEffect(() => {
        const handleBoardChange = (move: Move) => {
            console.log("handling board change")
            setBoard(prev => options.allocatePieceIds(options.game.board, prev, move))
            setActiveSide(options.game.turn)
        }
        options.game.events.on("move", handleBoardChange)
        return () => {
            options.game.events.off("move", handleBoardChange)
        }
    }, [options])

    let [locked, setLocked] = React.useState(false)
    let [highlighted, setHighlighted] = React.useState<Position[]>([])
    const hlStrings = highlighted.map(p => `${p.x}${p.y}`)

    return {
        setActiveSide,
        setHighlighted,
        setLocked,
        activeSide,
        board,
        highlighted,
        locked,
        view: <Flipper flipKey={JSON.stringify(board)}>
            <div className={styles.board}>
                {
                    board.flatMap((rank, y) => rank.map(
                        (piece, x) => <div key={`${x}${y}`} className={styles.square}
                            style={{
                                gridRow: `${y + 1}`,
                                gridColumn: `${x + 1}`,
                                backgroundColor: x % 2 ^ y % 2 ? "#b58863" : "#f0d9b5"
                            }}>
                            {piece && <Flipped flipId={piece.id}>
                                <img className={styles.piece} src={getPieceImgSrc(piece)} />
                            </Flipped>}
                            {hlStrings.includes(`${x}${y}`) && <div className={styles.highlight} />}
                        </div>
                    ))
                }
            </div>
        </Flipper>
    }
}