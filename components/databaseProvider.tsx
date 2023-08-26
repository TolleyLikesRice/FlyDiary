'use client'

import { useState } from "react";

import { Database } from "@/lib/db";

export default function DatabaseProvider({ loadingSkeleton, Element }: { loadingSkeleton: React.ReactNode, Element: any }) {
    const [db, setDb] = useState<any>(null);

    function databaseCallback(database: any) {
        setDb(database);
        console.log("Database loaded");
    }

    if (!db) return (<Database userID={16} dbUrl={'http://10.0.2.2:5984'} databaseCallback={databaseCallback} loadingSkeleton={loadingSkeleton} />) // TODO: Make UserID dynamic and dbUrl configurable
    if (!Element) throw new Error('No element provided');

    return <Element db={db} />;
    //return loadingSkeleton; // debugging skeletons
}