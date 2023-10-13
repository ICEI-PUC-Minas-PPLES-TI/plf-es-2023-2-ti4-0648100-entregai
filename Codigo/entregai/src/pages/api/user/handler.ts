import { deleteUser, registerUser, tryToCreateAdminUser, updateUser } from "@/libs/handler/userHandler";
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

    if (req.method === 'PUT') {
        
        const { email, password } = req.query

        try {

            await tryToCreateAdminUser(email as string, password as string)

            return res.status(200).json({})

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }
    }

    if (req.method === 'PATCH') {

        const { userId } = req.query
            
        const { email, password, name, permissionLevel, selectedSupermarkets } = req.body

        try {

            await updateUser(userId as string, email, password, name, permissionLevel, selectedSupermarkets)

            return res.status(200).json({})

        } catch (err: any) {

            return res.status(500).json({ message: err.message })
        }
    }
}