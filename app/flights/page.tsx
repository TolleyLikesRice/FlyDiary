import FlightTable from '@/app/flights/FlightTable'
import RootLayout from '@/app/layout'
import NavBar from '@/components/complex-ui/navbar'
import DatabaseProvider from '@/components/databaseProvider'

import FlightTableSkeleton from './FlightTableSkeleton'

export default function DashboardPage() {
    return (
        <RootLayout>
            <NavBar />
            <div className='container mx-auto md:p-8 lg:p-16'>
                <DatabaseProvider loadingSkeleton={<FlightTableSkeleton />} Element={FlightTable} />
            </div>
        </RootLayout>
    )
}