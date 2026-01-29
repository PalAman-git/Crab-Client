import { getUserIdAndSessionIdFromRequest } from "@/lib/api/getUserIdAndSessionIdfromRequest";
import { failedResponse, successResponse } from "@/lib/api/responses";
import { clientService } from "@/services/client/client.service";
import { CreateClientParams } from "@/types/client";

export async function POST(req:Request){
    try{
        const { name,email }: CreateClientParams = await req.json();
        const { userId } = await getUserIdAndSessionIdFromRequest();
        
        await clientService.createClient({name,email,userId});
        return successResponse(null,201);

    }catch(err){

        return failedResponse(err,"Create Client failed",500);
    }
}