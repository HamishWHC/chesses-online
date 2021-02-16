import React from 'react';
import {Route, Switch, useHistory, useRouteMatch} from 'react-router-dom';
import './App.css';
import {gameModes} from './game/index';
import type {Game} from './game/base';
import {Home} from './Home';
import {LobbyUi} from './LobbyUi';
import type {Lobby} from './lobby/base';
import {LobbyClient} from './lobby/client';
import {LobbyHost} from './lobby/host';

const App = () => {
    const [lobby, setLobby] = React.useState<Lobby | null>(null)
    const history = useHistory()
    const newGameMatch = useRouteMatch<{mode: string}>("/new/:mode")
    const joinGameMatch = useRouteMatch<{code: string}>("/game/:code")
    const newGameUrl = newGameMatch?.url || null
    const joinGameUrl = joinGameMatch?.url || null

    React.useEffect(() => {
        if (newGameMatch?.isExact) {
            const mode = gameModes[newGameMatch.params.mode.toUpperCase()]
            if (mode) {
                const game: Game = new mode()
                const lobby = new LobbyHost(game)
                setLobby(lobby)
                lobby.events.once("establishedLobbyId", id => history.replace(`/game/${id}`))
            } else {
                history.push("/")
            }
        }
    }, [newGameUrl])

    React.useEffect(() => {
        if (joinGameMatch?.isExact && !lobby) {
            const lobby = new LobbyClient(joinGameMatch.params.code)
            setLobby(lobby)
        }
    }, [joinGameUrl])

    return <Switch>
        <Route path="/" exact>
            <Home />
        </Route>
        <Route path="/new/:mode" exact>
            <div>Creating Game...</div>
        </Route>
        <Route path="/game/:code" exact>
            {lobby ? <LobbyUi lobby={lobby} /> : <div>Joining Game...</div>}
        </Route>
    </Switch>;
}

export default App;
