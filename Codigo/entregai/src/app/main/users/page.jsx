import ProtectedPageContext from "@/components/context/ProtectedPageContext";
import UserPage from "@/components/users/UserPage";

export default function Page() {
    return (
        <ProtectedPageContext>
            <UserPage />
        </ProtectedPageContext>
    )
}