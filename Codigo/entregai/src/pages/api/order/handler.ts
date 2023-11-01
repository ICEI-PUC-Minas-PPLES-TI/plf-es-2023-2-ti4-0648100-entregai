import { registerOrder } from "@/libs/service/orderService"
import { Address } from "@/libs/types/Address"
import { Buyer } from "@/libs/types/Buyer"
import { Order } from "@/libs/types/Order"
import { randomUUID } from "crypto"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const { name, phone, cep, street, neighborhood, number, complement, paymentMethod, frete, subtotal, selectedSupermarketId, selectedItems } = req.body

        const address: Address = {
            cep,
            street,
            neighborhood,
            number,
            complement
        }

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

            return res.status(200).json({ trackingCode: order.id })

        } catch (err) {

            return res.status(400).json({})
        }
    }
}