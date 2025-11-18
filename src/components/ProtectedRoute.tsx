'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-pink-200"></div>
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent absolute top-0 left-0"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🎁</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}

