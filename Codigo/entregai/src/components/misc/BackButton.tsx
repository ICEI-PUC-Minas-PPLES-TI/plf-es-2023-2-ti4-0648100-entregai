import { IconButton } from "@mui/material"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation";

const BackButton = () => {

    const router = useRouter()
    
    function handleClick() {
        router.back()
    }

    return (
        <IconButton onClick={handleClick}>
            <ArrowBackIcon />
        </IconButton>
    )
}

export default BackButton