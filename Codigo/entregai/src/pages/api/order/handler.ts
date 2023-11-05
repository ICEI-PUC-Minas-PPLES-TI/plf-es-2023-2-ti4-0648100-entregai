import { updateOrder, registerOrder, getOrderById } from "@/libs/service/orderService"
import { updateProductQuantityInStock } from "@/libs/service/productService"
import { getSupermarketById } from "@/libs/service/supermarketService"
import { Address } from "@/libs/types/Address"
import { Buyer } from "@/libs/types/Buyer"
import { Order } from "@/libs/types/Order"
import { Supermarket } from "@/libs/types/Supermarket"
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

    if (req.method === 'PATCH') {

        const supermarketId = req.query.supermarketId

        const orderId = req.query.orderId

        const updateCode = req.query.updateCode

        try {
                
            await updateOrder(orderId as string, supermarketId as string, parseInt(updateCode as string) as Order["status"])

            const order: Order = await getOrderById(supermarketId as string, orderId as string) 

            if (parseInt(updateCode as string) === 1) {
                for (const item of order.items) {
                    await updateProductQuantityInStock(supermarketId as string, item.productId, item.quantity, 1)
                }
            } else if (parseInt(updateCode as string) === 5 || parseInt(updateCode as string) === 6) {
                for (const item of order.items) {
                    await updateProductQuantityInStock(supermarketId as string, item.productId, item.quantity, 2)
                }
            }

            const supermarket: Supermarket = await getSupermarketById(supermarketId as string)

            return res.status(200).json({ supermarket })

        } catch (err) {
                
            return res.status(400).json({})
        }
    }
}