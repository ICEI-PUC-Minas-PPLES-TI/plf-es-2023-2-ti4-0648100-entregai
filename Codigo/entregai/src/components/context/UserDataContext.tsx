import { auth } from "@/lib/firebase/firebase-config";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import BackdropScreen from "../misc/BackdropScreen";
import axios from "axios";
import { User } from "../../types/User";

export const UserDataProvider = ({ children }: { children: React.ReactNode }) => {

	const [ userData, setUserData ] = useState<User>(null!);
	const [ authUser ] = useAuthState(auth);

	useEffect(() => {
		axios.get(`/main/users/api?userId=${authUser?.uid}`)
			.then((response) => {
				setUserData(response.data.user)
			})
	}, [ authUser?.uid ])

	return (
        <UserDataContext.Provider value={ userData }>
            { userData === null ? <BackdropScreen /> : children }
        </UserDataContext.Provider>
    )
};

const UserDataContext = createContext<User>(null!);

export const useUserData = () => useContext(UserDataContext);
