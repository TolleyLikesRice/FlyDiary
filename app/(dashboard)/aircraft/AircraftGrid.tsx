'use client'

import { Button } from "@/components/ui/button";

import AircraftModal from "./AircraftModal";

export default function AircraftGrid({ db }: { db: any }) {
    return (
        <AircraftModal db={db} aircraft={null}>
            <Button>Add Aircraft</Button>
        </AircraftModal>
    )
}