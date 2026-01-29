import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api";

export function unauthorized(message="Unauthorized"){
    const response : ApiResponse<null> = {
        success:false,
        error:message
    }

    return NextResponse.json(response,{status:401});
}