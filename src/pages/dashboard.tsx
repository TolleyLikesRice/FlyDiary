import Head from 'next/head'
import React from 'react';
import useSWR from 'swr';

import { FlightCardStack } from '@/components/flightCard';
import Layout from '@/components/layout';
import NavBar from '@/components/navbar';
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
            <NavBar />
            <Stats />
            <div className='container mx-auto md:p-12 p-7'>
                <FlightCardStack number={3} />

                { /* Place Holders Below */}
                <div className='text-gray-100 text-center'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis orci et placerat pretium. Suspendisse aliquam nibh eget fringilla viverra. Sed eu semper orci. Sed vitae augue vel eros molestie dictum ut eget magna. Quisque non hendrerit lectus. Praesent tincidunt faucibus ipsum, sed feugiat ipsum dictum non. Sed et tellus cursus, efficitur est eu, viverra ipsum.

                    Mauris ac interdum neque. Aenean augue turpis, gravida at leo maximus, bibendum faucibus tellus. Nam ultricies leo nec nunc finibus, sit amet accumsan urna feugiat. Nullam sodales fringilla sapien, et mattis libero venenatis vitae. Nunc vel lorem sagittis, cursus tortor nec, pulvinar est. Phasellus eget auctor justo. Proin ultricies velit justo, sed gravida erat auctor a. Sed ac libero quis ligula molestie posuere ut sit amet elit. Morbi tincidunt ultricies suscipit. Aliquam rhoncus quam dolor, a aliquam tortor pretium id. Pellentesque cursus, orci nec cursus elementum, erat nisi auctor est, nec suscipit sem eros vitae quam. Quisque auctor condimentum turpis, a convallis velit condimentum nec.

                    Cras et congue leo. Phasellus iaculis vehicula nunc, a dapibus purus hendrerit non. Maecenas quam magna, mollis quis diam et, condimentum varius ante. Nullam eget placerat dolor. Vivamus malesuada scelerisque nibh, non pulvinar urna efficitur quis. Suspendisse tristique, nisi id pretium elementum, nibh velit rutrum ex, vestibulum lacinia massa urna at ligula. Fusce condimentum vitae quam ac auctor. Morbi ac massa sed neque vestibulum aliquam ac vel quam. Fusce venenatis facilisis lacus vitae consequat. Donec fermentum viverra eros in interdum. Cras posuere tellus leo, vel eleifend ante bibendum eu. Vivamus id feugiat urna, non imperdiet justo.

                    Proin consequat metus mi, id finibus risus maximus ac. Vestibulum erat felis, ullamcorper et dolor vel, aliquet mattis massa. Pellentesque id tellus vel nunc tincidunt porta. Suspendisse euismod nisi ac nibh lacinia commodo. Pellentesque porta gravida ullamcorper. Donec gravida arcu risus, a consectetur erat egestas sit amet. Nam vitae elementum sapien. Mauris urna augue, luctus id efficitur vitae, mattis at eros. Duis sodales gravida nulla, vel tincidunt metus dapibus vitae.

                    Quisque porta nunc sit amet est ornare porta. Praesent laoreet blandit quam, quis porta lorem molestie id. Etiam ullamcorper nisl eros, non blandit eros pretium sit amet. Mauris maximus faucibus vulputate. Cras eget mattis dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ac erat purus.
                </div>
                <div className='text-gray-100 text-center'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis orci et placerat pretium. Suspendisse aliquam nibh eget fringilla viverra. Sed eu semper orci. Sed vitae augue vel eros molestie dictum ut eget magna. Quisque non hendrerit lectus. Praesent tincidunt faucibus ipsum, sed feugiat ipsum dictum non. Sed et tellus cursus, efficitur est eu, viverra ipsum.

                    Mauris ac interdum neque. Aenean augue turpis, gravida at leo maximus, bibendum faucibus tellus. Nam ultricies leo nec nunc finibus, sit amet accumsan urna feugiat. Nullam sodales fringilla sapien, et mattis libero venenatis vitae. Nunc vel lorem sagittis, cursus tortor nec, pulvinar est. Phasellus eget auctor justo. Proin ultricies velit justo, sed gravida erat auctor a. Sed ac libero quis ligula molestie posuere ut sit amet elit. Morbi tincidunt ultricies suscipit. Aliquam rhoncus quam dolor, a aliquam tortor pretium id. Pellentesque cursus, orci nec cursus elementum, erat nisi auctor est, nec suscipit sem eros vitae quam. Quisque auctor condimentum turpis, a convallis velit condimentum nec.

                    Cras et congue leo. Phasellus iaculis vehicula nunc, a dapibus purus hendrerit non. Maecenas quam magna, mollis quis diam et, condimentum varius ante. Nullam eget placerat dolor. Vivamus malesuada scelerisque nibh, non pulvinar urna efficitur quis. Suspendisse tristique, nisi id pretium elementum, nibh velit rutrum ex, vestibulum lacinia massa urna at ligula. Fusce condimentum vitae quam ac auctor. Morbi ac massa sed neque vestibulum aliquam ac vel quam. Fusce venenatis facilisis lacus vitae consequat. Donec fermentum viverra eros in interdum. Cras posuere tellus leo, vel eleifend ante bibendum eu. Vivamus id feugiat urna, non imperdiet justo.

                    Proin consequat metus mi, id finibus risus maximus ac. Vestibulum erat felis, ullamcorper et dolor vel, aliquet mattis massa. Pellentesque id tellus vel nunc tincidunt porta. Suspendisse euismod nisi ac nibh lacinia commodo. Pellentesque porta gravida ullamcorper. Donec gravida arcu risus, a consectetur erat egestas sit amet. Nam vitae elementum sapien. Mauris urna augue, luctus id efficitur vitae, mattis at eros. Duis sodales gravida nulla, vel tincidunt metus dapibus vitae.

                    Quisque porta nunc sit amet est ornare porta. Praesent laoreet blandit quam, quis porta lorem molestie id. Etiam ullamcorper nisl eros, non blandit eros pretium sit amet. Mauris maximus faucibus vulputate. Cras eget mattis dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ac erat purus.
                </div>
                <div className='text-gray-100 text-center'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis orci et placerat pretium. Suspendisse aliquam nibh eget fringilla viverra. Sed eu semper orci. Sed vitae augue vel eros molestie dictum ut eget magna. Quisque non hendrerit lectus. Praesent tincidunt faucibus ipsum, sed feugiat ipsum dictum non. Sed et tellus cursus, efficitur est eu, viverra ipsum.

                    Mauris ac interdum neque. Aenean augue turpis, gravida at leo maximus, bibendum faucibus tellus. Nam ultricies leo nec nunc finibus, sit amet accumsan urna feugiat. Nullam sodales fringilla sapien, et mattis libero venenatis vitae. Nunc vel lorem sagittis, cursus tortor nec, pulvinar est. Phasellus eget auctor justo. Proin ultricies velit justo, sed gravida erat auctor a. Sed ac libero quis ligula molestie posuere ut sit amet elit. Morbi tincidunt ultricies suscipit. Aliquam rhoncus quam dolor, a aliquam tortor pretium id. Pellentesque cursus, orci nec cursus elementum, erat nisi auctor est, nec suscipit sem eros vitae quam. Quisque auctor condimentum turpis, a convallis velit condimentum nec.

                    Cras et congue leo. Phasellus iaculis vehicula nunc, a dapibus purus hendrerit non. Maecenas quam magna, mollis quis diam et, condimentum varius ante. Nullam eget placerat dolor. Vivamus malesuada scelerisque nibh, non pulvinar urna efficitur quis. Suspendisse tristique, nisi id pretium elementum, nibh velit rutrum ex, vestibulum lacinia massa urna at ligula. Fusce condimentum vitae quam ac auctor. Morbi ac massa sed neque vestibulum aliquam ac vel quam. Fusce venenatis facilisis lacus vitae consequat. Donec fermentum viverra eros in interdum. Cras posuere tellus leo, vel eleifend ante bibendum eu. Vivamus id feugiat urna, non imperdiet justo.

                    Proin consequat metus mi, id finibus risus maximus ac. Vestibulum erat felis, ullamcorper et dolor vel, aliquet mattis massa. Pellentesque id tellus vel nunc tincidunt porta. Suspendisse euismod nisi ac nibh lacinia commodo. Pellentesque porta gravida ullamcorper. Donec gravida arcu risus, a consectetur erat egestas sit amet. Nam vitae elementum sapien. Mauris urna augue, luctus id efficitur vitae, mattis at eros. Duis sodales gravida nulla, vel tincidunt metus dapibus vitae.

                    Quisque porta nunc sit amet est ornare porta. Praesent laoreet blandit quam, quis porta lorem molestie id. Etiam ullamcorper nisl eros, non blandit eros pretium sit amet. Mauris maximus faucibus vulputate. Cras eget mattis dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ac erat purus.
                </div>
                <div className='text-gray-100 text-center'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis orci et placerat pretium. Suspendisse aliquam nibh eget fringilla viverra. Sed eu semper orci. Sed vitae augue vel eros molestie dictum ut eget magna. Quisque non hendrerit lectus. Praesent tincidunt faucibus ipsum, sed feugiat ipsum dictum non. Sed et tellus cursus, efficitur est eu, viverra ipsum.

                    Mauris ac interdum neque. Aenean augue turpis, gravida at leo maximus, bibendum faucibus tellus. Nam ultricies leo nec nunc finibus, sit amet accumsan urna feugiat. Nullam sodales fringilla sapien, et mattis libero venenatis vitae. Nunc vel lorem sagittis, cursus tortor nec, pulvinar est. Phasellus eget auctor justo. Proin ultricies velit justo, sed gravida erat auctor a. Sed ac libero quis ligula molestie posuere ut sit amet elit. Morbi tincidunt ultricies suscipit. Aliquam rhoncus quam dolor, a aliquam tortor pretium id. Pellentesque cursus, orci nec cursus elementum, erat nisi auctor est, nec suscipit sem eros vitae quam. Quisque auctor condimentum turpis, a convallis velit condimentum nec.

                    Cras et congue leo. Phasellus iaculis vehicula nunc, a dapibus purus hendrerit non. Maecenas quam magna, mollis quis diam et, condimentum varius ante. Nullam eget placerat dolor. Vivamus malesuada scelerisque nibh, non pulvinar urna efficitur quis. Suspendisse tristique, nisi id pretium elementum, nibh velit rutrum ex, vestibulum lacinia massa urna at ligula. Fusce condimentum vitae quam ac auctor. Morbi ac massa sed neque vestibulum aliquam ac vel quam. Fusce venenatis facilisis lacus vitae consequat. Donec fermentum viverra eros in interdum. Cras posuere tellus leo, vel eleifend ante bibendum eu. Vivamus id feugiat urna, non imperdiet justo.

                    Proin consequat metus mi, id finibus risus maximus ac. Vestibulum erat felis, ullamcorper et dolor vel, aliquet mattis massa. Pellentesque id tellus vel nunc tincidunt porta. Suspendisse euismod nisi ac nibh lacinia commodo. Pellentesque porta gravida ullamcorper. Donec gravida arcu risus, a consectetur erat egestas sit amet. Nam vitae elementum sapien. Mauris urna augue, luctus id efficitur vitae, mattis at eros. Duis sodales gravida nulla, vel tincidunt metus dapibus vitae.

                    Quisque porta nunc sit amet est ornare porta. Praesent laoreet blandit quam, quis porta lorem molestie id. Etiam ullamcorper nisl eros, non blandit eros pretium sit amet. Mauris maximus faucibus vulputate. Cras eget mattis dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Mauris ac erat purus.
                </div>
            </div>
        </Layout>
    )
}