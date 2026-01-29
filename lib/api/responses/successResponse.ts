import { ApiResponse } from "@/types/api"
import { NextResponse } from "next/server"

export function successResponse<T>(
  data: T,
  status: 200 | 201 = 200
) {
  const response: ApiResponse<T> = {
    success: true,
    data,
  }

  return NextResponse.json(response, { status })
}
