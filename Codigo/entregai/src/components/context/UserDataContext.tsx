import { auth } from "@/lib/firebase/firebase-config";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BackdropScreen from "../misc/BackdropScreen";
import { User } from "../../types/User";

interface IUserData {
	userData: User;
	fetchUserData: Function;
}

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {

	const [ userData, setUserData ] = useState<User>(null!);
	const [ authUser ] = useAuthState(auth);

	const fetchUserData = async () => {
		// Client side não precisa de URL
		const response = await fetch(`/main/user/api?userId=${authUser?.uid}`)

		const { user } = await response.json()

		setUserData(user)
	}

	useEffect(() => {

		fetchUserData()

	}, [ authUser?.uid ])

	return (
        <UserDataContext.Provider value={ {userData, fetchUserData} }>
            { userData === null ? <BackdropScreen /> : children }
        </UserDataContext.Provider>
    )
};

const UserDataContext = createContext<IUserData>(null!);

export const useUserData = () => useContext(UserDataContext);
