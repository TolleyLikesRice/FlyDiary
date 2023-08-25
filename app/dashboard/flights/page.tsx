'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { addFlight, Database } from '@/lib/db'

import FlightTable from './FlightTable'

export default function FlightsPage() {
    const [db, setDb] = useState(null);

    function databaseCallback(database: any) {
        setDb(database);
    }

    if (!db) return (<Database userID={14} dbUrl={'http://10.0.2.2:5984'} databaseCallback={databaseCallback} />) // TODO: Make UserID dynamic, and dbUrl configurable, and Database component show loading state

    return (
        <div>
            <h1>Flights</h1>
            <Button onClick={() => addFlight({
                id: new Date().getTime().toString(),
                origin: 'EGKB',
                destination: 'EGKB'
            })}>Click me</Button>
            <FlightTable db={db} />
        </div>
    )
}