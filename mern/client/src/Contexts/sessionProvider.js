import React from "react";

export const SessionContext = React.createContext()

export default function SessionProvider({ children }) {
    // nav state to show or hide session id/save/delete buttons
    const [navState, setNavState] = React.useState(false)
    const [sessionid, setSessionID] = React.useState("");


    return (
        <SessionContext.Provider value={[navState, setNavState, sessionid, setSessionID]}>
        { children }
        </SessionContext.Provider>
    );

}
