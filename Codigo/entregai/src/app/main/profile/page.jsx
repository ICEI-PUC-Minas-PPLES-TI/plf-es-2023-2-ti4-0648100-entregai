'use client'

import { useUserData } from "@/components/context/UserDataContext";

export default function Page() {

    const { userData } = useUserData();

    return (
        <div>
            <h1>Olá {userData.name}</h1>
            <h1>Permission: {userData.permission ? "Yes" : "No"}</h1>
        </div>
    );
}