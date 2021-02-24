import React from "react"
import {getPieceImgSrc} from "../pieces"
import type {Board, Move, Piece, Position, Side} from "./types"
import styles from "./Board.module.css"
import {Flipped, Flipper} from "react-flip-toolkit"
import type {Game} from "./base"
interface UseBoardOptions {
    onActiveSidePieceClick: (position: Position, piece: Piece) => void
    onHighlightedPositionClick: (position: Position) => void
    initialBoard: BoardWithIds,
    initialTurn: Side,
    onAnimationComplete?: () => void
}

export type BoardWithIds = (Piece & {id: number} | null)[][]

const makeOnTop = (el: HTMLElement) => {
    el.style.zIndex = "1000"
}

const resetZIndex = (el: HTMLElement) => {
    el.style.zIndex = ""
}

export const useBoard = (options: UseBoardOptions) => {
    let [board, setBoard] = React.useState(options.initialBoard)
    let [activeSide, setActiveSide] = React.useState(options.initialTurn)

    let [locked, setLocked] = React.useState(false)
    let [highlighted, setHighlighted] = React.useState<Position[]>([])
    const hlStrings = highlighted.map(p => `${p.x}${p.y}`)

    const makeOnActiveSidePieceClick = React.useCallback((pos: Position, piece: Piece) => {
        return () => options.onActiveSidePieceClick(pos, piece)
    }, [options.onActiveSidePieceClick])

    const makeOnHighlightedPositionClick = React.useCallback((pos: Position) => {
        return () => options.onHighlightedPositionClick(pos)
    }, [options.onHighlightedPositionClick])

    return {
        setActiveSide,
        setHighlighted,
        setLocked,
        setBoard,
        activeSide,
        board,
        highlighted,
        locked,
        view: <Flipper flipKey={JSON.stringify(board)} onComplete={options.onAnimationComplete}>
            <div className={styles.board}>
                {
                    board.flatMap((rank, y) => rank.map(
                        (piece, x) => <div
                            key={`${x}${y}`}
                            className={styles.square}
                            style={{
                                gridRow: `${y + 1}`,
                                gridColumn: `${x + 1}`,
                                backgroundColor: x % 2 ^ y % 2 ? "#b58863" : "#f0d9b5"
                            }}
                        >
                            {piece && <Flipped flipId={piece.id} onStart={makeOnTop} onComplete={resetZIndex}>
                                <img
                                    className={styles.piece}
                                    src={getPieceImgSrc(piece)}
                                    onClick={!locked && piece.side === activeSide ? makeOnActiveSidePieceClick({x, y}, piece) : undefined}
                                />
                            </Flipped>}
                            {hlStrings.includes(`${x}${y}`) && <div
                                className={styles.highlight}
                                onClick={!locked ? makeOnHighlightedPositionClick({x, y}) : undefined}
                            />}
                        </div>
                    ))
                }
            </div>
        </Flipper>
    }
}