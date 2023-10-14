import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {

        const { name, phone, address, selectedSupermarketId, selectedItemsId } = req.body

        console.log(name, phone, address, selectedSupermarketId, selectedItemsId);
        

    }
}