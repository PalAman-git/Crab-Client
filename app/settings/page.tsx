'use client'
import { Button } from "@/components/ui/button"
import { useLogoutMutation } from "@/queries/auth/auth.mutations"
import { useRecentClients } from "@/hooks/useRecentClients"

const Page = () => {
  const { mutate: logout, isPending: isLogoutPending, error: LogoutError } = useLogoutMutation();
  const { clearRecentClients } = useRecentClients();

  const handleLogout = () => {
    logout(undefined,{
      onSuccess:() => {
        clearRecentClients();
      }
    })
  }

  return (
    <>
      <Button disabled={isLogoutPending} onClick={handleLogout}>
        {isLogoutPending ? "Logging out..." : "Log out"}
      </Button>
    </>
  )
}

export default Page