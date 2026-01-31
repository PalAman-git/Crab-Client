import { useState } from "react";
import { AttentionDialog } from "@/components/attention/AttentionDialogBox"
import { Button } from "../ui/button";

const NewAttentionButton = () => {
    const [isAttentionDialogOpen, setIsAttentionDialogOpen] = useState(false);
    return (
        <>
            <Button onClick={() => setIsAttentionDialogOpen(true)} > + New Attention </Button>
            <AttentionDialog open={isAttentionDialogOpen} setOpen={setIsAttentionDialogOpen} />
        </>
    )
}

export default NewAttentionButton