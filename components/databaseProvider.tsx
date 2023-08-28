'use client'

import { useState } from "react";

import { FlyDiaryConfig } from "@/flydiary.config";
import { Database } from "@/lib/db";

export default function DatabaseProvider({ loadingSkeleton, Element }: { loadingSkeleton: React.ReactNode, Element: any }) {
    const [db, setDb] = useState<any>(null);

    function databaseCallback(database: any) {
        setDb(database);
        console.log("Database loaded");
    }

    if (!db) return (<Database userID={FlyDiaryConfig.UserID} databaseCallback={databaseCallback} loadingSkeleton={loadingSkeleton} />) // TODO: Make UserID dynamic and dbUrl configurable
    if (!Element) throw new Error('No element provided');

    return <Element db={db} />;
    //return loadingSkeleton; // debugging skeletons
}