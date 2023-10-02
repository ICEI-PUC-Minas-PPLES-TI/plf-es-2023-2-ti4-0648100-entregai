'use client'

import { useEffect, useState } from "react"
import axios from "../../../../node_modules/axios/index"
import { Supermarket } from "../../../types/Supermarket"
import SupermarketDelete from "./modules/SupermarketDelete"
import SupermarketEdit from "./modules/SupermarketEdit"
import SupermarketInfo from "./modules/SupermarketInfo"

const SupermarketHome = ({ id }: { id: string }) => {

    const [ supermarket, setSupermarket ] = useState<Supermarket>({} as Supermarket)

    async function fetchSupermarkets() {
        const response = await axios.get(`/main/supermarket/api?supermarketId=${id}`);
        setSupermarket(response.data.supermarket);
    }

    useEffect(() => {

        fetchSupermarkets()
        
    }, [])

    return (
        <div>
            <SupermarketInfo supermarket={supermarket} />

            <SupermarketDelete supermarket={supermarket} updateSupermarkets={fetchSupermarkets} />

            <SupermarketEdit supermarket={supermarket} updateSupermarkets={fetchSupermarkets} />
        </div>
    )
}

export default SupermarketHome