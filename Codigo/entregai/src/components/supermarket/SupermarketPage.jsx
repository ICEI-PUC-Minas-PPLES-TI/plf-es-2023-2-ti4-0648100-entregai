'use client'

import SupermarketCreator from "./SupermarketRegistration"
import { useEffect, useState } from "react"
import axios from "axios"
import SupermarketViewer from "./SupermarketViewer"
import { useUserData } from "../context/UserDataContext"

const SupermarketPage = () => {

    const [ supermarkets, setSupermarkets ] = useState([])
    const { userData } = useUserData()

    const fetchSupermarkets = () => {
        axios.get('/main/supermarket/api')
            .then((response) => {
                setSupermarkets(response.data.supermarkets)
            })
    }

    useEffect(() => {
        fetchSupermarkets()
    }, [])

    return (
			<div>
                {userData.permissionLevel == 1 && <SupermarketCreator updateSupermarkets={fetchSupermarkets} />}

				<SupermarketViewer supermarketsArray={supermarkets} />
			</div>
		);
}

export default SupermarketPage