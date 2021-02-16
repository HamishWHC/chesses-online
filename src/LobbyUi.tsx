import type {Lobby} from "./lobby/base"
import React from "react"
import styles from "./LobbyUi.module.css"
import type {ChatMessageData} from "./lobby/types"
import {useForceUpdate} from "./utils"
import {Spinner} from "./Spinner"

interface LobbyUiProps {
    lobby: Lobby
}

const useChat = (lobby: Lobby) => {
    let [chat, setChat] = React.useState<Array<ChatMessageData & {nickname: string}>>([])

    const processChatMsg = React.useCallback((msg: ChatMessageData) => {
        setChat(prev => [{
            ...msg,
            nickname: lobby.nicknames[msg.author]
        }, ...prev])
    }, [])

    React.useEffect(() => {
        lobby.events.on("chatMessage", processChatMsg)
        return () => {
            lobby.events.off("chatMessage", processChatMsg)
        }
    }, [lobby])

    return chat
}

export const LobbyUi = ({lobby}: LobbyUiProps) => {
    let chat = useChat(lobby)
    const forceUpdate = useForceUpdate()
    React.useEffect(() => {
        lobby.events.on("sync", forceUpdate)
        return () => {
            lobby.events.off("sync", forceUpdate)
        }
    }, [lobby])
    return lobby.connected ? <div className={styles.lobby}>
        <div className={styles.history}>

        </div>
        <div className={styles.board}>
            {lobby.game && <lobby.game.Ui game={lobby.game} names={{
                white: lobby.activePlayers.white ? lobby.nicknames[lobby.activePlayers.white] : undefined,
                black: lobby.activePlayers.black ? lobby.nicknames[lobby.activePlayers.black] : undefined
            }} />}
            {lobby.synced || <div className={styles.loadingCover}><Spinner small /></div>}
        </div>
        <div className={styles.chat}>
            <div className={styles.messages}>
                {chat.map((msg, i) => <div key={i}>{msg.nickname}: {msg.message}</div>)}
            </div>
            <button onClick={() => lobby.message(`${chat.length}`)}>Chat</button>
        </div>
    </div> : <Spinner />
}