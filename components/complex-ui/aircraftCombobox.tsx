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

const aircraft = [ //TODO: get from user database
    {
        value: "gabcd",
        label: "G-ABCD (C152)",
    },
    {
        value: "gefgh",
        label: "G-EFGH (C172)",
    },
    {
        value: "gijkl",
        label: "G-IJKL (PA28)",
    },
    {
        value: "gmnop",
        label: "G-MNOP (K100)",
    },
]

export function AircraftCombobox() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

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
                        ? aircraft.find((aircraft) => aircraft.value === value)?.label
                        : "Select aircraft..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search aircraft..." />
                    <CommandEmpty>No aircraft found.</CommandEmpty> {/* Add an "add aircraft" button there. */}
                    <CommandGroup>
                        {aircraft.map((aircraft) => (
                            <CommandItem
                                key={aircraft.value}
                                onSelect={(currentLabel) => {
                                    setValue(aircraft.value)
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
