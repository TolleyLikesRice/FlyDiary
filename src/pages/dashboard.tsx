import Head from 'next/head'
import React from 'react';
import useSWR from 'swr';

import { FlightCardStack } from '@/components/flightCard';
import Layout from '@/components/layout';
import fetcher from '@/utils/fetcher'

function Stats() {
    const { data, error } = useSWR('/api/stats', fetcher);

    if (error) return <div className="text-center text-gray-100">Failed to load</div>;
    if (!data) return <div className="text-center text-gray-100">Loading...</div>;

    return (
        <div className='justify-center w-screen flex items-center'>
            <div className='text-center text-gray-100'>
                {data.day_to + data.night_to}
                <br />
                Landings
            </div>
        </div>
    )
}

export default function Dashboard() {
    return (
        <Layout>
            <Head>
                <title>FlyDiary - Dashboard</title>
            </Head>
            <h1>dash</h1>
            <Stats />
            <div className='container mx-auto p-12'>
                <FlightCardStack number={3} />
            </div>
        </Layout>
    )
}