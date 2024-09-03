"use client";

import { Typography } from "@mui/material";
import Layout from "../sidenav/layout";
import useAuth from "@/app/helper/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserHome() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Track loading state for role fetching

  // Fetch the role from localStorage on the client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);
      setLoading(false); // Finished loading role
    }
  }, []);

  // Handle redirection based on authentication and role
  useEffect(() => {
    if (!loading) { // Only run after loading completes
      if (!isAuthenticated) {
        router.push('/login'); // Redirect to login if not authenticated
      } else if (role !== 'USER') {
        router.push('/login'); // Redirect to unauthorized page if role is not USER
      }
    }
  }, [isAuthenticated, role, loading, router]);

  // Show loading state while determining role or authentication
  if (!isAuthenticated || loading) {
    return <div>Loading...</div>; // Replace with a better loading indicator if needed
  }

  return (
    <div>
      <Layout>
        <Typography variant="h4">Dashboard</Typography>
      </Layout>
    </div>
  );
}
