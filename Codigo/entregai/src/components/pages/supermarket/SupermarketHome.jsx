'use client'

import axios from "axios"
import { useEffect, useState } from "react"

const SupermarketHome = ({ id }) => {

    const [ supermarket, setSupermarket ] = useState({})

    useEffect(() => {
        
        axios.get(`/main/supermarket/${id}/api?supermarketId=${id}`)
            .then((response) => {
                setSupermarket(response.data.supermarket);
            }
        )

    }, [id])

    return (
        <div>
            {supermarket.name}
        </div>
    )
}

export default SupermarketHome