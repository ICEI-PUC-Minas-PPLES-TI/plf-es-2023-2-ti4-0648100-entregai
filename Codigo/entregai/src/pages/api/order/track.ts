import { trackOrder } from "@/libs/service/orderService";
import { getSupermarketById } from "@/libs/service/supermarketService";
import { Supermarket } from "@/libs/types/Supermarket";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        var { orderCode } = req.body
        
        try {

            const [ supermarket, order ] = await trackOrder(orderCode)

            return res.status(200).json({ supermarket, order })

        } catch (err) {

            res.status(400).json({})

        }
    }
}