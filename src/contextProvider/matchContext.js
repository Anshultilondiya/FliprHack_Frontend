import React, {createContext, useContext} from "react";

import {createMatchStore} from "../store/matchStore";

import {useLocalObservable} from "mobx-react"

const MatchContext = createContext(null)

export const MatchProvider = ({children}) =>{
    const matchStore = useLocalObservable(createMatchStore)

    return (
        <MatchContext.Provider value={matchStore}>
            {children}
        </MatchContext.Provider>
    )
}

export const useMatchStore = ()=> useContext(MatchContext)