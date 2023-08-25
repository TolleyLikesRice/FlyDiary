export type Flight = {
    id: string
    origin: string
    destination: string
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
    },
    required: [
        'id',
        'origin',
        'destination'
    ]
}