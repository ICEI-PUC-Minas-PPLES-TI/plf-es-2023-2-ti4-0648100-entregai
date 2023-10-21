import { deleteProductInStock, registerProductToStock, updateProductInStock } from "@/libs/service/productService"
import { getSupermarketById } from "@/libs/service/supermarketService"
import { Product } from "@/libs/types/Product"
import { Supermarket } from "@/libs/types/Supermarket"
import { randomUUID } from "crypto"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
    
        const { supermarketId } = req.query

        const { name, price, stockQuantity } = req.body

        try {

            const product: Product = { name, price: parseFloat(price), stockQuantity, id: randomUUID(), soldQuantity: 0 }

            await registerProductToStock(supermarketId as string, product)

            const supermarket: Supermarket = await getSupermarketById(supermarketId as string)

            return res.status(200).json({ supermarket })

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }
    }

    if (req.method === 'PATCH') {
    
        const { supermarketId, productId } = req.query

        const { name, price, stockQuantity, soldQuantity } = req.body

        try {

            const product: Product = { name, price: parseFloat(price), stockQuantity, soldQuantity, id: productId as string }

            await updateProductInStock(supermarketId as string, product)

            const supermarket: Supermarket = await getSupermarketById(supermarketId as string)

            return res.status(200).json({ supermarket })

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }
    }

    if (req.method === 'DELETE') {
        
        const { supermarketId, productId } = req.query

        try {

            await deleteProductInStock(supermarketId as string, productId as string)

            const supermarket: Supermarket = await getSupermarketById(supermarketId as string)

            return res.status(200).json({ supermarket })

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }
    }
}