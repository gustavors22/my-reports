import { NextApiRequest, NextApiResponse } from 'next'
import UserRepository from '../../../modules/user/repositories/UserRepository'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   if (req.method === 'POST') {
      const { email, phone, password } = req.body

      const createdUser = await UserRepository.create({ email, phone, password })

      res.status(200).json(createdUser)
   }

   if (req.method === 'GET') {
      const users = await UserRepository.findAll()

      res.status(200).json(users)
   }

   res.status(405).json({ message: 'Method Not Allowed' })
}