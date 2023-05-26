import { NextApiRequest, NextApiResponse } from 'next'

import { query } from '@/utils/db'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const user = { id: 'eecb9daf-f380-4947-956c-7ff7fc9533db' } // Until auth is implemented

    switch (req.method) {
        case 'GET':
            const stats = {
                total_flights: parseInt((await query(`SELECT COUNT(*) FROM flights WHERE owner = '${user.id}'`)).rows[0].count),
                day_to: parseInt((await query(`SELECT SUM(day_to) FROM flights WHERE owner = '${user.id}'`)).rows[0].sum),
                day_ldg: parseInt((await query(`SELECT SUM(day_ldg) FROM flights WHERE owner = '${user.id}'`)).rows[0].sum),
                night_to: parseInt((await query(`SELECT SUM(night_to) FROM flights WHERE owner = '${user.id}'`)).rows[0].sum),
                night_ldg: parseInt((await query(`SELECT SUM(night_ldg) FROM flights WHERE owner = '${user.id}'`)).rows[0].sum),
            } 

            res.status(200).json(stats)

            break
        case 'POST':
            res.status(501).end()
            break
        default:
            res.status(405).end() // Method Not Allowed
            break
    }
}