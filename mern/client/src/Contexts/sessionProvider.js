import React from "react";

export const SessionContext = React.createContext()

export default function SessionProvider({ children }) {
    // nav state to show or hide session id/save/delete buttons
    const [navState, setNavState] = React.useState(false)


    return (
        <SessionContext.Provider value={[navState, setNavState]}>
        { children }
        </SessionContext.Provider>
    );

}
