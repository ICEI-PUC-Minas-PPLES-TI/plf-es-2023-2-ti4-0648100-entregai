import { getUser } from "@/libs/service/userService"
import { User } from "@/libs/types/User"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query

    try {

        const userData: User = await getUser(id as string)

        return res.status(200).json(userData)

    } catch (err: any) {

        return res.status(500).json({ message: err.message })

    }
}