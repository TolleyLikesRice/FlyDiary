import FlightTable from '@/app/dashboard/flights/FlightTable'
import RootLayout from '@/app/layout'
import DatabaseProvider from '@/components/databaseProvider'

import FlightTableSkeleton from './FlightTableSkeleton'

export default function DashboardPage() {
    return (
        <RootLayout>
            <h1>this is a navbar wow</h1>
            <div className='container mx-auto md:p-8 lg:p-16'>
                <DatabaseProvider loadingSkeleton={<FlightTableSkeleton />} Element={FlightTable} />
            </div>
        </RootLayout>
    )
}