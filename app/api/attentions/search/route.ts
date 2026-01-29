import { NextResponse } from "next/server";
import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { clientService } from "@/services/client/client.service";
import { unauthorized } from "@/lib/api/responses/unauthorized";

export async function GET(req:Request){
    const { userId } = await getUserIdAndSessionIdFromRequest();

    if(!userId){
        unauthorized();
    }
}

