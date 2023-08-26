'use client'

import { addRxPlugin, createRxDatabase, RxCollection } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import { getFetchWithCouchDBAuthorization, replicateCouchDB } from 'rxdb/plugins/replication-couchdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import { flightSchema } from './dbSchemas';

addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBMigrationPlugin);

let dbUrl: String;

let userID;
let database;
let collections: {
    flights: RxCollection
};

export async function init(newUserID: Number, newDBUrl: String) {
    if (!newUserID) throw new Error('No userID provided');
    if (!newDBUrl) throw new Error('No dbUrl provided');
    userID = newUserID;
    dbUrl = newDBUrl;

    database = await createRxDatabase({
        name: `user_${userID}`,
        storage: getRxStorageDexie(),
        ignoreDuplicate: true
    });

    collections = await database.addCollections({
        flights: {
            schema: flightSchema
        }
    });

    // Create database on CouchDB (412 expected if already exists)
    try {
        await fetch(
            `${dbUrl}/user_${userID}-flights/`,
            {
                method: 'PUT',
                headers: {
                    Authorization: "Basic dG9sbGV5OmFkbWlu"
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
        fetch: getFetchWithCouchDBAuthorization('tolley', 'admin'), //TODO: Make this dynamic
        push: {
            batchSize: 1,
            modifier: (doc) => { return doc }
        },
        pull: {}
    })
    console.log(flightsReplicationState.push);
    await flightsReplicationState.start();
    await flightsReplicationState.reSync();
    console.log("Replication started")

    // emits each document that was received from the remote
    flightsReplicationState.received$.subscribe(doc => console.dir(doc));

    // emits each document that was send to the remote
    flightsReplicationState.send$.subscribe(doc => console.dir(doc));

    // emits all errors that happen when running the push- & pull-handlers.
    flightsReplicationState.error$.subscribe(error => console.dir(error));

    return collections;
}

export function Database({ userID, dbUrl, databaseCallback, loadingSkeleton }: { userID: Number, dbUrl: String | undefined, databaseCallback: Function, loadingSkeleton: React.ReactNode }) {
    if (!userID) throw new Error('No userID provided');
    if (!dbUrl) throw new Error('No dbUrl provided');
    if (!databaseCallback) throw new Error('No callback provided');
    init(userID, dbUrl).then((db) => databaseCallback(db))

    return loadingSkeleton;
}

// ----------------
// Flight Functions
// ----------------

export function addFlight(data: Object) {
    collections.flights.insert(data);
}