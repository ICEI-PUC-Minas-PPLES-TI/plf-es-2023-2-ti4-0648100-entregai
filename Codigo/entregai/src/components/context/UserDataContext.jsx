'use client'

import { auth, db } from "@/firebase/firebase";
import { CircularProgress } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [user] = useAuthState(auth);

    useEffect(() => {

        const fetchUserData = async () => {

            const userRef = doc(db, "users", user.uid);

            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {

                const userData = docSnap.data()
                
                setAuthUser(userData);
            }
        }

        fetchUserData();

    }, [user]);

    return (
        <UserDataContext.Provider value={{ authUser }}>
            {authUser == null ? <CircularProgress /> : children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => useContext(UserDataContext);