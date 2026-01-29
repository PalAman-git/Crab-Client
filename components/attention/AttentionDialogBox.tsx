'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import {
    Command,
    CommandEmpty,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command'

import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter } from '../ui/card'
import { useCreateAttentionMutation } from '@/queries/attention/attention.mutations'
import { Spinner } from '../ui/spinner'

/* ---------------------------------- */
/* TYPES */
/* ---------------------------------- */

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
}

/* ---------------------------------- */
/* COMPONENT */
/* ---------------------------------- */

export function AttentionDialog({ open, onOpenChange }: Props) {
    // Core fields
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [type, setType] = React.useState<'FOLLOW_UP' | 'INVOICE' | 'DEADLINE'>(
        'FOLLOW_UP'
    )
    const [priority, setPriority] = React.useState<'LOW' | 'MEDIUM' | 'HIGH'>(
        'MEDIUM'
    )

    // Invoice only
    const [amount, setAmount] = React.useState('')

    // Client
    const [clientId, setClientId] = React.useState<string | null>(null)
    const [clientSearch, setClientSearch] = React.useState('')

    // Date
    const [dueDate, setDueDate] = React.useState<Date>(new Date())
    const [currentMonth, setCurrentMonth] = React.useState(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    )

    /* ---------------------------------- */
    /* TEMP CLIENT DATA (replace later) */
    /* ---------------------------------- */

    const clients = [
        { id: 'cmkwkpoby000ddcabygswp5ye', name: 'Client 1' },
        { id: 'cmkwkyfl5000edcab0js4l5sv', name: 'Client 2' },
    ].filter((c) =>
        c.name.toLowerCase().includes(clientSearch.toLowerCase())
    )

    /* ---------------------------------- */
    /* SUBMIT */
    /* ---------------------------------- */
    const { mutate: createAttention, isPending: isCreateAttentionPending, error: attentionError } = useCreateAttentionMutation();

    const handleSubmit = async () => {
        if (!title || !clientId) {
            alert('Title and Client are required')
            return
        }

        const payload = {
            title,
            description: description || undefined,
            type,
            priority,
            amount: type === 'INVOICE' ? Number(amount) : undefined,
            dueDate,
            clientId,
        }

        console.log('CREATE ATTENTION:', payload)

        createAttention(payload);
        onOpenChange(false)
    }

    /* ---------------------------------- */
    /* UI */
    /* ---------------------------------- */

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Create Attention</DialogTitle>
                </DialogHeader>

                {/* BODY */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-2">
                    {/* LEFT COLUMN */}
                    <div className="space-y-4">
                        {/* Client */}
                        <div className="space-y-1">
                            <Label>Client *</Label>
                            <Command className="rounded-lg border">
                                <CommandInput
                                    placeholder="Search client..."
                                    value={clientSearch}
                                    onValueChange={setClientSearch}
                                />
                                <CommandList>
                                    <CommandEmpty>No client found</CommandEmpty>
                                    {clients.map((client) => (
                                        <CommandItem
                                            key={client.id}
                                            onSelect={() => {
                                                setClientId(client.id)
                                                setClientSearch(client.name)
                                            }}
                                        >
                                            {client.name}
                                        </CommandItem>
                                    ))}
                                </CommandList>
                            </Command>

                            <Button
                                variant="ghost"
                                size="sm"
                                className="px-0 text-blue-600"
                            >
                                + Create new client
                            </Button>
                        </div>

                        {/* Title */}
                        <div className="space-y-1">
                            <Label>Title *</Label>
                            <Input
                                placeholder="Follow up on proposal"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        {/* Type */}
                        <div className="space-y-1">
                            <Label>Type</Label>
                            <Select value={type} onValueChange={(v) => setType(v as any)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FOLLOW_UP">Follow up</SelectItem>
                                    <SelectItem value="INVOICE">Invoice</SelectItem>
                                    <SelectItem value="DEADLINE">Deadline</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Priority */}
                        <div className="space-y-1">
                            <Label>Priority</Label>
                            <Select
                                value={priority}
                                onValueChange={(v) => setPriority(v as any)}
                            >
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="LOW">Low</SelectItem>
                                    <SelectItem value="MEDIUM">Medium</SelectItem>
                                    <SelectItem value="HIGH">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Amount (Invoice only) */}
                        {type === 'INVOICE' && (
                            <div className="space-y-1">
                                <Label>Amount *</Label>
                                <Input
                                    type="number"
                                    placeholder="₹ 5000"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                            </div>
                        )}

                        {/* Description */}
                        <div className="space-y-1">
                            <Label>Description</Label>
                            <Textarea
                                placeholder="Optional notes..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className='h-[90px]'
                            />
                        </div>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-3">

                        <div className='w-full flex justify-center'>

                            <Label>Due date</Label>
                        </div>

                        <Card className='mx-auto w-fit'>
                            <CardContent className='border-b'>

                                <div className='w-full flex justify-center flex-col items-center'>
                                    <Calendar
                                        mode="single"
                                        selected={dueDate}
                                        onSelect={(d) => d && setDueDate(d)}
                                        month={currentMonth}
                                        onMonthChange={setCurrentMonth}
                                        fixedWeeks
                                        className="p-0 [--cell-size:--spacing(9.5)]"
                                    />
                                </div>
                            </CardContent>

                            <CardFooter>

                                {/* Presets */}
                                <div className="flex flex-wrap gap-2">
                                    {[0, 1, 3, 7, 14].map((days) => (
                                        <Button
                                            key={days}
                                            className='grow'
                                            size="sm"
                                            variant="outline"
                                            onClick={() => {
                                                const d = addDays(new Date(), days)
                                                setDueDate(d)
                                                setCurrentMonth(
                                                    new Date(d.getFullYear(), d.getMonth(), 1)
                                                )
                                            }}
                                        >
                                            {days === 0 ? 'Today' : `In ${days} days`}
                                        </Button>
                                    ))}
                                </div>
                            </CardFooter>
                        </Card>

                        <p className="text-xs text-muted-foreground flex justify-center">
                            Selected: {format(dueDate, 'PPP')}
                        </p>
                    </div>
                </div>


                {/* FOOTER */}
                <DialogFooter className='mt-3'>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button disabled={isCreateAttentionPending} onClick={handleSubmit}>
                        {isCreateAttentionPending ? (
                            <>
                                <Spinner data-icon="inline-start" />
                                Creating
                            </>
                        ) : (
                            'Create'
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
