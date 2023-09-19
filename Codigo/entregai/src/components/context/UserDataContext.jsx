'use client'

import { auth, db } from "@/lib/firebase/firebase-config";
import { CircularProgress } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {

    const [userData, setUserData] = useState(null);
    const [authUser] = useAuthState(auth);

    useEffect(() => {

        const fetchUserData = async () => {

            const userRef = doc(db, "users", authUser.uid);

            const docSnap = await getDoc(userRef);

            if (docSnap.exists()) {

                const resultData = docSnap.data()
                
                setUserData(resultData);

            }
        }

        fetchUserData();

    }, [authUser]);

    return (
        <UserDataContext.Provider value={{ userData }}>
            {userData == null ? <CircularProgress /> : children}
        </UserDataContext.Provider>
    )
}

export const useUserData = () => useContext(UserDataContext);