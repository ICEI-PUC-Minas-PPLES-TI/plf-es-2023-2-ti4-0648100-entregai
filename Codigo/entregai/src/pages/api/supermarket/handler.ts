import { deleteSupermarket, getAllSupermarkets, registerSupermarket, updateSupermarket } from "@/libs/service/supermarketService"
import { Supermarket } from "@/libs/types/Supermarket"
import { randomUUID } from "crypto"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
    
        const { name, address, phone, cnpj, pricePerKm } = req.body

        try {

            const id = randomUUID()

            await registerSupermarket(id, name, address, phone, cnpj, pricePerKm)

            const supermarkets: Supermarket[] = await getAllSupermarkets()

            return res.status(200).json({ supermarkets })

        } catch (err: any) {

            console.log(err);

            return res.status(500).json({ message: err.message })
        }
    }

    if (req.method === 'PATCH') {
        
        const { supermarketId } = req.query

        const { name, address, phone, cnpj, pricePerKm } = req.body

        try {

            const supermarket: Supermarket = {
                id: supermarketId as string,
                cnpj,
                name,
                address,
                phone,
                pricePerKm,
            }

            const updatedSupermarket: Supermarket = await updateSupermarket(supermarket)

            res.status(200).json({ updatedSupermarket })

        } catch (err: any) {

        }

    }

    if (req.method === 'DELETE') {
        
        const { supermarketId } = req.query

        try {

            await deleteSupermarket(supermarketId as string)

            const supermarkets: Supermarket[] = await getAllSupermarkets()

            return res.status(200).json({ supermarkets })

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }

    }
}