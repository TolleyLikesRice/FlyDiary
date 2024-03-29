'use client'

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { ArrowUpDown, Map, MoreHorizontal, Pencil, Plus, ScrollText, Trash2 } from 'lucide-react';
import { useState } from 'react'

import DeleteDialogContent from '@/components/complex-ui/deleteDialog';
import { AlertDialog, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Flight } from '@/lib/dbSchemas';
import { calculateBlockTime } from '@/lib/utils';

import FlightModal, { FlightModalContent } from './FlightModal';
import FlightTableSkeleton from './FlightTableSkeleton';

function SortableHeader({ column, header }: { column: any, header: String }) {
    return (
        <div className='flex items-center flex-row'>
            {header}
            <Button className='p-1.5' variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <ArrowUpDown className="h-4 w-4" />
            </Button>
        </div>
    )
}

function ActionMenu({ row, db }: { row: any, db: any }) {
    const flight = row.original

    const iconClass = 'h-4 w-4 mr-1.5'

    const [editFlightOpen, setEditFlightOpen] = useState(false)
    const [deleteFlightOpen, setDeleteFlightOpen] = useState(false)

    return (
        <AlertDialog open={deleteFlightOpen} onOpenChange={setDeleteFlightOpen}>
            <DeleteDialogContent document={flight} type='flight' setOpen={setDeleteFlightOpen} />
            <Dialog open={editFlightOpen} onOpenChange={setEditFlightOpen}>
                <FlightModalContent db={db} flight={flight} setOpen={setEditFlightOpen} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem><ScrollText className={iconClass} /> More Details</DropdownMenuItem>
                        <DropdownMenuItem><Map className={iconClass} /> Show on Map</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DialogTrigger asChild><DropdownMenuItem><Pencil className={iconClass} /> Edit Flight</DropdownMenuItem></DialogTrigger>
                        <AlertDialogTrigger asChild><DropdownMenuItem className='text-red-500'><Trash2 className={iconClass} /> Delete Flight</DropdownMenuItem></AlertDialogTrigger>
                    </DropdownMenuContent>
                </DropdownMenu >
            </Dialog>
        </AlertDialog>
    )
}

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export default function FlightTable({ db }: { db?: any }) {
    const [flights, setFlights] = useState(null)
    const [sorting, setSorting] = useState<SortingState>([])

    const columns: ColumnDef<Flight>[] = [
        {
            accessorKey: 'date',
            header: (column) => <SortableHeader column={column} header="Date" />,

        },
        {
            accessorKey: 'origin',
            header: 'Origin',
        },
        {
            accessorKey: 'destination',
            header: 'Destination',
        },
        {
            id: 'blockTime',
            accessorFn: (row) => calculateBlockTime(row.timings.brakesOff, row.timings.brakesOn),
            header: (column) => <SortableHeader column={column} header="Block Time" />
        },
        {
            accessorKey: 'pic',
            header: 'PIC',
        },
        {
            accessorKey: 'holderOperatingCapacity',
            header: 'Capacity',
        },
        {
            id: 'landings',
            header: 'Landings',
            accessorFn: (row) => (row.toLdg.dayLdg + row.toLdg.nightLdg),
        },
        {
            accessorKey: 'aircraft.registration',
            header: 'Aircraft',
        },
        {
            accessorKey: 'aircraft.type',
            header: 'Type',
        },
        {
            accessorKey: 'remarks',
            header: 'Remarks',
        },
        {
            id: 'actions',
            cell: (cell) => <ActionMenu row={cell.row} db={db} />,
            header: () => <FlightModal db={db} flight={null}><Button variant="ghost"><Plus /></Button></FlightModal>,
        }
    ]

    const table = useReactTable({
        data: flights || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(), // TODO: Fix sorting
        state: {
            sorting,
        }
    })

    if (!db) return (<div>Error</div>) // Shouldn't be possible as databaseProvider shouldn't render this component until db is loaded, but here just incase

    if (!flights) {
        db.flights.find().$.subscribe((flights: any) => {
            setFlights(flights);
        })
        return <FlightTableSkeleton />
    }


    return (
        <div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}