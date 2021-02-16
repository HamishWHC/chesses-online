import type {DataConnection} from "peerjs"
import type {Game} from "../game/base"
import type {Move} from "../game/types"
import {Lobby} from "./base"
import {Player, ActivePlayers, MessageToClientType, MessageToHost, MessageToClient, Message, MessageToHostType, ResyncMessage, LobbyInfoMessage, PlayerUpdateBroadcastMessage, ChatMessageData} from "./types"

export class LobbyHost extends Lobby {
    isHost = true
    synced = true
    connected = true
    get hostId() {
        return this.peer.id
    }

    private players: {[key: string]: Player} = {}
    private ownNickname: string
    game: Game

    private _playerCount = 0

    private get playerCount() {
        this._playerCount += 1
        return this._playerCount
    }

    get nicknames() {
        return {
            ...Object.fromEntries(Object.entries(this.players).map(([k, {nickname}]) => [k, nickname])),
            [this.peer.id]: this.ownNickname
        }
    }

    private makePlayerUpdateMessage(): PlayerUpdateBroadcastMessage {
        return {
            type: MessageToClientType.PLAYER_CHANGE_BROADCAST,
            nicknames: this.nicknames,
            activePlayers: this.activePlayers,
        }
    }

    private makeSyncMessage(): ResyncMessage {
        return {
            ...this.makePlayerUpdateMessage(),
            type: MessageToClientType.SYNC,
            board: this.game.board,
            turn: this.game.turn,
            history: this.game.history
        }
    }

    constructor(game: Game) {
        super()

        this.game = game
        this.ownNickname = `Player ${this.playerCount}`

        this.peer.on("open", id => {
            this.events.emit("establishedLobbyId", id)
        })

        this.peer.on('connection', (conn) => {
            conn.on('open', () => {
                this.players[conn.peer] = {connection: conn, nickname: `Player ${this.playerCount}`}
                conn.send({
                    ...this.makeSyncMessage(),
                    type: MessageToClientType.LOBBY_INFO,
                    mode: this.game.mode
                })
                this.broadcast(this.makePlayerUpdateMessage())
            });
            conn.on('data', (data: MessageToHost) => {
                if (data.type === MessageToHostType.CHAT) {
                    this.broadcast({
                        type: MessageToClientType.CHAT_BROADCAST,
                        message: data.message,
                        author: conn.peer
                    }, [conn])
                    this.events.emit("chatMessage", {message: data.message, author: conn.peer})
                } else if (data.type === MessageToHostType.NICKNAME_CHANGE) {
                    this.players[conn.peer].nickname = data.nickname
                    this.broadcast(this.makePlayerUpdateMessage(), [conn])
                } else if (data.type === MessageToHostType.SYNC_REQUEST) {
                    conn.send(this.makeSyncMessage());
                } else if (data.type === MessageToHostType.MOVE) {
                    // stub
                }
            });
            conn.on("close", () => {
                delete this.players[conn.peer]
                this.activePlayers.white = this.activePlayers.white === conn.peer ? null : this.activePlayers.white
                this.activePlayers.black = this.activePlayers.black === conn.peer ? null : this.activePlayers.black
            })
        });
    }

    private broadcast(msg: MessageToClient, exclude: DataConnection[] = []) {
        Object.values(this.players).filter(({connection: conn}) => !exclude.includes(conn)).forEach(({connection: conn}) => conn.send(msg))
    }

    leave(): void {
        throw new Error("Method not implemented.");
    }
    
    message(msg: string): void {
        const msgData: ChatMessageData = {message: msg, author: this.hostId}
        this.events.emit("chatMessage", msgData)
        this.broadcast({...msgData, type: MessageToClientType.CHAT_BROADCAST})
    }

    move(move: Move): void {
        throw new Error("Method not implemented.");
    }
}