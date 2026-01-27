import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { clientService } from "@/services/client/client.service";
import { ApiResponse } from "@/types/api";
import { CreateClientParams } from "@/types/client";
import { NextResponse } from "next/server";

export async function POST(req:Request){
    try{

        const { name,email }:CreateClientParams = await req.json();
        const { userId } = await getUserIdAndSessionIdFromRequest();
        
        await clientService.createClient({name,email,userId})
        
        const response:ApiResponse<null> = {
            success:true,
            data:null
        }
        
        return NextResponse.json(response,{status:201})
    }catch(err){
        const response:ApiResponse<null> = {
            success:false,
            error:"Create Client failed"
        }
        return NextResponse.json(response,{status:500});
    }
}