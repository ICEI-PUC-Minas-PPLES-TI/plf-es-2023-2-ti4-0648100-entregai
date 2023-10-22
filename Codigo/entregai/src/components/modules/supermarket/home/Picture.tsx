import { Fade } from "@mui/material"
import Image from "next/image"

const Picture = ({ imageUrl }: { imageUrl: string }) => {
    
    return (
        <Fade in timeout={500}>
            <div>
                { imageUrl === '' ? null : <Image width={300} height={200} src={imageUrl} alt="" /> }
            </div>
        </Fade>
    )
}

export default Picture