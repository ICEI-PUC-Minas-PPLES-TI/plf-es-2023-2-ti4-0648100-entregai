import { useRouter } from "next/router"
import { useAuth } from "./UserContext"
import { useEffect } from "react"

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {

    const { user } = useAuth()
    const router = useRouter()

    useEffect(() => {
        if (!user.permissionLevel) {
            router.replace('/app/supermarket')
        }
    }, [ router, user ])

    if (!user.permissionLevel) {
        return null
    }

    return (<div>{ children }</div>)
}

export default ProtectedRoute