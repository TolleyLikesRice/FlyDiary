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

export default function AircraftModal({ db, aircraft, children }: { db: any, aircraft: any | null, children: React.ReactNode }) {
    const [open, setOpen] = useState<boolean>(false)

    let header;
    if (!aircraft) header = "Add Aircraft"
    else header = "Edit Aircraft"

    const form = useForm({
        resolver: zodResolver(aircraftZodSchema),
        defaultValues: aircraft
    })

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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
        </Dialog>
    )

    function onSubmit(values: z.infer<typeof aircraftZodSchema>) {
        if (header = "Add Aircraft") {
            let aircraft: Aircraft = {
                id: generateSnowflake().toString(),
                registration: values.registration,
                type: values.type,
                remarks: values.remarks,
                tags: []
            }
            db.aircraft.insert(aircraft).then(() => {
                setOpen(false)
            })
        } else if (header = "Edit Aircraft") {
            // TODO: Implement editing
            throw new Error("Not implemented")
        }
    }
}
