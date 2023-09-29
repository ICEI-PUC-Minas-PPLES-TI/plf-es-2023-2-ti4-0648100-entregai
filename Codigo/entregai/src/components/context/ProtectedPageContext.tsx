'use client'

import { useRouter } from "next/navigation"
import { useUserData } from "./UserDataContext"
import { useEffect } from "react"

const ProtectedRouteContext = ({ children }: { children: React.ReactNode }) => {

    const userData = useUserData()
    const { back } = useRouter()

    useEffect(() => {
        if (!userData?.permissionLevel) {
            back()
        }
    }, [back, userData])

    return (
        <div>{children}</div>
    )
}

export default ProtectedRouteContext