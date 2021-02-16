import "./Spinner.css"
import React from "react"

export const Spinner = ({small}: {small?: boolean}) => {
    const size = small ? "2.5em" : "5em"
    return <div className="spinner-centering">
        <div className="spinner" style={{width: size, height: size}}/>
    </div>
}