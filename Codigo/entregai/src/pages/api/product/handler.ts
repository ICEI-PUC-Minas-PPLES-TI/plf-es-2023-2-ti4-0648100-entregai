import { registerProductToStock } from "@/libs/firebase/supermarketHandler"
import { Product } from "@/libs/types/Product"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
    
        const { supermarketId } = req.query

        const { name, price, stockQuantity } = req.body

        try {

            await registerProductToStock(supermarketId as string, { name, price, stockQuantity} as Product)

            return res.status(200).json({})

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }
    }
}