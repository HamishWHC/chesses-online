import React from "react"
import {useHistory} from "react-router-dom"
import {gameModes} from "./game"
import "./Home.css"

interface MenuItemProps {
    label: string
    onClick?: ((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void)
}

const MenuItem = ({label, onClick}: MenuItemProps) => {
    return <div style={{cursor: onClick ? "pointer" : "none"}} className="menu-item" onClick={onClick}>
        {label}
    </div>
}

export const Home = () => {
    const [joinCode, setJoinCode] = React.useState("")
    const history = useHistory()
    return <div style={{display: "flex", height: "100%", flexDirection: "column"}}>
        <div className="title header">CHESSES ONLINE</div>
        <div className="wrapper">
            <div style={{width: 450}}>
                <div className="title" style={{paddingLeft: "1em", color: "yellow"}}>
                    CREATE GAME
                </div>
                {Object.keys(gameModes).map((k, i) => <MenuItem key={i} label={k} onClick={() => history.push(`/new/${k.toLowerCase()}`)} />)}
            </div>
            <div style={{width: 450}}>
                <div className="title">
                    JOIN GAME
                </div>
                <div style={{display: "flex"}}>
                    <input className="join-input" placeholder="Enter Game Code" value={joinCode} onChange={e => setJoinCode(e.target.value)}></input>
                    <div className="join-button" onClick={() => history.push(`/game/${joinCode}`)}>GO</div>
                </div>
            </div>
        </div>
        <div className="footer">By <a href="https://hamishwhc.com">HamishWHC</a>, inspired by <a href="https://pippinbarr.github.io">Pippin Barr</a>'s <a href="https://pippinbarr.github.io/chesses/">Chesses</a></div>
    </div>
}