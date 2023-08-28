"use client"

import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import { MoreHorizontal, Pencil, ScrollText, Trash2 } from "lucide-react"
import Image from "next/image"
import { useState } from "react"
import { RxDocument } from "rxdb"

import DeleteDialogContent from "@/components/complex-ui/deleteDialog"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Aircraft } from "@/lib/dbSchemas"

import { AircraftModalContent } from "./AircraftModal"

function AircraftActionsMenu({aircraft, db}: {aircraft: RxDocument, db: any}) {
    const iconClass = 'h-4 w-4 mr-1.5'

    const [editAircraftOpen, setEditAircraftOpen] = useState(false)
    const [deleteAircraftOpen, setDeleteAircraftOpen] = useState(false)

    return (
        <AlertDialog open={deleteAircraftOpen} onOpenChange={setDeleteAircraftOpen}>
            <DeleteDialogContent document={aircraft} type='aircraft' setOpen={setDeleteAircraftOpen} />
            <Dialog open={editAircraftOpen} onOpenChange={setEditAircraftOpen}>
                <AircraftModalContent db={db} aircraft={aircraft} setOpen={setEditAircraftOpen} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem><ScrollText className={iconClass} /> Show Flights</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild><DropdownMenuItem><Pencil className={iconClass} /> Edit Aircraft</DropdownMenuItem></DialogTrigger>
                        <AlertDialogTrigger asChild><DropdownMenuItem className='text-red-500'><Trash2 className={iconClass} /> Delete Aircraft</DropdownMenuItem></AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu >
            </Dialog>
        </AlertDialog>
    )
}

export default function AircraftCard({ aircraft, aircraftDocument, db }: { aircraft: Aircraft, aircraftDocument: RxDocument, db: any }) {
    const [aircraftImage, setAircraftImage] = useState<string>("https://media.istockphoto.com/id/1335247217/vector/loading-icon-vector-illustration.jpg?s=612x612&w=0&k=20&c=jARr4Alv-d5U3bCa8eixuX2593e1rDiiWnvJLgHCkQM=")
    const [photoData, setPhotoData] = useState<any>(null)

    const notFoundImage: string = "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
    // TODO: make own image for loading & not found

    fetch(`https://api.planespotters.net/pub/photos/reg/${aircraft.registration}`)
        .then(response => response.json())
        .then(data => {
            if (!data.photos[0]) return setAircraftImage(notFoundImage)
            setAircraftImage(data.photos[0].thumbnail_large.src)
            setPhotoData(data.photos[0])
        })

    return (
        <Card className="w-[350px] h-full">
            <div className="w-full h-full rounded-xl overflow-clip">
                <div className="absolute"><AircraftActionsMenu aircraft={aircraftDocument} db={db}/></div>
                    <Image className="w-full h-[230px] object-cover" src={aircraftImage} width={400} height={500} alt={`Photo of ${aircraft.registration}`} />
                    { photoData && <div className="w-full text-right text-[0.5rem] p-0.5 pr-2 text-neutral-300 bg-black">Photo by {photoData.photographer}, sourced from <a className="underline hover:text-blue-400" href={photoData.link}>PlaneSpotters.net</a></div> }
                </div> {/* TODO: make attribution look nicer + add actions menu in top right */}
            <CardHeader>
                <CardTitle>{aircraft.registration}</CardTitle>
                <CardDescription>{aircraft.type}</CardDescription>
            </CardHeader>
            <CardFooter>
                <p>Some stats go here!</p>
            </CardFooter>
        </Card>
    )
}