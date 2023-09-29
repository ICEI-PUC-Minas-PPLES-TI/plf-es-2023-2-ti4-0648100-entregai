'use client'

import { useUserData } from "@/components/context/UserDataContext";
import UserInfo from "./modules/UserInfo";

const UserProfile = () => {

    const userData = useUserData();

    return (
        <div>
            <UserInfo userData={userData} />
        </div>
    )
}

export default UserProfile