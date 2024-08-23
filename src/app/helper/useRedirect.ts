import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const useRedirectIfAuthenticated = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      router.push('/dashboard');
    } else {
      setIsAuthenticated(false);
    }
  }, [router]);

  return isAuthenticated;
};

export default useRedirectIfAuthenticated;
