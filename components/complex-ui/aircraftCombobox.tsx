"use client"

import { Check, ChevronsUpDown } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

const aircraft = [
    {
        value: "new",
        label: "Add new",
    },
    {
        value: "g-abcd,c152",
        label: "G-ABCD (C152)",
    },
    {
        value: "g-efgh,c172",
        label: "G-EFGH (C172)",
    },
    {
        value: "g-ijkl,pa28",
        label: "G-IJKL (PA28)",
    },
    {
        value: "g-mnop,k100",
        label: "G-MNOP (K100)",
    },
]

export function AircraftCombobox({ onChange, db }: { onChange: any, db: any }) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [aircraft, setAircraft] = React.useState<any>([{
        value: "new",
        label: "Loading...",
    }])
    const [loadedAircraft, setLoadedAircraft] = React.useState<boolean>(false)

    if (!loadedAircraft) {
        db.aircraft.find().$.subscribe((acArr: Object[]) => {
            let AircraftArray = [
                {
                    value: "new",
                    label: "Add new",
                },
            ]

            acArr.forEach((ac: any) => {
                AircraftArray.push({
                    value: `${ac.registration},${ac.type}`,
                    label: `${ac.registration} (${ac.type})`,
                })
            })

            setAircraft(AircraftArray)
            setLoadedAircraft(true)
        })
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {value
                        ? aircraft.find((aircraft: any) => aircraft.value === value)?.label
                        : "Add new"}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search aircraft..." />
                    <CommandEmpty>No aircraft found.</CommandEmpty> {/* TODO: Add an "add aircraft" button there. */}
                    <CommandGroup>
                        {aircraft.map((aircraft: any) => (
                            <CommandItem
                                key={aircraft.value}
                                onSelect={(currentLabel) => {
                                    setValue(aircraft.value)
                                    onChange(aircraft.value)
                                    setOpen(false)
                                }}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        value === aircraft.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {aircraft.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
