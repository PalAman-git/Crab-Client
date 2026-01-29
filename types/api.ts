export type ApiResponse<T> = 
| { success: true; data: T | null } 
| { success: false; error: string }