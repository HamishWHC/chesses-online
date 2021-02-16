import {Piece, PieceType, Side} from "../game/types"

import bb from "./bb.svg"
import bk from "./bk.svg"
import bn from "./bn.svg"
import bp from "./bp.svg"
import bq from "./bq.svg"
import br from "./br.svg"

import wb from "./wb.svg"
import wk from "./wk.svg"
import wn from "./wn.svg"
import wp from "./wp.svg"
import wq from "./wq.svg"
import wr from "./wr.svg"

const PIECES = {
    [Side.BLACK]: {
        [PieceType.BISHOP]: bb,
        [PieceType.KING]: bk,
        [PieceType.KNIGHT]: bn,
        [PieceType.PAWN]: bp,
        [PieceType.QUEEN]: bq,
        [PieceType.ROOK]: br,
    },
    [Side.WHITE]: {
        [PieceType.BISHOP]: wb,
        [PieceType.KING]: wk,
        [PieceType.KNIGHT]: wn,
        [PieceType.PAWN]: wp,
        [PieceType.QUEEN]: wq,
        [PieceType.ROOK]: wr,
    }
}

export const getPieceImgSrc = (piece: Piece) => PIECES[piece.side][piece.type]