import { Plus } from "lucide-react"

import { AircraftCombobox } from "@/components/complex-ui/aircraftCombobox"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


export default function FlightModal({ db, flight, children }: { db: any, flight: any | null, children: React.ReactNode }) {
    let header;
    if (!flight) header = "New Flight"
    else header = "Edit Flight"

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[468px] lg:max-w-[70%] w-fit">
                <DialogHeader>
                    <DialogTitle>New Flight</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="origin" className="text-right">
                            Origin
                        </Label>
                        <Input id="origin" placeholder="XXXX" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Destination
                        </Label>
                        <Input id="username" placeholder="XXXX" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="ac_select" className="text-right">
                            Aircraft
                        </Label>
                        <AircraftCombobox />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
