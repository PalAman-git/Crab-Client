"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMeQuery } from "@/queries/auth/auth.queries";

export default function ProtectedLayout({children}: {children: ReactNode;}) {
  const { isAuthenticated, isLoading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen">
      {/* You can add navbar/sidebar here */}
      {children}
    </div>
  );
}
