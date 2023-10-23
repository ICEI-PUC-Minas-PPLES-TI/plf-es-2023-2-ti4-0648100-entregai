import { getSupermarketById } from "@/libs/service/supermarketService";
import { Supermarket } from "@/libs/types/Supermarket";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        const { selectedSupermarketId, address } = req.body

        const supermarket: Supermarket = await getSupermarketById(selectedSupermarketId)

        var distance = 0

        try {

            await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${supermarket.address}&origins=${address}&units=metric&key=${process.env.GOOGLE_MAPS_API_KEY}`)
                .then((response) => {
                    distance = response.data.rows[0].elements[0].distance.value
            })

            return res.status(200).json({ distance })

        } catch (err) {

            res.status(400).json({})

        }
    }
}