// --------------------
// Flight Schema & Type
// --------------------
// TODO: Add sim time, instrument, that stuff.

import * as z from 'zod';

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
        dayTo: number
        nightTo: number
        dayLdg: number
        nightLdg: number
    }
    remarks?: string | null
    tags?: string[] | null
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

export const flightZodSchema = z.object({ // Full disclosure: Used some regex's from https://gist.github.com/eightyknots/4372d1166a192d5e9754
    origin: z.string().toUpperCase().regex(/^[A-Z]{4}$/, "Must be a valid ICAO code"),
    destination: z.string().toUpperCase().regex(/^[A-Z]{4}$/, "Must be a valid ICAO code"),
    date: z.date().max(new Date(), 'Date cannot be in the future'),
    timings: z.object({
        brakesOff: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Must be in HH:MM format"),
        brakesOn: z.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, "Must be in HH:MM format"),
    }).required(),
    pic: z.string(),
    holderOperatingCapacity: z.string(),
    aircraft: z.object({
        registration: z.string().toUpperCase().regex(/^[A-Z]-[A-Z]{4}|[A-Z]{2}-[A-Z]{3}|N[0-9]{1,5}[A-Z]{0,2}$/, "Should be 5 characters, include dash if applicable"),
        type: z.string().toUpperCase().regex(/^[A-Z]{1}[A-Z0-9]{1,3}$/, "Must be a valid ICAO code"),
    }).required(),
    toLdg: z.object({
        dayTo: z.coerce.number(),
        nightTo: z.coerce.number(),
        dayLdg: z.coerce.number(),
        nightLdg: z.coerce.number(),
    }).partial(),
    remarks: z.string(),
    tags: z.array(z.string()),
}).required().partial({
    remarks: true,
    tags: true,
});

// ----------------------
// Aircraft Schema & Type
// ----------------------

export type Aircraft = {
    id: string
    type: string
    registration: string
    remarks?: string | null
    tags?: string[] | null
}

export const aircraftSchema = {
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100
        },
        type: {
            type: 'string'
        },
        registration: {
            type: 'string'
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
        'type',
        'registration',
    ]
}

export const aircraftZodSchema = z.object({
    type: z.string().toUpperCase().regex(/^[A-Z]{1}[A-Z0-9]{1,3}$/, "Must be a valid ICAO code"),
    registration: z.string().toUpperCase().regex(/^[A-Z]-[A-Z]{4}|[A-Z]{2}-[A-Z]{3}|N[0-9]{1,5}[A-Z]{0,2}$/, "Should be 5 characters, include dash if applicable"),
    remarks: z.string().optional(),
    tags: z.array(z.string()).optional(),
}).required().partial({
    remarks: true,
    tags: true,
});