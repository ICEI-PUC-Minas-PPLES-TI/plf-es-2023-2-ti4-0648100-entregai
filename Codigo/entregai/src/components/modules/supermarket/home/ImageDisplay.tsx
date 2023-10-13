import Image from "next/image"

const ImageDisplay = ({ imageUrl }: { imageUrl: string }) => {
    
    return (
        <div>
            { imageUrl === '' ? null : <Image width={200} height={200} src={imageUrl} alt="" /> }
        </div>)
}

export default ImageDisplay