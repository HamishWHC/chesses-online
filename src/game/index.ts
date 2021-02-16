import type {Game} from "./base";
import {Normal} from "./Normal";
import {PieceType, Side} from "./types";

export const gameModes: Record<string, (new () => Game) | undefined> = {
    NORMAL: Normal
}

export const START_BOARD = [
    [
        {side: Side.BLACK, type: PieceType.ROOK},
        {side: Side.BLACK, type: PieceType.KNIGHT},
        {side: Side.BLACK, type: PieceType.BISHOP},
        {side: Side.BLACK, type: PieceType.QUEEN},
        {side: Side.BLACK, type: PieceType.KING},
        {side: Side.BLACK, type: PieceType.BISHOP},
        {side: Side.BLACK, type: PieceType.KNIGHT},
        {side: Side.BLACK, type: PieceType.ROOK}
    ],
    [
        {side: Side.BLACK, type: PieceType.PAWN},
        {side: Side.BLACK, type: PieceType.PAWN},
        {side: Side.BLACK, type: PieceType.PAWN},
        {side: Side.BLACK, type: PieceType.PAWN},
        {side: Side.BLACK, type: PieceType.PAWN},
        {side: Side.BLACK, type: PieceType.PAWN},
        {side: Side.BLACK, type: PieceType.PAWN},
        {side: Side.BLACK, type: PieceType.PAWN}
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
        {side: Side.WHITE, type: PieceType.PAWN},
        {side: Side.WHITE, type: PieceType.PAWN},
        {side: Side.WHITE, type: PieceType.PAWN},
        {side: Side.WHITE, type: PieceType.PAWN},
        {side: Side.WHITE, type: PieceType.PAWN},
        {side: Side.WHITE, type: PieceType.PAWN},
        {side: Side.WHITE, type: PieceType.PAWN},
        {side: Side.WHITE, type: PieceType.PAWN}
    ],
    [
        {side: Side.WHITE, type: PieceType.ROOK},
        {side: Side.WHITE, type: PieceType.KNIGHT},
        {side: Side.WHITE, type: PieceType.BISHOP},
        {side: Side.WHITE, type: PieceType.QUEEN},
        {side: Side.WHITE, type: PieceType.KING},
        {side: Side.WHITE, type: PieceType.BISHOP},
        {side: Side.WHITE, type: PieceType.KNIGHT},
        {side: Side.WHITE, type: PieceType.ROOK}
    ]
]