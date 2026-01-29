import { useMutation,useQueryClient } from "@tanstack/react-query";
import { fetchWithCookies } from "@/lib/api/fetchWithCookies";

type CreateAttentionInput = {
    clientId:string
}