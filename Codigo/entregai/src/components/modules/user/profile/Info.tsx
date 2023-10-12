import { useAuth } from "@/components/context/UserContext"

const Info = () => {

    const { user } = useAuth()

    return (
        <div>
            <h1>Olá {user.name}</h1>
            <h1>Email: {user.email}</h1>
            <h1>Permission: {user.permissionLevel ? "Yes" : "No"}</h1>
        </div>
    )
}

export default Info