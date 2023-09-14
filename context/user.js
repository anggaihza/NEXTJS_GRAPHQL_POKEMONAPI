import { createContext, useContext, useState } from "react"

export const InitialUserState = {
    email: null,
    uid: null
}

const userContext = createContext()

export const useUser = () => {
    return useContext(userContext)
}

export const UserProvider = (props) => {
    const [userState, setUserState] = useState(InitialUserState)

    console.log({ useState });

    const SetUser = (userCredential) => {
        setUserState({ ...userCredential })
    }

    const ResetUser = () => {
        setUserState(InitialUserState)
    }
    const value = { ...userState, SetUser, ResetUser }
    return <userContext.Provider value={value} {...props} />
}