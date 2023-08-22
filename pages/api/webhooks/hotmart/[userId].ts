import { NextApiRequest, NextApiResponse } from 'next'
import UserRepository from '../../../../modules/user/repositories/UserRepository'
import ExtractDataFromHotmartWebhookService from '../../../../modules/services/hotmart/ExtractDataFromHotmartWebhookService'
import CapturedEventRepository from '../../../../modules/capturedEvents/repositories/CapturedEventRepository'

// https://c6e7-187-44-14-168.ngrok-free.app/api/webhooks/hotmart/clixghk2j00000i7mftj5eyev

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { userId } = req.query

    if (req.method !== 'POST') {
        res.status(405).json({ message: 'Method Not Allowed' })
    }

    try {
        const user = await UserRepository.findById(userId as string)

        if(!user) {
            res.status(404).json({ message: 'Endpoint not found' })
        }
    
        const payload = req.body
    
        const data = ExtractDataFromHotmartWebhookService.handler(payload)
    
        const createdCapturedEvent = await CapturedEventRepository.create({
            userId: userId as string,
            platform: 'hotmart',
            event: JSON.stringify(data)
        })
    
        res.status(200).json({ message: 'OK', data: createdCapturedEvent })
        
    } catch (error) {
        console.warn('Error on webhook hotmart at: ', Date.now());
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' })
    }

}