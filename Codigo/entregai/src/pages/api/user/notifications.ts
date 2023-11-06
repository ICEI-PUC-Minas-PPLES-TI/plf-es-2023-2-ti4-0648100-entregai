import { getNotifications, getUser } from "@/libs/service/userService"
import { User } from "@/libs/types/User"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const { uid } = req.query

    try {

        const notifications = await getNotifications(uid as string)

        return res.status(200).json({ notifications })

    } catch (err: any) {

        return res.status(500).json({ message: err.message })

    }
}