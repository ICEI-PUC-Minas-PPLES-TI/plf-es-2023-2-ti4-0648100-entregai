import { auth } from "@/lib/firebase/firebase-config";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BackdropScreen from "../misc/BackdropScreen";
import { User } from "../../types/User";

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {

	const [ userData, setUserData ] = useState<User>(null!);
	const [ authUser ] = useAuthState(auth);

	useEffect(() => {

		const getUserData = async () => {
			const response = await fetch(`/main/user/api?userId=${authUser?.uid}`)

			const { user } = await response.json()
	
			setUserData(user)
		}

		getUserData()

	}, [ authUser?.uid ])

	return (
        <UserDataContext.Provider value={ userData }>
            { userData === null ? <BackdropScreen /> : children }
        </UserDataContext.Provider>
    )
};

const UserDataContext = createContext<User>(null!);

export const useUserData = () => useContext(UserDataContext);
