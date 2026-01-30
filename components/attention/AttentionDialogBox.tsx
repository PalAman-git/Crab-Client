'use client'

import * as React from 'react'
import { addDays, format } from 'date-fns'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from '@/lib/utils'
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

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'

import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardFooter } from '../ui/card'
import { useCreateAttentionMutation } from '@/queries/attention/attention.mutations'
import { Spinner } from '../ui/spinner'
import { useSearchClientQuery } from '@/queries/client/client.queries'
import { useCreateClientMutation } from '@/queries/client/client.mutations'
import { toast } from 'sonner'



type Props = {
    open: boolean
    setOpen: (open: boolean) => void
}


export function AttentionDialog({ open, setOpen }: Props) {
    // Core fields
    const [title, setTitle] = React.useState('')
    const [description, setDescription] = React.useState('')
    const [type, setType] = React.useState<'FOLLOW_UP' | 'INVOICE' | 'DEADLINE'>(
        'FOLLOW_UP'
    )
    const [priority, setPriority] = React.useState<'LOW' | 'MEDIUM' | 'HIGH'>(
        'MEDIUM'
    )
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);

    // Invoice only
    const [amount, setAmount] = React.useState('')


    // Date
    const [dueDate, setDueDate] = React.useState<Date>(new Date())
    const [currentMonth, setCurrentMonth] = React.useState(
        new Date(new Date().getFullYear(), new Date().getMonth(), 1)
    )
    const today = new Date();
    today.setHours(0, 0, 0, 0);


    // Client
    const [selectedClient, setSelectedClient] = React.useState<{ id: string; name: string } | null>(null)
    const [query, setQuery] = React.useState('')
    const { data: clients = [], isFetching } = useSearchClientQuery(query);
    const { mutate: createAttention, isPending: isCreateAttentionPending, error: attentionError } = useCreateAttentionMutation();
    const { mutateAsync: createClient, isPending: isCreateClientPending, error: createClientError } = useCreateClientMutation();


    const canCreate =
        query.length > 0 &&
        !clients.some(
            (c) => c.name.toLowerCase() === query.toLowerCase()
        )


    const handleSubmit = async () => {
        if (!title || !selectedClient) {
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
            clientId: selectedClient.id,
        }

        console.log('CREATE ATTENTION:', payload)

        try {
            createAttention(payload, {
                onSuccess: () => {
                    toast.success('Attention Created',{position:'top-center'});
                    setOpen(false)
                }
            });

        } catch (e) {
            console.log(e);
            toast.error(attentionError?.message)
        }
    }

    const handleCreateClient = async () => {
        try {
            const newClient = await createClient({
                name: query,
            })

            setSelectedClient(newClient)
            toast.success("Client Created",{position:'top-center'});
            setQuery("")
        } catch (e) {
            console.log(e);
        }
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
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

                            <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" role='combobox' className='w-full justify-between'>
                                        {selectedClient ? selectedClient?.name : "Select client"}
                                        <ChevronsUpDown className='ml-2 h-4 w-4 opacity-50' />
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className='p-0'>
                                    <Command>
                                        <CommandInput placeholder='Search client...' value={query} onValueChange={setQuery} />
                                        <CommandList>

                                            {isFetching && (
                                                <CommandItem disabled>
                                                    Searching...
                                                </CommandItem>
                                            )}

                                            {!isFetching && clients.length === 0 && (
                                                <CommandEmpty>No client found</CommandEmpty>
                                            )}

                                            {clients.map((client) => (
                                                <CommandItem
                                                    key={client.id}
                                                    value={client.name}
                                                    onSelect={() => {
                                                        setSelectedClient(client)
                                                        setQuery("")
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            client.id === selectedClient?.id ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {client.name}
                                                </CommandItem>
                                            ))}

                                            {canCreate && !isFetching && (
                                                <CommandItem
                                                    onSelect={handleCreateClient}
                                                    className="text-blue-600"
                                                >
                                                    + Create "{query}"
                                                </CommandItem>
                                            )}
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
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
                                        onSelect={(d) => { if (!d || d < today) return; setDueDate(d) }}
                                        month={currentMonth}
                                        onMonthChange={setCurrentMonth}
                                        fixedWeeks
                                        disabled={{ before: today }}
                                        modifiers={{
                                            past: { before: today },
                                        }}
                                        modifiersClassNames={{
                                            past: "[&>button]:line-through opacity-70",
                                        }}
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
                    <Button variant="outline" onClick={() => setOpen(false)}>
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
