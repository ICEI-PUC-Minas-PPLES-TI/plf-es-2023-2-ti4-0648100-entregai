'use client'

import { useUserData } from "@/components/context/UserDataContext";
import SupermarketContainer from "./SupermarketContainer";
import { useEffect, useState } from "react"
import { Supermarket } from "@/types/Supermarket"
import axios from "axios"

const SupermarketViewer = () => {

    const [supermarkets, setSupermarkets] = useState<Supermarket[]>([])
    const {userData} = useUserData()

    useEffect(() => {

        async function fetchData() {
            const response = await axios.get('/main/supermarket/api/all')

            setSupermarkets(response.data.supermarkets.filter((supermarket: Supermarket) => {
                return userData.selectedSupermarkets.includes(supermarket.id)
            }));     
        }

        fetchData()

    }, []);

    return (
        <div>
            {supermarkets.map((supermarket) => (
                <SupermarketContainer key={supermarket.id} supermarket={supermarket} />
            ))}
        </div>
    );
}

export default SupermarketViewer