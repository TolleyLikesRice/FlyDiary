'use client'

import { useState } from 'react'

import GenericSkeleton from '@/components/complex-ui/GenericSkeleton';
import { Button } from "@/components/ui/button";

import AircraftCard from "./AircraftCard";
import AircraftModal from "./AircraftModal";

export default function AircraftGrid({ db }: { db: any }) {
    const [aircraft, setAircraft] = useState<any>(null)

    if (!db) return (<div>Error</div>) // Shouldn't be possible as databaseProvider shouldn't render this component until db is loaded, but here just incase

    if (!aircraft) {
        db.aircraft.find().$.subscribe((aircraft: any) => {
            setAircraft(aircraft);
        })
        return (<GenericSkeleton />) // TODO: Skeleton
    }

    return (
        <div>
            <AircraftModal db={db} aircraft={null}>
                <Button>Add Aircraft</Button>
            </AircraftModal>
            <div className='flex flex-wrap gap-4 py-4 items-center justify-center'>
                {aircraft.map((aircraft: any) => (
                    <AircraftCard key={aircraft.id} aircraft={aircraft} />
                ))}
            </div>
        </div>
    )
}