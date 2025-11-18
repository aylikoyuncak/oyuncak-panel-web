'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { adminApi, setAuthToken, removeAuthToken, getAuthToken } from '@/lib/api-client';
import { UserBaseModel } from '@/api/generated';

interface AuthContextType {
  user: UserBaseModel | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserBaseModel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Sayfa yüklendiğinde token kontrolü
    const token = getAuthToken();
    const userInfo = localStorage.getItem('userInfo');
    
    if (token && userInfo) {
      try {
        setUser(JSON.parse(userInfo));
      } catch (error) {
        console.error('User info parse error:', error);
        removeAuthToken();
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await adminApi.apiAdminLoginPost({
        email,
        password,
      });

      if (response.data.isSucceed && response.data.data) {
        const userData = response.data.data;
        
        // Token'ı kaydet
        setAuthToken(userData.accessToken || '');
        localStorage.setItem('userInfo', JSON.stringify(userData));
        
        setUser(userData);
        router.push('/dashboard');
      } else {
        throw new Error(response.data.message || 'Giriş başarısız');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      throw new Error(error.response?.data?.message || 'Giriş sırasında bir hata oluştu');
    }
  };

  const logout = () => {
    removeAuthToken();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

