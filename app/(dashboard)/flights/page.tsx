import FlightTable from '@/app/(dashboard)/flights/FlightTable'
import DatabaseProvider from '@/components/databaseProvider'

import FlightTableSkeleton from './FlightTableSkeleton'

export default function FlightsPage() {
    return (
        <div className='container mx-auto md:p-8 lg:p-16 lg:py-8'>
            <h1 className='text-white text-3xl pb-6'>All Flights</h1>
            <DatabaseProvider loadingSkeleton={<FlightTableSkeleton />} Element={FlightTable} />
        </div>
    )
}