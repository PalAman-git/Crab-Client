import { ApiResponse } from "@/types/api";
import { NextResponse } from "next/server";

export function failedResponse(error: unknown,message = "Something went wrong" ,status:number = 400) {
    const response: ApiResponse<null> = {
        success: false,
        error: 
            error instanceof Error ? error.message : message,
    }

    return NextResponse.json(response, { status });
}