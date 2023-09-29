import ProtectedPageContext from "@/components/context/ProtectedPageContext";
import UserManagement from "@/components/pages/user/UserManagement";

export default function Page() {
    return (
        <ProtectedPageContext>
            <UserManagement />
        </ProtectedPageContext>
    )
}