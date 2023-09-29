'use client'

import SupermarketCreator from "./modules/SupermarketRegistration"
import { useEffect, useState } from "react"
import axios from "axios"
import SupermarketViewer from "./modules/SupermarketViewer"
import { useUserData } from "../../context/UserDataContext"

const SupermarketManagement = () => {

    const [ supermarkets, setSupermarkets ] = useState([])
    const userData = useUserData()

    const fetchSupermarkets = () => {
        axios.get('/main/supermarket/api')
            .then((response) => {
                setSupermarkets(response.data.supermarkets)
            }
        )
    }

    useEffect(() => {
        fetchSupermarkets()
    }, [])

    return (
			<div>
                {userData.permissionLevel && <SupermarketCreator updateSupermarkets={fetchSupermarkets} />}

				<SupermarketViewer supermarketsArray={supermarkets} />
			</div>
		);
}

export default SupermarketManagement