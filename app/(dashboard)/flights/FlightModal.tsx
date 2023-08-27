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
    DialogTrigger,
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

export default function FlightModal({ db, flight, children }: { db: any, flight: any | null, children: React.ReactNode }) {
    let header;
    if (!flight) header = "Add Flight"
    else header = "Edit Flight"

    const form = useForm({
        resolver: zodResolver(flightZodSchema),
        defaultValues: flight
    })

    let [aircraftTypeInputDisabled, setAircraftTypeInputDisabled] = useState(false)
    let [aircraftRegistrationInputDisabled, setAircraftRegistrationInputDisabled] = useState(false)

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[468px] lg:max-w-[70%] w-fit overflow-y-scroll max-h-screen">
                <DialogHeader>
                    <DialogTitle>New Flight</DialogTitle>
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
                                <AircraftCombobox onChange={aircraftComboBoxOnChange} />
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
        </Dialog>
    )

    function aircraftComboBoxOnChange(newValue: String) {
        if (newValue === "new") {
            setAircraftRegistrationInputDisabled(false);
            setAircraftTypeInputDisabled(false);
            (document.getElementById("aircraftRegistrationInput") as HTMLInputElement).value = "";
            (document.getElementById("aircraftTypeInput") as HTMLInputElement).value = "";
        } else {
            setAircraftRegistrationInputDisabled(true);
            setAircraftTypeInputDisabled(true);
            let aircraftRegistration = newValue.split(",")[0].toUpperCase();
            let aircraftType = newValue.split(",")[1].toUpperCase();
            (document.getElementById("aircraftRegistrationInput") as HTMLInputElement).value = aircraftRegistration;
            (document.getElementById("aircraftTypeInput") as HTMLInputElement).value = aircraftType;
        }
    }

    function onSubmit(values: z.infer<typeof flightZodSchema>) {
        if (header = "Add Flight") {
            let flight: Flight = {
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
                    dayTo: values.toLdg.dayTo,
                    nightTo: values.toLdg.nightTo,
                    dayLdg: values.toLdg.dayLdg,
                    nightLdg: values.toLdg.nightLdg,
                },
                remarks: values.remarks,
                tags: null,
            }
            console.log(values, flight)
            db.flights.insert(flight)
        } else if (header = "Edit Flight") {
            // TODO: Implement editing
            throw new Error("Not implemented")
        }
    }
}
