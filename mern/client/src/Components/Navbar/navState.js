import React from "react";

export const NavStateContext = React.createContext()

export default function NavState({ children }) {
    // const NavStateContext = React.createContext()
    const [navState, setNavState] = React.useState(false)


    return (
        <NavStateContext.Provider value={[navState, setNavState]}>
        { children }
        </NavStateContext.Provider>
    );

}
