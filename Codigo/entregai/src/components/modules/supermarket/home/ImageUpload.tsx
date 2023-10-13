import { Button, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/libs/firebase/firebase-config";
import { useRouter } from "next/navigation";
import { Supermarket } from "@/libs/types/Supermarket";

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const ImageUpload = ({ supermarket }: { supermarket: Supermarket }) => {

    const router = useRouter()

    function uploadImage(image: File | undefined) {
        if (image !== undefined) {
            const imageRef = ref(storage, `images/${supermarket.id}`)
            uploadBytes(imageRef, image).then(() => {
                router.refresh()
            })
        }
    }

    return (
        <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Carregar Imagem
            <VisuallyHiddenInput onChange={(event) => {
                const image: File | undefined = event.target.files?.[0]
                uploadImage(image) 
            }} type="file" />
        </Button>
    )
}

export default ImageUpload