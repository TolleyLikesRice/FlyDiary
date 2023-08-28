'use client'

import Link from 'next/link'

import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'

import AvatarDropdown from './avatar-dropdown'

const links = [
    {
        href: '/dashboard',
        label: 'Dashboard'
    },
    {
        href: '/flights',
        label: 'Flights'
    },
    {
        href: '/aircraft',
        label: 'Aircraft'
    },
    {
        href: '/statistics',
        label: 'Statistics'
    }
]

export default function NavBar() {
    return (
        <div>
            <div className='flex items-center w-screen py-2 px-5'>
                <Skeleton className="w-[120px] h-[40px] rounded-xl mr57" />
                <NavigationMenu className='block'>
                    <NavigationMenuList>
                        {
                            links.map(link => (
                                <NavigationMenuItem key={link.href}>
                                    <Link href={link.href} className={navigationMenuTriggerStyle()}>
                                        {link.label}
                                    </Link>
                                </NavigationMenuItem>
                            ))
                        }
                    </NavigationMenuList>
                </NavigationMenu>
                <div className='flex-grow' />
                {/* TODO: Add sync state indicator */}
                <AvatarDropdown />
            </div>
            <Separator className='w-screen' />
        </div>
    )
}