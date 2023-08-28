'use client'

import { addRxPlugin, createRxDatabase, RxCollection } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import { getFetchWithCouchDBAuthorization, replicateCouchDB } from 'rxdb/plugins/replication-couchdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import { FlyDiaryConfig } from '@/flydiary.config';

import { aircraftSchema, flightSchema } from './dbSchemas';

//addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBMigrationPlugin);

const dbUrl = FlyDiaryConfig.CouchDBUrl;

let userID;
let database;
let collections: {
    flights: RxCollection
    aircraft: RxCollection
};

export async function init(newUserID: Number) {
    if (!newUserID) throw new Error('No userID provided');
    userID = newUserID;

    database = await createRxDatabase({
        name: `user_${userID}`,
        storage: getRxStorageDexie(),
        ignoreDuplicate: true
    });

    collections = await database.addCollections({
        flights: {
            schema: flightSchema
        },
        aircraft: {
            schema: aircraftSchema
        }
    });

    // Create database on CouchDB (412 expected if already exists)
    try {
        await fetch(
            `${dbUrl}/user_${userID}-flights/`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Basic ${Buffer.from(FlyDiaryConfig.CouchDBUsername + ":" + FlyDiaryConfig.CouchDBPassword).toString('base64')}` // TODO: Get according to auth
                }
            }
        );
        await fetch(
            `${dbUrl}/user_${userID}-aircraft/`,
            {
                method: 'PUT',
                headers: {
                    Authorization: `Basic ${Buffer.from(FlyDiaryConfig.CouchDBUsername + ":" + FlyDiaryConfig.CouchDBPassword).toString('base64')}` // TODO: Get according to auth
                }
            }
        );
    } catch (e) {
        console.log(e);
    }

    // Replicate database with CouchDB
    const flightsReplicationState = await replicateCouchDB({
        collection: collections.flights,
        url: `${dbUrl}/user_${userID}-flights/`,
        fetch: getFetchWithCouchDBAuthorization(FlyDiaryConfig.CouchDBUsername, FlyDiaryConfig.CouchDBPassword), // TODO: Get according to auth
        push: {
            batchSize: 1,
            modifier: (doc) => { return doc }
        },
        pull: {}
    })
    await flightsReplicationState.start();
    await flightsReplicationState.reSync();
    console.log("Flights Replication started")

    const aircraftReplicationState = await replicateCouchDB({
        collection: collections.aircraft,
        url: `${dbUrl}/user_${userID}-aircraft/`,
        fetch: getFetchWithCouchDBAuthorization('tolley', 'admin'), //TODO: Make this dynamic
        push: {
            batchSize: 1,
            modifier: (doc) => { return doc }
        },
        pull: {}
    })
    await aircraftReplicationState.start();
    await aircraftReplicationState.reSync();
    console.log("Aircraft Replication started")

    // emits each document that was received from the remote
    flightsReplicationState.received$.subscribe(doc => console.dir(doc));

    // emits each document that was send to the remote
    flightsReplicationState.send$.subscribe(doc => console.dir(doc));

    // emits all errors that happen when running the push- & pull-handlers.
    flightsReplicationState.error$.subscribe(error => console.dir(error));

    return collections;
}

export function Database({ userID, databaseCallback, loadingSkeleton }: { userID: Number, databaseCallback: Function, loadingSkeleton: React.ReactNode }) {
    if (!userID) throw new Error('No userID provided');
    if (!dbUrl) throw new Error('No dbUrl provided');
    if (!databaseCallback) throw new Error('No callback provided');
    init(userID).then((db) => databaseCallback(db))

    return loadingSkeleton;
}