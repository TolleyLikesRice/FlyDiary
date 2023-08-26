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
    toLdg: {
        dayTo?: number | null
        nightTo?: number | null
        dayLdg?: number | null
        nightLdg?: number | null
    }
    remarks?: string | null
    tags?: string[][] | null
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
            type: 'string'
        },
        timings: {
            type: 'object',
            properties: {
                brakesOff: {
                    type: 'string'
                },
                brakesOn: {
                    type: 'string'
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
        toLdg: {
            type: 'object',
            properties: {
                dayTo: {
                    type: 'number'
                },
                nightTo: {
                    type: 'number'
                },
                dayLdg: {
                    type: 'number'
                },
                nightLdg: {
                    type: 'number'
                }
            }
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
        },
    },
    required: [
        'id',
        'origin',
        'destination',
        'date',
        'timings',
        'pic',
        'holderOperatingCapacity',
        'aircraft',
        'toLdg',
    ]
}
// TODO: Add sim time, instrument, that stuff.