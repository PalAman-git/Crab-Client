'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'

import { Button } from '../ui/button'
import { icons, MoreVertical } from 'lucide-react'
import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ActionMenuOption = {
    label: string
    icon?: ReactNode
    onClick: () => void
    destructive?: boolean
    disabled?: boolean

    //optional confirmation
    confirm?: {
        title: string
        description?: string
        confirmLabel?: string
    }
}

type ActionMenuProps = {
    options: ActionMenuOption[]
    triggerAriaLabel?: string
    disabled?: boolean
}

export function ActionMenu({
    options,
    triggerAriaLabel = 'Open actions menu',
    disabled = false
}: ActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" aria-label={triggerAriaLabel} disabled={disabled}>
                    <MoreVertical className='h-4 w-4' />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align='end'>
                {options.map((option, index) => {
                    const item = (
                        <DropdownMenuItem
                            key={index}
                            disabled={option.disabled}
                            onSelect={(e) => {
                                e.preventDefault()
                                if (!option.confirm) {
                                    option.onClick()
                                }
                            }}
                            className={cn(
                                option.destructive &&
                                "text-destructive focus:text-destructive"
                            )}
                        >
                            {option.icon && (
                                <span className="mr-2 h-4 w-4 flex items-center">
                                    {option.icon}
                                </span>
                            )}
                            {option.label}
                        </DropdownMenuItem>
                    )

                    if (!option.confirm) return item

                    return (
                        <AlertDialog key={index}>
                            <AlertDialogTrigger asChild>
                                {item}
                            </AlertDialogTrigger>

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        {option.confirm.title}
                                    </AlertDialogTitle>
                                    {option.confirm.description && (
                                        <AlertDialogDescription>
                                            {option.confirm.description}
                                        </AlertDialogDescription>
                                    )}
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={option.onClick}
                                        className={cn(
                                            option.destructive &&
                                            "bg-destructive hover:bg-destructive/90"
                                        )}
                                    >
                                        {option.confirm.confirmLabel ?? option.label}
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )
                })}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}