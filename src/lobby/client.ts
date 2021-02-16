import type Peer from "peerjs";
import {gameModes} from "../game";
import type {Game} from "../game/base";
import type {Move} from "../game/types";
import {Lobby} from "./base";
import {MessageToClient, Message, MessageToClientType, MessageToHostType, ChatMessageData} from "./types";

export class LobbyClient extends Lobby {
    connected = false;
    synced = false;
    isHost = false;
    hostId: string;

    game?: Game
    nicknames = {}
    private connection?: Peer.DataConnection;

    constructor(id: string) {
        super()

        this.peer.on("error", console.log)

        // this.connection = this.peer.connect(id)
        // this.connection.on("error", console.log)
        this.hostId = id

        this.peer.on("open", () => {
            this.connection = this.peer.connect(id)

            this.connection.on("open", () => {
                this.connected = true
            })

            this.connection.on("data", (data: MessageToClient) => {
                if (data.type === MessageToClientType.SYNC || data.type === MessageToClientType.LOBBY_INFO) {
                    if (data.type === MessageToClientType.LOBBY_INFO) {
                        const mode = gameModes[data.mode]
                        this.game = new mode!()
                    }
                    this.nicknames = data.nicknames
                    this.activePlayers = data.activePlayers
                    this.game?.update(data.board, data.turn, data.history)
                    this.synced = true
                    this.events.emit("sync")
                } else if (data.type === MessageToClientType.CHAT_BROADCAST) {
                    console.log("chat")
                    this.events.emit("chatMessage", {author: data.author, message: data.message})
                }
            })
        })
    }

    leave(): void {
        throw new Error("Method not implemented.");
    }

    message(msg: string): void {
        const msgData: ChatMessageData = {message: msg, author: this.peer.id}
        this.events.emit("chatMessage", msgData)
        this.connection?.send({message: msg, type: MessageToHostType.CHAT})
    }

    move(move: Move): void {
        throw new Error("Method not implemented.");
    }
}