import { NextApiRequest, NextApiResponse } from 'next'
import CapturedEventRepository from '../../../modules/capturedEvents/repositories/CapturedEventRepository'

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 
    if (req.method !== 'GET') {
        res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const { userId, platform } = req.body

        const capturedEvents = await CapturedEventRepository.findByUserIdAndPlatform(
            userId as string,
            platform as string
        )

        res.status(200).json({ message: 'OK', data: capturedEvents })
        
    } catch (error) {
        console.warn('Error on webhook hotmart at: ', Date.now());
        console.log(error);

        res.status(500).json({ message: 'Internal Server Error' })
    }
}