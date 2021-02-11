import type {DataConnection} from "peerjs"
import type {Board, Move, Side} from "src/game/types"

export enum MessageToClientType {
    MOVE_BROADCAST,
    CHAT_BROADCAST,
    TRANSFER,
    TRANSFER_BROADCAST,
    SYNC
}

export enum MessageToHostType {
    MOVE,
    CHAT,
    SYNC_REQUEST,
    NICKNAME_CHANGE
}

export type Message = MessageToHost | MessageToClient

export type MessageToHost = MoveMessage | ChatMessage | ResyncRequestMessage | NicknameChangeMessage
export type MessageToClient = TransferMessage | TransferBroadcastMessage | MoveBroadcastMessage | ChatBroadcastMessage | ResyncMessage

export interface ActivePlayers {
    white: string | null,
    black: string | null
}

export interface Player {
    connection: DataConnection
    nickname: string
}

export interface GameData {
    board: Board
    turn: Side
    history: Move[]
    mode: string
}

export interface SyncData extends ActivePlayers, GameData {
    nicknames: {[key: string]: string}
}

export interface TransferMessage extends SyncData {
    type: MessageToClientType.TRANSFER
}

export interface TransferBroadcastMessage {
    type: MessageToClientType.TRANSFER_BROADCAST
    newHost: string
}

export interface MoveMessage {
    type: MessageToHostType.MOVE
    move: Move
}

export interface MoveBroadcastMessage {
    type: MessageToClientType.MOVE_BROADCAST
    move: Move
}

export interface ChatMessage {
    type: MessageToHostType.CHAT
    message: string
}

export interface ChatBroadcastMessage {
    type: MessageToClientType.CHAT_BROADCAST
    message: string
    author: string
}

export interface ResyncRequestMessage {
    type: MessageToHostType.SYNC_REQUEST
}

export interface ResyncMessage extends SyncData {
    type: MessageToClientType.SYNC
}

export interface NicknameChangeMessage {
    type: MessageToHostType.NICKNAME_CHANGE
    nickname: string
}