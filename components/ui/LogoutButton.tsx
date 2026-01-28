import { useLogoutMutation } from "@/queries/auth/auth.mutations"

const LogoutButton = () => {
    const { mutate:logout,isPending:isLogoutPending,error } = useLogoutMutation();
  return (
    <button className="px-3 py-2 rounded bg-black text-white cursor-pointer" onClick={() => logout()} disabled={isLogoutPending}>
          {isLogoutPending ? "Logging out..." : "Logout"}
    </button>
  )
}

export default LogoutButton