'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { set, useForm } from "react-hook-form"
import * as z from "zod"

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
import { Aircraft, aircraftZodSchema } from "@/lib/dbSchemas"
import { generateSnowflake } from "@/lib/snowflake"

export function AircraftModalContent({ db, aircraft, setOpen }: { db: any, aircraft: any | null, setOpen: any }) {
    let header: string;
    let defaultValues = undefined;

    if (!aircraft) header = "Add Aircraft"
    else {
        header = "Edit Aircraft"
        defaultValues = {
            registration: aircraft._data.registration,
            type: aircraft._data.type,
            remarks: aircraft._data.remarks,
        }
    }

    const form = useForm({
        resolver: zodResolver(aircraftZodSchema),
        defaultValues: defaultValues
    })

    return (
        <DialogContent className="sm:max-w-[468px] lg:max-w-[70%] w-fit overflow-y-scroll max-h-screen">
            <DialogHeader>
                <DialogTitle>{header}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-row gap-8">
                        <FormField control={form.control} name="registration" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Registration</FormLabel>
                                <FormControl>
                                    <Input placeholder="G-ABCD" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="type" render={({ field }) => (
                            <FormItem className="flex-grow">
                                <FormLabel>Type</FormLabel>
                                <FormControl>
                                    <Input placeholder="C152" {...field} />
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

    function onSubmit(values: z.infer<typeof aircraftZodSchema>) {
        let newAircraft: Aircraft = {
            id: generateSnowflake().toString(),
            registration: values.registration,
            type: values.type,
            remarks: values.remarks,
            tags: []
        }

        if (header == "Add Aircraft") {
            db.aircraft.insert(newAircraft).then(() => {
                setOpen(false)
            })
        } else if (header == "Edit Aircraft") {
            newAircraft.id = aircraft._data.id
            aircraft.patch(newAircraft).then(() => {
                setOpen(false)
            })
        }
    }
}

export default function AircraftModal({ db, aircraft, children }: { db: any, aircraft: any | null, children: React.ReactNode }) {
    const [open, setOpen] = useState<boolean>(false)



    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <AircraftModalContent db={db} aircraft={aircraft} setOpen={setOpen} />
        </Dialog>
    )
}
