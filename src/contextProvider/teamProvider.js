import React, {createContext, useContext} from "react";

import {createTeamStore} from "../store/teamStore";

import {useLocalObservable} from "mobx-react"

const TeamContext = createContext(null)

export const TeamProvider = ({children}) =>{
    const teamStore = useLocalObservable(createTeamStore)

    return (
        <TeamContext.Provider value={teamStore}>
            {children}
        </TeamContext.Provider>
    )
}

export const useTeamStore = ()=> useContext(TeamContext)