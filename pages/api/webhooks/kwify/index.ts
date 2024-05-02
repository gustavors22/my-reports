import { NextApiRequest, NextApiResponse } from 'next';
import subscribers from './subscribers.json';

const TAGS = {
    pix_created: 'PIX_GERADO',
    refused: 'CARTAO_RECUSADO',
    cart_abandoned: 'CARRINHO_ABANDONADO',
    paid: 'COMPRA_APROVADA',
    order_approved: 'COMPRA_APROVADA'
}

const TAGS_FOR_REMOVE = {
    pix_created: 'PIX_GERADO',
    refused: 'CARTAO_RECUSADO',
    cart_abandoned: 'CARRINHO_ABANDONADO',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body

    console.log('Webhook kwify', data);

    const webhookEvent = data.webhook_event_type
    const { first_name, full_name, email, mobile } = data.Customer

    console.log('Customer:', { first_name, full_name, email, mobile });
    console.log('Webhook event:', webhookEvent);
    
    const manychatSubscriberInfo = {
        "first_name": first_name,
        "last_name": full_name,
        "phone": mobile,
        "whatsapp_phone": mobile,
        "email": email,
        "has_opt_in_sms": true,
        "has_opt_in_email": true,
        "consent_phrase": "string"
    }

    const manyChatToken = '1283798:895c62ccf819a43599d91acac7e39511'

    const isSubscriberExists = subscribers.data.filter(subscriber => subscriber.phone === mobile)[0]

    console.log('isSubscriberExists:', isSubscriberExists)
    
    if (isSubscriberExists) {
        if (TAGS[webhookEvent as keyof typeof TAGS] !== 'COMPRA_APROVADA') {
            return res.status(200).json({ message: 'OK' })
        }

        console.log('Subscriber already exists ', isSubscriberExists);

        const removeTagResponse = await fetch('https://api.manychat.com/fb/subscriber/removeTagByName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${manyChatToken}`
            },
            body: JSON.stringify({
                subscriber_id: isSubscriberExists.id,
                tag_name: TAGS_FOR_REMOVE[webhookEvent as keyof typeof TAGS_FOR_REMOVE]
            })
        })

        if (removeTagResponse.status !== 200) {
            console.error('ManyChat remove tag error:', removeTagResponse.statusText);
            res.status(500).json({ message: 'Internal Server Error' })
        }

        const addTagResponse = await fetch('https://api.manychat.com/fb/subscriber/addTagByName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${manyChatToken}`
            },
            body: JSON.stringify({
                subscriber_id: isSubscriberExists.id,
                tag_name: 'COMPRA_APROVADA'
            })
        })

        if (addTagResponse.status !== 200) {
            console.error('ManyChat add tag error:', addTagResponse.statusText);
            res.status(500).json({ message: 'Internal Server Error' })
        }

        console.log('ManyChat response:', addTagResponse.status);
        console.log('ManyChat response:', await addTagResponse.json());

    } else {
        const response = await fetch('https://api.manychat.com/fb/subscriber/createSubscriber', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${manyChatToken}`
            },
            body: JSON.stringify(manychatSubscriberInfo)
        })

        const createSubscriberResponse = await response.json()
        const createdSubscriber = createSubscriberResponse.data

        if (response.status !== 200) {
            console.error('ManyChat error:', response.statusText);
            res.status(500).json({ message: 'Internal Server Error' })
        }

        console.log('ManyChat response:', response.status);
        console.log('ManyChat response:', createdSubscriber);

        //add subscriber into ./subscribers.json
        (subscribers.data as { id: string, phone: string }[])
            .push({ id: createdSubscriber.id as string, phone: createdSubscriber.whatsapp_phone as string });

        //save subscribers into ./subscribers.json
        const fs = require('fs');
        fs.writeFileSync('./pages/api/webhooks/kwify/subscribers.json', JSON.stringify(subscribers));

        console.log('Subscribers:', subscribers);

        const addTagResponse = await fetch('https://api.manychat.com/fb/subscriber/addTagByName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${manyChatToken}`
            },
            body: JSON.stringify({
                subscriber_id: createdSubscriber.id,
                tag_name: TAGS[webhookEvent as keyof typeof TAGS]
            }),
        })

        if (addTagResponse.status !== 200) {
            console.error('ManyChat error:', addTagResponse.statusText);
            res.status(500).json({ message: 'Internal Server Error' })
        }

        console.log('ManyChat response:', addTagResponse.status);
        console.log('ManyChat response:', await addTagResponse.json());
    }
    
    res.status(200).json({ message: 'OK' })
}