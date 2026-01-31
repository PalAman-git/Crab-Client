'use client'
import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/queries/auth/auth.mutations"

const page = () => {
  const { mutate: logout, isPending: isLogoutPending, error: LogoutError } = useLogoutMutation();
  return (
    <>
     <Button disabled={isLogoutPending} onClick={() => logout()}> {isLogoutPending ? "Logging out..." : "Log out"}</Button>
    </>
  )
}

export default page