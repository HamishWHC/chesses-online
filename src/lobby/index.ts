import Peer from "peerjs";
import type {Game} from "src/game/base";
import type {Move} from "src/game/types";
import {ActivePlayers, Message, MessageToClient, MessageToClientType, MessageToHost, Player} from "./types";
import EventEmitter from "events"

export abstract class Lobby {
    abstract nicknames: {[key: string]: string}
    game?: Game
    abstract id?: string
    abstract synced: boolean
    protected peer: Peer;
    events: EventEmitter;
    constructor() {
        this.peer = new Peer()
        this.events = new EventEmitter()
    }

    abstract leave(): void
    abstract message(msg: string): void
    abstract move(move: Move): void
    abstract rawMsg(msg: Message): void
}

export class LobbyHost extends Lobby {
    game: Game
    id?: string
    private players: {[key: string]: Player} = {}
    private activePlayers: ActivePlayers = {white: null, black: null}

    synced = true

    private _playerCount = 0

    private get playerCount() {
        this._playerCount++
        return this._playerCount
    }

    get nicknames(): {[key: string]: string} {
        return Object.fromEntries(Object.entries(this.players).map(([k, {nickname}]) => [k, nickname]))
    }

    constructor(game: Game) {
        super()

        this.game = game

        this.peer.on('connection', (conn) => {
            conn.on('open', () => {
                this.players[conn.peer] = {connection: conn, nickname: `Player ${this.playerCount}`}
                conn.send({
                    type: MessageToClientType.SYNC,
                    board: this.game.board,
                    nicknames: this.nicknames,
                    ...this.activePlayers
                });
            });
            conn.on('data', (data: MessageToHost) => {
                // stub
            });
            conn.on("close", () => {
                delete this.players[conn.peer]
                this.activePlayers.white = this.activePlayers.white === conn.peer ? null : this.activePlayers.white
                this.activePlayers.black = this.activePlayers.black === conn.peer ? null : this.activePlayers.black
            })
        });

        this.peer.on("open", id => {
            this.id = id
            this.events.emit("id", this.id)
        })
    }

    private broadcast(msg: MessageToClient) {
        Object.values(this.players).forEach(({connection: conn}) => conn.send(msg))
    }

    leave(): void {
        throw new Error("Method not implemented.");
    }
    message(msg: string): void {
        throw new Error("Method not implemented.");
    }
    move(move: Move): void {
        throw new Error("Method not implemented.");
    }
    rawMsg(msg: Message): void {
        throw new Error("Method not implemented.");
    }
}

export class LobbyClient extends Lobby {
    synced = false;
    id: string;
    private connection: Peer.DataConnection;
    nicknames: {[key: string]: string} = {}

    constructor(id: string) {
        super()

        this.connection = this.peer.connect(id)
        this.id = id

        this.connection.on("data", (data: MessageToClient) => {
            // stub
        })
    }

    leave(): void {
        throw new Error("Method not implemented.");
    }
    message(msg: string): void {
        throw new Error("Method not implemented.");
    }
    move(move: Move): void {
        throw new Error("Method not implemented.");
    }
    rawMsg(msg: Message): void {
        throw new Error("Method not implemented.");
    }
}