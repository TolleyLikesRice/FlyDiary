import FlightTable from '@/app/(dashboard)/flights/FlightTable'
import DatabaseProvider from '@/components/databaseProvider'

import FlightTableSkeleton from './FlightTableSkeleton'

export default function DashboardPage() {
    return (
        <div className='container mx-auto md:p-8 lg:p-16'>
            <DatabaseProvider loadingSkeleton={<FlightTableSkeleton />} Element={FlightTable} />
        </div>
    )
}