export type Flight = {
    id: string
    origin: string
    destination: string
    date: string
    timings: {
        brakesOff: string
        brakesOn: string
    }
    pic: string
    holderOperatingCapacity: string
    aircraft: {
        type: string
        registration: string
    }
    remarks: string
    tags: string[][]
}

export const flightSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        origin: {
            type: 'string'
        },
        destination: {
            type: 'string'
        },
        date: {
            type: 'string',
            format: 'date'
        },
        timings: {
            type: 'object',
            properties: {
                brakesOff: {
                    type: 'string',
                    format: 'time'
                },
                brakesOn: {
                    type: 'string',
                    format: 'time'
                }
            }
        },
        pic: {
            type: 'string'
        },
        holderOperatingCapacity: {
            type: 'string'
        },
        aircraft: {
            type: 'object',
            properties: {
                type: {
                    type: 'string'
                },
                registration: {
                    type: 'string'
                }
            },
        },
        remarks: {
            type: 'string'
        },
        tags: {
            type: 'array',
            items: {
                type: 'array',
                items: {
                    type: 'string'
                }
            }
        }
    },
    required: [
        'id',
        'origin',
        'destination'
    ]
}
// TODO: Fix required, add landings and takeoffs, and that stuff, as well as sim time, instrument, that stuff.