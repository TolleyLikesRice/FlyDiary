import Head from 'next/head'
import React from 'react';

import Layout from '@/components/layout';

export default function IndexPage() {
    return (
        <Layout>
            <Head>
                <title>nextjs-base</title>
            </Head>
            <h1 className='text-center text-white text-4xl'>nextjs-base</h1>
        </Layout>
    )
}