import AppLayout from "@/components/layout/AppLayout";
import UserProfile from "@/components/pages/user/UserProfile";
import { NextPageWithLayout } from "@/pages/_app";

const Profile: NextPageWithLayout = () => {

    return (
        <div>
            <UserProfile />
        </div>
    )
}

Profile.getLayout = function getLayout(page) {
    return (
        <AppLayout>
            {page}
        </AppLayout>
    )
}

export default Profile