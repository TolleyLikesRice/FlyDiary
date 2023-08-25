'use server'

import * as PouchDB from 'pouchdb';

export const flightDB = new PouchDB.default('flights')

const userID = '1234' // TODO: get from auth

export async function syncDB() {
    flightDB.sync(`http://localhost:5984/${userID}-flights`)
}

syncDB()