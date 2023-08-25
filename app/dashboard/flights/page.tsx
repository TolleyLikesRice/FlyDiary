'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { addFlight, Database } from '@/lib/db'

import FlightTable from './FlightTable'

export default function FlightsPage() {
    const [db, setDb] = useState(null);

    function databaseCallback(database: any) {
        setDb(database);
        console.log("Database loaded");
    }

    if (!db) return (<Database userID={16} dbUrl={'http://10.0.2.2:5984'} databaseCallback={databaseCallback} />) // TODO: Make UserID dynamic, and dbUrl configurable, and Database component show loading state

    return (
        <div className='container mx-auto md:p-8 lg:p-16'>
            <FlightTable db={db} />
        </div>
    )
}