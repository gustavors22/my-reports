import { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../pages/api/auth/[...nextauth]"

class GetSessionService {
    async handler(req: NextApiRequest, res: NextApiResponse) {
        const session = await getServerSession(req, res, authOptions)
        
        return session || null
    }
}

export default new GetSessionService()