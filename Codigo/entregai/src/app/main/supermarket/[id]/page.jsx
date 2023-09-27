'use client'

import axios from "axios"
import { useEffect, useState } from "react"

export default function Page({ params }) {

    const [ supermarket, setSupermarket ] = useState({})

    useEffect(() => {
        
        const fetchSupermarket = () => {
            axios.get(`/main/supermarket/${params.id}/api?supermarketId=${params.id}`)
                .then((response) => {
                    setSupermarket(response.data.supermarket);
                }
            )
        }

        fetchSupermarket()

    }, [params.id])

    return (
        <main>
            Nome do Supermercado: {supermarket.name}
        </main>
    )
}


