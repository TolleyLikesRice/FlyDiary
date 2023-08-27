import DatabaseProvider from "@/components/databaseProvider";

import AircraftGrid from "./AircraftGrid";

export default function AircraftPage() {
    return (
        <div className='container mx-auto md:p-8 lg:p-16 lg:py-8'>
            <h1 className='text-white text-3xl'>Aircraft</h1>
            <DatabaseProvider loadingSkeleton={<div />} Element={AircraftGrid} />
        </div>
    )
}