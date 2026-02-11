'use client'

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from '@/components/ui/button'

const BackButton = () => {
    const router = useRouter();

    return (
        <Button 
            variant='ghost'
            size='icon'
            onClick={() => router.back()}
            aria-label="Go back"
            className="bg-accent/80 hover:bg-accent"
        >
            <ArrowLeft className="h-5 w-5"/>
        </Button>
    )
}

export default BackButton;
