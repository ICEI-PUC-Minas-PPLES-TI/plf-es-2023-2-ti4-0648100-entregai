import { Button, styled } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "@/libs/firebase/firebase-config";
import { Supermarket } from "@/libs/types/Supermarket";
import { getSupermarketById, getSupermarketImageUrl } from "@/libs/service/supermarketService";
import { toast } from "react-toastify";
import toastConfig from "@/libs/toast/toastConfig";

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

const ImageUpload = ({ supermarket, setSupermarketDetails }: { supermarket: Supermarket, setSupermarketDetails: Function }) => {

    async function uploadImage(image: File | undefined) {

        if (image !== undefined) {

            const imageRef = ref(storage, `images/${supermarket.id}`)

            toast.promise(
                async () => {
                    return await uploadBytes(imageRef, image).then(async () => {
                
                        const updatedSupermarket: Supermarket = await getSupermarketById(supermarket.id)
        
                        updatedSupermarket.imageUrl = await getSupermarketImageUrl(supermarket.id)
    
                        setSupermarketDetails(updatedSupermarket)
                    })
                },
                {
                    pending: "Carregando imagem...",
                    success: "Imagem carregada com sucesso!",
                    error: "Erro ao carregar imagem"
                },
                toastConfig
            )
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