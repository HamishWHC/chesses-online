import type {Board, Move} from "./types";

export abstract class Game {
    abstract get board(): Board
    abstract isValidMove(move: Move): boolean
}

export class Normal extends Game {
    get board(): Board {
        return []
    }
    isValidMove(move: Move): boolean {
        return true
    }
}