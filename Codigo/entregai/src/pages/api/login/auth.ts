import { getAuth } from "firebase-admin/auth"
import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { token } = req.body

    if (req.method === 'PATCH') {

        try {

            return getAuth()
                .verifySessionCookie(token)
                .then((decodedClaims) => {
                    getAuth().revokeRefreshTokens(decodedClaims.sub)
                })
                .then(() => {
                    return res.status(200).json({})
                })

        } catch (err: any) {

            return res.status(401).json({ error: err.message })

        }    
    }

    if (req.method === 'POST') {

        // 5 dias
        const expiresIn = 60 * 60 * 24 * 5 * 1000

        try {

            return getAuth()
                .createSessionCookie(token, { expiresIn })
                .then(async (sessionCookie) => {
                    return res.status(200).json({ sessionCookie })
                })

        } catch (err: any) {

            return res.status(401).json({ error: err.message })

        }
    }
}