"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import useAuth from "@/app/helper/useAuth";
import Layout from '../sidebar/page';

export default function AdminDashboard() {
  const isAuthenticated = useAuth();
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Loading state for role fetching

  // Fetch the role from localStorage when the component mounts
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedRole = localStorage.getItem('role');
      setRole(storedRole);
      setLoading(false); // Set loading to false once role is fetched
    }
  }, []);

  // Handle redirection based on authentication status and role
  useEffect(() => {
    if (!loading) { // Only proceed after role is loaded
      if (!isAuthenticated) {
        router.push('/login'); // Redirect to login if not authenticated
      } else if (role !== 'ADMIN') {
        router.push('/unauthorized'); // Redirect to unauthorized page if role is not ADMIN
      }
    }
  }, [isAuthenticated, role, loading, router]);

  // Show loading state while determining role or authentication
  if (!isAuthenticated || loading) {
    return <div>Loading...</div>; // Show a loading indicator while waiting
  }

  return (
    <Layout>
      <h1>Admin Page only</h1>
    </Layout>
  );
}
