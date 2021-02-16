import React from "react";

export const useForceUpdate = () => {
    const [value, setValue] = React.useState(false)
    return () => setValue(b => !b)
}