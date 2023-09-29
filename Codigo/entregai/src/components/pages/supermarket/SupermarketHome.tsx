'use client'

import axios from "axios"
import { useEffect, useState } from "react"
import { Supermarket } from "../../../types/Supermarket"
import SupermarketInfo from "./modules/SupermarketInfo"

const SupermarketHome = ({ id }: { id: string }) => {

    const [ supermarket, setSupermarket ] = useState<Supermarket>({} as Supermarket)

    useEffect(() => {
        
        axios.get(`/main/supermarket/${id}/api?supermarketId=${id}`)
            .then((response) => {
                setSupermarket(response.data.supermarket);
            }
        )

    }, [id])

    return (
        <div>
            <SupermarketInfo supermarket={supermarket} />
        </div>
    )
}

export default SupermarketHome