import type {Lobby} from "./lobby"
import React from "react"
import {BoardUi} from "./BoardUi"

interface GameUiProps {
    lobby: Lobby
}

export const GameUi = ({lobby}: GameUiProps) => {
    if (!lobby.game) {
        return <>No game data.</>
    }
    return <div>
        <BoardUi board={lobby.game?.board}/>
    </div>
}