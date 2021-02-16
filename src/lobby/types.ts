import type {DataConnection} from "peerjs"
import type {Board, Move, Side} from "../game/types"

export enum MessageToClientType {
    MOVE_BROADCAST,
    CHAT_BROADCAST,
    TRANSFER,
    TRANSFER_BROADCAST,
    SYNC,
    PLAYER_CHANGE_BROADCAST,
    LOBBY_INFO
}

export enum MessageToHostType {
    MOVE,
    CHAT,
    SYNC_REQUEST,
    NICKNAME_CHANGE
}

export type Message = MessageToHost | MessageToClient

export type MessageToHost = MoveMessage | ChatMessage | ResyncRequestMessage | NicknameChangeMessage
export type MessageToClient = TransferMessage | TransferBroadcastMessage | MoveBroadcastMessage | ChatBroadcastMessage | ResyncMessage | LobbyInfoMessage | PlayerUpdateBroadcastMessage

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
}

export interface PlayerData {
    nicknames: {[key: string]: string}
    activePlayers: ActivePlayers
}

export interface TransferMessage extends PlayerData, GameData {
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

export interface ChatMessageData {
    author: string
    message: string
}

export interface ChatBroadcastMessage extends ChatMessageData {
    type: MessageToClientType.CHAT_BROADCAST
}

export interface ResyncRequestMessage {
    type: MessageToHostType.SYNC_REQUEST
}

export interface ResyncMessage extends GameData, PlayerData {
    type: MessageToClientType.SYNC
}

export interface NicknameChangeMessage {
    type: MessageToHostType.NICKNAME_CHANGE
    nickname: string
}

export interface PlayerUpdateBroadcastMessage extends PlayerData {
    type: MessageToClientType.PLAYER_CHANGE_BROADCAST
}

export interface LobbyInfoMessage extends PlayerData, GameData {
    type: MessageToClientType.LOBBY_INFO
    mode: string
}