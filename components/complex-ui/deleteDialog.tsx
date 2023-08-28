'use client'

import { RxDocument } from "rxdb";

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";
import { Button } from "../ui/button";

export default function DeleteDialogContent({ document, type, setOpen }: { document: RxDocument, type: string, setOpen: any }) {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to delete this {type}?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This {type} will be permanently deleted, and cannot be recovered.
                </AlertDialogDescription>
            </AlertDialogHeader>
            {/* TODO: Have a little preview of the flight that is being deleted */}
            <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction className="bg-red-500" onClick={() => { document.remove() }}>Delete</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}