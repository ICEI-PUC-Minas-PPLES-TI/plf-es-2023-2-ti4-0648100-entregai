import { auth } from "@/libs/firebase/firebase-config";
import { User } from "@/libs/types/User";
import { createContext, useContext, useEffect, useState } from "react";
import CustomBackdrop from "../misc/CustomBackdrop";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

type UserContextType = {
    user: User,
    loading: boolean,
    fetchData: Function
}

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {

    const [ user, setUser ] = useState<User>({} as User)
    const [ loading, setLoading ] = useState<boolean>(true)

    async function fetchData(id: string) {

        setLoading(true)

        const res = await axios.get(`/api/user/${id}`)

        const userData = res.data

        setUser({...userData})

        setLoading(false)
    }

    useEffect(() => {

        const fetchUser = onAuthStateChanged(auth, async (user) => {

            if (user?.uid) {

                await fetchData(user.uid)

            } else {

                setUser({} as User)
            }
        })

        setLoading(false)

        return () => fetchUser()

    }, [])

    return (
        <UserContext.Provider value={{ user, loading, fetchData }}>
            { loading ? <CustomBackdrop /> : children }
        </UserContext.Provider>
    )
}

const UserContext = createContext({} as UserContextType)

export const useAuth = () => useContext<UserContextType>(UserContext)