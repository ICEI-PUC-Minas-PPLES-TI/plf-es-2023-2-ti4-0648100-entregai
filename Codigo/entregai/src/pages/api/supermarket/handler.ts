import { deleteSupermarket, registerSupermarket } from "@/libs/firebase/supermarketHandler"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
    
        const { name, address, phone, cnpj } = req.body

        try {

            await registerSupermarket(name, address, phone, cnpj)

            return res.status(200).json({})

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }
    }

    if (req.method === 'DELETE') {
        
        const { supermarketId } = req.query

        try {

            await deleteSupermarket(supermarketId as string)

            return res.status(200).json({})

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }

    }
}