import React, {createContext, useContext} from "react";

import {createUserStore} from "../store/userStore";

import {useLocalObservable} from "mobx-react"

const UserContext = createContext(null)

export const UserProvider = ({children}) =>{
    const userStore = useLocalObservable(createUserStore)

    return (
        <UserContext.Provider value={userStore}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserStore = ()=> useContext(UserContext)