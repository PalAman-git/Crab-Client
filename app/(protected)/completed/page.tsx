'use client'
import { CompletedAttentionCard } from "@/components/attention/CompletedAttentionCard";
import { useGetCompletedAttentions } from "@/queries/attention/attention.queries"

const CompletedAttentionPage = () => {
    const { data, isLoading, isError } = useGetCompletedAttentions();

    if(isError) return <>Something went wrong...</>
    return (
        <div className="max-w-6xl mx-auto space-y-8">

            <div>
                <h1 className="text-3xl font-semibold">
                    Completed Attentions
                </h1>
                <p className="text-muted-foreground mt-1">
                    Attentions that have been completed.
                </p>
            </div>


            {isLoading ? (
                <p className="text-muted-foreground">Loading attentions…</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {data?.length ? (
                        data.map((attention) => (
                            <CompletedAttentionCard key={attention.id} attention={attention} />
                        ))
                    ) : (
                        <div className="rounded-xl border bg-card p-8 text-center text-muted-foreground">
                            No Completed attentions
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}

export default CompletedAttentionPage