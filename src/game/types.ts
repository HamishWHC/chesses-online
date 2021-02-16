export type Board = (Piece | null)[][]

export enum PieceType {
    KING,
    QUEEN,
    ROOK,
    BISHOP,
    KNIGHT,
    PAWN
}

export type Position = {x: number, y: number}
export type Move = {start: Position, end: Position}

export enum Side {
    WHITE,
    BLACK
}

export type Piece = {side: Side, type: PieceType}

// export enum GameMode {
//     NORMAL = "NORMAL",
//     PSIONIC = "PSIONIC",
//     CLONE = "CLONE",
//     CHANCE = "CHANCE",
//     CROWDED = "CROWDED",
//     GRAVITY = "GRAVITY",
//     LITE = "LITE",
//     MAD = "MAD",
//     MOMENTUM = "MOMENTUM",
//     QUANTUM = "QUANTUM",
//     FOG = "FOG",
//     REVERSAL = "REVERSAL",
//     MEMORY = "MEMORY",
//     PACIFIST = "PACIFIST",
// }