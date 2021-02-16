import EventEmitter from "events";
import Peer from "peerjs";
import type {Game} from "../game/base";
import type {Move} from "../game/types";
import type {ActivePlayers, Message} from "./types";

export abstract class Lobby {
    abstract connected: boolean
    abstract synced: boolean
    abstract isHost: boolean
    abstract hostId?: string
    protected peer: Peer;
    abstract game?: Game
    activePlayers: ActivePlayers = {white: null, black: null}
    events: EventEmitter;
    
    constructor() {
        this.peer = new Peer()
        this.events = new EventEmitter()
    }

    abstract get nicknames(): {[key: string]: string}

    abstract leave(): void
    abstract message(msg: string): void
    abstract move(move: Move): void
}