import EventEmitter from "events";
import type {Board, Move, Side} from "./types";

export interface GameUiProps {
    game: Game
    names: {white?: string, black?: string}
}

export abstract class Game {
    events: EventEmitter
    abstract mode: string
    abstract turn: Side
    abstract history: Move[]

    constructor() {
        this.events = new EventEmitter()
    }

    abstract board: Board
    abstract isValidMove(move: Move): boolean

    update(board: Board, turn: Side, history: Move[]): void {
        this.board = board
        this.turn = turn
        this.history = history
    }

    move(move: Move) {
        this.board[move.end.y][move.end.x] = this.board[move.start.y][move.start.x]
        this.board[move.start.y][move.start.x] = null
        this.events.emit("move", move)
    }

    abstract Ui: (props: GameUiProps) => JSX.Element
}