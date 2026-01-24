'use client'

import { useMe } from "@/hooks/auth/useMe"

const Dashboard = () => {
  const { user } = useMe();
  return (
    <div>Welcome {user.name}!</div>
  )
}

export default Dashboard