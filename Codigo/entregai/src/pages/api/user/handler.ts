import { deleteUser, registerUser, tryToCreateAdminUser, updateUser } from "@/libs/service/userService";
import { User } from "@/libs/types/User";
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

        const { userId } = req.query
            
        const { email, password, name, permissionLevel, selectedSupermarkets } = req.body

        try {

            const user: User = {
                id: userId as string,
                email,
                name,
                permissionLevel,
                selectedSupermarkets,
                password 
            }

            await updateUser(user)

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
}