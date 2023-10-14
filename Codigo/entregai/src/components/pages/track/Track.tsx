import BackButton from "@/components/misc/BackButton"
import Tracker from "@/components/modules/track/Tracker"

const Tracking = () => {
    return (
        <div>
            <BackButton />

            <h1>Acompanhar Encomenda</h1>
        
            <p>Por favor, digite o código do seu pedido</p>

            <Tracker />
        </div>
    )
}

export default Tracking