import React from "react"

interface SidesProps {
    children: React.ReactNode
    active: {left?: boolean, right?: boolean, bottom?: boolean, top?: boolean}
    names: {left?: string, right?: string, bottom?: string, top?: string}
}

const borderStyle = "solid 0.25em #ffff00"

export const Sides = ({children, active, names}: SidesProps) => {
    return <div style={{
        borderTop: active.top ? borderStyle : undefined,
        borderBottom: active.bottom ? borderStyle : undefined,
        borderLeft: active.left ? borderStyle : undefined,
        borderRight: active.right ? borderStyle : undefined
    }}>
        {children}
    </div>
}