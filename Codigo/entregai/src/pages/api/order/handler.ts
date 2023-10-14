import { registerOrder } from "@/libs/handler/orderHandler"
import { Buyer } from "@/libs/types/Buyer"
import { Order } from "@/libs/types/Order"
import { Product } from "@/libs/types/Product"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const { name, phone, address, selectedSupermarketId, selectedItems } = req.body

        const order: Order = {
            products: selectedItems, 
            buyer: { name, phone, address } as Buyer 
        }

        try {

            await registerOrder(order, selectedSupermarketId)

            return res.status(200).json({})

        } catch (err) {

            return res.status(400).json({})
        }
    }
}