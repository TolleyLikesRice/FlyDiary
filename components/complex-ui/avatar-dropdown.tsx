"use client"

import { Avatar, AvatarFallback,AvatarImage } from "../ui/avatar"

// TODO: Get avatar based on auth

export default function AvatarDropdown() {
    return (
        <Avatar>
            <AvatarImage src='https://tolley.dev/does-not-exist' />
            <AvatarFallback>PB</AvatarFallback>
        </Avatar>
    )
}