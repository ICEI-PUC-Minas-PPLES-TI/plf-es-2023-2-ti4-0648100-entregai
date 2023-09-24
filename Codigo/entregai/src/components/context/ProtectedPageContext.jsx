'use client'

import { useRouter } from "next/navigation"
import { useUserData } from "./UserDataContext"
import { useEffect } from "react"

const ProtectedRouteContext = ({ children }) => {

    const { userData } = useUserData()
    const { back } = useRouter()

    useEffect(() => {
        if (userData.permission == 0) {
            back()
        }
    }, [back, userData.permission])

    return (
        <div>{children}</div>
    )
}

export default ProtectedRouteContext