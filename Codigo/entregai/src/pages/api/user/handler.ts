import { deleteUser, registerUser, updateUser } from "@/libs/firebase/userHandler";
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if (req.method === 'POST') {
    
        const { email, password, name, permissionLevel, selectedSupermarkets } = req.body

        try {

            await registerUser(email, password, name, permissionLevel, selectedSupermarkets);

            return res.status(200).json({})

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }

    }

    if (req.method === 'DELETE') {
            
        const { userId } = req.query

        try {

            await deleteUser(userId as string)

            return res.status(200).json({})

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }
    }

    if (req.method === 'PATCH') {
            
        const { id, email, password, name, permissionLevel, selectedSupermarkets } = req.body

        try {

            await updateUser(id, email, password, name, permissionLevel, selectedSupermarkets)

            return res.status(200).json({})

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }
    }
}