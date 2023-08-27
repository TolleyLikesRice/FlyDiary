"use client"

import { AspectRatio } from "@radix-ui/react-aspect-ratio"
import Image from "next/image"
import { useState } from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Aircraft } from "@/lib/dbSchemas"

export default function AircraftCard({ aircraft }: { aircraft: Aircraft }) {
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
                    <Image className="w-full h-[230px] object-cover" src={aircraftImage} width={400} height={500} alt={`Photo of ${aircraft.registration}`} />
                    { photoData && <div className="w-full text-right text-[0.5rem] p-0.5 pr-2 text-neutral-300 bg-slate-80">Photo by {photoData.photographer}, sourced from <a className="underline hover:text-blue-400" href={photoData.link}>PlaneSpotters.net</a></div> }
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