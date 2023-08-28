'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { set, useForm } from "react-hook-form"
import * as z from "zod"

import { AircraftCombobox } from "@/components/complex-ui/aircraftCombobox"
import { DatePicker } from "@/components/complex-ui/datePicker"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Flight, flightZodSchema } from "@/lib/dbSchemas"
import { generateSnowflake } from "@/lib/snowflake"

export function FlightModalContent({ db, flight, setOpen }: { db: any, flight: any | null, setOpen: any }) {
    let header: String;
    let defaultValues = undefined;
    if (!flight) header = "Add Flight"
    else {
        header = "Edit Flight"
        defaultValues = {
            origin: flight._data.origin,
            destination: flight._data.destination,
            date: new Date(flight._data.date),
            timings: {
                brakesOff: flight._data.timings.brakesOff,
                brakesOn: flight._data.timings.brakesOn,
            },
            pic: flight._data.pic,
            holderOperatingCapacity: flight._data.holderOperatingCapacity,
            aircraft: {
                registration: flight._data.aircraft.registration,
                type: flight._data.aircraft.type,
            },
            toLdg: {
                dayTo: flight._data.toLdg.dayTo,
                nightTo: flight._data.toLdg.nightTo,
                dayLdg: flight._data.toLdg.dayLdg,
                nightLdg: flight._data.toLdg.nightLdg,
            },
            remarks: flight._data.remarks,
        }
    }

    const form = useForm({
        resolver: zodResolver(flightZodSchema),
        defaultValues: defaultValues
    })

    let [aircraftTypeInputDisabled, setAircraftTypeInputDisabled] = useState(false)
    let [aircraftRegistrationInputDisabled, setAircraftRegistrationInputDisabled] = useState(false)

    return (
        <DialogContent className="sm:max-w-[468px] lg:max-w-[70%] w-fit overflow-y-scroll max-h-screen">
            <DialogHeader>
                <DialogTitle>{header}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-row gap-8">
                        <FormField control={form.control} name="origin" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Origin</FormLabel>
                                <FormControl>
                                    <Input placeholder="ICAO" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="destination" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Destination</FormLabel>
                                <FormControl>
                                    <Input placeholder="ICAO" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex flex-row gap-8">
                        <FormField control={form.control} name="date" render={({ field }) => (
                            <FormItem className="flex-grow flex-col flex justify-end">
                                <FormLabel>Date</FormLabel>  { /* TODO: Fix off-alignment */}
                                <DatePicker field={field} />
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="timings.brakesOff" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Brakes Off</FormLabel>
                                <FormControl>
                                    <Input placeholder="HH:MM" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="timings.brakesOn" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Brakes On</FormLabel>
                                <FormControl>
                                    <Input placeholder="HH:MM" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex flex-row gap-8">
                        <FormField control={form.control} name="pic" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Pilot-in-Command</FormLabel>
                                <FormControl>
                                    <Input placeholder="Self" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="holderOperatingCapacity" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Your Operating Capacity</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="PIC">Pilot-in-Command</SelectItem>
                                        <SelectItem value="SIC">Second-in-Command</SelectItem>
                                        <SelectItem value="DUAL">Dual (Student)</SelectItem>
                                        <SelectItem value="P1S">PIC under Supervision</SelectItem>
                                        <SelectItem value="SPIC">Student PIC (Solo)</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex flex-row gap-8">
                        <FormItem className="space-y-2 flex-grow w-[200px]"> {/* TODO: Fix weird spacing issue */}
                            <FormLabel>Saved Aircraft</FormLabel>
                            <AircraftCombobox onChange={aircraftComboBoxOnChange} db={db} />
                        </FormItem>
                        <FormField control={form.control} name="aircraft.type" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Aircraft Type</FormLabel>
                                <FormControl>
                                    <Input id="aircraftTypeInput" placeholder="C152" {...field} disabled={aircraftTypeInputDisabled} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="aircraft.registration" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Aircraft Registration</FormLabel>
                                <FormControl>
                                    <Input id="aircraftRegistrationInput" placeholder="G-ABCD" {...field} disabled={aircraftRegistrationInputDisabled} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex flex-row gap-8"> {/* TODO: Made a nice counter component */}
                        <FormField control={form.control} name="toLdg.dayTo" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Day Takeoffs</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="toLdg.dayLdg" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Day Landings</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="toLdg.nightTo" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Night Takeoffs</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="toLdg.nightLdg" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Night Landings</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="flex flex-row gap-8">
                        <FormField control={form.control} name="remarks" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Remarks</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    { /* TODO: Tags - need to make/find a nice fancy component */}

                    <Button type="submit">{header}</Button>
                </form>
            </Form>
            {/* <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter> */}
        </DialogContent>
    )

    function aircraftComboBoxOnChange(newValue: String) {
        const regInput = document.getElementById("aircraftRegistrationInput") as HTMLInputElement;
        const typeInput = document.getElementById("aircraftTypeInput") as HTMLInputElement;

        if (newValue === "new") {
            setAircraftRegistrationInputDisabled(false);
            setAircraftTypeInputDisabled(false);
            regInput.value = "";
            typeInput.value = "";
        } else {
            setAircraftRegistrationInputDisabled(true);
            setAircraftTypeInputDisabled(true);
            let aircraftRegistration = newValue.split(",")[0].toUpperCase();
            let aircraftType = newValue.split(",")[1].toUpperCase();
            regInput.value = aircraftRegistration;
            typeInput.value = aircraftType;
            set(form.getValues(), "aircraft.registration", aircraftRegistration);
            set(form.getValues(), "aircraft.type", aircraftType);
        }
    }

    function onSubmit(values: z.infer<typeof flightZodSchema>) {
        // TODO: Handle Add New Aircraft logic

        let newFlight: Flight = {
            id: generateSnowflake().toString(),
            origin: values.origin,
            destination: values.destination,
            date: values.date.toISOString().split("T")[0],
            timings: {
                brakesOff: values.timings.brakesOff,
                brakesOn: values.timings.brakesOn,
            },
            pic: values.pic,
            holderOperatingCapacity: values.holderOperatingCapacity,
            aircraft: {
                registration: values.aircraft.registration,
                type: values.aircraft.type,
            },
            toLdg: {
                dayTo: values.toLdg.dayTo || 0,
                nightTo: values.toLdg.nightTo || 0,
                dayLdg: values.toLdg.dayLdg || 0,
                nightLdg: values.toLdg.nightLdg || 0,
            },
            remarks: values.remarks || "",
            tags: null,
        }

        if (header == "Add Flight") {
            db.flights.insert(newFlight).then(() => {
                setOpen(false)
            })
            console.log("added flight")
        } else if (header == "Edit Flight") {
            newFlight.id = flight._data.id
            flight.patch(newFlight).then(() => {
                setOpen(false)
            })
            console.log("edited flight")
        }
    }
}

export default function FlightModal({ db, flight, children }: { db: any, flight: any | null, children: React.ReactNode }) {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <FlightModalContent db={db} flight={flight} setOpen={setOpen} />
        </Dialog>
    )
}
