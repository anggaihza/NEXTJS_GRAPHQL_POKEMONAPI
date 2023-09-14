import { Authentication } from "@/services/firebase";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress"
import { InitialUserState, useUser } from "./user";

const AuthStateChangeProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const user = useUser()
    const { SetUser } = user

    const InisiateAuthStateChange = () => {
        Authentication().onAuthStateChanged((user) => {
            if (user) {
                console.log("User authenticated");
                SetUser({ email: user.email, uid: user.uid })
            } else {
                SetUser(InitialUserState)
                console.log("User not authenticated");
            }
            setIsLoading(false)
        })
    }

    useEffect(() => {
        InisiateAuthStateChange()
    }, [])

    if (isLoading) {
        return <CircularProgress />
    }

    return children
}

export default AuthStateChangeProvider