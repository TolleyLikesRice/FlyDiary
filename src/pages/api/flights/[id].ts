import { NextApiRequest, NextApiResponse } from 'next'

import Flight from '@/models/public/Flights'
import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const user = { id: 'eecb9daf-f380-4947-956c-7ff7fc9533db' } // Until auth is implemented

    switch (req.method) {
        case 'GET':
            let data: Flight;

            if (req.query.keys) {
                const q = await query(`SELECT ${req.query.keys} FROM flights WHERE owner = '${user.id}' AND id = '${req.query.id}'`)
                data = q.rows[0];
            } else {
                const q = await query(`SELECT * FROM flights WHERE owner = '${user.id}' AND id = '${req.query.id}'`)
                data = q.rows[0];
            }

            if (!data) return res.status(404).end()
            res.status(200).json(data)

            break
        case 'POST':
            res.status(501).end()
            break
        default:
            res.status(405).end() // Method Not Allowed
            break
    }
}