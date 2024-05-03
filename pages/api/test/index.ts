import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../modules/config/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const subscriberBody = {
        manychatId: '1234567890',
        phone: '1234567890',
    }

    try {
        const subscriber = await prisma.subscriber.create({
            data: subscriberBody
        })

        return res.status(200).json(subscriber)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: 'Internal Server Error', error })
    }

}