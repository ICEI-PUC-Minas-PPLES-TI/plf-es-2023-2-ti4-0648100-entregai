'use client'

import { useUserData } from "@/components/context/UserDataContext";

export default function Page() {

    const { authUser } = useUserData();

    return (
        <div>
            <h1>Olá {authUser.name}</h1>
            <h1>Permission: {authUser.permission ? "Yes" : "No"}</h1>
        </div>
    );
}