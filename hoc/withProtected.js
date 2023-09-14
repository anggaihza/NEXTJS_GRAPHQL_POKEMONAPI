import { useUser } from '@/context/user'
import { useRouter } from 'next/router'
import React from 'react'

const withProtected = (Pages) => {
    return (props) => {
        const router = useRouter()
        const user = useUser()
        const { uid } = user

        console.log({ uid });

        if (!uid) {
            router.replace("/auth/login")
            return <></>
        }

        return <Pages {...props} />
    }
}

export default withProtected