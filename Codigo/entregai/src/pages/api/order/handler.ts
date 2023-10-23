import { registerOrder } from "@/libs/service/orderService"
import { Buyer } from "@/libs/types/Buyer"
import { Order } from "@/libs/types/Order"
import { Product } from "@/libs/types/Product"
import { randomUUID } from "crypto"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const { name, phone, address, paymentMethod, frete, subtotal, selectedSupermarketId, selectedItems } = req.body

        const order: Order = {
            id: randomUUID(),
            date: new Date().toLocaleString(),
            items: selectedItems, 
            paymentMethod,
            shipping: frete,
            subtotal,
            status: 0,
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