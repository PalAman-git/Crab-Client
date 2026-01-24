'use client'

import { useMe } from "@/hooks/auth/useMe"

const Dashboard = () => {
  const { user } = useMe();
  return (
    <h1 className="text-5xl">Welcome {user.name}!</h1>
  )
}

export default Dashboard